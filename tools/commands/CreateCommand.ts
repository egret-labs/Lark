
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import FileUtil = require('../lib/FileUtil');

class CreateCommand implements lark.Command {
	
    execute():number {
        var option = lark.options;
        FileUtil.createDirectory(option.srcDir);
        FileUtil.createDirectory(option.debugDir);
        server.startServer(option, option.manageUrl + "create/");
        return 0;
    }
}


export = CreateCommand;
