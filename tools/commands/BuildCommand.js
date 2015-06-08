/// <reference path="../lib/types.d.ts" />
var service = require('../service/index');
var BuildCommand = (function () {
    function BuildCommand() {
    }
    BuildCommand.prototype.execute = function () {
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
