/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var server = require('../server/server');
var FileUtil = require('../lib/FileUtil');
var CreateCommand = (function () {
    function CreateCommand() {
    }
    CreateCommand.prototype.execute = function () {
        var option = lark.options;
        option.port = 3000 + Math.ceil(Math.random() * 30000);
        var url = option.manageUrl + "create/";
        var exist = FileUtil.exists(option.srcDir);
        if (exist)
            url += "?exist=true";
        server.startServer(option, url);
        console.log(utils.tr(10016, url));
        return 0;
    };
    return CreateCommand;
})();
module.exports = CreateCommand;
