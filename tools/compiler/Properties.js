/// <reference path="../lib/types.d.ts" />
var Properties = (function () {
    function Properties() {
        this.version = '1.0.0';
        this.entry = 'Main';
        this.port = Math.ceil(Math.random() * 50000 + 3000);
        this.host = 'localhost';
        this.ip = '0.0.0.0';
        this.startupHtml = 'index.html';
        this.scaleMode = 'noScale';
        this.contentWidth = 480;
        this.contentHeight = 800;
        this.showPaintRects = false;
    }
    Properties.prototype.parse = function (json) {
        this.version = json.version || this.version;
        this.larkVersion = json.larkVersion || this.larkVersion;
        this.keepLarkInSeparatedFiles = json.keepLarkInSeparatedFiles;
        this.entry = json.entry || this.entry;
        this.modules = json.modules || this.modules;
        this.startupHtml = json.startupHtml || this.startupHtml;
        this.port = json.port || this.port;
        this.host = json.host || this.host;
        this.ip = json.ip || this.ip;
        this.scaleMode = json.scaleMode || this.scaleMode;
        this.contentWidth = json.contentWidth || this.contentWidth;
        this.contentHeight = json.contentHeight || this.contentHeight;
        this.showPaintRects = json.showPaintRects || this.showPaintRects;
    };
    Properties.prototype.toJSON = function () {
        var json = {
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
    };
    return Properties;
})();
module.exports = Properties;
//# sourceMappingURL=Properties.js.map