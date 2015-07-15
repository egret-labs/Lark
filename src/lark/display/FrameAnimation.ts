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
     * FrameAnimation中单帧的信息
     */
    class FrameAnimationData {
        /**
         * @private
         * 在FrameAnimation中的位置x
         */
        public bitmapData:BitmapData;

        /**
         * @private
         * 表示是否为SpriteSheet的资源
         */
        public spriteSheetFlag:boolean;

        /**
         * @private
         * 在FrameAnimation中的位置x
         */
        public x:number;

        /**
         * @private
         * 在FrameAnimation中的位置y
         */
        public y:number;

        /**
         * @private
         * 图像的宽
         */
        public width:number;

        /**
         * @private
         * 图像的高
         */
        public height:number;

        /**
         * @private
         * 图片在SpriteSheet中的位置x
         */
        public sourceX:number;

        /**
         * @private
         * 图片在SpriteSheet中的位置y
         */
        public sourceY:number;

        public constructor(x:number, y:number, width:number, height:number, bitmapData:BitmapData, spriteSheetFlag:boolean, sourceX:number, sourceY:number) {
            this.x = x;
            this.y = y;
            this.sourceX = sourceX;
            this.sourceY = sourceY;
            this.bitmapData = bitmapData;
            this.spriteSheetFlag = spriteSheetFlag;
            this.width = width;
            this.height = height;
        }
    }

    /**
     * @private
     * @language en_US
     * Sequence frame animation is a simple MovieClip.It supports the config file which created by Egret Texture Memger.When you load a FrameAnimation by MovieClipLoader you should choose MovieClipType.SEQUENCE_FRAME type.
     * @see lark.MovieClipLoader
     * @see lark.MovieClipType
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * 序列帧动画，是一种简单的MovieClip。它支持由Egret Texture Memger创建的MovieClip动画配置文件。用MovieClipLoader加载序列帧动画的时候请选择MovieClipType.FRAME_BY_FRAME类型。
     * @see lark.MovieClipLoader
     * @see lark.MovieClipType
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class FrameAnimation extends DisplayObject implements MovieClip {

        /**
         * @language en_US
         * Creates a new MovieClip instance. After creating the MovieClip, call the addChild() or addChildAt() method of a display object container that is onstage.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建新的 MovieClip 实例。创建 MovieClip 之后，调用舞台上的显示对象容器的 addChild() 或 addChildAt() 方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.$renderRegion = new sys.Region();
            this.$currentFrame = 0;
            this.$totalFrames = 0;
            this.$isPlaying = false;
            this.$labels = [];
            this.$frames = [];
            this.on(lark.Event.ENTER_FRAME, this.$onFrame, this);
        }

        /**
         * @private
         */
        $currentFrame:number;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentFrame():number {
            if (this.$totalFrames == 0) return 0;
            return this.$currentFrame + 1;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentFrameLabel():string {
            for (var i = this.$labels.length - 1; i >= 0; i--) {
                if (this.$labels[i].frame == this.$currentFrame) {
                    return this.$labels[i].name;
                }
            }
            return null;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentLabel():string {
            for (var i = this.$labels.length - 1; i >= 0; i--) {
                if (this.$labels[i].frame <= this.$currentFrame) {
                    return this.$labels[i].name;
                }
            }
            return null;
        }

        /**
         * @private
         * 解析资源
         * @param config 配置文件
         * @param bitmapData 资源合集
         */
        public decodeSpriteSheet(config:string, bitmapData:BitmapData):void {
            var info = JSON.parse(config);
            var list:Array<any>;
            for (var key in info.mc) {
                list = info.mc[key].frames;
                break;
            }
            var len = list.length;
            var res;
            for (var i = 0; i < len; i++) {
                res = info.res[list[i].res];
                this.$frames.push(new FrameAnimationData(list[i].x, list[i].y, res.w, res.h, bitmapData, true, res.x, res.y));
            }
            this.$totalFrames = len;
            this.$isPlaying = true;
        }

        /**
         * @private
         */
        $labels:Array<FrameLabel>;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get labels():Array<FrameLabel> {
            return this.$labels;
        }

        /**
         * @private
         */
        $isPlaying:boolean;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get isPlaying():boolean {
            return this.$isPlaying;
        }

        /**
         * @private
         * 每一帧的数据
         */
        $frames:Array<FrameAnimationData>;

        /**
         * @private
         */
        private $onFrame():void {
            if (!this.$isPlaying) {
                return;
            }
            this.$currentFrame++;
            this.$currentFrame = this.$currentFrame % this.$totalFrames;
            this.$invalidateContentBounds();
        }

        /**
         * @private
         */
        $measureContentBounds(bounds:Rectangle):void {
            var frameInfo = this.$frames[this.$currentFrame];
            if (frameInfo && frameInfo.bitmapData) {
                if (frameInfo.spriteSheetFlag) {
                    bounds.setTo(frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
                }
                else {
                    bounds.setTo(0, 0, frameInfo.bitmapData.width, frameInfo.bitmapData.height);
                }
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         */
        $render(context:sys.RenderContext):void {
            var frameInfo = this.$frames[this.$currentFrame];
            if (frameInfo && frameInfo.bitmapData) {
                if (frameInfo.spriteSheetFlag) {
                    context.drawImage(frameInfo.bitmapData, frameInfo.sourceX, frameInfo.sourceY, frameInfo.width, frameInfo.height, frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
                }
                else {
                    context.drawImage(frameInfo.bitmapData, 0, 0);
                }
            }
        }

        /**
         * @private
         * 根据帧名称获取对应的帧数
         */
        private $getFrameNumberByLabel(name:string):number {
            for (var i = this.$labels.length - 1; i >= 0; i--) {
                if (this.$labels[i].frame <= this.$currentFrame) {
                    return this.$labels[i].frame;
                }
            }
            return 0;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndPlay(frame:any):void {
            var num = 0;
            if (typeof frame == "number") {
                num = frame;
            }
            else {
                num = this.$getFrameNumberByLabel(frame);
                if (num == 0) {
                    throw lark.sys.tr(1013, frame);
                    return;
                }
            }
            this.$isPlaying = true;
            if (num >= this.$totalFrames) num = this.$totalFrames;
            if (this.$currentFrame == num) {
                return;
            }
            this.$currentFrame = num;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public gotoAndStop(frame:any):void {
            var num = 0;
            if (typeof frame == "number") {
                num = frame;
            }
            else {
                num = this.$getFrameNumberByLabel(frame);
                if (num == 0) {
                    throw lark.sys.tr(1013, frame);
                    return;
                }
            }
            this.$isPlaying = false;
            if (num >= this.$totalFrames) num = this.$totalFrames;
            if (this.$currentFrame == num) {
                return;
            }
            this.$currentFrame = num;
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
            if (this.$currentFrame >= this.$totalFrames - 1) return;
            this.$currentFrame++;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public play():void {
            this.$isPlaying = true;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public prevFrame():void {
            this.$isPlaying = false;
            if (this.$currentFrame == 0) return;
            this.$currentFrame--;
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public stop():void {
            this.$isPlaying = false;
        }

        /**
         * @private
         * 影片的总长度
         */
        private $totalFrames:number;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get totalFrames():number {
            return this.$totalFrames;
        }
    }
}