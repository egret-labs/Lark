
/// <reference path="../lib/types.d.ts" />

import http = require("http");
import utils = require('../lib/utils');
import server = require('../server/server');
import service = require('../service/index');
import ServiceSocket = require('../service/ServiceSocket');
import FileUtil = require('../lib/FileUtil');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');

class AutoCompileCommand implements lark.Command {
    private compileProject:CompileProject; 
    
    execute():number {
        this._request = service.execCommand({
            command: "init",
            path: lark.options.projectDir
        }, m=> this.onServiceMessage(m), false);
        this._request.once('end', () => process.exit());
        this._request.once('close', () => process.exit());

        setInterval(() => this.sendCommand({
            command: "status",
            status: process.memoryUsage(),
            path: lark.options.projectDir
        }), 60000);

        setTimeout(() => this.buildProject(), 20);

        return 0;
    }
    
    
    private _lastExitCode = 0;
    private _lastMessages: string[] = [];
    private _request: ServiceSocket = null;
    private _scripts:string[];

    buildProject() {
        var exitCode = 0;
        var options = lark.options;   
        utils.clean(options.debugDir, FileUtil.joinPath(options.debugDir, 'tmp'));
        var compileProject = new CompileProject();
        var result = compileProject.compileProject(options);
        this.compileProject = compileProject;
        CopyFiles.copyProjectFiles();
        CompileTemplate.compileTemplates(options,result.files);
        this._scripts = result.files;
        this._lastExitCode = exitCode;
        this._lastMessages = result.messages;
        this.sendCommand();
        global.gc && global.gc();
        return exitCode;
    }

    buildChanges(filesChanged:string[]) {
        if (!this.compileProject)
            return this.buildProject();
        var codes: string[] = [];
        var others: string[] = [];

        filesChanged.forEach(f=> {
            if (/\.ts$/.test(f))
                codes.push(f);
            else
                others.push(f);
        });
        this.buildChangedRes(others);
        if (codes.length) {
            var result = this.buildChangedTS(codes);
            this._lastExitCode = result.exitStatus;
            this._lastMessages = result.messages;
        }
        this.sendCommand();
        global.gc && global.gc();
        return this._lastExitCode;
    }

    private buildChangedTS(filesChanged: string[]) {
        filesChanged = filesChanged.map(f=> f.replace(lark.options.projectDir, ""));
        return this.compileProject.compileProject(lark.options,filesChanged);
    }

    private buildChangedRes(fileNames: string[]) {


        var src = lark.options.srcDir,
            temp = lark.options.templateDir,
            proj = lark.options.larkPropertiesFile,
            start = "index.html";


        fileNames.forEach(fileName => { 
            if (fileName == proj) {
                lark.options.includeLark = true;
                this.buildProject();
                lark.options.includeLark = false;
            }
            if (fileName.indexOf(src) < 0 && fileName.indexOf(temp) < 0 ) {
                return;
            }
            
            var relativePath = fileName.replace(src, '').replace(temp, '');
            var output = FileUtil.joinPath(lark.options.debugDir, relativePath);
            if (FileUtil.exists(fileName)) {
                FileUtil.copy(fileName, output);
                console.log('Copy: ', fileName, "\n  to: ", output);
            }
            else {
                FileUtil.remove(output);
                console.log('Remove: ', output);
            }

            if (fileName.indexOf(start) >= 0)
                return this.onTemplateIndexChanged();
        });
    }


    private onTemplateIndexChanged(): number {
        var index = FileUtil.joinPath(lark.options.templateDir, "index.html");
        index = FileUtil.escapePath(index);
        console.log('Compile Template: ' + index);
        CompileTemplate.compileTemplates(lark.options,this._scripts);
        return 0;
    }

    private onServiceMessage(msg: lark.ServiceBuildCommand) {
        if (msg.command == 'build')
            this.buildChanges(msg.changes);
        if (msg.command == 'shutdown')
            process.exit(0);
    }

    private sendCommand(cmd?: lark.ServiceCommand) {
        if (!cmd) {
            var msg = this._lastMessages;
            cmd = {
                command: 'buildResult',
                exitCode: this._lastExitCode,
                messages: msg,
                path:lark.options.projectDir
            }
        }
        this._request.send(cmd);
    }
    
}

export = AutoCompileCommand;