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
        var req = http.get('http://127.0.0.1:' + options.port + '/$/ping',(res: http.ClientResponse) => {
            this.sendCMD(options);
        });
        req.on('error', e => {
            this.startServer(options);
        });
        req.setTimeout(100);
    }

    startServer(options: lark.ICompileOptions) {

        var nodePath = process.execPath,
            larkPath = FileUtil.joinPath(options.larkRoot, 'tools/bin/lark'),
            params = '"' + options.projectDir + '"';
        var cmd = 'cmd "' + nodePath + '" "' + larkPath + '" ' + params;

        console.log(cmd);

        childProcess.spawn(nodePath, [larkPath, 'startserver', params], { detached: true, stdio: ['ignore', 'ignore', 'ignore'] });

        //var serverFile = FileUtil.joinPath(options.larkRoot, 'tools/server/server.js');
        //var n = childProcess.fork(serverFile);

        //n.on('message', function (m) {
        //    console.log('PARENT got message:', m);
        //});

        //n.send(options, null);



        var exitCode = Entry.executeOption(options);
        this.exit(exitCode);


        //server.startServer(options);
    }

    sendCMD(options: lark.ICompileOptions) {
        var wshost = 'ws://127.0.0.1:' + options.port + "/";
        var ws = Websocket.connect(wshost);

        var data = JSON.stringify(options);
        ws.on("connect", e=> {
            ws.sendText(data);
        });
        ws.on("text", e=> this.gotResult(e));
    }

    gotResult(msg) {
        msg = decodeURIComponent(msg);
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
            console.log.apply(console, [result.data.msg].concat(result.data.params));
        }
        if (result.exitCode != undefined)
            this.exit(result.exitCode);
    }


    exit(exitCode) {
        process.exit(exitCode);
    }
}


export = Run;