



module lark {
    export interface ImagePicker extends EventEmitter {
        pick(): void;
        multiple:boolean;
        bitmapDatas:lark.BitmapData[];
    }

    export var ImagePicker: {
        new (): ImagePicker;
    }
}