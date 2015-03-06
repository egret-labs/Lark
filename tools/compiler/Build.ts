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

import TypeScript = require("../lib/typescript/tsc");
import FileUtil = require("../lib/FileUtil");

class Build {

    public constructor(projectDir:string) {
        this.projectDir = projectDir;
    }

    private projectDir:string;

    public run():void {

        //清理bin-debug目录
        var debugPath = FileUtil.joinPath(this.projectDir, "bin-debug/");
        var fileList = FileUtil.getDirectoryListing(debugPath);
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            FileUtil.remove(path);
        }
        //拷贝模板文件
        var tempatePath = FileUtil.joinPath(this.projectDir, "template/");
        fileList = FileUtil.getDirectoryListing(tempatePath);
        length = fileList.length;
        for (i = 0; i < length; i++) {
            path = fileList[i];
            var destPath = path.substring(tempatePath.length);
            destPath = FileUtil.joinPath(debugPath, destPath);
            FileUtil.copy(path, destPath);
        }
        var srcPath:string = FileUtil.joinPath(this.projectDir, "src");
        var tsList:string[] = FileUtil.search(srcPath, "ts");
        var output = FileUtil.joinPath(this.projectDir, "bin-debug");
        var cmd = tsList.join(" ") + " -t ES5 --outDir " + "\"" + output + "\"";
        FileUtil.save("tsc_config_temp.txt", cmd);
        TypeScript.exit = function (exitCode:number):void {
            FileUtil.remove("tsc_config_temp.txt");
            if(exitCode!=0){
                process.exit(exitCode);
            }
        };
        TypeScript.executeCommandLine(["@tsc_config_temp.txt"]);
    }

}

export = Build;