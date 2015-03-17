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
        public oldMinx:number = 0;
        /**
         * 上一次绘制区域在屏幕上的起点y
         */
        public oldMinY:number = 0;
        /**
         * 上一次绘制区域在屏幕上的终点x
         */
        public oldMaxX:number = 0;
        /**
         * 上一次绘制区域在屏幕上的终点y
         */
        public oldMaxY:number = 0;


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
            this.oldMaxX = this.maxX;
            this.oldMinx = this.minX;
            this.oldMaxY = this.maxY;
            this.oldMinY = this.minY;
            this.minX = rect.x;
            this.minY = rect.y;
            this.maxX = rect.x + rect.width;
            this.maxY = rect.y + rect.height;
        }

        public intersects(rect:Rectangle):boolean {
            var targetMinX:number = rect.x;
            var targetMinY:number = rect.y;
            var targetMaxX:number = targetMinX + rect.width;
            var targetMaxY:number = targetMinY + rect.height;
            var max = this.minX > targetMinX ? this.minX : targetMinX;
            var min = this.maxX < targetMaxX ? this.maxX : targetMaxX;
            if (max > min) {
                return false;
            }
            max = this.minY > targetMinY ? this.minY : targetMinY;
            min = this.maxY < targetMaxY ? this.maxY : targetMaxY;
            return max <= min;
        }
    }
}