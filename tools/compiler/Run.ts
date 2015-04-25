/// <reference path="../lib/types.d.ts" />




import http = require('http');
import querystring = require('querystring');
import childProcess = require('child_process');
import Websocket = require('../lib/websocket');
import server = require('../server/server');
import Action = require('./Action');
import Entry = require('./Entry');
import FileUtil = require('../lib/FileUtil');

class Run extends Action {
    
    public run(): number {
        this.checkState(this.options);
        return 0;
    }

    checkState(options: lark.ICompileOptions) {
        var req = http.get('http://'+ options.host +':' + options.port + '/$/ping',(res: http.ClientResponse) => {
            this.sendCMD(options);
        });
        req.on('error', e => {
            this.startServer(options);
        });
        req.setTimeout(100);
    }

    startServer(options: lark.ICompileOptions) {

        var nodePath = process.execPath,
            larkPath = FileUtil.joinPath(options.larkRoot, 'tools/bin/lark');
        console.log(process.cwd());

        childProcess.spawn(nodePath, [larkPath, 'startserver', options.projectDir], {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            cwd: process.cwd()
        });

        var exitCode = Entry.executeOption(options);
        this.exit(exitCode);
    }

    sendCMD(options: lark.ICompileOptions) {
        var wshost = 'ws://' + options.host +':' + options.port + "/";
        var ws = Websocket.connect(wshost);

        var data = JSON.stringify({
            type: 'cmd',
            data: options
        });
        ws.on("connect", e=> {
            ws.sendText(data);
        });
        ws.on("text", e=> this.gotResult(e));
    }

    gotResult(msg) {
        var result:lark.CommandResult = null;
        try {
            result = JSON.parse(msg);
        }
        catch (e)
        {
            console.log(e);
        }
        if (result.type == 'log')
        {
            console.log.apply(console, result.data);
        }
        if (result.exitCode != undefined)
            this.exit(result.exitCode);
    }


    exit(exitCode) {
        process.exit(exitCode);
    }
}


export = Run;