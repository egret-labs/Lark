/// <reference path="../lib/types.d.ts" />
var Project = (function () {
    function Project() {
        this.version = '1.0.0';
        this.name = "app";
        this.entry = 'Main';
        this.template = 'empty';
        this.modules = [];
        this.platforms = [];
        this.port = Math.ceil(Math.random() * 50000 + 3000);
        this.host = 'localhost';
        this.ip = '0.0.0.0';
        this.startupHtml = 'index.html';
        this.scaleMode = 'noScale';
        this.contentWidth = 480;
        this.contentHeight = 800;
        this.showPaintRects = false;
    }
    Project.prototype.parse = function (json) {
        this.version = json.version || this.version;
        this.name = json.name || this.name;
        this.larkVersion = json.larkVersion || this.larkVersion;
        this.keepLarkInSeparatedFiles = json.keepLarkInSeparatedFiles;
        this.entry = json.entry || this.entry;
        this.modules = json.modules || this.modules;
        this.platforms = json.platforms || this.platforms;
        this.startupHtml = json.startupHtml || this.startupHtml;
        this.port = json.port || this.port;
        this.host = json.host || this.host;
        this.ip = json.ip || this.ip;
        this.scaleMode = json.scaleMode || this.scaleMode;
        this.contentWidth = json.contentWidth || this.contentWidth;
        this.contentHeight = json.contentHeight || this.contentHeight;
        this.showPaintRects = json.showPaintRects || this.showPaintRects;
        this.template = json.template;
    };
    Project.prototype.toJSON = function () {
        var json = {
            version: this.version,
            name: this.name,
            template: this.template,
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
            showPaintRects: this.showPaintRects,
            platforms: this.platforms
        };
        return json;
    };
    return Project;
})();
module.exports = Project;
//# sourceMappingURL=Project.js.map