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
         * 获取单例，注意只能获取一次，用于初始化。
         */
        public static getInstance():Ticker{
            if(!Ticker.$instance){
                return Ticker.$instance = new Ticker();
            }
            return null;
        }

        /**
         * 是否要广播Event.RENDER事件的标志。
         */
        static $invalidateRenderFlag:boolean = false;

        public constructor(){
            if(Ticker.$instance){
                throw new Error("Ticker实例化出错！不允许实例化多个Ticker对象。");
            }
        }

        private playerList:Player[] = [];

        /**
         * 注册一个播放器实例并运行
         */
        public startPlayer(player:Player):void{
            if(this.playerList.indexOf(player)!=-1){
                return;
            }
            this.playerList = this.playerList.concat();
            this.playerList.push(player);
        }

        /**
         * 停止一个播放器实例的运行。
         */
        public stopPlayer(player:Player):void{
            var index = this.playerList.indexOf(player);
            if(index!==-1){
                this.playerList = this.playerList.concat();
                this.playerList.splice(index,1);
            }
        }

        /**
         * 执行一次刷新
         */
        public update():void{
            var list = this.playerList;
            var length = list.length;
            if(length==0){
                return;
            }
            this.broadcastEnterFrame();
            if(Ticker.$invalidateRenderFlag){
                this.broadcastRender();
                Ticker.$invalidateRenderFlag = false;
            }
            for(var i=0;i<length;i++){
                list[i].render();
            }

        }

        private reuseEvent:Event = new Event("")

        /**
         * 广播EnterFrame事件。
         */
        private broadcastEnterFrame():void {
            var list = DisplayObject.$enterFrameCallBackList;
            var length = list.length;
            if(length===0){
                return;
            }
            list = list.concat();
            var event:Event = this.reuseEvent;
            event.$type = Event.ENTER_FRAME;
            for (var i:number = 0; i < length; i++) {
                var eventBin:any = list[i];
                event.$target = eventBin.display;
                event.$currentTarget = eventBin.display;
                eventBin.listener.call(eventBin.thisObject, event);
            }
        }

        /**
         * 广播Render事件。
         */
        private broadcastRender():void {
            var list:Array<any> = DisplayObject.$renderCallBackList;
            var length:number = list.length;
            if(length===0){
                return;
            }
            list = list.concat();
            var event:Event = this.reuseEvent;
            event.$type = Event.RENDER;
            for (var i:number = 0; i < length; i++) {
                var eventBin:any = list[i];
                var target = eventBin.display;
                event.$target = target;
                event.$currentTarget = target;
                eventBin.listener.call(eventBin.thisObject, event);
            }
        }
    }
}