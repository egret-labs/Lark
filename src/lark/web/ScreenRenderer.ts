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
            }

            this.mapGraphicsFunction();

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
        public drawGraphics(commands:player.Command[], matrix:Matrix, globalAlpha:number):void {
            this.setGlobalAlpha(globalAlpha);
            this.setTransform(matrix);
            this.context.save();
            var map = this.graphicsMap;
            var length = commands.length;
            for(var i=0;i<length;i++){
                var command = commands[i];
                map[command.type].apply(this,command.arguments);
            }
            this.context.restore();
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

        private graphicsMap:{[key:number]:Function} = {};

        private mapGraphicsFunction():void{
            var map = this.graphicsMap;
            map[player.CommandType.BeginFill] = this.beginFill;
            map[player.CommandType.CurveTo] = this.curveTo;
            map[player.CommandType.DrawCircle] = this.drawCircle;
            map[player.CommandType.DrawEllipse] = this.drawEllipse;
            map[player.CommandType.DrawRect] = this.drawRect;
            map[player.CommandType.DrawRoundRect] = this.drawRoundRect;
            map[player.CommandType.EndFill] = this.endFill;
            map[player.CommandType.LineStyle] = this.lineStyle;
            map[player.CommandType.LineTo] = this.lineTo;
            map[player.CommandType.MoveTo] = this.moveTo;
        }
        /**
         * 指定一种简单的单一颜色填充，在绘制时该填充将在随后对其他 Graphics 方法（如 lineTo() 或 drawCircle()）的调用中使用。
         * 调用 clear() 方法会清除填充。
         * @param color 填充的颜色
         * @param alpha 填充的 Alpha 值
         */
        private beginFill(color:number, alpha:number = 1):void {
        }

        /**
         * 绘制一个矩形
         * @param x 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
         * @param y 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        private drawRect(x:number, y:number, width:number, height:number):void {
        }

        /**
         * 绘制一个圆。
         * @param x 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
         * @param y 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
         * @param radius 圆的半径（以像素为单位）。
         */
        private drawCircle(x:number, y:number, radius:number):void {
        }

        /**
         * 绘制一个圆角矩形
         * @param x 圆心相对于父显示对象注册点的 x 位置（以像素为单位）。
         * @param y 相对于父显示对象注册点的圆心的 y 位置（以像素为单位）。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @param ellipseWidth 用于绘制圆角的椭圆的宽度（以像素为单位）。
         * @param ellipseHeight 用于绘制圆角的椭圆的高度（以像素为单位）。 （可选）如果未指定值，则默认值与为 ellipseWidth 参数提供的值相匹配。
         */
        private drawRoundRect(x:number, y:number, width:number, height:number, ellipseWidth:number, ellipseHeight?:number):void {
        }

        /**
         * 绘制一个椭圆。
         * @param x 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
         * @param y 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        private drawEllipse(x:number, y:number, width:number, height:number):void {
        }

        /**
         * 指定一种线条样式以用于随后对 lineTo() 或 drawCircle() 等 Graphics 方法的调用。
         * @param thickness 一个整数，以点为单位表示线条的粗细，有效值为 0 到 255。如果未指定数字，或者未定义该参数，则不绘制线条。如果传递的值小于 0，则默认值为 0。值 0 表示极细的粗细；最大粗细为 255。如果传递的值大于 255，则默认值为 255。
         * @param color 线条的十六进制颜色值（例如，红色为 0xFF0000，蓝色为 0x0000FF 等）。如果未指明值，则默认值为 0x000000（黑色）。可选。
         * @param alpha 表示线条颜色的 Alpha 值的数字；有效值为 0 到 1。如果未指明值，则默认值为 1（纯色）。如果值小于 0，则默认值为 0。如果值大于 1，则默认值为 1。
         * @param pixelHinting {boolean} 布尔型值，指定是否提示笔触采用完整像素。它同时影响曲线锚点的位置以及线条笔触大小本身。在 pixelHinting 设置为 true 的情况下，线条宽度会调整到完整像素宽度。在 pixelHinting 设置为 false 的情况下，对于曲线和直线可能会出现脱节。
         * @param scaleMode {string} 用于指定要使用的比例模式
         * @param caps {string} 用于指定线条末端处端点类型的 CapsStyle 类的值。
         * @param joints {string} 指定用于拐角的连接外观的类型。
         * @param miterLimit 用于表示剪切斜接的极限值的数字。
         */
        private lineStyle(thickness:number = NaN, color:number = 0, alpha:number = 1.0, pixelHinting:boolean = false,
                         scaleMode:string = "normal", caps:string = null, joints:string = null, miterLimit:number = 3):void {
        }

        /**
         * 使用当前线条样式绘制一条从当前绘图位置开始到 (x, y) 结束的直线；当前绘图位置随后会设置为 (x, y)。
         * @param x 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
         * @param y 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
         */
        private lineTo(x:number, y:number):void {
        }

        /**
         * 使用当前线条样式和由 (controlX, controlY) 指定的控制点绘制一条从当前绘图位置开始到 (anchorX, anchorY) 结束的二次贝塞尔曲线。当前绘图位置随后设置为 (anchorX, anchorY)。
         * 如果在调用 moveTo() 方法之前调用了 curveTo() 方法，则当前绘图位置的默认值为 (0, 0)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
         * 绘制的曲线是二次贝塞尔曲线。二次贝塞尔曲线包含两个锚点和一个控制点。该曲线内插这两个锚点，并向控制点弯曲。
         * @param controlX 一个数字，指定控制点相对于父显示对象注册点的水平位置。
         * @param controlY 一个数字，指定控制点相对于父显示对象注册点的垂直位置。
         * @param anchorX 一个数字，指定下一个锚点相对于父显示对象注册点的水平位置。
         * @param anchorY 一个数字，指定下一个锚点相对于父显示对象注册点的垂直位置。
         */
        private curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):void {
        }

        /**
         * 将当前绘图位置移动到 (x, y)。如果缺少任何一个参数，则此方法将失败，并且当前绘图位置不改变。
         * @param x 一个表示相对于父显示对象注册点的水平位置的数字（以像素为单位）。
         * @param y 一个表示相对于父显示对象注册点的垂直位置的数字（以像素为单位）。
         */
        private moveTo(x:number, y:number):void {
        }

        /**
         * 对从上一次调用 beginFill()方法之后添加的直线和曲线应用填充。
         */
        private endFill():void {
        }

    }
}