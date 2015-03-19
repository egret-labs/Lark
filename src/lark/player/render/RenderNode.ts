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
    export class RenderNode {

        public constructor(target:DisplayObject) {
            this.nodeType = NodeType.Node;
            this.target = target;
            this.id = RenderNode.idCount++;
        }

        private static idCount:number = 1;

        public id:number;

        public target:DisplayObject;

        public nodeType:number;

        /**
         * 绘制区域在屏幕上的起点x
         */
        public x:number = 0;
        /**
         * 绘制区域在屏幕上的起点y
         */
        public y:number = 0;
        /**
         * 绘制区域在屏幕上的宽度
         */
        public width:number = 0;
        /**
         * 绘制区域在屏幕上的高度
         */
        public height:number = 0;

        public setRect(x:number,y:number,width:number,height:number):void{
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        public getRect():Rectangle{
            return Rectangle.TEMP.setTo(this.x,this.y,this.width,this.height);
        }
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
         * 在屏幕上的矩形区域是否发现改变。
         */
        public moved:boolean = false;

        public intersects(rect:Rectangle):boolean {
            var targetMinX:number = rect.x;
            var targetMaxX:number = targetMinX + rect.width;
            var maxX = this.x+this.width;
            var max = this.x > targetMinX ? this.x : targetMinX;
            var min = maxX < targetMaxX ? maxX : targetMaxX;
            if (max > min) {
                return false;
            }

            var targetMinY:number = rect.y;
            var targetMaxY:number = targetMinY + rect.height;
            var maxY:number = this.y+this.height;
            max = this.y > targetMinY ? this.y : targetMinY;
            min = maxY < targetMaxY ? maxY : targetMaxY;
            return max <= min;
        }

        /**
         * 渲染结束，已经绘制到屏幕
         */
        public finish():void{
            this.isDirty = false;
            this.moved = false;
        }
    }
}