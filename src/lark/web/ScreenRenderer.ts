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
     * Canvas屏幕渲染器
     */
    export class ScreenRenderer extends HashObject implements lark.player.IScreenRenderer {
        /**
         * 创建一个Canvas屏幕渲染器
         */
        public constructor(canvas:HTMLCanvasElement) {
            super();
            if (canvas) {
                this.canvas = canvas;
                this.context = canvas.getContext("2d");
                mapGraphicsFunction(this.context);
            }

            if (DEBUG) {//显示重绘区相关代码，发行版中移除

                /**
                 * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
                 */
                this.drawDirtyRect = function (x:number, y:number, width:number, height:number):void {
                    var context = this.context;
                    context.strokeStyle = 'red';
                    context.lineWidth = 1;
                    context.strokeRect(x - 0.5, y - 0.5, width, height);
                }
            }
        }

        /**
         * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
         */
        public drawDirtyRect:(x:number, y:number, width:number, height:number)=>void;

        protected canvas:HTMLCanvasElement;
        protected context:CanvasRenderingContext2D;

        /**
         * 绘制脏矩形列表
         */
        public markDirtyRects(regionList:lark.player.Region[]):void {
            var context = this.context;
            context.save();
            context.beginPath();
            var length = regionList.length;
            for (var i = 0; i < length; i++) {
                var region = regionList[i];
                context.clearRect(region.minX, region.minY, region.width, region.height);
                context.rect(region.minX, region.minY, region.width, region.height);
            }
            context.clip();
        }

        /**
         * 移除之前绘制的脏矩形区域
         */
        public removeDirtyRects():void {
            this.context.restore();
        }

        /**
         * 清空屏幕
         */
        public clearScreen():void {
            var context = this.context;
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.restore();
        }

        public reset(root:DisplayObject):void {
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
            var width = texture.$bitmapWidth;
            var height = texture.$bitmapHeight;
            if (width === 0 || height === 0) {
                return;
            }
            this.setGlobalAlpha(globalAlpha);
            this.setTransform(matrix);
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
            this.setTransform(matrix);
            context.fillText(text, x, y, width);

        }

        /**
         * 绘制矢量图形
         */
        public drawGraphics(commands:player.GraphicsCommand[], matrix:Matrix, globalAlpha:number):void {
            this.setGlobalAlpha(globalAlpha);
            this.setTransform(matrix);
            var context = this.context;
            context.save();
            context.fillStyle = "#000000";
            context.lineCap = "butt";
            context.lineJoin = "miter";
            context.lineWidth = 1;
            context.miterLimit = 10;
            context.strokeStyle = "#000000";
            var map = context["graphicsMap"];
            var length = commands.length;
            for (var i = 0; i < length; i++) {
                var command = commands[i];
                map[command.type].apply(context, command.arguments);
            }
            context.restore();
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
        protected setTransform(m:Matrix):void {
            this.context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
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

    export function mapGraphicsFunction(context:CanvasRenderingContext2D):void {
        var map = context["graphicsMap"] = {};
        map[player.GraphicsCommandType.arc] = context.arc;
        map[player.GraphicsCommandType.arcTo] = context.arcTo;
        map[player.GraphicsCommandType.beginPath] = context.beginPath;
        map[player.GraphicsCommandType.bezierCurveTo] = context.bezierCurveTo;
        map[player.GraphicsCommandType.closePath] = context.closePath;
        map[player.GraphicsCommandType.fill] = context.fill;
        map[player.GraphicsCommandType.fillRect] = context.fillRect;
        map[player.GraphicsCommandType.lineTo] = context.lineTo;
        map[player.GraphicsCommandType.moveTo] = context.moveTo;
        map[player.GraphicsCommandType.quadraticCurveTo] = context.quadraticCurveTo;
        map[player.GraphicsCommandType.rect] = context.rect;
        map[player.GraphicsCommandType.stroke] = context.stroke;
        map[player.GraphicsCommandType.strokeRect] = context.strokeRect;

        map[player.GraphicsCommandType.lineWidth] = function (value) {
            context.lineWidth = value
        };
        map[player.GraphicsCommandType.miterLimit] = function (value) {
            context.miterLimit = value
        };
        map[player.GraphicsCommandType.fillStyle] = function (value) {
            context.fillStyle = value
        };
        map[player.GraphicsCommandType.lineCap] = function (value) {
            context.lineCap = value
        };
        map[player.GraphicsCommandType.lineJoin] = function (value) {
            context.lineJoin = value
        };
        map[player.GraphicsCommandType.strokeStyle] = function (value) {
            context.strokeStyle = value
        };
    }
}