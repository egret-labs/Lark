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

    export class DirtyRegion {

        private grid:Region[][];
        private w:number;
        private h:number;
        private c:number;
        private r:number;
        private size:number;
        private sizeInBits:number;

        constructor(w, h, sizeInBits = 7) {
            var size = this.size = 1 << sizeInBits;
            this.sizeInBits = sizeInBits;
            this.w = w;
            this.h = h;
            this.c = Math.ceil(w / size);
            this.r = Math.ceil(h / size);
            this.grid = [];
            for (var x = 0; x < this.c; x++) {
                this.grid.push([]);
                for (var y = 0; y < this.r; y++) {
                    this.grid[x][y] = new Region(x * size, y * size, size);
                }
            }
        }

        clear() {
            for (var x = 0; x < this.c; x++) {
                for (var y = 0; y < this.r; y++) {
                    this.grid[x][y].clear();
                }
            }
        }


        public addDirtyRegion(minX:number, minY:number, maxX:number, maxY:number):void {
            if (minX >= maxX || minY >= maxY) {
                return;
            }
            if (minX < 0) {
                minX = 0;
            }
            if (minY < 0) {
                minY = 0;
            }
            if (maxX > this.w) {
                maxX = this.w;
            }
            if (maxY > this.h) {
                maxY = this.h;
            }
            var startX = minX >> this.sizeInBits;
            var startY = minY >> this.sizeInBits;
            var endX = Math.ceil(maxX / this.size);
            var endY = Math.ceil(maxY / this.size);
            var grid = this.grid;
            for (var x = startX; x < endX; x++) {
                for (var y = startY; y < endY; y++) {
                    var region = grid[x][y];
                    region.union(minX, minY, maxX, maxY);
                }
            }
        }

        public dirtyRatio:number = 0;

        gatherRegions(regions:Region[]) {
            var areas:number = 0;
            for (var x = 0; x < this.c; x++) {
                for (var y = 0; y < this.r; y++) {
                    var region = this.grid[x][y];
                    if (!region.isEmpty()) {
                        regions.push(region);
                        areas += region.area();
                    }
                }
            }
            this.dirtyRatio = areas/(this.w*this.h);
        }

        gatherOptimizedRegions(regions:Region[]) {
            this.gatherRegions(regions);
        }
    }

    export class Region {

        constructor(minX:number, minY:number, size:number) {
            this.minX = this.startX = minX;
            this.minY = this.startY = minY;
            this.maxX = this.endX = minX + size;
            this.maxY = this.endY = minY + size;
        }

        private startX:number;
        private startY:number;
        private endX:number;
        private endY:number;

        public minX:number;
        public minY:number;
        public maxX:number;
        public maxY:number;


        private empty:boolean = false;

        public clear():void {
            this.empty = true;
            this.minX = this.minY = this.maxX = this.maxY = 0;
        }

        public isEmpty():boolean {
            return (this.minX >= this.maxX || this.minY >= this.maxY);
        }

        public area():number {
            return (this.maxX - this.minX) * (this.maxY - this.minY);
        }

        /**
         * 合并另一个矩形到当前矩形内
         */
        public union(targetMinX:number, targetMinY:number, targetMaxX:number, targetMaxY:number):void {

            if (this.startX > targetMinX) {
                targetMinX = this.startX;
            }
            if (this.startY > targetMinY) {
                targetMinY = this.startY;
            }
            if (this.endX < targetMaxX) {
                targetMaxX = this.endX;
            }
            if (this.endY < targetMaxY) {
                targetMaxY = this.endY;
            }

            if (this.empty) {
                this.empty = false;
                this.minX = targetMinX;
                this.maxX = targetMaxX;
                this.minY = targetMinY;
                this.maxY = targetMaxY;
            }

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
        }
    }
}