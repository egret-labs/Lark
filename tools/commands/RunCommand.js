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
            if (lark.options.autoCompile) {
                console.log(utils.tr(10010));
                _this.watchFiles(lark.options.srcDir);
                _this.watchFiles(lark.options.templateDir);
            }
            else {
                console.log(utils.tr(10012));
            }
            server.startServer(lark.options, lark.options.startUrl);
            console.log(utils.tr(10013, lark.options.startUrl));
        };
    }
    RunCommand.prototype.execute = function () {
        var build = new Build();
        build.execute(this.onBuildFinish);
        return 0;
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
        service.execCommand({ command: "build", path: lark.options.projectDir }, function (cmd) {
            if (!cmd.exitCode)
                console.log(utils.tr(10011));
            else
                console.log(utils.tr(10014), cmd.exitCode);
            if (cmd.messages) {
                cmd.messages.forEach(function (m) { return console.log(m); });
            }
        });
    };
    return RunCommand;
})();
module.exports = RunCommand;
