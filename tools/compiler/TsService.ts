
/// <reference path="../lib/types.d.ts" />
/// <reference path="../lib/typescript/typescriptServices.d.ts" />

import events = require('events');
import watch = require("../lib/watch");
import FileUtil = require("../lib/FileUtil");
require("../lib/typescript/typescriptServices");

class TsService {
    static instance: TsService = null;
    tss: ts.LanguageService;
    host: Host;
    settings: lark.ICompileOptions;
    constructor(settings: lark.ICompileOptions) {
        var host = new Host();
        var tss = ts.createLanguageService(host, ts.createDocumentRegistry());

        host.settings = this.convertOption(settings);
        this.host = host;
        this.tss = tss;
        this.settings = settings;
        var fw = new FileWatcher();
        fw.service = this;
        fw.watch(settings.srcDir);
        var tslib = FileUtil.joinPath(settings.larkRoot, 'tools/lib/typescript/lib.d.ts');
        var tsList: string[] = FileUtil.search(settings.srcDir, "ts");
        tsList.unshift(tslib);
        tsList.forEach(file=> {
            var content = FileUtil.read(file);
            this.host.addScript(file, content);
        });
    }

    /**
    * 添加 修改 删除
    */
    fileChanged(fileName: string) {
        fileName = FileUtil.escapePath(fileName);
        var exist = FileUtil.exists(fileName);
        if (!exist) {
            this.host.removeScript(fileName);
        }
        else {
            var content = FileUtil.read(fileName);
            this.host.updateScript(fileName, content);
        }
    }

    emit(fileName: string) {

        var files = this.host.getScriptFileNames();

        files.forEach(file=> {
            var errors = this.tss.getSemanticDiagnostics(file);
            errors.forEach(error=> console.log(error.messageText,error.file.filename));
        })

        var content = this.tss.getEmitOutput(fileName);
        fileName = FileUtil.escapePath(fileName);
        var relativePath = fileName.replace(FileUtil.escapePath(this.settings.srcDir), '');
        var output = FileUtil.joinPath(this.settings.debugDir, relativePath);
        var fileToSave = output || this.settings.out;

        FileUtil.save(fileToSave, content.outputFiles[0].text);
    }

    private convertOption(options:lark.ICompileOptions) {

        var target = options.esTarget.toLowerCase();
        var targetEnum = ts.ScriptTarget.ES5;
        if (target == 'es6')
            targetEnum = ts.ScriptTarget.ES6;

        var tsOption: ts.CompilerOptions = {
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
    }
}

class FileWatcher extends events.EventEmitter {
    monitor: watch.FileMonitor;
    service: TsService;
    folder: string;
    watch(folder: string) {
        this.folder = folder;
        //watch.createMonitor(folder, {
        //    filter: f=>this.filter(f)
        //}, monitor=> {
        //    monitor.on("created", this.onFileCreated);
        //    monitor.on("changed", this.onFileChanged);
        //    monitor.on("removed", this.onRemoved);
        //    this.monitor = monitor;
        //    });

        watch.watchTree(folder, {
            filter: f=> this.filter(f)
        }, (f, curr, prev)=> {
            if (typeof f == "object" && prev === null && curr === null) {
                // Finished walking the tree
            } else if (prev === null) {
                this.onFileCreated(f,curr)
            } else if (curr.nlink === 0) {
                this.onRemoved(f, curr);
            } else {
                this.onFileChanged(f, curr, prev);
            }
        })
    }

    filter(filename: string): boolean {
        if (filename.lastIndexOf('.ts') == (filename.length - 3))
            return true;
        return false;
    }

    stop() {
        watch.unwatchTree(this.folder);
    }
    onFileCreated(fileName: string, stat) {
        this.service.fileChanged(fileName);
        this.service.emit(fileName);
    }
    onFileChanged(fileName: string, curr, prev) {
        console.log(fileName, ' is changed');
        this.service.fileChanged(fileName);
        this.service.emit(fileName);
    }
    onRemoved(fileName: string, stat) {
        this.service.fileChanged(fileName);
        this.service.host.removeScript(fileName);
    }
}

export = TsService;

class Host implements ts.LanguageServiceHost {
    constructor(private cancellationToken: ts.CancellationToken = CancellationToken.None) {
    }

    public addScript(fileName: string, content: string) {
        this.fileNameToScript[fileName] = new ScriptInfo(fileName, content, true);
    }

    public updateScript(fileName: string, content: string) {
        var script = this.getScriptInfo(fileName);
        if (script !== null) {
            script.updateContent(content);
            return;
        }

        this.addScript(fileName, content);
    }

    public editScript(fileName: string, minChar: number, limChar: number, newText: string) {
        var script = this.getScriptInfo(fileName);
        if (script !== null) {
            script.editContent(minChar, limChar, newText);
            return this.getSyntacticClassifications(fileName, minChar, minChar + newText.length);
        }

    }

    public removeScript(fileName: string) {
        var script = this.getScriptInfo(fileName);
        if (script !== null) {
            script.updateContent("");
            return;
        }
    }

    public tss: ts.LanguageService;
    private fileNameToScript: ts.Map<ScriptInfo> = {};
    public settings: ts.CompilerOptions = null;

