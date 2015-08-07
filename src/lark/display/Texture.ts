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
     * @language en_US
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample egret/display/Texture.ts
     */
    /**
     * @language zh_CN
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample egret/display/Texture.ts
     */
    export class Texture extends LarkObject {

        /**
         * @language en_US
         * Create an Texture object
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN

         * 创建一个 Texture 对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(bitmapData:BitmapData, clipX?:number, clipY?:number, clipWidth?:number, clipHeight?:number,
                           offsetX?:number, offsetY?:number, width?:number, height?:number) {
            super();
            if (DEBUG) {
                if (!bitmapData) {
                    $error(1003, "bitmapData");
                }
                if (!lark.is(bitmapData, "lark.BitmapData")) {
                    $error(1012, "bitmapData")
                }
            }
            this.$bitmapData = bitmapData;
            this.$clipX = +clipX | 0;
            this.$clipY = +clipY | 0;
            this.$clipWidth = +clipWidth | 0;
            this.$clipHeight = +clipHeight | 0;
            this.$offsetX = +offsetX | 0;
            this.$offsetY = +offsetY | 0;
            this.$width = +width || (this.$clipWidth + Math.max(0, this.$offsetX));
            this.$height = +height || (this.$clipHeight + Math.max(0, this.$offsetY));
        }

        /**
         * @private
         * 表示这个纹理在 bitmapData 上的 x 起始位置
         */
        $clipX:number = 0;
        /**
         * @private
         * 表示这个纹理在 bitmapData 上的 y 起始位置
         */
        $clipY:number = 0;
        /**
         * @private
         * 表示这个纹理在 bitmapData 上的宽度
         */
        $clipWidth:number = 0;
        /**
         * @private
         * 表示这个纹理在 bitmapData 上的高度
         */
        $clipHeight:number = 0;

        /**
         * @private
         * 表示这个纹理显示了之后在 x 方向的渲染偏移量
         */
        $offsetX:number = 0;
        /**
         * @private
         * 表示这个纹理显示了之后在 y 方向的渲染偏移量
         */
        $offsetY:number = 0;

        /**
         * @private
         * 纹理宽度
         */
        $width:number = 0;

        /**
         * @language en_US
         * Texture width
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 纹理宽度
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get width():number {
            return this.$width;
        }

        /**
         * @private
         * 纹理高度
         */
        $height:number = 0;

        /**
         * @language en_US
         * Texture height
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 纹理高度
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get height():number {
            return this.$height;
        }


        $bitmapData:any = null;
        /**
         * @language en_US
         * The BitmapData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 被引用的 BitmapData 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get bitmapData():BitmapData {
            return this.$bitmapData;
        }

    }
}
