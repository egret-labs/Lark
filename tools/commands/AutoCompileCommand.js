/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var service = require('../service/index');
var FileUtil = require('../lib/FileUtil');
var CopyFiles = require('../actions/CopyFiles');
var CompileProject = require('../actions/CompileProject');
var CompileTemplate = require('../actions/CompileTemplate');
var parser = require('../parser/Parser');
var AutoCompileCommand = (function () {
    function AutoCompileCommand() {
        this._lastExitCode = 0;
        this._lastMessages = [];
        this._request = null;
        this._lastBuildTime = Date.now();
    }
    AutoCompileCommand.prototype.execute = function () {
        var _this = this;
        this._request = service.execCommand({
            command: "init",
            path: lark.options.projectDir,
            option: lark.options
        }, function (m) { return _this.onServiceMessage(m); }, false);
        this._request.once('end', function () { return process.exit(); });
        this._request.once('close', function () { return process.exit(); });
        setInterval(function () {
            _this.sendCommand({
                command: "status",
                status: process.memoryUsage(),
                path: lark.options.projectDir,
                option: lark.options
            });
            _this.exitAfter5Minutes();
        }, 60000);
        setTimeout(function () { return _this.buildProject(); }, 20);
        return 0;
    };
    AutoCompileCommand.prototype.buildProject = function () {
        var exitCode = 0;
        var options = lark.options;
        utils.clean(options.debugDir);
        var compileProject = new CompileProject();
        var _scripts = this._scripts || [];
        var result = compileProject.compileProject(options);
        this.compileProject = compileProject;
        CopyFiles.copyProjectFiles();
        _scripts = result.files.length > 0 ? result.files : _scripts;
        CompileTemplate.compileTemplates(options, _scripts);
        this._scripts = result.files;
        this._lastExitCode = result.exitStatus;
        this._lastMessages = result.messages;
        this.sendCommand();
        global.gc && global.gc();
        return exitCode;
    };
    AutoCompileCommand.prototype.buildChanges = function (filesChanged) {
        this._lastBuildTime = Date.now();
        if (!this.compileProject)
            return this.buildProject();
        var codes = [];
        var others = [];
        filesChanged.forEach(function (f) {
            if (/\.ts$/.test(f))
                codes.push(f);
            else
                others.push(f);
        });
        this.buildChangedRes(others);
        if (codes.length) {
            var result = this.buildChangedTS(codes);
            if (result.files && result.files.length > 0 && this._scripts.length != result.files.length) {
                this._scripts = result.files;
                this.onTemplateIndexChanged();
            }
            this._lastExitCode = result.exitStatus;
            this._lastMessages = result.messages;
        }
        this.sendCommand();
        global.gc && global.gc();
        return this._lastExitCode;
    };
    AutoCompileCommand.prototype.buildChangedTS = function (filesChanged) {
        filesChanged = filesChanged.map(function (f) { return f.replace(FileUtil.escapePath(process.cwd() + "/"), ""); });
        return this.compileProject.compileProject(lark.options, filesChanged);
    };
    AutoCompileCommand.prototype.buildChangedRes = function (fileNames) {
        var _this = this;
        var src = lark.options.srcDir, temp = lark.options.templateDir, proj = lark.options.larkPropertiesFile, start = "index.html";
        fileNames.forEach(function (fileName) {
            if (fileName == proj) {
                lark.options.includeLark = true;
                _this.buildProject();
                lark.options.includeLark = false;
            }
            if (fileName.indexOf(src) < 0 && fileName.indexOf(temp) < 0) {
                return;
            }
            var relativePath = fileName.replace(src, '').replace(temp, '');
            var output = FileUtil.joinPath(lark.options.debugDir, relativePath);
            if (FileUtil.exists(fileName)) {
                FileUtil.copy(fileName, output);
                console.log('Copy: ', fileName, "\n  to: ", output);
            }
            else {
                FileUtil.remove(output);
                console.log('Remove: ', output);
            }
            if (fileName.indexOf(start) >= 0)
                return _this.onTemplateIndexChanged();
        });
    };
    AutoCompileCommand.prototype.onTemplateIndexChanged = function () {
        var index = FileUtil.joinPath(lark.options.templateDir, "index.html");
        index = FileUtil.escapePath(index);
        console.log('Compile Template: ' + index);
        CompileTemplate.compileTemplates(lark.options, this._scripts);
        return 0;
    };
    AutoCompileCommand.prototype.onServiceMessage = function (msg) {
        console.log(msg);
        if (msg.command == 'build' && msg.option)
            lark.options = parser.parseJSON(msg.option);
        if (msg.command == 'build')
            this.buildChanges(msg.changes);
        if (msg.command == 'shutdown')
            process.exit(0);
    };
    AutoCompileCommand.prototype.sendCommand = function (cmd) {
        if (!cmd) {
            var msg = this._lastMessages;
            cmd = {
                command: 'buildResult',
                exitCode: this._lastExitCode,
                messages: msg,
                path: lark.options.projectDir,
                option: lark.options
            };
        }
        this._request.send(cmd);
    };
    AutoCompileCommand.prototype.exitAfter5Minutes = function () {
        var now = Date.now();
        var timespan = (now - this._lastBuildTime) / 1000 / 60;
        if (timespan > 5)
            process.exit(0);
    };
    return AutoCompileCommand;
})();
module.exports = AutoCompileCommand;
