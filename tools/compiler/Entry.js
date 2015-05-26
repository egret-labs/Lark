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
require('../locales/zh_CN');
var Parser = require("./Parser");
var Build = require("./Build");
var Publish = require("./Publish");
var Create = require("./Create");
var FileUtil = require('../lib/FileUtil');
var server = require('../server/server');
var BuildService = require("./BuildService");
var http = require('http');
var childProcess = require('child_process');
global.lark = global.lark || {};
var DontExitCode = -0xF000;
function executeCommandLine(args) {
    var options = Parser.parseCommandLine(args);
    lark.options = options;
    entry.executeCommand(options);
}
exports.executeCommandLine = executeCommandLine;
function executeOption(options) {
    return entry.executeOption(options);
}
exports.executeOption = executeOption;
var Entry = (function () {
    function Entry() {
    }
    Entry.prototype.executeCommand = function (options) {
        var _this = this;
        var optionJSON = JSON.stringify(options);
        optionJSON = encodeURIComponent(optionJSON);
        var requestUrl = 'http://' + options.host + ':' + options.port
            + '/$/command?command=' + optionJSON;
        var commandRequest = http.get(requestUrl, function (res) {
            res.setEncoding('utf-8');
            res.on('data', function (text) {
                _this.gotCommandResult(text);
            });
        });
        commandRequest.once('error', function (e) {
            if (options.action == 'build') {
                console.log("start server");
                options.serverOnly = true;
                entry.startBackgroundServer(options);
                options.fileName = null;
                _this.executeCommand(options);
            }
            else {
                _this.executeOption(options);
            }
        });
        commandRequest.setTimeout(100);
    };
    Entry.prototype.executeOption = function (options) {
        var exitCode = 0;
        switch (options.action) {
            case "publish":
                var publish = new Publish(options);
                exitCode = publish.run();
                break;
            case "create":
                var create = new Create(options);
                create.run();
                server.startServer(options, options.manageUrl + "create/");
                exitCode = DontExitCode;
                break;
            case "run":
                server.startServer(options);
                if (options.autoCompile || options.fileName)
                    BuildService.getInstance();
                exitCode = DontExitCode;
                break;
            case "buildLark":
                var build = new Build(options);
                build.buildLarkSource();
                break;
            case "shutdown":
                this.exit(0);
                break;
            default:
                var build = new Build(options);
                exitCode = build.run();
                break;
        }
        return exitCode;
    };
    Entry.prototype.startBackgroundServer = function (options) {
        if (this.server)
            return;
        var nodePath = process.execPath, larkPath = FileUtil.joinPath(options.larkRoot, 'tools/bin/lark');
        var startupParams = ['--expose-gc', larkPath, 'run'];
        if (options.autoCompile)
            startupParams.push('-a');
        if (options.fileName) {
            startupParams.push('-f');
            startupParams.push(options.fileName);
        }
        if (options.serverOnly)
            startupParams.push('--serveronly');
        this.server = childProcess.spawn(nodePath, startupParams, {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            cwd: process.cwd()
        });
    };
    Entry.prototype.gotCommandResult = function (msg) {
        var _this = this;
        var result = null;
        try {
            result = JSON.parse(msg);
        }
        catch (e) {
            console.log(e);
            result = {};
        }
        if (result.type == 'log') {
            this.writeServerLog(result.data);
        }
        if (result.exitCode != undefined) {
            var logdata = result.data;
            if (logdata) {
                logdata.forEach(function (params) { return _this.writeServerLog(params); });
            }
            this.exit(result.exitCode);
        }
    };
    Entry.prototype.writeServerLog = function (params) {
        console.log.apply(console, params);
    };
    Entry.prototype.exit = function (exitCode) {
        if (DontExitCode == exitCode)
            return;
        process.exit(exitCode);
    };
    return Entry;
})();
var entry = new Entry();
//# sourceMappingURL=Entry.js.map