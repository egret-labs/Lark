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
                var _this = this;
                this.console = document.getElementById('console');
                this.btnShutdown = document.getElementById('btnShutdown');
                this.btnToggleConsole = document.getElementById('btnToggleConsole');
                this.btnShutdown.addEventListener('click', function (e) { return portal.get('/$/shutdown'); });
                this.btnToggleConsole.addEventListener('click', function (e) { return _this.toggleConsole(); });
                this.connectWS();
            };
            Index.prototype.connectWS = function () {
                var _this = this;
                var url = 'ws://' + location.host;
                var ws = new WebSocket(url);
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
                var msg = document.createElement('div');
                msg.textContent = message;
                this.console.appendChild(msg);
                this.console.scrollTop += 10000;
            };
            Index.prototype.toggleConsole = function () {
                var className = 'active';
                if (this.console.className == 'active')
                    className = '';
                this.console.className = className;
            };
            return Index;
        })();
        portal.Index = Index;
        var Preview = (function () {
            function Preview() {
                this.height = lark.server.options.project.contentHeight;
                this.width = lark.server.options.project.contentWidth;
                this._useDeviceResolution = false;
                this.models = [{ title: "Apple iPhone 3GS", width: 320, height: 480, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5", touch: true, mobile: true }, { title: "Apple iPhone 4", width: 320, height: 480, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5", touch: true, mobile: true }, { title: "Apple iPhone 5", width: 320, height: 568, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53", touch: true, mobile: true }, { title: "Apple iPhone 6", width: 375, height: 667, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4", touch: true, mobile: true }, { title: "Apple iPhone 6 Plus", width: 414, height: 736, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4", touch: true, mobile: true }, { title: "BlackBerry Z10", width: 384, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+", touch: true, mobile: true }, { title: "BlackBerry Z30", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+", touch: true, mobile: true }, { title: "Google Nexus 4", width: 384, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.4.4; en-us; Nexus 4 Build/JOP40D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36", touch: true, mobile: true }, { title: "Google Nexus 5", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; Android 4.4.4; en-us; Nexus 5 Build/JOP40D) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36", touch: true, mobile: true }, { title: "Google Nexus S", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Nexus S Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "HTC Evo, Touch HD, Desire HD, Desire", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Sprint APA9292KT Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "HTC One X, EVO LTE", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.0.3; HTC One X Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19", touch: true, mobile: true }, { title: "HTC Sensation, Evo 3D", width: 360, height: 640, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; HTC Sensation Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }, { title: "LG Optimus 2X, Optimus 3D, Optimus Black", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; LG-P990/V08c Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MMS/LG-Android-MMS-V1.0/1.2", touch: true, mobile: true }, { title: "LG Optimus G", width: 384, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; Android 4.0; LG-E975 Build/IMM76L) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19", touch: true, mobile: true }, { title: "LG Optimus LTE, Optimus 4X HD", width: 424, height: 753, deviceScaleFactor: 1.7, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; LG-P930 Build/GRJ90) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "LG Optimus One", width: 213, height: 320, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; LG-MS690 Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "Motorola Defy, Droid, Droid X, Milestone", width: 320, height: 569, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.0; en-us; Milestone Build/ SHOLS_U2_01.03.1) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17", touch: true, mobile: true }, { title: "Motorola Droid 3, Droid 4, Droid Razr, Atrix 4G, Atrix 2", width: 540, height: 960, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.2; en-us; Droid Build/FRG22D) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "Motorola Droid Razr HD", width: 720, height: 1280, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; DROID RAZR 4G Build/6.5.1-73_DHD-11_M1-29) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "Nokia C5, C6, C7, N97, N8, X7", width: 360, height: 640, deviceScaleFactor: 1, userAgent: "NokiaN97/21.1.107 (SymbianOS/9.4; Series60/5.0 Mozilla/5.0; Profile/MIDP-2.1 Configuration/CLDC-1.1) AppleWebkit/525 (KHTML, like Gecko) BrowserNG/7.1.4", touch: true, mobile: true }, { title: "Nokia Lumia 7X0, Lumia 8XX, Lumia 900, N800, N810, N900", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 820)", touch: true, mobile: true }, { title: "Samsung Galaxy Note 3", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; U; Android 4.3; en-us; SM-N900T Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }, { title: "Samsung Galaxy Note II", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.1; en-us; GT-N7100 Build/JRO03C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }, { title: "Samsung Galaxy Note", width: 400, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; SAMSUNG-SGH-I717 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "Samsung Galaxy S III, Galaxy Nexus", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }, { title: "Samsung Galaxy S, S II, W", width: 320, height: 533, deviceScaleFactor: 1.5, userAgent: "Mozilla/5.0 (Linux; U; Android 2.1; en-us; GT-I9000 Build/ECLAIR) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2", touch: true, mobile: true }, { title: "Samsung Galaxy S4", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; Android 4.4.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Version/1.5 Chrome/28.0.1500.94 Mobile Safari/537.36", touch: true, mobile: true }, { title: "Sony Xperia S, Ion", width: 360, height: 640, deviceScaleFactor: 2, userAgent: "Mozilla/5.0 (Linux; U; Android 4.0; en-us; LT28at Build/6.1.C.1.111) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }, { title: "Sony Xperia Sola, U", width: 480, height: 854, deviceScaleFactor: 1, userAgent: "Mozilla/5.0 (Linux; U; Android 2.3; en-us; SonyEricssonST25i Build/6.0.B.1.564) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1", touch: true, mobile: true }, { title: "Sony Xperia Z, Z1", width: 360, height: 640, deviceScaleFactor: 3, userAgent: "Mozilla/5.0 (Linux; U; Android 4.2; en-us; SonyC6903 Build/14.1.G.1.518) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", touch: true, mobile: true }];
                this._selected = -1;
                this.IPs = lark.server.IPs;
            }
            Object.defineProperty(Preview.prototype, "useDeviceResolution", {
                get: function () {
                    return this._useDeviceResolution;
                },
                set: function (value) {
                    this._useDeviceResolution = value;
                    this.selectedModel = this._selected;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Preview.prototype, "selectedModel", {
                get: function () {
                    return this._selected;
                },
                set: function (index) {
                    this._selected = index;
                    index = +index || 0;
                    var phone = this.models[index];
                    var ratio = this.useDeviceResolution ? phone.deviceScaleFactor : 1;
                    this.height = phone.height * ratio;
                    this.width = phone.width * ratio;
                },
                enumerable: true,
                configurable: true
            });
            Preview.prototype.applyModel = function () {
                this.selectedModel = this._selected;
            };
            Object.defineProperty(Preview.prototype, "selectIPAddress", {
                get: function () {
                    return location.hostname;
                },
                set: function (ip) {
                    location.hostname = ip;
                },
                enumerable: true,
                configurable: true
            });
            return Preview;
        })();
        portal.Preview = Preview;
    })(portal = lark.portal || (lark.portal = {}));
})(lark || (lark = {}));
lark.app.controller('PreviewController', lark.portal.Preview);
window.addEventListener('load', function () {
    var manage = new lark.portal.Index();
    manage.init();
});
//# sourceMappingURL=index.js.map