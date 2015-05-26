/// <reference path="../../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WsServer = (function (_super) {
    __extends(WsServer, _super);
    function WsServer() {
        _super.apply(this, arguments);
    }
    WsServer.install = function (total) {
        var self = WsServer.prototype;
        total.websocket('/', self.initConnection, ['json']);
    };
    WsServer.prototype.initConnection = function () {
        var _this = this;
        var controller = this;
        lark.server.console.on('log', function (params) {
            var data = {
                type: 'log',
                data: params
            };
            _this.send(data);
        });
        var controller = this;
        controller.on('open', function (client) {
            console.log("Connected");
        });
        controller.on('close', function (client) {
            console.log('Disconnect / Online:', controller.online);
        });
        controller.on('message', function (client, data) {
            console.log(data);
        });
    };
    return WsServer;
})(TotalJS.Controller);
module.exports = WsServer;
