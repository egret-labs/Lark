/// <reference path="../lib/types.d.ts" />
var file = require('../lib/FileUtil');
var utils = require('../lib/utils');
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
    Project.prototype.read = function (path) {
        if (path === void 0) { path = lark.options.larkPropertiesFile; }
        if (file.exists(path)) {
            var json = file.read(path);
            var data = null;
            try {
                data = JSON.parse(json);
            }
            catch (e) {
                console.error(utils.tr(10005));
                process.exit(10005);
            }
            this.parse(data);
        }
    };
    Project.prototype.save = function (path) {
        if (path === void 0) { path = lark.options.larkPropertiesFile; }
        var propjson = this;
        console.log(path);
        file.save(path, JSON.stringify(propjson, null, '   '));
    };
    return Project;
})();
module.exports = Project;
//# sourceMappingURL=Project.js.map