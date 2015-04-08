

module lark {

    var AudioContextClass: typeof AudioContext = window["AudioContext"] || window["webkitAudioContext"];
    var $AudioContext = AudioContextClass ? new AudioContextClass() : null;

    export class WebAudio extends LarkMedia {
        public audioBuffer: AudioBuffer = null;
        public bufferSource: AudioBufferSourceNode = null;
        public gain: GainNode = null;
        public load() {
            if (this.loadStart)
                return;
            var bufferLoader = new BufferLoader(
                $AudioContext,
                this.sources.map(s=>s.src),
                this.finishedLoading,
                this.loadingError
                );

            bufferLoader.load();
            this.loadStart = true;
            this.onEvent("loadstart");
        }
        protected finishedLoading = (bufferList:AudioBuffer[])=> {
            this.onLoaded();
            this.audioBuffer = bufferList[0];
            this.onCanPlay();
        }

        protected loadingError = (error) => {
            this.onError(error);
        }

        public play(loop: boolean = false) {
            if (this.canPlay && !this.isPlaying) {
                var source = $AudioContext.createBufferSource();
                source.buffer = this.audioBuffer;
                source.onended = e=> this.onEnded();
                var gain = $AudioContext.createGain();
                gain.gain.value = this._volume;
                source.connect(gain);
                gain.connect($AudioContext.destination);
                source.start(0);
                this.bufferSource = source;
                this.gain = gain;
                this.onPlay();
                this.onPlaying();
            }
            else
                this.playAfterLoad(loop);
            
        }

        public pause() {
            this.bufferSource && this.bufferSource.stop(0);
            this.onPause();
        }

        protected getVolume(): number {
            if (this.gain)
                return this.gain.gain.value;
            return super.getVolume();
        }

        protected setVolume(value: number) {
            super.setVolume(value);
            this.gain.gain.value = value;
            this.onVolumeChange();
        }

        protected onEnded(e?: SystemEvent) {
            super.onEnded(e);
            this.bufferSource.stop(0);
        }
    }

    export class BufferLoader extends HashObject{
        constructor(context: AudioContext,files:string[],callback:(buffers:AudioBuffer[])=>void,onerror?:Function) {
            super();
            this.context = context;
            this.urlList = files;
            this.onload = callback;
            this.onError = onerror;
        }

        public context: AudioContext;
        public urlList: string[];
        public onload: Function;
        public onError: Function;
        public bufferList: AudioBuffer[] = [];
        public loadCount = 0;

        public loadBuffer(url, index) {
            lark.get(url, null, response=> this.loadedData(response,index,url) , ()=>alert('BufferLoader: XHR error'), "arraybuffer");
        }

        load () {
            for (var i = 0; i < this.urlList.length; ++i)
                this.loadBuffer(this.urlList[i], i);
        }

        loadedData (response,index,url)  {
            // Asynchronously decode the audio file data in request.response
            this.context.decodeAudioData(
                response,
                (buffer)=> {
                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    this.bufferList[index] = buffer;
                    if (++this.loadCount == this.urlList.length)
                        this.onload(this.bufferList);
                },
                (error)=> {
                    this.onError && this.onError(error);
                }
            );
        }
    }
}
if (lark.Capabilities.webAudio && !lark.Audio)
    lark.Audio = lark.WebAudio;