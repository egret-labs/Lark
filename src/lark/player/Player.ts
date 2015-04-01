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
     * Lark播放器
     */
    export class Player extends HashObject {

        /**
         * 实例化一个播放器对象。
         */
        public constructor(renderer:IRenderer, stage:Stage, entryClassName:string) {
            super();
            if (DEBUG&&!renderer) {
                $error(1003,"renderer");
            }
            this.renderer = renderer;
            this.entryClassName = entryClassName;
            this.stage = stage;
        }

        private renderer:IRenderer;
        /**
         * 入口类的完整类名
         */
        private entryClassName:string;
        /**
         * 舞台引用
         */
        private stage:Stage;
        /**
         * 入口类实例
         */
        private root:DisplayObject;

        private isPlaying:boolean = false;

        /**
         * 启动播放器
         */
        public start():void {
            if (this.isPlaying || !this.renderer) {
                return;
            }
            this.isPlaying = true;
            if (!this.root) {
                this.initialize();
            }
            Ticker.$instance.$addPlayer(this);
        }

        private initialize():void {
            var rootClass;
            if (this.entryClassName) {
                rootClass = lark.getDefinitionByName(this.entryClassName);
            }
            if (rootClass) {
                var rootContainer:any = new rootClass();
                this.root = rootContainer;
                if (rootContainer instanceof lark.DisplayObject) {
                    this.stage.addChild(rootContainer);
                }
                else {
                    DEBUG&&$error(1002,this.entryClassName);
                }
            }
            else {
                DEBUG&&$error(1001,this.entryClassName);
            }
        }

        /**
         * 停止播放器，停止后将不能重新启动。
         */
        public stop():void {
            this.pause();
            this.renderer = null;
        }

        /**
         * 暂停播放器，后续可以通过调用start()重新启动播放器。
         */
        public pause():void {
            if (!this.isPlaying) {
                return;
            }
            this.isPlaying = false;
            Ticker.$instance.$removePlayer(this);
        }

        /**
         * 渲染屏幕
         */
        $render(triggerByFrame:boolean):void {
            var t = lark.getTimer();
            this.computeDirtyRects();
            var t1 = lark.getTimer();
            this.drawCalls = 0;
            if (this.dirtyRatio > 0) {
                var cleanAll:boolean = (this.dirtyRatio > this.stage.$dirtyRatio) || this.stageSizeChangedFlag;
                this.drawDisplayList(cleanAll);
                var t2 = lark.getTimer();
            }
            else {
                t2 = t1;
            }

            if (triggerByFrame) {
                FPS.update(this.drawCalls, this.dirtyRatio, t1 - t, t2 - t1);
            }
        }

        private renderNodeList:RenderNode[] = [];

        private dirtyRectList:Region[] = [];

        private dirtyRatio:number = 0;

        private drawCalls:number = 0;

        private dirtyRegion:DirtyRegion;

        private computeDirtyRects():void {
            var dirtyRegion = this.dirtyRegion;
            var nodeList = this.stage.$dirtyRenderNodes;
            for (var i in nodeList) {
                var node = nodeList[i];
                if (!node.outOfScreen && node.alpha !== 0) {
                    node.isDirty = true;
                    dirtyRegion.addDirtyRegion(node.minX, node.minY, node.maxX, node.maxY);
                }
                node.update();
                if (node.moved && !node.outOfScreen && node.alpha !== 0) {
                    node.isDirty = true;
                    dirtyRegion.addDirtyRegion(node.minX, node.minY, node.maxX, node.maxY);
                }
            }
            var dirtyRectList:Region[] = this.dirtyRectList;
            dirtyRectList.length = 0;
            dirtyRegion.gatherOptimizedRegions(dirtyRectList);
            this.dirtyRatio = dirtyRegion.dirtyRatio;
        }

        /**
         * 同步显示列表。
         */
        private drawDisplayList(cleanAll:boolean):void {
            if (cleanAll) {
                this.renderer.clearScreen();
            }
            else{
                this.renderer.drawDirtyRects(this.dirtyRectList);
            }

            var stage = this.stage;
            var dirtyRectList = this.dirtyRectList;
            var renderer = this.renderer;
            if (this.stage.$displayListTreeChanged) {
                var nodeList:RenderNode[] = [];
                this.visitDisplayList(this.stage, nodeList, dirtyRectList, renderer, cleanAll);
                this.renderNodeList = nodeList;
            }
            else {
                var renderList = this.renderNodeList;
                var length = renderList.length;
                for (var i = 0; i < length; i++) {
                    this.checkRenderNode(renderList[i], dirtyRectList, renderer, cleanAll);
                }
            }
            if (cleanAll) {
                this.stageSizeChangedFlag = false;
            }
            else {
                this.renderer.removeDirtyRects();
            }
            this.dirtyRegion.clear();
            stage.$dirtyRenderNodes = {};
            stage.$displayListTreeChanged = false;
        }

        private visitDisplayList(displayObject:DisplayObject, nodeList:RenderNode[], dirtyRectList:Region[], renderer:IRenderer, cleanAll:boolean):void {
            if (!displayObject.$hasFlags(DisplayObjectFlags.Visible)) {
                return;
            }
            var node = displayObject.$renderNode;
            if (node) {
                nodeList.push(node);
                this.checkRenderNode(node, dirtyRectList, renderer, cleanAll);
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    this.visitDisplayList(child, nodeList, dirtyRectList, renderer, cleanAll);
                }
            }
        }

        /**
         * 检查一个渲染节点是否需要绘制
         */
        private checkRenderNode(node:RenderNode, dirtyRectList:Region[], renderer:IRenderer, cleanAll:boolean):void {
            if (node.outOfScreen || node.alpha === 0) {
                return;
            }
            if (!cleanAll && !node.isDirty) {
                for (var j = dirtyRectList.length - 1; j >= 0; j--) {
                    var region = dirtyRectList[j];
                    if (node.intersects(region.minX, region.minY, region.maxX, region.maxY)) {
                        node.isDirty = true;
                        break;
                    }
                }
            }
            if (cleanAll || node.isDirty) {
                this.drawCalls++;
                node.render(renderer);
                node.finish();
            }
        }

        /**
         * 舞台尺寸发生改变的标志
         */
        private stageSizeChangedFlag:boolean = false;

        /**
         * 更新舞台尺寸
         * @param stageWidth 舞台宽度（以像素为单位）
         * @param stageHeight 舞台高度（以像素为单位）
         */
        public updateStageSize(stageWidth:number, stageHeight:number):void {
            var stage = this.stage;
            if (stageWidth !== stage.$stageWidth || stageHeight !== stage.$stageHeight) {
                stage.$stageWidth = stageWidth;
                stage.$stageHeight = stageHeight;
                this.dirtyRegion = new DirtyRegion(stageWidth, stageHeight);
                this.stageSizeChangedFlag = true;
                var renderList = this.renderNodeList;
                var length = renderList.length;
                for (var i = 0; i < length; i++) {
                    var node = renderList[i];
                    node.outOfScreen = !node.intersects(0, 0, stageWidth, stageHeight);
                }
                stage.emitWith(Event.RESIZE);
            }
        }
    }
}