/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var watch = require("../lib/watch");
var server = require('../server/server');
var FileUtil = require('../lib/FileUtil');
var service = require('../service/index');
var CopyFiles = require('../actions/CopyFiles');
var CompileProject = require('../actions/CompileProject');
var CompileTemplate = require('../actions/CompileTemplate');
var RunCommand = (function () {
    function RunCommand() {
    }
    RunCommand.prototype.execute = function () {
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false || FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        if (lark.options.autoCompile) {
            console.log(utils.tr(10010));
            this.watchFiles(lark.options.srcDir);
            this.watchFiles(lark.options.templateDir);
        }
        else {
            console.log(utils.tr(10012));
        }
        var compileProject = new CompileProject();
        var result = compileProject.compileProject(lark.options);
        CopyFiles.copyProjectFiles();
        CompileTemplate.compileTemplates(lark.options, result.files);
        server.startServer(lark.options, lark.options.startUrl);
        console.log(utils.tr(10013, lark.options.startUrl));
        return 0;
    };
    RunCommand.prototype.watchFiles = function (dir) {
        var _this = this;
        watch.createMonitor(dir, { persistent: true, interval: 2007 }, function (m) {
            m.on("created", function () { return _this.sendBuildCMD(); }).on("removed", function () { return _this.sendBuildCMD(); }).on("changed", function () { return _this.sendBuildCMD(); });
        });
    };
    RunCommand.prototype.sendBuildCMD = function () {
        service.execCommand({ command: "build", path: lark.options.projectDir }, function (cmd) {
            if (cmd.exitCode == 0)
                console.log(utils.tr(10011));
            else
                console.log(utils.tr(10014));
            if (cmd.messages) {
                cmd.messages.forEach(function (m) { return console.log(m); });
            }
        });
    };
    return RunCommand;
})();
module.exports = RunCommand;
