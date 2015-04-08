module lark {

    export class Html5OrientationListener extends EventEmitter implements OrientationListener {

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

lark.OrientationListener = lark.Html5OrientationListener;