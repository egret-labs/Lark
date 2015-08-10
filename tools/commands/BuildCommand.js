/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var service = require('../service/index');
var FileUtil = require('../lib/FileUtil');
var Cordova = require('../actions/Cordova');
var CopyFiles = require('../actions/CopyFiles');
var BuildCommand = (function () {
    function BuildCommand() {
    }
    BuildCommand.prototype.execute = function (callback) {
        callback = callback || defaultBuildCallback;
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        if (FileUtil.exists(FileUtil.joinPath(options.srcDir, 'libs/lark/')) == false) {
            CopyFiles.copyLark();
        }
        service.execCommand({
            path: lark.options.projectDir,
            command: "build",
            option: lark.options
        }, function (cmd) { return onGotBuildCommandResult(cmd, callback); }, true);
        return 0;
    };
    return BuildCommand;
})();
function onGotBuildCommandResult(cmd, callback) {
    if (cmd.messages) {
        cmd.messages.forEach(function (m) { return console.log(m); });
    }
    if (cmd.exitCode > 10000) {
        console.log(utils.tr(cmd.exitCode));
    }
    if (!cmd.exitCode && lark.options.platform) {
        FileUtil.copy(lark.options.outDir, FileUtil.joinPath(lark.options.projectDir, "www/"));
        Cordova.buildRunEmulate(function (code) {
            callback(code || 0);
        });
    }
    else
        callback(cmd.exitCode || 0);
}
function defaultBuildCallback(code) {
    process.exit(code);
}
module.exports = BuildCommand;
