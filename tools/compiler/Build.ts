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

import TypeScript = require("../lib/typescript/tsc");
import FileUtil = require("../lib/FileUtil");
import utils = require('../lib/utils');

class Build {

    public constructor(options: lark.CompileOptions) {
        this.options = options;
        this.projectDir = options.projectDir;
    }

    private projectDir: string;
    private options: lark.CompileOptions;

    public run(): void {

        this.clean();


        var task = Promise.resolve(0);
        if (this.options.includeLark)
            task = task.then((r) => Build.buildLark(this.options));
        task.then(r=> Build.buildProject(this.options));
    }

    public clean() {
        //清理bin-debug目录
        var debugPath = FileUtil.joinPath(this.projectDir, "bin-debug/");
        var fileList = FileUtil.getDirectoryListing(debugPath);
        var length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            FileUtil.remove(path);
        }
    }

    public static buildProject(option: lark.CompileOptions): Promise<number> {
        
        //拷贝模板文件
        var debugPath = FileUtil.joinPath(option.projectDir, "bin-debug/");
        var tempatePath = FileUtil.joinPath(option.projectDir, "template/");
        var fileList = FileUtil.getDirectoryListing(tempatePath);
        length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            var destPath = path.substring(tempatePath.length);
            destPath = FileUtil.joinPath(debugPath, destPath);
            FileUtil.copy(path, destPath);
        }

        //拷贝lark.js
        var output = FileUtil.joinPath(option.projectDir, "src/lark/lark.js");
        if (FileUtil.exists(output)) {
            var destOut = FileUtil.joinPath(option.projectDir, "bin-debug/lark/lark.js");
            FileUtil.copy(output, destOut);
        }

        var srcPath: string = FileUtil.joinPath(option.projectDir, "src");
        var tsList: string[] = FileUtil.search(srcPath, "ts");
        output = FileUtil.joinPath(option.projectDir, "bin-debug");
        return Build.compile(option,tsList, null, output);
    }

    public static buildLark(options: lark.CompileOptions): Promise<number> {
        var larkRoot = options.larkRoot;
        var srcPath: string = FileUtil.joinPath(larkRoot, "src");
        var tsList: string[] = FileUtil.search(srcPath, "ts");
        var output = FileUtil.joinPath(options.projectDir, "src/lark/lark.js");
        var destOut = FileUtil.joinPath(options.projectDir, "bin-debug/lark/lark.js");

        if (FileUtil.exists(output))
            FileUtil.remove(output);
        return Build.compile(options,tsList, output, null, true).then(code=> {
            if (code == 0) {
                FileUtil.copy(output, destOut);
            }
            return code;
        });;
    }

    private static compile(options:lark.CompileOptions, files: string[], out?: string, outDir?: string, def?: boolean): Promise<number> {

        var promise = new Promise<number>((resolve, reject) => {
            var cmd = files.join(" ") + " -t " + options.esTarget;
            if (options.sourceMap)
                cmd += ' --sourcemap';
            //if (options.removeComments)
                cmd += ' --removeComments';
            if (out)
                cmd += " --out " + '"' + out + '"';
            if (outDir)
                cmd += " --outDir " + '"' + outDir + '"';
            if (def)
                cmd += ' -d';

            console.log("start build");

            FileUtil.save("tsc_config_temp.txt", cmd);
            TypeScript.exit = function (exitCode: number): void {
                FileUtil.remove("tsc_config_temp.txt");
                console.log("delete");
                resolve(exitCode);
            };
            try {
                TypeScript.executeCommandLine(["@tsc_config_temp.txt"]);
            }
            catch (e) {
                console.log(e,e.stack);
                resolve(0);
            }
        });
        return promise;
    }
}

export = Build;