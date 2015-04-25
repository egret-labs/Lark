/// <reference path="../lib/types.d.ts" />
var Properties = (function () {
    function Properties() {
    }
    Properties.prototype.parse = function (json) {
        this.version = json.version;
        this.entry = json.entry;
        this.modules = json.modules;
    };
    Properties.prototype.toJSON = function () {
        var json = {
            version: this.version,
            entry: this.entry,
            modules: this.modules,
            port: this.port,
            host: this.host
        };
        return json;
    };
    return Properties;
})();
module.exports = Properties;
//# sourceMappingURL=Properties.js.map