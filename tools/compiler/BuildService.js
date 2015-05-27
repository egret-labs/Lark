/// <reference path="../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Action = require('./Action');
var exmlc = require('../lib/exml/exmlc');
var FileUtil = require("../lib/FileUtil");
var typeScriptService = require("./TsService");
var chokidar = require("../lib/chokidar/index");
var instance = null;
var BuildService = (function (_super) {
    __extends(BuildService, _super);
    function BuildService() {
        _super.apply(this, arguments);
        this._penddingBuildTask = null;
    }
    BuildService.getInstance = function (options) {
        if (options === void 0) { options = lark.options; }
        if (!instance) {
            console.log('Create new Build Service');
            var bs = new BuildService(options);
            bs.start();
            instance = bs;
        }
        return instance;
    };
    BuildService.buildSingle = function (fileName) {
        var exist = FileUtil.exists(fileName);
        return BuildService.getInstance().handleFileChange(fileName, exist ? FileChangeType.Change : FileChangeType.Remove, true);
    };
    BuildService.prototype.start = function () {
        this.tss = new typeScriptService(this.options);
        this.watchProjectFolder();
    };
    BuildService.prototype.watchProjectFolder = function () {
        var _this = this;
        var watcher = chokidar.watch(this.options.projectDir, {
            ignoreInitial: true,
            ignored: [function (f) { return _this.shouldIgnoreFile(f); }]
        });
        watcher.on('add', function (f) { return _this.handleFileChange(f, FileChangeType.Add); });
        watcher.on('change', function (f) { return _this.handleFileChange(f, FileChangeType.Change); });
        watcher.on('unlink', function (f) { return _this.handleFileChange(f, FileChangeType.Remove); });
    };
    BuildService.prototype.handleFileChange = function (fileName, changeType, emit) {
        if (emit === void 0) { emit = true; }
        fileName = FileUtil.escapePath(fileName);
        var exitcode = 0;
        var extension = FileUtil.getExtension(fileName);
        switch (extension) {
            case 'ts':
                exitcode = this.handleTypeScriptFileChange(fileName, changeType, emit);
                break;
            case 'exml':
                exitcode = this.handleEXMLFileChange(fileName, changeType);
                break;
            default:
                this.handleOtherFileChange(fileName, changeType);
        }
        return exitcode;
    };
    BuildService.prototype.handleTypeScriptFileChange = function (fileName, changeType, emit) {
        var _this = this;
        if (fileName.indexOf(this.options.srcDir) < 0)
            return 0;
        //Update proj.json for typescript file add or remove
        if (changeType != FileChangeType.Change) {
            console.log("Add build task;");
            if (this._penddingBuildTask)
                clearTimeout(this._penddingBuildTask);
            this._penddingBuildTask = setTimeout(function () {
                console.log("compile project");
                _this.compileProject();
                _this._penddingBuildTask = null;
            }, 100);
        }
        var relativePath = fileName.replace(this.options.srcDir, '').replace(/\.ts$/, '.js');
        var output = FileUtil.joinPath(this.options.debugDir, relativePath);
        var exitcode = this.tss.fileChanged(fileName, emit && changeType == FileChangeType.Change, output);
        if (changeType == FileChangeType.Remove)
            FileUtil.remove(output);
        return exitcode;
    };
    BuildService.prototype.handleEXMLFileChange = function (fileName, changeType) {
        if (fileName.indexOf(this.options.srcDir) < 0)
            return 0;
        if (changeType != FileChangeType.Remove) {
            console.log('Compile Exml: ', fileName);
            exmlc.compile(fileName, this.options.srcDir);
        }
        else {
            var output = fileName.replace(/\.exml/, '.ts');
            FileUtil.remove(fileName);
        }
        return 0;
    };
    BuildService.prototype.handleOtherFileChange = function (fileName, changeType) {
        var src = this.options.srcDir, temp = this.options.templateDir, start = this.options.project.startupHtml, proj = this.options.projManifest;
        if (fileName.indexOf(src) < 0 && fileName.indexOf(temp) < 0) {
            return;
        }
        var relativePath = fileName.replace(src, '').replace(temp, '');
        var output = FileUtil.joinPath(this.options.debugDir, relativePath);
        if (changeType != FileChangeType.Remove) {
            FileUtil.copy(fileName, output);
            console.log('Copy: ', fileName, "\n  to: ", output);
        }
        else {
            FileUtil.remove(output);
            console.log('Remove: ', output);
        }
        if (fileName.indexOf(start) >= 0 || fileName.indexOf(proj) >= 0)
            return this.onTemplateIndexChanged(fileName);
    };
    BuildService.prototype.onTemplateIndexChanged = function (file) {
        var index = FileUtil.joinPath(this.options.templateDir, this.options.project.startupHtml);
        index = FileUtil.escapePath(index);
        console.log('Compile Template: ' + index);
        Action.compileTemplates(this.options);
        return 0;
    };
    BuildService.prototype.shouldIgnoreFile = function (fileName) {
        fileName = FileUtil.escapePath(fileName);
        if (fileName.indexOf(this.options.debugDir) == 0)
            return true;
        if (fileName.indexOf(this.options.releaseDir) == 0)
            return true;
        return false;
    };
    return BuildService;
})(Action);
var FileChangeType;
(function (FileChangeType) {
    FileChangeType[FileChangeType["Add"] = 0] = "Add";
    FileChangeType[FileChangeType["Change"] = 1] = "Change";
    FileChangeType[FileChangeType["Remove"] = 2] = "Remove";
})(FileChangeType || (FileChangeType = {}));
module.exports = BuildService;
//# sourceMappingURL=BuildService.js.map