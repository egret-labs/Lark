module lark {
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

    export interface Audio extends IMedia {    }
    export var Audio: { new (option?: IAudioOption): IMedia };
}