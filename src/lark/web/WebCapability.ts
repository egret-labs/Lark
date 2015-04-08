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

    export class WebCapability {
        /**
         * 检测系统属性
         */
        public static detect(): void {
            var capabilities = lark.Capabilities;
            var ua = navigator.userAgent.toLowerCase();
            capabilities.$isMobile = (ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
            var h5 = WebCapability.checkHtml5Support();
            capabilities.$audio = h5.a;
            capabilities.$canvas = h5.cvs;
            capabilities.$location = h5.geo;
            capabilities.$motion = h5.m;
            capabilities.$orientation = h5.ortt;
            capabilities.$video = h5.v;
            capabilities.$webAudio = h5.wa;
            capabilities.$webGL = h5.gl;
            capabilities.$webSocket = h5.ws;
        }
        
        private static checkHtml5Support() {

            var createElement = tag => <any>document.createElement(tag);
            var webaudio = ('webkitAudioContext' in window) || ('AudioContext' in window);

            var websocket = 'WebSocket' in window && window["WebSocket"].CLOSING === 2;

            var canvas = (() => {
                var elem = <HTMLCanvasElement>createElement("canvas");
                return !!(elem.getContext && elem.getContext('2d'))
            })();

            var support = function (elem, mime) {
                return elem.canPlayType(mime).replace(/^no$/, '');
            }

            var audio: IAudioSupport = (() => {
                var elem = createElement('audio');
                var bool: any = false;

                try {
                    if (bool = !!elem.canPlayType) {
                        bool = new Boolean(bool);
                        bool.ogg = support(elem, 'audio/ogg; codecs="vorbis"');
                        bool.mp3 = support(elem, 'audio/mpeg;');
                        bool.opus = support(elem,('audio/ogg; codecs="opus"'));
                        bool.wav = support(elem,('audio/wav; codecs="1"'));
                        bool.m4a = support(elem, 'audio/x-m4a;') || support(elem, 'audio/aac;');
                    }
                } catch (e) { }

                return bool;
            })();

            var video: IVideoSupport = (() => {
                var elem = createElement('video');
                var bool: any = false;

                try {
                    if (bool = !!elem.canPlayType) {
                        bool = new Boolean(bool);
                        bool.ogg = support(elem, 'video/ogg; codecs="theora"');
                        bool.h264 = support(elem, 'video/mp4; codecs="avc1.42E01E"');
                        bool.webm = support(elem, 'video/webm; codecs="vp8, vorbis"');
                        bool.vp9 = support(elem, 'video/webm; codecs="vp9"');
                        bool.hls = support(elem, 'application/x-mpegURL; codecs="avc1.42E01E"');
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

            var geolocation = 'geolocation' in navigator;
            var orientation = 'DeviceOrientationEvent' in window;
            var motion = 'DeviceMotionEvent' in window;
            return {
                a: audio,
                v: video,
                cvs: canvas,
                gl: webgl,
                wa: webaudio,
                ws: websocket,
                geo: geolocation,
                ortt: orientation,
                m: motion
            };
        }
    }
}