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
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     */
    export class Rectangle extends HashObject {

        /**
         * 只允许在局部变量中使用，使用完要立即释放，并要防止嵌套调用导致对象在其他位置被修改的可能性。
         */
        public static TEMP: Rectangle = new Rectangle();
        /**
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        public constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0) {
            super();
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        /**
         * 矩形左上角的 x 坐标。
         */
        public x:number;
        /**
         * 矩形左上角的 y 坐标。
         */
        public y:number;
        /**
         * 矩形的宽度（以像素为单位）。
         */
        public width:number;
        /**
         * 矩形的高度（以像素为单位）。
         */
        public height:number;

        /**
         * x 和 width 属性的和。
         */
        public get right():number {
            return this.x + this.width;
        }

        public set right(value:number) {
            this.width = value - this.x;
        }

        /**
         * y 和 height 属性的和。
         */
        public get bottom():number {
            return this.y + this.height;
        }

        public set bottom(value:number) {
            this.height = value - this.y;
        }

        /**
         * 矩形左上角的 x 坐标。
         */
        public get left():number {
            return this.x;
        }

        public set left(value:number) {
            this.width += this.x - value;
            this.x = value;
        }

        /**
         * 矩形左上角的 y 坐标。
         */
        public get top():number {
            return this.y;
        }

        public set top(value:number) {
            this.height += this.y - value;
            this.y = value;
        }

        /**
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         */
        public copyFrom(sourceRect: Rectangle): void {
            this.x = sourceRect.x;
            this.y = sourceRect.y;
            this.width = sourceRect.width;
            this.height = sourceRect.height;
        }
        /**
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        public setTo(x:number, y:number, width:number, height:number):void {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         */
        public contains(x:number, y:number):boolean {
            return this.x <= x &&
                this.x + this.width >= x &&
                this.y <= y &&
                this.y + this.height >= y;
        }

        /**
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         */
        public intersects(toIntersect:Rectangle):boolean {
            return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right)
                && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
        }

        /**
         * 确定此 Rectangle 对象是否为空。
         */
        public isEmpty(): boolean {
            return this.width <= 0 || this.height <= 0;
        }
        /**
         * 将 Rectangle 对象的所有属性设置为 0。
         */
        public setEmpty():void {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }

        /**
         * 克隆矩形对象
         * @returns 返回克隆后的矩形
         */
        public clone():Rectangle {
            return new Rectangle(this.x, this.y, this.width, this.height);
        }

        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * 此方法与 Rectangle.contains() 方法类似，只不过它采用 Point 对象作为参数。
         * @param point 包含点对象
         * @returns 如果包含，返回true，否则返回false
         */
        public containsPoint(point:Point):boolean {
            if (this.x < point.x
                && this.x + this.width > point.x
                && this.y < point.y
                && this.y + this.height > point.y) {
                return true;
            }
            return false;
        }

        $getBaseWidth(angle: number): number {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * this.width + v * this.height;
        }

        $getBaseHeight(angle: number): number {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * this.width + u * this.height;
        }
    }
}