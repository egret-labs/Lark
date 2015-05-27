/// <reference path="../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
global.TotalJS = { Controller: {} };
var events = require('events');
var utils = require('../lib/utils');
var file = require('../lib/FileUtil');
var Default = require('./controllers/default');
var TypeScript = require("../lib/typescript/tsc");
global.lark = global.lark || {};
function startServer(options, startupUrl) {
    var total = require('../lib/totaljs/');
    total.setRoot(__dirname);
    options.port = options.port || 3000;
    Default.UserProjectPath = options.projectDir;
    options.projectDir = options.projectDir || '/public/';
    TypeScript.write = function (msg) { return console.log(msg); };
    lark.server = {
        options: options,
        console: new ServerConsole(),
        IPs: getLocalIPAddress()
    };
    var manifestContent = file.read(file.joinPath(options.larkRoot, 'manifest.json'));
    lark.manifest = JSON.parse(manifestContent);
    console.log('server root', __dirname);
    framework.config['directory-temp'] = '/bin-debug/tmp/';
    framework.config['directory-public'] = '/bin-debug/tmp/';
    framework.config['directory-views'] = '~' + __dirname + '/views/';
    framework.config['directory-controllers'] = '~' + __dirname + '/controllers/';
    framework.config['default-websocket-encodedecode'] = false;
    framework.config['allow-compile-js'] = false;
    framework.config['allow-compile-html'] = false;
    framework.config['allow-compile-css'] = false;
    total.http('debug', { port: options.port, ip: '0.0.0.0' });
    if (!options.serverOnly)
        utils.open(startupUrl || options.manageUrl);
}
exports.startServer = startServer;
var ServerConsole = (function (_super) {
    __extends(ServerConsole, _super);
    function ServerConsole() {
        _super.call(this);
        this.attach();
    }
    ServerConsole.prototype.attach = function () {
        var _this = this;
        if (console['override'])
            return;
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
                _this.log(params);
            };
        });
    };
    ServerConsole.prototype.dettach = function () {
        ["log", "warn", "error"].forEach(function (method) {
            console[method] = console['old_' + method];
        });
        console['override'] = false;
    };
    ServerConsole.prototype.log = function (params) {
        this.emit('log', params);
    };
    return ServerConsole;
})(events.EventEmitter);
function getLocalIPAddress() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ips = [lark.options.project.host, '127.0.0.1'];
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ips.push(iface.address);
        });
    });
    return ips;
}
//# sourceMappingURL=server.js.map