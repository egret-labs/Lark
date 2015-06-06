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
var Action = require('../compiler/Action');
var FileUtil = require("../lib/FileUtil");
var service = require("../service/index");
var Build = (function (_super) {
    __extends(Build, _super);
    function Build() {
        _super.apply(this, arguments);
        this._lastExitCode = 0;
        this._lastMessages = [];
        this._request = null;
    }
    Build.prototype.run = function () {
        var _this = this;
        this._request = service.execCommand({
            command: "init",
            path: this.options.projectDir
        }, function (m) { return _this.onServiceMessage(m); }, false);
        this._request.once('error', function () { return process.exit(); });
        setInterval(function () { return _this.sendCommand({
            command: "status",
            status: process.memoryUsage(),
            path: _this.options.projectDir
        }); }, 60000);
        return this.buildProject();
    };
    Build.prototype.buildProject = function () {
        var exitCode = 0;
        console.log('build start');
        this.clean(this.options.debugDir, FileUtil.joinPath(this.options.debugDir, 'tmp'));
        this.copyDirectory(this.options.templateDir, this.options.debugDir);
        this.copyDirectory(this.options.srcDir, this.options.debugDir, this.srcFolderOutputFilter);
        var compileResult = this.compileProject();
        Action.compileTemplates(this.options);
        exitCode = compileResult.exitStatus;
        console.log('build end');
        this._lastExitCode = exitCode;
        this._lastMessages = compileResult.messages;
        this.sendCommand();
        global.gc && global.gc();
        return exitCode;
    };
    Build.prototype.buildChanges = function (filesChanged) {
        if (!this.canRecompile)
            return this.buildProject();
        var codes = [];
        var others = [];
        filesChanged.forEach(function (f) {
            if (/\.ts$/.test(f))
                codes.push(f);
            else
                others.push(f);
        });
        this.buildChangedRes(others);
        if (codes.length) {
            var result = this.buildChangedTS(codes);
            this._lastExitCode = result.exitStatus;
            this._lastMessages = result.messages;
        }
        this.sendCommand();
        global.gc && global.gc();
        return this._lastExitCode;
    };
    Build.prototype.buildChangedTS = function (filesChanged) {
        var _this = this;
        filesChanged = filesChanged.map(function (f) { return f.replace(_this.options.projectDir, ""); });
        return this.recompileChanges(filesChanged);
    };
    Build.prototype.buildChangedRes = function (fileNames) {
        var _this = this;
        var src = this.options.srcDir, temp = this.options.templateDir, proj = this.options.larkPropertiesFile, start = "index.html";
        fileNames.forEach(function (fileName) {
            if (fileName == proj) {
                _this.options.includeLark = true;
                _this.buildProject();
                _this.options.includeLark = false;
            }
            if (fileName.indexOf(src) < 0 && fileName.indexOf(temp) < 0) {
                return;
            }
            var relativePath = fileName.replace(src, '').replace(temp, '');
            var output = FileUtil.joinPath(_this.options.debugDir, relativePath);
            if (FileUtil.exists(fileName)) {
                FileUtil.copy(fileName, output);
                console.log('Copy: ', fileName, "\n  to: ", output);
            }
            else {
                FileUtil.remove(output);
                console.log('Remove: ', output);
            }
            if (fileName.indexOf(start) >= 0)
                return _this.onTemplateIndexChanged(fileName);
        });
    };
    Build.prototype.onTemplateIndexChanged = function (file) {
        var index = FileUtil.joinPath(this.options.templateDir, "index.html");
        index = FileUtil.escapePath(index);
        console.log('Compile Template: ' + index);
        Action.compileTemplates(this.options);
        return 0;
    };
    Build.prototype.onServiceMessage = function (msg) {
        if (msg.command == 'build')
            this.buildChanges(msg.changes);
        if (msg.command == 'shutdown')
            process.exit(0);
    };
    Build.prototype.sendCommand = function (cmd) {
        if (!cmd) {
            var msg = this._lastMessages.length > 20 ? this._lastMessages.slice(0, 20): this._lastMessages;
            cmd = {
                command: 'buildResult',
                exitCode: this._lastExitCode,
                messages: msg,
                path: this.options.projectDir
            }
        }
        service.execCommand(cmd, null, false);
    };
    return Build;
})(Action);
module.exports = Build;
//# sourceMappingURL=Build.js.map