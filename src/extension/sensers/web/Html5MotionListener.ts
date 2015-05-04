

module lark {

    export class Html5MotionListener extends EventEmitter implements MotionListener {

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

lark.MotionListener = lark.Html5MotionListener;