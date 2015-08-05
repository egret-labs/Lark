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

    export module sys {
        /**
         * @private
         * Animation的每一帧
         */
        export class AnimationFrame {

            public constructor(bitmapData:lark.BitmapData, x?:number, y?:number, clip?:Rectangle) {
                this.bitmapData = bitmapData;
                this.x = +x;
                this.y = +y;
                this.clip = clip;
            }

            public bitmapData:lark.BitmapData;

            public clip:lark.Rectangle;

            public x:number;

            public y:number;
        }
    }


    /**
     * @private
     * @language en_US
     * Frame by frame animation.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * 逐帧动画。与 Sprite 不同是 Animation 有
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class Animation extends lark.DisplayObject {

        /**
         * @language en_US
         * Constructor.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.$renderRegion = new lark.sys.Region();
            this.on(lark.Event.ENTER_FRAME, this.$onFrame, this);
        }

        $init(frames:Array<sys.AnimationFrame>):void {
            this.frames = frames;
            if (frames.length) {
                this._currentFrame = 0;
                this.$isPlaying = true;
                this._callBacks = {};
                this._callBacksThis = {};
                this._callBacksArgs = {};
                this.currentRun = false;
                this.executeFrameScript();
                this.$invalidateContentBounds();
            }
            else {
                this._currentFrame = 0;
                this.$isPlaying = false;
                this._callBacks = null;
                this._callBacksThis = null;
                this._callBacksArgs = null;
                this.currentRun = false;
            }
        }

        /**
         * @language en_US
         * Add a frame.
         * @param offX offset x, x position of the frame image is displayed.
         * @param offY offset y, y position of the frame image is displayed.
         * @param clipRect clipping region, need to cut the area shown in the figure at the source.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 添加一个帧。
         * @param bitmapData 帧图片。
         * @param offX 偏移量 x，该帧图片显示时的位置 x。
         * @param offY 偏移量 y，该帧图片显示时的位置 y。
         * @param clipRect 裁剪区域，需要在源图中显示的裁剪区域。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public addFrame(bitmapData:BitmapData, offX:number, offY:number, clipRect:Rectangle):void {
            this.frames.push(new sys.AnimationFrame(bitmapData, offX, offY, clipRect));
        }

        /**
         * @private
         */
        private _callBacks:Object;
        /**
         * @private
         */
        private _callBacksThis:Object;
        /**
         * @private
         */
        private _callBacksArgs:Object;

        /**
         * @private
         * 当前帧的回调函数是否运行过，每帧的回调函数在一帧内
         */
        private currentRun:boolean = false;

        /**
         * @language en_US
         * Add a call-back-function at the frame.If a call-back-function has existed on the frame, it's will be replaced. To delete of the frame callback, callBack property is set to null.
         * @param frame The frame to add call back.The number of first frame is 1.
         * @param callBack The function to call back.
         * @param args The arguments of the function to call back.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在对应的帧上添加回调函数。如果之前该帧上已经有回调函数，会被替换成新的回调函数。若要清除掉该帧回调函数， callBack 属性设置为 null 即可。
         * @param frame 第几帧添加代码。起始帧编号为1。
         * @param callBack 回调函数。
         * @param args 回调函数参数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public addFrameScript(frame:number, callBack:Function, thisObj?:any, ...args):void {
            var length = this.frames.length;
            if (!length) {
                return;
            }
            frame = +frame | 0;
            frame = frame < 0 ? 0 : frame;
            if (frame >= length) {
                frame = length - 1;
            }
            this._callBacks[frame] = callBack;
            this._callBacksThis[frame] = thisObj;
            this._callBacksArgs[frame] = args;
        }

        /**
         * @private
         */
        private _currentFrame:number = 0;

        /**
         * @language en_US
         * Current playhead frame sequence.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前播放头所在帧序列。
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
        private frames:Array<sys.AnimationFrame> = [];

        /**
         * @private
         * 执行当前帧脚本逻辑
         */
        private executeFrameScript():void {
            if (!this.frames.length || !this._callBacks) {
                return;
            }
            var callBack:Function = this._callBacks[this._currentFrame];
            var callBackThis:any = this._callBacksThis[this._currentFrame];
            var callBackArgs:any = this._callBacksArgs[this._currentFrame];
            if (callBack && !this.currentRun) {
                this.currentRun = true;
                callBack.apply(callBackThis, callBackArgs);
            }
        }

        /**
         * @private
         */
        private $isPlaying:boolean = false;

        /**
         * @language en_US
         * The animation is playing or not.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Animation 实例当前是否正在播放。
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
            this._currentFrame = this._currentFrame % this.frames.length;
            this.currentRun = false;
            this.executeFrameScript();
            this.$invalidateContentBounds();
        }

        /**
         * @private
         */
        $measureContentBounds(bounds:lark.Rectangle):void {
            if (this.frames.length) {
                var frameData = this.frames[this._currentFrame];
                if (frameData.clip) {
                    bounds.setTo(frameData.x, frameData.y, frameData.clip.width, frameData.clip.height);
                }
                else {
                    bounds.setTo(frameData.x, frameData.y, frameData.bitmapData.width, frameData.bitmapData.height);
                }
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         */
        $render(context:lark.sys.RenderContext):void {
            if (this.frames.length) {
                var frameData = this.frames[this._currentFrame];
                var bitmapData = frameData.bitmapData;
                var clip = frameData.clip;
                if (clip) {
                    context.drawImage(bitmapData, clip.x, clip.y, clip.width, clip.height, frameData.x, frameData.y, clip.width, clip.height);
                }
                else {
                    context.drawImage(bitmapData, 0, 0, bitmapData.width, bitmapData.height, frameData.x, frameData.y, bitmapData.width, bitmapData.height);
                }
            }
        }

        /**
         * @language en_US
         * Starts playing the animation at the specified frame. This happens after all remaining actions in the frame have finished executing.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从指定帧开始播放 Animation 。这会在帧中的所有剩余动作执行完毕后发生。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndPlay(frame:number):void {
            var length = this.frames.length;
            if (!length) {
                return;
            }
            frame = +frame | 0;
            frame = frame < 0 ? 0 : frame;
            if (frame >= length) {
                frame = length - 1;
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
         * Brings the playhead to the specified frame of the animation and stops it there. This happens after all remaining actions in the frame have finished executing.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头移到 Animation 的指定帧并停在那里。这会在帧中的所有剩余动作执行完毕后发生。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndStop(frame:number):void {
            var length = this.frames.length;
            if (!length) {
                return;
            }
            frame = +frame | 0;
            frame = frame < 0 ? 0 : frame;
            this.$isPlaying = false;
            if (frame >= length) {
                frame = length - 1;
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
            var length = this.frames.length;
            this.$isPlaying = false;
            if (!length) {
                return;
            }
            if (this._currentFrame == length - 1) {
                this.executeFrameScript();
                return;
            }
            this._currentFrame++;
            this.currentRun = false;
            this.executeFrameScript();
        }

        /**
         * @language en_US
         * Moves the playhead in the timeline of the animation.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在 Animation 的时间轴中移动播放头。
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
            if (!this.frames.length) {
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
         * Stops the playhead in the animation.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止 Animation 中的播放头。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public stop():void {
            this.$isPlaying = false;
        }

        /**
         * @language en_US
         * The totalFrames property returns the total number of frames in the animation.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * totalFrames 属性会返回 Animation 帧的总数。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get totalFrames():number {
            return this.frames.length;
        }
    }
}