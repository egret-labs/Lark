/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var CompileOptions = require("./CompileOptions");
var optionDeclarations = [
    {
        name: "action",
        type: "string"
    },
    {
        name: "includeLark",
        type: "boolean",
        shortName: "e"
    },
    {
        name: "runtime",
        type: "string"
    },
    {
        name: "watch",
        type: "boolean"
    },
    {
        name: "minify",
        type: "boolean"
    },
    {
        name: "sourceMap",
        type: "boolean"
    },
    {
        name: "esTarget",
        type: "string"
    },
    {
        name: 'showUI',
        type: "boolean"
    },
    {
        name: 'modules',
        type: 'string'
    },
    {
        name: 'declaration',
        type: 'booleam',
        shortName: "d"
    }
];
var shortOptionNames = {};
var optionNameMap = {};
optionDeclarations.forEach(function (option) {
    optionNameMap[option.name] = option;
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
                    s = shortOptionNames[s];
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
                    console.log(opt.name, options[opt.name]);
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
        options.port = 3001;
    }
}
exports.parseCommandLine = parseCommandLine;
//# sourceMappingURL=Parser.js.map