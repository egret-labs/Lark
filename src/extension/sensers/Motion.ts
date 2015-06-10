

module lark {

    export var Motion: { new (): Motion };

    export interface Motion extends IEventEmitter {

    }

    export class MotionEvent extends Event {
        public x: number;
        public y: number;
        public z: number;
    }
}