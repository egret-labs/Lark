/// <reference path="../lib/types.d.ts" />


class InfoCommand implements lark.Command {
    execute(): number {
        console.log("    lark version: " + lark.manifest.version);
        console.log('    lark root:    ' + lark.options.larkRoot);
        return 0;
    }
}

export = InfoCommand;