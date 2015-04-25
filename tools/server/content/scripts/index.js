/// <reference path="../../../lib/types.d.ts" />
/// <reference path="utils.ts" />
var lark;
(function (lark) {
    var portal;
    (function (portal) {
        var Index = (function () {
            function Index() {
            }
            Index.prototype.init = function () {
                this.console = document.getElementById('console');
                this.btnShutdown = document.getElementById('btnShutdown');
                this.btnShutdown.addEventListener('click', function (e) { return portal.get('/$/shutdown'); });
                this.connectWS();
            };
            Index.prototype.connectWS = function () {
                var _this = this;
                var ws = new WebSocket(lark.server.options.websocketUrl);
                ws.addEventListener('open', function (e) { return _this.onwsConnect; });
                ws.addEventListener('message', function (e) { return _this.onMessage(e); });
                ws.addEventListener('close', function (e) { return _this.onLog('connection is closed'); });
                ws.addEventListener('error', function (e) { return _this.onLog('error when trying to connect the server' + e.error); });
                setInterval(function () { return ws.readyState == ws.OPEN && ws.send(JSON.stringify({ ping: true })); }, 60 * 1000);
            };
            Index.prototype.onwsConnect = function () {
                console.log("Connected!");
                this.onLog("Connected!");
            };
            Index.prototype.onMessage = function (e) {
                var data = null;
                try {
                    data = JSON.parse(e.data);
                }
                catch (e) {
                }
                if (data.type == 'log') {
                    this.onLog(data.data.map(function (p) {
                        var type = typeof p;
                        if (type == 'object')
                            return JSON.stringify(p, null, "  ");
                        return p;
                    }).join(' '));
                }
            };
            Index.prototype.onLog = function (message) {
                var text = this.console.textContent;
                text += '\n' + message;
                this.console.textContent = text;
                this.console.scrollTop += 10000;
            };
            return Index;
        })();
        portal.Index = Index;
    })(portal = lark.portal || (lark.portal = {}));
})(lark || (lark = {}));
window.addEventListener('load', function () {
    var manage = new lark.portal.Index();
    manage.init();
});
//# sourceMappingURL=index.js.map