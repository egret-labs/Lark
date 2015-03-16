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
     * Lark播放器在Canvas上封装的实现
     */
    export class CanvasContext extends HashObject implements IPlayerContext {
        /**
         * 创建一个Canvas屏幕渲染器
         */
        public constructor(canvas:HTMLCanvasElement) {
            super();
            if (!canvas) {
                throw new Error("CanvasContext实例化失败，canvas参数不能为空！");
            }
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
        }


        private canvas:HTMLCanvasElement;
        private context:CanvasRenderingContext2D;

        private stage:Stage = null;

        public initialize(stage:Stage):void {
            this.stage = stage;
            window.onresize = this.onSizeChanged;
            this.doResize();
        }

        private sizeChanged:boolean = false;

        private onSizeChanged = ():void=> {
            if (!this.sizeChanged) {
                this.sizeChanged = true;
                setTimeout(this.doResize, 100)
            }
        }

        private doResize = ():void=> {
            this.sizeChanged = false;
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            console.log(window.innerWidth,window.innerHeight);
            this.stage.$updateStageSize(window.innerWidth,window.innerHeight);
        }

        /**
         * 清除整个屏幕
         */
        public clearScreen():void {
            this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        /**
         * 清除屏幕的部分渲染区域
         */
        public clearRect(x:number, y:number, width:number, height:number):void {
            this.context.setTransform(1,0,0,1,0,0);
            this.context.clearRect(x, y, width, height);
        }

        /**
         * 绘制图片到一个区域上
         */
        public drawImage(texture:Texture, matrix:Matrix, globalAlpha:number):void {
            this.context.globalAlpha = globalAlpha;
            this.context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            var width = texture.$bitmapWidth;
            var height = texture.$bitmapHeight;
            this.context.drawImage(texture.$bitmapData, texture.$bitmapX, texture.$bitmapY,width, height,
                texture.$offsetX, texture.$offsetY, width, height);
        }

        /**
         * 绘制文本到一个区域上
         */
        public drawText(text: string, font: string, color: string, x: number, y: number, width: number, stroke:boolean, lineWidth:number, matrix: Matrix, globalAlpha: number): void {
            if(this.context.globalAlpha!=globalAlpha){
                this.context.globalAlpha = globalAlpha;
            }
            this.context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            this.context.font = font;
            this.context.textBaseline = "middle";
            if (stroke) {
                this.context.lineWidth = lineWidth;
                this.context.strokeStyle = color;
                this.context.strokeText(text, x, y, width);
            }
            else {
                this.context.fillStyle = color;
                this.context.fillText(text, x, y, width);
            }
        }

        public beginDrawDirtyRect():void{
            this.context.setTransform(1,0,0,1,0,0);
            this.context.save();
        }

        public drawDirtyRect(x:number,y:number,width:number,height:number):void{
            this.clearRect(x,y,width,height);
            this.context.rect(x,y,width,height);
        }

        public endDrawDirtyRect():void{
            this.context.clip();
        }

        public endDrawScreen():void{
            this.context.restore();
        }

        /**
         * 启动心跳计时器
         */
        public startTick(callBack:Function, thisObject:any):void {
            WebTicker.getInstance().register(callBack, thisObject);
        }

        /**
         * 停止心跳计时器
         */
        public stopTick(callBack:Function, thisObject:any):void {
            WebTicker.getInstance().unregister(callBack, thisObject);
        }
    }
}