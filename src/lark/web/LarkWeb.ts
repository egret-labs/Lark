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
     * Lark网页版程序入口
     */
    export function createPlayer(canvas:HTMLCanvasElement,entryClassName:string,screenWidth:number=480,screenHeight:number=800,
                                 stageScaleMode:number=StageScaleMode.NO_SCALE,stageWidth:number=480,stageHeight:number=800):lark.player.Player {
        if(!lark.player.Ticker.$instance){
            var ticker = lark.player.Ticker.$instance = new lark.player.Ticker();
            startTicker(ticker);
        }
        var stage = new lark.Stage();
        stage.$stageWidth = stageWidth;
        stage.$stageHeight = stageHeight;
        var canvasRenderer = new CanvasRenderer(canvas);
        if(!TextMetrics.$instance){
            TextMetrics.$instance = canvasRenderer;
        }
        HttpClient = WebHttpClinet;
        LarkAudio = HtmlAudio;
        LarkVideo = HtmlVideo;
        var touch = new lark.player.TouchHandler(stage);
        var webTouch = new WebTouchHandler(touch,canvas);
        var player = new lark.player.Player(canvasRenderer,stage,entryClassName,stageScaleMode);
        player.updateScreenSize(screenWidth,screenHeight);
        return player;
    }

    /**
     * 启动心跳计时器。
     */
    function startTicker(ticker:lark.player.Ticker):void {
        var requestAnimationFrame =
            window["requestAnimationFrame"] ||
            window["webkitRequestAnimationFrame"] ||
            window["mozRequestAnimationFrame"] ||
            window["oRequestAnimationFrame"] ||
            window["msRequestAnimationFrame"];

        if (!requestAnimationFrame) {
            requestAnimationFrame = function (callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
        }

        requestAnimationFrame.call(window, onTick);
        function onTick():void {
            ticker.update();
            requestAnimationFrame.call(window, onTick)
        }
    }
}