//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var exmlc = require('../lib/exml/exmlc');
var FileUtil = require("../lib/FileUtil");
var htmlparser = require("../lib/htmlparser");
var tsclark = require("../lib/typescript/tsclark");
var UglifyJS = require("../lib/uglify-js/uglifyjs");
var Action = (function () {
    function Action(options) {
        this.projectManifest = {};
        this.options = options;
        this.projectDir = options.projectDir;
    }
    Action.prototype.run = function () {
        return 0;
    };
    Action.prototype.clean = function (path) {
        var excludes = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            excludes[_i - 1] = arguments[_i];
        }
        var fileList = FileUtil.getDirectoryListing(path);
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            if (excludes && excludes.indexOf(path) >= 0)
                continue;
            FileUtil.remove(path);
        }
    };
    Action.prototype.compileExmls = function () {
        var option = this.options;
        var exmls = FileUtil.search(option.srcDir, "exml");
        exmls.forEach(function (exml) {
            exmlc.compile(exml, option.srcDir);
        });
    };
    Action.prototype.compileProject = function () {
        var option = this.options;
        //this.compileExmls();
        var tsList = FileUtil.search(option.srcDir, "ts");
        var compileResult = this.compile(option, tsList, option.out, option.outDir);
        var srcDir = FileUtil.escapePath(this.options.srcDir);
        var files = Action.GetJavaScriptFileNames(compileResult.files, /^src\//);
        var projManifest = {
            files: files,
            release: "main.min.js"
        };
        this.options.projManifest = projManifest;
        compileResult.files = files;
        return compileResult;
    };
    Action.prototype.buildLarkSource = function () {
        var self = this;
        var code = 0;
        var ANY = 'any';
        var options = this.options;
        var manifest = lark.manifest;
        var larkRoot = options.larkRoot;
        var penddings = [];
        var dtsFiles = [];
        var currentPlatform, currentConfig;
        var outputDir = this.getModuleOutputPath();
        var configurations = [
            { name: "debug", declaration: true },
            { name: "release", minify: true }
        ];
        this.clean(outputDir);
        manifest.modules.forEach(function (m) {
            listModuleFiles(m);
            configurations.forEach(function (config) {
                manifest.platforms.forEach(function (platform) {
                    buildModule(m, platform, config);
                });
            });
        });
        var tempDts = [];
        global.ignoreDollar = true;
        dtsFiles.forEach(function (d) {
            var dts = d[0], depends = d[1];
            var tempDtsName = dts.replace(/\.d\.ts/, 'd.ts');
            var singleFile = dts.replace(/\.d\.ts/, 'd.js');
            FileUtil.copy(dts, tempDtsName);
            var tss = depends.concat(tempDtsName);
            self.compile(options, tss, singleFile, null, true);
            FileUtil.remove(singleFile);
            FileUtil.remove(tempDtsName);
            tempDts.push(tempDtsName.replace(/\.ts$/, '.d.ts'));
        });
        dtsFiles.forEach(function (d) {
            FileUtil.remove(d[0]);
        });
        tempDts.forEach(function (d) {
            var dts = d.replace(/d\.d\.ts$/, '.d.ts');
            FileUtil.copy(d, dts);
            FileUtil.remove(d);
        });
        global.ignoreDollar = false;
        function buildModule(m, platform, configuration) {
            var name = m.name;
            var fileName = name;
            if (platform.name != ANY) {
                fileName += "." + platform.name;
            }
            if (configuration.minify) {
                fileName += ".min";
            }
            var depends = m.dependencies.map(function (name) { return self.getModuleOutputPath(name, name + '.d.ts'); });
            if (depends.some(function (path) { return FileUtil.exists(path) == false; })) {
                penddings.push(m);
                return;
            }
            if (platform.name != ANY) {
                depends.push(self.getModuleOutputPath(m.name, name + '.d.ts'));
            }
            var outDir = self.getModuleOutputPath();
            var declareFile = self.getModuleOutputPath(m.name, fileName + ".d.ts");
            var singleFile = self.getModuleOutputPath(m.name, fileName + ".js");
            var moduleRoot = FileUtil.joinPath(larkRoot, m.root);
            var tss = [];
            m.files.forEach(function (file) {
                var path = null;
                var sourcePlatform = null, sourceConfig = null;
                if (typeof (file) == 'string') {
                    path = file;
                }
                else {
                    var source = file;
                    path = source.path;
                    sourcePlatform = source.platform;
                    sourceConfig = source.debug === true ? "debug" : source.debug === false ? "release" : null;
                }
                var platformOK = sourcePlatform == null && platform.name == ANY || sourcePlatform == platform.name;
                var configOK = sourceConfig == null || sourceConfig == configuration.name;
                if (platformOK && configOK) {
                    tss.push(path);
                }
            });
            if (tss.length == 0)
                return;
            tss = depends.concat(tss);
            var dts = platform.declaration && configuration.declaration;
            console.log("compile:" + m.name);
            var result = self.compile(options, tss, singleFile, null, dts);
            if (result.exitStatus != 0) {
                result.messages.forEach(function (m) { return console.log(m); });
            }
            if (dts) {
                dtsFiles.push([declareFile, depends]);
            }
            if (configuration.minify)
                self.minify(singleFile, singleFile);
        }
        function testPlatform(value, array) {
            return (value == ANY && (array == null || array.length == 0)) || (array && array.indexOf(value) >= 0);
        }
        function testConfig(value, array) {
            return value == ANY || array == null || array.indexOf(value) >= 0;
        }
        function listModuleFiles(m) {
            var tsFiles = FileUtil.search(FileUtil.joinPath(options.larkRoot, m.root), "ts");
            var specFiles = {};
            m.files.forEach(function (f) {
                var fileName = typeof (f) == 'string' ? f : f.path;
                fileName = FileUtil.joinPath(m.root, fileName);
                fileName = FileUtil.joinPath(options.larkRoot, fileName);
                if (f['path'])
                    f['path'] = fileName;
                specFiles[fileName] = true;
            });
            tsFiles.forEach(function (f) {
                if (!specFiles[f])
                    m.files.push(f);
            });
            console.log(m.files);
        }
        return code;
    };
    Action.prototype.getModuleOutputPath = function (m, filePath) {
        if (filePath === void 0) { filePath = ""; }
        var path = FileUtil.joinPath(this.options.larkRoot, "build/");
        if (m)
            path += m + '/';
        path += filePath;
        return path;
    };
    Action.prototype.copyLark = function () {
        var options = this.options;
        var moduleBin = this.getModuleOutputPath();
        var targetFile = FileUtil.joinPath(options.srcDir, '/libs/');
        FileUtil.copy(moduleBin, targetFile);
        return 0;
    };
    Action.prototype.copyTemplate = function () {
        var options = this.options;
        var templateFile = FileUtil.joinPath(options.templateDir, "index.html");
        if (!FileUtil.exists(templateFile))
            return;
        var larkFiles = [];
        var modules = options.project.modules;
        var platforms = options.project.platforms;
        modules.forEach(function (m) {
            larkFiles.push(utils.format("libs/{0}/{0}", m.name));
            platforms.forEach(function (p) { return larkFiles.push(utils.format("libs/{0}/{0}.{1}", m.name, p.name)); });
        });
        var content = FileUtil.read(templateFile);
        var scripts = larkFiles.map(function (f) { return utils.format('<script src="{0}.js" src-release="{0}.min.js"></script>', f); }).join('\r\n    ');
        content = content.replace('<script id="lark"></script>', scripts);
        content = content.replace(/\$entry\-class\$/ig, "Main");
        content = content.replace(/\$scale\-mode\$/ig, options.project.scaleMode);
        content = content.replace(/\$content\-width\$/ig, options.project.contentWidth.toString());
        content = content.replace(/\$content\-height\$/ig, options.project.contentHeight.toString());
        content = content.replace(/\$show\-paint\-rects\$/ig, 'false');
        FileUtil.save(templateFile, content);
    };
    Action.compileTemplates = function (options) {
        var templateFile = FileUtil.joinPath(options.templateDir, "index.html");
        if (!FileUtil.exists(templateFile))
            return;
        var content = FileUtil.read(templateFile);
        if (options.publish)
            content = Action.replaceReleaseScript(content);
        var projFiles = options.publish ? [options.projManifest.release] : options.projManifest.files;
        var scripts = projFiles.map(function (f) { return utils.format('<script src="{0}"></script>', f); }).join('\r\n    ');
        content = content.replace('<script id="project"></script>', scripts);
        var outputFile = FileUtil.joinPath(options.outDir, "index.html");
        FileUtil.save(outputFile, content);
    };
    // Use release src to replace the src of scripts
    //  from: <script src="libs/lark.js" src-release="libs/lark.min.js"></script>
    //  to:   <script src="libs/lark.min.js"></script>
    Action.replaceReleaseScript = function (html) {
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if (error)
                console.log(error);
        });
        var scriptWithReleaseSrc = [];
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        handler.dom.forEach(function (d) { return visitDom(d); });
        replaceReleaseTags();
        return html;
        function visitDom(el) {
            if (el.type == 'script' && el.attribs && el.attribs['src-release']) {
                scriptWithReleaseSrc.push(el);
            }
            if (el.children) {
                el.children.forEach(function (e) { return visitDom(e); });
            }
        }
        function replaceReleaseTags() {
            scriptWithReleaseSrc.forEach(function (s) {
                html = html.replace(s.raw, 'script src="' + s.attribs['src-release'] + '"');
            });
        }
    };
    Action.prototype.compile = function (options, files, out, outDir, def) {
        var defTemp = options.declaration;
        options.declaration = def;
        files = files.map(function (f) { return f.replace(options.projectDir, ""); });
        var compileResult = tsclark.Compiler.executeWithOption(options, files, out, outDir);
        options.declaration = defTemp;
        this.recompile = compileResult.compileWithChanges;
        if (!options.minify)
            return compileResult;
        if (!out) {
            console.log(utils.tr(10004));
            return compileResult;
        }
        this.minify(out, out);
        return compileResult;
    };
    Object.defineProperty(Action.prototype, "canRecompile", {
        get: function () {
            return this.recompile != null;
        },
        enumerable: true,
        configurable: true
    });
    Action.prototype.recompileChanges = function (files) {
        var _this = this;
        files = files.map(function (f) { return f.replace(_this.options.projectDir, ""); });
        return this.recompile(files);
    };
    Action.prototype.minify = function (sourceFile, output) {
        var defines = {
            DEBUG: false,
            RELEASE: true
        };
        //UglifyJS参数参考这个页面：https://github.com/mishoo/UglifyJS2
        var result = UglifyJS.minify(sourceFile, { compress: { global_defs: defines }, output: { beautify: false } });
        FileUtil.save(output, result.code);
    };
    /**
    * 复制文件夹及其子文件夹下所有的文件
    * @param from 要搜索的文件夹
    * @param to 目标文件夹
    * @param filter 过滤函数：filter(file:string):boolean,参数为遍历过程中的每一个文件，返回true则加入结果列表
    */
    Action.prototype.copyDirectory = function (from, to, filter) {
        var fileList = [];
        if (!filter)
            fileList = FileUtil.getDirectoryListing(from);
        else
            fileList = FileUtil.searchByFunction(from, filter);
        length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            var destPath = path.substring(from.length);
            destPath = FileUtil.joinPath(to, destPath);
            FileUtil.copy(path, destPath);
        }
    };
    Action.prototype.srcFolderOutputFilter = function (file) {
        var extension = FileUtil.getExtension(file);
        if (extension in Action.fileExtensionToIgnore)
            return false;
        return true;
    };
    Action.GetJavaScriptFileNames = function (tsFiles, root, prefix) {
        var files = [];
        tsFiles.forEach(function (f) {
            if (!f)
                return;
            if (/\.d\.ts$/.test(f))
                return;
            f = FileUtil.escapePath(f);
            f = f.replace(root, '').replace(/\.ts$/, '.js').replace(/^\//, '');
            if (prefix) {
                f = prefix + f;
            }
            files.push(f);
        });
        return files;
    };
    Action.fileExtensionToIgnore = {
        "ts": true
    };
    return Action;
})();
tsclark.Compiler.exit = function (exitCode) {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};
module.exports = Action;
//# sourceMappingURL=Action.js.map