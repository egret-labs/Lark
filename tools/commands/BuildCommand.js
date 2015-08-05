/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var service = require('../service/index');
var FileUtil = require('../lib/FileUtil');
var CopyFiles = require('../actions/CopyFiles');
var BuildCommand = (function () {
    function BuildCommand() {
    }
    BuildCommand.prototype.execute = function (callback) {
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        if (FileUtil.exists(FileUtil.joinPath(options.srcDir, 'libs/lark/')) == false) {
            CopyFiles.copyLark();
        }
        service.execCommand({ path: lark.options.projectDir, command: "build", option: lark.options }, function (cmd) {
            if (cmd.messages) {
                cmd.messages.forEach(function (m) { return console.log(m); });
            }
            if (cmd.exitCode > 10000) {
                console.log(utils.tr(cmd.exitCode));
            }
            if (callback)
                callback(cmd.exitCode || 0);
            else
                process.exit(cmd.exitCode || 0);
        }, true);
        return 0;
    };
    return BuildCommand;
})();
module.exports = BuildCommand;
