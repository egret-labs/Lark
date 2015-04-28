/// <reference path="../lib/types.d.ts" />



class Properties implements lark.ILarkProperties {

    larkVersion: string;
    version: string;
    entry: string;
    modules: lark.ILarkModule[];
    port: number;
    host: string;
    ip: string;
    startupHtml: string = 'index.html';

    keepLarkInSeparatedFiles: boolean;
    advancedMinify: boolean;

    parse(json: lark.ILarkProperties) {
        this.version = json.version;
        this.larkVersion = json.larkVersion;
        this.keepLarkInSeparatedFiles = json.keepLarkInSeparatedFiles;
        this.entry = json.entry;
        this.modules = json.modules;
        this.startupHtml = json.startupHtml;
    }

    toJSON() {
        var json: lark.ILarkProperties = {
            version: this.version,
            larkVersion: this.larkVersion,
            keepLarkInSeparatedFiles: this.keepLarkInSeparatedFiles,
            entry: this.entry,
            modules: this.modules,
            port: this.port,
            host: this.host,
            startupHtml: this.startupHtml
        };
        return json;
    }
}


export = Properties;