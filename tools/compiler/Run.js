/// <reference path="../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var http = require('http');
var childProcess = require('child_process');
var Websocket = require('../lib/websocket');
var Action = require('./Action');
var Entry = require('./Entry');
var FileUtil = require('../lib/FileUtil');
var Run = (function (_super) {
    __extends(Run, _super);
    function Run() {
        _super.apply(this, arguments);
    }
    Run.prototype.run = function () {
        this.checkState(this.options);
        return 0;
    };
    Run.prototype.checkState = function (options) {
        var _this = this;
        var req = http.get('http://127.0.0.1:' + options.port + '/$/ping', function (res) {
            _this.sendCMD(options);
        });
        req.on('error', function (e) {
            _this.startServer(options);
        });
        req.setTimeout(100);
    };
    Run.prototype.startServer = function (options) {
        var nodePath = process.execPath, larkPath = FileUtil.joinPath(options.larkRoot, 'tools/bin/lark');
        console.log(process.cwd());
        childProcess.spawn(nodePath, [larkPath, 'startserver', options.projectDir], {
            detached: true,
            stdio: ['ignore', 'ignore', 'ignore'],
            cwd: process.cwd()
        });
        var exitCode = Entry.executeOption(options);
        this.exit(exitCode);
    };
    Run.prototype.sendCMD = function (options) {
        var _this = this;
        var wshost = 'ws://127.0.0.1:' + options.port + "/";
        var ws = Websocket.connect(wshost);
        var data = JSON.stringify(options);
        ws.on("connect", function (e) {
            ws.sendText(data);
        });
        ws.on("text", function (e) { return _this.gotResult(e); });
    };
    Run.prototype.gotResult = function (msg) {
        msg = decodeURIComponent(msg);
        var result = null;
        try {
            result = JSON.parse(msg);
        }
        catch (e) {
            console.log(e);
        }
        if (result.type == 'log') {
            console.log.apply(console, [result.data.msg].concat(result.data.params));
        }
        if (result.exitCode != undefined)
            this.exit(result.exitCode);
    };
    Run.prototype.exit = function (exitCode) {
        process.exit(exitCode);
    };
    return Run;
})(Action);
module.exports = Run;
//# sourceMappingURL=Run.js.map