

module lark {

    var AudioContextClass: typeof AudioContext = AudioContext || webkitAudioContext;
    var $AudioContext = new AudioContextClass();

    export class WebAudio extends LarkAudioBase {
        public bufferSource: AudioBufferSourceNode = null;
        public gain: GainNode = null;
        public load() {
            var bufferLoader = new BufferLoader(
                $AudioContext,
                this.sources.map(s=>s.src),
                this.finishedLoading
                );

            bufferLoader.load();
        }
        public finishedLoading = (bufferList:AudioBuffer[])=> {
            console.log("loaded");
            var source = $AudioContext.createBufferSource();
            source.buffer = bufferList[0];
            var gain = $AudioContext.createGain();
            gain.gain.value = this._volume;
            source.connect(gain);
            gain.connect($AudioContext.destination);
            this.bufferSource = source;
            this.gain = gain;
        }

        public play(loop: boolean = false) {
            this.bufferSource.loop = loop;
            this.bufferSource.start(0);
        }

        public pause() {
            this.bufferSource.stop(0);
        }

        protected getVolume(): number {
            if (this.gain)
                return this.gain.gain.value;
            return super.getVolume();
        }

        protected setVolume(value: number) {
            super.setVolume(value);
            this.gain.gain.value = value;
        }
    }

    export class BufferLoader extends HashObject{
        constructor(context: AudioContext,files:string[],callback:(buffers:AudioBuffer[])=>void) {
            super();
            this.context = context;
            this.urlList = files;
            this.onload = callback;
        }

        public context: AudioContext;
        public urlList: string[];
        public onload: Function;
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
                function (error) {
                    console.error('decodeAudioData error', error);
                }
            );
        }
    }
}