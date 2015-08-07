
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import watch = require("../lib/watch");
import Build = require('./BuildCommand');
import server = require('../server/server');
import FileUtil = require('../lib/FileUtil');
import service = require('../service/index');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');

class RunCommand implements lark.Command {
	
    execute(): number {
        var build = new Build();
        build.execute(this.onBuildFinish);
        return 0;
    }

    private onBuildFinish = (exitCode: number) => {

        if (exitCode != 0) {
            process.exit(exitCode);
        }

        utils.getAvailablePort(port=> this.onGotPort(port), lark.options.port);
    }

    private onGotPort(port: number) {
        lark.options.port = port;
        console.log('\n');
        var addresses = utils.getNetworkAddress();
        if (addresses.length > 0) {
            lark.options.host = addresses[0];
        }
        server.startServer(lark.options, lark.options.startUrl);
        console.log("    " + utils.tr(10013, ''));
        console.log('\n');
        console.log('        ' + lark.options.startUrl);
        for (var i = 1; i < addresses.length; i++) {
            console.log('        ' + lark.options.getStartURL(addresses[i]));
        }

        console.log('\n');
        if (lark.options.autoCompile) {
            console.log('    ' + utils.tr(10010));
            this.watchFiles(lark.options.srcDir);
            this.watchFiles(lark.options.templateDir);
        }
        else {
            console.log('    ' + utils.tr(10012));
        }
    }

    private watchFiles(dir:string) {

        watch.createMonitor(dir, { persistent: true, interval: 2007 }, m=> {
            m.on("created", () => this.sendBuildCMD())
                .on("removed", () => this.sendBuildCMD())
                .on("changed", () => this.sendBuildCMD());
        })
    }
    private sendBuildCMD() {
        service.execCommand({ command: "build", path: lark.options.projectDir, option: lark.options }, (cmd: lark.ServiceCommandResult) => {
            if (!cmd.exitCode)
                console.log('    ' +utils.tr(10011));
            else
                console.log('    ' +utils.tr(10014),cmd.exitCode);
            if (cmd.messages) {
                cmd.messages.forEach(m=> console.log(m));
            }
        });
    }
}


export = RunCommand;
