//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
/// <reference path="../lib/node.d.ts"/>
var Build = require("./Build");
var Publish = require("./Publish");
var utils = require('../lib/utils');
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
function executeCommandLine(args) {
    var options = parseCommandLine(args);
    switch (options.action) {
        case "publish":
            var publish = new Publish(options);
            publish.run();
            break;
        default:
            var build = new Build(options);
            build.run();
            break;
    }
}
executeCommandLine(process.argv.slice(2));
function parseCommandLine(commandLine) {
    // Set default compiler option values
    var options = {
        esTarget: "ES5",
        action: null,
        projectDir: null
    };
    var filenames = [];
    var errors = [];
    parseStrings(commandLine);
    if (options.projectDir == null)
        options.projectDir = process.cwd();
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
    }
}
module.exports = executeCommandLine;
