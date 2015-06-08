/// <reference path="../lib/types.d.ts" />
var server = require('../server/server');
var HelpCommand = (function () {
    function HelpCommand() {
    }
    HelpCommand.prototype.execute = function () {
        server.startServer(lark.options, lark.options.manageUrl + "help/");
        return 0;
    };
    return HelpCommand;
})();
module.exports = HelpCommand;
