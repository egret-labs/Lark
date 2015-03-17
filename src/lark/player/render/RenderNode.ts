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
     * @excluded
     * 渲染节点基类
     */
    export class RenderNode {

        public constructor() {

        }

        /**
         * 上一次绘制区域在屏幕上的起点x
         */
        public oldXMin:number = 0;
        /**
         * 上一次绘制区域在屏幕上的起点y
         */
        public oldYMin:number = 0;
        /**
         * 上一次绘制区域在屏幕上的终点x
         */
        public oldXMax:number = 0;
        /**
         * 上一次绘制区域在屏幕上的终点y
         */
        public oldYMax:number = 0;


        /**
         * 绘制区域在屏幕上的起点x
         */
        public xMin:number = 0;
        /**
         * 绘制区域在屏幕上的起点y
         */
        public yMin:number = 0;
        /**
         * 绘制区域在屏幕上的终点x
         */
        public xMax:number = 0;
        /**
         * 绘制区域在屏幕上的终点y
         */
        public yMax:number = 0;

        /**
         * 是否需要重绘
         */
        public isDirty:boolean = false;

        /**
         * 要绘制到屏幕的整体透明度。
         */
        public alpha:number = 1;

        public matrix:Matrix = null;
        /**
         * 更新绘制的矩形区域
         */
        public update(target:DisplayObject):void {
            this.alpha = target.$getConcatenatedAlpha();
            this.matrix = target.$getConcatenatedMatrix();
            var rect = Rectangle.TEMP;
            rect.copyFrom(target.$getContentBounds());
            this.matrix.$transformBounds(rect);
            this.isDirty = target.$hasAnyFlags(DisplayObjectFlags.Dirty);
            this.oldXMax = this.xMax;
            this.oldXMin = this.xMin;
            this.oldYMax = this.yMax;
            this.oldYMin = this.yMin;
            this.xMin = rect.x;
            this.yMin = rect.y;
            this.xMax = rect.x+rect.width;
            this.yMax = rect.y+rect.height;
        }

        /**
         * 测试节点的当前矩形和上次矩形是否跟目标节点的当前矩形相交。
         */
        public intersects(node:RenderNode):boolean {

            return this.intersectsRect(this.xMin,this.yMin,this.xMax,this.yMax,node.xMin,node.yMin,node.xMax,node.yMax)||
                this.intersectsRect(this.oldXMin,this.oldYMin,this.oldXMax,this.oldYMax,node.xMin,node.yMin,node.xMax,node.yMax);
        }

        public intersectRect(rect:Rectangle):boolean {
            return this.intersectsRect(this.xMin,this.yMin,this.xMax,this.yMax,rect.x,rect.y,rect.x+rect.width,rect.y+rect.height);
        }

        private intersectsRect(minX:number, minY:number, maxX:number, maxY:number,
                               targetMinX:number, targetMinY:number, targetMaxX:number, targetMaxY:number):boolean {
            var max = minX > targetMinX ? minX : targetMinX;
            var min = maxX < targetMaxX ? maxX : targetMaxX;
            if (max > min) {
                return false;
            }
            max = minY > targetMinY ? minY : targetMinY;
            min = maxY < targetMaxY ? maxY : targetMaxY;
            return max<=min;
        }

    }
}