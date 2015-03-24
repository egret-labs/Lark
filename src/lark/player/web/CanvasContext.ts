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
            this.checkTicker();
        }

        /**
         * 检查心跳计时器，若未初始化则立即初始化并启动。
         */
        private checkTicker():void{
            var ticker:Ticker = Ticker.getInstance();
            if(!ticker){
                return;
            }
            var requestAnimationFrame =
                window["requestAnimationFrame"] ||
                window["webkitRequestAnimationFrame"] ||
                window["mozRequestAnimationFrame"] ||
                window["oRequestAnimationFrame"] ||
                window["msRequestAnimationFrame"];

            if (!requestAnimationFrame) {
                requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
            }

            requestAnimationFrame.call(window, onTick);
            function onTick():void{
                ticker.update();
                requestAnimationFrame.call(window, onTick)
            }
        }


        private canvas:HTMLCanvasElement;
        private context:CanvasRenderingContext2D;

        private player:Player = null;

        public initialize(player:Player):void {
            this.player = player;
            window.onresize = this.onSizeChanged;
            this.doResize();
            this.canvas.addEventListener("mousedown",this.onTouchBegin);
            this.canvas.addEventListener("mousemove",this.onTouchMove);
            this.canvas.addEventListener("mouseup",this.onTouchEnd);
        }

        private onTouchBegin = (event:any):void => {
            var location = this.getLocation(event);
            this.player.onTouchBegin(location.x, location.y, event.identifier);
        }

        private onTouchMove = (event:any):void => {
            var location = this.getLocation(event);
            this.player.onTouchMove(location.x, location.y, event.identifier);

        }

        private onTouchEnd = (event:any):void => {
            var location = this.getLocation(event);
            this.player.onTouchEnd(location.x, location.y, event.identifier);
        }

        private getLocation(event:any):Point {
            var doc = document.documentElement;
            var box = this.canvas.getBoundingClientRect();
            var left = box.left + window.pageXOffset - doc.clientLeft;
            var top = box.top + window.pageYOffset - doc.clientTop;
            return Point.TEMP.setTo(event.pageX - left,event.pageY - top);
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
            this.player.stage.$updateStageSize(window.innerWidth,window.innerHeight);
        }


        /**
         * 清除整个屏幕
         */
        public clearScreen():void {
            this.reset();
            this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        /**
         * 清除屏幕的部分渲染区域
         */
        public clearRect(x:number, y:number, width:number, height:number):void {
            this.context.clearRect(x, y, width, height);
        }

        /**
         * 绘制图片到一个区域上
         */
        public drawImage(texture:Texture, matrix:Matrix, globalAlpha:number):void {
            this.setGlobalAlpha(globalAlpha);
            var point = this.setTransform(matrix.a, matrix.b, matrix.c, matrix.d,matrix.tx,matrix.ty);
            var width = texture.$bitmapWidth;
            var height = texture.$bitmapHeight;
            this.context.drawImage(texture.$bitmapData, texture.$bitmapX, texture.$bitmapY,width, height,
                texture.$offsetX+point.x, texture.$offsetY+point.y, width, height);
        }

        /**
         * 绘制文本到一个区域上
         */
        public drawText(text: string, font: string, color: string, x: number, y: number, width: number, matrix: Matrix, globalAlpha: number): void {
            var context = this.context;
            this.setGlobalAlpha(globalAlpha);
            this.setFont(font);
            this.setFillStyle(color);
            var point = this.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            context.fillText(text, x+point.x, y+point.y, width);

        }

        public reset():void{
            var context = this.context;
            this.setTransform(1, 0, 0, 1, 0, 0);
            this.setGlobalAlpha(1);
            this.setFont(null);
            this.setFillStyle(null);
            context.strokeStyle = null;
            context.textBaseline = "middle";

        }
        public beginDrawDirtyRect():void{
            this.reset();
            this.context.save();
            this.context.beginPath();
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

        private _globalAlpha:number = 1;
        /**
         * 设置并缓存globalAlpha属性，所有修改必须统一调用此方法。
         */
        private setGlobalAlpha(value:number):void{
            if(this._globalAlpha===value){
                return;
            }
            this._globalAlpha = value;
            this.context.globalAlpha = value;
        }

        private _a:number = 1;
        private _b:number = 0;
        private _c:number = 0;
        private _d:number = 1;
        private _ad_bc:number = 1;
        private TEMP_POINT:Point = new Point();
        /**
         * 设置并缓存矩阵变换参数，所有修改必须统一调用此方法。注意此方法不会把tx和ty传入Canvas，只传入abcd等属性，请在外部应用返回的偏移量。
         * 大部分情况下，每次绘制只有tx，ty发生变化，旋转缩放并不会改变。使用此方法会分离出tx，ty属性，从而避免过度调用context.setTransform().
         */
        private setTransform(a:number,b:number,c:number,d:number,tx:number,ty:number):Point{
            if(this._a!==a||this._b!==b||this._c!==c||this._d!==d){
                this._a = a;
                this._b = b;
                this._c = c;
                this._d = d;
                this._ad_bc = a*d - b*c;
                this.context.setTransform(a,b,c,d,0,0);
            }
            if(a===1&&b==0&&c===0&&d===1){
                return this.TEMP_POINT.setTo(tx,ty);
            }
            var x = (d*tx - c*ty)/this._ad_bc;
            var y = (a*ty - b*tx)/this._ad_bc;
            return this.TEMP_POINT.setTo(x,y);
        }

        private _font:string = null;
        /**
         * 设置并缓存font属性，所有修改必须统一调用此方法。
         */
        private setFont(value:string):void{
            if(this._font==value){
                return;
            }
            this._font = value;
            this.context.font = value;
        }

        private _fillStyle:string = null;
        /**
         * 设置并缓存fillStyle属性，所有修改必须统一调用此方法。
         */
        private setFillStyle(value:string):void{
            if(this._fillStyle==value){
                return;
            }
            this._fillStyle = value;
            this.context.fillStyle = value;
        }
    }
}