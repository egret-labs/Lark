/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var service = require('../service/index');
var FileUtil = require('../lib/FileUtil');
var ShutdownCommand = (function () {
    function ShutdownCommand() {
    }
    ShutdownCommand.prototype.execute = function () {
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        service.execCommand({
            path: lark.options.projectDir,
            command: "shutdown",
            option: lark.options
        }, function () { return process.exit(0); }, true);
        return 0;
    };
    return ShutdownCommand;
})();
module.exports = ShutdownCommand;
