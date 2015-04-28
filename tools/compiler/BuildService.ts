/// <reference path="../lib/types.d.ts" />

import events = require('events');
import chokidar = require("../lib/chokidar/index");
import typeScriptService = require("./TsService");
import FileUtil = require("../lib/FileUtil");



class BuildService {
    static instance: BuildService = null;
    fileMonitor: chokidar.FSWatcher;
    tss: typeScriptService;
    setting: lark.ICompileOptions;
    start(settings: lark.ICompileOptions) {
        this.setting = settings;
        this.tss = new typeScriptService(settings);
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
    onTemplateFileChanged(f) {
        var output = this.getTemplateOutputFileName(f);
        console.log('changed ', f, output);
        if (FileUtil.exists(f)) {
            FileUtil.copy(f, output);
        }
        else {
            FileUtil.remove(output);
        }
    }
}


function endWith(text: string, match: string) {
    return text.lastIndexOf(match) == (text.length - match.length);
}


export = BuildService;