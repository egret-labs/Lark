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
     * 舞台，显示列表根容器。
     */
    export class Stage extends DisplayObjectContainer {

        /**
         * 舞台对象不允许自行实例化。
         */
        public constructor() {
            super();
            this.$stage = this;
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

        private _scaleMode:string = "noScale";
        /**
         * 缩放模式
         */
        public get scaleMode():string {
            return this._scaleMode;
        }

        public set scaleMode(value:string) {
            this._scaleMode = value;
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
            lark.player.Ticker.$invalidateRenderFlag = true;
        }
        /**
         * 显示列表的结构发生改变
         */
        $displayListTreeChanged:boolean = true;
        /**
         * 显示对象的渲染节点发生改变时，把自身的RenderNode对象注册到此列表上。
         */
        $dirtyRenderNodes:{[key:number]:lark.player.RenderNode} = {};

        $dirtyRegion:lark.player.DirtyRegion;
        /**
         * 一个阈值，当屏幕上脏矩形区域的面积占总面积的百分比小于或等于此值时启用脏矩形绘制，否则直接清空整个屏幕重新绘制所有显示对象。
         */
        $dirtyRatio:number = 80;

        $updateStageSize(width:number, height:number):void {
            this.$stageWidth = +width || 0;
            this.$stageHeight = +height || 0;
            this.$dirtyRegion = new lark.player.DirtyRegion(width,height);
            this.$markDirty();
        }
    }
}