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

    var regionPool:Region[] = [];

    export class Region {

        /**
         * 释放一个DisplayList实例到对象池
         */
        public static release(region:Region):void{
            regionPool.push(region);
        }

        /**
         * 从对象池中取出或创建一个新的DisplayList对象。
         */
        public static create():Region{
            var region = regionPool.pop();
            if(!region){
               region = new Region();
            }
            return region;
        }

        public minX:number = 0;
        public minY:number = 0;
        public maxX:number = 0;
        public maxY:number = 0;

        public width:number = 0;
        public height:number = 0;
        public area:number = 0;

        /**
         * 是否发生移动
         */
        moved:boolean = false;

        public setTo(minX:number, minY:number, maxX:number, maxY:number):Region {
            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
            this.updateArea();
            return this;
        }

        public updateArea():void {
            this.width = this.maxX - this.minX;
            this.height = this.maxY - this.minY;
            this.area = this.width * this.height;
        }

        public union(target:Region):void {
            if (this.minX > target.minX) {
                this.minX = target.minX;
            }
            if (this.minY > target.minY) {
                this.minY = target.minY;
            }
            if (this.maxX < target.maxX) {
                this.maxX = target.maxX;
            }
            if (this.maxY < target.maxY) {
                this.maxY = target.maxY;
            }
            this.updateArea();
        }

        public intersects(target:Region):boolean {
            var max = this.minX > target.minX ? this.minX : target.minX;
            var min = this.maxX < target.maxX ? this.maxX : target.maxX;
            if (max > min) {
                return false;
            }

            max = this.minY > target.minY ? this.minY : target.minY;
            min = this.maxY < target.maxY ? this.maxY : target.maxY;
            return max <= min;
        }

        public updateRegion(bounds:Rectangle, matrix:Matrix):void {
            var m = matrix.$data;
            var a = m[0];
            var b = m[1];
            var c = m[2];
            var d = m[3];
            var tx = m[4];
            var ty = m[5];
            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;
            //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
            if (a === 1.0 && b === 0.0 && c === 0.0 && d === 1.0) {
                this.minX = x + tx;
                this.minY = y + ty;
                this.maxX = xMax + tx;
                this.maxY = yMax + ty;
            }
            else {
                var x0 = a * x + c * y + tx;
                var y0 = b * x + d * y + ty;
                var x1 = a * xMax + c * y + tx;
                var y1 = b * xMax + d * y + ty;
                var x2 = a * xMax + c * yMax + tx;
                var y2 = b * xMax + d * yMax + ty;
                var x3 = a * x + c * yMax + tx;
                var y3 = b * x + d * yMax + ty;

                var tmp = 0;

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

                this.minX = (x0 < x2 ? x0 : x2) | 0;
                this.maxX = Math.ceil(x1 > x3 ? x1 : x3);

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

                this.minY = (y0 < y2 ? y0 : y2) | 0;
                this.maxY = Math.ceil(y1 > y3 ? y1 : y3);
            }
            this.updateArea();
        }
    }
}

