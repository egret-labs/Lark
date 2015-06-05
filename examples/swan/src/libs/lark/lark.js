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
var __define = this.__define || function (o, p, g, s) { 
  Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
var lark;
(function (lark) {
    lark.XML;
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
    var Capabilities = (function () {
        function Capabilities() {
        }
        var d = __define,c=Capabilities;p=c.prototype;
        d(Capabilities, "language",
            /**
             * 指定运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
             * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。
             * 以下是可能但不限于的语言和值：
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
            function () {
                return Capabilities.$language;
            },undefined
        );
        d(Capabilities, "isMobile",
            function () {
                return Capabilities.$isMobile;
            },undefined
        );
        d(Capabilities, "canvas",
            function () {
                return Capabilities.$canvas;
            },undefined
        );
        d(Capabilities, "audio",
            function () {
                return Capabilities.$audio;
            },undefined
        );
        d(Capabilities, "video",
            function () {
                return Capabilities.$video;
            },undefined
        );
        d(Capabilities, "webGL",
            function () {
                return Capabilities.$webGL;
            },undefined
        );
        d(Capabilities, "webAudio",
            function () {
                return Capabilities.$webAudio;
            },undefined
        );
        d(Capabilities, "webSocket",
            function () {
                return Capabilities.$webSocket;
            },undefined
        );
        d(Capabilities, "location",
            function () {
                return Capabilities.$location;
            },undefined
        );
        d(Capabilities, "orientation",
            function () {
                return Capabilities.$orientation;
            },undefined
        );
        d(Capabilities, "motion",
            function () {
                return Capabilities.$motion;
            },undefined
        );
        Capabilities.$language = "zh-CN";
        return Capabilities;
    })();
    lark.Capabilities = Capabilities;
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
    lark.$START_TIME = 0;
    /**
     * 用于计算相对时间。此方法返回自启动 Lark 框架以来经过的毫秒数。
     * @returns 启动 Lark 框架以来经过的毫秒数。
     */
    function getTimer() {
        return Date.now() - lark.$START_TIME;
    }
    lark.getTimer = getTimer;
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
    var sys;
    (function (sys) {
        var stageToTextLayerMap = {};
        /**
         * 获取
         * @param textInput
         * @returns {any}
         */
        function $getTextAdapter(textInput) {
            var stageHash = textInput.stage ? textInput.stage.$hashCode : 0;
            return stageToTextLayerMap[stageHash];
        }
        sys.$getTextAdapter = $getTextAdapter;
        function $cacheTextAdapter(adapter) {
            stageToTextLayerMap[adapter.$stage.$hashCode] = adapter;
        }
        sys.$cacheTextAdapter = $cacheTextAdapter;
    })(sys = lark.sys || (lark.sys = {}));
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
    /**
     * 水平对齐方式
     */
    var HorizontalAlign = (function () {
        function HorizontalAlign() {
        }
        var d = __define,c=HorizontalAlign;p=c.prototype;
        /**
         * 左对齐
         */
        HorizontalAlign.LEFT = "left";
        /**
         * 右对齐
         */
        HorizontalAlign.RIGHT = "right";
        /**
         * 水平居中对齐
         */
        HorizontalAlign.CENTER = "center";
        return HorizontalAlign;
    })();
    lark.HorizontalAlign = HorizontalAlign;
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
    var sys;
    (function (sys) {
        /**
         * 全局共享的RenderContext。通常用于交换缓存，测量文本或创建填充对象。
         */
        sys.sharedRenderContext;
        /**
         * surfaceFactory实例
         */
        sys.surfaceFactory;
    })(sys = lark.sys || (lark.sys = {}));
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
    var sys;
    (function (sys) {
        /**
         * StageScaleMode 类为舞台缩放模式提供值。
         */
        var ScaleMode = (function () {
            function ScaleMode() {
            }
            var d = __define,c=ScaleMode;p=c.prototype;
            /**
             * 不缩放应用程序内容。即使在更改播放器视口大小时，它仍然保持不变。如果播放器视口比内容小，则可能进行一些裁切。
             * 在此模式下，舞台尺寸（Stage.stageWidth,Stage.stageHeight）始终跟播放器视口大小保持一致。
             */
            ScaleMode.NO_SCALE = "noScale";
            /**
             * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较宽方向填满播放器视口，另一个方向的两侧可能会不够宽而留有黑边。
             * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
             */
            ScaleMode.SHOW_ALL = "showAll";
            /**
             * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
             * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
             */
            ScaleMode.NO_BORDER = "noBorder";
            /**
             * 不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器视口。
             * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
             */
            ScaleMode.EXACT_FIT = "exactFit";
            /**
             * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
             * 在此模式下，舞台宽度(Stage.stageWidth)始终等于初始化时外部传入的应用程序内容宽度。舞台高度(Stage.stageHeight)由当前的缩放比例与播放器视口高度决定。
             */
            ScaleMode.FIXED_WIDTH = "fixedWidth";
            /**
             * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
             * 在此模式下，舞台高度(Stage.stageHeight)始终等于初始化时外部传入的应用程序内容高度。舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽度决定。
             */
            ScaleMode.FIXED_HEIGHT = "fixedHeight";
            return ScaleMode;
        })();
        sys.ScaleMode = ScaleMode;
    })(sys = lark.sys || (lark.sys = {}));
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
    /**
     * 空数字。通常用于标识一个数值属性未被外部显式设置。例如对 TextField.width 赋值NONE，将会取消之前显式设置的宽度，从而让TextFiled自动测量一个合适的宽度。
     * 框架内不直接使用NaN，是因为isNaN()方法有严重的性能问题。使用 isNone() 来作为显式设置的判断依据能获得非常高的运行性能。
     */
    lark.NONE = 0x8000000;
    /**
     * 判断数字是否为NONE
     * @param value 要判断的数字
     */
    function isNone(value) {
        return value === lark.NONE;
    }
    lark.isNone = isNone;
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
    var $TextWidthCache = {};
    /**
     * 用于文本宽度测量的辅助类
     */
    var TextMeasurer = (function () {
        function TextMeasurer() {
        }
        var d = __define,c=TextMeasurer;p=c.prototype;
        /**
         * 测量文本在指定样式下的宽度
         */
        TextMeasurer.measureText = function (text, font) {
            var context = lark.sys.sharedRenderContext;
            var width = 0.0;
            var fontCache = $TextWidthCache;
            var cache = fontCache[font] || (fontCache[font] = {});
            context.font = font;
            var length = text.length;
            for (var i = 0; i < length; i++) {
                var letter = text.charCodeAt(i);
                var w = cache[letter] || (cache[letter] = context.measureText(text.charAt(i)).width);
                width += w;
            }
            return width;
        };
        return TextMeasurer;
    })();
    lark.TextMeasurer = TextMeasurer;
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
    /**
     * 垂直对齐方式
     */
    var VerticalAlign = (function () {
        function VerticalAlign() {
        }
        var d = __define,c=VerticalAlign;p=c.prototype;
        /**
         * 顶对齐
         */
        VerticalAlign.TOP = "top";
        /**
         * 底对齐
         */
        VerticalAlign.BOTTOM = "bottom";
        /**
         * 垂直居中对齐
         */
        VerticalAlign.MIDDLE = "middle";
        return VerticalAlign;
    })();
    lark.VerticalAlign = VerticalAlign;
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
    var $getDefinitionByNameCache = {};
    /**
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     */
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = $getDefinitionByNameCache[name];
        if (definition) {
            return definition;
        }
        var paths = name.split(".");
        var length = paths.length;
        definition = __global;
        for (var i = 0; i < length; i++) {
            var path = paths[i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        $getDefinitionByNameCache[name] = definition;
        return definition;
    }
    lark.getDefinitionByName = getDefinitionByName;
})(lark || (lark = {}));
var __global = __global || this;
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
    /**
     * 检查指定对象是否为 Lark 框架内指定接口或类或其子类的实例。此方法与使用 instanceOf 关键字相比具有更高的性能，并且能判断接口的实现。
     * 若要判断对象是否为项目中的自定义类或接口的实例，请使用 lark.registerClass() 方法为自定义类注册运行时信息即可。
     * @param instance 要判断的实例，注意：传入的值必须是实例，而不是类定义。若要判断类定义使用表达式：typeof instance == "function" 即可。
     * @param typeFlag 类或接口的枚举值，请参考 lark.Types 或 swan.Types 定义的枚举常量。
     * @returns 返回true表示当前对象是指定类或接口的实例。
     */
    function is(instance, typeFlag) {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var prototype = Object.getPrototypeOf(instance);
        var flags = prototype ? prototype.__typeFlags__ : null;
        if (!flags) {
            return false;
        }
        return (flags.indexOf(typeFlag) !== -1);
    }
    lark.is = is;
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
    lark.ImageLoader;
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
    /**
     * 注册并启动一个计时器，通常会以60FPS的速率触发回调方法，并传入当前时间戳。注意：注册后将会持续触发回调方法，若要停止回调，需要手动调用stopTick()方法。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     */
    function startTick(callBack, thisObject) {
        if (DEBUG && !callBack) {
            lark.$error(1003, "callBack");
        }
        lark.sys.$ticker.$startTick(callBack, thisObject);
    }
    lark.startTick = startTick;
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
    lark.HttpRequest;
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
    /**
     * 停止之前用 startTick() 方法启动的计时器。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     */
    function stopTick(callBack, thisObject) {
        if (DEBUG && !callBack) {
            lark.$error(1003, "callBack");
        }
        lark.sys.$ticker.$stopTick(callBack, thisObject);
    }
    lark.stopTick = stopTick;
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
    /**
     * HttpRequestMethod 类提供了一些值，这些值可指定在将数据发送到服务器时，
     * HttpRequest 对象应使用 POST 方法还是 GET 方法。
     */
    var HttpMethod = (function () {
        function HttpMethod() {
        }
        var d = __define,c=HttpMethod;p=c.prototype;
        /**
         * 表示 HttpRequest 对象是一个 GET。
         */
        HttpMethod.GET = "GET";
        /**
         * 表示 HttpRequest 对象是一个 POST。
         */
        HttpMethod.POST = "POST";
        return HttpMethod;
    })();
    lark.HttpMethod = HttpMethod;
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
    /**
     * HttpResponseType 定义HttpRequest.responseType属性的值。确定Http请求返回的数据格式。
     */
    var HttpResponseType = (function () {
        function HttpResponseType() {
        }
        var d = __define,c=HttpResponseType;p=c.prototype;
        /**
         * 返回字符串。HttpRequest.responseType属性的默认值。
         */
        HttpResponseType.TEXT = "text";
        /**
         * 返回二进制的ArrayBuffer对象。
         */
        HttpResponseType.ARRAY_BUFFER = "arraybuffer";
        /**
         * 返回 JavaScript 对象，将自动解析自服务器传递回来的 JSON 字符串。
         */
        HttpResponseType.JSON = "json";
        return HttpResponseType;
    })();
    lark.HttpResponseType = HttpResponseType;
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
this["DEBUG"] = true;
this["RELEASE"] = false;
var lark;
(function (lark) {
    function _error(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = lark.tr.apply(null, arguments);
        if (DEBUG) {
            lark.sys.$logToFPS("Error #" + code + ": " + text);
        }
        throw new Error("#" + code + ": " + text);
    }
    lark.$error = _error;
    function _warn(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = lark.tr.apply(null, arguments);
        if (DEBUG) {
            lark.sys.$logToFPS("Warning #" + code + ": " + text);
        }
        lark.warn("Warning #" + code + ": " + text);
    }
    lark.$warn = _warn;
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
    lark.$locale_strings = lark.$locale_strings || {};
    lark.$language = "en_US";
    /**
     * 全局多语言翻译函数
     * @param code 要查询的字符串代码
     * @param args 替换字符串中{0}标志的参数列表
     * @returns 返回拼接后的字符串
     */
    function tr(code) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var text = lark.$locale_strings[lark.$language][code];
        if (!text) {
            return "{" + code + "}";
        }
        var length = args.length;
        for (var i = 0; i < length; i++) {
            text = text.replace("{" + i + "}", args[i]);
        }
        return text;
    }
    lark.tr = tr;
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
    var sys;
    (function (sys) {
        var regionPool = [];
        var Region = (function () {
            function Region() {
                this.minX = 0;
                this.minY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.width = 0;
                this.height = 0;
                this.area = 0;
                /**
                 * 是否发生移动
                 */
                this.moved = false;
            }
            var d = __define,c=Region;p=c.prototype;
            /**
             * 释放一个Region实例到对象池
             */
            Region.release = function (region) {
                regionPool.push(region);
            };
            /**
             * 从对象池中取出或创建一个新的Region对象。
             * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
             * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
             */
            Region.create = function () {
                var region = regionPool.pop();
                if (!region) {
                    region = new Region();
                }
                return region;
            };
            p.setTo = function (minX, minY, maxX, maxY) {
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
                this.updateArea();
                return this;
            };
            p.updateArea = function () {
                this.width = this.maxX - this.minX;
                this.height = this.maxY - this.minY;
                this.area = this.width * this.height;
            };
            /**
             * 注意！由于性能优化，此方法不判断自身是否为空，必须在外部确认自身和目标区域都不为空再调用合并。否则结果始终从0，0点开始。
             */
            p.union = function (target) {
                if (this.minX > target.minX) {
                    this.minX = target.minX;
                }
                if (this.minY > target.minY) {
                    this.minY = target.minY;
                }
                if (this.maxX < target.maxX) {
                    this.maxX = target.maxX;
                }
                if (this.maxY < target.maxY) {
                    this.maxY = target.maxY;
                }
                this.updateArea();
            };
            /**
             * 注意！由于性能优化，此方法不判断自身是否为空，必须在外部确认自身和目标区域都不为空再调用合并。否则结果始终从0，0点开始。
             */
            p.intersect = function (target) {
                if (this.minX < target.minX) {
                    this.minX = target.minX;
                }
                if (this.maxX > target.maxX) {
                    this.maxX = target.maxX;
                }
                if (this.minX >= this.maxX) {
                    this.setEmpty();
                    return;
                }
                if (this.minY < target.minY) {
                    this.minY = target.minY;
                }
                if (this.maxY > target.maxY) {
                    this.maxY = target.maxY;
                }
                if (this.minY >= this.maxY) {
                    this.setEmpty();
                    return;
                }
                this.updateArea();
            };
            p.setEmpty = function () {
                this.minX = 0;
                this.minY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.width = 0;
                this.height = 0;
                this.area = 0;
            };
            /**
             * 确定此 Region 对象是否为空。
             */
            p.isEmpty = function () {
                return this.width <= 0 || this.height <= 0;
            };
            p.intersects = function (target) {
                var max = this.minX > target.minX ? this.minX : target.minX;
                var min = this.maxX < target.maxX ? this.maxX : target.maxX;
                if (max > min) {
                    return false;
                }
                max = this.minY > target.minY ? this.minY : target.minY;
                min = this.maxY < target.maxY ? this.maxY : target.maxY;
                return max <= min;
            };
            p.updateRegion = function (bounds, matrix) {
                var m = matrix;
                var a = m.a;
                var b = m.b;
                var c = m.c;
                var d = m.d;
                var tx = m.tx;
                var ty = m.ty;
                var x = bounds.x;
                var y = bounds.y;
                var xMax = x + bounds.width;
                var yMax = y + bounds.height;
                //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
                if (a === 1.0 && b === 0.0 && c === 0.0 && d === 1.0) {
                    this.minX = Math.floor(x + tx) - 1;
                    this.minY = Math.floor(y + ty) - 1;
                    this.maxX = Math.ceil(xMax + tx) + 1;
                    this.maxY = Math.ceil(yMax + ty) + 1;
                }
                else {
                    var x0 = a * x + c * y + tx;
                    var y0 = b * x + d * y + ty;
                    var x1 = a * xMax + c * y + tx;
                    var y1 = b * xMax + d * y + ty;
                    var x2 = a * xMax + c * yMax + tx;
                    var y2 = b * xMax + d * yMax + ty;
                    var x3 = a * x + c * yMax + tx;
                    var y3 = b * x + d * yMax + ty;
                    var tmp = 0;
                    if (x0 > x1) {
                        tmp = x0;
                        x0 = x1;
                        x1 = tmp;
                    }
                    if (x2 > x3) {
                        tmp = x2;
                        x2 = x3;
                        x3 = tmp;
                    }
                    this.minX = Math.floor(x0 < x2 ? x0 : x2) - 1;
                    this.maxX = Math.ceil(x1 > x3 ? x1 : x3) + 1;
                    if (y0 > y1) {
                        tmp = y0;
                        y0 = y1;
                        y1 = tmp;
                    }
                    if (y2 > y3) {
                        tmp = y2;
                        y2 = y3;
                        y3 = tmp;
                    }
                    this.minY = Math.floor(y0 < y2 ? y0 : y2) - 1;
                    this.maxY = Math.ceil(y1 > y3 ? y1 : y3) + 1;
                }
                this.updateArea();
            };
            return Region;
        })();
        sys.Region = Region;
    })(sys = lark.sys || (lark.sys = {}));
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
    /**
     * 为一个类定义注册运行时类信息,用此方法往类定义上注册它自身以及所有接口对应的枚举值。
     * 在运行时，这个类的实例将可以使用 lark.is() 方法传入一个枚举值来判断实例类型。
     * 例如：
     * //为lark.EventEmitter类注册运行时类信息，由于它实现了IEventEmitter接口，这里应同时传入两个枚举值。
     * lark.registerClass(lark.EventEmitter,lark.Types.EventEmitter,[lark.Types.IEventEmitter]);
     * var emitter = new lark.EventEmitter();
     * lark.log(lark.is(emitter, lark.Types.IEventEmitter));  //输出true。
     * lark.log(lark.is(emitter, lark.Types.EventEmitter));   //输出true。
     * lark.log(lark.is(emitter, lark.Types.Bitmap));   //输出false。
     *
     * 注意：传入的自定义枚举数值范围要避免与Lark框架(1~2000的数值)或其他第三方库的数值范围重合,
     * 否则有可能会导致运行时 lark.is() 方法类型判断错误。
     *
     * @param classDefinition 要注册的类定义。
     * @param classFlags 要注册的类对应的枚举值。
     * @param interfaceFlags 要注册的类所实现的接口的枚举值列表。
     */
    function registerClass(classDefinition, classFlag, interfaceFlags) {
        if (DEBUG) {
            if (!classDefinition) {
                lark.$error(1003, "classDefinition");
            }
            if (!classDefinition.prototype) {
                lark.$error(1012, "classDefinition");
            }
            if (classFlag === void 0) {
                lark.$error(1003, "classFlag");
            }
        }
        var prototype = classDefinition.prototype;
        prototype.__classFlag__ = classFlag;
        var flags = [classFlag];
        if (interfaceFlags) {
            flags = flags.concat(interfaceFlags);
        }
        if (prototype.__typeFlags__) {
            flags = flags.concat(prototype.__typeFlags__);
        }
        prototype.__typeFlags__ = flags;
    }
    lark.registerClass = registerClass;
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
    /**
     * 哈希计数
     */
    lark.$hashCount = 1;
    /**
     * Lark顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
     */
    var LarkObject = (function () {
        /**
         * 创建一个 lark.HashObject 对象
         */
        function LarkObject() {
            this.$hashCode = lark.$hashCount++;
        }
        var d = __define,c=LarkObject;p=c.prototype;
        d(p, "hashCode",
            /**
             * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
             */
            function () {
                return this.$hashCode;
            },undefined
        );
        return LarkObject;
    })();
    lark.LarkObject = LarkObject;
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
    //混合模式在Web端只有部分被支持，在Egret Runtime中全部都支持。
    //目前所有平台的浏览器都支持的有：Layer,Alpha,Normal,Add,ERASE。
    //IOS中的所有浏览器以及Android内的部分浏览器还支持：Multiply,Screen,Lighten,Darken,Difference,Overlay,HardLight。
    //仅在Egret Runtime支持的有：Subtract,Invert。
    /**
     * 提供混合模式可视效果的常量值的类。
     */
    var BlendMode = (function () {
        function BlendMode() {
        }
        var d = __define,c=BlendMode;p=c.prototype;
        /**
         * 该显示对象出现在背景前面。显示对象的像素值会覆盖背景的像素值。在显示对象为透明的区域，背景是可见的。
         */
        BlendMode.NORMAL = "normal";
        /**
         * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。
         * 例如，如果显示对象的某个像素的 RGB 值为 0xAAA633，背景像素的 RGB 值为 0xDD2200，则显示像素的结果 RGB 值为 0xFFC833（因为 0xAA + 0xDD > 0xFF，0xA6 + 0x22 = 0xC8，且 0x33 + 0x00 = 0x33）。
         */
        BlendMode.ADD = "add";
        /**
         * 根据显示对象的 Alpha 值擦除背景。Alpha 值不为0的区域将被擦除。
         */
        BlendMode.ERASE = "erase";
        return BlendMode;
    })();
    lark.BlendMode = BlendMode;
})(lark || (lark = {}));
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        var blendModeString = ["normal", "add", "erase"];
        var blendModeNumber = {};
        var length = blendModeString.length;
        for (var i = 0; i < length; i++) {
            var str = blendModeString[i];
            blendModeNumber[str] = i;
        }
        function blendModeToNumber(blendMode) {
            var num = blendModeNumber[blendMode];
            return num === undefined ? 0 : num;
        }
        sys.blendModeToNumber = blendModeToNumber;
        function numberToBlendMode(blendMode) {
            var str = blendModeString[blendMode];
            return str === undefined ? "normal" : str;
        }
        sys.numberToBlendMode = numberToBlendMode;
    })(sys = lark.sys || (lark.sys = {}));
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        /**
         * 屏幕适配器实例，开发者可以通过给这个变量赋值实现了IScreenAdapter接口的实例，从而注入自定义的屏幕适配器。
         */
        sys.screenAdapter;
        /**
         * 屏幕适配器默认实现，开发者可以实现自定义规则的屏幕适配器。并在初始化加载时将适配器的实例赋值给lark.sys.screenAdapter上，从而替换掉默认适配器。
         */
        var ScreenAdapter = (function (_super) {
            __extends(ScreenAdapter, _super);
            function ScreenAdapter() {
                _super.call(this);
            }
            var d = __define,c=ScreenAdapter;p=c.prototype;
            /**
             * 计算舞台显示尺寸
             * @param scaleMode 当前的缩放模式
             * @param screenWidth 播放器视口宽度
             * @param screenHeight 播放器视口高度
             * @param contentWidth 初始化内容宽度
             * @param contentHeight 初始化内容高度
             */
            p.calculateStageSize = function (scaleMode, screenWidth, screenHeight, contentWidth, contentHeight) {
                var displayWidth = screenWidth;
                var displayHeight = screenHeight;
                var stageWidth = contentWidth;
                var stageHeight = contentHeight;
                var scaleX = (screenWidth / stageWidth) || 0;
                var scaleY = (screenHeight / stageHeight) || 0;
                switch (scaleMode) {
                    case sys.ScaleMode.EXACT_FIT:
                        break;
                    case sys.ScaleMode.FIXED_HEIGHT:
                        stageWidth = Math.round(screenWidth / scaleY);
                        break;
                    case sys.ScaleMode.FIXED_WIDTH:
                        stageHeight = Math.round(screenHeight / scaleX);
                        break;
                    case sys.ScaleMode.NO_BORDER:
                        if (scaleX > scaleY) {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        else {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        break;
                    case sys.ScaleMode.SHOW_ALL:
                        if (scaleX > scaleY) {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        else {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        break;
                    default:
                        stageWidth = screenWidth;
                        stageHeight = screenHeight;
                        break;
                }
                return {
                    stageWidth: stageWidth,
                    stageHeight: stageHeight,
                    displayWidth: displayWidth,
                    displayHeight: displayHeight
                };
            };
            return ScreenAdapter;
        })(lark.LarkObject);
        sys.ScreenAdapter = ScreenAdapter;
    })(sys = lark.sys || (lark.sys = {}));
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
    var sys;
    (function (sys) {
        /**
         * 心跳计时器单例
         */
        sys.$ticker;
        /**
         * 是否要广播Event.RENDER事件的标志。
         */
        sys.$invalidateRenderFlag = false;
        /**
         * 需要立即刷新屏幕的标志
         */
        sys.$requestRenderingFlag = false;
        /**
         * Lark心跳计时器
         */
        var Ticker = (function () {
            function Ticker() {
                this.playerList = [];
                this.callBackList = [];
                this.thisObjectList = [];
                /**
                 * 全局帧率
                 */
                this.$frameRate = 60;
                this.frameInterval = 1;
                this.lastCount = 1000;
                if (DEBUG && sys.$ticker) {
                    lark.$error(1008, "lark.sys.Ticker");
                }
                lark.$START_TIME = Date.now();
            }
            var d = __define,c=Ticker;p=c.prototype;
            /**
             * 注册一个播放器实例并运行
             */
            p.$addPlayer = function (player) {
                if (this.playerList.indexOf(player) != -1) {
                    return;
                }
                if (DEBUG) {
                    lark_stages.push(player.stage);
                }
                this.playerList = this.playerList.concat();
                this.playerList.push(player);
            };
            /**
             * 停止一个播放器实例的运行。
             */
            p.$removePlayer = function (player) {
                var index = this.playerList.indexOf(player);
                if (index !== -1) {
                    if (DEBUG) {
                        var i = lark_stages.indexOf(player.stage);
                        lark_stages.splice(i, 1);
                    }
                    this.playerList = this.playerList.concat();
                    this.playerList.splice(index, 1);
                }
            };
            p.$startTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index != -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.push(callBack);
                this.thisObjectList.push(thisObject);
            };
            p.$stopTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index == -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.splice(index, 1);
                this.thisObjectList.splice(index, 1);
            };
            p.getTickIndex = function (callBack, thisObject) {
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                for (var i = callBackList.length - 1; i >= 0; i--) {
                    if (callBackList[i] === callBack && thisObjectList[i] == thisObject) {
                        return i;
                    }
                }
                return -1;
            };
            p.concatTick = function () {
                this.callBackList = this.callBackList.concat();
                this.thisObjectList = this.thisObjectList.concat();
            };
            /**
             * 设置全局帧率
             */
            p.$setFrameRate = function (value) {
                value = +value || 0;
                if (value <= 0) {
                    return;
                }
                if (this.$frameRate === value) {
                    return;
                }
                this.$frameRate = value;
                if (value > 60) {
                    value = 60;
                }
                //这里用60*1000来避免浮点数计算不准确的问题。
                this.lastCount = this.frameInterval = Math.round(60000 / value);
            };
            /**
             * 执行一次刷新
             */
            p.update = function () {
                var callBackList = this.callBackList;
                var thisObjectList = this.thisObjectList;
                var length = callBackList.length;
                var requestRenderingFlag = sys.$requestRenderingFlag;
                var timeStamp = lark.getTimer();
                for (var i = 0; i < length; i++) {
                    if (callBackList[i].call(thisObjectList[i], timeStamp)) {
                        requestRenderingFlag = true;
                    }
                }
                this.lastCount -= 1000;
                if (this.lastCount > 0) {
                    if (requestRenderingFlag) {
                        this.render(false);
                    }
                    return;
                }
                this.lastCount += this.frameInterval;
                this.broadcastEnterFrame();
                this.render(true);
            };
            /**
             * 执行一次屏幕渲染
             */
            p.render = function (triggerByFrame) {
                var playerList = this.playerList;
                var length = playerList.length;
                if (length == 0) {
                    return;
                }
                if (sys.$invalidateRenderFlag) {
                    this.broadcastRender();
                    sys.$invalidateRenderFlag = false;
                }
                for (var i = 0; i < length; i++) {
                    playerList[i].$render(triggerByFrame);
                }
                sys.$requestRenderingFlag = false;
            };
            /**
             * 广播EnterFrame事件。
             */
            p.broadcastEnterFrame = function () {
                var list = lark.DisplayObject.$enterFrameCallBackList;
                var length = list.length;
                if (length === 0) {
                    return;
                }
                list = list.concat();
                for (var i = 0; i < length; i++) {
                    list[i].emitWith(lark.Event.ENTER_FRAME);
                }
            };
            /**
             * 广播Render事件。
             */
            p.broadcastRender = function () {
                var list = lark.DisplayObject.$renderCallBackList;
                var length = list.length;
                if (length === 0) {
                    return;
                }
                list = list.concat();
                for (var i = 0; i < length; i++) {
                    list[i].emitWith(lark.Event.RENDER);
                }
            };
            return Ticker;
        })();
        sys.Ticker = Ticker;
    })(sys = lark.sys || (lark.sys = {}));
})(lark || (lark = {}));
if (DEBUG) {
    var lark_stages = [];
}
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
    lark.$locale_strings = lark.$locale_strings || {};
    lark.$locale_strings["en_US"] = lark.$locale_strings["en_US"] || {};
    var locale_strings = lark.$locale_strings["en_US"];
    locale_strings[1001] = "Could not find Lark entry class: {0}。";
    locale_strings[1002] = "Lark entry class '{0}' must inherit from lark.DisplayObject.";
    locale_strings[1003] = "Parameter {0} must be non-null.";
    locale_strings[1004] = "An object cannot be added as a child to one of it's children (or children's children, etc.).";
    locale_strings[1005] = "An object cannot be added as a child of itself.";
    locale_strings[1006] = "The supplied DisplayObject must be a child of the caller.";
    locale_strings[1007] = "An index specified for a parameter was out of range.";
    locale_strings[1008] = "Instantiate singleton error，singleton class {0} can not create multiple instances.";
    locale_strings[1009] = "The Stage class does not implement this property or method.";
    locale_strings[1010] = "{0} is readonly";
    locale_strings[1011] = "Stream Error. URL: {0}";
    locale_strings[1012] = "The type of parameter {0} must be Class.";
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
    var ONCE_EVENT_LIST = [];
    /**
     * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
     * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击、触摸或按键等事件时，
     * 框架会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
     * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为两个阶段：
     * 捕获阶段包括从根到事件目标节点的行程，冒泡阶段与捕获阶段完全相反，从事件目标节点到根的行程。
     */
    var EventEmitter = (function (_super) {
        __extends(EventEmitter, _super);
        /**
         * EventEmitter 类是可调度事件的所有类的基类。
         * EventEmitter 类实现 IEventEmitter 接口 ，并且是 DisplayObject 类的基类。
         * EventEmitter 类允许显示列表上的任何对象都是一个事件目标，同样允许使用 IEventEmitter 接口的方法。
         */
        function EventEmitter(target) {
            if (target === void 0) { target = null; }
            _super.call(this);
            this.$EventEmitter = {
                0: target ? target : this,
                1: {},
                2: {},
                3: 0,
            };
        }
        var d = __define,c=EventEmitter;p=c.prototype;
        /**
         * 添加事件侦听器
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 on() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        p.on = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority);
        };
        /**
         * 添加仅回调一次的事件侦听器，此方法与on()方法不同，on()方法会持续产生回调，而此方法在第一次回调时就会自动移除监听。
         * @param type 事件的类型。
         * @param listener 处理事件的侦听器函数。此函数必须接受 Event 对象作为其唯一的参数，并且不能返回任何结果，
         * 如下面的示例所示： function(evt:Event):void 函数可以有任何名称。
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture useCapture 确定侦听器是运行于捕获阶段还是运行于冒泡阶段。如果将 useCapture 设置为 true，
         * 则侦听器只在捕获阶段处理事件，而不在冒泡阶段处理事件。如果 useCapture 为 false，则侦听器只在冒泡阶段处理事件。
         * 要在两个阶段都侦听事件，请调用 once() 两次：一次将 useCapture 设置为 true，一次将 useCapture 设置为 false。
         * @param  priority 事件侦听器的优先级。优先级由一个带符号的 32 位整数指定。数字越大，优先级越高。优先级为 n 的所有侦听器会在
         * 优先级为 n -1 的侦听器之前得到处理。如果两个或更多个侦听器共享相同的优先级，则按照它们的添加顺序进行处理。默认优先级为 0。
         */
        p.once = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority, true);
        };
        p.$addListener = function (type, listener, thisObject, useCapture, priority, emitOnce) {
            if (DEBUG && !listener) {
                lark.$error(1003, "listener");
            }
            var values = this.$EventEmitter;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            else if (values[3 /* notifyLevel */] !== 0) {
                eventMap[type] = list = list.concat();
            }
            priority = +priority | 0;
            var insertIndex = -1;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener === listener && bin.thisObject === thisObject && bin.target === this) {
                    return;
                }
                if (insertIndex === -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            var eventBin = {
                type: type,
                listener: listener,
                thisObject: thisObject,
                priority: priority,
                target: this,
                useCapture: useCapture,
                emitOnce: !!emitOnce
            };
            if (insertIndex !== -1) {
                list.splice(insertIndex, 0, eventBin);
            }
            else {
                list.push(eventBin);
            }
        };
        /**
         * 移除事件侦听器
         * @param type 事件名
         * @param listener 侦听函数
         * @param thisObject 侦听函数绑定的this对象
         * @param useCapture 是否使用捕获，这个属性只在显示列表中生效。
         */
        p.removeListener = function (type, listener, thisObject, useCapture) {
            var values = this.$EventEmitter;
            var eventMap = useCapture ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[type];
            if (!list) {
                return;
            }
            if (values[3 /* notifyLevel */] !== 0) {
                eventMap[type] = list = list.concat();
            }
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener === listener && bin.thisObject === thisObject && bin.target === this) {
                    list.splice(i, 1);
                    break;
                }
            }
            if (list.length == 0) {
                eventMap[type] = null;
            }
        };
        /**
         * 检测是否存在监听器
         * @param type 事件类型
         * @returns 是否存在监听器，若存在返回true，反之返回false。
         */
        p.hasListener = function (type) {
            var values = this.$EventEmitter;
            return (values[1 /* eventsMap */][type] || values[2 /* captureEventsMap */][type]);
        };
        /**
         * 检查是否用此 EventEmitter 对象或其任何始祖为指定事件类型注册了事件侦听器。将指定类型的事件调度给此
         * EventEmitter 对象或其任一后代时，如果在事件流的任何阶段触发了事件侦听器，则此方法返回 true。
         * hasListener() 与 willTrigger() 方法的区别是：hasListener() 只检查它所属的对象，
         * 而 willTrigger() 方法检查整个事件流以查找由 type 参数指定的事件。
         * @param type 事件类型
         * @returns 是否注册过监听器，如果注册过返回true，反之返回false
         */
        p.willTrigger = function (type) {
            return this.hasListener(type);
        };
        /**
         * 将事件分派到事件流中。事件目标是对其调用 emit() 方法的 EventEmitter 对象。
         * @param event 调度到事件流中的 Event 对象。
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        p.emit = function (event) {
            event.$target = event.$currentTarget = this.$EventEmitter[0 /* eventTarget */];
            return this.$notifyListener(event);
        };
        p.$notifyListener = function (event) {
            var values = this.$EventEmitter;
            var eventMap = event.$eventPhase == 1 /* CAPTURING_PHASE */ ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
            var list = eventMap[event.$type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length === 0) {
                return true;
            }
            var onceList = ONCE_EVENT_LIST;
            //做个标记，防止外部修改原始数组导致遍历错误。这里不直接调用list.concat()因为emit()方法调用通常比on()等方法频繁。
            values[3 /* notifyLevel */]++;
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                eventBin.listener.call(eventBin.thisObject, event);
                if (eventBin.emitOnce) {
                    onceList.push(eventBin);
                }
                if (event.$isPropagationImmediateStopped) {
                    break;
                }
            }
            values[3 /* notifyLevel */]--;
            while (onceList.length) {
                eventBin = onceList.pop();
                eventBin.target.removeListener(eventBin.type, eventBin.listener, eventBin.thisObject, eventBin.useCapture);
            }
            return !event.$isDefaultPrevented;
        };
        /**
         * 派发一个包含了特定参数的事件到所有注册了特定类型侦听器的对象中。 这个方法使用了一个内部的事件对象池因避免重复的分配导致的额外开销。
         * @param type 事件类型
         * @param bubbles 是否冒泡，默认false
         * @param data 附加数据(可选)
         * @returns 如果成功调度了事件，则值为 true。值 false 表示失败或对事件调用了 preventDefault()。
         */
        p.emitWith = function (type, bubbles, cancelable, data) {
            if (bubbles || this.hasListener(type)) {
                var event = lark.Event.create(lark.Event, type, bubbles, cancelable);
                event.data = data;
                var result = this.emit(event);
                lark.Event.release(event);
                return result;
            }
            return true;
        };
        return EventEmitter;
    })(lark.LarkObject);
    lark.EventEmitter = EventEmitter;
    lark.registerClass(EventEmitter, 2 /* EventEmitter */, [1 /* IEventEmitter */]);
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
    var pointPool = [];
    /**
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     */
    var Point = (function (_super) {
        __extends(Point, _super);
        /**
         * 创建一个 lark.Point 对象
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         */
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            _super.call(this);
            this.x = x;
            this.y = y;
        }
        var d = __define,c=Point;p=c.prototype;
        /**
         * 释放一个Point实例到对象池
         */
        Point.release = function (point) {
            if (!point) {
                return;
            }
            pointPool.push(point);
        };
        /**
         * 从对象池中取出或创建一个新的Point对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        Point.create = function (x, y) {
            var point = pointPool.pop();
            if (!point) {
                point = new Point();
            }
            return point.setTo(x, y);
        };
        /**
         * 从 (0,0) 到此点的线段长度。
         */
        p.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        /**
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         */
        p.setTo = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * 克隆点对象
         */
        p.clone = function () {
            return new Point(this.x, this.y);
        };
        /**
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         */
        p.equals = function (toCompare) {
            return this.x == toCompare.x && this.y == toCompare.y;
        };
        /**
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         */
        Point.distance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };
        return Point;
    })(lark.LarkObject);
    lark.Point = Point;
    lark.registerClass(Point, 16 /* Point */);
    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    lark.$TempPoint = new Point();
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
    var sys;
    (function (sys) {
        if (DEBUG) {
            function isF(num) {
                return num % 1 !== 0;
            }
        }
        function unionArea(r1, r2) {
            var minX = r1.minX < r2.minX ? r1.minX : r2.minX;
            var minY = r1.minY < r2.minY ? r1.minY : r2.minY;
            var maxX = r1.maxX > r2.maxX ? r1.maxX : r2.maxX;
            var maxY = r1.maxY > r2.maxY ? r1.maxY : r2.maxY;
            return (maxX - minX) * (maxY - minY);
        }
        /**
         * 脏矩形计算工具类
         */
        var DirtyRegion = (function () {
            function DirtyRegion() {
                this.dirtyList = [];
                this.hasClipRect = false;
                this.clipWidth = 0;
                this.clipHeight = 0;
                this.clipArea = 0;
                this.clipRectChanged = false;
            }
            var d = __define,c=DirtyRegion;p=c.prototype;
            /**
             * 设置剪裁边界，超过边界的节点将跳过绘制。
             */
            p.setClipRect = function (width, height) {
                this.hasClipRect = true;
                this.clipRectChanged = true;
                this.clipWidth = Math.ceil(width);
                this.clipHeight = Math.ceil(height);
                this.clipArea = this.clipWidth * this.clipHeight;
            };
            /**
             * 添加一个脏矩形区域，返回是否添加成功，当矩形为空或者在屏幕之外时返回false。
             */
            p.addRegion = function (target) {
                var minX = target.minX, minY = target.minY, maxX = target.maxX, maxY = target.maxY;
                if (DEBUG) {
                    if (isF(minX) || isF(minY) || isF(maxX) || isF(maxY)) {
                        lark.log("addRegion error:", minX, minY, maxX, maxY);
                    }
                }
                if (this.hasClipRect) {
                    if (minX < 0) {
                        minX = 0;
                    }
                    if (minY < 0) {
                        minY = 0;
                    }
                    if (maxX > this.clipWidth) {
                        maxX = this.clipWidth;
                    }
                    if (maxY > this.clipHeight) {
                        maxY = this.clipHeight;
                    }
                }
                if (minX >= maxX || minY >= maxY) {
                    return false;
                }
                if (this.clipRectChanged) {
                    return true;
                }
                var dirtyList = this.dirtyList;
                var region = sys.Region.create();
                dirtyList.push(region.setTo(minX, minY, maxX, maxY));
                this.mergeDirtyList(dirtyList);
                return true;
            };
            p.clear = function () {
                var dirtyList = this.dirtyList;
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    sys.Region.release(dirtyList[i]);
                }
                dirtyList.length = 0;
            };
            /**
             * 获取最终的脏矩形列表
             */
            p.getDirtyRegions = function () {
                var dirtyList = this.dirtyList;
                if (this.clipRectChanged) {
                    this.clipRectChanged = false;
                    this.clear();
                    var region = sys.Region.create();
                    dirtyList.push(region.setTo(0, 0, this.clipWidth, this.clipHeight));
                }
                else {
                    while (this.mergeDirtyList(dirtyList)) {
                    }
                }
                return this.dirtyList;
            };
            /**
             * 合并脏矩形列表
             */
            p.mergeDirtyList = function (dirtyList) {
                var length = dirtyList.length;
                if (length < 2) {
                    return false;
                }
                var hasClipRect = this.hasClipRect;
                var bestDelta = length > 3 ? Number.POSITIVE_INFINITY : 0;
                var mergeA = 0;
                var mergeB = 0;
                var totalArea = 0;
                for (var i = 0; i < length - 1; i++) {
                    var regionA = dirtyList[i];
                    hasClipRect && (totalArea += regionA.area);
                    for (var j = i + 1; j < length; j++) {
                        var regionB = dirtyList[j];
                        var delta = unionArea(regionA, regionB) - regionA.area - regionB.area;
                        if (bestDelta > delta) {
                            mergeA = i;
                            mergeB = j;
                            bestDelta = delta;
                        }
                    }
                }
                if (hasClipRect && (totalArea / this.clipArea) > 0.95) {
                    this.clipRectChanged = true;
                }
                if (mergeA != mergeB) {
                    var region = dirtyList[mergeB];
                    dirtyList[mergeA].union(region);
                    sys.Region.release(region);
                    dirtyList.splice(mergeB, 1);
                    return true;
                }
                return false;
            };
            return DirtyRegion;
        })();
        sys.DirtyRegion = DirtyRegion;
    })(sys = lark.sys || (lark.sys = {}));
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
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    var vector = { x: 0, y: 0 };
    var vector1 = { x: 0, y: 0 };
    var vector3 = { x: 0, y: 0 };
    /**
     * 格式化弧线角度的值
     */
    function clampAngle(value) {
        value %= PI * 2;
        if (value < 0) {
            value += PI * 2;
        }
        return value;
    }
    /**
     * 两个点距离
     */
    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    /**
     * 取两点之间的向量
     */
    function getVector(x1, y1, x2, y2, v) {
        var l = distance(x1, y1, x2, y2);
        v.x = (x2 - x1) / l;
        v.y = (y2 - y1) / l;
    }
    /**
     * Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。
     * 这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
     */
    var Graphics = (function (_super) {
        __extends(Graphics, _super);
        function Graphics() {
            _super.call(this);
            /**
             * 绘图命令列表
             */
            this.$commands = [];
            this.reset();
        }
        var d = __define,c=Graphics;p=c.prototype;
        /**
         * 创建一个放射状渐变填充对象
         */
        Graphics.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
            return lark.sys.sharedRenderContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
        };
        /**
         * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性 GraphicsGradient 对象。
         */
        Graphics.createLinearGradient = function (x0, y0, x1, y1) {
            return lark.sys.sharedRenderContext.createLinearGradient(x0, y0, x1, y1);
        };
        /**
         * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
         * @param bitmapData 做为重复图像源的 BitmapData 对象。
         * @param repetition 指定如何重复图像。
         * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
         */
        Graphics.createPattern = function (bitmapData, repetition) {
            return lark.sys.sharedRenderContext.createPattern(bitmapData, repetition);
        };
        d(p, "fillStyle",
            function () {
                return this._fillStyle;
            },
            function (value) {
                this._fillStyle = value;
                this.pushCommand(5 /* fillStyle */, arguments);
            }
        );
        d(p, "lineWidth",
            function () {
                return this._lineWidth;
            },
            function (value) {
                this._lineWidth = value;
                this.pushCommand(3 /* lineWidth */, arguments);
            }
        );
        d(p, "lineCap",
            function () {
                return this._lineCap;
            },
            function (value) {
                this._lineCap = value;
                this.pushCommand(1 /* lineCap */, arguments);
            }
        );
        d(p, "strokeStyle",
            function () {
                return this._strokeStyle;
            },
            function (value) {
                this._strokeStyle = value;
                this.pushCommand(4 /* strokeStyle */, arguments);
            }
        );
        d(p, "lineJoin",
            function () {
                return this._lineJoin;
            },
            function (value) {
                this._lineJoin = value;
                this.pushCommand(2 /* lineJoin */, arguments);
            }
        );
        d(p, "miterLimit",
            function () {
                return this._miterLimit;
            },
            function (value) {
                this._miterLimit = value;
                this.pushCommand(0 /* miterLimit */, arguments);
            }
        );
        p.arc = function (x, y, radius, startAngle, endAngle, anticlockwise) {
            this.pushCommand(6 /* arc */, arguments);
            if (radius < 0) {
                return;
            }
            if (anticlockwise) {
                var temp = endAngle;
                endAngle = startAngle;
                startAngle = temp;
            }
            this.arcBounds(x, y, radius, startAngle, endAngle);
        };
        p.arcBounds = function (x, y, radius, startAngle, endAngle) {
            startAngle = clampAngle(startAngle);
            endAngle = clampAngle(endAngle);
            if (Math.abs(startAngle - endAngle) < 0.01) {
                this.extendByPoint(x - radius, y - radius);
                this.extendByPoint(x + radius, y + radius);
                return;
            }
            var offset = 0;
            if (startAngle > endAngle) {
                offset = TwoPI;
                endAngle += offset;
            }
            var startX = Math.cos(startAngle) * radius;
            var endX = Math.cos(endAngle) * radius;
            var xMin = Math.min(startX, endX);
            var xMax = Math.max(startX, endX);
            if (startAngle <= (PI + offset) && endAngle >= (PI + offset)) {
                xMin = -radius;
            }
            if (startAngle <= offset && endAngle >= offset) {
                xMax = radius;
            }
            var startY = Math.sin(startAngle) * radius;
            var endY = Math.sin(endAngle) * radius;
            var yMin = Math.min(startY, endY);
            var yMax = Math.max(startY, endY);
            if (startAngle <= (PacPI + offset) && endAngle >= (PacPI + offset)) {
                yMin = -radius;
            }
            if (startAngle <= (HalfPI + offset) && endAngle >= (HalfPI + offset)) {
                yMax = radius;
            }
            this.extendByPoint(xMin + x, yMin + y);
            this.extendByPoint(xMax + x, yMax + y);
        };
        p.quadraticCurveTo = function (cpx, cpy, x, y) {
            this.pushCommand(7 /* quadraticCurveTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(cpx, cpy);
            this.extendByPoint(x, y);
        };
        p.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
            this.pushCommand(14 /* bezierCurveTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(cp1x, cp1y);
            this.extendByPoint(cp2x, cp2y);
            this.extendByPoint(x, y);
        };
        p.lineTo = function (x, y) {
            this.pushCommand(8 /* lineTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(x, y);
        };
        p.fill = function (fillRule) {
            this.pushCommand(9 /* fill */, arguments);
            this.hasFill = true;
        };
        p.closePath = function () {
            this.pushCommand(10 /* closePath */, arguments);
        };
        p.rect = function (x, y, w, h) {
            this.pushCommand(11 /* rect */, arguments);
            this.extendByPoint(x, y);
            this.extendByPoint(x + w, y + h);
        };
        p.moveTo = function (x, y) {
            this.pushCommand(12 /* moveTo */, arguments);
            this.moveToX = x;
            this.moveToY = y;
            this.hasMoved = true;
        };
        p.fillRect = function (x, y, w, h) {
            this.pushCommand(13 /* fillRect */, arguments);
            this.extendByPoint(x, y);
            this.extendByPoint(x + w, y + h);
            this.hasFill = true;
        };
        p.stroke = function () {
            this.pushCommand(15 /* stroke */, arguments);
            this.hasStroke = true;
        };
        p.strokeRect = function (x, y, w, h) {
            this.pushCommand(16 /* strokeRect */, arguments);
            this.hasStroke = true;
            this.extendByPoint(x, y);
            this.extendByPoint(x + w, y + h);
        };
        p.beginPath = function () {
            this.pushCommand(17 /* beginPath */, arguments);
            this.hasMoved = false;
            this.moveToX = 0x8000000;
            this.moveToY = 0x8000000;
        };
        p.arcTo = function (x1, y1, x2, y2, radius) {
            this.pushCommand(18 /* arcTo */, arguments);
            if (this.moveToX === 0x8000000) {
                return;
            }
            this.checkMoveTo();
            getVector(this.moveToX, this.moveToY, x1, y1, vector1);
            getVector(x2, y2, x1, y1, vector3);
            //角平分线
            vector.x = vector1.x + vector3.x;
            vector.y = vector1.y + vector3.y;
            //角平分向量归1
            getVector(vector.x, vector.y, 0, 0, vector);
            //向量夹角
            var cross = vector1.x * vector.x + vector1.y * vector.y;
            var l1 = distance(vector1.x, vector1.y, 0, 0);
            var l2 = distance(vector.x, vector.y, 0, 0);
            var cos = cross / (l1 * l2);
            var a = Math.acos(cos);
            var l = radius / Math.sin(a);
            //圆心
            var centerX = x1 + vector.x * l;
            var centerY = y1 + vector.y * l;
            var L10 = radius / Math.tan(a);
            var x10 = x1 + vector1.x * L10;
            var y10 = y1 + vector1.y * L10;
            var x12 = x1 + vector3.x * L10;
            var y12 = y1 + vector3.y * L10;
            getVector(centerX, centerY, x10, y10, vector);
            var startAngle = Math.atan2(vector.y, vector.x);
            getVector(centerX, centerY, x12, y12, vector);
            var endAngle = Math.atan2(vector.y, vector.x);
            var offset = endAngle - startAngle;
            offset = clampAngle(offset);
            if (offset > PI) {
                var temp = endAngle;
                endAngle = startAngle;
                startAngle = temp;
            }
            this.arcBounds(centerX, centerY, radius, startAngle, endAngle);
        };
        /**
         * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
         */
        p.clear = function () {
            this.reset();
            this.$commands.length = 0;
            this.$targetDisplay.$invalidateContentBounds();
        };
        p.reset = function () {
            this._fillStyle = "#000000";
            this._lineCap = "butt";
            this._lineJoin = "miter";
            this._lineWidth = 1;
            this._miterLimit = 10;
            this._strokeStyle = "#000000";
            this.hasMoved = false;
            this.minX = 0;
            this.minY = 0;
            this.maxX = 0;
            this.maxY = 0;
            this.isFirst = true;
            this.moveToX = 0x8000000;
            this.moveToY = 0x8000000;
            this.hasStroke = false;
            this.hasFill = false;
        };
        p.pushCommand = function (graphicsType, args) {
            this.$commands.push({ type: graphicsType, arguments: args });
            this.$targetDisplay.$invalidateContentBounds();
        };
        p.checkMoveTo = function () {
            if (this.hasMoved) {
                this.hasMoved = false;
                this.extendByPoint(this.moveToX, this.moveToY);
            }
        };
        p.extendByPoint = function (x, y) {
            if (this.isFirst) {
                this.isFirst = false;
                this.maxX = this.minX = x;
                this.maxY = this.minY = y;
            }
            else {
                this.minX = Math.min(this.minX, x);
                this.minY = Math.min(this.minY, y);
                this.maxX = Math.max(this.maxX, x);
                this.maxY = Math.max(this.maxY, y);
            }
        };
        p.$measureContentBounds = function (bounds) {
            if (!this.hasFill && !this.hasStroke) {
                bounds.setEmpty();
                return;
            }
            if (this.hasStroke) {
                var lineWidth = this._lineWidth;
                var half = lineWidth * 0.5;
            }
            else {
                half = lineWidth = 0;
            }
            bounds.setTo(this.minX - half, this.minY - half, this.maxX - this.minX + lineWidth, this.maxY - this.minY + lineWidth);
        };
        p.$render = function (context) {
            context.save();
            context.fillStyle = "#000000";
            context.lineCap = "butt";
            context.lineJoin = "miter";
            context.lineWidth = 1;
            context.miterLimit = 10;
            context.strokeStyle = "#000000";
            var map = context["graphicsMap"];
            if (!map) {
                map = mapGraphicsFunction(context);
            }
            var commands = this.$commands;
            var length = commands.length;
            for (var i = 0; i < length; i++) {
                var command = commands[i];
                map[command.type].apply(context, command.arguments);
            }
            context.restore();
        };
        return Graphics;
    })(lark.LarkObject);
    lark.Graphics = Graphics;
    lark.registerClass(Graphics, 8 /* Graphics */);
    function mapGraphicsFunction(context) {
        var map = context["graphicsMap"] = {};
        map[6 /* arc */] = context.arc;
        map[18 /* arcTo */] = context.arcTo;
        map[17 /* beginPath */] = context.beginPath;
        map[14 /* bezierCurveTo */] = context.bezierCurveTo;
        map[10 /* closePath */] = context.closePath;
        map[9 /* fill */] = context.fill;
        map[13 /* fillRect */] = context.fillRect;
        map[8 /* lineTo */] = context.lineTo;
        map[12 /* moveTo */] = context.moveTo;
        map[7 /* quadraticCurveTo */] = context.quadraticCurveTo;
        map[11 /* rect */] = context.rect;
        map[15 /* stroke */] = context.stroke;
        map[16 /* strokeRect */] = context.strokeRect;
        map[3 /* lineWidth */] = function (value) {
            context.lineWidth = value;
        };
        map[0 /* miterLimit */] = function (value) {
            context.miterLimit = value;
        };
        map[5 /* fillStyle */] = function (value) {
            context.fillStyle = value;
        };
        map[1 /* lineCap */] = function (value) {
            context.lineCap = value;
        };
        map[2 /* lineJoin */] = function (value) {
            context.lineJoin = value;
        };
        map[4 /* strokeStyle */] = function (value) {
            context.strokeStyle = value;
        };
        return map;
    }
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
    /**
     * Event 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。
     * Event 类的属性包含有关事件的基本信息，例如事件的类型或者是否可以取消事件的默认行为。
     * 对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
     * 例如，与触摸关联的事件需要包括有关触摸事件的位置以及在触摸事件期间是否按下了任何键的其他信息。
     * 您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
     * Lark API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。
     * Event 类的方法可以在事件侦听器函数中使用以影响事件对象的行为。
     * 某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
     * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
     */
    var Event = (function (_super) {
        __extends(Event, _super);
        /**
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         */
        function Event(type, bubbles, cancelable, data) {
            _super.call(this);
            this.$eventPhase = 2;
            this.$currentTarget = null;
            this.$target = null;
            this.$isDefaultPrevented = false;
            this.$isPropagationStopped = false;
            this.$isPropagationImmediateStopped = false;
            this.$type = type;
            this.$bubbles = !!bubbles;
            this.$cancelable = !!cancelable;
            this.data = data;
        }
        var d = __define,c=Event;p=c.prototype;
        d(p, "type",
            /**
             * 事件的类型。类型区分大小写。
             */
            function () {
                return this.$type;
            },undefined
        );
        d(p, "bubbles",
            /**
             * 表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
             */
            function () {
                return this.$bubbles;
            },undefined
        );
        d(p, "cancelable",
            /**
             * 表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
             */
            function () {
                return this.$cancelable;
            },undefined
        );
        d(p, "eventPhase",
            /**
             * 事件流中的当前阶段。此属性可以包含以下数值：
             * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
             * 目标阶段 (EventPhase.AT_TARGET)。
             * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
             */
            function () {
                return this.$eventPhase;
            },undefined
        );
        d(p, "currentTarget",
            /**
             * 当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
             * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
             */
            function () {
                return this.$currentTarget;
            },undefined
        );
        d(p, "target",
            /**
             * 事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
             */
            function () {
                return this.$target;
            },undefined
        );
        /**
         * 检查是否已对事件调用 preventDefault() 方法。
         * @returns 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
         */
        p.isDefaultPrevented = function () {
            return this.$isDefaultPrevented;
        };
        /**
         * 如果可以取消事件的默认行为，则取消该行为。
         * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
         * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
         * 注意：当cancelable属性为false时，此方法不可用。
         */
        p.preventDefault = function () {
            if (this.$cancelable)
                this.$isDefaultPrevented = true;
        };
        /**
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 currentTarget 中的任何事件侦听器。
         * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
         * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         */
        p.stopPropagation = function () {
            if (this.$bubbles)
                this.$isPropagationStopped = true;
        };
        /**
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
         * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         */
        p.stopImmediatePropagation = function () {
            if (this.$bubbles)
                this.$isPropagationImmediateStopped = true;
        };
        /**
         * 当事件实例传递给Event.release()静态方法时，实例上的clean()方法将会被自动调用。
         * 若此自定义事件的实例设计为可以循环复用的，为了避免引起内存泄露，自定义事件需要覆盖此方法来确保实例被缓存前断开对外部对象的一切引用。
         */
        p.clean = function () {
            this.data = this.$target = this.$currentTarget = null;
        };
        /**
         * 从对象池中取出或创建一个新的事件实例。注意：若使用此方法来创建自定义事件的实例，自定义的构造函数参数列表必须跟Event类一致。
         * 在JavaScript中，减少对象的创建次数可以获得更高的运行性能。因此我们建议您尽可能使用Event.create()和Event.release()
         * 这一对方法来创建和释放事件对象，这一对方法会将事件实例在内部缓存下来供下次循环使用，从而避免过多地重复创建对象。
         *
         * 外部调用范例：
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         */
        Event.create = function (EventClass, type, bubbles, cancelable) {
            var eventPool = EventClass.eventPool;
            if (!eventPool) {
                eventPool = EventClass.eventPool = [];
            }
            if (eventPool.length) {
                var event = eventPool.pop();
                event.$type = type;
                event.$bubbles = !!bubbles;
                event.$cancelable = !!cancelable;
                event.$isDefaultPrevented = false;
                event.$isPropagationStopped = false;
                event.$isPropagationImmediateStopped = false;
                event.$eventPhase = 2;
                return event;
            }
            return new EventClass(type, bubbles, cancelable);
        };
        /**
         * 释放一个事件对象，并缓存到对象池。注意：此方法只能传入由Event.create()创建的事件实例，传入非法对象实例可能会导致报错。
         * 在JavaScript中，减少对象的创建次数可以获得更高的运行性能。因此我们建议您尽可能使用Event.create()和Event.release()
         * 这一对方法来创建和释放事件对象，这一对方法会将事件实例在内部缓存下来供下次循环使用，从而避免过多地重复创建对象。
         *
         * 外部调用范例：
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         */
        Event.release = function (event) {
            event.clean();
            var EventClass = Object.getPrototypeOf(event).constructor;
            EventClass.eventPool.push(event);
        };
        /**
         * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
         * 以下方法会触发此事件：DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
         */
        Event.ADDED_TO_STAGE = "addedToStage";
        /**
         * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
         * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
         */
        Event.REMOVED_FROM_STAGE = "removedFromStage";
        /**
         * 将显示对象添加到显示列表中时调度。以下方法会触发此事件：
         * DisplayObjectContainer.addChild()、DisplayObjectContainer.addChildAt()。
         */
        Event.ADDED = "added";
        /**
         * 将要从显示列表中删除显示对象时调度。DisplayObjectContainer 类的以下两个方法会生成此事件：removeChild() 和 removeChildAt()。
         * 如果必须删除某个对象来为新对象提供空间，则 DisplayObjectContainer 对象的下列方法也会生成此事件：addChild()、addChildAt() 和 setChildIndex()。
         */
        Event.REMOVED = "removed";
        /**
         * 进入新的一帧,监听此事件将会在下一帧开始时触发一次回调。这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         */
        Event.ENTER_FRAME = "enterFrame";
        /**
         * 渲染事件，监听此事件将会在本帧末即将开始渲染的前一刻触发回调，这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * 注意：每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 stage.invalidate() 方法，由于每帧只会触发一次屏幕刷新，
         * 若在 Event.RENDER 回调函数执行期间再次调用stage.invalidate()，将会被忽略。
         */
        Event.RENDER = "render";
        /**
         * 舞台尺寸或UI组件尺寸发生改变
         */
        Event.RESIZE = "resize";
        /**
         * 属性值或状态发生改变。通常是按钮的选中状态，或者列表的选中项索引改变。
         */
        Event.CHANGE = "change";
        /**
         * 属性值或状态即将发生改变,通常是按钮的选中状态，或者列表的选中项索引改变。可以通过调用 preventDefault() 方法阻止索引发生更改。
         */
        Event.CHANGING = "changing";
        /**
         * 网络请求加载完成
         */
        Event.COMPLETE = "complete";
        /**
         * 输入或输出操作失败
         */
        Event.IO_ERROR = "ioError";
        return Event;
    })(lark.LarkObject);
    lark.Event = Event;
    lark.registerClass(Event, 11 /* Event */);
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
    /**
     * 文本输入框相关事件。
     */
    var TextInputEvent = (function (_super) {
        __extends(TextInputEvent, _super);
        function TextInputEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=TextInputEvent;p=c.prototype;
        /**
         * TextInput 获得焦点
         */
        TextInputEvent.FOCUS = 'focus';
        /**
         * TextInput 失去焦点
         */
        TextInputEvent.BLUR = 'blur';
        /**
         * TextInput 正在输入文本,通过事件对象的text属性可以读取最新的文本内容。
         */
        TextInputEvent.INPUT = 'input';
        return TextInputEvent;
    })(lark.Event);
    lark.TextInputEvent = TextInputEvent;
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
    /**
     * Timer 类是计时器的接口，它使您能按指定的时间序列运行代码。
     * 使用 start() 方法来启动计时器。为 timer 事件添加事件侦听器，以便将代码设置为按计时器间隔运行。
     * 可以创建 Timer 对象以运行一次或按指定间隔重复运行，从而按计划执行代码。
     * 根据 Lark 的帧速率或运行时环境（可用内存和其他因素），运行时调度事件的间隔可能稍有不同。
     */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        /**
         * 创建一个 Timer 对象
         * @param delay 计时器事件间的延迟（以毫秒为单位）。
         * @param repeatCount 设置的计时器运行总次数。
         */
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            _super.call(this);
            this._delay = 0;
            this._currentCount = 0;
            this._running = false;
            this.updateInterval = 1000;
            this.lastCount = 1000;
            this.delay = delay;
            this.repeatCount = +repeatCount | 0;
        }
        var d = __define,c=Timer;p=c.prototype;
        d(p, "delay",
            /**
             * 计时器事件间的延迟（以毫秒为单位）。如果在计时器正在运行时设置延迟间隔，则计时器将按相同的 repeatCount 迭代重新启动。
             * 注意：建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
             */
            function () {
                return this._delay;
            },
            function (value) {
                value = +value || 0;
                if (value < 1) {
                    value = 1;
                }
                if (this._delay === value) {
                    return;
                }
                this._delay = value;
                this.lastCount = this.updateInterval = Math.round(60 * value);
            }
        );
        d(p, "currentCount",
            /**
             * 计时器从 0 开始后触发的总次数。如果已重置了计时器，则只会计入重置后的触发次数。
             */
            function () {
                return this._currentCount;
            },undefined
        );
        d(p, "running",
            /**
             * 计时器的当前状态；如果计时器正在运行，则为 true，否则为 false。
             */
            function () {
                return this._running;
            },undefined
        );
        /**
         * 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。然后，在调用 start() 后，将运行计时器实例，运行次数为指定的重复次数（由 repeatCount 值设置）。
         */
        p.reset = function () {
            this.stop();
            this._currentCount = 0;
        };
        /**
         * 如果计时器尚未运行，则启动计时器。
         */
        p.start = function () {
            if (this._running)
                return;
            lark.startTick(this.$update, this);
            this._running = true;
        };
        /**
         * 停止计时器。如果在调用 stop() 后调用 start()，则将继续运行计时器实例，运行次数为剩余的 重复次数（由 repeatCount 属性设置）。
         */
        p.stop = function () {
            if (!this._running)
                return;
            lark.stopTick(this.$update, this);
            this._running = false;
        };
        /**
         * Ticker以60FPS频率刷新此方法
         */
        p.$update = function (timeStamp) {
            this.lastCount -= 1000;
            if (this.lastCount > 0) {
                return;
            }
            this.lastCount += this.updateInterval;
            this._currentCount++;
            var complete = (this.repeatCount > 0 && this._currentCount >= this.repeatCount);
            lark.TimerEvent.emitTimerEvent(this, lark.TimerEvent.TIMER);
            if (complete) {
                this.stop();
                lark.TimerEvent.emitTimerEvent(this, lark.TimerEvent.TIMER_COMPLETE);
            }
        };
        return Timer;
    })(lark.EventEmitter);
    lark.Timer = Timer;
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
    lark.$locale_strings = lark.$locale_strings || {};
    lark.$locale_strings["zh_CN"] = lark.$locale_strings["zh_CN"] || {};
    var locale_strings = lark.$locale_strings["zh_CN"];
    locale_strings[1001] = "找不到Lark入口类: {0}。";
    locale_strings[1002] = "Lark入口类 {0} 必须继承自lark.DisplayObject。";
    locale_strings[1003] = "参数 {0} 不能为 null。";
    locale_strings[1004] = "无法将对象添加为它的一个子对象（或子对象的子对象等）的子对象。";
    locale_strings[1005] = "不能将对象添加为其自身的子对象。";
    locale_strings[1006] = "提供的 DisplayObject 必须是调用者的子级。";
    locale_strings[1007] = "为参数指定的索引不在范围内。";
    locale_strings[1008] = "实例化单例出错，不允许实例化多个 {0} 对象。";
    locale_strings[1009] = "Stage 类不实现此属性或方法。";
    locale_strings[1010] = "{0} 是只读的";
    locale_strings[1011] = "流错误。URL: {0}";
    locale_strings[1012] = "参数 {0} 的类型必须为 Class。";
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
    var sys;
    (function (sys) {
        var displayListPool = [];
        var blendModes = ["source-over", "lighter", "destination-out"];
        /**
         * 显示列表
         */
        var DisplayList = (function (_super) {
            __extends(DisplayList, _super);
            /**
             * 创建一个DisplayList对象
             */
            function DisplayList(root) {
                _super.call(this);
                /**
                 * 是否需要重绘
                 */
                this.$isDirty = false;
                /**
                 * 在舞台上的透明度
                 */
                this.$renderAlpha = 1;
                /**
                 * 在舞台上的显示区域
                 */
                this.$renderRegion = new sys.Region();
                /**
                 * 呈现绘制结果的目标画布
                 */
                this.surface = null;
                this.offsetX = 0;
                this.offsetY = 0;
                this.needRedraw = false;
                this.drawToStage = false;
                /**
                 * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
                 */
                this.dirtyNodes = {};
                this.dirtyNodeList = [];
                this.dirtyList = null;
                this.dirtyRegion = new sys.DirtyRegion();
                this.sizeChanged = false;
                this.root = root;
            }
            var d = __define,c=DisplayList;p=c.prototype;
            /**
             * 释放一个DisplayList实例到对象池
             */
            DisplayList.release = function (displayList) {
                sys.surfaceFactory.release(displayList.surface);
                displayList.surface = null;
                displayList.renderContext = null;
                displayList.root = null;
                displayList.$renderMatrix = null;
                displayList.needRedraw = false;
                displayList.$isDirty = false;
                displayListPool.push(displayList);
            };
            /**
             * 从对象池中取出或创建一个新的DisplayList对象。
             */
            DisplayList.create = function (target) {
                var displayList = displayListPool.pop();
                if (!displayList) {
                    displayList = new lark.sys.DisplayList(target);
                }
                var surface = sys.surfaceFactory.create();
                if (!surface) {
                    return null;
                }
                displayList.surface = surface;
                displayList.renderContext = surface.renderContext;
                return displayList;
            };
            /**
             * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
             */
            p.$update = function () {
                var target = this.root;
                target.$removeFlagsUp(768 /* Dirty */);
                this.$renderAlpha = target.$getConcatenatedAlpha();
                this.$renderMatrix = target.$getConcatenatedMatrix();
                var bounds = target.$getOriginalBounds();
                if (this.needRedraw) {
                    this.updateDirtyRegions();
                }
                if (!target.$stage) {
                    return false;
                }
                var region = this.$renderRegion;
                if (!region.moved) {
                    return false;
                }
                region.moved = false;
                region.updateRegion(bounds, this.$renderMatrix);
                return true;
            };
            p.$render = function (context) {
                var data = this.surface;
                if (data) {
                    context.drawImage(data, this.offsetX, this.offsetY);
                }
            };
            /**
             * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
             */
            p.setClipRect = function (width, height) {
                this.dirtyRegion.setClipRect(width, height);
                this.drawToStage = true; //只有舞台画布才能设置ClipRect
                var surface = this.renderContext.surface;
                surface.width = width;
                surface.height = height;
                this.surface = surface;
            };
            /**
             * 标记一个节点需要重新渲染
             */
            p.markDirty = function (node) {
                var key = node.$hashCode;
                if (this.dirtyNodes[key]) {
                    return;
                }
                this.dirtyNodes[key] = true;
                this.dirtyNodeList.push(node);
                if (!this.needRedraw) {
                    this.needRedraw = true;
                    var parentCache = this.root.$parentDisplayList;
                    if (parentCache) {
                        parentCache.markDirty(this);
                    }
                }
            };
            /**
             * 更新节点属性并返回脏矩形列表。
             */
            p.updateDirtyRegions = function () {
                var nodeList = this.dirtyNodeList;
                this.dirtyNodeList = [];
                this.dirtyNodes = {};
                var dirtyRegion = this.dirtyRegion;
                var length = nodeList.length;
                for (var i = 0; i < length; i++) {
                    var node = nodeList[i];
                    var region = node.$renderRegion;
                    if (node.$renderAlpha > 0) {
                        if (dirtyRegion.addRegion(region)) {
                            node.$isDirty = true;
                        }
                    }
                    var moved = node.$update();
                    if (node.$renderAlpha > 0 && (moved || !node.$isDirty)) {
                        if (dirtyRegion.addRegion(region)) {
                            node.$isDirty = true;
                        }
                    }
                }
                this.dirtyList = dirtyRegion.getDirtyRegions();
                return this.dirtyList;
            };
            /**
             * 绘制根节点显示对象到目标画布，返回draw的次数。
             */
            p.drawToSurface = function () {
                if (!this.drawToStage) {
                    this.changeSurfaceSize();
                }
                var context = this.renderContext;
                //绘制脏矩形区域
                context.save();
                context.beginPath();
                var dirtyList = this.dirtyList;
                this.dirtyList = null;
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    context.clearRect(region.minX, region.minY, region.width, region.height);
                    context.rect(region.minX, region.minY, region.width, region.height);
                }
                context.clip();
                //绘制显示对象
                var drawCalls = this.drawDisplayObject(this.root, context, dirtyList, this.drawToStage, null, null);
                //清除脏矩形区域
                context.restore();
                this.dirtyRegion.clear();
                this.needRedraw = false;
                return drawCalls;
            };
            /**
             * 绘制一个显示对象
             */
            p.drawDisplayObject = function (displayObject, context, dirtyList, drawToStage, displayList, clipRegion) {
                var drawCalls = 0;
                var node;
                var globalAlpha;
                if (displayList) {
                    if (displayList.needRedraw) {
                        drawCalls += displayList.drawToSurface();
                    }
                    node = displayList;
                    globalAlpha = 1; //这里不用读取displayList.$renderAlpha,因为它已经绘制到了displayList.surface的内部。
                }
                else if (displayObject.$renderRegion) {
                    node = displayObject;
                    globalAlpha = displayObject.$renderAlpha;
                }
                if (node) {
                    var renderRegion = node.$renderRegion;
                    if (clipRegion && !clipRegion.intersects(renderRegion)) {
                        node.$isDirty = false;
                    }
                    else if (!node.$isDirty) {
                        var l = dirtyList.length;
                        for (var j = 0; j < l; j++) {
                            if (renderRegion.intersects(dirtyList[j])) {
                                node.$isDirty = true;
                                break;
                            }
                        }
                    }
                    if (node.$isDirty) {
                        drawCalls++;
                        context.globalAlpha = globalAlpha;
                        var m = node.$renderMatrix;
                        if (drawToStage) {
                            context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            node.$render(context);
                        }
                        else {
                            context.save();
                            context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            node.$render(context);
                            context.restore();
                        }
                        node.$isDirty = false;
                    }
                }
                if (displayList) {
                    return drawCalls;
                }
                var children = displayObject.$children;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
                        var child = children[i];
                        if (!child.$visible || child.$alpha <= 0 || child.$maskedObject) {
                            continue;
                        }
                        if (child.$scrollRect || child.$mask) {
                            drawCalls += this.drawWidthClip(child, context, dirtyList, drawToStage, clipRegion);
                        }
                        else if (child.$blendMode !== 0) {
                            drawCalls += this.drawWidthBlendMode(child, context, dirtyList, drawToStage, clipRegion);
                        }
                        else {
                            if (DEBUG && child["isFPS"]) {
                                this.drawDisplayObject(child, context, dirtyList, drawToStage, child.$displayList, clipRegion);
                            }
                            else {
                                drawCalls += this.drawDisplayObject(child, context, dirtyList, drawToStage, child.$displayList, clipRegion);
                            }
                        }
                    }
                }
                return drawCalls;
            };
            p.drawWidthBlendMode = function (displayObject, context, dirtyList, drawToStage, clipRegion) {
                var drawCalls = 0;
                var region;
                var bounds = displayObject.$getOriginalBounds();
                if (!bounds.isEmpty()) {
                    region = sys.Region.create();
                    region.updateRegion(bounds, displayObject.$getConcatenatedMatrix());
                }
                if (!region || (clipRegion && !clipRegion.intersects(region))) {
                    return drawCalls;
                }
                var displayContext = this.createRenderContext(region.width, region.height);
                if (!displayContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, drawToStage, displayObject.$displayList, clipRegion);
                    sys.Region.release(region);
                    return drawCalls;
                }
                displayContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, false, displayObject.$displayList, region);
                if (drawCalls > 0) {
                    drawCalls++;
                    var defaultCompositeOp = "source-over";
                    var compositeOp = blendModes[displayObject.$blendMode];
                    if (!compositeOp) {
                        compositeOp = defaultCompositeOp;
                    }
                    context.globalCompositeOperation = compositeOp;
                    this.drawWidthSurface(context, displayContext.surface, drawToStage, region.minX, region.minY);
                    context.globalCompositeOperation = defaultCompositeOp;
                }
                sys.surfaceFactory.release(displayContext.surface);
                sys.Region.release(region);
                return drawCalls;
            };
            p.drawWidthClip = function (displayObject, context, dirtyList, drawToStage, clipRegion) {
                var drawCalls = 0;
                var scrollRect = displayObject.$scrollRect;
                var mask = displayObject.$mask;
                //计算scrollRect和mask的clip区域是否需要绘制，不需要就直接返回，跳过所有子项的遍历。
                var maskRegion;
                var displayMatrix = displayObject.$getConcatenatedMatrix();
                if (mask) {
                    var bounds = mask.$getOriginalBounds();
                    if (!bounds.isEmpty()) {
                        maskRegion = sys.Region.create();
                        maskRegion.updateRegion(bounds, mask.$getConcatenatedMatrix());
                    }
                }
                var region;
                if (scrollRect && !scrollRect.isEmpty()) {
                    region = sys.Region.create();
                    region.updateRegion(scrollRect, displayMatrix);
                }
                if (!region && !maskRegion) {
                    return drawCalls;
                }
                if (region && maskRegion) {
                    region.intersect(maskRegion);
                    sys.Region.release(maskRegion);
                }
                else if (!region) {
                    region = maskRegion;
                }
                if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                    sys.Region.release(region);
                    return drawCalls;
                }
                var found = false;
                var l = dirtyList.length;
                for (var j = 0; j < l; j++) {
                    if (region.intersects(dirtyList[j])) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    sys.Region.release(region);
                    return drawCalls;
                }
                //绘制显示对象自身，若有scrollRect，应用clip
                var displayContext = this.createRenderContext(region.width, region.height);
                if (!displayContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, drawToStage, displayObject.$displayList, clipRegion);
                    sys.Region.release(region);
                    return drawCalls;
                }
                if (scrollRect) {
                    var m = displayMatrix;
                    displayContext.setTransform(m.a, m.b, m.c, m.d, m.tx - region.minX, m.ty - region.minY);
                    displayContext.beginPath();
                    displayContext.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                    displayContext.clip();
                }
                displayContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, false, displayObject.$displayList, region);
                //绘制遮罩
                if (mask) {
                    var maskContext = this.createRenderContext(region.width, region.height);
                    if (!maskContext) {
                        drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, drawToStage, displayObject.$displayList, clipRegion);
                        sys.surfaceFactory.release(displayContext.surface);
                        sys.Region.release(region);
                        return drawCalls;
                    }
                    maskContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                    var calls = this.drawDisplayObject(mask, maskContext, dirtyList, false, mask.$displayList, region);
                    if (calls > 0) {
                        drawCalls += calls;
                        displayContext.globalCompositeOperation = "destination-in";
                        displayContext.setTransform(1, 0, 0, 1, 0, 0);
                        displayContext.globalAlpha = 1;
                        displayContext.drawImage(maskContext.surface, 0, 0);
                    }
                    sys.surfaceFactory.release(maskContext.surface);
                }
                //绘制结果到屏幕
                if (drawCalls > 0) {
                    drawCalls++;
                    this.drawWidthSurface(context, displayContext.surface, drawToStage, region.minX, region.minY);
                }
                sys.surfaceFactory.release(displayContext.surface);
                sys.Region.release(region);
                return drawCalls;
            };
            p.createRenderContext = function (width, height) {
                var surface = sys.surfaceFactory.create(true);
                if (!surface) {
                    return null;
                }
                surface.width = Math.max(257, width);
                surface.height = Math.max(257, height);
                return surface.renderContext;
            };
            p.drawWidthSurface = function (context, surface, drawToStage, offsetX, offsetY) {
                if (drawToStage) {
                    context.setTransform(1, 0, 0, 1, offsetX, offsetY);
                    context.drawImage(surface, 0, 0);
                }
                else {
                    context.save();
                    context.translate(offsetX, offsetY);
                    context.drawImage(surface, 0, 0);
                    context.restore();
                }
            };
            /**
             * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
             */
            p.changeSurfaceSize = function () {
                var root = this.root;
                var oldOffsetX = this.offsetX;
                var oldOffsetY = this.offsetY;
                var bounds = this.root.$getOriginalBounds();
                this.offsetX = bounds.x;
                this.offsetY = bounds.y;
                var oldContext = this.renderContext;
                var oldSurface = oldContext.surface;
                if (!this.sizeChanged) {
                    this.sizeChanged = true;
                    oldSurface.width = bounds.width;
                    oldSurface.height = bounds.height;
                }
                else if (bounds.width !== oldSurface.width || bounds.height !== oldSurface.height) {
                    var newContext = sys.sharedRenderContext;
                    var newSurface = newContext.surface;
                    sys.sharedRenderContext = oldContext;
                    this.renderContext = newContext;
                    this.surface = newSurface;
                    newSurface.width = bounds.width;
                    newSurface.height = bounds.height;
                    if (oldSurface.width !== 0 && oldSurface.height !== 0) {
                        newContext.setTransform(1, 0, 0, 1, 0, 0);
                        newContext.drawImage(oldSurface, oldOffsetX - bounds.x, oldOffsetY - bounds.y);
                    }
                    oldSurface.height = 1;
                    oldSurface.width = 1;
                }
                var m = root.$getInvertedConcatenatedMatrix();
                this.renderContext.setTransform(m.a, m.b, m.c, m.d, m.tx - bounds.x, m.ty - bounds.y);
            };
            return DisplayList;
        })(lark.LarkObject);
        sys.DisplayList = DisplayList;
    })(sys = lark.sys || (lark.sys = {}));
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
    var rectanglePool = [];
    /**
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     */
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        /**
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            _super.call(this);
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        var d = __define,c=Rectangle;p=c.prototype;
        /**
         * 释放一个Rectangle实例到对象池
         */
        Rectangle.release = function (rect) {
            if (!rect) {
                return;
            }
            rectanglePool.push(rect);
        };
        /**
         * 从对象池中取出或创建一个新的Rectangle对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        Rectangle.create = function () {
            var rect = rectanglePool.pop();
            if (!rect) {
                rect = new Rectangle();
            }
            return rect;
        };
        d(p, "right",
            /**
             * x 和 width 属性的和。
             */
            function () {
                return this.x + this.width;
            },
            function (value) {
                this.width = value - this.x;
            }
        );
        d(p, "bottom",
            /**
             * y 和 height 属性的和。
             */
            function () {
                return this.y + this.height;
            },
            function (value) {
                this.height = value - this.y;
            }
        );
        d(p, "left",
            /**
             * 矩形左上角的 x 坐标。
             */
            function () {
                return this.x;
            },
            function (value) {
                this.width += this.x - value;
                this.x = value;
            }
        );
        d(p, "top",
            /**
             * 矩形左上角的 y 坐标。
             */
            function () {
                return this.y;
            },
            function (value) {
                this.height += this.y - value;
                this.y = value;
            }
        );
        /**
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         */
        p.copyFrom = function (sourceRect) {
            this.x = sourceRect.x;
            this.y = sourceRect.y;
            this.width = sourceRect.width;
            this.height = sourceRect.height;
            return this;
        };
        /**
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         */
        p.setTo = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };
        /**
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         */
        p.contains = function (x, y) {
            return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
        };
        /**
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         */
        p.intersects = function (toIntersect) {
            return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right) && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
        };
        /**
         * 确定此 Rectangle 对象是否为空。
         */
        p.isEmpty = function () {
            return this.width <= 0 || this.height <= 0;
        };
        /**
         * 将 Rectangle 对象的所有属性设置为 0。
         */
        p.setEmpty = function () {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        };
        /**
         * 克隆矩形对象
         * @returns 返回克隆后的矩形
         */
        p.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        p.$getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * this.width + v * this.height;
        };
        p.$getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * this.width + u * this.height;
        };
        return Rectangle;
    })(lark.LarkObject);
    lark.Rectangle = Rectangle;
    lark.registerClass(Rectangle, 17 /* Rectangle */);
    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    lark.$TempRectangle = new Rectangle();
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
    /**
     * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
     */
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        /**
         * 创建一个 TimerEvent 对象
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         */
        function TimerEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=TimerEvent;p=c.prototype;
        /**
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         */
        p.updateAfterEvent = function () {
            lark.sys.$requestRenderingFlag = true;
        };
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param type 事件类型
         */
        TimerEvent.emitTimerEvent = function (target, type, bubbles, cancelable) {
            var event = lark.Event.create(TimerEvent, type, bubbles, cancelable);
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         */
        TimerEvent.TIMER = "timer";
        /**
         * 每当它完成 Timer.repeatCount 设置的请求数后调度。
         */
        TimerEvent.TIMER_COMPLETE = "timerComplete";
        return TimerEvent;
    })(lark.Event);
    lark.TimerEvent = TimerEvent;
    lark.registerClass(TimerEvent, 12 /* TimerEvent */);
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
    /**
     * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
     * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
     * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
     * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
     * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
     * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
     *
     * @version Lark 1.0
     * @platform HTML5,Runtime,Native
     */
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        /**
         * 创建一个 TouchEvent 对象，其中包含有关Touch事件的信息
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        function TouchEvent(type, bubbles, cancelable, stageX, stageY, touchPointID) {
            _super.call(this, type, bubbles, cancelable);
            this.$setTo(stageX, stageY, touchPointID);
        }
        var d = __define,c=TouchEvent;p=c.prototype;
        /**
         * @private
         */
        p.$setTo = function (stageX, stageY, touchPointID) {
            this.touchPointID = +touchPointID || 0;
            this.$stageX = +stageX || 0;
            this.$stageY = +stageY || 0;
        };
        d(p, "stageX",
            /**
             * 事件发生点在全局舞台坐标中的水平坐标。
             *
             * @version Lark 1.0
             * @platform HTML5,Runtime,Native
             */
            function () {
                return this.$stageX;
            },undefined
        );
        d(p, "stageY",
            /**
             * 事件发生点在全局舞台坐标中的垂直坐标。
             *
             * @version Lark 1.0
             * @platform HTML5,Runtime,Native
             */
            function () {
                return this.$stageY;
            },undefined
        );
        /**
         * @private
         */
        p.getLocalXY = function () {
            if (!this.localPoint) {
                this.localPoint = new lark.Point();
                var m = this.target.$getInvertedConcatenatedMatrix();
                m.transformPoint(this.stageX, this.stageY, this.localPoint);
            }
            return this.localPoint;
        };
        d(p, "localX",
            /**
             * 事件发生点相对于currentTarget的水平坐标。
             *
             * @version Lark 1.0
             * @platform HTML5,Runtime,Native
             */
            function () {
                return this.getLocalXY().x;
            },undefined
        );
        d(p, "localY",
            /**
             * 事件发生点相对于currentTarget的垂直坐标。
             *
             * @version Lark 1.0
             * @platform HTML5,Runtime,Native
             */
            function () {
                return this.getLocalXY().y;
            },undefined
        );
        /**
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        p.updateAfterEvent = function () {
            lark.sys.$requestRenderingFlag = true;
        };
        /**
         * 使用指定的EventEmitter对象来抛出Event事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 派发事件目标
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         *
         * @see lark.Event.create()
         * @see lark.Event.release()
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        TouchEvent.emitTouchEvent = function (target, type, bubbles, cancelable, stageX, stageY, touchPointID) {
            if (!bubbles && !target.hasListener(type)) {
                return true;
            }
            var event = lark.Event.create(TouchEvent, type, bubbles, cancelable);
            event.$setTo(stageX, stageY, touchPointID);
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * 移动
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        TouchEvent.TOUCH_MOVE = "touchMove";
        /**
         * 开始触摸
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        TouchEvent.TOUCH_BEGIN = "touchBegin";
        /**
         * 结束触摸
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        TouchEvent.TOUCH_END = "touchEnd";
        /**
         * 轻拍，开始和结束触摸都在同一对象上
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        TouchEvent.TOUCH_TAP = "touchTap";
        /**
         * 在开始触摸的对象的外部结束触摸
         *
         * @version Lark 1.0
         * @platform HTML5,Runtime,Native
         */
        TouchEvent.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        return TouchEvent;
    })(lark.Event);
    lark.TouchEvent = TouchEvent;
    lark.registerClass(TouchEvent, 13 /* TouchEvent */);
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
    /**
     * 格式化旋转角度的值
     */
    function clampRotation(value) {
        value %= 360;
        if (value > 180) {
            value -= 360;
        }
        else if (value < -180) {
            value += 360;
        }
        return value;
    }
    /**
     * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
     * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
     * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
     * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
     */
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        /**
         * 创建一个显示对象
         */
        function DisplayObject() {
            _super.call(this);
            /**
             * 能够含有子项的类将子项列表存储在这个属性里。
             */
            this.$children = null;
            this.$parent = null;
            this.$stage = null;
            /**
             * 这个对象在显示列表中的嵌套深度，舞台为1，它的子项为2，子项的子项为3，以此类推。当对象不在显示列表中时此属性值为0.
             */
            this.$nestLevel = 0;
            this.$visible = true;
            /**
             * cacheAsBitmap创建的缓存位图节点。
             */
            this.$displayList = null;
            /**
             * 渲染时会用到的属性，独立声明一个变量
             */
            this.$alpha = 1;
            this.$scrollRect = null;
            this.$blendMode = 0;
            /**
             * 被遮罩的对象
             */
            this.$maskedObject = null;
            this.$mask = null;
            this.$parentDisplayList = null;
            /**
             * 是否需要重绘的标志，此属性在渲染时会被访问，所以单独声明一个直接的变量。
             */
            this.$isDirty = false;
            /**
             * 这个对象在舞台上的整体透明度
             */
            this.$renderAlpha = 1;
            /**
             * 在舞台上的矩阵对象
             */
            this.$renderMatrix = new lark.Matrix();
            /**
             * 此显示对象自身（不包括子项）在屏幕上的显示尺寸。
             */
            this.$renderRegion = null;
            this.$displayFlags = 3952 /* InitFlags */;
            this.$DisplayObject = {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 0,
                5: "",
                6: new lark.Matrix(),
                7: new lark.Matrix(),
                8: new lark.Rectangle(),
                9: new lark.Rectangle(),
            };
        }
        var d = __define,c=DisplayObject;p=c.prototype;
        p.$setFlags = function (flags) {
            this.$displayFlags |= flags;
        };
        p.$toggleFlags = function (flags, on) {
            if (on) {
                this.$displayFlags |= flags;
            }
            else {
                this.$displayFlags &= ~flags;
            }
        };
        p.$removeFlags = function (flags) {
            this.$displayFlags &= ~flags;
        };
        /**
         * 沿着显示列表向上移除标志量，如果标志量没被设置过就停止移除。
         */
        p.$removeFlagsUp = function (flags) {
            if (!this.$hasAnyFlags(flags)) {
                return;
            }
            this.$removeFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$removeFlagsUp(flags);
            }
        };
        p.$hasFlags = function (flags) {
            return (this.$displayFlags & flags) === flags;
        };
        /**
         * 沿着显示列表向上传递标志量，如果标志量已经被设置过就停止传递。
         */
        p.$propagateFlagsUp = function (flags) {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var parent = this.$parent;
            if (parent) {
                parent.$propagateFlagsUp(flags);
            }
        };
        /**
         * 沿着显示列表向下传递标志量，非容器直接设置自身的flag，此方法会在 DisplayObjectContainer 中被覆盖。
         */
        p.$propagateFlagsDown = function (flags) {
            this.$setFlags(flags);
        };
        p.$hasAnyFlags = function (flags) {
            return !!(this.$displayFlags & flags);
        };
        p.invalidateMatrix = function () {
            this.$setFlags(8 /* InvalidMatrix */);
            this.invalidatePosition();
        };
        /**
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        p.invalidatePosition = function () {
            this.$invalidateTransform();
            this.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ | 32 /* InvalidInvertedConcatenatedMatrix */);
            if (this.$parent) {
                this.$parent.$propagateFlagsUp(4 /* InvalidBounds */);
            }
        };
        d(p, "name",
            /**
             * 表示 DisplayObject 的实例名称。
             * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
             */
            function () {
                return this.$DisplayObject[5 /* name */];
            },
            function (value) {
                this.$DisplayObject[5 /* name */] = value;
            }
        );
        d(p, "parent",
            /**
             * 表示包含此显示对象的 DisplayObjectContainer 对象。
             * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
             */
            function () {
                return this.$parent;
            },undefined
        );
        p.$setParent = function (parent) {
            this.$parent = parent;
        };
        p.$onAddToStage = function (stage, nestLevel) {
            this.$stage = stage;
            this.$nestLevel = nestLevel;
            lark.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this);
        };
        p.$onRemoveFromStage = function () {
            this.$nestLevel = 0;
            lark.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this);
        };
        d(p, "stage",
            /**
             * 显示对象的舞台。
             * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。
             * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
             */
            function () {
                return this.$stage;
            },undefined
        );
        d(p, "matrix",
            /**
             * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。
             * 注意：必须对matrix属性重新赋值改变的值才能生效，若获取matrix引用来修改对象属性，将不会发生任何改变。
             */
            function () {
                return this.$getMatrix().clone();
            },
            function (value) {
                this.$setMatrix(value);
                if (value) {
                    this.$DisplayObject[6 /* matrix */].copyFrom(value);
                }
            }
        );
        p.$getMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(8 /* InvalidMatrix */)) {
                values[6 /* matrix */].$updateScaleAndRotation(values[0 /* scaleX */], values[1 /* scaleY */], values[2 /* skewX */], values[3 /* skewY */]);
                this.$removeFlags(8 /* InvalidMatrix */);
            }
            return values[6 /* matrix */];
        };
        p.$setMatrix = function (matrix) {
            var values = this.$DisplayObject;
            var m = values[6 /* matrix */];
            if (m.equals(matrix)) {
                return;
            }
            m.copyFrom(matrix);
            values[0 /* scaleX */] = m.$getScaleX();
            values[1 /* scaleY */] = m.$getScaleY();
            values[2 /* skewX */] = matrix.$getSkewX();
            values[3 /* skewY */] = matrix.$getSkewY();
            values[4 /* rotation */] = clampRotation(values[3 /* skewY */] * 180 / Math.PI);
            this.$removeFlags(8 /* InvalidMatrix */);
            this.invalidatePosition();
        };
        /**
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        p.$getConcatenatedMatrix = function () {
            if (this.$hasFlags(16 /* InvalidConcatenatedMatrix */)) {
                if (this.$parent) {
                    this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), this.$renderMatrix);
                    var rect = this.$scrollRect;
                    if (rect) {
                        this.$renderMatrix.$preMultiplyInto(lark.$TempMatrix.setTo(1, 0, 0, 1, -rect.x, -rect.y), this.$renderMatrix);
                    }
                }
                else {
                    this.$renderMatrix.copyFrom(this.$getMatrix());
                }
                if (this.$displayList) {
                    this.$displayList.$renderRegion.moved = true;
                }
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(16 /* InvalidConcatenatedMatrix */);
            }
            return this.$renderMatrix;
        };
        p.$getInvertedConcatenatedMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(32 /* InvalidInvertedConcatenatedMatrix */)) {
                this.$getConcatenatedMatrix().$invertInto(values[7 /* invertedConcatenatedMatrix */]);
                this.$removeFlags(32 /* InvalidInvertedConcatenatedMatrix */);
            }
            return values[7 /* invertedConcatenatedMatrix */];
        };
        d(p, "x",
            /**
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
             * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             */
            function () {
                return this.$getX();
            },
            function (value) {
                this.$setX(value);
            }
        );
        p.$getX = function () {
            return this.$DisplayObject[6 /* matrix */].tx;
        };
        p.$setX = function (value) {
            value = +value || 0;
            var m = this.$DisplayObject[6 /* matrix */];
            if (value === m.tx) {
                return false;
            }
            m.tx = value;
            this.invalidatePosition();
            return true;
        };
        d(p, "y",
            /**
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
             * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             */
            function () {
                return this.$getY();
            },
            function (value) {
                this.$setY(value);
            }
        );
        p.$getY = function () {
            return this.$DisplayObject[6 /* matrix */].ty;
        };
        p.$setY = function (value) {
            value = +value || 0;
            var m = this.$DisplayObject[6 /* matrix */];
            if (value === m.ty) {
                return false;
            }
            m.ty = value;
            this.invalidatePosition();
            return true;
        };
        d(p, "scaleX",
            /**
             * 表示从注册点开始应用的对象的水平缩放比例（百分比）。
             * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
             * 默认值为 1，即不缩放。
             * @default 1
             */
            function () {
                return this.$DisplayObject[0 /* scaleX */];
            },
            function (value) {
                this.$setScaleX(value);
            }
        );
        p.$setScaleX = function (value) {
            value = +value || 0;
            var values = this.$DisplayObject;
            if (value === values[0 /* scaleX */]) {
                return false;
            }
            values[0 /* scaleX */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "scaleY",
            /**
             * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。
             * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
             * 默认值为 1，即不缩放。
             * @default 1
             */
            function () {
                return this.$DisplayObject[1 /* scaleY */];
            },
            function (value) {
                this.$setScaleY(value);
            }
        );
        p.$setScaleY = function (value) {
            value = +value || 0;
            if (value === this.$DisplayObject[1 /* scaleY */]) {
                return false;
            }
            this.$DisplayObject[1 /* scaleY */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "rotation",
            /**
             * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
             * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
             * 减去 360 获得该范围内的值。例如，my_video.rotation = 450语句与 my_video.rotation = 90 是相同的。
             * @default 0 默认值为 0 不旋转。
             */
            function () {
                return this.$DisplayObject[4 /* rotation */];
            },
            function (value) {
                value = +value || 0;
                value = clampRotation(value);
                var values = this.$DisplayObject;
                if (value === values[4 /* rotation */]) {
                    return;
                }
                var delta = value - values[4 /* rotation */];
                var angle = delta / 180 * Math.PI;
                values[2 /* skewX */] += angle;
                values[3 /* skewY */] += angle;
                values[4 /* rotation */] = value;
                this.invalidateMatrix();
            }
        );
        d(p, "width",
            /**
             * 表示显示对象的宽度，以像素为单位。
             */
            function () {
                return this.$getWidth();
            },
            function (value) {
                this.$setWidth(value);
            }
        );
        p.$getWidth = function () {
            return this.$getTransformedBounds(this.$parent, lark.$TempRectangle).width;
        };
        p.$setWidth = function (value) {
            value = +value || 0;
            if (value < 0) {
                return;
            }
            var values = this.$DisplayObject;
            var originalBounds = this.$getOriginalBounds();
            var bounds = this.$getTransformedBounds(this.$parent, lark.$TempRectangle);
            var angle = values[4 /* rotation */] / 180 * Math.PI;
            var baseWidth = originalBounds.$getBaseWidth(angle);
            if (!baseWidth) {
                return;
            }
            var baseHeight = originalBounds.$getBaseHeight(angle);
            values[1 /* scaleY */] = bounds.height / baseHeight;
            values[0 /* scaleX */] = value / baseWidth;
            this.invalidateMatrix();
        };
        d(p, "height",
            /**
             * 表示显示对象的高度，以像素为单位。
             */
            function () {
                return this.$getHeight();
            },
            function (value) {
                this.$setHeight(value);
            }
        );
        p.$getHeight = function () {
            return this.$getTransformedBounds(this.$parent, lark.$TempRectangle).height;
        };
        p.$setHeight = function (value) {
            value = +value || 0;
            if (value < 0) {
                return;
            }
            var values = this.$DisplayObject;
            var originalBounds = this.$getOriginalBounds();
            var bounds = this.$getTransformedBounds(this.$parent, lark.$TempRectangle);
            var angle = values[4 /* rotation */] / 180 * Math.PI;
            var baseHeight = originalBounds.$getBaseHeight(angle);
            if (!baseHeight) {
                return;
            }
            var baseWidth = originalBounds.$getBaseWidth(angle);
            values[1 /* scaleY */] = value / baseHeight;
            values[0 /* scaleX */] = bounds.width / baseWidth;
            this.invalidateMatrix();
        };
        d(p, "visible",
            /**
             * 显示对象是否可见。
             * 不可见的显示对象已被禁用。例如，如果实例的 visible=false，则无法单击该对象。
             * 默认值为 true 可见
             */
            function () {
                return this.$visible;
            },
            function (value) {
                value = !!value;
                if (value === this.$visible) {
                    return;
                }
                this.$visible = value;
                this.$invalidateTransform();
            }
        );
        d(p, "cacheAsBitmap",
            /**
             * 如果设置为 true，则 Lark 播放器将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
             * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
             * 具体取决于显示对象内容的复杂性。在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
             * 最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放和旋转的显示对象一起使用。
             */
            function () {
                return this.$hasFlags(128 /* CacheAsBitmap */);
            },
            function (value) {
                value = !!value;
                this.$toggleFlags(128 /* CacheAsBitmap */, value);
                var hasDisplayList = !!this.$displayList;
                if (hasDisplayList === value) {
                    return;
                }
                if (value) {
                    var displayList = lark.sys.DisplayList.create(this);
                    if (displayList) {
                        this.$displayList = displayList;
                        if (this.$parentDisplayList) {
                            this.$parentDisplayList.markDirty(displayList);
                        }
                        this.$cacheAsBitmapChanged();
                    }
                }
                else {
                    lark.sys.DisplayList.release(this.$displayList);
                    this.$displayList = null;
                    this.$cacheAsBitmapChanged();
                }
            }
        );
        /**
         * cacheAsBitmap属性改变
         */
        p.$cacheAsBitmapChanged = function () {
            var parentCache = this.$displayList || this.$parentDisplayList;
            if (this.$renderRegion) {
                parentCache.markDirty(this);
            }
        };
        d(p, "alpha",
            /**
             * 表示指定对象的 Alpha 透明度值。
             * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是活动的，即使它们不可见。
             *  @default 1 默认值为 1。
             */
            function () {
                return this.$alpha;
            },
            function (value) {
                value = +value || 0;
                if (value === this.$alpha) {
                    return;
                }
                this.$alpha = value;
                this.$propagateFlagsDown(64 /* InvalidConcatenatedAlpha */);
                this.$invalidate(true);
            }
        );
        /**
         * 获取这个显示对象跟它所有父级透明度的乘积
         */
        p.$getConcatenatedAlpha = function () {
            if (this.$hasFlags(64 /* InvalidConcatenatedAlpha */)) {
                if (this.$parent) {
                    var parentAlpha = this.$parent.$getConcatenatedAlpha();
                    this.$renderAlpha = parentAlpha * this.$alpha;
                }
                else {
                    this.$renderAlpha = this.$alpha;
                }
                this.$removeFlags(64 /* InvalidConcatenatedAlpha */);
            }
            return this.$renderAlpha;
        };
        d(p, "touchEnabled",
            /**
             * 指定此对象是否接收鼠标/触摸事件
             * @default true 默认为 true 即可以接收。
             */
            function () {
                return this.$hasFlags(1024 /* TouchEnabled */);
            },
            function (value) {
                this.$setTouchEnabled(value);
            }
        );
        p.$setTouchEnabled = function (value) {
            this.$toggleFlags(1024 /* TouchEnabled */, !!value);
        };
        d(p, "pixelHitTest",
            /**
             * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透，设置为false将只检查显示对象测量的最大矩形区域。
             * 开启此属性将会有一定量的额外性能损耗，Shape和Sprite等含有矢量图的类默认开启此属性，其他类默认关闭。
             */
            function () {
                return this.$hasFlags(1 /* PixelHitTest */);
            },
            function (value) {
                this.$toggleFlags(1 /* PixelHitTest */, !!value);
            }
        );
        d(p, "scrollRect",
            /**
             * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
             * 注意：必须对scrollRect属性重新赋值改变的值才能生效，若获取scrollRect引用来修改对象属性，将不会发生任何改变。
             */
            function () {
                return this.$scrollRect ? this.$scrollRect.clone() : null;
            },
            function (value) {
                if (!value && !this.$scrollRect) {
                    return;
                }
                if (value) {
                    if (!this.$scrollRect) {
                        this.$scrollRect = new lark.Rectangle();
                    }
                    this.$scrollRect.copyFrom(value);
                }
                else {
                    this.$scrollRect = null;
                }
                this.invalidatePosition();
            }
        );
        d(p, "blendMode",
            /**
             * BlendMode 枚举中的一个值，用于指定要使用的混合模式，确定如何将一个源（新的）图像绘制到目标（已有）的图像上
             * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
             */
            function () {
                return lark.sys.numberToBlendMode(this.$blendMode);
            },
            function (value) {
                var mode = lark.sys.blendModeToNumber(value);
                if (mode === this.$blendMode) {
                    return;
                }
                this.$blendMode = mode;
                this.$invalidateTransform();
            }
        );
        d(p, "mask",
            /**
             * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
             * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
             * Sprite 对象，它必须在显示列表中。
             * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
             * 该对象的 mask 属性将变为 null。
             */
            function () {
                return this.$mask;
            },
            function (value) {
                if (value === this.$mask || value === this) {
                    return;
                }
                if (value) {
                    if (value.$maskedObject) {
                        value.$maskedObject.mask = null;
                    }
                    value.$maskedObject = this;
                }
                this.$mask = value;
                this.$invalidateTransform();
            }
        );
        /**
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Rectangle对象来存储结果，
         * 若不传入将创建一个新的Rectangle对象返回。
         * @returns 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
         */
        p.getBounds = function (targetCoordinateSpace, resultRect) {
            targetCoordinateSpace = targetCoordinateSpace || this;
            return this.$getTransformedBounds(targetCoordinateSpace, resultRect);
        };
        p.$getTransformedBounds = function (targetCoordinateSpace, resultRect) {
            var bounds = this.$getOriginalBounds();
            if (!resultRect) {
                resultRect = new lark.Rectangle();
            }
            resultRect.copyFrom(bounds);
            if (targetCoordinateSpace === this || resultRect.isEmpty()) {
                return resultRect;
            }
            var m;
            if (targetCoordinateSpace) {
                m = lark.$TempMatrix;
                var invertedTargetMatrix = targetCoordinateSpace.$getInvertedConcatenatedMatrix();
                invertedTargetMatrix.$preMultiplyInto(this.$getConcatenatedMatrix(), m);
            }
            else {
                m = this.$getConcatenatedMatrix();
            }
            m.$transformBounds(resultRect);
            return resultRect;
        };
        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param stageX 舞台坐标x
         * @param stageY 舞台坐标y
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
         * 若不传入将创建一个新的Point对象返回。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         */
        p.globalToLocal = function (stageX, stageY, resultPoint) {
            var m = this.$getInvertedConcatenatedMatrix();
            return m.transformPoint(stageX, stageY, resultPoint);
        };
        /**
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param localX 舞台坐标x
         * @param localY 舞台坐标y
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，
         * 若不传入将创建一个新的Point对象返回。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         */
        p.localToGlobal = function (localX, localY, resultPoint) {
            var m = this.$getConcatenatedMatrix();
            return m.transformPoint(localX, localY, resultPoint);
        };
        /**
         * 标记自身的测量尺寸失效
         */
        p.$invalidateContentBounds = function () {
            this.$invalidate();
            this.$setFlags(2 /* InvalidContentBounds */);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * 获取显示对象占用的矩形区域集合，通常包括自身绘制的测量区域，如果是容器，还包括所有子项占据的区域。
         */
        p.$getOriginalBounds = function () {
            var bounds = this.$DisplayObject[8 /* bounds */];
            if (this.$hasFlags(4 /* InvalidBounds */)) {
                bounds.copyFrom(this.$getContentBounds());
                this.$measureChildBounds(bounds);
                this.$removeFlags(4 /* InvalidBounds */);
                if (this.$displayList) {
                    this.$displayList.$renderRegion.moved = true;
                }
            }
            return bounds;
        };
        /**
         * 测量子项占用的矩形区域
         * @param bounds 测量结果存储在这个矩形对象内
         */
        p.$measureChildBounds = function (bounds) {
        };
        p.$getContentBounds = function () {
            var bounds = this.$DisplayObject[9 /* contentBounds */];
            if (this.$hasFlags(2 /* InvalidContentBounds */)) {
                this.$measureContentBounds(bounds);
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(2 /* InvalidContentBounds */);
            }
            return bounds;
        };
        /**
         * 测量自身占用的矩形区域，注意：此测量结果并不包括子项占据的区域。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        p.$measureContentBounds = function (bounds) {
        };
        /**
         * 标记此显示对象需要重绘。此方法会触发自身的cacheAsBitmap重绘。如果只是矩阵改变，自身显示内容并不改变，应该调用$invalidateTransform().
         * @param notiryChildren 是否标记子项也需要重绘。传入false或不传入，将只标记自身需要重绘。通常只有alpha属性改变会需要通知子项重绘。
         */
        p.$invalidate = function (notifyChildren) {
            if (!this.$renderRegion || this.$hasFlags(256 /* DirtyRender */)) {
                return;
            }
            this.$setFlags(256 /* DirtyRender */);
            var displayList = this.$displayList ? this.$displayList : this.$parentDisplayList;
            if (displayList) {
                displayList.markDirty(this);
            }
        };
        /**
         * 标记自身以及所有子项在父级中变换叠加的显示内容失效。此方法不会触发自身的cacheAsBitmap重绘。
         * 通常用于矩阵改变或从显示列表添加和移除时。若自身的显示内容已经改变需要重绘，应该调用$invalidate()。
         */
        p.$invalidateTransform = function () {
            if (this.$hasFlags(512 /* DirtyChildren */)) {
                return;
            }
            this.$setFlags(512 /* DirtyChildren */);
            var displayList = this.$displayList;
            if ((displayList || this.$renderRegion) && this.$parentDisplayList) {
                this.$parentDisplayList.markDirty(displayList || this);
            }
        };
        /**
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         */
        p.$update = function () {
            this.$removeFlagsUp(768 /* Dirty */);
            this.$getConcatenatedAlpha();
            var matrix = this.$getConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var stage = this.$stage;
            if (!stage) {
                return false;
            }
            var region = this.$renderRegion;
            if (!region.moved) {
                return false;
            }
            region.moved = false;
            region.updateRegion(bounds, matrix);
            return true;
        };
        /**
         * 执行渲染,绘制自身到屏幕
         */
        p.$render = function (context) {
        };
        p.$hitTest = function (stageX, stageY, shapeFlag) {
            if (!this.$renderRegion || !this.$visible) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            if (bounds.contains(localX, localY)) {
                if (!this.$children) {
                    if (this.$scrollRect && !this.$scrollRect.contains(localX, localY)) {
                        return null;
                    }
                    if (this.$mask && !this.$mask.$hitTest(stageX, stageY, true)) {
                        return null;
                    }
                }
                if (shapeFlag || this.$displayFlags & 1 /* PixelHitTest */) {
                    return this.hitTestPixel(localX, localY);
                }
                return this;
            }
            return null;
        };
        p.hitTestPixel = function (localX, localY) {
            var alpha = this.$getConcatenatedAlpha();
            if (alpha === 0) {
                return null;
            }
            var context;
            var data;
            var displayList = this.$displayList;
            if (displayList) {
                context = displayList.renderContext;
                data = context.getImageData(localX - displayList.offsetX, localY - displayList.offsetY, 1, 1).data;
            }
            else {
                context = lark.sys.sharedRenderContext;
                context.surface.width = context.surface.height = 3;
                context.translate(1 - localX, 1 - localY);
                this.$render(context);
                data = context.getImageData(1, 1, 1, 1).data;
            }
            if (data[3] === 0) {
                return null;
            }
            return this;
        };
        p.$addListener = function (type, listener, thisObject, useCapture, priority, emitOnce) {
            _super.prototype.$addListener.call(this, type, listener, thisObject, useCapture, priority, emitOnce);
            var isEnterFrame = (type == lark.Event.ENTER_FRAME);
            if (isEnterFrame || type == lark.Event.RENDER) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                if (list.indexOf(this) == -1) {
                    list.push(this);
                }
            }
        };
        p.removeListener = function (type, listener, thisObject, useCapture) {
            _super.prototype.removeListener.call(this, type, listener, thisObject, useCapture);
            var isEnterFrame = (type == lark.Event.ENTER_FRAME);
            if ((isEnterFrame || type == lark.Event.RENDER) && !this.hasListener(type)) {
                var list = isEnterFrame ? DisplayObject.$enterFrameCallBackList : DisplayObject.$renderCallBackList;
                var index = list.indexOf(this);
                if (index !== -1) {
                    list.splice(index, 1);
                }
            }
        };
        p.emit = function (event) {
            if (!event.$bubbles) {
                return _super.prototype.emit.call(this, event);
            }
            var list = this.$getPropagationList(this);
            var targetIndex = list.length * 0.5;
            event.$target = this;
            this.$emitPropagationEvent(event, list, targetIndex);
            return !event.$isDefaultPrevented;
        };
        /**
         * 获取事件流列表。注意：Lark框架的事件流与Flash实现并不一致。
         *
         * Flash的事件流有三个阶段：捕获，目标，冒泡。
         * 默认的的事件监听若不开始useCapture将监听目标和冒泡阶段。若开始capture将只能监听捕获当不包括目标的事件。
         * 可以在Flash中写一个简单的测试：实例化一个非容器显示对象，例如TextField。分别监听useCapture为true和false时的鼠标事件。
         * 点击后将只有useCapture为false的回调函数输出信息。也就带来一个问题「Flash的捕获阶段不能监听到最内层对象本身，只在父级列表有效」。
         *
         * 而HTML里的事件流只有两个阶段：捕获，冒泡。
         * 最初是由于各个浏览器都只有一个方向的事件流，并且存在捕获和冒泡两种相反的顺序。w3c最终决定同时实现两种事件流，监听时用useCapture来区分监。
         * HTML里与Flash里事件流最根本的区别：没有目标阶段，最内层的点击对象会触发两次事件，一次捕获一次冒泡。而Flash只触发一次，
         * 是与「捕获」和「冒泡」独立的「目标」阶段。出于拥抱web标准的考虑，加上大部分Flash开发者其实也并不知道有「目标」阶段的存在。
         *
         * Lark最终采用了HTML里只有两个阶段的事件流机制。
         */
        p.$getPropagationList = function (target) {
            var list = [];
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            var captureList = list.concat();
            captureList.reverse(); //使用一次reverse()方法比多次调用unshift()性能高。
            list = captureList.concat(list);
            return list;
        };
        p.$emitPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event.$currentTarget = currentTarget;
                if (i < targetIndex)
                    event.$eventPhase = 1 /* CAPTURING_PHASE */;
                else
                    event.$eventPhase = 3 /* BUBBLING_PHASE */;
                currentTarget.$notifyListener(event);
                if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                    return;
                }
            }
        };
        p.willTrigger = function (type) {
            var parent = this;
            while (parent) {
                if (parent.hasListener(type))
                    return true;
                parent = parent.$parent;
            }
            return false;
        };
        DisplayObject.$enterFrameCallBackList = [];
        DisplayObject.$renderCallBackList = [];
        return DisplayObject;
    })(lark.EventEmitter);
    lark.DisplayObject = DisplayObject;
    lark.registerClass(DisplayObject, 3 /* DisplayObject */);
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
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    function cos(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 0;
            case PI:
            case -PI:
                return -1;
            case PacPI:
            case -HalfPI:
                return 0;
            default:
                return Math.cos(angle);
        }
    }
    function sin(angle) {
        switch (angle) {
            case HalfPI:
            case -PacPI:
                return 1;
            case PI:
            case -PI:
                return 0;
            case PacPI:
            case -HalfPI:
                return -1;
            default:
                return Math.sin(angle);
        }
    }
    var matrixPool = [];
    /**
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     */
    var Matrix = (function (_super) {
        __extends(Matrix, _super);
        /**
         * 创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            _super.call(this);
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        var d = __define,c=Matrix;p=c.prototype;
        /**
         * 释放一个Matrix实例到对象池
         */
        Matrix.release = function (matrix) {
            if (!matrix) {
                return;
            }
            matrixPool.push(matrix);
        };
        /**
         * 从对象池中取出或创建一个新的Matrix对象。
         * 建议对于一次性使用的对象，均使用此方法创建，而不是直接new一个。
         * 使用完后调用对应的release()静态方法回收对象，能有效减少对象创建数量造成的性能开销。
         */
        Matrix.create = function () {
            var matrix = matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        };
        /**
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         */
        p.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        };
        /**
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
         * @param other 要连接到源矩阵的矩阵。
         */
        p.concat = function (other) {
            var a = this.a * other.a;
            var b = 0.0;
            var c = 0.0;
            var d = this.d * other.d;
            var tx = this.tx * other.a + other.tx;
            var ty = this.ty * other.d + other.ty;
            if (this.b !== 0.0 || this.c !== 0.0 || other.b !== 0.0 || other.c !== 0.0) {
                a += this.b * other.c;
                d += this.c * other.b;
                b += this.a * other.b + this.b * other.d;
                c += this.c * other.a + this.d * other.c;
                tx += this.ty * other.c;
                ty += this.tx * other.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        /**
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         */
        p.copyFrom = function (other) {
            this.a = other.a;
            this.b = other.b;
            this.c = other.c;
            this.d = other.d;
            this.tx = other.tx;
            this.ty = other.ty;
            return this;
        };
        /**
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         */
        p.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        };
        /**
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         */
        p.invert = function () {
            this.$invertInto(this);
        };
        p.$invertInto = function (target) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            if (b === 0 && c === 0) {
                target.b = target.c = 0;
                if (a === 0 || d === 0) {
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else {
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }
                return;
            }
            var determinant = a * d - b * c;
            if (determinant === 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = target.a = d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d = a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        };
        /**
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         */
        p.rotate = function (angle) {
            angle = +angle;
            if (angle !== 0) {
                var u = cos(angle);
                var v = sin(angle);
                var ta = this.a;
                var tb = this.b;
                var tc = this.c;
                var td = this.d;
                var ttx = this.tx;
                var tty = this.ty;
                this.a = ta * u - tb * v;
                this.b = ta * v + tb * u;
                this.c = tc * u - td * v;
                this.d = tc * v + td * u;
                this.tx = ttx * u - tty * v;
                this.ty = ttx * v + tty * u;
            }
        };
        /**
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         */
        p.scale = function (sx, sy) {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        };
        /**
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         */
        p.setTo = function (a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
            return this;
        };
        /**
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         */
        p.transformPoint = function (pointX, pointY, resultPoint) {
            var x = this.a * pointX + this.c * pointY + this.tx;
            var y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new lark.Point(x, y);
        };
        /**
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         */
        p.translate = function (dx, dy) {
            this.tx += dx;
            this.ty += dy;
        };
        /**
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         */
        p.equals = function (other) {
            return this.a === other.a && this.b === other.b && this.c === other.c && this.d === other.d && this.tx === other.tx && this.ty === other.ty;
        };
        p.$transformBounds = function (bounds) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            var x = bounds.x;
            var y = bounds.y;
            var xMax = x + bounds.width;
            var yMax = y + bounds.height;
            var x0 = a * x + c * y + tx;
            var y0 = b * x + d * y + ty;
            var x1 = a * xMax + c * y + tx;
            var y1 = b * xMax + d * y + ty;
            var x2 = a * xMax + c * yMax + tx;
            var y2 = b * xMax + d * yMax + ty;
            var x3 = a * x + c * yMax + tx;
            var y3 = b * x + d * yMax + ty;
            var tmp = 0;
            if (x0 > x1) {
                tmp = x0;
                x0 = x1;
                x1 = tmp;
            }
            if (x2 > x3) {
                tmp = x2;
                x2 = x3;
                x3 = tmp;
            }
            bounds.x = Math.floor(x0 < x2 ? x0 : x2);
            bounds.width = Math.ceil((x1 > x3 ? x1 : x3) - bounds.x);
            if (y0 > y1) {
                tmp = y0;
                y0 = y1;
                y1 = tmp;
            }
            if (y2 > y3) {
                tmp = y2;
                y2 = y3;
                y3 = tmp;
            }
            bounds.y = Math.floor(y0 < y2 ? y0 : y2);
            bounds.height = Math.ceil((y1 > y3 ? y1 : y3) - bounds.y);
        };
        p.getDeterminant = function () {
            return this.a * this.d - this.b * this.c;
        };
        p.$getScaleX = function () {
            var m = this;
            if (m.a === 1 && m.b === 0) {
                return 1;
            }
            var result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.getDeterminant() < 0 ? -result : result;
        };
        p.$getScaleY = function () {
            var m = this;
            if (m.c === 0 && m.d === 1) {
                return 1;
            }
            var result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.getDeterminant() < 0 ? -result : result;
        };
        p.$getSkewX = function () {
            return Math.atan2(this.d, this.c) - (PI / 2);
        };
        p.$getSkewY = function () {
            return Math.atan2(this.b, this.a);
        };
        p.$updateScaleAndRotation = function (scaleX, scaleY, skewX, skewY) {
            if ((skewX === 0 || skewX === TwoPI) && (skewY === 0 || skewY === TwoPI)) {
                this.a = scaleX;
                this.b = this.c = 0;
                this.d = scaleY;
                return;
            }
            var u = cos(skewX);
            var v = sin(skewX);
            if (skewX === skewY) {
                this.a = u * scaleX;
                this.b = v * scaleX;
            }
            else {
                this.a = cos(skewY) * scaleX;
                this.b = sin(skewY) * scaleX;
            }
            this.c = -v * scaleY;
            this.d = u * scaleY;
        };
        /**
         * target = other * this
         */
        p.$preMultiplyInto = function (other, target) {
            var a = other.a * this.a;
            var b = 0.0;
            var c = 0.0;
            var d = other.d * this.d;
            var tx = other.tx * this.a + this.tx;
            var ty = other.ty * this.d + this.ty;
            if (other.b !== 0.0 || other.c !== 0.0 || this.b !== 0.0 || this.c !== 0.0) {
                a += other.b * this.c;
                d += other.c * this.b;
                b += other.a * this.b + other.b * this.d;
                c += other.c * this.a + other.d * this.c;
                tx += other.ty * this.c;
                ty += other.tx * this.b;
            }
            target.a = a;
            target.b = b;
            target.c = c;
            target.d = d;
            target.tx = tx;
            target.ty = ty;
        };
        return Matrix;
    })(lark.LarkObject);
    lark.Matrix = Matrix;
    lark.registerClass(Matrix, 15 /* Matrix */);
    /**
     * 仅供框架内复用，要防止暴露引用到外部。
     */
    lark.$TempMatrix = new Matrix();
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
    /**
     * 当加载操作已开始或套接字已接收到数据时，将调度 ProgressEvent 对象。
     * 有两种类型的进程事件：ProgressEvent.PROGRESS 和 ProgressEvent.SOCKET_DATA。
     */
    var ProgressEvent = (function (_super) {
        __extends(ProgressEvent, _super);
        /**
         * 创建一个 ProgressEvent 对象
         */
        function ProgressEvent(type, bubbles, cancelable, bytesLoaded, bytesTotal) {
            _super.call(this, type, bubbles, cancelable);
            /**
             * 在侦听器处理事件时加载的项数或字节数。
             */
            this.bytesLoaded = 0;
            /**
             * 如果加载过程成功，将加载的总项数或总字节数。
             */
            this.bytesTotal = 0;
            this.bytesLoaded = +bytesLoaded || 0;
            this.bytesTotal = +bytesTotal || 0;
        }
        var d = __define,c=ProgressEvent;p=c.prototype;
        /**
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 派发事件目标
         * @param type 事件类型
         * @param bytesLoaded 加载的项数或字节数
         * @param bytesTotal 加载的总项数或总字节数
         */
        ProgressEvent.emitProgressEvent = function (target, type, bytesLoaded, bytesTotal) {
            var event = lark.Event.create(ProgressEvent, type);
            event.bytesLoaded = +bytesLoaded || 0;
            event.bytesTotal = +bytesTotal || 0;
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * 在下载操作过程中收到数据时调度。
         */
        ProgressEvent.PROGRESS = "progress";
        /**
         * 在套接字接收到数据后调度。
         */
        ProgressEvent.SOCKET_DATA = "socketData";
        return ProgressEvent;
    })(lark.Event);
    lark.ProgressEvent = ProgressEvent;
    lark.registerClass(ProgressEvent, 14 /* ProgressEvent */);
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
    var sys;
    (function (sys) {
        var ENTER_LIST = [], LEAVE_LIST = [];
        function getParentList(target, list) {
            while (target) {
                list.push(target);
                target = target.$parent;
            }
            return list;
        }
        /**
         * 用户交互操作管理器
         */
        var TouchHandler = (function (_super) {
            __extends(TouchHandler, _super);
            function TouchHandler(stage) {
                _super.call(this);
                this.touchDownTarget = {};
                this.lastTouchX = -1;
                this.lastTouchY = -1;
                this.stage = stage;
            }
            var d = __define,c=TouchHandler;p=c.prototype;
            /**
             * 触摸开始（按下）
             * @param x 事件发生处相对于舞台的坐标x
             * @param y 事件发生处相对于舞台的坐标y
             * @param touchPointID 分配给触摸点的唯一标识号
             */
            p.onTouchBegin = function (x, y, touchPointID) {
                var target = this.findTarget(x, y);
                this.touchDownTarget[touchPointID] = target.$hashCode;
                lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_BEGIN, true, true, x, y, touchPointID);
            };
            /**
             * 触摸移动
             * @param x 事件发生处相对于舞台的坐标x
             * @param y 事件发生处相对于舞台的坐标y
             * @param touchPointID 分配给触摸点的唯一标识号
             */
            p.onTouchMove = function (x, y, touchPointID) {
                if (this.lastTouchX === x && this.lastTouchY === y) {
                    return;
                }
                this.lastTouchX = x;
                this.lastTouchY = y;
                var target = this.findTarget(x, y);
                lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_MOVE, true, true, x, y, touchPointID);
            };
            /**
             * 触摸结束（弹起）
             * @param x 事件发生处相对于舞台的坐标x
             * @param y 事件发生处相对于舞台的坐标y
             * @param touchPointID 分配给触摸点的唯一标识号
             */
            p.onTouchEnd = function (x, y, touchPointID) {
                var target = this.findTarget(x, y);
                var oldTargetCode = this.touchDownTarget[touchPointID];
                this.touchDownTarget[touchPointID] = -1;
                lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_END, true, true, x, y, touchPointID);
                target = this.findTarget(x, y);
                if (oldTargetCode === target.$hashCode) {
                    lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_TAP, true, true, x, y, touchPointID);
                }
                else {
                    lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_RELEASE_OUTSIDE, true, true, x, y, touchPointID);
                }
            };
            /**
             * 获取舞台坐标下的触摸对象
             */
            p.findTarget = function (stageX, stageY) {
                var target = this.stage.$hitTest(stageX, stageY);
                if (!target) {
                    target = this.stage;
                }
                return target;
            };
            return TouchHandler;
        })(lark.LarkObject);
        sys.TouchHandler = TouchHandler;
    })(sys = lark.sys || (lark.sys = {}));
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
    /**
     * 此类用于使用 Lark 绘图应用程序编程接口 (API) 创建简单形状。Shape 类包括 graphics 属性，该属性使您可以从 Graphics 类访问方法。
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        /**
         * 创建一个 Shape 对象
         */
        function Shape() {
            _super.call(this);
            this.$graphics = new lark.Graphics();
            this.$graphics.$targetDisplay = this;
            this.$renderRegion = new lark.sys.Region();
            this.pixelHitTest = true;
        }
        var d = __define,c=Shape;p=c.prototype;
        d(p, "graphics",
            /**
             * 获取 Shape 中的 Graphics 对象。
             */
            function () {
                return this.$graphics;
            },undefined
        );
        p.$measureContentBounds = function (bounds) {
            this.$graphics.$measureContentBounds(bounds);
        };
        p.$render = function (context) {
            this.$graphics.$render(context);
        };
        return Shape;
    })(lark.DisplayObject);
    lark.Shape = Shape;
    lark.registerClass(Shape, 9 /* Shape */);
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
    /**
     * Bitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 Bitmap() 构造函数创建的图像。
     * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象的引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与转换属性或旋转属性无关。
     * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的复杂 BitmapData 对象，
     * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生内存开销。
     */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        /**
         * 创建一个Bitmap对象
         */
        function Bitmap(bitmapData) {
            _super.call(this);
            this.$smoothing = true;
            this.$renderRegion = new lark.sys.Region();
            this.bitmapData = bitmapData;
        }
        var d = __define,c=Bitmap;p=c.prototype;
        d(p, "bitmapData",
            /**
             * 被引用的 BitmapData 对象。
             */
            function () {
                return this.$bitmapData;
            },
            function (value) {
                this.$setBitmapData(value);
            }
        );
        p.$setBitmapData = function (value) {
            if (value === this.$bitmapData) {
                return;
            }
            this.$bitmapData = value;
            this.$invalidateContentBounds();
        };
        d(p, "smoothing",
            /**
             * 控制在缩放时是否对位图进行平滑处理。如果为 true，则会在缩放时对位图进行平滑处理。
             * 如果为 false，则不会在缩放时对位图进行平滑处理。默认true。
             */
            function () {
                return this.$smoothing;
            },
            function (value) {
                value = !!value;
                if (value === this.$smoothing) {
                    return;
                }
                this.$smoothing = value;
                this.$invalidate();
            }
        );
        p.$measureContentBounds = function (bounds) {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                bounds.setTo(0, 0, bitmapData.width, bitmapData.height);
            }
            else {
                bounds.setEmpty();
            }
        };
        p.$render = function (context) {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                context.imageSmoothingEnabled = this.$smoothing;
                context.drawImage(bitmapData, 0, 0);
            }
        };
        return Bitmap;
    })(lark.DisplayObject);
    lark.Bitmap = Bitmap;
    lark.registerClass(Bitmap, 6 /* Bitmap */);
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
    /**
     * TextField 类用于创建显示对象以显示文本。可以使用 TextField 类的方法和属性对文本字段进行操作。
     * 注意:TextField.width和TextField.height与其他显示对象的定义不同。
     * 其他显示对象的width，height属性始终等于getBounds(parent)方法返回的尺寸，即包含旋转和缩放值，若设置width或height也将会直接修改scaleX和scaleY的值。
     * 而 TextField 返回的宽高值并不包含旋转和缩放值，设置TextField.width和TextField.height也不会影响scaleX或scaleY的值。
     * 设置TextField.width可以强制让文本换行，若文本显示宽度超过您显式设置的值，将会自动换行。
     * 设置TextField.height可以截断文本，若文本显示高度超过您显式设置的值，将会截断不显示。
     * 若您需要重置文本宽高为未设置状态，请将宽高属性赋值为 lark.NONE 即可。
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        /**
         * 创建一个TextField对象
         */
        function TextField(text) {
            _super.call(this);
            this.textLines = [];
            this.$renderRegion = new lark.sys.Region();
            this.$TextField = {
                0: 30,
                1: 0,
                2: 0x000000,
                3: lark.NONE,
                4: lark.NONE,
                5: 0,
                6: 0,
                7: 0,
                8: "sans-serif",
                9: "left",
                10: "top",
                11: "#000000",
                12: "",
                13: "",
                14: [],
                15: false,
                16: false,
                17: true,
                18: false,
                19: true,
                20: false,
                21: 0 //maxChars
            };
            this.text = text;
        }
        var d = __define,c=TextField;p=c.prototype;
        d(p, "fontFamily",
            /**
             * 字体名称 。默认值：sans-serif
             */
            function () {
                return this.$TextField[8 /* fontFamily */];
            },
            function (value) {
                var values = this.$TextField;
                if (values[8 /* fontFamily */] == value) {
                    return;
                }
                values[8 /* fontFamily */] = value;
                this.invalidateFontString();
            }
        );
        d(p, "fontSize",
            /**
             * 字号大小,默认值30 。
             */
            function () {
                return this.$TextField[0 /* fontSize */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$TextField;
                if (values[0 /* fontSize */] === value) {
                    return;
                }
                values[0 /* fontSize */] = value;
                this.invalidateFontString();
            }
        );
        d(p, "bold",
            /**
             * 是否显示为粗体，默认false。
             */
            function () {
                return this.$TextField[15 /* bold */];
            },
            function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value === values[15 /* bold */]) {
                    return;
                }
                values[15 /* bold */] = value;
                this.invalidateFontString();
            }
        );
        d(p, "italic",
            /**
             * 是否显示为斜体，默认false。
             */
            function () {
                return this.$TextField[16 /* italic */];
            },
            function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value === values[16 /* italic */]) {
                    return;
                }
                values[16 /* italic */] = value;
                this.invalidateFontString();
            }
        );
        p.invalidateFontString = function () {
            this.$TextField[17 /* fontStringChanged */] = true;
            this.$invalidateContentBounds();
        };
        /**
         * 获取字体信息的字符串形式。
         */
        p.getFontString = function () {
            var values = this.$TextField;
            if (values[17 /* fontStringChanged */]) {
                values[17 /* fontStringChanged */] = false;
                values[12 /* fontString */] = lark.sys.toFontString(this);
            }
            return values[12 /* fontString */];
        };
        d(p, "textAlign",
            /**
             * 文字的水平对齐方式 ,请使用HorizontalAlign中定义的常量。
             * 默认值：HorizontalAlign.LEFT。
             */
            function () {
                return this.$TextField[9 /* textAlign */];
            },
            function (value) {
                var values = this.$TextField;
                if (values[9 /* textAlign */] == value) {
                    return;
                }
                values[9 /* textAlign */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "verticalAlign",
            /**
             * 文字的垂直对齐方式 ,请使用VerticalAlign中定义的常量。
             * 默认值：VerticalAlign.TOP。
             */
            function () {
                return this.$TextField[10 /* verticalAlign */];
            },
            function (value) {
                var values = this.$TextField;
                if (values[10 /* verticalAlign */] == value) {
                    return;
                }
                values[10 /* verticalAlign */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "lineSpacing",
            /**
             * 行间距。标准行高通常等于fontSize的值，设置此属性，将会在标准行高之间添加指定像素的空白间隔。可以设置为负值。默认值0.
             */
            function () {
                return this.$TextField[1 /* lineSpacing */];
            },
            function (value) {
                value = +value || 0;
                var values = this.$TextField;
                if (values[1 /* lineSpacing */] === value)
                    return;
                values[1 /* lineSpacing */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "textColor",
            /**
             * 文本颜色，默认值0x000000
             */
            function () {
                return this.$TextField[2 /* textColor */];
            },
            function (value) {
                value = +value | 0;
                var values = this.$TextField;
                if (values[2 /* textColor */] === value) {
                    return;
                }
                values[2 /* textColor */] = value;
                values[11 /* colorString */] = lark.sys.toColorString(value);
                this.$invalidate();
            }
        );
        d(p, "wordWrap",
            /**
             * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
             * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。默认值为 true。
             */
            function () {
                return this.$TextField[19 /* wordWrap */];
            },
            function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value === values[19 /* wordWrap */]) {
                    return;
                }
                if (values[20 /* displayAsPassword */]) {
                    return;
                }
                values[19 /* wordWrap */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "text",
            /**
             * 要显示的文本内容
             */
            function () {
                return this.$TextField[13 /* text */];
            },
            function (value) {
                value = (value || "") + "";
                var values = this.$TextField;
                if (value == values[13 /* text */])
                    return;
                values[13 /* text */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "numLines",
            /**
             * 文本行数。
             */
            function () {
                return this.textLines.length;
            },undefined
        );
        d(p, "textWidth",
            /**
             * 文本内容宽度
             */
            function () {
                this.updateTextLines();
                return this.$TextField[5 /* textWidth */];
            },undefined
        );
        d(p, "textHeight",
            /**
             * 文本内容高度
             */
            function () {
                this.updateTextLines();
                return this.$TextField[6 /* textHeight */];
            },undefined
        );
        p.$getWidth = function () {
            var w = this.$TextField[3 /* textFieldWidth */];
            return lark.isNone(w) ? this.$getContentBounds().width : w;
        };
        p.$setWidth = function (value) {
            value = +value || 0;
            var values = this.$TextField;
            if (value < 0 || value === values[3 /* textFieldWidth */]) {
                return;
            }
            values[3 /* textFieldWidth */] = value;
            this.$invalidateContentBounds();
        };
        p.$getHeight = function () {
            var h = this.$TextField[4 /* textFieldHeight */];
            return lark.isNone(h) ? this.$getContentBounds().height : h;
        };
        p.$setHeight = function (value) {
            value = +value || 0;
            var values = this.$TextField;
            if (value < 0 || value === values[4 /* textFieldHeight */]) {
                return;
            }
            values[4 /* textFieldHeight */] = value;
            this.$invalidateContentBounds();
        };
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.$TextField[18 /* textLinesChanged */] = true;
        };
        p.$measureContentBounds = function (bounds) {
            this.updateTextLines();
            var values = this.$TextField;
            var height;
            if (lark.isNone(values[4 /* textFieldHeight */])) {
                height = values[6 /* textHeight */];
            }
            else {
                height = values[4 /* textFieldHeight */];
                var lineHeight = values[0 /* fontSize */] + 4;
                if (height < lineHeight) {
                    height = lineHeight;
                }
            }
            var width = lark.isNone(values[3 /* textFieldWidth */]) ? values[5 /* textWidth */] : values[3 /* textFieldWidth */];
            if (width < values[7 /* textDrawWidth */]) {
                width = values[7 /* textDrawWidth */];
            }
            bounds.setTo(0, 0, width, height);
        };
        p.$render = function (context) {
            var lines = this.updateTextLines();
            if (!lines) {
                return;
            }
            var values = this.$TextField;
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.font = this.getFontString();
            context.fillStyle = values[11 /* colorString */];
            var length = lines.length;
            var lineHeight = values[0 /* fontSize */];
            var halfLineHeight = lineHeight * 0.5;
            var drawY = halfLineHeight + 2;
            var vGap = lineHeight + values[1 /* lineSpacing */];
            var textHeight = values[6 /* textHeight */];
            var hasHeightSet = !lark.isNone(values[4 /* textFieldHeight */]);
            var explicitHeight = hasHeightSet ? values[4 /* textFieldHeight */] : Number.POSITIVE_INFINITY;
            if (hasHeightSet && textHeight < explicitHeight) {
                var vAlign = 0;
                if (values[10 /* verticalAlign */] == lark.VerticalAlign.MIDDLE)
                    vAlign = 0.5;
                else if (values[10 /* verticalAlign */] == lark.VerticalAlign.BOTTOM)
                    vAlign = 1;
                drawY += vAlign * (explicitHeight - textHeight);
            }
            drawY = Math.round(drawY);
            var hAlign = 0;
            if (values[9 /* textAlign */] == lark.HorizontalAlign.CENTER) {
                hAlign = 0.5;
            }
            else if (values[9 /* textAlign */] == lark.HorizontalAlign.RIGHT) {
                hAlign = 1;
            }
            var measuredWidths = values[14 /* measuredWidths */];
            var maxWidth;
            if (lark.isNone(values[3 /* textFieldWidth */])) {
                maxWidth = values[5 /* textWidth */];
            }
            else {
                maxWidth = values[3 /* textFieldWidth */];
            }
            var maxYPos = explicitHeight - 2;
            for (var i = 0; i < length; i++) {
                var line = lines[i];
                var measureW = measuredWidths[i];
                var drawX = Math.round((maxWidth - measureW) * hAlign);
                if (drawX < 0) {
                    drawX = 0;
                }
                if (drawY + halfLineHeight <= maxYPos || i === 0) {
                    context.fillText(line, drawX, drawY);
                }
                drawY += vGap;
            }
        };
        p.updateTextLines = function () {
            var values = this.$TextField;
            if (!values[18 /* textLinesChanged */]) {
                return this.textLines;
            }
            this.textLines.length = 0;
            var measuredWidths = values[14 /* measuredWidths */];
            measuredWidths.length = 0;
            values[5 /* textWidth */] = 0;
            values[6 /* textHeight */] = 0;
            var textFieldWidth = values[3 /* textFieldWidth */];
            var text = values[13 /* text */];
            if (!text || textFieldWidth === 0) {
                return null;
            }
            var displayAsPassword = values[20 /* displayAsPassword */];
            if (displayAsPassword) {
                var textLength = text.length;
                var asterisks = "";
                for (var i = 0; i < textLength; i++) {
                    asterisks += "•";
                }
                text = asterisks;
            }
            var hasWidthSet = !lark.isNone(textFieldWidth);
            var font = this.getFontString();
            var lines = text.split(/(?:\r\n|\r|\n)/);
            var length = lines.length;
            var maxWidth = 0;
            var drawWidth = 0;
            var index;
            if (hasWidthSet && values[19 /* wordWrap */]) {
                for (var i = 0; i < length; i++) {
                    var line = lines[i];
                    var measureW = lark.TextMeasurer.measureText(line, font);
                    if (measureW > textFieldWidth) {
                        var newLine = "";
                        var lineWidth = 0;
                        var words = this.$splitWords(line);
                        var len = words.length;
                        for (var j = 0; j < len; j++) {
                            var word = words[j];
                            measureW = lark.TextMeasurer.measureText(word, font);
                            if (lineWidth + measureW > textFieldWidth) {
                                if (lineWidth === 0) {
                                    index = getMaxIndex(word, textFieldWidth, font);
                                    words.splice(j + 1, 0, word.substring(index));
                                    word = word.substring(0, index);
                                    measureW = lark.TextMeasurer.measureText(word, font);
                                    lines.splice(i, 0, word);
                                    measuredWidths[i] = measureW;
                                    len++;
                                    if (maxWidth < measureW) {
                                        maxWidth = measureW;
                                    }
                                    measureW = 0;
                                    word = "";
                                }
                                else {
                                    lines.splice(i, 0, newLine);
                                    measuredWidths[i] = lineWidth;
                                    if (maxWidth < lineWidth) {
                                        maxWidth = lineWidth;
                                    }
                                    newLine = "";
                                    lineWidth = 0;
                                    if (measureW > textFieldWidth) {
                                        measureW = 0;
                                        word = "";
                                        j--;
                                    }
                                }
                                i++;
                                length++;
                            }
                            lineWidth += measureW;
                            newLine += word;
                        }
                        lines[i] = newLine;
                        measuredWidths[i] = lineWidth;
                    }
                    else {
                        measuredWidths[i] = measureW;
                        if (maxWidth < measureW) {
                            maxWidth = measureW;
                        }
                    }
                }
                drawWidth = Math.max(drawWidth, maxWidth);
            }
            else {
                for (i = 0; i < length; i++) {
                    line = lines[i];
                    measureW = lark.TextMeasurer.measureText(line, font);
                    if (hasWidthSet && measureW > textFieldWidth) {
                        index = getMaxIndex(line, textFieldWidth, font);
                        line = lines[i] = line.substring(0, index);
                        drawWidth = Math.max(drawWidth, lark.TextMeasurer.measureText(line, font));
                    }
                    measuredWidths[i] = measureW;
                    if (maxWidth < measureW) {
                        maxWidth = measureW;
                    }
                }
            }
            values[7 /* textDrawWidth */] = drawWidth;
            values[5 /* textWidth */] = Math.ceil(maxWidth);
            //由于Canvas不提供文本行高测量功能，这里以字号为默认行高测量，并在顶部和底部各留2像素边距防止文本截断。
            values[6 /* textHeight */] = Math.ceil(lines.length * (values[0 /* fontSize */] + values[1 /* lineSpacing */]) - values[1 /* lineSpacing */] + 4);
            this.textLines = lines;
            return lines;
        };
        p.$splitWords = function (line) {
            return line.split(/\b/);
        };
        return TextField;
    })(lark.DisplayObject);
    lark.TextField = TextField;
    /**
     * 返回不超过最大宽度的字符结束索引(不包括)。
     */
    function getMaxIndex(text, maxWidth, font) {
        var lineWidth = 0;
        var length = text.length;
        var index;
        for (var i = 0; i < length; i++) {
            var word = text.charAt(i);
            var measureW = lark.TextMeasurer.measureText(word, font);
            if (lineWidth + measureW > maxWidth) {
                index = i;
                break;
            }
            lineWidth += measureW;
        }
        return index == 0 ? 1 : index;
    }
    lark.registerClass(TextField, 18 /* TextField */);
})(lark || (lark = {}));
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        function toFontString(style) {
            var font = "";
            if (style.italic)
                font += "italic ";
            if (style.bold)
                font += "bold ";
            font += (style.fontSize || 12) + "px ";
            font += (style.fontFamily || "sans-serif");
            return font;
        }
        sys.toFontString = toFontString;
        function toColorString(value) {
            if (value < 0)
                value = 0;
            if (value > 16777215)
                value = 16777215;
            var color = value.toString(16).toUpperCase();
            while (color.length < 6) {
                color = "0" + color;
            }
            return "#" + color;
        }
        sys.toColorString = toColorString;
    })(sys = lark.sys || (lark.sys = {}));
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
    /**
     * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
     */
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        /**
         * 实例化一个容器
         */
        function Sprite() {
            _super.call(this);
            this.$children = [];
        }
        var d = __define,c=Sprite;p=c.prototype;
        p.$propagateFlagsDown = function (flags) {
            if (this.$hasFlags(flags)) {
                return;
            }
            this.$setFlags(flags);
            var children = this.$children;
            for (var i = 0; i < children.length; i++) {
                children[i].$propagateFlagsDown(flags);
            }
        };
        d(p, "numChildren",
            /**
             * 返回此对象的子项数目。
             */
            function () {
                return this.$children.length;
            },undefined
        );
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。子项将被添加到该 DisplayObjectContainer 实例中其他所有子项的前（上）面。
         * （要将某子项添加到特定索引位置，请使用 addChildAt() 方法。）
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        p.addChild = function (child) {
            var index = this.$children.length;
            if (child.$parent == this)
                index--;
            return this.doAddChild(child, index);
        };
        /**
         * 将一个 DisplayObject 子实例添加到该 DisplayObjectContainer 实例中。该子项将被添加到指定的索引位置。
         * 索引为 0 表示该 DisplayObjectContainer 对象的显示列表的后（底）部。
         * @param child 要作为该 DisplayObjectContainer 实例的子项添加的 DisplayObject 实例。
         * @param index 添加该子项的索引位置。 如果指定当前占用的索引位置，则该位置以及所有更高位置上的子对象会在子级列表中上移一个位置。
         * 当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        p.addChildAt = function (child, index) {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length;
                if (child.$parent === this) {
                    index--;
                }
            }
            return this.doAddChild(child, index);
        };
        p.doAddChild = function (child, index) {
            if (DEBUG) {
                if (child == this) {
                    lark.$error(1005);
                }
                else if (lark.is(child, 4 /* DisplayObjectContainer */) && child.contains(this)) {
                    lark.$error(1004);
                }
            }
            var host = child.$parent;
            if (host == this) {
                this.doSetChildIndex(child, index);
                return child;
            }
            if (host) {
                host.removeChild(child);
            }
            this.$children.splice(index, 0, child);
            child.$setParent(this);
            var stage = this.$stage;
            if (stage) {
                child.$onAddToStage(stage, this.$nestLevel + 1);
            }
            child.emitWith(lark.Event.ADDED, true);
            if (stage) {
                var list = Sprite.$EVENT_ADD_TO_STAGE_LIST;
                while (list.length) {
                    var childAddToStage = list.shift();
                    if (childAddToStage.$stage) {
                        childAddToStage.emitWith(lark.Event.ADDED_TO_STAGE);
                    }
                }
            }
            var displayList = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(child, displayList, displayList);
            child.$propagateFlagsDown(624 /* DownOnAddedOrRemoved */);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
            this.$childAdded(child, index);
            return child;
        };
        /**
         * 确定指定显示对象是 DisplayObjectContainer 实例的子项还是该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。
         * 孙项、曾孙项等，每项都返回 true。
         * @param child 要测试的子对象。
         * @returns 如果指定的显示对象为 DisplayObjectContainer 该实例本身，则返回true，如果指定的显示对象为当前实例子项，则返回false。
         */
        p.contains = function (child) {
            while (child) {
                if (child == this) {
                    return true;
                }
                child = child.$parent;
            }
            return false;
        };
        /**
         * 返回位于指定索引处的子显示对象实例。
         * @param index 子对象的索引位置。
         * @returns 位于指定索引位置处的子显示对象。
         */
        p.getChildAt = function (index) {
            index = +index | 0;
            if (index >= 0 && index < this.$children.length) {
                return this.$children[index];
            }
            else {
                DEBUG && lark.$error(1007);
                return null;
            }
        };
        /**
         * 返回 DisplayObject 的 child 实例的索引位置。
         * @returns 要标识的子显示对象的索引位置。
         */
        p.getChildIndex = function (child) {
            return this.$children.indexOf(child);
        };
        /**
         * 返回具有指定名称的子显示对象。
         * @param name 要返回的子项的名称。
         * @returns 具有指定名称的子显示对象。
         */
        p.getChildByName = function (name) {
            var children = this.$children;
            var length = children.length;
            var displayObject;
            for (var i = 0; i < length; i++) {
                displayObject = children[i];
                if (displayObject.name == name) {
                    return displayObject;
                }
            }
            return null;
        };
        /**
         * 将一个 DisplayObject 子实例从 DisplayObjectContainer 实例中移除。
         * @param child 要删除的 DisplayObject 实例。
         * @returns 在 child 参数中传递的 DisplayObject 实例。
         */
        p.removeChild = function (child) {
            var index = this.$children.indexOf(child);
            if (index >= 0) {
                return this.doRemoveChild(index);
            }
            else {
                DEBUG && lark.$error(1006);
                return null;
            }
        };
        /**
         * 从 DisplayObjectContainer 的子列表中指定的 index 位置删除子 DisplayObject。
         * @param index 要删除的 DisplayObject 的子索引。
         * @returns 已删除的 DisplayObject 实例。
         */
        p.removeChildAt = function (index) {
            index = +index | 0;
            if (index >= 0 && index < this.$children.length) {
                return this.doRemoveChild(index);
            }
            else {
                DEBUG && lark.$error(1007);
                return null;
            }
        };
        p.doRemoveChild = function (index) {
            index = +index | 0;
            var children = this.$children;
            var child = children[index];
            this.$childRemoved(child, index);
            child.emitWith(lark.Event.REMOVED, true);
            if (this.$stage) {
                child.$onRemoveFromStage();
                var list = Sprite.$EVENT_REMOVE_FROM_STAGE_LIST;
                while (list.length > 0) {
                    var childAddToStage = list.shift();
                    childAddToStage.emitWith(lark.Event.REMOVED_FROM_STAGE);
                    childAddToStage.$stage = null;
                }
            }
            var displayList = this.$displayList || this.$parentDisplayList;
            this.assignParentDisplayList(child, displayList, displayList);
            child.$propagateFlagsDown(624 /* DownOnAddedOrRemoved */);
            child.$setParent(null);
            children.splice(index, 1);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
            return child;
        };
        /**
         * 更改现有子项在显示对象容器中的位置。这会影响子对象的分层。
         * @param child 要为其更改索引编号的 DisplayObject 子实例。
         * @param index 生成的 child 显示对象的索引编号。当新的索引编号小于0或大于已有子元件数量时，新加入的DisplayObject对象将会放置于最上层。
         */
        p.setChildIndex = function (child, index) {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length - 1;
            }
            this.doSetChildIndex(child, index);
        };
        p.doSetChildIndex = function (child, index) {
            var lastIndex = this.$children.indexOf(child);
            if (lastIndex < 0) {
                DEBUG && lark.$error(1006);
            }
            if (lastIndex == index) {
                return;
            }
            this.$childRemoved(child, lastIndex);
            //从原来的位置删除
            this.$children.splice(lastIndex, 1);
            //放到新的位置
            this.$children.splice(index, 0, child);
            this.$childAdded(child, index);
            child.$invalidateTransform();
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * 在子级列表中两个指定的索引位置，交换子对象的 Z 轴顺序（前后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param index1 第一个子对象的索引位置。
         * @param index2 第二个子对象的索引位置。
         */
        p.swapChildrenAt = function (index1, index2) {
            index1 = +index1 | 0;
            index2 = +index2 | 0;
            if (index1 >= 0 && index1 < this.$children.length && index2 >= 0 && index2 < this.$children.length) {
                this.doSwapChildrenAt(index1, index2);
            }
            else {
                DEBUG && lark.$error(1007);
            }
        };
        /**
         * 交换两个指定子对象的 Z 轴顺序（从前到后顺序）。显示对象容器中所有其他子对象的索引位置保持不变。
         * @param child1 第一个子对象。
         * @param child2 第二个子对象。
         */
        p.swapChildren = function (child1, child2) {
            var index1 = this.$children.indexOf(child1);
            var index2 = this.$children.indexOf(child2);
            if (index1 == -1 || index2 == -1) {
                DEBUG && lark.$error(1006);
            }
            else {
                this.doSwapChildrenAt(index1, index2);
            }
        };
        p.doSwapChildrenAt = function (index1, index2) {
            if (index1 > index2) {
                var temp = index2;
                index2 = index1;
                index1 = temp;
            }
            else if (index1 === index2) {
                return;
            }
            var list = this.$children;
            var child1 = list[index1];
            var child2 = list[index2];
            this.$childRemoved(child1, index1);
            this.$childRemoved(child2, index2);
            list[index1] = child2;
            list[index2] = child1;
            this.$childAdded(child2, index1);
            this.$childAdded(child1, index2);
            child1.$invalidateTransform();
            child2.$invalidateTransform();
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * 从 DisplayObjectContainer 实例的子级列表中删除所有 child DisplayObject 实例。
         */
        p.removeChildren = function () {
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.doRemoveChild(i);
            }
        };
        /**
         * 一个子项被添加到容器内，此方法不仅在操作addChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        p.$childAdded = function (child, index) {
        };
        /**
         * 一个子项从容器内移除，此方法不仅在操作removeChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        p.$childRemoved = function (child, index) {
        };
        p.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var children = this.$children;
            var length = children.length;
            nestLevel++;
            for (var i = 0; i < length; i++) {
                var child = this.$children[i];
                child.$onAddToStage(stage, nestLevel);
            }
        };
        p.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var children = this.$children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var child = children[i];
                child.$onRemoveFromStage();
            }
        };
        p.$measureChildBounds = function (bounds) {
            var children = this.$children;
            var length = children.length;
            if (length === 0) {
                return;
            }
            var xMin = 0, xMax = 0, yMin = 0, yMax = 0;
            var found = false;
            for (var i = -1; i < length; i++) {
                var childBounds = i === -1 ? bounds : children[i].$getTransformedBounds(this, lark.$TempRectangle);
                if (childBounds.isEmpty()) {
                    continue;
                }
                if (found) {
                    xMin = Math.min(xMin, childBounds.x);
                    xMax = Math.max(xMax, childBounds.x + childBounds.width);
                    yMin = Math.min(yMin, childBounds.y);
                    yMax = Math.max(yMax, childBounds.y + childBounds.height);
                }
                else {
                    found = true;
                    xMin = childBounds.x;
                    xMax = xMin + childBounds.width;
                    yMin = childBounds.y;
                    yMax = yMin + childBounds.height;
                }
            }
            bounds.setTo(xMin, yMin, xMax - xMin, yMax - yMin);
        };
        d(p, "touchChildren",
            /**
             * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
             * 默认值为 true 即可以接收。
             */
            function () {
                return this.$hasFlags(2048 /* TouchChildren */);
            },
            function (value) {
                this.$setTouchChildren(value);
            }
        );
        p.$setTouchChildren = function (value) {
            this.$toggleFlags(2048 /* TouchChildren */, !!value);
        };
        /**
         * 标记此显示对象需要重绘。此方法会触发自身的cacheAsBitmap重绘。如果只是矩阵改变，自身显示内容并不改变，应该调用$invalidateTransform().
         * @param notiryChildren 是否标记子项也需要重绘。传入false或不传入，将只标记自身需要重绘。通常只有alpha属性改变会需要通知子项重绘。
         */
        p.$invalidate = function (notifyChildren) {
            _super.prototype.$invalidate.call(this, notifyChildren);
            if (!notifyChildren) {
                return;
            }
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.markChildDirty(children[i], cacheRoot);
                }
            }
        };
        /**
         * 标记自身以及所有子项在父级中变换叠加的显示内容失效。此方法不会触发自身的cacheAsBitmap重绘。
         * 通常用于矩阵改变或从显示列表添加和移除时。若自身的显示内容已经改变需要重绘，应该调用$invalidate()。
         */
        p.$invalidateTransform = function () {
            this.markChildDirty(this, this.$parentDisplayList);
        };
        p.markChildDirty = function (child, parentCache) {
            if (child.$hasFlags(512 /* DirtyChildren */)) {
                return;
            }
            child.$setFlags(512 /* DirtyChildren */);
            var displayList = child.$displayList;
            if ((displayList || child.$renderRegion) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.markChildDirty(children[i], parentCache);
                }
            }
        };
        /**
         * cacheAsBitmap属性改变
         */
        p.$cacheAsBitmapChanged = function () {
            _super.prototype.$cacheAsBitmapChanged.call(this);
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.assignParentDisplayList(children[i], cacheRoot, cacheRoot);
            }
        };
        p.assignParentDisplayList = function (child, parentCache, newParent) {
            child.$parentDisplayList = newParent;
            child.$setFlags(512 /* DirtyChildren */);
            var displayList = child.$displayList;
            if ((child.$renderRegion || displayList) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (child.$displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.assignParentDisplayList(children[i], parentCache, newParent);
                }
            }
        };
        p.$hitTest = function (stageX, stageY, shapeFlag) {
            if (!this.$visible) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            if (this.$scrollRect && !this.$scrollRect.contains(localX, localY)) {
                return null;
            }
            if (!this.$getOriginalBounds().contains(localX, localY)) {
                return null;
            }
            if (this.$mask && !this.$mask.$hitTest(stageX, stageY, true)) {
                return null;
            }
            var children = this.$children;
            var found = false;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                var target = child.$hitTest(stageX, stageY, shapeFlag);
                if (target) {
                    found = true;
                    if (target.$hasFlags(1024 /* TouchEnabled */)) {
                        break;
                    }
                    else {
                        target = null;
                    }
                }
            }
            if (target) {
                if (this.$hasFlags(2048 /* TouchChildren */)) {
                    return target;
                }
                return this;
            }
            if (found) {
                return this;
            }
            return _super.prototype.$hitTest.call(this, stageX, stageY, shapeFlag);
        };
        Sprite.$EVENT_ADD_TO_STAGE_LIST = [];
        Sprite.$EVENT_REMOVE_FROM_STAGE_LIST = [];
        return Sprite;
    })(lark.DisplayObject);
    lark.Sprite = Sprite;
    lark.registerClass(Sprite, 5 /* Sprite */, [4 /* DisplayObjectContainer */]);
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
    /**
     * TextInput 用于创建显示对象来输入文本. 默认为单行文本，当需要使用多行文本时，请设置 multiLine 为 true
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        function TextInput() {
            _super.call(this);
            this._isTyping = false;
            this._isFocus = false;
            this.timeoutId = -1;
            this.$TextField[19 /* wordWrap */] = false;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.handleTouchBegin, this);
        }
        var d = __define,c=TextInput;p=c.prototype;
        d(p, "displayAsPassword",
            /**
             * 一个布尔值，表示是否显示为一个密码输入框
             * @returns {boolean}
             */
            function () {
                return this.$TextField[20 /* displayAsPassword */];
            },
            function (value) {
                if (this.$TextField[20 /* displayAsPassword */] == value)
                    return;
                this.$TextField[20 /* displayAsPassword */] = value;
                if (value)
                    this.wordWrap = false;
                this.$invalidateContentBounds();
            }
        );
        d(p, "maxChars",
            /**
             * 设置或获取TextInput的最大输入长度，这个属性只限制用户输入的字符长度
             * 通过 text 属性可以设置比 maxChars 更长的字符串
             * @returns {number}
             */
            function () {
                return this.$TextField[21 /* maxChars */];
            },
            function (value) {
                var values = this.$TextField;
                if (values[21 /* maxChars */] == value)
                    return;
                values[21 /* maxChars */] = value;
                this.updateTextAdapter();
            }
        );
        p.handleTouchBegin = function (e) {
            if (this._isFocus)
                return;
            this._isFocus = true;
            this.setAsCurrent();
        };
        p.setAsCurrent = function () {
            var layer = lark.sys.$getTextAdapter(this);
            layer.$setCurrentTextInput(this);
        };
        /**
         * Call by TextAdapter set text
         * @param text
         */
        p.$setUserInputText = function (text) {
            if (text == this.text)
                return;
            this.text = text;
            this.emitWith(lark.TextInputEvent.INPUT);
        };
        p.$startInput = function () {
            this._isTyping = true;
            this.$invalidateContentBounds();
            this.emitWith(lark.TextInputEvent.FOCUS);
        };
        p.$endInput = function () {
            this._isTyping = false;
            this._isFocus = false;
            this.$invalidateContentBounds();
            this.emitWith(lark.TextInputEvent.BLUR);
            this.emitWith(lark.TextInputEvent.CHANGE);
        };
        p.$setX = function (value) {
            this.updateTextAdapter();
            return _super.prototype.$setX.call(this, value);
        };
        p.$setY = function (value) {
            this.updateTextAdapter();
            return _super.prototype.$setY.call(this, value);
        };
        p.$measureContentBounds = function (bounds) {
            _super.prototype.$measureContentBounds.call(this, bounds);
            this.updateTextAdapter();
        };
        p.$render = function (context) {
            if (this._isTyping) {
                return;
            }
            _super.prototype.$render.call(this, context);
        };
        p.updateTextAdapter = function () {
            var _this = this;
            if (!this._isFocus) {
                return;
            }
            if (this.timeoutId != -1)
                clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(function () {
                var layer = lark.sys.$getTextAdapter(_this);
                layer.$initializeInput();
                _this.timeoutId = -1;
            }, 0);
        };
        p.$splitWords = function (line) {
            var words = new Array(line.length);
            for (var i = 0; i < line.length; i++)
                words[i] = line.charAt(i);
            return words;
        };
        return TextInput;
    })(lark.TextField);
    lark.TextInput = TextInput;
    lark.registerClass(TextInput, 21 /* TextInput */);
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
    /**
     * Stage 类代表主绘图区，表示显示 Lark 内容的整个区域。
     * 可以利用 DisplayObject 实例的 stage 属性进行访问。
     * Stage 类具有多个祖代类 -- DisplayObjectContainer、DisplayObject 和 EventDispatcher，属性和方法便是从这些类继承而来的。
     * 从这些继承的许多属性和方法不适用于 Stage 对象。
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        /**
         * 舞台对象不允许自行实例化。
         */
        function Stage() {
            _super.call(this);
            this.$stageWidth = 0;
            this.$stageHeight = 0;
            this.implMap = {};
            this.$stage = this;
            this.$nestLevel = 1;
        }
        var d = __define,c=Stage;p=c.prototype;
        d(p, "frameRate",
            /**
             * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。
             * 注意，若同一个网页中包含多个lark.Stage实例，修改任何一个Stage的frameRate属性都会同步修改其他Stage的帧率。
             */
            function () {
                return lark.sys.$ticker.$frameRate;
            },
            function (value) {
                lark.sys.$ticker.$setFrameRate(value);
            }
        );
        d(p, "stageWidth",
            /**
             * 舞台的当前宽度（以像素为单位）。
             */
            function () {
                return this.$stageWidth;
            },undefined
        );
        d(p, "stageHeight",
            /**
             * 舞台的当前高度（以像素为单位）。
             */
            function () {
                return this.$stageHeight;
            },undefined
        );
        /**
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
         * 每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 invalidate() 方法。
         */
        p.invalidate = function () {
            lark.sys.$invalidateRenderFlag = true;
        };
        /**
         * 注册一个接口实现。Lark框架内预留了多个可由项目高度定制化的功能接口，使用此方法能够将项目中针对某接口的具体实现实例注入到框架中使用。
         * @param interfaceName 注入的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @param instance 实现此接口的实例。
         */
        p.registerImplementation = function (interfaceName, instance) {
            this.implMap[interfaceName] = instance;
        };
        /**
         * 获取一个接口实现。此方法通常由框架内部调用。获取项目注入的自定义实现实例。
         * @param interfaceName 要获取的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @returns 返回实现此接口的实例。
         */
        p.getImplementation = function (interfaceName) {
            return this.implMap[interfaceName];
        };
        return Stage;
    })(lark.Sprite);
    lark.Stage = Stage;
    if (DEBUG) {
        Object.defineProperty(Stage.prototype, "alpha", {
            get: function () {
                return 1;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "visible", {
            get: function () {
                return true;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "x", {
            get: function () {
                return 0;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "y", {
            get: function () {
                return 0;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "scaleX", {
            get: function () {
                return 1;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "scaleY", {
            get: function () {
                return 1;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "rotation", {
            get: function () {
                return 0;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "cacheAsBitmap", {
            get: function () {
                return false;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "scrollRect", {
            get: function () {
                return null;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "filters", {
            get: function () {
                return null;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "blendMode", {
            get: function () {
                return null;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "matrix", {
            get: function () {
                return this.$getMatrix();
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Stage.prototype, "touchEnabled", {
            get: function () {
                return true;
            },
            set: function (value) {
                lark.$error(1009);
            },
            enumerable: true,
            configurable: true
        });
    }
    lark.registerClass(Stage, 10 /* Stage */);
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
    var sys;
    (function (sys) {
        /**
         * Lark播放器
         */
        var Player = (function (_super) {
            __extends(Player, _super);
            /**
             * 实例化一个播放器对象。
             */
            function Player(context, stage, entryClassName) {
                _super.call(this);
                this.isPlaying = false;
                if (DEBUG && !context) {
                    lark.$error(1003, "context");
                }
                this.entryClassName = entryClassName;
                this.stage = stage;
                this.screenDisplayList = this.createDisplayList(stage, context);
                if (DEBUG) {
                    this.showFPS = false;
                    this.showLog = false;
                    this._showPaintRect = false;
                    this.stageDisplayList = null;
                    this.paintList = [];
                    this.displayFPS = displayFPS;
                    this.showPaintRect = showPaintRect;
                    this.drawPaintRect = drawPaintRect;
                    this.drawDirtyRect = drawDirtyRect;
                }
            }
            var d = __define,c=Player;p=c.prototype;
            p.createDisplayList = function (stage, context) {
                var displayList = new sys.DisplayList(stage);
                displayList.renderContext = context;
                stage.$displayList = displayList;
                return displayList;
            };
            /**
             * 启动播放器
             */
            p.start = function () {
                if (this.isPlaying || !this.stage) {
                    return;
                }
                this.isPlaying = true;
                if (!this.root) {
                    this.initialize();
                }
                sys.$ticker.$addPlayer(this);
            };
            p.initialize = function () {
                var rootClass;
                if (this.entryClassName) {
                    rootClass = lark.getDefinitionByName(this.entryClassName);
                }
                if (rootClass) {
                    var rootContainer = new rootClass();
                    this.root = rootContainer;
                    if (lark.is(rootContainer, 3 /* DisplayObject */)) {
                        this.stage.addChild(rootContainer);
                    }
                    else {
                        DEBUG && lark.$error(1002, this.entryClassName);
                    }
                }
                else {
                    DEBUG && lark.$error(1001, this.entryClassName);
                }
            };
            /**
             * 停止播放器，停止后将不能重新启动。
             */
            p.stop = function () {
                this.pause();
                this.stage = null;
            };
            /**
             * 暂停播放器，后续可以通过调用start()重新启动播放器。
             */
            p.pause = function () {
                if (!this.isPlaying) {
                    return;
                }
                this.isPlaying = false;
                sys.$ticker.$removePlayer(this);
            };
            /**
             * 渲染屏幕
             */
            p.$render = function (triggerByFrame) {
                if (DEBUG && (this.showFPS || this.showLog)) {
                    this.stage.addChild(this.fpsDisplay);
                }
                var stage = this.stage;
                var t = lark.getTimer();
                var dirtyList = stage.$displayList.updateDirtyRegions();
                var t1 = lark.getTimer();
                var drawCalls = 0;
                if (dirtyList.length > 0) {
                    dirtyList = dirtyList.concat();
                    drawCalls = stage.$displayList.drawToSurface();
                }
                if (DEBUG) {
                    if (this._showPaintRect) {
                        this.drawPaintRect(dirtyList);
                    }
                    var t2 = lark.getTimer();
                    if (triggerByFrame && this.showFPS) {
                        var dirtyRatio = 0;
                        if (drawCalls > 0) {
                            var length = dirtyList.length;
                            var dirtyArea = 0;
                            for (var i = 0; i < length; i++) {
                                dirtyArea += dirtyList[i].area;
                            }
                            dirtyRatio = Math.ceil(dirtyArea * 1000 / (stage.stageWidth * stage.stageHeight)) / 10;
                        }
                        this.fpsDisplay.update(drawCalls, dirtyRatio, t1 - t, t2 - t1);
                    }
                }
            };
            /**
             * 更新舞台尺寸
             * @param stageWidth 舞台宽度（以像素为单位）
             * @param stageHeight 舞台高度（以像素为单位）
             */
            p.updateStageSize = function (stageWidth, stageHeight) {
                var stage = this.stage;
                if (stageWidth !== stage.$stageWidth || stageHeight !== stage.$stageHeight) {
                    stage.$stageWidth = stageWidth;
                    stage.$stageHeight = stageHeight;
                    this.screenDisplayList.setClipRect(stageWidth, stageHeight);
                    if (DEBUG && this.stageDisplayList) {
                        this.stageDisplayList.setClipRect(stageWidth, stageHeight);
                    }
                    stage.emitWith(lark.Event.RESIZE);
                }
            };
            return Player;
        })(lark.LarkObject);
        sys.Player = Player;
        sys.$logToFPS;
        if (DEBUG) {
            var infoLines = [];
            var fpsDisplay;
            sys.$logToFPS = function (info) {
                if (!fpsDisplay) {
                    infoLines.push(info);
                    return;
                }
                fpsDisplay.updateInfo(info);
            };
            function displayFPS(showFPS, showLog, logFilter) {
                showLog = !!showLog;
                this.showFPS = !!showFPS;
                this.showLog = showLog;
                if (!this.fpsDisplay) {
                    fpsDisplay = this.fpsDisplay = new FPS(this.stage, showFPS, showLog, logFilter);
                    var length = infoLines.length;
                    for (var i = 0; i < length; i++) {
                        fpsDisplay.updateInfo(infoLines[i]);
                    }
                    infoLines = null;
                }
            }
            function showPaintRect(value) {
                value = !!value;
                if (this._showPaintRect === value) {
                    return;
                }
                this._showPaintRect = value;
                if (value) {
                    if (!this.stageDisplayList) {
                        this.stageDisplayList = sys.DisplayList.create(this.stage);
                    }
                    this.stage.$displayList = this.stageDisplayList;
                }
                else {
                    this.stage.$displayList = this.screenDisplayList;
                }
            }
            function drawPaintRect(dirtyList) {
                var length = dirtyList.length;
                var list = [];
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    list[i] = [region.minX, region.minY, region.width, region.height];
                    region.width -= 1;
                    region.height -= 1;
                }
                var repaintList = this.paintList;
                repaintList.push(list);
                if (repaintList.length > 20) {
                    repaintList.shift();
                }
                var context = this.screenDisplayList.renderContext;
                context.setTransform(1, 0, 0, 1, 0, 0);
                context.clearRect(0, 0, context.surface.width, context.surface.height);
                context.drawImage(this.stageDisplayList.surface, 0, 0);
                length = repaintList.length;
                for (i = 0; i < length; i++) {
                    list = repaintList[i];
                    for (var j = list.length - 1; j >= 0; j--) {
                        var r = list[j];
                        this.drawDirtyRect(r[0], r[1], r[2], r[3], context);
                    }
                }
                context.save();
                context.beginPath();
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    context.clearRect(region.minX, region.minY, region.width, region.height);
                    context.rect(region.minX, region.minY, region.width, region.height);
                }
                context.clip();
                context.drawImage(this.stageDisplayList.surface, 0, 0);
                context.restore();
            }
            /**
             * 绘制一个脏矩形显示区域，在显示重绘区功能开启时调用。
             */
            function drawDirtyRect(x, y, width, height, context) {
                context.strokeStyle = 'red';
                context.lineWidth = 1;
                context.strokeRect(x - 0.5, y - 0.5, width, height);
            }
            /**
             * FPS显示对象
             */
            FPS = (function (_super) {
                __extends(FPSImpl, _super);
                function FPSImpl(stage, showFPS, showLog, logFilter) {
                    _super.call(this);
                    this["isFPS"] = true;
                    this.infoLines = [];
                    this.totalTime = 0;
                    this.totalTick = 0;
                    this.lastTime = 0;
                    this.drawCalls = 0;
                    this._stage = stage;
                    this.showFPS = showFPS;
                    this.showLog = showLog;
                    this.logFilter = logFilter;
                    this.touchChildren = false;
                    this.touchEnabled = false;
                    this.createDisplay();
                    try {
                        var logFilterRegExp = logFilter ? new RegExp(logFilter) : null;
                    }
                    catch (e) {
                        lark.log(e);
                    }
                    this.filter = function (message) {
                        if (logFilterRegExp)
                            return logFilterRegExp.test(message);
                        return !logFilter || message.indexOf(logFilter) == 0;
                    };
                }
                FPSImpl.prototype.createDisplay = function () {
                    this.shape = new lark.Shape();
                    this.addChild(this.shape);
                    var textField = new lark.TextField();
                    textField.fontSize = 24;
                    this.addChild(textField);
                    this.textField = textField;
                    textField.textColor = 0x00c200;
                    textField.fontFamily = "monospace";
                    textField.x = 10;
                    textField.y = 10;
                    var textField = new lark.TextField();
                    this.infoText = textField;
                    this.addChild(textField);
                    textField.textColor = 0xb0b0b0;
                    textField.fontFamily = "monospace";
                    textField.x = 10;
                    textField.fontSize = 12;
                    textField.y = 10;
                };
                FPSImpl.prototype.update = function (drawCalls, dirtyRatio) {
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    var current = lark.getTimer();
                    this.totalTime += current - this.lastTime;
                    this.lastTime = current;
                    this.totalTick++;
                    this.drawCalls = Math.max(drawCalls, this.drawCalls);
                    if (this.totalTime > 500) {
                        var lastFPS = Math.round(this.totalTick * 1000 / this.totalTime);
                        this.totalTick = 0;
                        this.totalTime = 0;
                        var text = "FPS: " + lastFPS + "\nDraw: " + this.drawCalls + "," + dirtyRatio + "%\nCost: " + args.join(",");
                        if (this.textField.text != text) {
                            this.textField.text = text;
                            this.updateLayout();
                        }
                        this.drawCalls = 0;
                    }
                };
                /**
                 * 插入一条日志信息
                 */
                FPSImpl.prototype.updateInfo = function (info) {
                    if (!this.showLog) {
                        return;
                    }
                    if (!this.filter(info)) {
                        return;
                    }
                    var lines = this.infoLines;
                    if (info) {
                        lines.push(info);
                    }
                    this.infoText.width = lark.NONE;
                    this.infoText.text = lines.join("\n");
                    if (this._stage.stageHeight > 0) {
                        if (this.infoText.textWidth > this._stage.stageWidth - 20) {
                            this.infoText.width = this._stage.stageWidth - 20;
                        }
                        while (this.infoText.textHeight > this._stage.stageHeight - 20) {
                            lines.shift();
                            this.infoText.text = lines.join("\n");
                        }
                    }
                    this.updateLayout();
                };
                FPSImpl.prototype.updateLayout = function () {
                    if (this.showFPS) {
                        this.infoText.y = this.textField.height + 20;
                    }
                    var g = this.shape.$graphics;
                    g.clear();
                    g.fillStyle = "rgba(68,68,68,0.4)";
                    g.fillRect(0, 0, Math.max(160, this.width + 20), this.height + 20);
                };
                return FPSImpl;
            })(lark.Sprite);
        }
    })(sys = lark.sys || (lark.sys = {}));
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
