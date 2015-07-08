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
        lark.registerClass(WebGeolocation,"lark.web.WebGeolocation",["lark.Geolocation","lark.IEventEmitter"]);
        lark.Geolocation = lark.web.WebGeolocation;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
var lark;
(function (lark) {
    var web;
    (function (web) {
        /**
         * @private
         */
        var WebMotion = (function (_super) {
            __extends(WebMotion, _super);
            function WebMotion() {
                var _this = this;
                _super.apply(this, arguments);
                /**
                 * @private
                 */
                this.onChange = function (e) {
                    var event = new lark.MotionEvent(lark.Event.CHANGE);
                    var acceleration = {
                        x: e.acceleration.x,
                        y: e.acceleration.y,
                        z: e.acceleration.z
                    };
                    var accelerationIncludingGravity = {
                        x: e.accelerationIncludingGravity.x,
                        y: e.accelerationIncludingGravity.y,
                        z: e.accelerationIncludingGravity.z
                    };
                    var rotation = {
                        alpha: e.rotationRate.alpha,
                        beta: e.rotationRate.beta,
                        gamma: e.rotationRate.gamma
                    };
                    event.acceleration = acceleration;
                    event.accelerationIncludingGravity = accelerationIncludingGravity;
                    event.rotationRate = rotation;
                    _this.emit(event);
                };
            }
            var d = __define,c=WebMotion;p=c.prototype;
            /**
             * @private
             *
             */
            p.start = function () {
                window.addEventListener("devicemotion", this.onChange);
            };
            /**
             * @private
             *
             */
            p.stop = function () {
                window.removeEventListener("devicemotion", this.onChange);
            };
            return WebMotion;
        })(lark.EventEmitter);
        web.WebMotion = WebMotion;
        lark.registerClass(WebMotion,"lark.web.WebMotion",["lark.Motion","lark.IEventEmitter"]);
        lark.Motion = lark.web.WebMotion;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
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
        lark.registerClass(WebOrientation,"lark.web.WebOrientation",["lark.Orientation","lark.IEventEmitter"]);
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
lark.Orientation = lark.web.WebOrientation;
