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

module lark{
    /**
     * Lark播放器在Canvas上封装的实现
     */
    export class CanvasContext extends HashObject implements IPlayerContext{
        /**
         * 创建一个Canvas屏幕渲染器
         */
        public constructor(canvas:HTMLCanvasElement){
            super();
            if(!canvas){
                throw new Error("CanvasContext实例化失败，canvas参数不能为空！");
            }
            this.canvas = canvas;
            this.initialize();
        }

        private canvas:HTMLCanvasElement;

        private initialize():void{
            window.onresize = this.onSizeChanged;
            this.onSizeChanged();
        }

        private sizeChanged:boolean = false;

        private onSizeChanged = ():void=>{
            if(!this.sizeChanged){
                this.sizeChanged = true;
                setTimeout(this.doResize,100)
            }
        }

        private doResize = ():void=>{
            this.sizeChanged = false;
            this.canvas.width = window.innerWidth;
            this.canvas.height =  window.innerHeight;
            var cxt = this.canvas.getContext("2d");
            var img = new Image();
            img.src = "image/test.png";
            img.onload = ()=>{
                cxt.drawImage(img,(this.canvas.width-img.width)*0.5,(this.canvas.height-img.height)*0.5);
            }
        }
        /**
         * 清除整个屏幕
         */
        public clearScreen():void{

        }

        /**
         * 清除屏幕的部分渲染区域
         */
        public clearRect(x:number, y:number, width:number, height:number):void{

        }

        /**
         * 绘制图片到一个区域上
         */
        public drawImage(texture: Texture, sourceX:number, sourceY:number, sourceWidth:number, sourceHeight:number,
                  targetX:number, targetY:number, targetWidth:number, targetHeight:number):void{

        }
    }
}