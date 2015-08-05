
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import service = require('../service/index');
import FileUtil = require('../lib/FileUtil');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');

class ShutdownCommand implements lark.Command {
    execute(): number {

        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) {
            utils.exit(10015, options.projectDir);
        }

        service.execCommand({
            path: lark.options.projectDir,
            command: "shutdown",
            option: lark.options
        }, () => process.exit(0), true);
        return 0;
    }
}

export = ShutdownCommand;