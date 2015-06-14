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
        var WebGeolocation = (function (_super) {
            __extends(WebGeolocation, _super);
            /**
             * @private
             */
            function WebGeolocation(option) {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.onUpdate = function (position) {
                    var event = new lark.GeolocationEvent(lark.Event.CHANGE);
                    var coords = position.coords;
                    event.altitude = coords.altitude;
                    event.heading = coords.heading;
                    event.accuracy = coords.accuracy;
                    event.latitude = coords.latitude;
                    event.longitude = coords.longitude;
                    event.speed = coords.speed;
                    event.altitudeAccuracy = coords.altitudeAccuracy;
                    _this.emit(event);
                };
                /**
                 * @private
                 */
                this.onError = function (error) {
                    var errorType = lark.GeolocationEvent.UNAVAILABLE;
                    if (error.code == error.PERMISSION_DENIED)
                        errorType = lark.GeolocationEvent.PERMISSION_DENIED;
                    var event = new lark.GeolocationEvent(lark.Event.IO_ERROR);
                    event.errorType = errorType;
                    event.errorMessage = error.message;
                    _this.emit(event);
                };
                this.geolocation = navigator.geolocation;
            }
            var d = __define,c=WebGeolocation;p=c.prototype;
            /**
             * @private
             *
             */
            p.start = function () {
                var geo = this.geolocation;
                if (geo)
                    this.watchId = geo.watchPosition(this.onUpdate, this.onError);
                else
                    this.onError({
                        code: 2,
                        message: lark.sys.tr(3101),
                        PERMISSION_DENIED: 1,
                        POSITION_UNAVAILABLE: 2
                    });
            };
            /**
             * @private
             *
             */
            p.stop = function () {
                var geo = this.geolocation;
                geo.clearWatch(this.watchId);
            };
            return WebGeolocation;
        })(lark.EventEmitter);
        web.WebGeolocation = WebGeolocation;
        lark.Geolocation = lark.web.WebGeolocation;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
