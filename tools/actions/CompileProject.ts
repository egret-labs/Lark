
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import Compiler = require('./Compiler');
import FileUtil = require('../lib/FileUtil');
import tsclark = require("../lib/typescript/tsclark");


class CompileProject {
    public compileProject(option:lark.LarkToolArgs, files?:string[]) {
        
        if(files&&this.recompile){
            files = files.map(f=> f.replace(option.projectDir, ""));
            this.recompile(files);
            return;
        }
        
        var compiler = new Compiler();
        var tsList: string[] = FileUtil.search(option.srcDir, "ts");
        var compileResult = compiler.compile({
            args:option,
            files:tsList,
            out:option.out,
            outDir:option.outDir
        });
        
        var files: string[] = GetJavaScriptFileNames(compileResult.files, /^src\//);

        compileResult.files = files;
        this.recompile = compileResult.compileWithChanges;
        return compileResult;

    }
    
    private recompile: (files: string[]) => tsclark.Compiler.LarkCompileResult;
}

function GetJavaScriptFileNames(tsFiles: string[],root:string|RegExp,prefix?:string) {
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


export = CompileProject;