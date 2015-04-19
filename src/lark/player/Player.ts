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
        public constructor(context:RenderContext, stage:Stage, entryClassName:string) {
            super();
            if (DEBUG && !context) {
                $error(1003, "context");
            }
            this.entryClassName = entryClassName;
            this.stage = stage;
            this.screenDisplayList = this.createDisplayList(stage, context);

            if (DEBUG) {//显示重绘区域相关的代码,发行版中移除
                this._showPaintRects = false;
                this.stageDisplayList = null;

                this.showPaintRects = function (value:boolean):void {
                    value = !!value;
                    if (this._showPaintRects === value) {
                        return;
                    }
                    this._showPaintRects = value;
                    if (value) {
                        if (!this.stageDisplayList) {
                            this.stageDisplayList = $displayListPool.create(this.stage);
                        }
                        this.stage.$displayList = this.stageDisplayList;
                    }
                    else {
                        this.stage.$displayList = this.screenDisplayList;
                    }
                };

                this.paintList = [];

                this.drawPaintRects = function (dirtyList:Region[]):void {
                    var length = dirtyList.length;
                    var list = [];
                    for (var i = 0; i < length; i++) {
                        var region:Region = dirtyList[i];
                        list[i] = [region.minX, region.minY, region.width, region.height];
                        region.width -= 1;
                        region.height -= 1;
                    }
                    var repaintList = this.paintList;
                    repaintList.push(list);
                    if (repaintList.length > 20) {
                        repaintList.shift();
                    }
                    var context = this.screenDisplayList.renderContext;
                    this.clearScreen(context);
                    context.setTransform(1,0,0,1,0,0);
                    context.drawImage(this.stageDisplayList.bitmapData,0,0);
                    length = repaintList.length;
                    for (i = 0; i < length; i++) {
                        list = repaintList[i];
                        for (var j = list.length - 1; j >= 0; j--) {
                            var r:number[] = list[j];
                            this.drawDirtyRect(r[0], r[1], r[2], r[3],context);
                        }
                    }
                    this.markDirtyRects(dirtyList,context);
                    context.drawImage(this.stageDisplayList.bitmapData,0,0);
                    context.restore();
                };

                /**
                 * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
                 */
                this.drawDirtyRect = function (x:number, y:number, width:number, height:number,context:RenderContext):void {
                    context.strokeStyle = 'red';
                    context.lineWidth = 1;
                    context.strokeRect(x - 0.5, y - 0.5, width, height);
                }
            }
        }

        public showPaintRects:(value:boolean)=>void;
        private _showPaintRects:boolean;
        private stageDisplayList:DisplayList;
        private paintList:any[];
        private drawPaintRects:(dirtyList:Region[])=>void;
        /**
         * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
         */
        public drawDirtyRect:(x:number, y:number, width:number, height:number,context:RenderContext)=>void;

        private createDisplayList(stage:Stage, context:RenderContext):DisplayList {
            var displayList = new DisplayList(stage);
            displayList.renderContext = context;
            stage.$displayList = displayList;
            return displayList;
        }


        private screenDisplayList:DisplayList;
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
            if (this.isPlaying || !this.stage) {
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
            this.stage = null;
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
            var stage = this.stage;
            var t = lark.getTimer();
            var dirtyList = stage.$displayList.updateDirtyNodes();
            var t1 = lark.getTimer();
            var drawCalls = 0;
            if (dirtyList.length > 0) {
                dirtyList = dirtyList.concat();
                drawCalls = this.drawDisplayList(stage, stage.$displayList);
            }
            if (DEBUG && this._showPaintRects) {
                this.drawPaintRects(dirtyList);
            }
            var t2 = lark.getTimer();
            if (triggerByFrame) {
                var length = dirtyList.length;
                var dirtyArea = 0;
                for (var i = 0; i < length; i++) {
                    dirtyArea += dirtyList[i].area;
                }
                var dirtyRatio = Math.ceil(dirtyArea * 1000 / (stage.stageWidth * stage.stageHeight)) / 10;
                FPS.update(drawCalls, dirtyRatio, t1 - t, t2 - t1);
            }
        }

        /**
         * 绘制显示列表。
         */
        public drawDisplayList(root:DisplayObject, displayList:DisplayList):number {
            displayList.prepare();
            var context = displayList.renderContext;
            this.markDirtyRects(displayList.dirtyList,context);
            var drawCalls = this.drawDisplayObject(root, context, displayList.dirtyList, null);
            context.restore();
            displayList.finish();
            return drawCalls;
        }

        private drawDisplayObject(displayObject:DisplayObject, context:RenderContext, dirtyList:lark.player.Region[], displayList:DisplayList):number {
            var drawCalls = 0;
            var node:IRenderable;
            if (displayList) {
                if (displayList.needRedraw) {
                    drawCalls += this.drawDisplayList(displayObject, displayList);
                }
                node = displayList;
            }
            else {
                node = displayObject.$stageRegion ? displayObject : null;
            }
            if (node && !(node.$stageAlpha === 0)) {
                if (!node.$isDirty) {
                    var stageRegion = node.$stageRegion;
                    for (var j = dirtyList.length - 1; j >= 0; j--) {
                        var region = dirtyList[j];
                        if (stageRegion.intersects(region)) {
                            node.$isDirty = true;
                            break;
                        }
                    }
                }
                if (node.$isDirty) {
                    drawCalls++;
                    context.save();
                    context.globalAlpha = displayList?1:node.$stageAlpha;
                    var m = node.$stageMatrix.$data;
                    context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
                    node.$render(context);
                    context.restore();
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
                    if (!(child.$displayObjectFlags & DisplayObjectFlags.Visible)) {
                        continue;
                    }
                    drawCalls += this.drawDisplayObject(child, context, dirtyList, child.$displayList);
                }
            }
            return drawCalls;
        }

        /**
         * 绘制脏矩形列表
         */
        private markDirtyRects(regionList:lark.player.Region[],context:RenderContext):void {
            context.save();
            context.beginPath();
            var length = regionList.length;
            for (var i = 0; i < length; i++) {
                var region = regionList[i];
                context.clearRect(region.minX, region.minY, region.width, region.height);
                context.rect(region.minX, region.minY, region.width, region.height);
            }
            context.clip();
        }

        /**
         * 清空屏幕
         */
        public clearScreen(context:RenderContext):void {
            context.save();
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, context.surface.width, context.surface.height);
            context.restore();
        }

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
                this.screenDisplayList.setClipRect(stageWidth, stageHeight);
                if (DEBUG && this.stageDisplayList) {
                    this.stageDisplayList.setClipRect(stageWidth, stageHeight);
                }
                stage.emitWith(Event.RESIZE);
            }
        }
    }
}