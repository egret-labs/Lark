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

import http = require('http');
import Action = require('../compiler/Action');
import FileUtil = require("../lib/FileUtil");
import service = require("../service/index");


class Build extends Action {
    private _lastExitCode = 0;
    private _lastMessages: string[] = [];
    private _request:http.ClientRequest = null;
    public run(): number {
        this._request = service.execCommand({
            command: "init",
            path: this.options.projectDir
        }, m=> this.onServiceMessage(m), false);
        this._request.once('error',() => process.exit());

        setInterval(() => this.sendCommand({
            command: "status",
            status: process.memoryUsage(),
            path: this.options.projectDir
        }), 60000);

        return this.buildProject();
    }

    buildProject() {
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
    }

    buildChanges(filesChanged:string[]) {
        if (!this.canRecompile)
            return this.buildProject();
        var codes: string[] = [];
        var others: string[] = [];

        filesChanged.forEach(f=> {
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
    }

    private buildChangedTS(filesChanged: string[]) {
        filesChanged = filesChanged.map(f=> f.replace(this.options.projectDir, ""));
        return this.recompileChanges(filesChanged);
    }

    private buildChangedRes(fileNames: string[]) {


        var src = this.options.srcDir,
            temp = this.options.templateDir,
            proj = this.options.larkPropertiesFile,
            start = "index.html";


        fileNames.forEach(fileName => { 
            if (fileName == proj) {
                this.options.includeLark = true;
                this.buildProject();
                this.options.includeLark = false;
            }
            if (fileName.indexOf(src) < 0 && fileName.indexOf(temp) < 0 ) {
                return;
            }
            
            var relativePath = fileName.replace(src, '').replace(temp, '');
            var output = FileUtil.joinPath(this.options.debugDir, relativePath);
            if (FileUtil.exists(fileName)) {
                FileUtil.copy(fileName, output);
                console.log('Copy: ', fileName, "\n  to: ", output);
            }
            else {
                FileUtil.remove(output);
                console.log('Remove: ', output);
            }

            if (fileName.indexOf(start) >= 0)
                return this.onTemplateIndexChanged(fileName);
        });
    }


    private onTemplateIndexChanged(file: string): number {
        var index = FileUtil.joinPath(this.options.templateDir, "index.html");
        index = FileUtil.escapePath(index);
        console.log('Compile Template: ' + index);
        Action.compileTemplates(this.options);
        return 0;
    }

    private onServiceMessage(msg: lark.ServiceBuildCommand) {
        if (msg.command == 'build')
            this.buildChanges(msg.changes);
        if (msg.command == 'shutdown')
            process.exit(0);
    }

    private sendCommand(cmd?: lark.ServiceCommand) {
        if (!cmd) {
            var msg = this._lastMessages.length > 20 ? this._lastMessages.slice(0,20): this._lastMessages;
            cmd = {
                command: 'buildResult',
                exitCode: this._lastExitCode,
                messages: msg,
                path:this.options.projectDir
            }
        }
        service.execCommand(cmd, null, false);
    }
}

export = Build;