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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var lark;
(function (lark) {
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var HtmlSound = (function (_super) {
            __extends(HtmlSound, _super);
            /**
             * @private
             * @inheritDoc
             */
            function HtmlSound(url) {
                _super.call(this);
                /**
                 * @private
                 */
                this.audios = [];
                /**
                 * @private
                 */
                this.loaded = false;
                /**
                 * @private
                 */
                this.closed = false;
                this.url = url;
            }
            var d = __define,c=HtmlSound;p=c.prototype;
            /**
             * @private
             * @inheritDoc
             */
            p.load = function (url) {
                var _this = this;
                url = url || this.url;
                if (DEBUG && !url) {
                    lark.$error(3002);
                }
                var audio = new Audio(url);
                audio.addEventListener("canplaythrough", function () { return _this.onAudioLoaded(); });
                audio.addEventListener("error", function () { return _this.onAudioError(); });
                audio.load();
                this.originAudio = audio;
                this.audios.push(audio);
            };
            /**
             * @private
             * @inheritDoc
             */
            p.play = function (startTime, loop) {
                if (startTime === void 0) { startTime = 0; }
                if (loop === void 0) { loop = false; }
                if (DEBUG && this.loaded == false) {
                    lark.$error(3001);
                }
                var audio = this.audios.pop();
                if (audio == undefined) {
                    audio = this.originAudio.cloneNode();
                    audio.addEventListener("canplaythrough", function () { return audio.currentTime = startTime; });
                }
                else {
                    audio.currentTime = startTime;
                }
                audio.loop = !!loop;
                var channel = new web.HtmlSoundChannel(audio);
                channel.$sound = this;
                channel.$loop = loop;
                channel.$startTime = startTime;
                audio.play();
                return channel;
            };
            /**
             * @private
             * @inheritDoc
             */
            p.close = function () {
                if (this.loaded == false && this.originAudio)
                    this.originAudio.src = "";
                if (this.originAudio)
                    this.originAudio = null;
                if (this.audios)
                    this.audios.length = 0;
                this.closed = true;
            };
            /**
             * @private
             *
             * @param audio
             */
            p.$recycle = function (audio) {
                if (this.closed)
                    return;
                this.audios.push(audio);
            };
            /**
             * @private
             *
             */
            p.onAudioLoaded = function () {
                this.loaded = true;
                this.emitWith(lark.Event.COMPLETE);
            };
            /**
             * @private
             *
             */
            p.onAudioError = function () {
                this.emitWith(lark.Event.IO_ERROR);
            };
            return HtmlSound;
        })(lark.EventEmitter);
        web.HtmlSound = HtmlSound;
        lark.Sound = HtmlSound;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
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
var lark;
(function (lark) {
    var web;
    (function (web) {
        /**
         * @private
         * @inheritDoc
         */
        var HtmlSoundChannel = (function (_super) {
            __extends(HtmlSoundChannel, _super);
            /**
             * @private
             */
            function HtmlSoundChannel(audio) {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.$loop = false;
                /**
                 * @private
                 */
                this.$startTime = 0;
                /**
                 * @private
                 */
                this.audio = null;
                /**
                 * @private
                 */
                this.onPlayEnd = function () {
                    if (_this.$loop == false) {
                        _this.stop();
                        return;
                    }
                    _this.audio.load();
                    _this.audio.currentTime = _this.$startTime;
                    _this.audio.play();
                };
                audio.addEventListener("ended", this.onPlayEnd);
                this.audio = audio;
            }
            var d = __define,c=HtmlSoundChannel;p=c.prototype;
            /**
             * @private
             * @inheritDoc
             */
            p.stop = function () {
                if (!this.audio)
                    return;
                var audio = this.audio;
                audio.pause();
                audio.removeEventListener("ended", this.onPlayEnd);
                audio['$channel'] = null;
                this.audio = null;
                this.emitWith(lark.Event.COMPLETE);
                this.$sound.$recycle(audio);
                this.$sound = null;
            };
            d(p, "volume",
                /**
                 * @private
                 * @inheritDoc
                 */
                function () {
                    if (!this.audio)
                        return 1;
                    return this.audio.volume;
                },
                /**
                 * @inheritDoc
                 */
                function (value) {
                    if (!this.audio)
                        return;
                    this.audio.volume = value;
                }
            );
            d(p, "position",
                /**
                 * @private
                 * @inheritDoc
                 */
                function () {
                    if (!this.audio)
                        return 0;
                    return this.audio.currentTime;
                },undefined
            );
            return HtmlSoundChannel;
        })(lark.EventEmitter);
        web.HtmlSoundChannel = HtmlSoundChannel;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
