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

    var displayListPool:DisplayList[] = [];

    var blendModes = ["source-over","lighter","destination-out"];

    /**
     * 显示列表
     */
    export class DisplayList extends HashObject implements Renderable {

        /**
         * 释放一个DisplayList实例到对象池
         */
        public static release(displayList:DisplayList):void {
            surfaceFactory.release(displayList.surface);
            displayList.surface = null;
            displayList.renderContext = null;
            displayList.root = null;
            displayList.$renderMatrix = null;
            displayList.needRedraw = false;
            displayList.$isDirty = false;
            displayListPool.push(displayList);
        }

        /**
         * 从对象池中取出或创建一个新的DisplayList对象。
         */
        public static create(target:DisplayObject):DisplayList {
            var displayList = displayListPool.pop();
            if (!displayList) {
                displayList = new lark.player.DisplayList(target);
            }
            var surface = surfaceFactory.create();
            if (!surface) {
                return null;
            }
            displayList.surface = surface;
            displayList.renderContext = surface.renderContext;
            return displayList;
        }


        /**
         * 创建一个DisplayList对象
         */
        public constructor(root:DisplayObject) {
            super();
            this.root = root;
        }

        /**
         * 是否需要重绘
         */
        $isDirty:boolean = false;
        /**
         * 在舞台上的透明度
         */
        $renderAlpha:number = 1;
        /**
         * 在舞台上的矩阵对象
         */
        $renderMatrix:Matrix;
        /**
         * 在舞台上的显示区域
         */
        $renderRegion:Region = new Region();

        /**
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         */
        $update():boolean {
            var target = this.root;
            target.$removeFlagsUp(DisplayObjectFlags.Dirty);
            this.$renderAlpha = target.$getConcatenatedAlpha();
            this.$renderMatrix = target.$getConcatenatedMatrix();
            var bounds = target.$getOriginalBounds();
            if (this.needRedraw) {
                this.updateDirtyRegions();
            }
            if (!target.$stage) {
                return false;
            }
            var region = this.$renderRegion;
            if (!region.moved) {
                return false;
            }
            region.moved = false;
            region.updateRegion(bounds, this.$renderMatrix);
            return true;
        }

        /**
         * 呈现绘制结果的目标画布
         */
        public surface:Surface = null;
        public offsetX:number = 0;
        public offsetY:number = 0;

        $render(context:RenderContext):void {
            var data = this.surface;
            if (data) {
                context.drawImage(data, this.offsetX, this.offsetY);
            }
        }

        /**
         * 显示列表根节点
         */
        public root:DisplayObject;

        public needRedraw:boolean = false;

        private drawToStage:boolean = false;

        /**
         * 绘图上下文
         */
        public renderContext:RenderContext;

        /**
         * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
         */
        public setClipRect(width:number, height:number):void {
            this.dirtyRegion.setClipRect(width, height);
            this.drawToStage = true;//只有舞台画布才能设置ClipRect
            var surface = this.renderContext.surface;
            surface.width = width;
            surface.height = height;
            this.surface = surface;
        }

        /**
         * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
         */
        private dirtyNodes:any = {};

        private dirtyNodeList:Renderable[] = [];

        /**
         * 标记一个节点需要重新渲染
         */
        public markDirty(node:Renderable):void {
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

        private dirtyList:Region[] = null;

        private dirtyRegion:DirtyRegion = new DirtyRegion();

        /**
         * 更新节点属性并返回脏矩形列表。
         */
        public updateDirtyRegions():Region[] {
            var nodeList = this.dirtyNodeList;
            this.dirtyNodeList = [];
            this.dirtyNodes = {};
            var dirtyRegion = this.dirtyRegion;
            var length = nodeList.length;
            for (var i = 0; i < length; i++) {
                var node = nodeList[i];
                var region = node.$renderRegion;
                if (node.$renderAlpha > 0) {
                    if (dirtyRegion.addRegion(region)) {
                        node.$isDirty = true;
                    }
                }
                var moved = node.$update();
                if (moved && node.$renderAlpha > 0) {
                    if (dirtyRegion.addRegion(region)) {
                        node.$isDirty = true;
                    }
                }
            }
            this.dirtyList = dirtyRegion.getDirtyRegions();
            return this.dirtyList;
        }

        /**
         * 绘制根节点显示对象到目标画布，返回draw的次数。
         */
        public drawToSurface():number {
            if (!this.drawToStage) {//对非舞台画布要根据目标显示对象尺寸改变而改变。
                this.changeSurfaceSize();
            }
            var context = this.renderContext;
            //绘制脏矩形区域
            context.save();
            context.beginPath();
            var dirtyList = this.dirtyList;
            this.dirtyList = null;
            var length = dirtyList.length;
            for (var i = 0; i < length; i++) {
                var region = dirtyList[i];
                context.clearRect(region.minX, region.minY, region.width, region.height);
                context.rect(region.minX, region.minY, region.width, region.height);
            }
            context.clip();
            //绘制显示对象
            var drawCalls = this.drawDisplayObject(this.root, context, dirtyList, this.drawToStage, null, null);
            //清除脏矩形区域
            context.restore();
            this.dirtyRegion.clear();
            this.needRedraw = false;
            return drawCalls;
        }

        /**
         * 绘制一个显示对象
         */
        private drawDisplayObject(displayObject:DisplayObject, context:RenderContext, dirtyList:lark.player.Region[],
                                  drawToStage:boolean, displayList:DisplayList, clipRegion:Region):number {
            var drawCalls = 0;
            var node:Renderable;
            var globalAlpha:number;
            if (displayList) {
                if (displayList.needRedraw) {
                    drawCalls += displayList.drawToSurface();
                }
                node = displayList;
                globalAlpha = 1;//这里不用读取displayList.$renderAlpha,因为它已经绘制到了displayList.surface的内部。
            }
            else if (displayObject.$renderRegion) {
                node = displayObject;
                globalAlpha = displayObject.$renderAlpha;
            }
            if (node) {
                var renderRegion = node.$renderRegion;
                if (clipRegion && !clipRegion.intersects(renderRegion)) {
                    node.$isDirty = false;
                }
                else if (!node.$isDirty) {
                    var l = dirtyList.length;
                    for (var j = 0; j < l; j++) {
                        if (renderRegion.intersects(dirtyList[j])) {
                            node.$isDirty = true;
                            break;
                        }
                    }
                }
                if (node.$isDirty) {
                    drawCalls++;
                    context.globalAlpha = globalAlpha;
                    var compositeOp = blendModes[displayObject.$blendMode];
                    if(!compositeOp){
                        compositeOp = "source-over";
                    }
                    context.globalCompositeOperation = compositeOp;
                    var m = node.$renderMatrix.$data;
                    if (drawToStage) {//绘制到舞台上时，所有矩阵都是绝对的，不需要调用transform()叠加。
                        context.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
                        node.$render(context);
                    }
                    else {
                        context.save();
                        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                        node.$render(context);
                        context.restore();
                    }
                    node.$isDirty = false;
                }
            }
            if (displayList) {
                return drawCalls;
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (!child.$visible||child.$alpha<=0||child.$maskedObject) {
                        continue;
                    }
                    if (child.$scrollRect||child.$mask) {
                        drawCalls += this.drawWidthClip(child, context, dirtyList, drawToStage,clipRegion);
                    }
                    else {
                        drawCalls += this.drawDisplayObject(child, context, dirtyList, drawToStage, child.$displayList, clipRegion);
                    }
                }
            }
            return drawCalls;
        }

        private drawWidthClip(displayObject:DisplayObject, context:RenderContext, dirtyList:lark.player.Region[],
                              drawToStage:boolean,clipRegion:Region):number {
            var drawCalls = 0;
            var scrollRect = displayObject.$scrollRect;
            var mask = displayObject.$mask;

            //计算scrollRect和mask的clip区域是否需要绘制，不需要就直接返回，跳过所有子项的遍历。
            var maskRegion:Region;
            var displayMatrix = displayObject.$getConcatenatedMatrix();
            if(mask){
                var bounds = mask.$getOriginalBounds();
                if(!bounds.isEmpty()){
                    maskRegion = Region.create();
                    maskRegion.updateRegion(bounds,mask.$getConcatenatedMatrix());
                }
            }
            var region:Region;
            if(scrollRect&&!scrollRect.isEmpty()){
                region = Region.create();
                region.updateRegion(scrollRect, displayMatrix);
            }
            if(!region&&!maskRegion){
                return drawCalls;
            }
            if(region&&maskRegion){
                region.intersect(maskRegion);
                Region.release(maskRegion);
            }
            else if(!region){
                region = maskRegion;
            }

            if(region.isEmpty()||(clipRegion&&!clipRegion.intersects(region))){
                Region.release(region);
                return drawCalls;
            }
            var found = false;
            var l = dirtyList.length;
            for (var j = 0; j < l; j++) {
                if (region.intersects(dirtyList[j])) {
                    found = true;
                    break;
                }
            }
            if(!found){
                Region.release(region);
                return drawCalls;
            }

            var surfaceWidth = Math.max(257,region.width);
            var surfaceHeight = Math.max(257,region.height);
            //绘制显示对象自身，若有scrollRect，应用clip
            var displayContext = sharedRenderContexts[1];
            displayContext.surface.width = surfaceWidth;
            displayContext.surface.height = surfaceHeight;

            if(scrollRect){
                var m = displayMatrix.$data;
                displayContext.setTransform(m[0], m[1], m[2], m[3], m[4]-region.minX, m[5]-region.minY);
                displayContext.beginPath();
                displayContext.rect(scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
                displayContext.clip();
            }
            displayContext.setTransform(1,0,0,1,-region.minX,-region.minY);
            drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, false, displayObject.$displayList, region);
            //绘制遮罩
            if(mask){
                var maskContext = sharedRenderContexts[2];
                maskContext.surface.width = surfaceWidth;
                maskContext.surface.height = surfaceHeight;
                maskContext.setTransform(1,0,0,1,-region.minX,-region.minY);
                var calls = this.drawDisplayObject(mask, maskContext, dirtyList, false, mask.$displayList, region);
                if(calls>0){
                    drawCalls += calls;
                    displayContext.globalCompositeOperation = "destination-in";
                    displayContext.setTransform(1,0,0,1,0,0);
                    displayContext.globalAlpha = 1;
                    displayContext.drawImage(maskContext.surface,0,0);
                }
                maskContext.surface.width = 1;
                maskContext.surface.height = 1;
            }


            //绘制结果到屏幕
            if(drawCalls>0){
                drawCalls++;
                if (drawToStage) {//绘制到舞台上时，所有矩阵都是绝对的，不需要调用transform()叠加。
                    context.setTransform(1, 0, 0, 1, region.minX, region.minY);
                    context.drawImage(displayContext.surface,0,0);
                }
                else {
                    context.save();
                    context.translate(region.minX, region.minY)
                    context.drawImage(displayContext.surface,0,0);
                    context.restore();
                }
            }
            displayContext.surface.width = 1;
            displayContext.surface.height = 1;
            Region.release(region);
            return drawCalls;
        }

        private sizeChanged:boolean = false;

        /**
         * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
         */
        public changeSurfaceSize():void {
            var root = this.root;
            var oldOffsetX = this.offsetX;
            var oldOffsetY = this.offsetY;
            var bounds = this.root.$getOriginalBounds();
            this.offsetX = bounds.x;
            this.offsetY = bounds.y;
            var oldContext = this.renderContext;
            var oldSurface = oldContext.surface;
            if (!this.sizeChanged) {
                this.sizeChanged = true;
                oldSurface.width = bounds.width;
                oldSurface.height = bounds.height;
            }
            else if (bounds.width !== oldSurface.width || bounds.height !== oldSurface.height) {
                var newContext = player.sharedRenderContexts[0];
                var newSurface = newContext.surface;
                player.sharedRenderContexts[0] = oldContext;
                this.renderContext = newContext;
                this.surface = newSurface;
                newSurface.width = bounds.width;
                newSurface.height = bounds.height;
                if (oldSurface.width !== 0 && oldSurface.height !== 0) {
                    newContext.setTransform(1, 0, 0, 1, 0, 0);
                    newContext.drawImage(oldSurface, oldOffsetX - bounds.x, oldOffsetY - bounds.y);
                }
                oldSurface.height = 1;
                oldSurface.width = 1;
            }
            var m = root.$getInvertedConcatenatedMatrix().$data;
            this.renderContext.setTransform(m[0], m[1], m[2], m[3], m[4] - bounds.x, m[5] - bounds.y);
        }

    }
}