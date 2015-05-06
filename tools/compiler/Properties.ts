/// <reference path="../lib/types.d.ts" />



class Properties implements lark.ILarkProperties {

    constructor() {

    }

    larkVersion: string;
    version: string = '1.0.0';
    entry: string = 'Main';
    modules: lark.ILarkModule[];
    port: number = Math.ceil(Math.random() * 50000 + 3000);
    host: string = 'localhost';
    ip: string = '0.0.0.0';
    startupHtml: string = 'index.html';
    scaleMode: string = 'noScale';
    contentWidth: number = 480;
    contentHeight: number = 800;
    showPaintRects: boolean = false;

    keepLarkInSeparatedFiles: boolean;
    advancedMinify: boolean;

    parse(json: lark.ILarkProperties) {
        this.version = json.version || this.version;
        this.larkVersion = json.larkVersion||this.larkVersion;
        this.keepLarkInSeparatedFiles = json.keepLarkInSeparatedFiles;
        this.entry = json.entry||this.entry;
        this.modules = json.modules||this.modules;
        this.startupHtml = json.startupHtml || this.startupHtml;
        this.port = json.port || this.port;
        this.host = json.host || this.host;
        this.ip = json.ip || this.ip;
        this.scaleMode = json.scaleMode || this.scaleMode;
        this.contentWidth = json.contentWidth || this.contentWidth;
        this.contentHeight = json.contentHeight || this.contentHeight;
        this.showPaintRects = json.showPaintRects || this.showPaintRects;
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
            ip: this.ip,
            startupHtml: this.startupHtml,
            scaleMode: this.scaleMode,
            contentHeight: this.contentHeight,
            contentWidth: this.contentWidth,
            showPaintRects: this.showPaintRects
        };
        return json;
    }
}


export = Properties;