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

    var html5FeatureSupport = checkHtml5Support();
    export class Capabilities {

        static $language:string = "zh-CN";
        /**
         * 指定运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
         * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。
         * 以下是可能的语言和值：
         * 简体中文  zh-CN
         * 繁体中文  zh-TW
         * 英语      en
         * 日语      ja
         * 韩语      ko
         * 法语      fr
         * 捷克语    cs
         * 丹麦语    da
         * 荷兰语    nl
         * 芬兰语    fi
         * 德语      de
         * 匈牙利语   hu
         * 意大利语   it
         * 挪威语    no
         * 其他/未知 xu
         * 波兰语    pl
         * 葡萄牙语  pt
         * 俄语      ru
         * 西班牙语  es
         * 瑞典语    sv
         * 土耳其语  tr
         */
        public static get language():string{
            return Capabilities.$language;
        }

        public static $isMobile:boolean;

        public static get isMobile():boolean{
            return Capabilities.$isMobile;
        }
    }

    interface IAudioSupport {
        ogg: boolean;
        mp3: boolean;
        wav: boolean;
        m4a: boolean;
        opus: boolean;
    }

    interface IVideoSupport {
        ogg: boolean;
        h264:boolean;
        webm:boolean;
        vp9 :boolean;
        hls :boolean;
    }

    function checkHtml5Support() {

        var createElement = tag => <any>document.createElement(tag);
        var webaudio = ('webkitAudioContext' in window) || ('AudioContext' in window);

        var websocket = 'WebSocket' in window && window["WebSocket"].CLOSING === 2;

        var canvas = (() => {
            var elem = <HTMLCanvasElement>createElement("canvas");
            return !!(elem.getContext && elem.getContext('2d'))
        })();

        var support = function (elem,mime) {
            return elem.canPlayType(mime).replace(/^no$/, '');
        }

        var audio:IAudioSupport = (() => {
            var elem = createElement('audio');
            var bool: any = false;

            try {
                if (bool = !!elem.canPlayType) {
                    bool = new Boolean(bool);
                    bool.ogg = support(elem,'audio/ogg; codecs="vorbis"');
                    bool.mp3 = support(elem,'audio/mpeg;');
                    bool.opus = support(elem,('audio/ogg; codecs="opus"'));
                    bool.wav = support(elem,('audio/wav; codecs="1"'));
                    bool.m4a = support(elem, 'audio/x-m4a;') || support(elem, 'audio/aac;');
                }
            } catch (e) { }

            return bool;
        })();

        var video:IVideoSupport = (() => {
            var elem = createElement('video');
            var bool: any = false;

            try {
                if (bool = !!elem.canPlayType) {
                    bool = new Boolean(bool);
                    bool.ogg = support(elem,'video/ogg; codecs="theora"');
                    bool.h264 = support(elem,'video/mp4; codecs="avc1.42E01E"');
                    bool.webm = support(elem,'video/webm; codecs="vp8, vorbis"');
                    bool.vp9 = support(elem,'video/webm; codecs="vp9"');
                    bool.hls = support(elem,'application/x-mpegURL; codecs="avc1.42E01E"');
                }
            } catch (e) { }

            return bool;
        })();

        var webgl = (() => {
            var canvas = createElement('canvas');
            var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' : 'supportsContext';
            if (supports in canvas) {
                return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');
            }
            return 'WebGLRenderingContext' in window;
        })();

        var geolocation = 'geolocation' in navigator

        return {
            a: audio,
            v: video,
            cvs: canvas,
            gl: webgl,
            wa: webaudio,
            ws: websocket,
            geo: geolocation
        };
    }
}