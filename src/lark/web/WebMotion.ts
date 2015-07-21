

module lark.web {

    /**
     * @private
     */
    export class WebMotion extends EventEmitter implements Motion {

        /**
         * @private
         *
         */
        start() {
            window.addEventListener("devicemotion", this.onChange);
        }

        /**
         * @private
         *
         */
        stop() {
            window.removeEventListener("devicemotion", this.onChange);
        }

        /**
         * @private
         */
        protected onChange = (e:DeviceMotionEvent) => {
            var event = new MotionEvent(Event.CHANGE);
            var acceleration:lark.DeviceAcceleration = {
                x: e.acceleration.x,
                y: e.acceleration.y,
                z: e.acceleration.z
            };
            var accelerationIncludingGravity:lark.DeviceAcceleration = {
                x: e.accelerationIncludingGravity.x,
                y: e.accelerationIncludingGravity.y,
                z: e.accelerationIncludingGravity.z
            };
            var rotation:lark.DeviceRotationRate = {
                alpha: e.rotationRate.alpha,
                beta: e.rotationRate.beta,
                gamma: e.rotationRate.gamma
            };
            event.acceleration = acceleration;
            event.accelerationIncludingGravity = accelerationIncludingGravity;
            event.rotationRate = rotation;
            this.emit(event);
        }
    }
    if (!NATIVE) {
        lark.Motion = lark.web.WebMotion;
    }
}
