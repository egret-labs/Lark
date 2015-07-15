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
     * Sequence frame animation is a simple MovieClip.It supports the config file which created by Egret Texture Memger.When you load a BitmapArray by MovieClipLoader you should choose MovieClipType.SEQUENCE_FRAME type.
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
    export class BitmapArray extends lark.DisplayObject {

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
        public constructor(frames:Array<BitmapArrayFrameData>) {
            super();
            this.$renderRegion = new lark.sys.Region();
            this.$totalFrames = frames.length;
            this.$currentFrame = this.$totalFrames==0?0:1;
            this.$frames = [];
        }

        /**
         * @private
         */
        $currentFrame:number;

        /**
         * @private
         * 每一帧的数据
         */
        $frames:Array<BitmapArrayFrameData>;

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
        public get frames():Array<BitmapArrayFrameData>
        {
            return this.$frames;
        }

        /**
         * @private
         */
        private $loops:number;

        /**
         * @private
         */
        $measureContentBounds(bounds:lark.Rectangle):void {
            var frameInfo = this.$frames[this.$currentFrame];
            if (frameInfo) {
                bounds.setTo(frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
            }
            else {
                bounds.setEmpty();
            }
        }

        /**
         * @private
         */
        private $onFrame():void {
            this.$currentFrame++;
            if(this.$currentFrame == this.$totalFrames - 1)
            {
                this.$loops--;
                this.removeListener(lark.Event.ENTER_FRAME, this.$onFrame,this);
            }
            this.$invalidateContentBounds();

        }

        public play(startFrame:number = 1, loops:number = 1):void
        {
            this.$currentFrame = ((startFrame<0?0:startFrame-1)&~0)%this.$totalFrames;
            this.$loops = (loops<0?0:loops)&~0;
            this.on(lark.Event.ENTER_FRAME, this.$onFrame, this);
            this.$invalidateContentBounds();
        }

        public stop():void
        {
            this.$currentFrame = 0;
            this.removeListener(lark.Event.ENTER_FRAME, this.$onFrame,this);
            this.$invalidateContentBounds();
        }

        /**
         * @private
         */
        $render(context:lark.sys.RenderContext):void {
            var frameInfo = this.$frames[this.$currentFrame];
            if (frameInfo) {
                context.drawImage(frameInfo.bitmapData, frameInfo.sourceX, frameInfo.sourceY, frameInfo.width, frameInfo.height, frameInfo.x, frameInfo.y, frameInfo.width, frameInfo.height);
            }
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