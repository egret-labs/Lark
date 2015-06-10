

module lark {

    export var Orientation: { new (): Orientation } = null;

    export interface Orientation extends IEventEmitter {
        on(type: "change", listener: (event: OrientationEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }

    export class OrientationEvent extends Event {
        public x: number;
        public y: number;
        public z: number;
    }
}