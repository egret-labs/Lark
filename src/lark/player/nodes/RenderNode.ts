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

    var TempBounds = new Rectangle();
    /**
     * @excluded
     * 渲染节点基类
     */
    export class RenderNode extends HashObject {

        public constructor(target:DisplayObject) {
            super();
            this.target = target;
        }

        //对于V8，要控制对象属性的个数在12~128之间才能获得最高的属性查询性能。

        /**
         * 目标显示对象
         */
        public target:DisplayObject;
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
            this.target.$updateRenderNode();
            this.updateBounds();
        }

        protected updateBounds():void{
            var stage = this.target.$stage;
            if (!stage) {
                this.finish();
                return;
            }
            if (!this.moved) {
                return;
            }
            var bounds = TempBounds.copyFrom(this.bounds);
            var m = this.matrix;
            //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
            if(m.a===1&&m.b===0&&m.c===0&&m.d===1){
                bounds.x += m.tx;
                bounds.y += m.ty;
            }
            else{
                m.$transformBounds(bounds);
            }
            this.minX = bounds.x;
            this.maxX = bounds.x + bounds.width;
            this.minY = bounds.y;
            this.maxY = bounds.y + bounds.height;
        }

        /**
         * 执行渲染,绘制自身到屏幕
         */
        public render(renderer:IRenderer):void {

        }

        /**
         * 渲染结束，已经绘制到屏幕
         */
        public finish():void {
            this.isDirty = false;
            this.moved = false;
        }
    }
}