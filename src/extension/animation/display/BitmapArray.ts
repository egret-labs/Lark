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

module larkAnimation {

    /**
     * @private
     * @language en_US
     * BitmapArray is a simple MovieClip.It supports the format of Egret MovieClip.
     * @see lark.MovieClipLoader
     * @see lark.MovieClipType
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * 序列帧动画，是一种简单的 MovieClip。它支持 Egret MovieClip 数据格式。
     * @see lark.MovieClipLoader
     * @see lark.MovieClipType
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class BitmapArray extends lark.DisplayObject {

        /**
         * @language en_US
         * Creates a new BitmapArray instance. After creating the BitmapArray, call the addChild() or addChildAt() method of a display object container that is onstage.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建新的 BitmapArray 实例。创建 BitmapArray 之后，调用舞台上的显示对象容器的 addChild() 或 addChildAt() 方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(bitmapArrayData?:BitmapArrayData) {
            super();
            this.$renderRegion = new lark.sys.Region();
            this.$bitmapArrayData = bitmapArrayData;
            if (bitmapArrayData && bitmapArrayData.$length) {
                this.$isPlaying = true;
                this.excuteFrameScript();
                this.$invalidateContentBounds();
            }
            this.on(lark.Event.ENTER_FRAME, this.$onFrame, this);
        }

        /**
         * @private
         */
        private $callBacks:Object = {};

        /**
         * @private
         */
        private $currentRun:boolean = false;

        /**
         * @language en_US
         * Add a call-back-function at the frame.If a call-back-function has existed on the frame, it's will be replaced.
         * @param frame The frame to add call back.The number of first frame is 1.
         * @param callBack The function to call back.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在对应的帧上添加回调函数。如果之前该帧上已经有回调函数，会被替换成新的回调函数。
         * @param frame 第几帧添加代码。起始帧编号为1。
         * @param callBack 回调函数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public addFrameScript(frame:number, callBack:Function):void {
            frame--;
            this.$callBacks[frame] = callBack;
        }

        /**
         * @private
         */
        private $currentFrame:number = 0;

        /**
         * @language en_US
         * Specifies the number of the frame in which the playhead is located in the timeline of the BitmapArray instance.
         * The number of first frame is 1.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定播放头在 BitmapArray 实例的时间轴中所处的帧的编号。起始帧编号为1。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentFrame():number {
            if (this.$bitmapArrayData.$length == 0) return 0;
            return this.$currentFrame + 1;
        }

        /**
         * @private
         */
        private $bitmapArrayData:BitmapArrayData;


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
        public get bitmapArrayData():BitmapArrayData {
            return this.$bitmapArrayData;
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
        public set bitmapArrayData(bitmapArrayData:BitmapArrayData) {
            this.$bitmapArrayData = bitmapArrayData;
            if (bitmapArrayData && bitmapArrayData.$length) {
                this.$currentFrame = 0;
                this.$isPlaying = true;
                this.excuteFrameScript();
            }
            else {
                this.$currentFrame = 0;
                this.$isPlaying = false;
            }
            this.$invalidateContentBounds();
        }

        /**
         * @private
         * 执行当前帧脚本逻辑
         */
        private excuteFrameScript():void {
            var callBack:Function = this.$callBacks[this.$currentFrame];
            if (callBack && !this.$currentRun) {
                this.$currentRun = true;
                callBack.apply(this);
            }
        }

        /**
         * @private
         */
        private $isPlaying:boolean = false;

        /**
         * @language en_US
         * A BitmapArray is playing or not.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * BitmapArray 实例当前是否正在播放。
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
            this.$currentFrame++;
            this.$currentFrame = this.$currentFrame % this.$bitmapArrayData.$length;
            this.$currentRun = false;
            this.excuteFrameScript();
            this.$invalidateContentBounds();
        }

        /**
         * @private
         */
        $measureContentBounds(bounds:lark.Rectangle):void {
            if (this.$bitmapArrayData && this.$bitmapArrayData.$length) {
                var frameInfo = this.$bitmapArrayData.$frames[this.$currentFrame];
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
            if (this.$bitmapArrayData && this.$bitmapArrayData.$frames) {
                var frameInfo = this.$bitmapArrayData.$frames[this.$currentFrame];
                context.drawImage(frameInfo.bitmapData, frameInfo.sourceX, frameInfo.sourceY, frameInfo.width, frameInfo.height, frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
            }
        }

        /**
         * @language en_US
         * Starts playing the bitmap array at the specified frame.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.The number of first frame is 1.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从指定帧开始播放序列帧动画 。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。起始帧编号为1。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndPlay(frame:number):void {
            if (!this.$bitmapArrayData) {
                return;
            }
            frame = frame & ~0 || 1;
            frame--;
            this.$isPlaying = true;
            if (frame >= this.$bitmapArrayData.$length) frame = this.$bitmapArrayData.$length;
            if (this.$currentFrame == frame) {
                return;
            }
            this.$currentFrame = frame;
            this.$currentRun = false;
            this.excuteFrameScript();
        }

        /**
         * @language en_US
         * Brings the playhead to the specified frame of the bitmap array and stops it there.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.The number of first frame is 1.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头移到序列帧动画的指定帧并停在那里。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。起始帧编号为1。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndStop(frame:number):void {
            if (!this.$bitmapArrayData) {
                return;
            }
            frame = frame & ~0 || 1;
            frame--;
            this.$isPlaying = false;
            if (frame >= this.$bitmapArrayData.$length) frame = this.$bitmapArrayData.$length;
            if (this.$currentFrame == frame) {
                return;
            }
            this.$currentFrame = frame;
            this.$currentRun = false;
            this.excuteFrameScript();
        }

        /**
         * @language en_US
         * Sends the playhead to the next frame and stops it.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头转到下一帧并停止。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public nextFrame():void {
            this.$isPlaying = false;
            if (!this.$bitmapArrayData) {
                return;
            }
            this.excuteFrameScript();
            if (this.$currentFrame >= this.$bitmapArrayData.$length - 1) {
                return;
            }
            this.$currentFrame++;
            this.$currentRun = false;
        }

        /**
         * @language en_US
         * Moves the playhead in the timeline of the bitmap array.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在序列帧动画的时间轴中移动播放头。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public play():void {
            this.$isPlaying = true;
        }

        /**
         * @language en_US
         * Sends the playhead to the last frame and stops it.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头转到前一帧并停止。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public prevFrame():void {
            this.$isPlaying = false;
            if (!this.$bitmapArrayData) {
                return;
            }
            this.excuteFrameScript();
            if (this.$currentFrame == 0) {
                return;
            }
            this.$currentFrame--;
            this.$currentRun = false;
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
         * The totalFrames property returns the total number of frames in the bitmap array.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * totalFrames 属性会返回序列帧动画的总帧数。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get totalFrames():number {
            return this.$bitmapArrayData ? this.$bitmapArrayData.totalFrames : 0;
        }
    }
}