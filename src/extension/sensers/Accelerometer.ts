

module lark {

    export class AccelerometerEvent extends Event {
        public x: number;
        public y: number;
        public z: number;
    }

    export var Accelerometer: { new (): AccelerometerBase } = null;

    export class AccelerometerBase extends EventEmitter {

        constructor() {
            super();
        }

        public on(type: "change", listener: (event: AccelerometerEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        public on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void {
            super.on(type, listener, thisObject, useCapture, priority);
        }

        protected onChange = (e:DeviceOrientationEvent) => {
            var event = new AccelerometerEvent("change");
            event.x = e.beta;
            event.y = e.gamma;
            event.z = e.alpha;
            this.emit(event);
        }
    }
}