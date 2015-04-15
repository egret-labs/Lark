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
/// <reference path="../lib/node.d.ts"/>
/// <reference path="../lib/es6-promise.d.ts" />
var TypeScript = require("../lib/typescript/tsc");
var FileUtil = require("../lib/FileUtil");
var Build = (function () {
    function Build(options) {
        this.options = options;
        this.projectDir = options.projectDir;
    }
    Build.prototype.run = function () {
        var _this = this;
        this.clean();
        var task = Promise.resolve(0);
        if (this.options.includeLark)
            task = task.then(function (r) { return _this.buildLark(); });
        task.then(function (r) { return _this.buildProject(); });
    };
    Build.prototype.clean = function () {
        //清理bin-debug目录
        var debugPath = FileUtil.joinPath(this.projectDir, "bin-debug/");
        var fileList = FileUtil.getDirectoryListing(debugPath);
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            FileUtil.remove(path);
        }
    };
    Build.prototype.buildProject = function () {
        //拷贝模板文件
        var debugPath = FileUtil.joinPath(this.projectDir, "bin-debug/");
        var tempatePath = FileUtil.joinPath(this.projectDir, "template/");
        var fileList = FileUtil.getDirectoryListing(tempatePath);
        length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            var destPath = path.substring(tempatePath.length);
            destPath = FileUtil.joinPath(debugPath, destPath);
            FileUtil.copy(path, destPath);
        }
        var srcPath = FileUtil.joinPath(this.projectDir, "src");
        var tsList = FileUtil.search(srcPath, "ts");
        var output = FileUtil.joinPath(this.projectDir, "bin-debug");
        return this.compile(tsList, null, output);
    };
    Build.prototype.buildLark = function () {
        var larkRoot = this.options.larkRoot;
        var srcPath = FileUtil.joinPath(larkRoot, "src");
        var tsList = FileUtil.search(srcPath, "ts");
        var output = FileUtil.joinPath(this.projectDir, "bin-debug/lark/lark.js");
        var outDef = FileUtil.joinPath(this.projectDir, "bin-debug/lark/lark.d.ts");
        var destDef = FileUtil.joinPath(this.projectDir, "src/lark/lark.d.ts");
        if (FileUtil.exists(output))
            FileUtil.remove(output);
        return this.compile(tsList, output, null, true).then(function (code) {
            if (code == 0) {
                FileUtil.copy(outDef, destDef);
                FileUtil.remove(outDef);
            }
            return code;
        });
        ;
    };
    Build.prototype.compile = function (files, out, outDir, def) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var cmd = files.join(" ") + " -t " + _this.options.esTarget;
            if (_this.options.sourceMap)
                cmd += ' --sourcemap';
            if (_this.options.removeComments)
                cmd += ' --removeComments';
            if (out)
                cmd += " --out " + '"' + out + '"';
            if (outDir)
                cmd += " --outDir " + '"' + outDir + '"';
            if (def)
                cmd += ' -d';
            console.log("start build");
            FileUtil.save("tsc_config_temp.txt", cmd);
            TypeScript.exit = function (exitCode) {
                FileUtil.remove("tsc_config_temp.txt");
                console.log("delete");
                resolve(exitCode);
            };
            try {
                TypeScript.executeCommandLine(["@tsc_config_temp.txt"]);
            }
            catch (e) {
                console.log(e, e.stack);
                resolve(0);
            }
        });
        return promise;
    };
    return Build;
})();
module.exports = Build;
//# sourceMappingURL=Build.js.map