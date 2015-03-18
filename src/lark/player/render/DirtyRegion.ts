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

        private grid:Cell [][];
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
            for (var y = 0; y < this.r; y++) {
                this.grid.push([]);
                for (var x = 0; x < this.c; x++) {
                    this.grid[y][x] = new Cell(new Rectangle(x * size, y * size, size, size));
                }
            }
        }

        clear() {
            this.dirtyRects = [];
            for (var y = 0; y < this.r; y++) {
                for (var x = 0; x < this.c; x++) {
                    this.grid[y][x].clear();
                }
            }
        }

        private dirtyRects:Rectangle[] = [];

        public addDirtyRectangle(rectangle:Rectangle) {
            if(rectangle.isEmpty()){
                return;
            }
            this.dirtyRects.push(rectangle.clone());
        }

        private doAddDirtyRectangle(rectangle:Rectangle) {

            var x = rectangle.x >> this.sizeInBits;
            var y = rectangle.y >> this.sizeInBits;
            if (x >= this.c || y >= this.r) {
                return;
            }
            if (x < 0) {
                x = 0;
            }
            if (y < 0) {
                y = 0;
            }
            var cell = this.grid[y][x];
            rectangle = rectangle.clone();
            rectangle.$snap();

            if (cell.region.$containsRect(rectangle)) {
                if (cell.bounds.isEmpty()) {
                    cell.bounds.copyFrom(rectangle)
                } else if (!cell.bounds.$containsRect(rectangle)) {
                    cell.bounds.$union(rectangle);
                }
            } else {
                var w = Math.min(this.c, Math.ceil((rectangle.x + rectangle.width) / this.size)) - x;
                var h = Math.min(this.r, Math.ceil((rectangle.y + rectangle.height) / this.size)) - y;
                for (var i = 0; i < w; i++) {
                    for (var j = 0; j < h; j++) {
                        var cell = this.grid[y + j][x + i];
                        var intersection = cell.region.clone();
                        intersection.$intersect(rectangle);
                        if (!intersection.isEmpty()) {
                            this.doAddDirtyRectangle(intersection);
                        }
                    }
                }
            }
        }

        gatherRegions(regions:Rectangle[]) {
            for (var y = 0; y < this.r; y++) {
                for (var x = 0; x < this.c; x++) {
                    var bounds = this.grid[y][x].bounds;
                    if (!bounds.isEmpty()) {
                        regions.push(this.grid[y][x].bounds);
                    }
                }
            }
        }

        gatherOptimizedRegions(regions:Rectangle[]) {
            var list = this.dirtyRects;
            var length = list.length;
            for(var i=0;i<length;i++){
                this.doAddDirtyRectangle(list[i]);
            }
            this.gatherRegions(regions);
        }
    }

    class Cell {
        region: Rectangle;
        bounds: Rectangle;
        constructor(region: Rectangle) {
            this.region = region;
            this.bounds = region.clone();
        }
        clear () {
            this.bounds.setEmpty();
        }
    }
}