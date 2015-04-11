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

    function visitDisplayList(displayObject:DisplayObject, visitor:(DisplayObject) => boolean):void {
        if (!visitor(displayObject)) {
            return;
        }
        var children = displayObject.$children;
        if (children) {
            var length = children.length;
            for (var i = 0; i < length; i++) {
                visitDisplayList(children[i], visitor);
            }
        }
    }

    /**
     * Canvas屏幕渲染器
     */
    export class CanvasRenderer extends HashObject implements lark.player.IScreenRenderer {
        /**
         * 创建一个Canvas屏幕渲染器
         */
        public constructor(canvas?:HTMLCanvasElement) {
            super();
            if (!canvas) {
                canvas = document.createElement("canvas");
            }
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
        }

        protected canvas:HTMLCanvasElement;
        protected context:CanvasRenderingContext2D;

        /**
         * 绘制脏矩形列表
         */
        public drawDirtyRects(regionList:lark.player.Region[]):void {
            this.reset();
            this.context.save();
            this.context.beginPath();
            var length = regionList.length;
            for (var i = 0; i < length; i++) {
                var region = regionList[i];
                this.context.clearRect(region.minX, region.minY, region.width, region.height);
                this.context.rect(region.minX, region.minY, region.width, region.height);
            }
            this.context.clip();
        }

        /**
         * 移除之前绘制的脏矩形区域
         */
        public removeDirtyRects():void{
            this.context.restore();
        }

        /**
         * 清空屏幕
         */
        public clearScreen():void {
            this.reset();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        protected reset():void {
            var context = this.context;
            context.setTransform(1, 0, 0, 1, 0, 0);
            this._globalAlpha = 1;
            this.context.globalAlpha = 1;
            this.setFont(null);
            this.setFillStyle(null);
            context.strokeStyle = null;
            context.textBaseline = "middle";

        }

        /**
         * 绘制图片到一个区域上
         */
        public drawImage(texture:Texture, matrix:Matrix, globalAlpha:number):void {
            this.setGlobalAlpha(globalAlpha);
            this.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            var width = texture.$bitmapWidth;
            var height = texture.$bitmapHeight;
            this.context.drawImage(texture.$bitmapData, texture.$bitmapX, texture.$bitmapY, width, height,
                texture.$offsetX, texture.$offsetY, width, height);
        }

        /**
         * 绘制文本到一个区域上
         */
        public drawText(text:string, font:string, color:string, x:number, y:number, width:number, matrix:Matrix, globalAlpha:number):void {
            var context = this.context;
            this.setGlobalAlpha(globalAlpha);
            this.setFont(font);
            this.setFillStyle(color);
            this.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            context.fillText(text, x, y, width);

        }

        private _globalAlpha:number = 1;

        /**
         * 设置并缓存globalAlpha属性，所有修改必须统一调用此方法。
         */
        protected setGlobalAlpha(value:number):void {
            if (this._globalAlpha === value) {
                return;
            }
            this._globalAlpha = value;
            this.context.globalAlpha = value;
        }

        /**
         * 设置并缓存矩阵变换参数，所有修改必须统一调用此方法。子类有可能会覆盖此方法改为叠加transform方式。
         */
        protected setTransform(a:number, b:number, c:number, d:number, tx:number, ty:number):void {
            this.context.setTransform(a, b, c, d, tx, ty);
        }

        private _font:string = null;

        /**
         * 设置并缓存font属性，所有修改必须统一调用此方法。
         */
        private setFont(value:string):void {
            if (this._font == value) {
                return;
            }
            this._font = value;
            this.context.font = value;
        }

        private _fillStyle:string = null;

        /**
         * 设置并缓存fillStyle属性，所有修改必须统一调用此方法。
         */
        private setFillStyle(value:string):void {
            if (this._fillStyle == value) {
                return;
            }
            this._fillStyle = value;
            this.context.fillStyle = value;
        }
    }
}