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
        var fileList = FileUtil.getDirectoryListing(path);
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
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
        this.compileExmls();
        var tsList = FileUtil.search(option.srcDir, "ts");
        var compileResult = this.compile(option, tsList, option.out, option.outDir);
        var larkRootSrc = FileUtil.escapePath(this.options.srcDir);
        var files = Action.GetJavaScriptFileNames(compileResult.files, larkRootSrc);
        var projManifest = {
            files: files
        };
        var json = JSON.stringify(projManifest, null, '   ');
        FileUtil.save(this.options.projManifest, json);
        compileResult.files = files;
        return compileResult;
    };
    Action.prototype.buildLark = function () {
        var options = this.options;
        var larkRoot = options.larkRoot;
        var srcPath = FileUtil.joinPath(larkRoot, "src");
        var tsList = FileUtil.search(srcPath, "ts");
        var separate = options.projectProperties.keepLarkInSeparatedFiles;
        var output = separate ? null : FileUtil.joinPath(options.templateDir, '/lark/lark.js');
        var outDir = separate ? FileUtil.joinPath(options.templateDir, '/lark/') : null;
        if (FileUtil.exists(output))
            FileUtil.remove(output);
        var larkFiles = {
            files: []
        };
        var compileResult = this.compile(options, tsList, output, outDir, !options.publish);
        if (compileResult.exitCode == 0) {
            if (!separate) {
                outDir = FileUtil.joinPath(options.templateDir, 'lark/');
            }
            var defineFiles = FileUtil.searchByFunction(outDir, function (f) { return /\.d\.ts$/.test(f); });
            var contents = [];
            defineFiles.forEach(function (f) { return contents.push(FileUtil.read(f)); });
            var defFileContent = contents.join('\r\n');
            FileUtil.save(FileUtil.joinPath(options.srcDir, 'lark/lark.d.ts'), defFileContent);
            var larkBinFiles = FileUtil.search(outDir, 'js');
            larkFiles.files = Action.GetJavaScriptFileNames(larkBinFiles, options.templateDir);
            defineFiles.forEach(function (f) { return FileUtil.remove(f); });
            var json = JSON.stringify(larkFiles, null, '   ');
            FileUtil.save(options.larkManifest, json);
        }
        return compileResult.exitCode;
    };
    Action.compileTemplates = function (options) {
        var templateFile = FileUtil.joinPath(options.templateDir, options.projectProperties.startupHtml);
        var content = FileUtil.read(templateFile);
        var manifests = [{
                manifest: options.larkManifest,
                replacement: '<script id="lark"></script>'
            }, {
                manifest: options.projManifest,
                replacement: '<script id="project"></script>'
            }];
        manifests.forEach(function (manifest) {
            if (FileUtil.exists(manifest.manifest) && content.indexOf(manifest.replacement) >= 0) {
                var json = FileUtil.read(manifest.manifest);
                var lark = JSON.parse(json);
                var files = lark.files;
                var scripts = files.map(function (f) { return ['<script src="', f, '"></script>'].join(''); }).join('\r\n');
                content = content.replace(manifest.replacement, scripts);
            }
        });
        content = content.replace(/\$entry\-class\$/ig, options.projectProperties.entry);
        content = content.replace(/\$scale\-mode\$/ig, options.projectProperties.scaleMode);
        content = content.replace(/\$content\-width\$/ig, options.projectProperties.contentWidth.toString());
        content = content.replace(/\$content\-height\$/ig, options.projectProperties.contentHeight.toString());
        content = content.replace(/\$show\-paint\-rects\$/ig, options.projectProperties.showPaintRects ? 'true' : 'false');
        var outputFile = FileUtil.joinPath(options.debugDir, options.projectProperties.startupHtml);
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
        var defines = {
            DEBUG: false,
            RELEASE: true
        };
        //UglifyJS参数参考这个页面：https://github.com/mishoo/UglifyJS2
        var result = UglifyJS.minify(out, { compress: { global_defs: defines }, output: { beautify: false } });
        FileUtil.save(out, result.code);
        return compileResult;
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
TypeScript.exit = function (exitCode) {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};
module.exports = Action;
//# sourceMappingURL=Action.js.map