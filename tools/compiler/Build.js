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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../lib/types.d.ts" />
var Action = require('./Action');
var lock = require("../lib/lockfile");
var FileUtil = require("../lib/FileUtil");
var BuildService = require('./BuildService');
var Build = (function (_super) {
    __extends(Build, _super);
    function Build() {
        _super.apply(this, arguments);
    }
    Build.prototype.run = function () {
        var exitCode = 0;
        if (this.options.autoCompile) {
            BuildService.getInstance(this.options);
        }
        if (this.options.fileName) {
            console.log('build file:' + this.options.fileName);
            exitCode = BuildService.buildSingle(this.options.fileName);
            return exitCode;
        }
        try {
            lock.lockSync('build.lock', { stale: 20000 });
        }
        catch (e) {
            console.log('Another build task is in progress');
            return exitCode;
        }
        console.log('build start');
        try {
            this.clean(this.options.debugDir, FileUtil.joinPath(this.options.debugDir, 'tmp'));
            if (this.options.includeLark)
                exitCode = this.copyLark();
            this.copyDirectory(this.options.templateDir, this.options.debugDir);
            this.copyDirectory(this.options.srcDir, this.options.debugDir, this.srcFolderOutputFilter);
            var compileResult = this.compileProject();
            Action.compileTemplates(this.options);
            exitCode = compileResult.exitCode;
            console.log('build end');
        }
        catch (e) {
            console.log('build error');
            console.log(e.message, e.stack);
        }
        try {
            lock.unlockSync('build.lock');
        }
        catch (e) {
            console.log('unlock error');
        }
        return exitCode;
    };
    return Build;
})(Action);
module.exports = Build;
//# sourceMappingURL=Build.js.map