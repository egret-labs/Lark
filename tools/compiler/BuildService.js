/// <reference path="../lib/types.d.ts" />
var Action = require('./Action');
var exmlc = require('../lib/exml/exmlc');
var FileUtil = require("../lib/FileUtil");
var typeScriptService = require("./TsService");
var chokidar = require("../lib/chokidar/index");
var BuildService = (function () {
    function BuildService() {
    }
    BuildService.prototype.start = function (settings) {
        this.setting = settings;
        this.tss = new typeScriptService(settings);
        this.createEXMLMonitor(settings.srcDir);
        this.createTypeScriptMonitor(settings.srcDir);
        this.createTemplateMonitor(settings.templateDir);
    };
    BuildService.prototype.createTypeScriptMonitor = function (folder) {
        var _this = this;
        chokidar.watch(folder, { ignoreInitial: true, ignored: [function (f) { return !_this.typeScriptFilter(f); }] })
            .on('add', function (f) { return _this.tss.fileChanged(f, true, _this.getTypeScriptOutputFileName(f)); })
            .on('change', function (f) { return _this.tss.fileChanged(f, true, _this.getTypeScriptOutputFileName(f)); })
            .on('unlink', function (f) { return _this.tss.fileChanged(f, true, _this.getTypeScriptOutputFileName(f)); });
    };
    BuildService.prototype.typeScriptFilter = function (fileName) {
        if (FileUtil.isDirectory(fileName))
            return true;
        if (endWith(fileName, '.ts'))
            return true;
        return false;
    };
    BuildService.prototype.getTypeScriptOutputFileName = function (fileName) {
        fileName = FileUtil.escapePath(fileName);
        var relativePath = fileName.replace(this.setting.srcDir, '').replace(/\.ts$/, '.js');
        var output = FileUtil.joinPath(this.setting.debugDir, relativePath);
        return output;
    };
    BuildService.prototype.createTemplateMonitor = function (folder) {
        var _this = this;
        chokidar.watch(folder, { ignoreInitial: true })
            .on('add', function (f) { return _this.onTemplateFileChanged(f); })
            .on('change', function (f) { return _this.onTemplateFileChanged(f); })
            .on('unlink', function (f) { return _this.onTemplateFileChanged(f); });
    };
    BuildService.prototype.getTemplateOutputFileName = function (fileName) {
        fileName = FileUtil.escapePath(fileName);
        var relativePath = fileName.replace(this.setting.templateDir, '');
        var output = FileUtil.joinPath(this.setting.debugDir, relativePath);
        return output;
    };
    BuildService.prototype.onTemplateFileChanged = function (f) {
        f = FileUtil.escapePath(f);
        if (f.indexOf(this.setting.projectProperties.startupHtml) >= 0)
            return this.onTemplateIndexChanged(f);
        var output = this.getTemplateOutputFileName(f);
        console.log('Copy: ', f, "\n  to: ", output);
        if (FileUtil.exists(f)) {
            FileUtil.copy(f, output);
        }
        else {
            FileUtil.remove(output);
        }
    };
    BuildService.prototype.onTemplateIndexChanged = function (file) {
        file = FileUtil.escapePath(file);
        var index = FileUtil.joinPath(this.setting.templateDir, this.setting.projectProperties.startupHtml);
        index = FileUtil.escapePath(index);
        if (file != index)
            return;
        var tsFiles = this.tss.host.getScriptFileNames();
        var jsFiles = Action.GetJavaScriptFileNames(tsFiles, this.setting.srcDir);
        Action.compileTemplates(jsFiles, this.setting);
    };
    BuildService.prototype.createEXMLMonitor = function (folder) {
        var _this = this;
        chokidar.watch(folder, { ignoreInitial: true, ignored: [function (f) { return !_this.exmlFileFilter(f); }] })
            .on('add', function (f) { return _this.compileExmlFile(f); })
            .on('change', function (f) { return _this.compileExmlFile(f); })
            .on('unlink', function (f) { return _this.removeExmlTsOutput(f); });
    };
    BuildService.prototype.exmlFileFilter = function (fileName) {
        if (FileUtil.isDirectory(fileName))
            return true;
        if (endWith(fileName, '.exml'))
            return true;
        return false;
    };
    BuildService.prototype.compileExmlFile = function (file) {
        console.log('Compile Exml: ', file);
        exmlc.compile(file, this.setting.srcDir);
    };
    BuildService.prototype.removeExmlTsOutput = function (fileName) {
        fileName = FileUtil.escapePath(fileName);
        var output = fileName.replace(/\.exml/, '.ts');
        FileUtil.remove(fileName);
    };
    BuildService.instance = null;
    return BuildService;
})();
function endWith(text, match) {
    return text.lastIndexOf(match) == (text.length - match.length);
}
module.exports = BuildService;
//# sourceMappingURL=BuildService.js.map