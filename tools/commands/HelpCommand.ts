
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import watch = require("../lib/watch");
import server = require('../server/server');
import FileUtil = require('../lib/FileUtil');
import service = require('../service/index');

class HelpCommand implements lark.Command {

    execute(): number {
        server.startServer(lark.options, lark.options.manageUrl + "help/");
        return 0;
    }
}

export = HelpCommand;