/// <reference path="../lib/types.d.ts" />

import FileUtil = require('../lib/FileUtil');


class CompileOptions implements lark.ICompileOptions {
    action: string;
    projectDir: string;
    get srcDir(): string {
        return FileUtil.joinPath(this.projectDir, "src/");
    }

    get larkPropertiesFile(): string {
        return FileUtil.joinPath(this.projectDir, "lark.json");
    }

    get srcLarkFile(): string {
        var filename = this.publish ? 'lark.min.js' : 'lark.js';
        return FileUtil.joinPath(this.srcDir, "lark/" + filename);
    }

    get debugDir(): string {
        return FileUtil.joinPath(this.projectDir, "bin-debug/");
    }

    get debugLarkFile(): string {
        return FileUtil.joinPath(this.debugDir, "lark/lark.js");
    }

    get releaseDir(): string {
        return FileUtil.joinPath(this.projectDir, "bin-release/");
    }

    get releaseLarkFile(): string {
        return FileUtil.joinPath(this.releaseDir, "lark/lark.min.js");
    }

    get out(): string {
        var filename = this.publish ? FileUtil.joinPath(this.outDir, 'game.min.js') : undefined;
        return filename;
    }

    get outDir(): string {
        return this.publish ? this.releaseDir : this.debugDir;
    }

    get outLarkFile(): string {
        return this.publish ? this.releaseLarkFile : this.debugLarkFile;
    }

    get templateDir(): string {
        return FileUtil.joinPath(this.projectDir, "template");
    }

    get host(): string {
        return this.projectProperties.host;
    }
    get port(): number {
        return this.projectProperties.port;
    }
    get websocketUrl(): string {
        var url = "ws://" + this.host + ':' + this.port;
        return url;
    }
    get manageUrl(): string {
        var url = "http://" + this.host + ':' + this.port + '/$/';
        return url;
    }

    larkRoot: string;
    publish: boolean;
    includeLark: boolean;
    runtime: string;
    watch: boolean;
    minify: boolean;
    sourceMap: boolean;
    removeComments: boolean;
    esTarget: string = 'ES5';
    showUI: boolean;
    declaration: boolean;

    projectProperties: lark.ILarkProperties;

    static parse(option: lark.ICompileOptions) {
        var it = new CompileOptions();
        for (var p in option)
        {
            it[p] = option[p];
        }
        return it;
    }

    toJSON(): lark.ICompileOptions {
        var options = this;
        var json: any = {};
        for (var k in this) {
            var disc = Object.getOwnPropertyDescriptor(options, k) || Object.getOwnPropertyDescriptor(CompileOptions.prototype, k);
            if (!disc)
                continue;
            if (disc.enumerable == false)
                continue;
            if (typeof disc.value == 'function')
                continue;
            json[k] = options[k]
        }
        return json;
    }
}

export = CompileOptions;