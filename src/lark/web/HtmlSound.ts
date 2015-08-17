//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module lark.web {

    /**
     * @private
     * @inheritDoc
     */
    export class HtmlSound extends lark.EventEmitter implements lark.Sound {

        /**
         * @private
         */
        private url:string;
        /**
         * @private
         */
        private originAudio:HTMLAudioElement;
        /**
         * @private
         */
        private audios: HTMLAudioElement[] = [];
        /**
         * @private
         */
        private loaded: boolean = false;
        /**
         * @private
         */
        private closed: boolean = false;

        /**
         * @private
         * @inheritDoc
         */
        constructor(url?: string) {
            super();
            this.url = url;
            if (url)
                this.load();
        }

        /**
         * @inheritDoc
         */
        public load(url?: string) {
            url = url || this.url;
            if (DEBUG && !url) {
                lark.$error(3002);
            }
            var audio = new Audio(url);
            audio.addEventListener("canplaythrough",this.onAudioLoaded);
            audio.addEventListener("error",()=>this.onAudioError());
            audio.load();
            this.originAudio = audio;
            this.audios.push(audio);
        }

        /**
         * @inheritDoc
         */
        public play(startTime: number = 0, loop: boolean = false): lark.SoundChannel {
            if(DEBUG && this.loaded == false){
                lark.$error(3001);
            }

            var audio = this.audios.pop();
            if(audio==undefined) {
                audio = <HTMLAudioElement>this.originAudio.cloneNode();
                audio.addEventListener("canplaythrough",()=>audio.currentTime = startTime);
            }
            else{
                audio.currentTime = startTime;
            }
            audio.loop = !!loop;
            var channel = new HtmlSoundChannel(audio);
            channel.$sound = this;
            channel.$loop = loop;
            channel.$startTime = startTime;
            audio.play();
            return channel;
        }
        
        /**
         * @inheritDoc
         */
        public close() {
            if (this.loaded == false && this.originAudio)
                this.originAudio.src = "";
            if (this.originAudio)
                this.originAudio = null;
            if (this.audios)
                this.audios.length = 0;
            this.closed = true;
        }

        /**
         * @private
         * 
         * @param audio 
         */
        $recycle(audio: HTMLAudioElement) {
            if(this.closed)
                return;
            this.audios.push(audio);
        }


        /**
         * @private
         * 
         */
        private onAudioLoaded = () => {
            this.loaded = true;
            this.originAudio.removeEventListener("canplaythrough", this.onAudioLoaded);
            this.emitWith(lark.Event.COMPLETE);
        }

        /**
         * @private
         * 
         */
        private onAudioError(){
            this.emitWith(lark.Event.IO_ERROR);
        }
    }

    lark.Sound = HtmlSound;
}