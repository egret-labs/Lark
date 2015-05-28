/// <reference path="../lib/types.d.ts" />

import FileUtil = require('../lib/FileUtil');


class CompileOptions implements lark.ICompileOptions {
    action: string;
    projectDir: string;
    projManifest: any;

    get dirName(): string {
        return FileUtil.getFileName(this.projectDir);
    }

    get srcDir(): string {
        return FileUtil.joinPath(this.projectDir, "src/");
    }
    
    get larkPropertiesFile(): string {
        return FileUtil.joinPath(this.projectDir, "lark.json");
    }

    get debugDir(): string {
        return FileUtil.joinPath(this.projectDir, "bin-debug/");
    }

    get releaseDir(): string {
        return FileUtil.joinPath(this.projectDir, "bin-release/");
    }


    get out(): string {
        var filename = this.publish ? FileUtil.joinPath(this.outDir, this.project.name + '.min.js') : undefined;
        return filename;
    }

    get outDir(): string {
        return this.publish ? this.releaseDir : this.debugDir;
    }


    get templateDir(): string {
        return FileUtil.joinPath(this.projectDir, "template/");
    }

    get host(): string {
        return this.project.host;
    }
    get port(): number {
        return this.project.port;
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
    sourceMap: boolean;
    removeComments: boolean;
    esTarget: string = 'ES5';
    serverOnly: boolean;
    autoCompile: boolean;
    fileName:string;

    project: lark.ILarkProject;

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