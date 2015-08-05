
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import service = require('../service/index');
import FileUtil = require('../lib/FileUtil');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');

class BuildCommand implements lark.Command {
    execute(callback?:(exitCode:number)=>void): number {
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) { 
            utils.exit(10015, options.projectDir);
        }
        if (FileUtil.exists(FileUtil.joinPath(options.srcDir, 'libs/lark/')) == false) {
            CopyFiles.copyLark();
        }
        service.execCommand({ path: lark.options.projectDir, command: "build", option: lark.options }, (cmd: lark.ServiceCommandResult) => {
            if (cmd.messages) {
                cmd.messages.forEach(m=> console.log(m));
            }

            if (cmd.exitCode > 10000) {
                console.log(utils.tr(cmd.exitCode));
            }

            if(callback)
                callback(cmd.exitCode||0);
            else
                process.exit(cmd.exitCode || 0);
        },true);
        return 0;
    }
}

export = BuildCommand;