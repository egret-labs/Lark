/// <reference path="../../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CompileOptions = require('../../compiler/CompileOptions');
var Entry = require('../../compiler/Entry');
var Command = (function (_super) {
    __extends(Command, _super);
    function Command() {
        _super.apply(this, arguments);
    }
    Command.install = function (total) {
        var self = Command.prototype;
        //total.route('$/command/', self.execute, ['post']);
        total.websocket('/', self.initConnection, ['json']);
    };
    Command.prototype.initConnection = function () {
        var controller = this;
        controller.on('open', function (client) {
            var log = function (msg) {
                var params = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    params[_i - 1] = arguments[_i];
                }
                var data = {
                    type: 'log',
                    data: {
                        msg: msg,
                        params: params
                    }
                };
                controller.send(data);
                console['rawLog'].apply(console, [msg].concat(params));
            };
            if (!console['rawLog']) {
                console['rawLog'] = console.log;
                console.log = log.bind(console);
            }
        });
        controller.on('close', function (client) {
            console.log('Disconnect / Online:', controller.online);
            if (console['rawLog']) {
                console.log = console['rawLog'];
                console['rawLog'] = undefined;
            }
        });
        controller.on('message', function (client, message) {
            execute(client, message);
        });
    };
    return Command;
})(TotalJS.Controller);
function execute(client, data) {
    var options = CompileOptions.parse(data);
    console.log('Call action:', options.action);
    var exitcode = Entry.executeOption(options);
    var result = {
        type: 'result',
        exitCode: exitcode,
        message: '',
        data: null
    };
    client.send(result);
}
module.exports = Command;
//# sourceMappingURL=command.js.map