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

    function unionArea(r1:Region, r2:Region):number {
        var minX = r1.minX < r2.minX ? r1.minX : r2.minX;
        var minY = r1.minY < r2.minY ? r1.minY : r2.minY;
        var maxX = r1.maxX > r2.maxX ? r1.maxX : r2.maxX;
        var maxY = r1.maxY > r2.maxY ? r1.maxY : r2.maxY;
        return (maxX - minX) * (maxY - minY);
    }

    /**
     * 脏矩形计算工具类
     */
    export class DirtyRegion {

        public constructor() {
            var list = this.regionList = [];
            while (list.length < 4) {
                list.push(new Region());
            }
        }

        private regionList:Region[];
        private dirtyList:Region[] = [];
        private hasClipRect:boolean = false;
        private clipWidth:number = 0;
        private clipHeight:number = 0;
        private clipRectChanged:boolean = false;

        /**
         * 设置剪裁边界，超过边界的节点将跳过绘制。
         */
        public setClipRect(width:number, height:number):void {
            this.hasClipRect = true;
            this.clipRectChanged = true;
            this.clipWidth = width;
            this.clipHeight = height;
        }

        /**
         * 添加一个脏矩形区域，返回是否添加成功，当矩形为空或者在屏幕之外时返回false。
         */
        public addRegion(minX:number, minY:number, maxX:number, maxY:number):boolean {
            if (this.hasClipRect) {
                if (minX < 0) {
                    minX = 0;
                }
                if (minY < 0) {
                    minY = 0;
                }
                if (maxX > this.clipWidth) {
                    maxX = this.clipWidth;
                }
                if (maxY > this.clipHeight) {
                    maxY = this.clipHeight;
                }
            }
            if (minX >= maxX || minY >= maxY) {
                return false;
            }
            if (this.clipRectChanged) {
                return true;
            }
            var dirtyList = this.dirtyList;
            var region:Region = this.regionList.pop();
            dirtyList.push(region.setTo(minX, minY, maxX, maxY));
            this.mergeDirtyList(dirtyList);
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
            if (this.clipRectChanged) {
                this.clipRectChanged = false;
                var region:Region = this.regionList.pop();
                dirtyList.push(region.setTo(0, 0, this.clipWidth, this.clipHeight));
            }
            else {
                while (this.mergeDirtyList(dirtyList)) {
                }
            }
            return this.dirtyList;
        }

        /**
         * 合并脏矩形列表
         */
        private mergeDirtyList(dirtyList:Region[]):boolean {
            var length = dirtyList.length;
            if (length < 2) {
                return false;
            }
            var bestDelta = length > 3 ? Number.POSITIVE_INFINITY : 0;
            var mergeA = 0;
            var mergeB = 0;
            for (var i = 0; i < length - 1; i++) {
                var regionA = dirtyList[i];
                for (var j = i + 1; j < length; j++) {
                    var regionB = dirtyList[j];
                    var delta = unionArea(regionA, regionB) - regionA.area - regionB.area;
                    if (bestDelta > delta) {
                        mergeA = i;
                        mergeB = j;
                        bestDelta = delta;
                    }
                }
            }
            if (mergeA != mergeB) {
                var region = dirtyList[mergeB];
                dirtyList[mergeA].union(region);
                this.regionList.push(region);
                dirtyList.splice(mergeB, 1);
                return true;
            }
            return false;
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
    }
}