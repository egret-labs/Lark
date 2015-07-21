module lark.web {

    /**
     * @private
     */
    export class WebOrientation extends EventEmitter implements Orientation {

        /**
         * @private
         * 
         */
        start() {
            window.addEventListener("deviceorientation", this.onChange);
        }

        /**
         * @private
         * 
         */
        stop() {
            window.removeEventListener("deviceorientation", this.onChange);
        }

        /**
         * @private
         */
        protected onChange = (e: DeviceOrientationEvent) => {
            var event = new OrientationEvent(Event.CHANGE);
            event.beta = e.beta;
            event.gamma = e.gamma;
            event.alpha = e.alpha;
            this.emit(event);
        }
    }
}
if (!NATIVE) {
    lark.Orientation = lark.web.WebOrientation;
}