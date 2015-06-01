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

import Entry = require('../compiler/Entry');
import Action = require('../compiler/Action');
import watch = require("../lib/watch");
import utils = require("../lib/utils");
import FileUtil = require("../lib/FileUtil");
import server = require('../server/server');


class Run extends Action {
    run():number {
        if (this.options.autoCompile) {
            console.log(utils.tr(10010));
            this.watchFiles(this.options.srcDir);
            this.watchFiles(this.options.templateDir);
        }
        else {
            console.log(utils.tr(10012));
        }
        server.startServer(this.options, this.options.startUrl);
        console.log(utils.tr(10013, this.options.startUrl));
        Entry.sendBuildCMD((cmd:lark.ServiceCommandResult) => {});
        return 0;
    }
    private watchFiles(dir:string) {

        watch.createMonitor(dir, { persistent: true, interval: 2007 }, m=> {
            m.on("created", () => this.sendBuildCMD())
                .on("removed", () => this.sendBuildCMD())
                .on("changed", () => this.sendBuildCMD());
        })
    }
    private sendBuildCMD() {
        Entry.sendBuildCMD((cmd: lark.ServiceCommandResult) => {
            console.log('');
            if (cmd.exitCode == 0)
                console.log(utils.tr(10011));
            else
                console.log(utils.tr(10014));
            if (cmd.messages) {
                cmd.messages.forEach(m=> console.log(m));
            }
                
        });
    }
}

export = Run;