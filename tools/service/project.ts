
import http = require('http');
import state = require('./state');
import cprocess = require('child_process')
import utils = require('../lib/utils');
import FileUtil = require('../lib/FileUtil');

class Project {
    path: string;
    state: state.DirectoryState;
    changes: state.FileChanges;
    timer: NodeJS.Timer;
    buildProcess: cprocess.ChildProcess;
    buildPort: http.ServerResponse;
    penddingRequest: http.ServerResponse;

    init() {
        var stat = new state.DirectoryState();
        stat.path = this.path;
        stat.init();
        this.state = stat;
    }

    fileChanged(path?:string,changeType?:string) {
        if (path && changeType) {
            this.initChanges();
            this.changes[changeType].push(path);
        }
        if (this.timer)
            clearTimeout(this.timer);
        this.timer = setTimeout(() => this.build(), 200);
    }

    build() {
        this.timer = null;

        if (this.changes == null) {
            this.changes = this.state.checkChanges();
        }

        if (this.showBuildWholeProject()) {
            this.buildWholeProject();
        }
        else {
            this.buildWithExistBuildService();
        }
        this.state.init();
        this.changes = null;
    }

    buildWholeProject() {
        this.shutdown();
        var larkPath = FileUtil.joinPath(utils.getLarkRoot(), 'tools/bin/lark');

        var build = cprocess.spawn(process.execPath, [larkPath, 'buildService', this.path], {
            detached: true,
            cwd: this.path
        });
        build.on('exit', (code, signal) => this.onBuildServiceExit(code, signal));

        this.buildProcess = build;
    }

    buildWithExistBuildService() {
        console.log('buildWithExistBuildService');
        if (!this.buildProcess) {
            this.buildWholeProject();
            return;
        }

        console.log(this.changes);

        this.sendCommand({
            command: "build",
            changes: this.changes.added.concat(this.changes.modified).concat(this.changes.removed)
        });
    }

    private sendCommand(cmd: lark.ServiceCommand) {
        //this.buildProcess.stdin.write(JSON.stringify(cmd), 'utf8');
        console.log(cmd);
        this.buildPort && this.buildPort.write(JSON.stringify(cmd));
        //this.buildProcess.send(cmd);
    }

    public shutdown() {
        this.sendCommand({ command: 'shutdown' });
        if (this.buildProcess) {
            this.buildProcess.removeAllListeners('exit');
            this.buildProcess.kill();
        }
    }

    onBuildServiceMessage(msg: lark.ServiceCommandResult) {
        if (msg.messages.length > 20)
            msg.messages.length = 20;
        if (this.penddingRequest) {
            this.penddingRequest.writeHead(200, { 'Content-Type': 'text/plain' });
            this.penddingRequest.end(JSON.stringify(msg));
        }
    }

    private onBuildServiceExit(code: number, signal:string) {
        console.log("Build service exit with", code, signal);
        this.buildProcess = null;
    }

    private showBuildWholeProject() {
        var tsAddorRemove = this.changes.added.concat(this.changes.removed).filter(f=> /\.ts/.test(f));
        console.log(tsAddorRemove);
        return tsAddorRemove.length > 0;
    }

    private initChanges() {
        if (this.changes)
            return;
        this.changes = {
            added: [],
            modified: [],
            removed: []
        };
    }
}

export = Project;

















/// <reference path="../lib/types.d.ts" />