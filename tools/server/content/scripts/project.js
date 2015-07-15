/// <reference path="../../../lib/types.d.ts" />
/// <reference path="libs/angular.d.ts" />
/// <reference path="utils.ts" />
var lark;
(function (lark) {
    var portal;
    (function (portal) {
        portal.project;
        var Project = (function () {
            function Project() {
                var _this = this;
                this.larkManifest = lark.manifest;
                this.scaleModes = lark.manifest.scaleModes;
                this.orientationModes = lark.manifest.orientationModes;
                this.modules = [];
                this.platforms = [];
                this.scaleMode = 'noScale';
                this.orientationMode = 'auto';
                this.contentWidth = 480;
                this.contentHeight = 800;
                this.showPaintRects = false;
                this.template = "Empty";
                this.port = 3000;
                this.isConfig = location.pathname.indexOf("/$/config") >= 0;
                this.isConfirmed = true;
                this.isLoadingShow = false;
                this.isCreated = false;
                this.background = "#888888";
                this.frameRate = 30;
                this.larkManifest.modules.forEach(function (lm) {
                    if (lm.name == 'lark')
                        lm.checked = true;
                    _this.modules.forEach(function (m) {
                        if (lm.name == m.name)
                            lm.checked = true;
                    });
                });
                this.larkManifest.platforms.forEach(function (lm) {
                    if (lm.name == 'web')
                        lm.checked = true;
                    _this.platforms.forEach(function (m) {
                        if (lm.name == m.name)
                            lm.checked = true;
                    });
                });
                var port = parseInt(location.port || "80");
                this.port = port;
                var exist = location.search && location.search.indexOf("exist=true") >= 0;
                if (exist)
                    this.isConfirmed = false;
            }
            Project.prototype.finish = function () {
                var _this = this;
                var manifest = this.larkManifest;
                this.modules = manifest.modules.filter(function (m) { return m.checked; }).map(function (m) { return { name: m.name }; });
                this.platforms = manifest.platforms.filter(function (p) { return p.checked; }).map(function (p) { return { name: p.name }; });
                this.larkManifest = undefined;
                var modes = this.scaleModes;
                this.scaleModes = undefined;
                var omodes = this.orientationModes;
                this.orientationModes = undefined;
                var json = JSON.stringify(this);
                console.log(json);
                $.get('', { proj: json }, function () {
                    _this.isCreated = true;
                    _this.isLoadingShow = false;
                    $("#createdMask").show();
                    $("#loadingMask").hide();
                    $("#loading").remove();
                });
                this.scaleModes = modes;
                this.orientationModes = omodes;
                this.larkManifest = manifest;
                this.isLoadingShow = true;
                showLoading();
            };
            Project.prototype.cancel = function () {
                $.get('', { cancel: true }, function () { });
                setTimeout(function () { return window.close(); }, 20);
            };
            Project.prototype.close = function () {
                window.close();
            };
            Project.prototype.switchSize = function () {
                var n = this.contentHeight;
                this.contentHeight = this.contentWidth;
                this.contentWidth = n;
            };
            return Project;
        })();
        portal.Project = Project;
    })(portal = lark.portal || (lark.portal = {}));
})(lark || (lark = {}));
lark.app.controller('ProjectController', lark.portal.Project);
function showLoading() {
    $("#loadingMask").show();
    var elem = $("#loading");
    elem.show();
    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 2000,
        step: function (now) {
            elem.css({
                'transform': 'rotate(' + now + 'deg)'
            });
        },
        easing: 'linear',
        complete: showLoading
    });
}
