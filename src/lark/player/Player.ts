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
    export class Player extends LarkObject {

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

            if (DEBUG) {//显示重绘区和FPS相关的代码,发行版中移除

                this._showFPS = false;
                this._showPaintRect = false;
                this.stageDisplayList = null;
                this.paintList = [];
                this.totalTime = 0;
                this.totalTick = 0;
                this.lastTime = 0;
                this.drawCalls = 0;
                this.showFPS = showFPS;
                this.updateFPS = updateFPS;
                this.showPaintRect = showPaintRect;
                this.drawPaintRect = drawPaintRect
                this.drawDirtyRect = drawDirtyRect
            }
        }

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
                if (rootContainer.isType(Types.DisplayObject)) {
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
            if (DEBUG && this._showFPS) {
                this.stage.addChild(this.fpsText);
            }
            var stage = this.stage;
            var t = lark.getTimer();
            var dirtyList = stage.$displayList.updateDirtyRegions();
            var t1 = lark.getTimer();
            var drawCalls = 0;
            if (dirtyList.length > 0) {
                dirtyList = dirtyList.concat();
                drawCalls = stage.$displayList.drawToSurface();
            }
            if (DEBUG) {
                if (this._showPaintRect) {
                    this.drawPaintRect(dirtyList);
                }
                var t2 = lark.getTimer();
                if (triggerByFrame && this._showFPS) {
                    var length = dirtyList.length;
                    var dirtyArea = 0;
                    for (var i = 0; i < length; i++) {
                        dirtyArea += dirtyList[i].area;
                    }
                    var dirtyRatio = Math.ceil(dirtyArea * 1000 / (stage.stageWidth * stage.stageHeight)) / 10;
                    this.updateFPS(drawCalls, dirtyRatio, t1 - t, t2 - t1);
                }
            }
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


        /**
         * 是否显示FPS，仅在DEBUG模式下有效。
         */
        public showFPS:(value:boolean)=>void;
        private updateFPS:(drawCalls:number, dirtyRatio:number, ...args)=>void;
        private _showFPS:boolean;
        private fpsText:TextField;
        private totalTime:number;
        private totalTick:number;
        private lastTime:number;
        private drawCalls:number;

        /**
         * 是否显示脏矩形重绘区，仅在DEBUG模式下有效。
         */
        public showPaintRect:(value:boolean)=>void;
        private drawDirtyRect:(x:number, y:number, width:number, height:number, context:RenderContext)=>void;
        private _showPaintRect:boolean;
        private stageDisplayList:DisplayList;
        private paintList:any[];
        private drawPaintRect:(dirtyList:Region[])=>void;

    }


    if (DEBUG) {//显示重绘区和FPS相关的代码,发行版中移除

        function showFPS(value:boolean):void {
            value = !!value;
            if (this._showFPS === value) {
                return;
            }
            this._showFPS = value;
            if (value) {
                if (!this.fpsText) {
                    var textField = new lark.TextField();
                    this.fpsText = textField;
                    textField.textColor = 0x0c8c0c;
                    textField.fontFamily = "monospace";
                    textField.x = 20;
                    textField.y = 20;
                    textField.touchEnabled = false;
                }
            }
            else if (this.fpsText && this.fpsText.parent) {
                this.stage.removeChild(this.fpsText);
            }
        }

        function updateFPS(drawCalls:number, dirtyRatio:number, ...args):void {
            if (!this.fpsText) {
                return;
            }
            var current = lark.getTimer();
            this.totalTime += current - this.lastTime;
            this.lastTime = current;
            this.totalTick++;
            this.drawCalls = Math.max(drawCalls, this.drawCalls);
            if (this.totalTime > 500) {
                var lastFPS = Math.round(this.totalTick * 1000 / this.totalTime);
                this.totalTick = 0;
                this.totalTime = 0;
                var text = "FPS: " + lastFPS + "\nDraw: " + this.drawCalls + "," + dirtyRatio + "%\nCost: " + args.join(",");
                //if (FPS.info) {
                //    text += "\nInfo: " + FPS.info;
                //}
                if (this.fpsText.text != text) {
                    this.fpsText.text = text;
                }
                this.drawCalls = 0;
            }
        }

        function showPaintRect(value:boolean):void {
            value = !!value;
            if (this._showPaintRect === value) {
                return;
            }
            this._showPaintRect = value;
            if (value) {
                if (!this.stageDisplayList) {
                    this.stageDisplayList = player.DisplayList.create(this.stage);
                }
                this.stage.$displayList = this.stageDisplayList;
            }
            else {
                this.stage.$displayList = this.screenDisplayList;
            }
        }


        function drawPaintRect(dirtyList:Region[]):void {
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
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, context.surface.width, context.surface.height);
            context.drawImage(this.stageDisplayList.surface, 0, 0);
            length = repaintList.length;
            for (i = 0; i < length; i++) {
                list = repaintList[i];
                for (var j = list.length - 1; j >= 0; j--) {
                    var r:number[] = list[j];
                    this.drawDirtyRect(r[0], r[1], r[2], r[3], context);
                }
            }
            context.save();
            context.beginPath();
            var length = dirtyList.length;
            for (var i = 0; i < length; i++) {
                var region = dirtyList[i];
                context.clearRect(region.minX, region.minY, region.width, region.height);
                context.rect(region.minX, region.minY, region.width, region.height);
            }
            context.clip();
            context.drawImage(this.stageDisplayList.surface, 0, 0);
            context.restore();
        }

        /**
         * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
         */
        function drawDirtyRect(x:number, y:number, width:number, height:number, context:RenderContext):void {
            context.strokeStyle = 'red';
            context.lineWidth = 1;
            context.strokeRect(x - 0.5, y - 0.5, width, height);
        }
    }
}

