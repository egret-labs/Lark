/// <reference path="../../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CompileOptions = require('../../compiler/CompileOptions');
var Entry = require('../../compiler/Entry');
var TypeScript = require("../../lib/typescript/tsc");
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
                var data = {
                    type: 'log',
                    data: msg
                };
                controller.send(data);
            };
            if (!console['override']) {
                console['override'] = true;
                ["log", "warn", "error"].forEach(function (method) {
                    var oldMethod = console[method].bind(console);
                    console['old_' + method] = oldMethod;
                    console[method] = function () {
                        var params = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            params[_i - 0] = arguments[_i];
                        }
                        oldMethod.apply(console, params);
                        if (!params || !params.length)
                            return;
                        log(params);
                    };
                });
            }
            console.log("Connected");
            TypeScript.write = function (msg) { return console.log(msg); };
        });
        controller.on('close', function (client) {
            console.log('Disconnect / Online:', controller.online);
            if (console['override']) {
                ["log", "warn", "error"].forEach(function (method) {
                    console[method] = console['old_' + method];
                });
                console['override'] = false;
            }
        });
        controller.on('message', function (client, data) {
            if (data.type == 'cmd') {
                execute(client, data.data);
            }
            else {
                console.log(data);
            }
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