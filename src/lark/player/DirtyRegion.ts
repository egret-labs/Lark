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
     * 脏矩形计算工具类
     */
    export class DirtyRegion {

        public constructor() {
            this.regionList = [new Region(), new Region(), new Region()];
        }

        private regionList:Region[];
        private dirtyList:Region[] = [];
        private clipRect:boolean = false;
        private screenWidth:number = 0;
        private screenHeight:number = 0;
        private screenChanged:boolean = false;

        public updateClipRect(width:number, height:number):void {
            this.clipRect = true;
            this.screenChanged = true;
            this.screenWidth = width;
            this.screenHeight = height;
        }

        /**
         * 添加一个脏矩形区域，返回是否添加成功，当矩形为空或者在屏幕之外时返回false。
         */
        public addRegion(minX:number, minY:number, maxX:number, maxY:number):boolean {
            if (this.clipRect) {
                if (minX < 0) {
                    minX = 0;
                }
                if (minY < 0) {
                    minY = 0;
                }
                if (maxX > this.screenWidth) {
                    maxX = this.screenWidth;
                }
                if (maxY > this.screenHeight) {
                    maxY = this.screenHeight;
                }
            }
            var targetArea = (maxX - minX) * (maxY - minY);
            if (targetArea <= 0) {
                return false;
            }
            if (this.screenChanged) {
                return true;
            }
            var dirtyList = this.dirtyList;
            var length = dirtyList.length;
            var merged = false;
            if (length > 0) {
                var bestDelta = length >= 3 ? Number.POSITIVE_INFINITY : 0;
                var targetIndex = -1;
                for (var i = 0; i < length; i++) {
                    var r = dirtyList[i];
                    var xMin = minX < r.minX ? minX : r.minX;
                    var yMin = minX < r.minY ? minX : r.minY;
                    var xMax = maxX > r.maxX ? maxX : r.maxX;
                    var yMax = maxY > r.maxY ? maxY : r.maxY;
                    var delta = (xMax - xMin) * (yMax - yMin) - targetArea - r.area;
                    if (delta < bestDelta) {
                        bestDelta = delta;
                        targetIndex = i;
                    }
                }
                if (targetIndex !== -1) {
                    dirtyList[targetIndex].union(minX, minY, maxX, maxY);
                    merged = true;
                }
            }
            if (!merged) {
                var region:Region = this.regionList.pop();
                dirtyList.push(region.setTo(minX, minY, maxX, maxY));
            }
            return true;
        }

        public clear():void {
            var dirtyList = this.dirtyList;
            var length = dirtyList.length;
            for (var i = 0; i < length; i++) {
                this.regionList.push(dirtyList[i]);
            }
            dirtyList.length = 0;
        }

        /**
         * 获取最终的脏矩形列表
         */
        public getDirtyRegions():Region[] {
            var dirtyList = this.dirtyList;
            if (this.screenChanged) {
                this.screenChanged = false;
                var region:Region = this.regionList.pop();
                dirtyList.push(region.setTo(0, 0, this.screenWidth, this.screenHeight));
            }
            else {
                while (this.mergeDirtyList(dirtyList)) {
                }
                //将所有相交的矩形变成不相交的
                var length = dirtyList.length;
                for (var i = 0; i < length - 1; i++) {
                    for (var j = i + 1; j < length; j++) {
                        var regionA = dirtyList[i];
                        var regionB = dirtyList[j];
                        if (regionA.intersects(regionB)) {
                            this.decomposeRegion(regionA, regionB);
                        }
                    }
                }
            }
            return this.dirtyList;
        }

        private decomposeRegion(r1:Region, r2:Region):void {
            if (r1.minY < r2.minY) {
                re0.minY = r1.minY;
                re0.maxY = r2.minY;
                re0.minX = r1.minX;
                re0.maxX = r1.maxX;
            } else {
                re0.minY = r2.minY;
                re0.maxY = r1.minY;
                re0.minX = r2.minX;
                re0.maxX = r2.maxX;
            }
            if (r1.maxY < r2.maxY) {
                re2.minY = r1.maxY;
                re2.maxY = r2.maxY;
                re2.minX = r2.minX;
                re2.maxX = r2.maxX;
            } else {
                re2.minY = r2.maxY;
                re2.maxY = r1.maxY;
                re2.minX = r1.minX;
                re2.maxX = r1.maxX;
            }
            re1.minY = re0.maxY;
            re1.maxY = re2.minY;
            re1.minX = r1.minX < r2.minX ? r1.minX : r2.minX;
            re1.maxX = r1.maxX > r2.maxX ? r1.maxX : r2.maxX;

            re0.updateArea();
            re1.updateArea();
            re2.updateArea();

            var delta0 = this.unionArea(re0, re1) - re0.area - re1.area;
            var delta1 = this.unionArea(re1, re2) - re1.area - re2.area;
            if (delta0 < delta1) {
                re0.unionFrom(re1);
                r1.copyFrom(re0);
                r2.copyFrom(re2);
            }
            else {
                r1.copyFrom(re0);
                re2.unionFrom(re1);
                r2.copyFrom(re2);
            }
        }

        /**
         * 合并脏矩形列表
         */
        private mergeDirtyList(dirtyList:Region[]):boolean {
            var length = dirtyList.length;
            if (length < 2) {
                return false;
            }
            var bestDelta = 0;
            var mergeA = 0;
            var mergeB = 0;
            for (var i = 0; i < length - 1; i++) {
                for (var j = i + 1; j < length; j++) {
                    var regionA = dirtyList[i];
                    var regionB = dirtyList[j];
                    var delta = this.unionArea(regionA, regionB) - regionA.area - regionB.area;
                    if (bestDelta > delta) {
                        mergeA = i;
                        mergeB = j;
                        bestDelta = delta;
                    }
                }
            }
            if (mergeA != mergeB) {
                var region = dirtyList[mergeB];
                dirtyList[mergeA].unionFrom(region);
                this.regionList.push(region);
                dirtyList.splice(mergeB, 1);
                return true;
            }
            return false;
        }

        private unionArea(r1:Region, r2:Region):number {
            var minX = r1.minX < r2.minX ? r1.minX : r2.minX;
            var minY = r1.minX < r2.minY ? r1.minX : r2.minY;
            var maxX = r1.maxX > r2.maxX ? r1.maxX : r2.maxX;
            var maxY = r1.maxY > r2.maxY ? r1.maxY : r2.maxY;
            return (maxX - minX) * (maxY - minY);
        }
    }

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

        public copyFrom(target:Region):void {
            this.setTo(target.minX, target.minY, target.maxX, target.maxY);
        }

        public updateArea():void {
            this.width = this.maxX - this.minX;
            this.height = this.maxY - this.minY;
            this.area = this.width * this.height;
        }

        public unionFrom(target:Region):void {
            this.union(target.minX, target.minY, target.maxX, target.maxY);
        }

        public union(targetMinX:number, targetMinY:number, targetMaxX:number, targetMaxY:number):void {
            if (this.minX > targetMinX) {
                this.minX = targetMinX;
            }
            if (this.minY > targetMinY) {
                this.minY = targetMinY;
            }
            if (this.maxX < targetMaxX) {
                this.maxX = targetMaxX;
            }
            if (this.maxY < targetMaxY) {
                this.maxY = targetMaxY;
            }
            this.updateArea();
        }

        /**
         * 是否与目标矩形相交
         */
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
    }

    var re0 = new Region();
    var re1 = new Region();
    var re2 = new Region();
}