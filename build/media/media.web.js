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
                var _this = this;
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
                /**
                 * @private
                 *
                 */
                this.onAudioLoaded = function () {
                    _this.loaded = true;
                    _this.originAudio.removeEventListener("canplaythrough", _this.onAudioLoaded);
                    _this.emitWith(lark.Event.COMPLETE);
                };
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
                audio.addEventListener("canplaythrough", this.onAudioLoaded);
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
            p.onAudioError = function () {
                this.emitWith(lark.Event.IO_ERROR);
            };
            return HtmlSound;
        })(lark.EventEmitter);
        web.HtmlSound = HtmlSound;
        lark.registerClass(HtmlSound,"lark.web.HtmlSound",["lark.Sound","lark.IEventEmitter"]);
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
                this.emitWith(lark.Event.ENDED);
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
        lark.registerClass(HtmlSoundChannel,"lark.web.HtmlSoundChannel",["lark.SoundChannel","lark.IEventEmitter"]);
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
        var WebVideo = (function (_super) {
            __extends(WebVideo, _super);
            /**
             * @inheritDoc
             */
            function WebVideo(url) {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.loaded = false;
                /**
                 * @private
                 */
                this.closed = false;
                /**
                 * @private
                 */
                this.heightSet = NaN;
                /**
                 * @private
                 */
                this.widthSet = NaN;
                this._fullscreen = true;
                /**
                 * @private
                 *
                 */
                this.onVideoLoaded = function () {
                    _this.video.removeEventListener("canplay", _this.onVideoLoaded);
                    var width = _this.width;
                    var height = _this.height;
                    _this.loaded = true;
                    _this.video.pause();
                    if (_this.posterData) {
                        _this.posterData.width = _this.video.videoWidth;
                        _this.posterData.height = _this.video.videoHeight;
                    }
                    _this.$invalidateContentBounds();
                    _this.width = isNaN(_this.widthSet) ? _this.video.videoWidth : _this.widthSet;
                    _this.height = isNaN(_this.heightSet) ? _this.video.videoHeight : _this.heightSet;
                    _this.emitWith(lark.Event.COMPLETE);
                };
                this.$renderRegion = new lark.sys.Region();
                this.src = url;
                this.once(lark.Event.ADDED_TO_STAGE, this.loadPoster, this);
            }
            var d = __define,c=WebVideo;p=c.prototype;
            /**
             * @inheritDoc
             */
            p.load = function (url) {
                var _this = this;
                url = url || this.src;
                if (DEBUG && !url) {
                    lark.$error(3002);
                }
                var video = document.createElement("video");
                video.src = url;
                video.setAttribute("webkit-playsinline", "webkit-playsinline");
                video.addEventListener("canplay", this.onVideoLoaded);
                video.addEventListener("error", function () { return _this.onVideoError(); });
                video.addEventListener("ended", function () { return _this.onVideoEnded(); });
                video.load();
                video.play();
                setTimeout(function () { return video.pause(); }, 16);
                this.video = video;
            };
            /**
             * @inheritDoc
             */
            p.play = function (startTime, loop) {
                var _this = this;
                if (loop === void 0) { loop = false; }
                if (this.loaded == false) {
                    this.load();
                    this.once(lark.Event.COMPLETE, function (e) { return _this.play(startTime, loop); }, this);
                    return;
                }
                var video = this.video;
                if (startTime != undefined)
                    video.currentTime = +startTime || 0;
                video.loop = !!loop;
                video.play();
                video.style.position = "absolute";
                video.style.top = "0px";
                video.style.left = "0px";
                video.style.height = "0";
                video.style.width = "0";
                document.body.appendChild(video);
                var fullscreen = false;
                if (this._fullscreen) {
                    fullscreen = this.goFullscreen();
                }
                if (fullscreen == false) {
                    video.setAttribute("webkit-playsinline", "webkit-playsinline");
                    lark.startTick(this.markDirty, this);
                }
            };
            p.goFullscreen = function () {
                var _this = this;
                var video = this.video;
                if (video['webkitRequestFullscreen'])
                    video['webkitRequestFullscreen']();
                else if (video['webkitRequestFullScreen'])
                    video['webkitRequestFullScreen']();
                else if (video['msRequestFullscreen'])
                    video['msRequestFullscreen']();
                else if (video['requestFullscreen'])
                    video['requestFullscreen']();
                else
                    return false;
                video.removeAttribute("webkit-playsinline");
                video['onwebkitfullscreenchange'] = function (e) {
                    var isfullscreen = !!video['webkitDisplayingFullscreen'];
                    if (!isfullscreen) {
                        _this.pause();
                    }
                };
                video['onwebkitfullscreenerror'] = function (e) {
                    lark.$error(3003);
                };
                return true;
            };
            /**
             * @inheritDoc
             */
            p.close = function () {
                this.pause();
                if (this.loaded == false && this.video)
                    this.video.src = "";
                if (this.video) {
                    if (this.video['remove'])
                        this.video['remove']();
                    this.video = null;
                }
                this.closed = true;
                this.loaded = false;
            };
            /**
             * @inheritDoc
             */
            p.pause = function () {
                if (this.video) {
                    this.video.pause();
                    this.onVideoEnded();
                }
                lark.stopTick(this.markDirty, this);
            };
            d(p, "volume",
                /**
                 * @inheritDoc
                 */
                function () {
                    if (!this.video)
                        return 1;
                    return this.video.volume;
                },
                /**
                 * @inheritDoc
                 */
                function (value) {
                    if (!this.video)
                        return;
                    this.video.volume = value;
                }
            );
            d(p, "position",
                /**
                 * @inheritDoc
                 */
                function () {
                    if (!this.video)
                        return 0;
                    return this.video.currentTime;
                },
                /**
                 * @inheritDoc
                 */
                function (value) {
                    if (!this.video)
                        return;
                    this.video.currentTime = value;
                }
            );
            d(p, "fullscreen",
                /**
                 * @inheritDoc
                 */
                function () {
                    return this._fullscreen;
                },
                /**
                 * @inheritDoc
                 */
                function (value) {
                    this._fullscreen = !!value;
                    if (this.video && this.video.paused == false) {
                        this.goFullscreen();
                    }
                }
            );
            d(p, "bitmapData",
                /**
                 * @inheritDoc
                 */
                function () {
                    if (!this.video || !this.loaded)
                        return null;
                    if (!this._bitmapData) {
                        this.video.width = this.video.videoWidth;
                        this.video.height = this.video.videoHeight;
                        this._bitmapData = lark.web['toBitmapData'](this.video);
                    }
                    return this._bitmapData;
                },undefined
            );
            p.loadPoster = function () {
                var _this = this;
                var poster = this.poster;
                if (!poster)
                    return;
                var imageLoader = new lark.ImageLoader();
                imageLoader.once(lark.Event.COMPLETE, function (e) {
                    _this.posterData = imageLoader.data;
                    if (_this.video) {
                        _this.posterData.width = _this.video.videoWidth;
                        _this.posterData.height = _this.video.videoHeight;
                    }
                    else {
                        _this.posterData.width = isNaN(_this.widthSet) ? _this.posterData.width : _this.widthSet;
                        _this.posterData.height = isNaN(_this.heightSet) ? _this.posterData.height : _this.heightSet;
                    }
                    _this.$invalidateContentBounds();
                }, this);
                imageLoader.load(poster);
            };
            /**
             * @private
             *
             */
            p.onVideoEnded = function () {
                this.emitWith(lark.Event.ENDED);
                this.$invalidateContentBounds();
            };
            /**
             * @private
             *
             */
            p.onVideoError = function () {
                this.emitWith(lark.Event.IO_ERROR);
            };
            /**
             * @private
             */
            p.$measureContentBounds = function (bounds) {
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                if (bitmapData) {
                    bounds.setTo(0, 0, bitmapData.width, bitmapData.height);
                }
                else if (posterData) {
                    bounds.setTo(0, 0, posterData.width, posterData.height);
                }
                else {
                    bounds.setEmpty();
                }
            };
            /**
             * @private
             */
            p.$render = function (context) {
                var bitmapData = this.bitmapData;
                var posterData = this.posterData;
                if ((!bitmapData || this.video && this.video.paused) && posterData) {
                    context.drawImage(posterData, 0, 0, posterData.width, posterData.height);
                }
                if (bitmapData) {
                    context.imageSmoothingEnabled = true;
                    context.drawImage(bitmapData, 0, 0, bitmapData.width, bitmapData.height);
                }
            };
            p.markDirty = function (time) {
                this.$invalidate();
                return true;
            };
            /**
             * @private
             * 设置显示高度
             */
            p.$setHeight = function (value) {
                _super.prototype.$setHeight.call(this, value);
                this.heightSet = +value || 0;
            };
            /**
             * @private
             * 设置显示宽度
             */
            p.$setWidth = function (value) {
                _super.prototype.$setWidth.call(this, value);
                this.widthSet = +value || 0;
            };
            return WebVideo;
        })(lark.DisplayObject);
        web.WebVideo = WebVideo;
        lark.registerClass(WebVideo,"lark.web.WebVideo",["lark.Video"]);
        lark.Video = WebVideo;
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
