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
    export class WebVideo extends lark.EventEmitter implements lark.Video {

        /**
         * @private
         */
        private url: string;
        /**
         * @private
         */
        private video: HTMLVideoElement;
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
        }

        /**
         * @private
         * @inheritDoc
         */
        load(url?: string) {
            url = url || this.url;
            if (DEBUG && !url) {
                lark.$error(3002);
            }
            var video = document.createElement("video");
            video.src = url;
            video.addEventListener("canplay", () => this.onVideoLoaded());
            video.addEventListener("error", () => this.onVideoError());
            video.addEventListener("ended", () => this.onVideoEnded());
            video.load();
            this.video = video;
        }

        /**
         * @private
         * @inheritDoc
         */
        play(startTime: number = 0, loop = false) {
            if (DEBUG && this.loaded == false) {
                lark.$error(3001);
            }

            var video = this.video;
            video.currentTime = startTime;
            video.loop = !!loop;
            video.play();
        }
        
        /**
         * @private
         * @inheritDoc
         */
        close() {
            this.stop();
            if (this.loaded == false && this.video)
                this.video.src = "";
            if (this.video)
                this.video = null;
            this.closed = true;
            this.loaded = false;
        }


        /**
         * @private
         * @inheritDoc
         */
        stop() {
            if (this.video) {
                this.video.pause();
                this.onVideoEnded();
            }
        }


        /**
         * @private
         * @inheritDoc
         */
        public get volume(): number {
            if (!this.video)
                return 1;
            return this.video.volume;
        }

        /**
         * @inheritDoc
         */
        public set volume(value: number) {
            if (!this.video)
                return;
            this.video.volume = value;
        }

        /**
         * @private
         * @inheritDoc
         */
        public get position(): number {
            if (!this.video)
                return 0;
            return this.video.currentTime;
        }

        /**
         * @private
         * @inheritDoc
         */
        public set position(value: number) {
            if (!this.video)
                return ;
            this.video.currentTime = value;
        }

        private _bitmapData: BitmapData;

        /**
         * @private
         * @inheritDoc
         */
        public get bitmapData(): BitmapData {
            if (!this.video)
                return null;
            if (!this._bitmapData) {
                this.video.width = this.video.videoWidth;
                this.video.height = this.video.videoHeight;
                this._bitmapData = lark.web['toBitmapData'](this.video);
            }
            return this._bitmapData;
        }

        /**
         * @private
         * 
         */
        private onVideoLoaded() {
            this.loaded = true;
            this.emitWith(lark.Event.COMPLETE);
        }

        /**
         * @private
         * 
         */
        private onVideoEnded() {
            this.emitWith(lark.Event.ENDED);
        }

        /**
         * @private
         * 
         */
        private onVideoError() {
            this.emitWith(lark.Event.IO_ERROR);
        }
    }

    lark.Video = WebVideo;
}