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
                this.name = portal.project.name;
                this.scaleModes = lark.manifest.scaleModes;
                this.larkVersion = portal.project.larkVersion;
                this.version = portal.project.version;
                this.entry = portal.project.entry;
                this.modules = portal.project.modules || [];
                this.platforms = portal.project.platforms || [];
                this.port = portal.project.port;
                this.host = portal.project.host;
                this.ip = portal.project.ip;
                this.startupHtml = portal.project.startupHtml;
                this.scaleMode = portal.project.scaleMode;
                this.contentWidth = portal.project.contentWidth;
                this.contentHeight = portal.project.contentHeight;
                this.showPaintRects = portal.project.showPaintRects;
                this.template = "Empty";
                this.isConfig = location.pathname.indexOf("/$/config") >= 0;
                this.larkManifest.modules.forEach(function (lm) {
                    if (lm.name == 'lark')
                        lm.checked = true;
                    _this.modules.forEach(function (m) {
                        if (lm.name == m.name)
                            lm.checked = true;
                    });
                });
                this.larkManifest.platforms.forEach(function (lm) {
                    if (lm.name == 'html5')
                        lm.checked = true;
                    _this.platforms.forEach(function (m) {
                        if (lm.name == m.name)
                            lm.checked = true;
                    });
                });
            }
            Project.prototype.finish = function () {
                var manifest = this.larkManifest;
                this.modules = manifest.modules.filter(function (m) { return m.checked; }).map(function (m) { return { name: m.name }; });
                this.platforms = manifest.platforms.filter(function (p) { return p.checked; }).map(function (p) { return { name: p.name }; });
                this.larkManifest = undefined;
                var modes = this.scaleModes;
                this.scaleModes = undefined;
                var json = JSON.stringify(this);
                console.log(json);
                $.get('', { proj: json }, function () {
                    setTimeout(function () { return location.href = "/bin-debug/index.html"; }, 500);
                });
                this.scaleModes = modes;
                this.larkManifest = manifest;
                showLoading();
            };
            return Project;
        })();
        portal.Project = Project;
    })(portal = lark.portal || (lark.portal = {}));
})(lark || (lark = {}));
lark.app.controller('ProjectController', lark.portal.Project);
function showLoading() {
    $("#mask").show();
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
//# sourceMappingURL=project.js.map