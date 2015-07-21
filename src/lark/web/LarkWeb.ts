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
     * @private
     * 刷新所有Lark播放器的显示区域尺寸。仅当使用外部JavaScript代码动态修改了Lark容器大小时，需要手动调用此方法刷新显示区域。
     * 当网页尺寸发生改变时此方法会自动被调用。
     */
    export function updateAllScreens():void {
        var containerList = document.querySelectorAll(".lark-player");
        var length = containerList.length;
        for (var i = 0; i < length; i++) {
            var container = containerList[i];
            var player = <WebPlayer>container["lark-player"];
            player.updateScreenSize();
        }
    }

    /**
     * @private
     * 网页加载完成，实例化页面中定义的Larksys标签
     */
    function runLark():void {
        console.log("lark: run");
        if(DEBUG){
            var language = navigator.language || navigator.browserLanguage || "en_US";
            language = language.replace("-", "_");

            if (language in lark.$locale_strings)
                lark.$language = language;
        }

        var ticker = lark.sys.$ticker = new sys.Ticker();
        startTicker(ticker);
        var surfaceFactory = new CanvasFactory();
        sys.surfaceFactory = surfaceFactory;
        if (!lark.sys.screenAdapter) {
            lark.sys.screenAdapter = new lark.sys.ScreenAdapter();
        }

        var list = document.querySelectorAll(".lark-player");
        var length = list.length;
        for (var i = 0; i < length; i++) {
            var container = <HTMLDivElement>list[i];
            var player = new WebPlayer(container);
            container["lark-player"] = player;
        }
    }

    /**
     * @private
     * 启动心跳计时器。
     */
    function startTicker(ticker:lark.sys.Ticker):void {
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
            requestAnimationFrame.call(window, onTick);
        }
    }

    //覆盖原生的isNaN()方法实现，在不同浏览器上有2~10倍性能提升。
    window["isNaN"] = function (value:number):boolean {
        value = +value;
        return value !== value;
    };

    function toArray(argument) {
        var args = [];
        for (var i = 0; i < argument.length; i++) {
            args.push(argument[i]);
        }
        return args;
    }

    lark.warn = function () {
        console.warn.apply(console, toArray(arguments))
    };
    lark.error = function () {
        console.error.apply(console, toArray(arguments))
    };
    lark.assert = function () {
        console.assert.apply(console, toArray(arguments))
    };
    if (DEBUG) {
        lark.log = function () {
            if (DEBUG) {
                var length = arguments.length;
                var info = "";
                for (var i = 0; i < length; i++) {
                    info += arguments[i] + " ";
                }
                sys.$logToFPS(info);
            }
            console.log.apply(console, toArray(arguments));
        }
    }
    else {
        lark.log = function () {
            console.log.apply(console, toArray(arguments))
        };
    }

    if (NATIVE) {
        document.addEventListener("deviceready", runLark, false);
    } else {
        window.addEventListener("load", runLark);
    }
    window.addEventListener("resize", updateAllScreens);
}