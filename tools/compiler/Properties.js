/// <reference path="../lib/types.d.ts" />
var Properties = (function () {
    function Properties() {
        this.startupHtml = 'index.html';
    }
    Properties.prototype.parse = function (json) {
        this.version = json.version;
        this.larkVersion = json.larkVersion;
        this.keepLarkInSeparatedFiles = json.keepLarkInSeparatedFiles;
        this.entry = json.entry;
        this.modules = json.modules;
        this.startupHtml = json.startupHtml;
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
            startupHtml: this.startupHtml
        };
        return json;
    };
    return Properties;
})();
module.exports = Properties;
//# sourceMappingURL=Properties.js.map