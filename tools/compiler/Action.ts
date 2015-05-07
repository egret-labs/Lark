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

import utils = require('../lib/utils');
import exmlc = require('../lib/exml/exmlc');
import FileUtil = require("../lib/FileUtil");
import TypeScript = require("../lib/typescript/tsc");
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


    public compileExmls() {
        var option: lark.ICompileOptions = this.options;
        var exmls: string[] = FileUtil.search(option.srcDir, "exml");
        exmls.forEach(exml=> {
            exmlc.compile(exml, option.srcDir);
        });
    }

    public compileProject() {
        var option: lark.ICompileOptions = this.options;

        this.compileExmls();

        var tsList: string[] = FileUtil.search(option.srcDir, "ts");
        var compileResult = this.compile(option, tsList, option.out, option.outDir);
        var larkRootSrc = FileUtil.escapePath(this.options.srcDir);
        var files: string[] = Action.GetJavaScriptFileNames(compileResult.files, larkRootSrc);

        var projManifest = {
            files: files
        };

        var json = JSON.stringify(projManifest, null, '   ');
        FileUtil.save(this.options.projManifest, json);

        compileResult.files = files;
        return compileResult;

    }

    public buildLark(): number {

        var options: lark.ICompileOptions = this.options;
        var larkRoot = options.larkRoot;
        var srcPath: string = FileUtil.joinPath(larkRoot, "src");
        var tsList: string[] = FileUtil.search(srcPath, "ts");

        var separate = options.projectProperties.keepLarkInSeparatedFiles;


        var output = separate ? null : FileUtil.joinPath(options.templateDir, '/lark/lark.js');
        var outDir = separate ? FileUtil.joinPath(options.templateDir,'/lark/') : null;

        if (FileUtil.exists(output))
            FileUtil.remove(output);

        var larkFiles = {
            files: []
        };

        var compileResult = this.compile(options, tsList, output, outDir, !options.publish);
        if (compileResult.exitCode == 0)
        {
            if (!separate) {
                outDir = FileUtil.joinPath(options.templateDir, 'lark/');
            }

            var defineFiles = FileUtil.searchByFunction(outDir,(f: string) => /\.d\.ts$/.test(f));
            var contents = [];
            defineFiles.forEach(f=> contents.push(FileUtil.read(f)));
            var defFileContent = contents.join('\r\n');
            FileUtil.save(FileUtil.joinPath(options.srcDir, 'lark/lark.d.ts'), defFileContent);



            var larkBinFiles = FileUtil.search(outDir, 'js');
            larkFiles.files = Action.GetJavaScriptFileNames(larkBinFiles, options.templateDir);


            defineFiles.forEach(f=> FileUtil.remove(f));

            var json = JSON.stringify(larkFiles, null, '   ');
            FileUtil.save(options.larkManifest, json);
        }
        return compileResult.exitCode;
    }


    public static compileTemplates(options:lark.ICompileOptions) {

        var templateFile = FileUtil.joinPath(options.templateDir, options.projectProperties.startupHtml);
        var content = FileUtil.read(templateFile);

        var manifests = [{
            manifest: options.larkManifest,
            replacement: '<script id="lark"></script>'
        }, {
            manifest: options.projManifest,
            replacement: '<script id="project"></script>'
        }];

        manifests.forEach(manifest=> {
            if (FileUtil.exists(manifest.manifest) && content.indexOf(manifest.replacement) >= 0) {
                var json = FileUtil.read(manifest.manifest);
                var lark = JSON.parse(json);
                var files: string[] = lark.files;
                var scripts = files.map(f=> ['<script src="', f, '"></script>'].join('')).join('\r\n');
                content = content.replace(manifest.replacement, scripts);
            }
        });

        content = content.replace(/\$entry\-class\$/ig, options.projectProperties.entry);
        content = content.replace(/\$scale\-mode\$/ig, options.projectProperties.scaleMode);
        content = content.replace(/\$content\-width\$/ig, options.projectProperties.contentWidth.toString());
        content = content.replace(/\$content\-height\$/ig, options.projectProperties.contentHeight.toString());
        content = content.replace(/\$show\-paint\-rects\$/ig, options.projectProperties.showPaintRects ? 'true' : 'false');


        var outputFile = FileUtil.joinPath(options.debugDir, options.projectProperties.startupHtml);
        FileUtil.save(outputFile, content);
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
    static GetJavaScriptFileNames(tsFiles: string[],root:string,prefix?:string) {
        var files: string[] = [];
        tsFiles.forEach(f=> {
            if (!f)
                return;
            if (/\.d\.ts$/.test(f))
                return;
            f = FileUtil.escapePath(f);
            f = f.replace(root, '').replace(/\.ts$/, '.js').replace(/^\//,'');
            if (prefix) {
                f = prefix + f;
            }
            files.push(f);
        });
        return files;
    }
}

TypeScript.exit = exitCode => {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};


export = Action;