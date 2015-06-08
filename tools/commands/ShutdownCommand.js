/// <reference path="../lib/types.d.ts" />
var service = require('../service/index');
var ShutdownCommand = (function () {
    function ShutdownCommand() {
    }
    ShutdownCommand.prototype.execute = function () {
        service.execCommand({ path: lark.options.projectDir, command: "shutdown" }, null, true);
        return 0;
    };
    return ShutdownCommand;
})();
module.exports = ShutdownCommand;
