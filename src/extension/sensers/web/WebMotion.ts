

module lark {

    export class WebMotion extends EventEmitter implements Motion {

        constructor() {
            super();
            window.addEventListener("devicemotion", this.onChange);
        }

        protected onChange = (e: DeviceMotionEvent) => {
            var event = new MotionEvent("change");
            event.x = e.accelerationIncludingGravity.x;
            event.y = e.accelerationIncludingGravity.y;
            event.z = e.accelerationIncludingGravity.z;
            this.emit(event);
        }
    }
}

lark.Motion = lark.WebMotion;