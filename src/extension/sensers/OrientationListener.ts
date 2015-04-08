

module lark {

    export class OrientationEvent extends Event {
        public x: number;
        public y: number;
        public z: number;
    }

    export var OrientationListener: { new (): OrientationListener } = null;

    export interface OrientationListener extends IEventEmitter {
        on(type: "change", listener: (event: OrientationEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }
}