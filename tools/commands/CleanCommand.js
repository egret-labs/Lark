/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var service = require('../service/index');
var CopyFiles = require('../actions/CopyFiles');
var CompileProject = require('../actions/CompileProject');
var CompileTemplate = require('../actions/CompileTemplate');
var CleanCommand = (function () {
    function CleanCommand() {
    }
    CleanCommand.prototype.execute = function () {
        var options = lark.options;
        service.execCommand({ path: options.projectDir, command: "shutdown" }, null, false);
        utils.clean(options.debugDir);
        CopyFiles.copyLark();
        var compileProject = new CompileProject();
        var result = compileProject.compileProject(options);
        CopyFiles.copyProjectFiles();
        CompileTemplate.compileTemplates(options, result.files);
        return result.exitStatus;
    };
    return CleanCommand;
})();
module.exports = CleanCommand;
