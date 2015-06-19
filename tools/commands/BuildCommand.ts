
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import service = require('../service/index');
import FileUtil = require('../lib/FileUtil');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');

class BuildCommand implements lark.Command {
    execute(): number {
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }
        if (FileUtil.exists(FileUtil.joinPath(options.srcDir, 'libs/lark/lark.js')) == false) {
            CopyFiles.copyLark();
        }
        service.execCommand({ path: lark.options.projectDir, command: "build" }, gotCommandResult,true);
        return 0;
    }
}

function gotCommandResult(cmd: lark.ServiceCommandResult) {
    if (cmd.messages) {
        cmd.messages.forEach(m=> console.log(m));
    }
    process.exit(cmd.exitCode || 0);
}

export = BuildCommand;