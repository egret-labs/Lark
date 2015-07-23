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

module lark {

    /**
     * @private
     * @language en_US
     * The MovieClip object unlike the Sprite object, a MovieClip object has a timeline.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * MovieClip 对象不同于 Sprite 对象，MovieClip 对象拥有一个时间轴。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class MovieClip extends lark.DisplayObject {

        /**
         * @language en_US
         * Specifies the number of the frame in which the playhead is located in the timeline of the MovieClip instance. If the movie clip has multiple scenes, this value is the frame number in the current scene.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定播放头在 MovieClip 实例的时间轴中所处的帧的编号。如果影片剪辑有多个场景，该值是当前场景中的帧编号。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(movieClipData?:MovieClipData) {
            super();
            this.$renderRegion = new lark.sys.Region();
            this._movieClipData = movieClipData;
            if (movieClipData && movieClipData.$frames.length) {
                this.$isPlaying = true;
                this.executeFrameScript();
                this.$invalidateContentBounds();
            }
            this.on(lark.Event.ENTER_FRAME, this.$onFrame, this);
        }

        /**
         * @private
         */
        private _callBacks:Object = {};
        /**
         * @private
         */
        private _callBacksThis:Object = {};

        /**
         * @private
         * 当前帧的回调函数是否运行过，每帧的回调函数在一帧内
         */
        private currentRun:boolean = false;

        /**
         * @language en_US
         * Add a call-back-function at the frame.If a call-back-function has existed on the frame, it's will be replaced.The this pointer points to the MovieClip instance.
         * @param frame The frame to add call back.The number of first frame is 1.
         * @param callBack The function to call back.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在对应的帧上添加回调函数。如果之前该帧上已经有回调函数，会被替换成新的回调函数。回调函数的作用域被锁定为 MovieClip 实例本身。
         * @param frame 第几帧添加代码。起始帧编号为1。
         * @param callBack 回调函数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public addFrameScript(frame:number, callBack:Function, thisObj:any = null):void {
            if (!this.movieClipData || !this.movieClipData.$frames.length) {
                return;
            }
            frame = +frame | 0;
            frame = frame < 0 ? 0 : frame;
            if (this.movieClipData && frame >= this.movieClipData.$frames.length) {
                frame = this.movieClipData.$frames.length - 1;
            }
            this._callBacks[frame] = callBack;
            this._callBacksThis[frame] = thisObj;
        }

        /**
         * @private
         */
        private _currentFrame:number = 0;

        /**
         * @language en_US
         * Specifies the number of the frame in which the playhead is located in the timeline of the MovieClip instance. If the movie clip has multiple scenes, this value is the frame number in the current scene.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定播放头在 MovieClip 实例的时间轴中所处的帧的编号。如果影片剪辑有多个场景，该值是当前场景中的帧编号。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentFrame():number {
            return this._currentFrame;
        }

        /**
         * @private
         */
        private _movieClipData:MovieClipData;

        /**
         * @language en_US
         * bitmapData The MovieClipData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 被引用的 MovieClipData 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get movieClipData():MovieClipData {
            return this._movieClipData;
        }

        /**
         * @language en_US
         * bitmapData The BitmapArrayData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 被引用的 BitmapArrayData 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public set movieClipData(movieClipData:MovieClipData) {
            this._movieClipData = movieClipData;
            if (movieClipData && movieClipData.$frames.length) {
                this._currentFrame = 0;
                this.$isPlaying = true;
                this.currentRun = false;
                this.executeFrameScript();
                this._callBacks = {};
                this._callBacksThis = {};
            }
            else {
                this._currentFrame = 0;
                this.$isPlaying = false;
                this._callBacks = null;
                this._callBacksThis = null;
            }
            this.$invalidateContentBounds();
        }

        /**
         * @private
         * 执行当前帧脚本逻辑
         */
        private executeFrameScript():void {
            if (!this._movieClipData || !this._movieClipData.$frames.length || !this._callBacks) {
                return;
            }
            var callBack:Function = this._callBacks[this._currentFrame];
            var callBackThis:any = this._callBacksThis[this._currentFrame];
            if (callBack && !this.currentRun) {
                this.currentRun = true;
                callBack.apply(callBackThis);
            }
        }

