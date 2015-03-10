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
     * 纹理类是对不同平台不同的图片资源的封装
     * 在HTML5中，资源是一个HTMLElement对象
     * 在OpenGL / WebGL中，资源是一个提交GPU后获取的纹理id
     * Texture类封装了这些底层实现的细节，开发者只需要关心接口即可
     */
    export class Texture extends HashObject {

        /**
         * 创建一个 lark.Texture 对象
         */
        public constructor() {
            super();
        }

        /**
         * 表示这个纹理在 bitmapData 上的 x 起始位置
         */
        $bitmapX:number = 0;
        /**
         * 表示这个纹理在 bitmapData 上的 y 起始位置
         */
        $bitmapY:number = 0;
        /**
         * 表示这个纹理在 bitmapData 上的宽度
         */
        $bitmapWidth:number = 0;
        /**
         * 表示这个纹理在 bitmapData 上的高度
         */
        $bitmapHeight:number = 0;

        /**
         * 表示这个纹理显示了之后在 x 方向的渲染偏移量
         */
        $offsetX = 0;
        /**
         * 表示这个纹理显示了之后在 y 方向的渲染偏移量
         */
        $offsetY = 0;


        $textureWidth:number = 0;
        /**
         * 纹理宽度
         */
        public get textureWidth():number {
            return this.$textureWidth;
        }


        $textureHeight:number = 0;
        /**
         * 纹理高度
         */
        public get textureHeight():number {
            return this.$textureHeight;
        }

        /**
         * 表示bitmapData.width
         */
        $sourceWidth:number = 0;
        /**
         * 表示bitmapData.height
         */
        $sourceHeight:number = 0;

        $bitmapData:any = null;
        /**
         * 纹理对象中得位图数据
         */
        public get bitmapData():any {
            return this.$bitmapData;
        }

        $setBitmapData(value:any) {
            this.$bitmapData = value;
            this.$sourceWidth = value.width;
            this.$sourceHeight = value.height;
            this.$textureWidth = this.$sourceWidth;
            this.$textureHeight = this.$sourceHeight;
            this.$bitmapWidth = this.$textureWidth;
            this.$bitmapHeight = this.$textureHeight;
            this.$offsetX = this.$offsetY = this.$bitmapX = this.$bitmapY = 0;
        }
    }
}