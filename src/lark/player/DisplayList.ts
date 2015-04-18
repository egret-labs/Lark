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

    export var $displayListPool:IDisplayListPool;

    export class DisplayList extends HashObject implements IRenderable{

        public constructor(root:DisplayObject) {
            super();
            this.root = root;
        }

        /**
         * 在屏幕上的透明度
         */
        $alpha:number = 1;
        /**
         * 显示列表根节点
         */
        public root:DisplayObject;
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
        $isDirty:boolean = false;
        /**
         * 在屏幕上的矩形区域是否发现改变。
         */
        $moved:boolean = false;

        $stageRegion:Region = new Region();

        /**
         * 要绘制的纹理
         */
        public texture:Texture = null;

        public needRedraw:boolean = false;

        public renderer:IScreenRenderer = null;
        /**
         * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
         */
        private dirtyNodes:any = {};

        private dirtyNodeList:IRenderable[] = [];

        public dirtyList:Region[] = null;

        public dirtyRegion:DirtyRegion = new DirtyRegion();

        public markDirty(node:IRenderable):void {
            var key = node.$hashCode;
            if(this.dirtyNodes[key]){
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

        public updateDirtyNodes():Region[] {
            var nodeList = this.dirtyNodeList;
            this.dirtyNodeList = [];
            this.dirtyNodes = {};
            var dirtyRegion = this.dirtyRegion;
            var length = nodeList.length;
            for (var i=0;i<length;i++) {
                var node = nodeList[i];
                var region = node.$stageRegion;
                if (node.$alpha !== 0) {
                    if(dirtyRegion.addRegion(region.minX, region.minY, region.maxX, region.maxY)){
                        node.$isDirty = true;
                    }
                }
                node.$updateRegion();
                if (node.$moved && node.$alpha !== 0) {
                    if(dirtyRegion.addRegion(region.minX, region.minY, region.maxX, region.maxY)){
                        node.$isDirty = true;
                    }
                }
            }
            this.dirtyList = dirtyRegion.getDirtyRegions();
            return this.dirtyList;
        }

        /**
         * 更新对象在舞台上的显示区域
         */
        $updateRegion():void {
            var target = this.root;
            target.$removeFlagsUp(DisplayObjectFlags.Dirty);
            this.matrix = target.$getConcatenatedMatrix();
            this.bounds = target.$getOriginalBounds();
            this.updateBounds();
            if (this.needRedraw) {
                this.updateDirtyNodes();
            }
        }

        private updateBounds():void{
            var stage = this.root.$stage;
            if (!stage) {
                this.$finish();
                return;
            }
            if (!this.$moved) {
                return;
            }
            var bounds = TempBounds.copyFrom(this.bounds);
            var matrix = this.matrix;
            var m = matrix.$data;
            //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
            if(m[0]===1.0&&m[1]===0.0&&m[2]===0.0&&m[3]===1.0){
                bounds.x += m[4];
                bounds.y += m[5];
            }
            else{
                matrix.$transformBounds(bounds);
            }
            this.$stageRegion.setTo(bounds.x|0,bounds.y|0,Math.ceil(bounds.x + bounds.width),Math.ceil(bounds.y + bounds.height));
        }

        $render(context:IRenderer):void{
            var texture = this.texture;
            if (texture) {
                context.drawImage(texture, this.matrix, this.$alpha);
            }
        }
        /**
         * 渲染结束，已经绘制到屏幕
         */
        $finish():void {
            this.$isDirty = false;
            this.$moved = false;
        }
        /**
         * 结束重绘,清理缓存。
         */
        public cleanCache():void {
            this.dirtyRegion.clear();
            this.dirtyList = null;
            this.needRedraw = false;
        }
    }
}