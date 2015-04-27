/// <reference path="../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var events = require('events');
var watch = require("../lib/watch");
var FileUtil = require("../lib/FileUtil");
var ts = require("../lib/typescript/typescriptServices");
var TsService = (function () {
    function TsService(settings) {
        var host = new Host();
        var tss = ts.createLanguageService(host, ts.createDocumentRegistry());
        host.settings = this.convertOption(settings);
        this.host = host;
        this.tss = tss;
        this.settings = settings;
        var fw = new FileWatcher();
        fw.watch(settings.projectDir);
    }
    /**
    * 添加 修改 删除
    */
    TsService.prototype.fileChanged = function (fileName) {
        var exist = FileUtil.exists(fileName);
        if (!exist) {
            this.host.removeScript(fileName);
        }
        else {
            var content = FileUtil.read(fileName);
            this.host.updateScript(fileName, content);
        }
    };
    TsService.prototype.emit = function (fileName) {
        var _this = this;
        var files = this.host.getScriptFileNames();
        files.forEach(function (file) {
            var errors = _this.tss.getSemanticDiagnostics(file);
            errors.forEach(function (error) { return console.log(error.messageText, error.file.filename); });
        });
        var content = this.tss.getEmitOutput(fileName);
        var fileToSave = fileName || this.settings.out;
        FileUtil.save(fileName, content);
    };
    TsService.prototype.convertOption = function (options) {
        var target = options.esTarget.toLowerCase();
        var targetEnum = 1 /* ES5 */;
        if (target == 'es6')
            targetEnum = 2 /* ES6 */;
        var tsOption = {
            sourceMap: options.sourceMap,
            target: targetEnum,
            removeComments: options.removeComments,
            declaration: options.declaration
        };
        if (options.out) {
            tsOption.out = options.out;
        }
        else {
            tsOption.outDir = options.outDir;
        }
        return tsOption;
    };
    return TsService;
})();
var FileWatcher = (function (_super) {
    __extends(FileWatcher, _super);
    function FileWatcher() {
        _super.apply(this, arguments);
    }
    FileWatcher.prototype.watch = function (folder) {
        var _this = this;
        watch.createMonitor(folder, {
            filter: function (f) { return _this.filter(f); }
        }, function (monitor) {
            monitor.on("created", _this.onFileCreated);
            monitor.on("changed", _this.onFileChanged);
            monitor.on("removed", _this.onRemoved);
            _this.monitor = monitor;
        });
    };
    FileWatcher.prototype.filter = function (filename) {
        if (filename.endsWith('.ts'))
            return true;
        return false;
    };
    FileWatcher.prototype.stop = function () {
        this.monitor.stop();
    };
    FileWatcher.prototype.onFileCreated = function (fileName, stat) {
        this.service.fileChanged(fileName);
        this.service.emit(fileName);
    };
    FileWatcher.prototype.onFileChanged = function (fileName, curr, prev) {
        this.service.emit(fileName);
    };
    FileWatcher.prototype.onRemoved = function (fileName, stat) {
        this.service.host.removeScript(fileName);
    };
    return FileWatcher;
})(events.EventEmitter);
var Host = (function () {
    function Host(cancellationToken) {
        if (cancellationToken === void 0) { cancellationToken = CancellationToken.None; }
        this.cancellationToken = cancellationToken;
        this.fileNameToScript = {};
        this.settings = null;
    }
    Host.prototype.addScript = function (fileName, content) {
        this.fileNameToScript[fileName] = new ScriptInfo(fileName, content, true);
    };
    Host.prototype.updateScript = function (fileName, content) {
        var script = this.getScriptInfo(fileName);
        if (script !== null) {
            script.updateContent(content);
            return;
        }
        this.addScript(fileName, content);
    };
    Host.prototype.editScript = function (fileName, minChar, limChar, newText) {
        var script = this.getScriptInfo(fileName);
        if (script !== null) {
            script.editContent(minChar, limChar, newText);
            return this.getSyntacticClassifications(fileName, minChar, minChar + newText.length);
        }
    };
    Host.prototype.removeScript = function (fileName) {
        var script = this.getScriptInfo(fileName);
        if (script !== null) {
            script.updateContent("");
            return;
        }
    };
    Host.prototype.getCompilationSettings = function () {
        return this.settings || {
            mapSourceFiles: true,
            sourceMap: true
        };
    };
    Host.prototype.getScriptFileNames = function () {
        var fileNames = [];
        ts.forEachKey(this.fileNameToScript, function (fileName) {
            fileNames.push(fileName);
        });
        return fileNames;
    };
    Host.prototype.getScriptInfo = function (fileName) {
        return this.fileNameToScript[fileName];
    };
    Host.prototype.getScriptVersion = function (fileName) {
        return this.getScriptInfo(fileName).version.toString();
    };
    Host.prototype.getScriptIsOpen = function (fileName) {
        return this.getScriptInfo(fileName).isOpen;
    };
    Host.prototype.getScriptSnapshot = function (fileName) {
        var info = this.getScriptInfo(fileName);
        return new ScriptSnapshot(info);
    };
    Host.prototype.getLocalizedDiagnosticMessages = function () {
        return "{}";
    };
    Host.prototype.getCancellationToken = function () {
        return this.cancellationToken;
    };
    Host.prototype.getCurrentDirectory = function () {
        return "";
    };
    Host.prototype.getDefaultLibFilename = function () {
        return "";
    };
    Host.prototype.getSyntacticClassifications = function (fileName, start, end) {
        var time = Date.now();
        var result = this.tss.getSyntacticClassifications(fileName, ts.TextSpan.fromBounds(start, end));
        var time = Date.now() - time;
        global.gc();
        console.log(time);
        return result;
    };
    Host.prototype.getSemanticClassifications = function (fileName, start, end) {
        return this.tss.getSemanticClassifications(fileName, ts.TextSpan.fromBounds(start, end));
    };
    Host.prototype.getSyntacticDiagnostics = function (fileName) {
        var stt = this.tss.getSyntacticDiagnostics(fileName);
        var smt = this.tss.getSemanticDiagnostics(fileName);
        var compile = this.tss.getCompilerOptionsDiagnostics() || [];
        if (compile && compile.length)
            compile = compile.filter(function (d) { return d.file != null && d.file.filename == fileName; });
        var result = stt.concat(smt).concat(compile);
        return result.map(function (d) {
            d.file = d.file.filename;
            return d;
        });
    };
    Host.prototype.log = function (msg) {
        console.log(msg);
    };
    return Host;
})();
var ScriptInfo = (function () {
    function ScriptInfo(fileName, content, isOpen) {
        if (isOpen === void 0) { isOpen = true; }
        this.fileName = fileName;
        this.content = content;
        this.isOpen = isOpen;
        this.version = 1;
        this.editRanges = [];
        this.lineMap = null;
        this.setContent(content);
    }
    ScriptInfo.prototype.setContent = function (content) {
        this.content = content;
        this.lineMap = ts.computeLineStarts(content);
    };
    ScriptInfo.prototype.updateContent = function (content) {
        this.editRanges = [];
        this.setContent(content);
        this.version++;
    };
    ScriptInfo.prototype.editContent = function (minChar, limChar, newText) {
        // Apply edits
        var prefix = this.content.substring(0, minChar);
        var middle = newText;
        var suffix = this.content.substring(limChar);
        this.setContent(prefix + middle + suffix);
        // Store edit range + new length of script
        this.editRanges.push({
            length: this.content.length,
            textChangeRange: new ts.TextChangeRange(ts.TextSpan.fromBounds(minChar, limChar), newText.length)
        });
        // Update version #
        this.version++;
    };
    ScriptInfo.prototype.getTextChangeRangeBetweenVersions = function (startVersion, endVersion) {
        if (startVersion === endVersion) {
            // No edits!
            return ts.TextChangeRange.unchanged;
        }
        var initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
        var lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);
        var entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
        return ts.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(function (e) { return e.textChangeRange; }));
    };
    return ScriptInfo;
})();
var CancellationToken = (function () {
    function CancellationToken(cancellationToken) {
        this.cancellationToken = cancellationToken;
    }
    CancellationToken.prototype.isCancellationRequested = function () {
        return this.cancellationToken && this.cancellationToken.isCancellationRequested();
    };
    CancellationToken.None = new CancellationToken(null);
    return CancellationToken;
})();
var ScriptSnapshot = (function () {
    function ScriptSnapshot(scriptInfo) {
        this.scriptInfo = scriptInfo;
        this.lineMap = null;
        this.textSnapshot = scriptInfo.content;
        this.version = scriptInfo.version;
    }
    ScriptSnapshot.prototype.getText = function (start, end) {
        return this.textSnapshot.substring(start, end);
    };
    ScriptSnapshot.prototype.getLength = function () {
        return this.textSnapshot.length;
    };
    ScriptSnapshot.prototype.getLineStartPositions = function () {
        if (this.lineMap === null) {
            this.lineMap = ts.computeLineStarts(this.textSnapshot);
        }
        return this.lineMap;
    };
    ScriptSnapshot.prototype.getChangeRange = function (oldScript) {
        var oldShim = oldScript;
        var range = this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
        if (range === null) {
            return null;
        }
        return range;
    };
    return ScriptSnapshot;
})();
module.exports = TsService;
//# sourceMappingURL=TsService.js.map