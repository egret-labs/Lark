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

    var isIOS = Capabilities.os == "iOS";
    var winURL = window["URL"] || window["webkitURL"];

    /**
     * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
     */
    export class WebImageLoader extends EventEmitter implements ImageLoader {
        /**
         * 使用 load() 方法加载成功的 BitmapData 图像数据。
         */
        public data:BitmapData = null;

        /**
         * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
         * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
         */
        public crossOrigin:string = null;

        private currentImage:HTMLImageElement = null;

        private currentURL:string;

        private request:WebHttpRequest = null;

        /**
         * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
         * @param url 要加载的图像文件的地址。
         */
        public load(url:string):void {
            if (isIOS && winURL) {
                var request = this.request;
                if (!request) {
                    request = this.request = new lark.web.WebHttpRequest();
                    request.on(lark.Event.COMPLETE, this.onBlobLoaded, this);
                    request.on(lark.Event.IO_ERROR, this.onBlobError, this);
                    request.responseType = "blob";
                }
                if (DEBUG) {
                    this.currentURL = url;
                }
                request.open(url);
                request.send();
            }
            else {
                this.loadImage(url);
            }
        }

        private onBlobLoaded(event:lark.Event):void {
            var blob:Blob = this.request.response;
            this.loadImage(winURL.createObjectURL(blob));
        }

        private onBlobError(event:lark.Event):void {
            if (DEBUG && !this.hasListener(Event.IO_ERROR)) {
                $error(1011, this.currentURL);
            }
            this.emitWith(Event.IO_ERROR);
        }

        private loadImage(src:string):void {
            log(src);
            var image = new Image();
            this.data = null;
            this.currentImage = image;
            if (this.crossOrigin) {
                image.crossOrigin = this.crossOrigin;
            }
            image.onload = this.onImageComplete;
            image.onerror = this.onLoadError;
            image.src = src;
        }

        private onImageComplete = (event):void=> {
            var image = this.getImage(event);
            if (!image) {
                return;
            }
            this.data = toBitmapData(image);
            this.emitWith(Event.COMPLETE);
        }

        private onLoadError = (event):void => {
            var image = this.getImage(event);
            if (!image) {
                return;
            }
            if (DEBUG && !this.hasListener(Event.IO_ERROR)) {
                $error(1011, image.src);
            }
            this.emitWith(Event.IO_ERROR);
        }

        private getImage(event:any):HTMLImageElement {
            var image:HTMLImageElement = event.target;
            if (this.request) {
                winURL.revokeObjectURL(image.src);
            }
            image.onerror = null;
            image.onload = null;
            if (this.currentImage !== image) {
                return null;
            }
            this.currentImage = null;
            return image;
        }

    }

    registerClass(WebImageLoader, Types.ImageLoader);
    ImageLoader = WebImageLoader;
}