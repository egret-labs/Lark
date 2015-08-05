/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var watch = require("../lib/watch");
var Build = require('./BuildCommand');
var server = require('../server/server');
var service = require('../service/index');
var RunCommand = (function () {
    function RunCommand() {
        var _this = this;
        this.onBuildFinish = function (exitCode) {
            if (exitCode != 0) {
                process.exit(exitCode);
            }
            utils.getAvailablePort(function (port) { return _this.onGotPort(port); }, lark.options.port);
        };
    }
    RunCommand.prototype.execute = function () {
        var build = new Build();
        build.execute(this.onBuildFinish);
        return 0;
    };
    RunCommand.prototype.onGotPort = function (port) {
        lark.options.port = port;
        console.log('\n');
        var addresses = utils.getNetworkAddress();
        if (addresses.length > 0) {
            lark.options.host = addresses[0];
        }
        server.startServer(lark.options, lark.options.startUrl);
        console.log("    " + utils.tr(10013, ''));
        console.log('\n');
        console.log('        ' + lark.options.startUrl);
        for (var i = 1; i < addresses.length; i++) {
            console.log('        ' + lark.options.getStartURL(addresses[i]));
        }
        console.log('\n');
        if (lark.options.autoCompile) {
            console.log('    ' + utils.tr(10010));
            this.watchFiles(lark.options.srcDir);
            this.watchFiles(lark.options.templateDir);
        }
        else {
            console.log('    ' + utils.tr(10012));
        }
    };
    RunCommand.prototype.watchFiles = function (dir) {
        var _this = this;
        watch.createMonitor(dir, { persistent: true, interval: 2007 }, function (m) {
            m.on("created", function () { return _this.sendBuildCMD(); })
                .on("removed", function () { return _this.sendBuildCMD(); })
                .on("changed", function () { return _this.sendBuildCMD(); });
        });
    };
    RunCommand.prototype.sendBuildCMD = function () {
        service.execCommand({ command: "build", path: lark.options.projectDir, option: lark.options }, function (cmd) {
            if (!cmd.exitCode)
                console.log('    ' + utils.tr(10011));
            else
                console.log('    ' + utils.tr(10014), cmd.exitCode);
            if (cmd.messages) {
                cmd.messages.forEach(function (m) { return console.log(m); });
            }
        });
    };
    return RunCommand;
})();
module.exports = RunCommand;
