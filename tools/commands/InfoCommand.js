/// <reference path="../lib/types.d.ts" />
var InfoCommand = (function () {
    function InfoCommand() {
    }
    InfoCommand.prototype.execute = function () {
        console.log("    lark version: " + lark.manifest.version);
        console.log('    lark root:    ' + lark.options.larkRoot);
        return 0;
    };
    return InfoCommand;
})();
module.exports = InfoCommand;
