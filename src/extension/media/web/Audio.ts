var $HtmlAudio = Audio;
module lark.web {
    export class Audio extends WebMedia implements Audio {

        protected createDomElement(): HTMLMediaElement {
            var audio = new $HtmlAudio();
            return audio;
        }
    }
}
if ( !lark.Audio)
    lark.Audio = lark.web.Audio;