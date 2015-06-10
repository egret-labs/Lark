module lark {

    export class WebOrientation extends EventEmitter implements Orientation {

        constructor() {
            super();
            window.addEventListener("deviceorientation", this.onChange);
        }

        protected onChange = (e: DeviceOrientationEvent) => {
            var event = new OrientationEvent("change");
            event.x = e.beta;
            event.y = e.gamma;
            event.z = e.alpha;
            this.emit(event);
        }
    }
}

lark.Orientation = lark.WebOrientation;