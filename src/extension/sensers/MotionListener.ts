

module lark {

    export var MotionListener: { new (): MotionListener };

    export interface MotionListener extends IEventEmitter {
        on(type: "change", listener: (event: MotionEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }

    export class MotionEvent extends Event {
        public x: number;
        public y: number;
        public z: number;
    }
}