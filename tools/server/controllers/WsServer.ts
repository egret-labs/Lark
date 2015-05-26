/// <reference path="../../lib/types.d.ts" />


import CompileOptions = require('../../compiler/CompileOptions')



class WsServer extends TotalJS.Controller {
    static install(total: TotalJS.Framework) {
        var self = WsServer.prototype;
        total.websocket('/', self.initConnection, ['json']);
    }

    initConnection() {
        var controller = this;
        lark.server.console.on('log', params=> {
            var data: lark.CommandResult = {
                type: 'log',
                data: params
            };
            this.send(data);
        });

        var controller = this;
        controller.on('open', function (client) {
            console.log("Connected");
        });

        controller.on('close', function (client) {
            console.log('Disconnect / Online:', controller.online);
        });

        controller.on('message', function (client: TotalJS.WebSocketClient, data: lark.CommandResult) {
            console.log(data);
        });
    }

}



export = WsServer;