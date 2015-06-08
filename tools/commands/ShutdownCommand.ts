
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
        service.execCommand({ path: lark.options.projectDir, command: "shutdown" }, null, true);
        return 0;
    }
}

export = ShutdownCommand;