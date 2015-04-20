/// <reference path="../../lib/types.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Create = (function (_super) {
    __extends(Create, _super);
    function Create() {
        _super.apply(this, arguments);
    }
    Create.install = function (total) {
        var self = Create.prototype;
        total.route('$/create/');
    };
    Create.prototype.createView = function () {
        this.view('create');
    };
    return Create;
})(TotalJS.Controller);
module.exports = Create;
//# sourceMappingURL=create.js.map