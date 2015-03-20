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
     * @excluded
     * Lark播放器
     */
    export class Player extends HashObject {

        /**
         * 播放器对象不允许自行实例化。
         */
        public constructor(context:IPlayerContext, entryClassName:string) {
            super();
            if (!context) {
                throw new Error("Lark播放器实例化失败，IPlayerContext不能为空！");
            }
            this.context = context;
            this.entryClassName = entryClassName;
        }

        private context:IPlayerContext;
        /**
         * 入口类的完整类名
         */
        private entryClassName:string;
        /**
         * 舞台引用
         */
        private stage:Stage = null;

        private isPlaying:boolean = false;

        /**
         * 启动播放器
         */
        public start():void {
            if (this.isPlaying || !this.context) {
                return;
            }
            this.isPlaying = true;
            if (!this.stage) {
                this.initialize();
            }
            this.context.startTick(this.onTick, this);
        }

        private initialize():void {
            lark.$START_TIME = Date.now();
            this.stage = new lark.Stage();
            this.context.initialize(this.stage);
            var rootClass;
            if (this.entryClassName) {
                rootClass = lark.getDefinitionByName(this.entryClassName);
            }
            if (rootClass) {
                var rootContainer:any = new rootClass();
                if (rootContainer instanceof lark.DisplayObject) {
                    this.stage.addChild(rootContainer);
                }
                else {
                    throw new Error("Lark入口类必须是lark.DisplayObject的子类: " + this.entryClassName);
                }
            }
            else {
                throw new Error("找不到Lark入口类: " + this.entryClassName);
            }
        }

        /**
         * 停止播放器，停止后将不能重新启动。
         */
        public stop():void {
            this.pause();
            this.context = null;
        }

        /**
         * 暂停播放器，后续可以通过调用start()重新启动播放器。
         */
        public pause():void {
            if (!this.isPlaying) {
                return;
            }
            this.isPlaying = false;
            this.context.stopTick(this.onTick, this);
        }

        private onTick():void {
            var t = lark.getTimer();
            this.computeDirtyRects();
            var t1 = lark.getTimer();
            if (this.dirtyRectList.length > 0) {
                this.drawDirtyRect();
                var t2 = lark.getTimer();
                this.drawDisplayList();
                var t3 = lark.getTimer();
            }
            else {
                t2 = t1;
                t3 = t2;
            }

            FPS.update(this.drawCalls, t1 - t, t2 - t1, t3 - t2);
        }

        private renderNodeList:RenderNode[] = [];

        private dirtyRectList:Rectangle[] = [];

        private drawCalls:number = 0;

        private computeDirtyRects():void {
            var dirtyRegion = this.stage.$dirtyRegion;
            var nodeList = this.stage.$dirtyRenderNodes;
            for (var i in nodeList) {
                var node:RenderNode = nodeList[i];
                if(!node.outOfScreen&&node.alpha!==0){
                    node.isDirty = true;
                    dirtyRegion.addDirtyRectangle(node.getRect());
                }
                node.update();
                if (node.moved&&!node.outOfScreen&&node.alpha!==0) {
                    node.isDirty = true;
                    dirtyRegion.addDirtyRectangle(node.getRect());
                }
            }
            var dirtyRectList:Rectangle[] = this.dirtyRectList;
            dirtyRectList.length = 0;
            dirtyRegion.gatherOptimizedRegions(dirtyRectList);
        }

        /**
         * 绘制脏矩形区域
         */
        private drawDirtyRect():void {
            this.context.beginDrawDirtyRect();
            var list:Rectangle[] = this.dirtyRectList;
            var length = list.length;
            for (var i = 0; i < length; i++) { 
                var rect = list[i];
                this.context.drawDirtyRect(rect.x, rect.y, rect.width, rect.height);
            }
            this.context.endDrawDirtyRect();
        }

        /**
         * 同步显示列表。
         */
        private drawDisplayList():void {
            var stage = this.stage;
            var dirtyRectList = this.dirtyRectList;
            var context = this.context;
            this.drawCalls = 0;
            if(this.stage.$displayListTreeChanged){
                var nodeList:RenderNode[] = [];
                this.visitDisplayList(this.stage, nodeList,dirtyRectList,context);
                this.renderNodeList = nodeList;
            }
            else{
                var renderList = this.renderNodeList;
                var length = renderList.length;
                for(var i=0;i<length;i++){
                    this.checkRenderNode(renderList[i],dirtyRectList,context);
                }
            }
            this.context.endDrawScreen();
            stage.$dirtyRegion.clear();
            stage.$dirtyRenderNodes = {};
            stage.$displayListTreeChanged = false;
        }

        private visitDisplayList(displayObject:DisplayObject, nodeList:RenderNode[],dirtyRectList:Rectangle[],context:IPlayerContext):void {
            if(!displayObject.$hasFlags(DisplayObjectFlags.Visible)){
                return;
            }
            var node = displayObject.$renderNode;
            if (node) {
                nodeList.push(node);
                this.checkRenderNode(node,dirtyRectList,context);
            }
            var children = displayObject.$children;
            if (children) {
                var length = children.length;
                for (var i = 0; i < length; i++) {
                    var child = children[i];
                    this.visitDisplayList(child, nodeList,dirtyRectList,context);
                }
            }
        }

        /**
         * 检查一个渲染节点是否需要绘制
         */
        private checkRenderNode(node:RenderNode,dirtyRectList:Rectangle[],context:IPlayerContext):void {
            if(node.outOfScreen||node.alpha===0){
                return;
            }
            if (!node.isDirty) {
                for (var j = dirtyRectList.length-1; j >= 0; j--) {
                    var rect = dirtyRectList[j];
                    if(node.intersects(rect.x,rect.y,rect.x+rect.width,rect.y+rect.height)){
                        node.isDirty = true;
                        break;
                    }
                }
            }
            if(node.isDirty){
                this.drawCalls++;
                switch (node.nodeType) {
                    case NodeType.Bitmap:
                        var bitmapNode = <BitmapNode>node;
                        var texture = bitmapNode.texture;
                        if (texture) {
                            context.drawImage(texture, bitmapNode.matrix, bitmapNode.alpha);
                        }
                        break;
                    case NodeType.Text:
                        var textNode = <TextNode>node;
                        context.drawText(textNode.text, textNode.font, textNode.style, 0,
                            textNode.size / 2, textNode.textWidth, textNode.matrix, textNode.alpha);
                        break;
                    case NodeType.Graphics:

                        break;
                }
                node.finish();
            }
        }
    }
}