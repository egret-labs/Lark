
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import FileUtil = require('../lib/FileUtil');

class CreateCommand implements lark.Command {
	
    execute():number {
        var option = lark.options;
        option.port = 3000 + Math.ceil(Math.random() * 30000);
        var url = option.manageUrl + "create/";
        var exist = FileUtil.exists(option.srcDir);
        if (exist)
            url += "?exist=true";
        server.startServer(option, url);
        console.log(utils.tr(10016, url));
        return 0;
    }
}


export = CreateCommand;
