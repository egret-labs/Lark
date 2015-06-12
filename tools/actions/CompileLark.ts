
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import Compiler = require('./Compiler');
import FileUtil = require('../lib/FileUtil');
import tsclark = require("../lib/typescript/tsclark");


var ANY = 'any';

class CompileLark {
    private compiler:Compiler;
    private dtsFiles: [string,string[]][] = [];
	public make():number{
        var self = this;
        var code = 0;
        var options = lark.options;
        var manifest = lark.manifest;
        var penddings:lark.LarkModule[] = [];
        var currentPlatform: string, currentConfig: string;
        var outputDir = this.getModuleOutputPath();
        this.compiler = new Compiler();
        var configurations: lark.CompileConfiguration[] = [
            { name: "debug", declaration: true },
            { name: "release", minify: true }
        ];
        

        utils.clean(outputDir);

        for (var i = 0; i < manifest.modules.length; i++) {
            var m = manifest.modules[i];
            listModuleFiles(m);
            for (var j = 0; j < configurations.length; j++) {
                var config = configurations[j];
                for (var k = 0; k < manifest.platforms.length; k++) {
                    var platform = manifest.platforms[k];
                    code = this.buildModule(m, platform, config);
                    if(code!=0)
                        return code;
                }
            }
        }

        this.hideInternalMethods();
        return code;
    }
    
    private buildModule(m:lark.LarkModule,platform:lark.LarkPlatform,configuration:lark.CompileConfiguration) {
        var name = m.name;
        var fileName = name;
        var options = lark.options;
        var larkRoot = lark.options.larkRoot;
        if (platform.name != ANY) {
            fileName += "." + platform.name;
        }
        if (configuration.minify) {
            fileName += ".min";
        }
        var depends = m.dependencies.map(name=> this.getModuleOutputPath(name,name+'.d.ts'));
        
        if (platform.name != ANY) {
            depends.push(this.getModuleOutputPath(m.name,name + '.d.ts'));
        }
        
        var outDir = this.getModuleOutputPath();
        var declareFile = this.getModuleOutputPath(m.name,fileName+".d.ts");
        var singleFile = this.getModuleOutputPath(m.name,fileName + ".js");
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
            return 0;
        tss = depends.concat(tss);
        var dts = platform.declaration && configuration.declaration;
        var result = this.compiler.compile({args:options,def:dts,out:singleFile,files:tss,outDir:null});
        if (result.exitStatus != 0) {
            result.messages.forEach(m=> console.log(m));
            return result.exitStatus;
        }
        if (dts) {
            this.dtsFiles.push([declareFile, depends]);
        }
        if(configuration.minify) {
            utils.minify(singleFile, singleFile);
        }
        return 0;
    }
    
    private getModuleOutputPath(m?: string, filePath: string = "") {
        var path = FileUtil.joinPath(lark.options.larkRoot, "build/");
        if (m)
            path += m + '/';
        path += filePath;
        return path;
    }
    
    private hideInternalMethods(){
        
        var tempDts: string[] = [];
        global.ignoreDollar = true;
        this.dtsFiles.forEach(d=> {
            var dts = d[0], depends = d[1];
            var tempDtsName = dts.replace(/\.d\.ts/, 'd.ts');
            var singleFile = dts.replace(/\.d\.ts/, 'd.js');
            FileUtil.copy(dts, tempDtsName);
            var tss = depends.concat(tempDtsName);
            var result = this.compiler.compile({ args: lark.options, def: true, out: singleFile, files: tss, outDir: null });
            if (result.messages && result.messages.length) {
                result.messages.forEach(m=> console.log(m));
            }
            FileUtil.remove(singleFile);
            FileUtil.remove(tempDtsName);
            tempDts.push(tempDtsName.replace(/\.ts$/,'.d.ts'));
        });

        this.dtsFiles.forEach(d=> {
            FileUtil.remove(d[0]);
        });

        tempDts.forEach(d=> {
            var dts = d.replace(/d\.d\.ts$/, '.d.ts');
            FileUtil.copy(d, dts);
            FileUtil.remove(d);
        })

        global.ignoreDollar = false;
    }
    
}



        
function testPlatform(value,array:Array<any>) {
    return (value == ANY && (array == null || array.length == 0)) || (array && array.indexOf(value) >= 0);
}

function testConfig(value, array: Array<any>) {
    return value == ANY || array == null || array.indexOf(value) >= 0;
}

function listModuleFiles(m: lark.LarkModule) {
    var tsFiles = [];
    if(m.noOtherTs!==true)
        tsFiles = FileUtil.search(FileUtil.joinPath(lark.options.larkRoot, m.root), "ts");
    var specFiles = {};
    m.files.forEach(f=> {
        var fileName = typeof (f) == 'string' ? <string>f : (<lark.LarkSourceFile>f).path;
        fileName = FileUtil.joinPath(m.root, fileName);
        fileName = FileUtil.joinPath(lark.options.larkRoot, fileName);
        if (f['path'])
            f['path'] = fileName;
        specFiles[fileName] = true;
    });
    tsFiles.forEach(f=> {
        if (!specFiles[f])
            m.files.push(f);
    });
}

export = CompileLark;