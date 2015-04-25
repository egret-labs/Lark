/// <reference path="../lib/types.d.ts" />



class Properties {

    version: string;
    entry: string;
    modules: lark.ILarkModule[];
    port: number;
    host: string;

    parse(json: lark.ILarkProperties) {
        this.version = json.version;
        this.entry = json.entry;
        this.modules = json.modules;
    }

    toJSON() {
        var json: lark.ILarkProperties = {
            version: this.version,
            entry: this.entry,
            modules: this.modules,
            port: this.port,
            host: this.host
        };
        return json;
    }
}


export = Properties;