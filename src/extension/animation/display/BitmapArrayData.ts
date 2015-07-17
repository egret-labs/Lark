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
     * 序列帧动画的单帧数据
     */
    export class BitmapArrayFrameData extends lark.LarkObject {

        /**
         * @language en_US
         * Create the data of BitmapArray's single frame.
         * @param bitmapData The source bitmap data.
         * @param x X of the position at the BitmapArray object.
         * @param y Y of the position at the BitmapArray object.
         * @param width Width of the bitmap.
         * @param height Height of the bitmap.
         * @param sourceX Bitmap's offx at source.
         * @param sourceY Bitmap's offy at source.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建序列帧动画的单帧数据。
         * @param bitmapData 源图片数据
         * @param x 图片在BitmapArray对象中的位置x
         * @param y 图片在BitmapArray对象中的位置y
         * @param width 图片的宽
         * @param height 图片的高
         * @param sourceX 图片在源图片中的偏移量x
         * @param sourceY 图片在源图片中的偏移量y
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(bitmapData:lark.BitmapData, x:number, y:number, width:number, height:number, sourceX:number, sourceY:number) {
            super();
            this.bitmapData = bitmapData;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.sourceX = sourceX;
            this.sourceY = sourceY;
        }

        /**
         * @private
         * 在FrameAnimation中的位置x
         */
        public bitmapData:lark.BitmapData;

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
    }

    /**
     * @private
     * @language en_US
     * The data of BitmapArray.
     * @see larkAnimation.BitmapArray
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * 序列帧动画的数据。
     * @see larkAnimation.BitmapArray
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class BitmapArrayData extends lark.LarkObject {
        /**
         * @private
         * @language en_US
         * constructor.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @private
         * @language zh_CN
         * 构造函数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
        }

        /**
         * @private
         */
        get $length():number {
            if (this.$frames) return this.$frames.length;
            return 0;
        }

        /**
         * @private
         */
        $frames:Array<BitmapArrayFrameData>;

        /**
         * @language en_US
         * The totalFrames property returns the total number of frames in the BitmapArray.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * totalFrames 属性会返回动画中帧的总数。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get totalFrames():number {
            if (this.$frames) return this.$frames.length;
            return 0;
        }
    }
}