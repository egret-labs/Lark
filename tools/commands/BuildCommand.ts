
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import service = require('../service/index');
import FileUtil = require('../lib/FileUtil');
import Cordova = require('../actions/Cordova');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');

class BuildCommand implements lark.Command {
    execute(callback?: (exitCode: number) => void): number {
        callback = callback || defaultBuildCallback;
        var options = lark.options;
        if (FileUtil.exists(options.srcDir) == false ||
            FileUtil.exists(options.templateDir) == false) { 
            utils.exit(10015, options.projectDir);
        }
        if (FileUtil.exists(FileUtil.joinPath(options.srcDir, 'libs/lark/')) == false) {
            CopyFiles.copyLark();
        }
        service.execCommand({
            path: lark.options.projectDir,
            command: "build",
            option: lark.options
        }, cmd => onGotBuildCommandResult(cmd, callback),true);
        return 0;
    }
}

function onGotBuildCommandResult(cmd: lark.ServiceCommandResult, callback: (exitCode: number) => void) {
    if (cmd.messages) {
        cmd.messages.forEach(m=> console.log(m));
    }

    if (cmd.exitCode > 10000) {
        console.log(utils.tr(cmd.exitCode));
    }

    if (!cmd.exitCode && lark.options.platform) {
        FileUtil.copy(lark.options.outDir, FileUtil.joinPath(lark.options.projectDir, "www/"));
        Cordova.buildRunEmulate(code=> {
            callback(code || 0);
        });
    }
    else
        callback(cmd.exitCode || 0);
}

function defaultBuildCallback(code) {
    process.exit(code);
}

export = BuildCommand;