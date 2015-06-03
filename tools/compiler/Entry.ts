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

import Parser = require("./Parser");
import Build = require("./Build");
import Run = require("./Run");
import Publish = require("./Publish");
import Create = require("./Create");
import utils = require('../lib/utils');
import FileUtil = require('../lib/FileUtil');
import server = require('../server/server');
import service = require("../service/index");

import http = require('http');
import childProcess = require('child_process');

global.lark = global.lark || {};

var DontExitCode = -0xF000;


export function executeCommandLine(args: string[]): void {
    var options = Parser.parseCommandLine(args);
    lark.options = options;
    var exitcode = entry.executeOption(options);
    entry.exit(exitcode);
}

export function executeOption(options: lark.ICompileOptions): number {
    return entry.executeOption(options);
}


class Entry {

    executeOption(options: lark.ICompileOptions) {
        var exitCode = 0;
        switch (options.action) {
            case "publish":
                var publish = new Publish(options);
                exitCode = publish.run();
                break;
            case "create":
                var create = new Create(options);
                create.run();
                exitCode = DontExitCode;
                break;
            case "help":
                server.startServer(options, options.manageUrl + "help/");
                exitCode = DontExitCode;
                break;
            case "info":
                console.log("    lark version: " + lark.manifest.version);
                console.log('    lark root:    ' + options.larkRoot);
                break;
            case "run":
                var run = new Run(options);
                run.run();
                exitCode = DontExitCode;
                break;
            case "buildLark":
                var build = new Build(options);
                build.buildLarkSource();
                break;
            case "shutdown":
                this.exit(0);
                break;
            case "service":
                service.run();
                exitCode = DontExitCode;
                break;
            case "buildService":
                var build = new Build(options);
                exitCode = build.run();
                exitCode = DontExitCode;
                break;
            case "clean":
                service.execCommand({ path: options.projectDir, command: "shutdown" },null, false);
                setTimeout(() => service.execCommand({ path: options.projectDir, command: "build" }, gotCommandResult, true), 500);
                exitCode = DontExitCode;
                break;
            case "build":
            default:
                service.execCommand({ path: options.projectDir, command: "build" }, gotCommandResult,true);
                exitCode = DontExitCode;
                break;
        }
        return exitCode;
    }

    exit(exitCode) {
        if(DontExitCode == exitCode)
            return;
        process.exit(exitCode);
    }
}

var entry = new Entry();


function gotCommandResult(cmd: lark.ServiceCommandResult) {
    if (cmd.messages) {
        cmd.messages.forEach(m=> console.log(m));
    }
    process.exit(cmd.exitCode || 0);
}