        /**
         * @private
         */
        private $isPlaying:boolean = false;

        /**
         * @language en_US
         * A movie clip is playing or not.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  MovieClip 实例当前是否正在播放。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get isPlaying():boolean {
            return this.$isPlaying;
        }

        /**
         * @private
         */
        private $onFrame():void {
            if (!this.$isPlaying) {
                return;
            }
            this._currentFrame++;
            this._currentFrame = this._currentFrame % this._movieClipData.$frames.length;
            this.currentRun = false;
            this.executeFrameScript();
            this.$invalidateContentBounds();
        }

        /**
         * @private
         */
        $measureContentBounds(bounds:lark.Rectangle):void {
            if (this._movieClipData && this._movieClipData.$frames.length) {
                var frameInfo = this._movieClipData.$frames[this._currentFrame];
                bounds.setTo(frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         */
        $render(context:lark.sys.RenderContext):void {
            if (this._movieClipData) {
                var frameInfo = this._movieClipData.$frames[this._currentFrame];
                context.drawImage(frameInfo.bitmapData, frameInfo.sourceX, frameInfo.sourceY, frameInfo.width,
                    frameInfo.height, frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
            }
        }

        /**
         * @language en_US
         * Starts playing the MovieClip at the specified frame.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从指定帧开始播放 MovieClip 。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndPlay(frame:number):void {
            if (!this._movieClipData || !this._movieClipData.$frames.length) {
                return;
            }
            frame = +frame | 0;
            frame = frame < 0 ? 0 : frame;
            if (frame >= this._movieClipData.$frames.length) {
                frame = this._movieClipData.$frames.length - 1;
            }
            this.$isPlaying = true;
            if (this._currentFrame == frame) {
                return;
            }
            this._currentFrame = frame;
            this.currentRun = false;
            this.executeFrameScript();
        }

        /**
         * @language en_US
         * Brings the playhead to the specified frame of the movie clip and stops it there.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头移到影片剪辑的指定帧并停在那里。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndStop(frame:number):void {
            if (!this._movieClipData || !this._movieClipData.$frames.length) {
                return;
            }
            frame = +frame | 0;
            frame = frame < 0 ? 0 : frame;
            this.$isPlaying = false;
            if (frame >= this._movieClipData.$frames.length) {
                frame = this._movieClipData.$frames.length - 1;
            }
            if (this._currentFrame == frame) {
                return;
            }
            this._currentFrame = frame;
            this.currentRun = false;
            this.executeFrameScript();
        }

        /**
         * @language en_US
         * Sends the playhead to the next frame and stops it.This happens after all remaining actions in the frame have finished executing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头转到下一帧并停止。这会在帧中的所有剩余动作执行完毕后发生。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public nextFrame():void {
            this.$isPlaying = false;
            if (!this._movieClipData || !this._movieClipData.$frames.length) {
                return;
            }
            if (this._currentFrame == this._movieClipData.$frames.length - 1) {
                this.executeFrameScript();
                return;
            }
            this._currentFrame++;
            this.currentRun = false;
            this.executeFrameScript();
        }

        /**
         * @language en_US
         * Moves the playhead in the timeline of the movie clip.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在影片剪辑的时间轴中移动播放头。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public play():void {
            this.$isPlaying = true;
        }

        /**
         * @language en_US
         * Sends the playhead to the last frame and stops it.This happens after all remaining actions in the frame have finished executing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头转到前一帧并停止。这会在帧中的所有剩余动作执行完毕后发生。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public prevFrame():void {
            this.$isPlaying = false;
            if (!this._movieClipData || !this._movieClipData.$frames.length) {
                return;
            }
            if (this._currentFrame == 0) {
                this.executeFrameScript();
                return;
            }
            this._currentFrame--;
            this.currentRun = false;
            this.executeFrameScript();
        }

        /**
         * @language en_US
         * Stops the playhead in the bitmap array.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止序列帧动画中的播放头。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public stop():void {
            this.$isPlaying = false;
        }

        /**
         * @language en_US
         * The totalFrames property returns the total number of frames in the movie clip.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * totalFrames 属性会返回影片剪辑中帧的总数。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get totalFrames():number {
            return this._movieClipData ? this._movieClipData.totalFrames : 0;
        }
    }
}