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

    /**
     * Canvas屏幕适配器
     */
    export class CanvasScreen extends HashObject implements lark.player.IScreen {


        public constructor(container:HTMLElement, scaleMode:string, contentWidth:number, contentHeight:number) {
            super();
            this.container = container;
            this._canvas = this.createCanvas(container);
            this.scaleMode = scaleMode;
            this.contentWidth = contentWidth;
            this.contentHeight = contentHeight;
        }


        private _canvas:HTMLCanvasElement;

        public get canvas():HTMLCanvasElement{
            return this._canvas;
        }

        private container:HTMLElement;

        /**
         * 缩放模式,默认值为StageScaleMode.NO_SCALE。请参考StageScaleMode中定义的值,若设置的值不是StageScaleMode中的值，将会默认采用StageScaleMode.NO_SCALE。
         */
        private scaleMode:string;

        private stageSize:Rectangle = new Rectangle();

        private contentWidth:number;

        private contentHeight:number;

        /**
         * 创建Canvas实例
         */
        private createCanvas(container:HTMLElement):HTMLCanvasElement {
            var canvas:HTMLCanvasElement = document.createElement("canvas");
            var style = canvas.style;
            style.cursor = "default";
            style.margin = "auto";
            style.position = "absolute";
            style.top = "0";
            style.bottom = "0";
            style.left = "0";
            style.right = "0";
            container.appendChild(canvas);
            style = container.style;
            style.overflow = "hidden";
            style.position = "relative";
            return canvas;
        }

        /**
         * 更新播放器视口尺寸
         * @param screenWidth 播放器视口宽度（以像素为单位）
         * @param screenHeight 播放器视口高度（以像素为单位）
         * @returns 返回舞台尺寸
         */
        public calculateStageSize(screenWidth:number, screenHeight:number):Rectangle {
            var displayWidth = screenWidth;
            var displayHeight = screenHeight;
            var stageWidth = this.contentWidth;
            var stageHeight = this.contentHeight;
            var scaleX = (screenWidth / stageWidth) || 0;
            var scaleY = (screenHeight / stageHeight) || 0;
            switch (this.scaleMode) {
                case StageScaleMode.EXACT_FIT:
                    break;
                case StageScaleMode.FIXED_HEIGHT:
                    stageWidth = Math.round(screenWidth / scaleY);
                    break;
                case StageScaleMode.FIXED_WIDTH:
                    stageHeight = Math.round(screenHeight / scaleX);
                    break;
                case StageScaleMode.NO_BORDER:
                    if (scaleX > scaleY) {
                        displayHeight = Math.round(stageHeight * scaleX);
                    }
                    else {
                        displayWidth = Math.round(stageWidth * scaleY);
                    }
                    break;
                case StageScaleMode.SHOW_ALL:
                    if (scaleX > scaleY) {
                        displayWidth = Math.round(stageWidth * scaleY);
                    }
                    else {
                        displayHeight = Math.round(stageHeight * scaleX);
                    }
                    break;
                default :
                    stageWidth = screenWidth;
                    stageHeight = screenHeight;
                    break;
            }
            var canvas = this._canvas;
            if (canvas.width !== stageWidth) {
                canvas.width = stageWidth;
            }
            if (canvas.height !== stageHeight) {
                canvas.height = stageHeight;
            }
            canvas.style.width = displayWidth + "px";
            canvas.style.height = displayHeight + "px";
            return this.stageSize.setTo(0, 0, stageWidth, stageHeight);
        }
    }
}