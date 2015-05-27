/// <reference path="../lib/types.d.ts" />

import events = require('events');
import Action = require('./Action');
import Build = require('./Build');
import exmlc = require('../lib/exml/exmlc');
import utils = require("../lib/utils");
import FileUtil = require("../lib/FileUtil");
import typeScriptService = require("./TsService");
import chokidar = require("../lib/chokidar/index");


var  instance: BuildService = null;
class BuildService extends Action {
    static getInstance(options: lark.ICompileOptions = lark.options){
        if (!instance) {
            console.log('Create new Build Service');
            var bs = new BuildService(options);
            bs.start();
            instance = bs;
        }
        return instance;
    }

    static buildSingle(fileName:string):number {
        var exist = FileUtil.exists(fileName);
        return BuildService.getInstance().handleFileChange(fileName, exist ? FileChangeType.Change : FileChangeType.Remove, true);
    }

    fileMonitor: chokidar.FSWatcher;
    tss: typeScriptService;
    start() {
        this.tss = new typeScriptService(this.options);
        this.watchProjectFolder();
    }

    private watchProjectFolder() {
        var watcher = chokidar.watch(this.options.projectDir, {
            ignoreInitial: true,
            ignored: [f=> this.shouldIgnoreFile(f)]
        });

        watcher.on('add', f=> this.handleFileChange(f, FileChangeType.Add));
        watcher.on('change', f=> this.handleFileChange(f, FileChangeType.Change));
        watcher.on('unlink', f=> this.handleFileChange(f, FileChangeType.Remove));
    }
    private _penddingBuildTask:NodeJS.Timer = null;
    private handleFileChange(fileName: string, changeType: FileChangeType, emit = true): number {
        
        fileName = FileUtil.escapePath(fileName);
        var exitcode = 0;
        var extension = FileUtil.getExtension(fileName);
        switch (extension) {
            case 'ts':
                exitcode = this.handleTypeScriptFileChange(fileName, changeType,emit);
                break;
            case 'exml':
                exitcode = this.handleEXMLFileChange(fileName, changeType);
                break;
            default:
                this.handleOtherFileChange(fileName, changeType);
        }
        return exitcode;
    }

    private handleTypeScriptFileChange(fileName: string, changeType: FileChangeType,emit:boolean):number {
        if (fileName.indexOf(this.options.srcDir) < 0)
            return 0;

        //Update proj.json for typescript file add or remove
        if (changeType != FileChangeType.Change) {
            console.log("Add build task;");
            if (this._penddingBuildTask)
                clearTimeout(this._penddingBuildTask);
            this._penddingBuildTask = setTimeout(() => {
                console.log("compile project");
                this.compileProject();
                this._penddingBuildTask = null;
            }, 100);
        }

        var relativePath = fileName.replace(this.options.srcDir, '').replace(/\.ts$/, '.js');
        var output = FileUtil.joinPath(this.options.debugDir, relativePath);
        var exitcode = this.tss.fileChanged(fileName,emit && changeType==FileChangeType.Change, output);
        if (changeType == FileChangeType.Remove)
            FileUtil.remove(output);
        return exitcode;
    }

    private handleEXMLFileChange(fileName: string, changeType: FileChangeType): number {
        if (fileName.indexOf(this.options.srcDir) < 0)
            return 0;
        if (changeType != FileChangeType.Remove) {
            console.log('Compile Exml: ', fileName);
            exmlc.compile(fileName, this.options.srcDir);
        }
        else {
            var output = fileName.replace(/\.exml/, '.ts');
            FileUtil.remove(fileName);
        }
        return 0;
    }

    private handleOtherFileChange(fileName: string, changeType: FileChangeType) {
        var src = this.options.srcDir,
            temp = this.options.templateDir,
            start = this.options.project.startupHtml,
            proj = this.options.projManifest;
        if (fileName.indexOf(src) < 0 && fileName.indexOf(temp) < 0) {
            return;
        }


        var relativePath = fileName.replace(src, '').replace(temp, '');
        var output = FileUtil.joinPath(this.options.debugDir, relativePath);
        if (changeType != FileChangeType.Remove) {
            FileUtil.copy(fileName, output);
            console.log('Copy: ', fileName, "\n  to: ", output);
        }
        else {
            FileUtil.remove(output);
            console.log('Remove: ', output);
        }

        if (fileName.indexOf(start) >= 0 || fileName.indexOf(proj) >= 0)
            return this.onTemplateIndexChanged(fileName);
    }


    private onTemplateIndexChanged(file: string):number {
        var index = FileUtil.joinPath(this.options.templateDir, this.options.project.startupHtml);
        index = FileUtil.escapePath(index);
        console.log('Compile Template: ' + index);
        Action.compileTemplates(this.options);
        return 0;
    }


    private shouldIgnoreFile(fileName: string): boolean {
        fileName = FileUtil.escapePath(fileName);
        if (fileName.indexOf(this.options.debugDir) == 0)
            return true;
        if (fileName.indexOf(this.options.releaseDir) == 0)
            return true;
        return false;
    }
}

enum FileChangeType {
    Add,
    Change,
    Remove
}

export = BuildService;