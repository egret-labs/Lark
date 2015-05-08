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

            var log = (msg: string, ...params: string[]) => {
                var data: lark.CommandResult = {
                    type: 'log',
                    data: {
                        msg,
                        params
                    }
                };
                controller.send(data);

                console['rawLog'].apply(console, [msg].concat(params));
            }

            if (!console['rawLog'])
            {
                console['rawLog'] = console.log;
                console.log = log.bind(console);
            }

            TypeScript.write = msg=> console.log(msg);
        });

        controller.on('close', function (client) {

            console.log('Disconnect / Online:', controller.online);

            if (console['rawLog'])
            {
                console.log = console['rawLog'];
                console['rawLog'] = undefined;
            }

        });

        controller.on('message', function (client:TotalJS.WebSocketClient, message) {
            execute(client,message);
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