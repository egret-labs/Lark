/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var file = require('../lib/FileUtil');
var CompileOptions = require("./CompileOptions");
var Project = require("./Project");
exports.optionDeclarations = [
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
        shortName: 'f'
    }
];
var shortOptionNames = {};
var optionNameMap = {};
exports.optionDeclarations.forEach(function (option) {
    optionNameMap[option.name.toLowerCase()] = option;
    if (option.shortName) {
        shortOptionNames[option.shortName] = option.name;
    }
});
function parseCommandLine(commandLine) {
    // Set default compiler option values
    var options = new CompileOptions();
    var filenames = [];
    var errors = [];
    parseStrings(commandLine);
    options.larkRoot = utils.getLarkRoot();
    return options;
    function parseStrings(args) {
        var i = 0;
        while (i < args.length) {
            var s = args[i++];
            if (s.charAt(0) === '-') {
                s = s.slice(s.charAt(1) === '-' ? 2 : 1).toLowerCase();
                // Try to translate short option names to their full equivalents.
                if (s in shortOptionNames) {
                    s = shortOptionNames[s].toLowerCase();
                }
                if (s in optionNameMap) {
                    var opt = optionNameMap[s];
                    // Check to see if no argument was provided (e.g. "--locale" is the last command-line argument).
                    if (!args[i] && opt.type !== "boolean") {
                        errors.push(utils.tr(10001, opt.name));
                    }
                    switch (opt.type) {
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
                else {
                    //Unknown option
                    errors.push(utils.tr(10002, s));
                }
            }
            else {
                if (options.action == null)
                    options.action = s;
                else if (options.projectDir == null)
                    options.projectDir = s;
                else
                    filenames.push(s);
            }
        }
        if (options.projectDir == null)
            options.projectDir = process.cwd();
        else {
            var absPath = file.joinPath(process.cwd(), options.projectDir);
            if (file.exists(absPath))
                options.projectDir = absPath;
        }
        options.projectDir = file.joinPath(options.projectDir, "/");
        var props = new Project();
        if (file.exists(options.larkPropertiesFile)) {
            var json = file.read(options.larkPropertiesFile);
            var data = null;
            try {
                data = JSON.parse(json);
            }
            catch (e) {
                console.error(utils.tr(10005));
                process.exit(10005);
            }
            props.parse(data);
        }
        options.project = props;
    }
}
exports.parseCommandLine = parseCommandLine;
//# sourceMappingURL=Parser.js.map