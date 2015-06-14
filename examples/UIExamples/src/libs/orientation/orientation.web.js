var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var lark;
(function (lark) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var WebOrientation = (function (_super) {
            __extends(WebOrientation, _super);
            function WebOrientation() {
                var _this = this;
                _super.apply(this, arguments);
                /**
                 * @private
                 */
                this.onChange = function (e) {
                    var event = new lark.OrientationEvent(lark.Event.CHANGE);
                    event.beta = e.beta;
                    event.gamma = e.gamma;
                    event.alpha = e.alpha;
                    _this.emit(event);
                };
            }
            var d = __define,c=WebOrientation;p=c.prototype;
            /**
             * @private
             *
             */
            p.start = function () {
                window.addEventListener("deviceorientation", this.onChange);
            };
            /**
             * @private
             *
             */
            p.stop = function () {
                window.removeEventListener("deviceorientation", this.onChange);
            };
            return WebOrientation;
        })(lark.EventEmitter);
        web.WebOrientation = WebOrientation;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
lark.Orientation = lark.web.WebOrientation;
