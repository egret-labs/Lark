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
        public constructor(renderer:IRenderer, stage:Stage, entryClassName:string,scaleMode:number) {
            super();
            if (!renderer) {
                throw new Error("Lark播放器实例化失败，IRenderer不能为空！");
            }
            this.renderer = renderer;
            this.entryClassName = entryClassName;
            this.stage = stage;
            this.scaleMode = scaleMode;
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
                var cleanAll:boolean = (this.dirtyRatio > this.stage.$dirtyRatio)||this.stageSizeChangedFlag;
                if (!cleanAll) {
                    this.drawDirtyRect();
                }
                var t2 = lark.getTimer();
                this.drawDisplayList(cleanAll);
                var t3 = lark.getTimer();
            }
            else {
                t2 = t1;
                t3 = t2;
            }

            if (triggerByFrame) {
                FPS.update(this.drawCalls, this.dirtyRatio, t1 - t, t2 - t1, t3 - t2);
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
         * 绘制脏矩形区域
         */
        private drawDirtyRect():void {
            this.renderer.beginDrawDirtyRect();
            var list:Region[] = this.dirtyRectList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var region = list[i];
                this.renderer.drawDirtyRect(region.minX, region.minY, region.maxX - region.minX, region.maxY - region.minY);
            }
            this.renderer.endDrawDirtyRect();
        }

        /**
         * 同步显示列表。
         */
        private drawDisplayList(cleanAll:boolean):void {
            if (cleanAll) {
                this.renderer.clearScreen();
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
            else{
                this.renderer.endDrawScreen();
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
         * 播放器视口宽度
         */
        private screenWidth:number = 480;
        /**
         * 播放器视口高度
         */
        private screenHeight:number = 800;
        /**
         * 缩放模式,默认值为StageScaleMode.NO_SCALE。请参考StageScaleMode中定义的值,若设置的值不是StageScaleMode中的值，将会默认采用StageScaleMode.NO_SCALE。
         */
        private scaleMode:number = StageScaleMode.NO_SCALE;

        /**
         * 更新播放器视口尺寸
         * @param screenWidth 播放器视口宽度（以像素为单位）
         * @param screenHeight 播放器视口高度（以像素为单位）
         */
        public updateScreenSize(screenWidth:number,screenHeight:number):void{
            var stage = this.stage
            var renderer = this.renderer;
            var displayWidth = this.screenWidth = screenWidth;
            var displayHeight = this.screenHeight = screenHeight;
            var width = stage.$stageWidth;
            var oldWidth = width;
            var height = stage.$stageHeight;
            var oldHeight = height;
            var scaleX = (screenWidth/width)||0;
            var scaleY = (screenHeight/height)||0;
            switch(this.scaleMode){
                case StageScaleMode.EXACT_FIT:
                    break;
                case StageScaleMode.FIXED_HEIGHT:
                    stage.$stageWidth = width = Math.round(screenWidth/scaleY);
                    break;
                case StageScaleMode.FIXED_WIDTH:
                    stage.$stageHeight = height = Math.round(screenHeight/scaleX);
                    break;
                case StageScaleMode.NO_BORDER:
                    if(scaleX>scaleY){
                        displayHeight = Math.round(height*scaleX);
                    }
                    else{
                        displayWidth = Math.round(width*scaleY);
                    }
                    break;
                case StageScaleMode.SHOW_ALL:
                    if(scaleX>scaleY){
                        displayWidth = Math.round(width*scaleY);
                    }
                    else{
                        displayHeight = Math.round(height*scaleX);
                    }
                    break;
                default :
                    stage.$stageWidth = width = screenWidth;
                    stage.$stageHeight = height = screenHeight;
                    break;
            }

            renderer.updateScreenSize(width,height,displayWidth,displayHeight,screenWidth,screenHeight);
            var sizeChange = (height!==oldHeight||width!==oldWidth);
            if(sizeChange){
                this.dirtyRegion = new DirtyRegion(width,height);
                this.stageSizeChangedFlag = true;
                var renderList = this.renderNodeList;
                var length = renderList.length;
                for (var i = 0; i < length; i++) {
                    var node = renderList[i];
                    node.outOfScreen = !node.intersects(0, 0, width, height);
                }
                stage.emitWith(Event.RESIZE);
            }
            if(!this.dirtyRegion){
                this.dirtyRegion = new DirtyRegion(width,height);
            }
        }

    }
}