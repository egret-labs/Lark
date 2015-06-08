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
import htmlparser = require("../lib/htmlparser");
import tsclark = require("../lib/typescript/tsclark");
import UglifyJS = require("../lib/uglify-js/uglifyjs");


class Action {

    public constructor(options: lark.ICompileOptions) {
        this.options = options;
        this.projectDir = options.projectDir;
    }

    public projectDir: string;
    public options: lark.ICompileOptions;
    private projectManifest: any = {};
    private recompile: (files: string[]) => tsclark.Compiler.LarkCompileResult;

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
            release: "main.min.js"
        };

        this.options.projManifest = projManifest;

        compileResult.files = files;
        return compileResult;

    }

    public buildLarkSource():number{
        var self = this;
        var code = 0;
        var ANY = 'any';
        var options = this.options;
        var manifest = lark.manifest;
        var larkRoot = options.larkRoot;
        var penddings:lark.LarkModule[] = [];
        var dtsFiles: [string,string[]][] = [];
        var currentPlatform: string, currentConfig: string;
        var outputDir = this.getModuleOutputPath();
        
        var configurations: lark.CompileConfiguration[] = [
            { name: "debug", declaration: true },
            { name: "release", minify: true }
        ];
        

        this.clean(outputDir);

        manifest.modules.forEach(m=> {
            listModuleFiles(m);
            configurations.forEach(config=> {
                manifest.platforms.forEach(platform=> {
                    buildModule(m, platform, config);
                })
            })
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
        function buildModule(m:lark.LarkModule,platform:lark.LarkPlatform,configuration:lark.CompileConfiguration) {
            var name = m.name;
            var fileName = name;
            if (platform.name != ANY) {
                fileName += "." + platform.name;
            }
            if (configuration.minify) {
                fileName += ".min";
            }
            var depends = m.dependencies.map(name=> self.getModuleOutputPath(name,name+'.d.ts'));
            
            if(depends.some(path=>FileUtil.exists(path)==false)){
                penddings.push(m);
                return;
            }
            if (platform.name != ANY) {
                depends.push(self.getModuleOutputPath(m.name,name + '.d.ts'));
            }
            
            var outDir = self.getModuleOutputPath();
            var declareFile = self.getModuleOutputPath(m.name,fileName+".d.ts");
            var singleFile = self.getModuleOutputPath(m.name,fileName + ".js");
            var moduleRoot = FileUtil.joinPath(larkRoot,m.root);
            var tss: string[] = [];
            m.files.forEach(file=> {
                var path: string = null; 
                var sourcePlatform: string = null, sourceConfig: string = null;
                if (typeof (file) == 'string') {
                    path = <string>file;
                }
                else{
                    var source = <lark.LarkSourceFile>file;
                    path = source.path;
                    sourcePlatform = source.platform;
                    sourceConfig = source.debug === true ? "debug" : source.debug === false ? "release" : null;
                }

                var platformOK = sourcePlatform == null && platform.name == ANY || sourcePlatform == platform.name;
                var configOK = sourceConfig == null || sourceConfig == configuration.name;
                if (platformOK && configOK) {
                    tss.push(path);
                }            
            });
            if (tss.length == 0)
                return;
            tss = depends.concat(tss);
            var dts = platform.declaration && configuration.declaration;
            console.log("compile:" + m.name);
            var result = self.compile(options, tss, singleFile, null, dts);
            if (result.exitStatus != 0) {
                result.messages.forEach(m=> console.log(m));
            }
            if (dts) {
                dtsFiles.push([declareFile, depends]);
            }
            if(configuration.minify)
                self.minify(singleFile, singleFile);
        }
        
        function testPlatform(value,array:Array<any>) {
            return (value == ANY && (array == null || array.length == 0)) || (array && array.indexOf(value) >= 0);
        }
        function testConfig(value, array: Array<any>) {
            return value == ANY || array == null || array.indexOf(value) >= 0;
        }

        function listModuleFiles(m: lark.LarkModule) {
            var tsFiles = FileUtil.search(FileUtil.joinPath(options.larkRoot, m.root), "ts");
            var specFiles = {};
            m.files.forEach(f=> {
                var fileName = typeof (f) == 'string' ? <string>f : (<lark.LarkSourceFile>f).path;
                fileName = FileUtil.joinPath(m.root, fileName);
                fileName = FileUtil.joinPath(options.larkRoot, fileName);
                if (f['path'])
                    f['path'] = fileName;
                specFiles[fileName] = true;
            });
            tsFiles.forEach(f=> {
                if (!specFiles[f])
                    m.files.push(f);
            });
            console.log(m.files)
        }

        return code;
    }
    
    private getModuleOutputPath(m?: string, filePath: string = "") {
        var path = FileUtil.joinPath(this.options.larkRoot, "build/");
        if (m)
            path += m + '/';
        path += filePath;
        return path;
    }

    public copyLark(): number {
        var options = this.options;
        var moduleBin = this.getModuleOutputPath();
        var targetFile = FileUtil.joinPath(options.srcDir, '/libs/');
        FileUtil.copy(moduleBin, targetFile);
        return 0;
    }

    public copyTemplate() {
        var options = this.options;
        var templateFile = FileUtil.joinPath(options.templateDir, "index.html");
        if (!FileUtil.exists(templateFile))
            return;
        var larkFiles: string[] = [];

        var modules = options.project.modules;
        var platforms = options.project.platforms;
        modules.forEach(m=> {
            larkFiles.push(utils.format("libs/{0}/{0}", m.name));
            platforms.forEach(p=> larkFiles.push(utils.format("libs/{0}/{0}.{1}", m.name, p.name)));
        });

        
        var content = FileUtil.read(templateFile);
        var scripts = larkFiles.map(f=> utils.format('<script src="{0}.js" src-release="{0}.min.js"></script>',f)).join('\r\n    ');
        content = content.replace('<script id="lark"></script>', scripts);
        content = content.replace(/\$entry\-class\$/ig, "Main");
        content = content.replace(/\$scale\-mode\$/ig, options.project.scaleMode);
        content = content.replace(/\$content\-width\$/ig, options.project.contentWidth.toString());
        content = content.replace(/\$content\-height\$/ig, options.project.contentHeight.toString());
        content = content.replace(/\$show\-paint\-rects\$/ig, 'false');

        FileUtil.save(templateFile, content);
    }

    public static compileTemplates(options: lark.ICompileOptions) {

        var templateFile = FileUtil.joinPath(options.templateDir, "index.html");
        if (!FileUtil.exists(templateFile))
            return;
        var content = FileUtil.read(templateFile);
        if(options.publish)
            content = Action.replaceReleaseScript(content);

        var projFiles = options.publish ? [options.projManifest.release] : options.projManifest.files; 
        var scripts = projFiles.map(f=> utils.format('<script src="{0}"></script>', f)).join('\r\n    ');
        content = content.replace('<script id="project"></script>', scripts);

        var outputFile = FileUtil.joinPath(options.outDir, "index.html");
        FileUtil.save(outputFile, content);
    }

    // Use release src to replace the src of scripts
    //  from: <script src="libs/lark.js" src-release="libs/lark.min.js"></script>
    //  to:   <script src="libs/lark.min.js"></script>
    private static replaceReleaseScript(html:string):string {
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if (error)
                console.log(error);
        });
        var scriptWithReleaseSrc: htmlparser.Element[] = [];
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(html);
        handler.dom.forEach(d=> visitDom(d));
        replaceReleaseTags();
        return html;

        function visitDom(el: htmlparser.Element) {
            if (el.type == 'script' && el.attribs && el.attribs['src-release']) {
                scriptWithReleaseSrc.push(el);
            }
            if (el.children) {
                el.children.forEach(e=> visitDom(e));
            }
        }

        function replaceReleaseTags() {
            scriptWithReleaseSrc.forEach(s=> {
                html = html.replace(s.raw, 'script src="' + s.attribs['src-release'] + '"');
            });
        }
    }

    public compile(options: lark.ICompileOptions, files: string[], out?: string, outDir?: string, def?: boolean) {
        var defTemp = options.declaration;
        options.declaration = def;
        files = files.map(f=> f.replace(options.projectDir, ""));
        var compileResult = tsclark.Compiler.executeWithOption(options, files, out, outDir);

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
}

tsclark.Compiler.exit = exitCode => {
    if (exitCode != 0)
        console.log(utils.tr(10003, exitCode));
    return exitCode;
};


export = Action;