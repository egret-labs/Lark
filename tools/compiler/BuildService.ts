/// <reference path="../lib/types.d.ts" />

import events = require('events');
import Action = require('./Action');
import exmlc = require('../lib/exml/exmlc');
import FileUtil = require("../lib/FileUtil");
import typeScriptService = require("./TsService");
import chokidar = require("../lib/chokidar/index");



class BuildService {
    static instance: BuildService = null;
    fileMonitor: chokidar.FSWatcher;
    tss: typeScriptService;
    setting: lark.ICompileOptions;
    start(settings: lark.ICompileOptions) {
        this.setting = settings;
        this.tss = new typeScriptService(settings);
        this.createEXMLMonitor(settings.srcDir);
        this.createTypeScriptMonitor(settings.srcDir);
        this.createTemplateMonitor(settings.templateDir);
    }


    createTypeScriptMonitor(folder: string) {
        chokidar.watch(folder, { ignoreInitial:true,ignored: [f=> !this.typeScriptFilter(f)] })
            .on('add', f=> this.tss.fileChanged(f, true, this.getTypeScriptOutputFileName(f)))
            .on('change', f=> this.tss.fileChanged(f, true, this.getTypeScriptOutputFileName(f)))
            .on('unlink', f=> this.tss.fileChanged(f, true, this.getTypeScriptOutputFileName(f)));
    }

    typeScriptFilter(fileName:string):boolean {
        if (FileUtil.isDirectory(fileName))
            return true;
        if (endWith(fileName, '.ts'))
            return true;
        return false;
    }
    getTypeScriptOutputFileName(fileName: string) {
        fileName = FileUtil.escapePath(fileName);
        var relativePath = fileName.replace(this.setting.srcDir, '').replace(/\.ts$/, '.js');
        var output = FileUtil.joinPath(this.setting.debugDir, relativePath);
        return output;
    }


    createTemplateMonitor(folder: string) {
        chokidar.watch(folder, { ignoreInitial: true })
            .on('add', f=> this.onTemplateFileChanged(f))
            .on('change', f=> this.onTemplateFileChanged(f))
            .on('unlink', f=> this.onTemplateFileChanged(f));
    }
    getTemplateOutputFileName(fileName:string) {
        fileName = FileUtil.escapePath(fileName);
        var relativePath = fileName.replace(this.setting.templateDir, '');
        var output = FileUtil.joinPath(this.setting.debugDir, relativePath);
        return output;
    }
    onTemplateFileChanged(f:string) {
        f = FileUtil.escapePath(f);
        if (f.indexOf(this.setting.projectProperties.startupHtml) >= 0)
            return this.onTemplateIndexChanged(f);
        var output = this.getTemplateOutputFileName(f);
        console.log('Copy: ', f,"\n  to: ", output);
        if (FileUtil.exists(f)) {
            FileUtil.copy(f, output);
        }
        else {
            FileUtil.remove(output);
        }
    }
    onTemplateIndexChanged(file: string) {
        file = FileUtil.escapePath(file);
        var index = FileUtil.joinPath(this.setting.templateDir, this.setting.projectProperties.startupHtml);
        index = FileUtil.escapePath(index);
        if (file != index)
            return;
        var tsFiles = this.tss.host.getScriptFileNames();
        var jsFiles = Action.GetJavaScriptFileNames(tsFiles, this.setting.srcDir);
        Action.compileTemplates(jsFiles, this.setting);
    }

    createEXMLMonitor(folder: string) {
        chokidar.watch(folder, { ignoreInitial: true, ignored: [f=> !this.exmlFileFilter(f)] })
            .on('add', f=> this.compileExmlFile(f))
            .on('change', f=> this.compileExmlFile(f))
            .on('unlink', f=> this.removeExmlTsOutput(f));
    }
    exmlFileFilter(fileName: string): boolean {
        if (FileUtil.isDirectory(fileName))
            return true;
        if (endWith(fileName, '.exml'))
            return true;
        return false;
    }
    compileExmlFile(file: string) {
        console.log('Compile Exml: ', file);
        exmlc.compile(file, this.setting.srcDir);
    }
    removeExmlTsOutput(fileName: string) {
        fileName = FileUtil.escapePath(fileName);
        var output = fileName.replace(/\.exml/, '.ts');
        FileUtil.remove(fileName);
    }
}


function endWith(text: string, match: string) {
    return text.lastIndexOf(match) == (text.length - match.length);
}


export = BuildService;