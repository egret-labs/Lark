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
import TypeScript = require("../lib/typescript/tsclark");
import UglifyJS = require("../lib/uglify-js/uglifyjs");


class Action {

    public constructor(options: lark.ICompileOptions) {
        this.options = options;
        this.projectDir = options.projectDir;
    }

    public projectDir: string;
    public options: lark.ICompileOptions;
    private projectManifest: any = {};
    private recompile: (files: string[]) => TypeScript.LarkCompileResult;

    public run(): number {
        return 0;
    }


    public clean(path: string,...excludes:string[]) {

        var fileList = FileUtil.getDirectoryListing(path);
        var length = fileList.length;
        for (var i = 0; i < length; i++)
        {
            var path = fileList[i];
            if (excludes && excludes.indexOf(path) >= 0)
                continue;
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

        //this.compileExmls();

        var tsList: string[] = FileUtil.search(option.srcDir, "ts");
        var compileResult = this.compile(option, tsList, option.out, option.outDir);
        var srcDir = FileUtil.escapePath(this.options.srcDir);
        var files: string[] = Action.GetJavaScriptFileNames(compileResult.files, /^src\//);

        var projManifest = {
            files: files,
            release: option.project.name + ".min.js"
        };

        this.options.projManifest = projManifest;

        compileResult.files = files;
        return compileResult;

    }

    public buildLarkSource():number{
        var self = this;
        var code = 0;
        var options = this.options;
        var penddings:lark.LarkModule[] = [];
        var larkRoot = options.larkRoot;
        var dtsFiles: [string,string[]][] = [];
        var self = this;

        var manifestPath = FileUtil.joinPath(larkRoot, "manifest.json");
        console.log(manifestPath);
        var content = FileUtil.read(manifestPath);
        var manifest:lark.LarkManifest = null;
        console.log(content);
        try{ manifest = JSON.parse(content) }
        catch(e){ utils.exit(10009) }
        
        
        manifest.modules.forEach(m=>{
            buildModule(m);
        });
        var tempDts: string[] = [];

        global.ignoreDollar = true;

        dtsFiles.forEach(d=> {
            var dts = d[0], depends = d[1];
            var tempDtsName = dts.replace(/\.d\.ts/, 'd.ts');
            var singleFile = dts.replace(/\.d\.ts/, 'd.js');
            FileUtil.copy(dts, tempDtsName);
            var tss = depends.concat(tempDtsName);
            self.compile(options, tss, singleFile, null, true);
            FileUtil.remove(singleFile);
            FileUtil.remove(tempDtsName);
            tempDts.push(tempDtsName.replace(/\.ts$/,'.d.ts'));
        });

        dtsFiles.forEach(d=> {
            FileUtil.remove(d[0]);
        });

        tempDts.forEach(d=> {
            var dts = d.replace(/d\.d\.ts$/, '.d.ts');
            FileUtil.copy(d, dts);
            FileUtil.remove(d);
        })

        global.ignoreDollar = false;
        function buildModule(larkModule:lark.LarkModule) {
            var name = larkModule.name;
            var depends = larkModule.dependencies.map(name=> self.getModuleOutputPath(name+'.d.ts'));
            
            if(depends.some(path=>FileUtil.exists(path)==false)){
                penddings.push(larkModule);
                return;
            }
            
            var outDir = self.getModuleOutputPath();
            var declareFile = self.getModuleOutputPath(name+".d.ts");
            var singleFile = self.getModuleOutputPath( name + ".js");
            var moduleRoot = FileUtil.joinPath(larkRoot,larkModule.root);
            var tss: string[] = [];
            dtsFiles.push([declareFile, depends]);
            larkModule.files.forEach(file=>{
                if(typeof(file)=='string'){
                    var tsfile = FileUtil.joinPath(moduleRoot,<string>file);
                    tss.push(tsfile);
                }
                else{
                    var folderOption = <any>file;
                    var folder = FileUtil.joinPath(moduleRoot,folderOption.dir);
                    console.log(folder);
                    var regex = folderOption.filter && new RegExp(folderOption.filter);
                    folderOption.test = regex == undefined ? ()=>true:f=>regex.test(f);
                    var files = FileUtil.searchByFunction(folder,folderOption.test);
                    console.log(files);
                    tss = tss.concat(files);
                }
            
            });
            tss = depends.concat(tss);
            self.compile(options, tss, singleFile, null, true);
            self.minify(singleFile, singleFile.replace(/\.js$/, '.min.js'));
        }
        
        return code;
    }
    
    private getModuleOutputPath(filePath: string = "") {
        var path = FileUtil.joinPath(this.options.larkRoot, "build/" + filePath);
        return path;
    }
    public copyLarkBuild(): number {

        var options: lark.ICompileOptions = this.options;
        var modulesUsed = options.project.modules;
        var jsFileExtension = options.publish ? ".min.js" : ".js";
        modulesUsed.forEach(m=> {
            var moduleBin = this.getModuleOutputPath(m.name + jsFileExtension);
            var targetFile = FileUtil.joinPath(options.outDir, '/libs/' + m.name + jsFileExtension);
            FileUtil.copy(moduleBin, targetFile);            
        });

        return 0;
    }

    public copyLarkDeclare(): number {

        var options = this.options;
        var modulesUsed = options.project.modules;
        modulesUsed.forEach(m=> {
            var moduleDeclare = this.getModuleOutputPath(m.name + ".d.ts");
            var targetDeclare = FileUtil.joinPath(options.srcDir, '/libs/' + m.name + ".d.ts");
            FileUtil.copy(moduleDeclare, targetDeclare);
        });

        return 0;
    }


    public static compileTemplates(options:lark.ICompileOptions) {
        var templateFile = FileUtil.joinPath(options.templateDir, options.project.startupHtml);

        var larkFiles: string[] = [];
        var projFiles: string[] = [];

        var modules = options.project.modules;
        var jsext = options.publish ? ".min.js" : ".js";
        modules.forEach(m=> {
            larkFiles.push('libs/' + m.name + jsext);
        });

        var dir = options.templateDir;
        projFiles = options.publish ? [options.projManifest.release] : options.projManifest.files;
        

        var manifests = [{
            files: larkFiles,
            replacement: '<script id="lark"></script>'
        }, {
            files: projFiles,
            replacement: '<script id="project"></script>'
        }];

        var content = FileUtil.read(templateFile);
        manifests.forEach(manifest=> {
            var scripts = manifest.files.map(f=> ['<script src="', f, '"></script>'].join('')).join('\r\n');
            content = content.replace(manifest.replacement, scripts);
        });

        content = content.replace(/\$entry\-class\$/ig, options.project.entry);
        content = content.replace(/\$scale\-mode\$/ig, options.project.scaleMode);
        content = content.replace(/\$content\-width\$/ig, options.project.contentWidth.toString());
        content = content.replace(/\$content\-height\$/ig, options.project.contentHeight.toString());
        content = content.replace(/\$show\-paint\-rects\$/ig, options.project.showPaintRects ? 'true' : 'false');


        var outputFile = FileUtil.joinPath(options.outDir, options.project.startupHtml);
        FileUtil.save(outputFile, content);
    }

    public compile(options: lark.ICompileOptions, files: string[], out?: string, outDir?: string, def?: boolean) {
        var defTemp = options.declaration;
        options.declaration = def;
        console.log(options.projectDir);
        files = files.map(f=> f.replace(options.projectDir, ""));
        var compileResult = TypeScript.executeWithOption(options, files, out, outDir);

        options.declaration = defTemp;
        this.recompile = compileResult.compileWithChanges;
        if (!options.minify)
            return compileResult;

        
        if (!out)
        {
            console.log(utils.tr(10004));
            return compileResult;
        }

        this.minify(out, out);

        return compileResult;
    }

    public get canRecompile() {
        return this.recompile != null;
    }

    public recompileChanges(files: string[]) {
        files = files.map(f=> f.replace(this.options.projectDir, ""));
        return this.recompile(files);
    }

    public minify(sourceFile: string, output: string) {


        var defines = {
            DEBUG: false,
            RELEASE: true
        }
        //UglifyJS参数参考这个页面：https://github.com/mishoo/UglifyJS2
        var result = UglifyJS.minify(sourceFile, { compress: { global_defs: defines }, output: { beautify: false } });
        FileUtil.save(output, result.code);
    }

    /**
    * 复制文件夹及其子文件夹下所有的文件
    * @param from 要搜索的文件夹
    * @param to 目标文件夹
    * @param filter 过滤函数：filter(file:string):boolean,参数为遍历过程中的每一个文件，返回true则加入结果列表
    */
    public copyDirectory(from: string, to: string, filter?: (filename: string) => boolean) {
        var fileList: string[] = [];
        if (!filter)
            fileList = FileUtil.getDirectoryListing(from);
        else
            fileList = FileUtil.searchByFunction(from, filter);
        length = fileList.length;
        for (var i = 0; i < length; i++) {
            var path = fileList[i];
            var destPath = path.substring(from.length);
            destPath = FileUtil.joinPath(to, destPath);
            FileUtil.copy(path, destPath);
        }
    }

    static fileExtensionToIgnore = {
        "ts": true
    };

    public srcFolderOutputFilter(file: string) {
        var extension = FileUtil.getExtension(file);
        if (extension in Action.fileExtensionToIgnore)
            return false;
        return true;
    }
    static GetJavaScriptFileNames(tsFiles: string[],root:string|RegExp,prefix?:string) {
        var files: string[] = [];
        tsFiles.forEach(f=> {
            if (!f)
                return;
            if (/\.d\.ts$/.test(f))
                return;
            f = FileUtil.escapePath(f);
            f = f.replace(<any>root, '').replace(/\.ts$/, '.js').replace(/^\//,'');
            if (prefix) {
                f = prefix + f;
            }
            files.push(f);
        });
        return files;
    }

    public saveProject() {

        var propjson = lark.options.project.toJSON();
        FileUtil.save(FileUtil.joinPath(lark.options.projectDir, 'lark.json'), JSON.stringify(propjson, null, '   '));
    }
}

TypeScript.exit = exitCode => {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};


export = Action;