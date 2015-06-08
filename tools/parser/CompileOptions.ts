/// <reference path="../lib/types.d.ts" />

import FileUtil = require('../lib/FileUtil');


class CompileOptions implements lark.LarkToolArgs {
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
        var filename = this.publish ? FileUtil.joinPath(this.outDir, 'main.min.js') : undefined;
        return filename;
    }

    get outDir(): string {
        return this.publish ? this.releaseDir : this.debugDir;
    }


    get templateDir(): string {
        return FileUtil.joinPath(this.projectDir, "template/");
    }

    get host(): string {
        return "localhost";
    }
    get port(): number {
        return 3000;
    }
    get websocketUrl(): string {
        var url = "ws://" + this.host + ':' + this.port;
        return url;
    }
    get manageUrl(): string {
        var url = "http://" + this.host + ':' + this.port + '/$/';
        return url;
    }
    get startUrl(): string {
        var url = "http://" + this.host + ':' + this.port + '/bin-debug/index.html';
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

    static parse(option: lark.LarkToolArgs) {
        var it = new CompileOptions();
        for (var p in option)
        {
            it[p] = option[p];
        }
        return it;
    }

    toJSON(): lark.LarkToolArgs {
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