var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Action = require('./Action');
var Config = (function (_super) {
    __extends(Config, _super);
    function Config() {
        _super.apply(this, arguments);
    }
    Config.prototype.run = function () {
        _super.prototype.run.call(this);
    };
    return Config;
})(Action);
module.exports = Config;
//# sourceMappingURL=Config.js.map