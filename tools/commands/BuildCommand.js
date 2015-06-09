/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var service = require('../service/index');
var FileUtil = require('../lib/FileUtil');
var BuildCommand = (function () {
    function BuildCommand() {
    }
    BuildCommand.prototype.execute = function () {
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        service.execCommand({ path: lark.options.projectDir, command: "build" }, gotCommandResult, true);
        return 0;
    };
    return BuildCommand;
})();
function gotCommandResult(cmd) {
    if (cmd.messages) {
        cmd.messages.forEach(function (m) { return console.log(m); });
    }
    process.exit(cmd.exitCode || 0);
}
module.exports = BuildCommand;
