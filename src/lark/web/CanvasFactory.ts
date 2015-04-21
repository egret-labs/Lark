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

module lark.web {

    var surfacePool:player.Surface[] = [];

    export class CanvasFactory implements player.SurfaceFactory {

        public constructor(){
            player.sharedRenderContexts = [this.create().renderContext,this.create().renderContext];
        }

        /**
         * 从对象池取出或创建一个新的Surface实例
         */
        public create():player.Surface {
            var surface = surfacePool.pop();
            if (!surface) {
                var canvas:HTMLCanvasElement = document.createElement("canvas");
                if (!this.testCanvasValid(canvas)) {
                    warn("failed to create canvas!");
                    return null;
                }
                surface = this.createSurface(canvas);
            }
            return surface;
        }

        /**
         * 释放一个Surface实例
         * @param surface 要释放的Surface实例
         */
        public release(surface:player.Surface):void {
            surface.width = surface.height = 1;
            surfacePool.push(surface);
        }

        /**
         * 检测创建的canvas是否有效，QQ浏览器对内存小等于1G的手机，限制Canvas创建的数量为19个。
         */
        private testCanvasValid(canvas:HTMLCanvasElement):boolean {
            canvas.height = 1;
            canvas.width = 1;
            var data = canvas.toDataURL("image/png");
            if (data == 'data:,')
                return false;
            return true;
        }

        private createSurface(canvas:HTMLCanvasElement):player.Surface {
            var context = canvas.getContext("2d");
            canvas["renderContext"] = context;
            context["surface"] = canvas;

            var drawImage = context.drawImage;
            context.drawImage = function (image:HTMLElement, offsetX:number, offsetY:number, width?:number,
                                          height?:number, surfaceOffsetX?:number, surfaceOffsetY?:number,
                                          surfaceImageWidth?:number, surfaceImageHeight?:number):void {
                if (image["width"] === 0 || image["height"] === 0) {//屏蔽IE下对绘制空canvas的报错。
                    return;
                }
                drawImage.apply(context, arguments);
            };

            if (!context.hasOwnProperty("imageSmoothingEnabled")) {
                var keys = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"];
                for (var i = keys.length - 1; i >= 0; i--) {
                    var key = keys[i];
                    if (context.hasOwnProperty(key)) {
                        break;
                    }
                }
                Object.defineProperty(context, "imageSmoothingEnabled", {
                    get: function () {
                        return this[key];
                    },
                    set: function (value) {
                        this[key] = value;
                    }
                });
            }
            return <player.Surface><any>canvas;
        }
    }
}