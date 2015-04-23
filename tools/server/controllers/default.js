/// <reference path="../../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        _super.apply(this, arguments);
    }
    Default.install = function () {
        var self = Default.prototype;
        framework.route('$/');
        framework.route('$/ping/', self.ping);
        framework.file('Lark manage static files', self.staticFiles);
    };
    Default.prototype.staticFiles = function (req, res, isValidation) {
        if (isValidation) {
            return req.url.indexOf(Default.LarkStaticContentPath) !== -1;
        }
        var filePath = getLarkContentFullName(req);
        framework.responseFile(req, res, filePath);
    };
    Default.prototype.ping = function () {
        console.log('call ping');
        var res = this.res;
        res.send(200, 'OK');
    };
    Default.LarkStaticContentPath = '$/content/';
    return Default;
})(TotalJS.Controller);
function getLarkContentFullName(req) {
    var url = req.url;
    var path = url.replace(Default.LarkStaticContentPath, '');
    var fullpath = utils.combine('~', __dirname, '../content/', path);
    return fullpath;
}
module.exports = Default;
//# sourceMappingURL=default.js.map