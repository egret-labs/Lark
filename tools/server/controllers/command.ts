/// <reference path="../../lib/types.d.ts" />


import CompileOptions = require('../../compiler/CompileOptions')
import Entry = require('../../compiler/Entry')
import TypeScript = require("../../lib/typescript/tsc");



class Command extends TotalJS.Controller {
    static install(total: TotalJS.Framework) {
        var self = Command.prototype;
        //total.route('$/command/', self.execute, ['post']);
        total.websocket('/', self.initConnection, ['json']);
    }

    initConnection() {
        var controller = this;
        controller.on('open', function (client) {

            var log = (msg: any) => {
                var data: lark.CommandResult = {
                    type: 'log',
                    data: msg
                };
                controller.send(data);
            }

            if (!console['override'])
            {
                console['override'] = true;
                ["log", "warn", "error"].forEach(function (method) {
                    var oldMethod = console[method].bind(console);
                    console['old_' + method] = oldMethod;
                    console[method] = function (...params:string[]) {
                        oldMethod.apply(console, params);
                        if (!params || !params.length)
                            return;
                        log(params);
                    };
                });
            }

            console.log("Connected");

            TypeScript.write = msg=> console.log(msg);
        });

        controller.on('close', function (client) {

            console.log('Disconnect / Online:', controller.online);

            if (console['override'])
            {
                ["log", "warn", "error"].forEach(function (method) {
                    console[method] = console['old_' + method];
                });
                console['override'] = false;
            }

        });

        controller.on('message', function (client: TotalJS.WebSocketClient, data: lark.CommandResult) {
            if (data.type == 'cmd') {
                execute(client, data.data);
            }
            else {
                console.log(data);
            }
        });
    }

}


function execute(client: TotalJS.WebSocketClient, data) {
    var options = CompileOptions.parse(data);

    console.log('Call action:', options.action);

    var exitcode = Entry.executeOption(options);

    var result: lark.CommandResult = {
        type:'result',
        exitCode: exitcode,
        message: '',
        data: null
    };
    client.send(result);
}



export = Command;