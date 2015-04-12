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

    function visitDisplayList(displayObject:DisplayObject, visitor:(DisplayObject) => boolean):void {
        if (!visitor(displayObject)) {
            return;
        }
        var children = displayObject.$children;
        if (children) {
            var length = children.length;
            for (var i = 0; i < length; i++) {
                visitDisplayList(children[i], visitor);
            }
        }
    }

    /**
     * Lark播放器
     */
    export class Player extends HashObject {

        /**
         * 实例化一个播放器对象。
         */
        public constructor(renderer:IScreenRenderer, stage:Stage, entryClassName:string) {
            super();
            if (DEBUG && !renderer) {
                $error(1003, "renderer");
            }
            this.renderer = renderer;
            this.entryClassName = entryClassName;
            this.stage = stage;
        }

        private renderer:IScreenRenderer;
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
                    DEBUG && $error(1002, this.entryClassName);
                }
            }
            else {
                DEBUG && $error(1001, this.entryClassName);
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

        private dirtyRegion:lark.player.DirtyRegion;

        /**
         * 渲染屏幕
         */
        $render(triggerByFrame:boolean):void {
            var stage = this.stage;
            var t = lark.getTimer();
            this.updateDirtyNodes(stage.$cacheNode.dirtyNodes, this.dirtyRegion);
            var dirtyRegion = this.dirtyRegion;
            if (this.stageSizeChangedFlag) {
                dirtyRegion = null;
                this.stageSizeChangedFlag = false;
            }
            var t1 = lark.getTimer();
            var drawCalls = this.drawDisplayList(this.stage, this.renderer, dirtyRegion);
            this.dirtyRegion.clear();
            stage.$cacheNode.dirtyNodes = {};
            var t2 = lark.getTimer();
            if (triggerByFrame) {
                FPS.update(drawCalls, this.dirtyRegion.dirtyRatio, t1 - t, t2 - t1);
            }
        }

        /**
         * 计算脏矩形区域
         */
        private updateDirtyNodes(nodeList:lark.player.RenderNode[], dirtyRegion:DirtyRegion):void {
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
        }

        /**
         * 绘制显示列表。
         */
        public drawDisplayList(root:DisplayObject, renderer:IScreenRenderer, dirtyRegion:DirtyRegion):number {
            if (dirtyRegion) {
                var dirtyRectList:lark.player.Region[] = [];
                dirtyRegion.gatherOptimizedRegions(dirtyRectList);
                if (dirtyRegion.dirtyRatio > 80) {
                    dirtyRectList = null;
                }
            }
            renderer.reset(root);
            if (dirtyRectList) {
                renderer.drawDirtyRects(dirtyRectList);
            }
            else {
                renderer.clearScreen();
            }
            var drawCalls = this.drawDisplayObject(root, renderer, dirtyRectList, null);
            if (dirtyRectList) {
                renderer.removeDirtyRects();
            }
            return drawCalls;
        }

        private drawDisplayObject(displayObject:DisplayObject, renderer:IScreenRenderer, dirtyRectList:lark.player.Region[], cacheNode:CacheNode):number {
            var drawCalls = 0;
            var node:lark.player.RenderNode;
            if (cacheNode) {
                if (cacheNode.needRedraw) {
                    this.updateDirtyNodes(cacheNode.dirtyNodes, cacheNode.dirtyRegion);
                    drawCalls += this.drawDisplayList(displayObject, cacheNode.renderer, cacheNode.dirtyRegion);
                    cacheNode.dirtyRegion.clear();
                    cacheNode.dirtyNodes = {};
                    cacheNode.needRedraw = false;
                }
                node = cacheNode;
            }
            else {
                node = displayObject.$renderNode;
            }
            if (node && !node.outOfScreen && !(node.alpha === 0)) {
                if (dirtyRectList && !node.isDirty) {
                    for (var j = dirtyRectList.length - 1; j >= 0; j--) {
                        var region = dirtyRectList[j];
                        if (node.intersects(region.minX, region.minY, region.maxX, region.maxY)) {
                            node.isDirty = true;
                            break;
                        }
                    }
                }
                if (!dirtyRectList || node.isDirty) {
                    drawCalls++;
                    node.render(renderer);
                    node.finish();
                }
            }
            if (cacheNode) {
                return drawCalls;
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    if (!(child.$displayObjectFlags & DisplayObjectFlags.Visible)) {
                        continue;
                    }
                    drawCalls += this.drawDisplayObject(child, renderer, dirtyRectList, child.$cacheNode);
                }
            }
            return drawCalls;
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
                visitDisplayList(this.stage, function (displayObject:DisplayObject):boolean {
                    var node = displayObject.$renderNode;
                    if (node) {
                        node.outOfScreen = !node.intersects(0, 0, stageWidth, stageHeight);
                    }
                    return true;
                });
                stage.emitWith(Event.RESIZE);
            }
        }
    }
}