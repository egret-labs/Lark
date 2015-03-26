module lark {

    export interface IMediaSource {
        src: string;
        mimeType?: string;
    }

    export class LarkMedia extends EventDispatcher {
        public constructor(src?:string,mimeType?:string) {
            super();
            this.sources = src ? [{ src: src, mimeType: mimeType }] : [];
        }
        
        public sources: IMediaSource[];

        public get volume(): number {
            return this.getVolume();
        }

        public set volume(value: number) {
            this.setVolume(value);
        }

        protected getVolume(): number {
            return 0;
        }

        protected setVolume(value: number) {

        }

        public load() {

        }

        public play(loop: boolean = false) {

        }

        public pause() {

        }
    }
}