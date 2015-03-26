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

module lark.player {
    /**
     * @excluded
     * 渲染节点基类
     */
    export class RenderNode extends HashObject{

        public constructor(target:DisplayObject) {
            super();
            this.target = target;
        }

        /**
         * 目标显示对象
         */
        private target:DisplayObject;
        /**
         * 要绘制到屏幕的整体透明度。
         */
        public alpha:number = 1;
        /**
         * 目标显示对象以及它所有父级对象的连接矩阵。
         */
        public matrix:Matrix = null;
        /**
         * 目标显示对象的测量边界
         */
        public bounds:Rectangle = null;
        /**
         * 是否需要重绘
         */
        public isDirty:boolean = false;
        /**
         * 当前位置在屏幕之外
         */
        public outOfScreen:boolean = false;
        /**
         * 在屏幕上的矩形区域是否发现改变。
         */
        public moved:boolean = false;
        /**
         * 绘制区域在屏幕上的起点x
         */
        public minX:number = 0;
        /**
         * 绘制区域在屏幕上的起点y
         */
        public minY:number = 0;
        /**
         * 绘制区域在屏幕上的终点x
         */
        public maxX:number = 0;
        /**
         * 绘制区域在屏幕上的终点y
         */
        public maxY:number = 0;

        /**
         * 是否与目标矩形相交
         */
        public intersects(targetMinX:number, targetMinY:number, targetMaxX:number, targetMaxY:number):boolean {
            var max = this.minX > targetMinX ? this.minX : targetMinX;
            var min = this.maxX < targetMaxX ? this.maxX : targetMaxX;
            if (max > min) {
                return false;
            }

            max = this.minY > targetMinY ? this.minY : targetMinY;
            min = this.maxY < targetMaxY ? this.maxY : targetMaxY;
            return max <= min;
        }

        /**
         * 更新节点属性
         */
        public update():void {
            var stage = this.target.$stage;
            if (!stage) {
                this.finish();
                this.minX = this.minY = this.maxX = this.maxY = 0;
                return;
            }
            this.target.$updateRenderNode();
            if(!this.moved){
                return;
            }
            var bounds = this.bounds;
            var m = this.matrix;
            var a:number = m.a, b:number = m.b, c:number = m.c, d:number = m.d, tx:number = m.tx, ty:number = m.ty;
            var x:number = bounds.x, y:number = bounds.y, w:number = bounds.width, h:number = bounds.height;
            var round = Math.round;
            var x0 = round(a * x + c * y + tx);
            var y0 = round(b * x + d * y + ty);
            var x1 = round(a * (x + w) + c * y + tx);
            var y1 = round(b * (x + w) + d * y + ty);
            var x2 = round(a * (x + w) + c * (y + h) + tx);
            var y2 = round(b * (x + w) + d * (y + h) + ty);
            var x3 = round(a * x + c * (y + h) + tx);
            var y3 = round(b * x + d * (y + h) + ty);

            var tmp;

            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }

            this.minX = x0 < x2 ? x0 : x2;
            this.maxX = x1 > x3 ? x1 : x3;

            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }

            this.minY = y0 < y2 ? y0 : y2;
            this.maxY = y1 > y3 ? y1 : y3;
            this.outOfScreen = !this.intersects(0, 0, stage.stageWidth, stage.stageHeight);
        }

        /**
         * 执行渲染,绘制自身到屏幕
         */
        public render(renderContext:IPlayerContext):void{

        }
        /**
         * 渲染结束，已经绘制到屏幕
         */
        public finish():void {
            this.isDirty = false;
            this.moved = false;
        }

        /**
         * 碰撞检测，返回是否与舞台坐标相交。
         */
        public hitTest(stageX:number,stageY:number):boolean{
            var m = this.target.$getInvertedConcatenatedMatrix();
            var bounds = this.bounds;
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            return bounds.contains(localX,localY);
        } 
    }
}