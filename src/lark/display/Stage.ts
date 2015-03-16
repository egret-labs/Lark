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

        private _frameRate:number = 60;
        /**
         * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。
         */
        public get frameRate():number {
            return this._frameRate;
        }

        public set frameRate(value:number) {
            this._frameRate = +value;
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

        private _stageWidth:number = 0;
        /**
         * 舞台的当前宽度（以像素为单位）。
         */
        public get stageWidth():number {
            return this._stageWidth;
        }

        private _stageHeight:number = 0;
        /**
         * 舞台的当前高度（以像素为单位）。
         */
        public get stageHeight():number {
            return this._stageHeight;
        }

        $dirtyRegion:lark.player.DirtyRegion;

        $updateStageSize(width:number, height:number):void {
            this._stageWidth = +width || 0;
            this._stageHeight = +height || 0;
            this.$dirtyRegion = new lark.player.DirtyRegion(width,height);
            this.$propagateFlagsDown(DisplayObjectFlags.DirtyChildren);
        }
    }
}