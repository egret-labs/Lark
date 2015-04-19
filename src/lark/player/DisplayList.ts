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

    export var $displayListPool:IDisplayListPool;

    export class DisplayList extends HashObject implements IRenderable {

        public constructor(root:DisplayObject) {
            super();
            this.root = root;
        }

        $drawed:boolean = false;
        /**
         * 在舞台上的透明度
         */
        $stageAlpha:number = 1;
        /**
         * 在舞台上的矩阵对象
         */
        $stageMatrix:Matrix;
        /**
         * 在舞台上的显示区域
         */
        $stageRegion:Region = new Region();
        /**
         * 显示列表根节点
         */
        public root:DisplayObject;
        /**
         * 目标显示对象的测量边界
         */
        public bounds:Rectangle = null;

        public moved:boolean = false;
        /**
         * 是否需要重绘
         */
        $isDirty:boolean = false;

        /**
         * 要绘制的纹理
         */
        public bitmapData:BitmapData = null;

        public offsetX:number = 0;

        public offsetY:number = 0;

        public needRedraw:boolean = false;

        public renderContext:RenderContext;
        /**
         * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
         */
        private dirtyNodes:any = {};

        private dirtyNodeList:IRenderable[] = [];

        public dirtyList:Region[] = null;

        private dirtyRegion:DirtyRegion = new DirtyRegion();

        public hasClipRect:boolean = false;

        /**
         * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
         */
        public setClipRect(width:number, height:number):void {
            this.dirtyRegion.setClipRect(width, height);
            this.hasClipRect = true;
            var surface = this.renderContext.surface;
            surface.width = width;
            surface.height = height;
            this.bitmapData = surface;
        }

        public markDirty(node:IRenderable):void {
            var key = node.$hashCode;
            if (this.dirtyNodes[key]) {
                return;
            }
            this.dirtyNodes[key] = true;
            this.dirtyNodeList.push(node);
            if (!this.needRedraw) {
                this.needRedraw = true;
                var parentCache = this.root.$parentDisplayList;
                if (parentCache) {
                    parentCache.markDirty(this);
                }
            }
        }

        /**
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         */
        $update():boolean {
            var target = this.root;
            target.$removeFlagsUp(DisplayObjectFlags.Dirty);
            this.$stageAlpha = target.$getConcatenatedAlpha();
            this.$stageMatrix = target.$getConcatenatedMatrix();
            this.bounds = target.$getOriginalBounds();
            if (this.needRedraw) {
                this.updateDirtyNodes();
            }
            if (!this.moved) {
                return false;
            }
            if (!target.$stage) {
                return false;
            }
            this.$stageRegion.transformBounds(this.bounds, this.$stageMatrix);
            return true;
        }

        public updateDirtyNodes():Region[] {
            var nodeList = this.dirtyNodeList;
            this.dirtyNodeList = [];
            this.dirtyNodes = {};
            var dirtyRegion = this.dirtyRegion;
            var length = nodeList.length;
            for (var i = 0; i < length; i++) {
                var node = nodeList[i];
                var region = node.$stageRegion;
                if (node.$stageAlpha !== 0) {
                    if (dirtyRegion.addRegion(region.minX, region.minY, region.maxX, region.maxY)) {
                        node.$isDirty = true;
                    }
                }
                var moved = node.$update();
                if (moved && node.$stageAlpha !== 0) {
                    if (dirtyRegion.addRegion(region.minX, region.minY, region.maxX, region.maxY)) {
                        node.$isDirty = true;
                    }
                }
            }
            this.dirtyList = dirtyRegion.getDirtyRegions();
            return this.dirtyList;
        }

        $render(context:RenderContext):void {
            var data = this.bitmapData;
            if (data) {
                context.drawImage(data, this.offsetX, this.offsetY);
            }
        }

        /**
         * 准备开始重绘
         */
        public prepare():void {
            if (this.hasClipRect) {
                return;
            }
            $displayListPool.prepare(this);
        }

        /**
         * 结束重绘,清理缓存。
         */
        public finish():void {
            this.dirtyRegion.clear();
            this.dirtyList = null;
            this.needRedraw = false;
        }
    }
}