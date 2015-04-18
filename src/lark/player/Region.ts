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

    export class Region {

        public minX:number = 0;
        public minY:number = 0;
        public maxX:number = 0;
        public maxY:number = 0;

        public width:number = 0;
        public height:number = 0;
        public area:number = 0;

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

        public transformBounds(contentBounds:Rectangle,matrix:Matrix):void{
            var bounds = TempBounds.copyFrom(contentBounds);
            var m = matrix.$data;
            //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
            if(m[0]===1.0&&m[1]===0.0&&m[2]===0.0&&m[3]===1.0){
                bounds.x += m[4];
                bounds.y += m[5];
            }
            else{
                matrix.$transformBounds(bounds);
            }
            this.setTo(bounds.x|0,bounds.y|0,Math.ceil(bounds.x + bounds.width),Math.ceil(bounds.y + bounds.height));
        }
    }
}

