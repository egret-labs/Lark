var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Action = require('./Action');
var Build = require('./Build');
var FileUtil = require('../lib/FileUtil');
var Create = (function (_super) {
    __extends(Create, _super);
    function Create() {
        _super.apply(this, arguments);
    }
    Create.prototype.run = function () {
        _super.prototype.run.call(this);
        var option = this.options;
        FileUtil.createDirectory(option.srcDir);
        FileUtil.createDirectory(option.debugDir);
        var templateDir = FileUtil.joinPath(option.larkRoot, 'template');
        FileUtil.copy(templateDir, option.templateDir);
        Build.buildLark(this.options);
    };
    return Create;
})(Action);
module.exports = Create;
//# sourceMappingURL=Create.js.map