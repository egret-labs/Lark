/// <reference path="../lib/types.d.ts" />
var watch = require("../lib/watch");
var typeScriptService = require("./TsService");
var FileUtil = require("../lib/FileUtil");
var BuildService = (function () {
    function BuildService() {
    }
    BuildService.prototype.start = function (settings) {
        this.setting = settings;
        this.tss = new typeScriptService(settings);
        this.createTypeScriptMonitor(settings.srcDir);
        this.createTemplateMonitor(settings.templateDir);
    };
    BuildService.prototype.createTypeScriptMonitor = function (folder) {
        var _this = this;
        watch.createMonitor(folder, {
            filter: function (f) { return _this.typeScriptFilter(f); }
        }, function (monitor) {
            monitor.on("created", function (f) { return _this.tss.fileChanged(f, true, _this.getTypeScriptOutputFileName(f)); });
            monitor.on("changed", function (f) { return _this.tss.fileChanged(f, true, _this.getTypeScriptOutputFileName(f)); });
            monitor.on("removed", function (f) { return _this.tss.fileChanged(f, true, _this.getTypeScriptOutputFileName(f)); });
        });
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
        watch.createMonitor(folder, {}, function (monitor) {
            monitor.on("created", function (f) { return _this.onTemplateFileChanged(f); });
            monitor.on("changed", function (f) { return _this.onTemplateFileChanged(f); });
            monitor.on("removed", function (f) { return _this.onTemplateFileChanged(f); });
        });
    };
    BuildService.prototype.getTemplateOutputFileName = function (fileName) {
        fileName = FileUtil.escapePath(fileName);
        var relativePath = fileName.replace(this.setting.templateDir, '');
        var output = FileUtil.joinPath(this.setting.debugDir, relativePath);
        return output;
    };
    BuildService.prototype.onTemplateFileChanged = function (f) {
        var output = this.getTemplateOutputFileName(f);
        console.log('changed ', f, output);
        if (FileUtil.exists(f)) {
            FileUtil.copy(f, output);
        }
        else {
            FileUtil.remove(output);
        }
    };
    BuildService.instance = null;
    return BuildService;
})();
function endWith(text, match) {
    return text.lastIndexOf(match) == (text.length - match.length);
}
module.exports = BuildService;
//# sourceMappingURL=BuildService.js.map