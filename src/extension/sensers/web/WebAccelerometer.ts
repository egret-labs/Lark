module lark {

    export class WebAccelerometer extends AccelerometerBase {

        constructor() {
            super();
            window.addEventListener("deviceorientation", this.onChange);
        }

        protected onChange = (e: DeviceOrientationEvent) => {
            var event = new AccelerometerEvent("change");
            event.x = e.beta;
            event.y = e.gamma;
            event.z = e.alpha;
            this.emit(event);
        }
    }
}