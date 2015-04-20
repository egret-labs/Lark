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
var TypeScript = require("../lib/typescript/tsc");
var FileUtil = require("../lib/FileUtil");
var utils = require('../lib/utils');
var UglifyJS = require("../lib/uglify-js/uglifyjs");
var Action = (function () {
    function Action(options) {
        this.options = options;
        this.projectDir = options.projectDir;
    }
    Action.prototype.run = function () {
    };
    Action.prototype.clean = function (path) {
        var fileList = FileUtil.getDirectoryListing(path);
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            FileUtil.remove(path);
        }
    };
    Action.prototype.buildProject = function () {
        var option = this.options;
        //拷贝lark.js
        if (!option.publish && FileUtil.exists(option.srcLarkFile)) {
            FileUtil.copy(option.srcLarkFile, option.outLarkFile);
        }
        var tsList = FileUtil.search(option.srcDir, "ts");
        return this.compile(option, tsList, option.out, option.outDir);
    };
    Action.prototype.buildLark = function () {
        var options = this.options;
        var larkRoot = options.larkRoot;
        var srcPath = FileUtil.joinPath(larkRoot, "src");
        var tsList = FileUtil.search(srcPath, "ts");
        var output = options.srcLarkFile;
        var destOut = options.outLarkFile;
        if (FileUtil.exists(output))
            FileUtil.remove(output);
        var exitCode = this.compile(options, tsList, output, null, !options.publish);
        if (exitCode == 0) {
            FileUtil.copy(output, destOut);
        }
        return exitCode;
    };
    Action.prototype.compile = function (options, files, out, outDir, def) {
        var defTemp = options.declaration;
        options.declaration = def;
        var exitCode = TypeScript.executeWithOption(options, files, out, outDir, def);
        options.declaration = defTemp;
        if (!options.minify)
            return exitCode;
        if (!out) {
            console.log(utils.tr(10004));
            return exitCode;
        }
        var defines = {
            DEBUG: false,
            RELEASE: true
        };
        //UglifyJS参数参考这个页面：https://github.com/mishoo/UglifyJS2
        var result = UglifyJS.minify(out, { compress: { global_defs: defines }, output: { beautify: false } });
        FileUtil.save(out, result.code);
        return exitCode;
    };
    Action.prototype.copyDirectory = function (from, to) {
        var fileList = FileUtil.getDirectoryListing(from);
        length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            var destPath = path.substring(from.length);
            destPath = FileUtil.joinPath(to, destPath);
            FileUtil.copy(path, destPath);
        }
    };
    return Action;
})();
module.exports = Action;
//# sourceMappingURL=Action.js.map