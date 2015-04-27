module lark {

    export interface Video extends Media {
        /**
        * 用来渲染的 bitmapData,可以赋值给 Bitmap 等对象完成渲染
        */
        bitmapData: BitmapData;
        on(type: "resize", listener: (event: MediaEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
    }

    /**
    * 创建一个Video对象，Video 本身不是一个显示对象。可以使用 Video 的 bitmapData 属性来做渲染
    */
    export var Video: { new (option: IVideoOption): Video };


    export interface IVideoSource extends IMediaSource {
        ogg?: string;
        h264?: string;
        webm?: string;
        vp9?: string;
        hls?: string;
    }

    export interface IVideoOption extends IMediaOption {
        sources?: IVideoSource;
        height: number;
        width: number;
    }
    
}