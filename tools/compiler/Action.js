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
var TypeScript = require("../lib/typescript/tsc");
var UglifyJS = require("../lib/uglify-js/uglifyjs");
var Action = (function () {
    function Action(options) {
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
        var files = Action.GetJavaScriptFileNames(compileResult.files, srcDir);
        var projManifest = {
            files: files,
            min: option.project.name + ".min.js"
        };
        var json = JSON.stringify(projManifest, null, '   ');
        var oldContent = FileUtil.read(this.options.projManifest);
        if (oldContent != json)
            FileUtil.save(this.options.projManifest, json);
        compileResult.files = files;
        return compileResult;
    };
    Action.prototype.buildLarkSource = function () {
        var self = this;
        var code = 0;
        var options = this.options;
        var penddings = [];
        var larkRoot = options.larkRoot;
        var dtsFiles = [];
        var self = this;
        var manifestPath = FileUtil.joinPath(larkRoot, "manifest.json");
        console.log(manifestPath);
        var content = FileUtil.read(manifestPath);
        var manifest = null;
        console.log(content);
        try {
            manifest = JSON.parse(content);
        }
        catch (e) {
            utils.exit(10009);
        }
        manifest.modules.forEach(function (m) {
            buildModule(m);
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
        function buildModule(larkModule) {
            var name = larkModule.name;
            var depends = larkModule.dependencies.map(function (name) { return self.getModuleOutputPath(name, name + '.d.ts'); });
            if (depends.some(function (path) { return FileUtil.exists(path) == false; })) {
                penddings.push(larkModule);
                return;
            }
            var outDir = self.getModuleOutputPath(name);
            var declareFile = self.getModuleOutputPath(name, name + ".d.ts");
            var singleFile = self.getModuleOutputPath(name, name + ".js");
            var manifestFile = self.getModuleOutputPath(name, name + '.json');
            var moduleRoot = FileUtil.joinPath(larkRoot, larkModule.root);
            var tss = [];
            dtsFiles.push([declareFile, depends]);
            larkModule.files.forEach(function (file) {
                if (typeof (file) == 'string') {
                    var tsfile = FileUtil.joinPath(moduleRoot, file);
                    tss.push(tsfile);
                }
                else {
                    var folderOption = file;
                    var folder = FileUtil.joinPath(moduleRoot, folderOption.dir);
                    console.log(folder);
                    var regex = folderOption.filter && new RegExp(folderOption.filter);
                    folderOption.test = regex == undefined ? function () { return true; } : function (f) { return regex.test(f); };
                    var files = FileUtil.searchByFunction(folder, folderOption.test);
                    console.log(files);
                    tss = tss.concat(files);
                }
            });
            tss = depends.concat(tss);
            self.compile(options, tss, singleFile, null, true);
            self.minify(singleFile, singleFile.replace(/\.js$/, '.min.js'));
            var result = self.compile(options, tss, null, outDir, false);
            var moduleRoot = FileUtil.escapePath(moduleRoot);
            var files = Action.GetJavaScriptFileNames(result.files, moduleRoot);
            var manifest = {
                files: files,
                bin: name + ".js",
                min: name + ".min.js"
            };
            FileUtil.save(manifestFile, JSON.stringify(manifest, null, '   '));
        }
        return code;
    };
    Action.prototype.getModuleOutputPath = function (name, filePath) {
        if (filePath === void 0) { filePath = ""; }
        var path = FileUtil.joinPath(this.options.larkRoot, "build/" + name + "/" + filePath);
        return path;
    };
    Action.prototype.copyLark = function () {
        var _this = this;
        var options = this.options;
        var modulesUsed = options.project.modules;
        console.log(options.project);
        modulesUsed.forEach(function (m) {
            var moduleRoot = _this.getModuleOutputPath(m.name);
            var libsDir = FileUtil.joinPath(options.templateDir, '/libs/' + m.name);
            FileUtil.copy(moduleRoot, libsDir);
            var dts = FileUtil.joinPath(options.templateDir, '/libs/' + m.name + '/' + m.name + '.d.ts');
            var dtsInSrc = FileUtil.joinPath(options.srcDir, '/libs/' + m.name + '.d.ts');
            FileUtil.copy(dts, dtsInSrc);
            FileUtil.remove(dts);
        });
        return 0;
    };
    Action.compileTemplates = function (options) {
        var templateFile = FileUtil.joinPath(options.templateDir, options.project.startupHtml);
        var content = FileUtil.read(templateFile);
        var larkFiles = [];
        var projFiles = [];
        var modules = options.project.modules.concat([{ name: 'proj' }]);
        modules.forEach(function (m) {
            var libDir = m.name == 'proj' ? "" : ("libs/" + m.name + '/');
            var dir = options.templateDir + libDir;
            var manifestFile = dir + m.name + ".json";
            if (FileUtil.exists(manifestFile)) {
                var content = FileUtil.read(manifestFile);
                var manifest = JSON.parse(content);
                //项目编译后的文件
                if (m.name == 'proj') {
                    projFiles = options.publish ? [manifest.min] : manifest.files;
                    return;
                }
                if (options.project.keepLarkInSeparatedFiles) {
                    var files = manifest.files.map(function (f) { return libDir + f; });
                    larkFiles = larkFiles.concat(files);
                }
                else {
                    var file = options.publish ? manifest.min : manifest.bin;
                    larkFiles.push(libDir + file);
                }
            }
        });
        var manifests = [{
                files: larkFiles,
                replacement: '<script id="lark"></script>'
            }, {
                files: projFiles,
                replacement: '<script id="project"></script>'
            }];
        manifests.forEach(function (manifest) {
            var scripts = manifest.files.map(function (f) { return ['<script src="', f, '"></script>'].join(''); }).join('\r\n');
            content = content.replace(manifest.replacement, scripts);
        });
        content = content.replace(/\$entry\-class\$/ig, options.project.entry);
        content = content.replace(/\$scale\-mode\$/ig, options.project.scaleMode);
        content = content.replace(/\$content\-width\$/ig, options.project.contentWidth.toString());
        content = content.replace(/\$content\-height\$/ig, options.project.contentHeight.toString());
        content = content.replace(/\$show\-paint\-rects\$/ig, options.project.showPaintRects ? 'true' : 'false');
        var outputFile = FileUtil.joinPath(options.outDir, options.project.startupHtml);
        FileUtil.save(outputFile, content);
    };
    Action.prototype.compile = function (options, files, out, outDir, def) {
        var defTemp = options.declaration;
        options.declaration = def;
        var compileResult = TypeScript.executeWithOption(options, files, out, outDir, def);
        options.declaration = defTemp;
        if (!options.minify)
            return compileResult;
        if (!out) {
            console.log(utils.tr(10004));
            return compileResult;
        }
        this.minify(out, out);
        return compileResult;
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
    Action.prototype.saveProject = function () {
        var propjson = lark.options.project.toJSON();
        FileUtil.save(FileUtil.joinPath(lark.options.projectDir, 'lark.json'), JSON.stringify(propjson, null, '   '));
    };
    Action.fileExtensionToIgnore = {
        "ts": true
    };
    return Action;
})();
TypeScript.exit = function (exitCode) {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};
module.exports = Action;
//# sourceMappingURL=Action.js.map