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
     * Stage 类代表主绘图区，表示显示 Lark 内容的整个区域。
     * 可以利用 DisplayObject 实例的 stage 属性进行访问。
     * Stage 类具有多个祖代类 -- DisplayObjectContainer、DisplayObject 和 EventDispatcher，属性和方法便是从这些类继承而来的。
     * 从这些继承的许多属性和方法不适用于 Stage 对象。
     */
    export class Stage extends Sprite {

        /**
         * 舞台对象不允许自行实例化。
         */
        public constructor() {
            super();
            this.$stage = this
        }

        /**
         * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。
         * 注意，若同一个网页中包含多个lark.Stage实例，修改任何一个Stage的frameRate属性都会同步修改其他Stage的帧率。
         */
        public get frameRate():number {
            return lark.player.Ticker.$instance.$frameRate;
        }

        public set frameRate(value:number) {
            lark.player.Ticker.$instance.$setFrameRate(value);
        }

        $stageWidth:number = 0;

        /**
         * 舞台的当前宽度（以像素为单位）。
         */
        public get stageWidth():number {
            return this.$stageWidth;
        }

        $stageHeight:number = 0;

        /**
         * 舞台的当前高度（以像素为单位）。
         */
        public get stageHeight():number {
            return this.$stageHeight;
        }

        /**
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
         * 每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 invalidate() 方法。
         */
        public invalidate():void {
            player.Ticker.$invalidateRenderFlag = true;
        }
    }

    if(DEBUG){

        Object.defineProperty(Stage.prototype, "alpha", {
            get: function () {
                return 1;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "visible", {
            get: function () {
                return true;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "x", {
            get: function () {
                return 0;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "y", {
            get: function () {
                return 0;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "scaleX", {
            get: function () {
                return 1;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "scaleY", {
            get: function () {
                return 1;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "rotation", {
            get: function () {
                return 0;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "cacheAsBitmap", {
            get: function () {
                return false;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "scrollRect", {
            get: function () {
                return null;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "filters", {
            get: function () {
                return null;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "blendMode", {
            get: function () {
                return null;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "matrix", {
            get: function () {
                return this.$getMatrix();
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Stage.prototype, "touchEnabled", {
            get: function () {
                return true;
            },
            set: function (value) {
                $error(1009);
            },
            enumerable: true,
            configurable: true
        });
    }
    registerType(Stage,[Types.Stage]);
}