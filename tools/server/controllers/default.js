/// <reference path="../../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var file = require('../../lib/FileUtil');
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        _super.apply(this, arguments);
    }
    Default.install = function () {
        var self = Default.prototype;
        framework.route('$/', self.manage);
        framework.route('$/shutdown', self.shutdown);
        framework.route('$/ping/', self.ping);
        framework.file('Lark manage static files', self.staticFiles);
        framework.file('User project static files', self.projectFiles);
    };
    Default.prototype.manage = function () {
        var viewdata = {
            options: lark.server.options.toJSON()
        };
        this.repository = viewdata;
        this.view('index');
    };
    Default.prototype.shutdown = function () {
        console.log('The server has been shutdown');
        this.res.send(200, '');
        setTimeout(function () { return process.exit(0); }, 200);
    };
    Default.prototype.staticFiles = function (req, res, isValidation) {
        if (isValidation) {
            return req.url.indexOf(Default.LarkStaticContentPath) !== -1;
        }
        var filePath = getLarkContentFullName(req);
        framework.responseFile(req, res, filePath);
    };
    Default.prototype.projectFiles = function (req, res, isValidation) {
        if (isValidation) {
            if (req.url.indexOf('$/') >= 0)
                return false;
            var path = getUserProjectContentFullName(req);
            return file.exists(path);
        }
        var path = getUserProjectContentFullName(req);
        framework.responseFile(req, res, path);
    };
    Default.prototype.ping = function () {
        console.log('call ping');
        var res = this.res;
        res.send(200, 'OK');
    };
    Default.LarkStaticContentPath = '$/content/';
    Default.UserProjectPath = null;
    return Default;
})(TotalJS.Controller);
function getLarkContentFullName(req) {
    var url = req.url;
    var path = url.replace(Default.LarkStaticContentPath, '');
    var fullpath = utils.combine('~', __dirname, '../content/', path);
    return fullpath;
}
function getUserProjectContentFullName(req) {
    var url = req.url;
    var fullpath = utils.combine('~', Default.UserProjectPath, url);
    return fullpath;
}
module.exports = Default;
//# sourceMappingURL=default.js.map