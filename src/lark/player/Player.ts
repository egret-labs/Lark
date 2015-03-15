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

module lark {
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
            this.syncDisplayList(this.stage);
            //if (this.dirtyNodeList.length > 0) {
                var t1 = lark.getTimer();
              //  console.log("syncDisplayList:"+(t1-t)+"ms");
                //this.drawDirtyRect();
                var t2 = lark.getTimer();
               // console.log("drawDirtyRect:"+(t2-t1)+"ms");
                this.drawRenderNodes();
                var t3 = lark.getTimer();
               // console.log("drawCost:"+(t3-t2)+"ms");
            //}
        }

        private renderNodeList:RenderNode[] = [];
        private dirtyNodeList:RenderNode[] = [];
        private notDirtyNodeList:RenderNode[] = [];
        private screenGrids:any[] = [];

        /**
         * 同步显示列表。
         */
        private syncDisplayList(displayObject:DisplayObject):void {
            var nodeList:RenderNode[] = [];
           // var dirtyNodes:RenderNode[] = [];
          //  var notDirtyNodes:RenderNode[] = [];
            var stack:DisplayObject[] = [displayObject];
            while (stack.length > 0) {
                displayObject = stack.pop();
                var node = displayObject.$getRenderNode();
                displayObject.$removeFlags(DisplayObjectFlags.Dirty);
                if (node) {
                    nodeList.push(node);
                    //if (node.isDirty) {
                    //    dirtyNodes.push(node);
                    //}
                    //else {
                    //    notDirtyNodes.push(node);
                    //}
                }
                var children = displayObject.$children;
                if (children) {
                    for (var i = children.length - 1; i >= 0; i--) {
                        var child = children[i];
                        stack.push(child);
                    }
                }
            }
            this.renderNodeList = nodeList;
            //this.dirtyNodeList = dirtyNodes;
            //this.notDirtyNodeList = notDirtyNodes;
        }

        /**
         * 绘制脏矩形区域
         */
        private drawDirtyRect():void {
            this.context.beginDrawDirtyRect();
            var dirtyList = this.dirtyNodeList;
            var notDirtyList = this.notDirtyNodeList;
            var dirtyLength = dirtyList.length;
            for (var i = 0; i < dirtyLength; i++) {
                var node = dirtyList[i];
                for (var j = notDirtyList.length - 1; j >= 0; j--) {
                    var targetNode = notDirtyList[j]
                    if (node.intersects(targetNode)) {
                        targetNode.isDirty = true;
                        notDirtyList.splice(j, 1);
                    }
                }
                this.context.drawDirtyRect(node.oldXMin, node.oldYMin, node.oldXMax - node.oldXMin, node.oldYMax - node.oldYMin);
                this.context.drawDirtyRect(node.xMin, node.yMin, node.xMax - node.xMin, node.yMax - node.yMin);

            }
            this.context.endDrawDirtyRect();
        }

        /**
         * 绘制渲染节点
         */
        private drawRenderNodes():void {
            this.context.clearScreen();
            var nodeList = this.renderNodeList;
            var length = nodeList.length;
            for (var i = 0; i < length; i++) {
                var node = nodeList[i];
                //if (!node.isDirty) {
                //    continue;
                //}
                if (node instanceof BitmapNode) {
                    var bitmapNode = <BitmapNode>node;
                    var texture = bitmapNode.texture;
                    if (texture) {
                        this.context.drawImage(texture, bitmapNode.matrix, bitmapNode.alpha);
                    }
                }
                else if(node instanceof TextNode){
                    var textNode = <TextNode>node;
                    this.context.drawText(textNode.text, textNode.font, textNode.style, 0,
                        textNode.size/2, textNode.textWidth, false, 0, textNode.matrix, textNode.alpha);
                }
            }
            //this.context.endDrawScreen();
        }
    }
}