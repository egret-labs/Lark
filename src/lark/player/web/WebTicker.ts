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
     * 用于WEB的心跳触发器
     */
    export class WebTicker extends HashObject {

        private static _instance:WebTicker;

        public static getInstance():WebTicker{
            if(!WebTicker._instance){
                WebTicker._instance = new WebTicker();
            }
            return WebTicker._instance;
        }

        public constructor(){
            super();
            WebTicker._instance = this;
            this.requestAnimationFrame =
                window["requestAnimationFrame"] ||
                window["webkitRequestAnimationFrame"] ||
                window["mozRequestAnimationFrame"] ||
                window["oRequestAnimationFrame"] ||
                window["msRequestAnimationFrame"];

            this.cancelAnimationFrame =
                window["cancelAnimationFrame"] ||
                window["msCancelAnimationFrame"] ||
                window["mozCancelAnimationFrame"] ||
                window["webkitCancelAnimationFrame"] ||
                window["oCancelAnimationFrame"] ||
                window["cancelRequestAnimationFrame"] ||
                window["msCancelRequestAnimationFrame"] ||
                window["mozCancelRequestAnimationFrame"] ||
                window["oCancelRequestAnimationFrame"] ||
                window["webkitCancelRequestAnimationFrame"];

            if (!this.requestAnimationFrame) {
                this.requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
                this.cancelAnimationFrame = function (id) {
                    return window.clearTimeout(id);
                };
            }
        }

        private requestAnimationFrame:Function;
        private cancelAnimationFrame:Function;
        private requestAnimationId:number;
        private isRunning:boolean = false;

        private callBackList:Function[] = [];
        private thisObjectList:any[] = [];

        public register(listener:Function,thisObject:any):void{
            var index = this.callBackList.indexOf(listener);
            if(index!=-1){
                return;
            }
            this.callBackList.push(listener);
            this.thisObjectList.push(thisObject);
            if(!this.isRunning){
                this.isRunning = true;
                this.requestAnimationId = this.requestAnimationFrame.call(window, this.onTick);
            }
        }

        public unregister(listener:Function, thisObject:any):void {
            var index = this.callBackList.indexOf(listener);
            if(index!=-1){
                this.callBackList.splice(index,1);
                this.thisObjectList.splice(index,1);
            }
            if(this.callBackList.length==0&&this.isRunning){
                this.isRunning = false;
                this.cancelAnimationFrame.call(window, this.requestAnimationId);
            }
        }

        private onTick = ():void=> {
            var length = this.callBackList.length;
            for(var i=0;i<length;i++){
                this.callBackList[i].call(this.thisObjectList[i])
            }
            this.requestAnimationId = this.requestAnimationFrame.call(window, this.onTick);
        }
    }
}