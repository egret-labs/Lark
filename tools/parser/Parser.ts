/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import file = require('../lib/FileUtil');
import CompileOptions = require("./CompileOptions");





export var optionDeclarations: lark.CommandLineOption[] = [
    {
        name: "action",
        type: "string"
    }, {
        name: "includeLark",
        type: "boolean",
        shortName: "e"
    }, {
        name: "sourceMap",
        type: "boolean"
    }, {
        name: 'serverOnly',
        type: "boolean"
    }, {
        name: 'autoCompile',
        type: 'boolean',
        shortName: "a"
    }, {
        name: 'fileName',
        type: 'string',
        shortName:'f'
    }, {
        name: 'port',
        type: 'number'
    }
];

var shortOptionNames: lark.Map<string> = {};
var optionNameMap: lark.Map<lark.CommandLineOption> = {};

optionDeclarations.forEach(option => {
    optionNameMap[option.name.toLowerCase()] = option;

    if (option.shortName)
    {
        shortOptionNames[option.shortName] = option.name;
    }
});


export function parseCommandLine(commandLine: string[]) {
    // Set default compiler option values
    var options = new CompileOptions();
    var filenames: string[] = [];
    var errors: string[] = [];
    options.larkRoot = utils.getLarkRoot();
    parseStrings(commandLine);
    return options;

    function parseStrings(args: string[]) {
        var i = 0;
        while (i < args.length)
        {
            var s = args[i++];
            if (s.charAt(0) === '-')
            {
                s = s.slice(s.charAt(1) === '-' ? 2 : 1).toLowerCase();
                // Try to translate short option names to their full equivalents.
                if (s in shortOptionNames)
                {
                    s = shortOptionNames[s].toLowerCase();
                }


                if (s in optionNameMap)
                {
                    var opt = optionNameMap[s];

                    // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
                    if (!args[i] && opt.type !== "boolean")
                    {
                        errors.push(utils.tr(10001, opt.name));
                    }

                    switch (opt.type)
                    {
                        case "number":
                            options[opt.name] = parseInt(args[i++]);
                            break;
                        case "boolean":
                            options[opt.name] = true;
                            break;
                        case "string":
                            options[opt.name] = args[i++] || "";
                            break;
                    }
                }
                else
                {
                    //Unknown option
                    errors.push(utils.tr(10002, s));
                }
            }
            else
            {
                if (options.action == null)
                    options.action = s;
                else if (options.projectDir == null)
                    options.projectDir = s;
                else
                    filenames.push(s);
            }
        }


        if (options.projectDir == null)
            options.projectDir = process.cwd()
        else {
            var absPath = file.joinPath(process.cwd(), options.projectDir);
            if (file.exists(absPath))
                options.projectDir = absPath;
        }
        options.projectDir = file.joinPath(options.projectDir, "/");


        var manifestPath = file.joinPath(options.larkRoot, "manifest.json");
        var content = file.read(manifestPath);
        var manifest: lark.LarkManifest = lark.manifest;
        try { manifest = JSON.parse(content) }
        catch (e) { utils.exit(10009) }
        lark.manifest = manifest;
    }

}
