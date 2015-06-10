



module lark {
    export interface ImagePicker extends EventEmitter {
        pick(): void;
    }

    export var ImagePicker: {
        new (): ImagePicker;
    }
}