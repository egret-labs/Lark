

module lark.web {

    var AudioContextClass: typeof AudioContext = window["AudioContext"] || window["webkitAudioContext"];
    var $AudioContext = AudioContextClass ? new AudioContextClass() : null;

    export class WebAudio extends EventEmitter implements lark.Audio {

        public $option: IMediaOption;
        public sources: IMediaSource;
        public isPlaying: boolean = false;
        public canPlay: boolean = false;
        public loadStart = false;

        protected _loop = false;
        protected startTime: number;
        protected timer: Timer;
        public audioBuffer: AudioBuffer = null;
        public bufferSource: AudioBufferSourceNode = null;
        public gain: GainNode = null;
        public load() {
            if (this.loadStart)
                return;
            var source = this.getMediaSource();
            this.loadAudioData(source);
            this.loadStart = true;
            this.timer = new Timer(250);
            this.timer.on(TimerEvent.TIMER, this.onProgress, this);
            this.emitWith(MediaEvent.LOAD_START);
        }

        public play(loop: boolean = this._loop) {
            if (this.canPlay && !this.isPlaying)
            {
                var source = $AudioContext.createBufferSource();
                source.buffer = this.audioBuffer;
                source.onended = e=> this.onEnded();
                var gain = $AudioContext.createGain();
                gain.gain.value = this._volume;
                source.connect(gain);
                gain.connect($AudioContext.destination);
                source.start(0, this._position || 0);

                this.startTime = $AudioContext.currentTime - (this._position || 0);
                this.bufferSource = source;
                this.gain = gain;
                this.isPlaying = true;
                this.emitWith(MediaEvent.PLAY);
                this.emitWith(MediaEvent.PLAYING);
                this.timer.start();
            }
            else
            {
                this.on(MediaEvent.CAN_PLAY, e=> this.play(loop), this);
                this.load();
            }
            
        }

        public pause() {
            this.bufferSource && this.bufferSource.stop(0);
            this.timer.stop();
            this.onProgress(null);
            this.isPlaying = false;
            this.emitWith(MediaEvent.PAUSE);
        }

        public stop() {
            this.bufferSource && this.bufferSource.stop(0);
            this.timer.stop();
            this._position = 0;
            this.onTimeupdate();
            this.isPlaying = false;
            this.emitWith(MediaEvent.ENDED);
        }

        protected _volume: number = 1;
        public get volume(): number {
            if (this.gain)
                return this.gain.gain.value;
            return this._volume;
        }

        public set volume(value: number) {
            this._volume = value;
            this.gain.gain.value = value;
            this.emitWith(MediaEvent.VOLUME_CHANGE);
        }


        protected _position: number = 0;
        public get position(): number {
            return this._position;
        }
        public set position(value: number) {
            this._position = value;
            this.play();
        }

        protected onEnded(e?: SystemEvent) {
            this.bufferSource.stop(0);
            this.emitWith(MediaEvent.ENDED);
        }

        protected onProgress(e:Event) {
            this._position = $AudioContext.currentTime - this.startTime;
            this.onTimeupdate();
        }

        protected onTimeupdate(e?: SystemEvent): void {
            this.isPlaying = true;
            this.emitWith(MediaEvent.TIME_UPDATE);
        }

        protected getMediaSource() {
            var audioSupport = Capabilities.audio;
            var sources = this.sources;
            for (var type in sources) {
                if (!sources.default)
                    sources.default = sources[type];
                var canPlay = audioSupport[type];
                if (canPlay)
                    return sources[type];
            }
            return sources.default;
        }

        protected loadAudioData(url) {
            lark.get(url, null, response=> { },() => alert('BufferLoader: XHR error'), "arraybuffer");
        }

        protected onLoadedAudioData(response:ArrayBuffer,url:string) {
            $AudioContext.decodeAudioData(response,this.finishedLoading,this.loadingError);
        }

        protected finishedLoading = (bufferList: AudioBuffer) => {
            if (!bufferList)
            {
                this.loadingError('Can not decode audio:' + this.getMediaSource());
                return;
            }
            this.audioBuffer = bufferList;
            this.canPlay = true;
            this.emitWith(MediaEvent.CAN_PLAY);
        }

        protected loadingError = (error) => {
            this.emitWith(MediaEvent.ERROR, false, error);
        }
    }
}
if (lark.Capabilities.webAudio && !lark.Audio)
    lark.Audio = lark.web.WebAudio;