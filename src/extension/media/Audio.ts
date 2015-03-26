module lark {
    
    var DefaultAudioClass: typeof LarkAudio = null;
    export class LarkAudio extends LarkMedia {

        static create(src?:string,mimeType?:string): LarkAudio {
            return new DefaultAudioClass(src, mimeType);
        }

        static setDefaultClass(clazz: typeof LarkAudio) {
            DefaultAudioClass = clazz;
        }
    }
}