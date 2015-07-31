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
    export class HtmlSoundChannel extends lark.EventEmitter implements lark.SoundChannel {

        /**
         * @private
         */
        $sound: HtmlSound;
        /**
         * @private
         */
        $loop: boolean = false;
        /**
         * @private
         */
        $startTime: number = 0;
        /**
         * @private
         */
        private audio: HTMLAudioElement = null;

        /**
         * @private
         */
        constructor(audio: HTMLAudioElement) {
            super();
            audio.addEventListener("ended", this.onPlayEnd);
            this.audio = audio;
        }

        /**
         * @private
         */
        onPlayEnd = () => {
            if (this.$loop == false) {
                this.stop();
                return;
            }
            this.audio.load();
            this.audio.currentTime = this.$startTime;
            this.audio.play();
        };

        /**
         * @private
         * @inheritDoc
         */
        public stop() {
            if (!this.audio)
                return;
            var audio = this.audio;
            audio.pause();
            audio.removeEventListener("ended", this.onPlayEnd);
            audio['$channel'] = null;
            this.audio = null;
            this.emitWith(lark.Event.ENDED);
            this.$sound.$recycle(audio);
            this.$sound = null;
        }

        /**
         * @private
         * @inheritDoc
         */
        public get volume(): number {
            if (!this.audio)
                return 1;
            return this.audio.volume;
        }

        /**
         * @inheritDoc
         */
        public set volume(value: number) {
            if (!this.audio)
                return;
            this.audio.volume = value;
        }

        /**
         * @private
         * @inheritDoc
         */
        public get position(): number {
            if (!this.audio)
                return 0;
            return this.audio.currentTime;
        }
        /**
         * @private
         * @inheritDoc
         */
        public set position(value: number) {
            if (!this.audio || this.audio.currentTime==value)
                return;
            this.audio.currentTime = value;
        }
    }
}