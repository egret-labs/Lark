module lark {

    export interface Audio extends Media { }
    
    /**
    * 创建一个 Audio 对象
    */
    export var Audio: { new (option?: IAudioOption): Media };

    export interface IAudioSource extends IMediaSource {
        ogg?: string;
        mp3?: string;
        wav?: string;
        m4a?: string;
        opus?: string;
    }

    export interface IAudioOption extends IMediaOption {
        sources?: IAudioSource;
    }
}