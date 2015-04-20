/// <reference path="../lib/types.d.ts" />

import FileUtil = require('../lib/FileUtil');


class CompileOptions implements lark.ICompileOptions {
    action: string;
    projectDir: string;
    get srcDir(): string {
        return FileUtil.joinPath(this.projectDir, "src/");
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

    //modules
    modules: string;

}

export = CompileOptions;