    public getCompilationSettings(): ts.CompilerOptions {
        return this.settings || {
            mapSourceFiles: true,
            sourceMap: true
        };
    }
    public getScriptFileNames(): string[] {
        var fileNames: string[] = [];
        ts.forEachKey(this.fileNameToScript,(fileName) => { fileNames.push(fileName); });
        return fileNames;
    }
    private getScriptInfo(fileName: string): ScriptInfo {
        return this.fileNameToScript[fileName];
    }
    public getScriptVersion(fileName: string): string {
        return this.getScriptInfo(fileName).version.toString();
    }
    public getScriptIsOpen(fileName: string): boolean {
        return this.getScriptInfo(fileName).isOpen;
    }
    public getScriptSnapshot(fileName: string): ts.IScriptSnapshot {
        var info = this.getScriptInfo(fileName);
        return new ScriptSnapshot(info);
    }
    public getLocalizedDiagnosticMessages(): any {
        return "{}";
    }
    public getCancellationToken(): ts.CancellationToken {
        return this.cancellationToken;
    }
    public getCurrentDirectory(): string {
        return ""
    }
    public getDefaultLibFilename(): string {
        return "";
    }

    public getSyntacticClassifications(fileName: string, start: number, end: number): ts.ClassifiedSpan[] {
        var time = Date.now();
        var result = this.tss.getSyntacticClassifications(fileName, ts.TextSpan.fromBounds(start, end));
        var time = Date.now() - time;
        global.gc();
        console.log(time);
        return result;
    }
    public getSemanticClassifications(fileName: string, start: number, end: number): ts.ClassifiedSpan[] {
        return this.tss.getSemanticClassifications(fileName, ts.TextSpan.fromBounds(start, end));
    }

    public getSyntacticDiagnostics(fileName: string) {
        var stt = this.tss.getSyntacticDiagnostics(fileName);
        var smt = this.tss.getSemanticDiagnostics(fileName);
        var compile = this.tss.getCompilerOptionsDiagnostics() || [];
        if (compile && compile.length)
            compile = compile.filter(d=> d.file != null && d.file.filename == fileName);
        var result = stt.concat(smt).concat(compile);
        return result.map(d=> {
            d.file = <any>d.file.filename;
            return d;
        });
    }

    log(msg) {
        console.log(msg);
    }











}
class ScriptInfo {
    public version: number = 1;
    public editRanges: { length: number; textChangeRange: ts.TextChangeRange; }[] = [];
    public lineMap: number[] = null;

    constructor(public fileName: string, public content: string, public isOpen = true) {
        this.setContent(content);
    }

    private setContent(content: string): void {
        this.content = content;
        this.lineMap = computeLineStarts(content);
    }

    public updateContent(content: string): void {
        this.editRanges = [];
        this.setContent(content);
        this.version++;
    }

    public editContent(minChar: number, limChar: number, newText: string): void {
        // Apply edits
        var prefix = this.content.substring(0, minChar);
        var middle = newText;
        var suffix = this.content.substring(limChar);
        this.setContent(prefix + middle + suffix);

        // Store edit range + new length of script
        this.editRanges.push({
            length: this.content.length,
            textChangeRange: new global.TypeScript.TextChangeRange(
                ts.TextSpan.fromBounds(minChar, limChar), newText.length)
        });

        // Update version #
        this.version++;
    }

    public getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange {
        if (startVersion === endVersion) {
            // No edits!
            return global.TypeScript.TextChangeRange.unchanged;
        }

        var initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
        var lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);

        var entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
        return global.TypeScript.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
    }
}

class CancellationToken {
    public static None: CancellationToken = new CancellationToken(null);

    constructor(private cancellationToken: ts.CancellationToken) {
    }

    public isCancellationRequested() {
        return this.cancellationToken && this.cancellationToken.isCancellationRequested();
    }
}
class ScriptSnapshot implements ts.IScriptSnapshot {
    private lineMap: number[] = null;
    private textSnapshot: string;
    private version: number;

    constructor(private scriptInfo: ScriptInfo) {
        this.textSnapshot = scriptInfo.content;
        this.version = scriptInfo.version;
    }

    public getText(start: number, end: number): string {
        return this.textSnapshot.substring(start, end);
    }

    public getLength(): number {
        return this.textSnapshot.length;
    }

    public getLineStartPositions(): number[] {
        if (this.lineMap === null) {
            this.lineMap = computeLineStarts(this.textSnapshot);
        }

        return this.lineMap;
    }

    public getChangeRange(oldScript: ScriptSnapshot) {
        var oldShim = <ScriptSnapshot>oldScript;
        var range = this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
        if (range === null) {
            return null;
        }

        return range;
    }
    
}

function computeLineStarts(text: string): number[] {
    var result: number[] = new Array();
    var pos = 0;
    var lineStart = 0;
    while (pos < text.length) {
        var ch = text.charCodeAt(pos++);
        switch (ch) {
            case ts.CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos) === ts.CharacterCodes.lineFeed) {
                    pos++;
                }
            case ts.CharacterCodes.lineFeed:
                result.push(lineStart);
                lineStart = pos;
                break;
            default:
                if (ch > ts.CharacterCodes.maxAsciiCharacter && ts.isLineBreak(ch)) {
                    result.push(lineStart);
                    lineStart = pos;
                }
                break;
        }
    }
    result.push(lineStart);
    return result;
}