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
     * Lark心跳控制器
     */
    export class Ticker {

        static $instance:Ticker;

        /**
         * 是否要广播Event.RENDER事件的标志。
         */
        static $invalidateRenderFlag:boolean = false;
        /**
         * 需要立即刷新屏幕的标志
         */
        static $requestRenderingFlag:boolean = false;

        public constructor() {
            if (Ticker.$instance) {
                throw new Error("Ticker实例化出错！不允许实例化多个Ticker对象。");
            }
            lark.$START_TIME = Date.now();
        }

        private playerList:Player[] = [];

        /**
         * 注册一个播放器实例并运行
         */
        $addPlayer(player:Player):void {
            if (this.playerList.indexOf(player) != -1) {
                return;
            }
            this.playerList = this.playerList.concat();
            this.playerList.push(player);
        }

        /**
         * 停止一个播放器实例的运行。
         */
        $removePlayer(player:Player):void {
            var index = this.playerList.indexOf(player);
            if (index !== -1) {
                this.playerList = this.playerList.concat();
                this.playerList.splice(index, 1);
            }
        }

        private timerList:Timer[] = [];

        $addTimer(timer:Timer):void {
            if (this.timerList.indexOf(timer) != -1) {
                return;
            }
            this.timerList = this.timerList.concat();
            this.timerList.push(timer);
        }

        $removeTimer(timer:Timer):void {
            var index = this.timerList.indexOf(timer);
            if (index !== -1) {
                this.timerList = this.timerList.concat();
                this.timerList.splice(index, 1);
            }
        }

        /**
         * 全局帧率
         */
        $frameRate:number = 60;

        private frameInterval:number = 1;
        /**
         * 设置全局帧率
         */
        $setFrameRate(value:number):void{
            value = +value||0;
            if(value<=0){
                return;
            }
            if(this.$frameRate===value){
                return;
            }
            this.$frameRate = value;
            if(value>60){
                value = 60;
            }
            //这里用60*1000来避免浮点数计算不准确的问题。
            this.lastCount = this.frameInterval = Math.round(60000/value);
        }

        private lastCount:number = 1000;
        /**
         * 执行一次刷新
         */
        public update():void {
            var timerList = this.timerList;
            var timerLength = timerList.length;
            for (var i = 0; i < timerLength; i++) {
                timerList[i].$update();
            }
            this.lastCount -= 1000;
            if(this.lastCount>0){
                if(Ticker.$requestRenderingFlag){
                    this.render(false);
                }
                return;
            }
            this.lastCount += this.frameInterval;
            this.broadcastEnterFrame();
            this.render(true);
        }

        /**
         * 执行一次屏幕渲染
         */
        private render(triggerByFrame:boolean):void{
            var playerList = this.playerList;
            var length = playerList.length;
            if (length == 0) {
                return;
            }
            if (Ticker.$invalidateRenderFlag) {
                this.broadcastRender();
                Ticker.$invalidateRenderFlag = false;
            }
            for (var i = 0; i < length; i++) {
                playerList[i].$render(triggerByFrame);
            }
            Ticker.$requestRenderingFlag = false;
        }

        private reuseEvent:Event = new Event("")

        /**
         * 广播EnterFrame事件。
         */
        private broadcastEnterFrame():void {
            var list = DisplayObject.$enterFrameCallBackList;
            var length = list.length;
            if (length === 0) {
                return;
            }
            list = list.concat();
            var event = this.reuseEvent;
            event.$type = Event.ENTER_FRAME;
            for (var i = 0; i < length; i++) {
                list[i].emit(event);
            }
        }

        /**
         * 广播Render事件。
         */
        private broadcastRender():void {
            var list = DisplayObject.$renderCallBackList;
            var length = list.length;
            if (length === 0) {
                return;
            }
            list = list.concat();
            var event:Event = this.reuseEvent;
            event.$type = Event.RENDER;
            for (var i = 0; i < length; i++) {
                list[i].emit(event);
            }
        }
    }
}
