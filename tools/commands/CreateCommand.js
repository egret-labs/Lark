/// <reference path="../lib/types.d.ts" />
var server = require('../server/server');
var FileUtil = require('../lib/FileUtil');
var CreateCommand = (function () {
    function CreateCommand() {
    }
    CreateCommand.prototype.execute = function () {
        var option = lark.options;
        FileUtil.createDirectory(option.srcDir);
        FileUtil.createDirectory(option.debugDir);
        server.startServer(option, option.manageUrl + "create/");
        return 0;
    };
    return CreateCommand;
})();
module.exports = CreateCommand;
