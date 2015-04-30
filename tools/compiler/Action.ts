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

import TypeScript = require("../lib/typescript/tsc");
import FileUtil = require("../lib/FileUtil");
import utils = require('../lib/utils');
import UglifyJS = require("../lib/uglify-js/uglifyjs");

class Action {

    public constructor(options: lark.ICompileOptions) {
        this.options = options;
        this.projectDir = options.projectDir;
    }

    public projectDir: string;
    public options: lark.ICompileOptions;

    public run(): number {
        return 0;
    }


    public clean(path: string) {

        var fileList = FileUtil.getDirectoryListing(path);
        var length = fileList.length;
        for (var i = 0; i < length; i++)
        {
            var path = fileList[i];
            FileUtil.remove(path);
        }
    }


    public buildProject() {
        var option: lark.ICompileOptions = this.options;

        //拷贝lark.js
        if (!option.publish && FileUtil.exists(option.srcLarkFile))
        {
            FileUtil.copy(option.srcLarkFile, option.outLarkFile);
        }

        var tsList: string[] = FileUtil.search(option.srcDir, "ts");
        var compileResult = this.compile(option, tsList, option.out, option.outDir);
        var larkRootSrc = FileUtil.escapePath(this.options.srcDir);
        var files: string[] = [];
        compileResult.files.forEach(f=> {
            if (!f)
                return;
            if (/\.d\.ts$/.test(f))
                return;
            f = FileUtil.escapePath(f);
            f = f.replace(larkRootSrc, '').replace(/\.ts$/, '.js');
            files.push(f);
        });
        compileResult.files = files;
        return compileResult;

    }

    public buildLark(): number {

        var options: lark.ICompileOptions = this.options;
        var larkRoot = options.larkRoot;
        var srcPath: string = FileUtil.joinPath(larkRoot, "src");
        var tsList: string[] = FileUtil.search(srcPath, "ts");

        var separate = options.projectProperties.keepLarkInSeparatedFiles;


        var output = separate ? null : options.srcLarkFile;
        var outDir = separate ? FileUtil.joinPath(options.projectDir,'temp') : null;

        if (FileUtil.exists(output))
            FileUtil.remove(output);

        var larkFiles = {
            files: []
        };

        var compileResult = this.compile(options, tsList, output, outDir, !options.publish);
        if (compileResult.exitCode == 0)
        {
            if (separate) {

                var defineFiles = FileUtil.searchByFunction(outDir,(f: string) => /\.d\.ts$/.test(f));
                var contents = [];
                defineFiles.forEach(f=> contents.push(FileUtil.read(f)));
                var defFileContent = contents.join('\r\n');
                FileUtil.save(FileUtil.joinPath(options.srcDir, 'lark/lark.d.ts'), defFileContent);


                var larkRootSrc = FileUtil.escapePath(options.larkRoot) + '/src/';
                compileResult.files.forEach(f=> {
                    if (!f)
                        return;
                    if (/\.d\.ts$/.test(f))
                        return;
                    f = FileUtil.escapePath(f);
                    f = f.replace(larkRootSrc, '').replace(/\.ts$/, '.js');
                    f = "lark/" + f;
                    larkFiles.files.push(f);
                });


                defineFiles.forEach(f=> FileUtil.remove(f));
                FileUtil.copy(outDir, FileUtil.joinPath(options.templateDir, 'lark/'));
                FileUtil.remove(outDir);
            }
            else {
                FileUtil.copy(output, options.outLarkFile);
                var file = options.outLarkFile.replace(options.outDir, '');
                if (file.indexOf('/') == 0)
                    file = file.substr(1);
                larkFiles.files.push(file);
            }

            var json = JSON.stringify(larkFiles, null, '   ');
            FileUtil.save(FileUtil.joinPath(options.srcDir, 'lark/lark.json'), json);
        }
        return compileResult.exitCode;
    }

    private compile(options: lark.ICompileOptions, files: string[], out?: string, outDir?: string, def?: boolean) {
        var defTemp = options.declaration;
        options.declaration = def;

        var compileResult = TypeScript.executeWithOption(options, files, out, outDir, def);

        options.declaration = defTemp;

        if (!options.minify)
            return compileResult;

        
        if (!out)
        {
            console.log(utils.tr(10004));
            return compileResult;
        }

        var defines = {
            DEBUG: false,
            RELEASE: true
        }
        //UglifyJS参数参考这个页面：https://github.com/mishoo/UglifyJS2
        var result = UglifyJS.minify(out, { compress: { global_defs: defines }, output: { beautify: false } });
        FileUtil.save(out, result.code);

        return compileResult;
    }

    public copyDirectory(from: string, to: string) {

        var fileList = FileUtil.getDirectoryListing(from);
        length = fileList.length;
        for (var i = 0; i < length; i++)
        {
            var path = fileList[i];
            var destPath = path.substring(from.length);
            destPath = FileUtil.joinPath(to, destPath);
            FileUtil.copy(path, destPath);
        }
    }
}

TypeScript.exit = exitCode => {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};


export = Action;