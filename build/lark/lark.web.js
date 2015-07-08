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
        var winURL = window["URL"] || window["webkitURL"];
        var useXHR = winURL && lark.Capabilities.os == "iOS";
        /**
         * @private
         * ImageLoader 类可用于加载图像（JPG、PNG 或 GIF）文件。使用 load() 方法来启动加载。被加载的图像对象数据将存储在 ImageLoader.data 属性上 。
         */
        var WebImageLoader = (function (_super) {
            __extends(WebImageLoader, _super);
            function WebImageLoader() {
                var _this = this;
                _super.apply(this, arguments);
                /**
                 * @private
                 * 使用 load() 方法加载成功的 BitmapData 图像数据。
                 */
                this.data = null;
                /**
                 * @private
                 * 当从其他站点加载一个图片时，指定是否启用跨域资源共享(CORS)，默认值为null。
                 * 可以设置为"anonymous","use-credentials"或null,设置为其他值将等同于"anonymous"。
                 */
                this.crossOrigin = null;
                /**
                 * @private
                 */
                this.currentImage = null;
                /**
                 * @private
                 */
                this.request = null;
                /**
                 * @private
                 */
                this.onImageComplete = function (event) {
                    var image = _this.getImage(event);
                    if (!image) {
                        return;
                    }
                    _this.data = web.toBitmapData(image);
                    _this.emitWith(lark.Event.COMPLETE);
                };
                /**
                 * @private
                 */
                this.onLoadError = function (event) {
                    var image = _this.getImage(event);
                    if (!image) {
                        return;
                    }
                    if (DEBUG && !_this.hasListener(lark.Event.IO_ERROR)) {
                        lark.$error(1011, image.src);
                    }
                    _this.emitWith(lark.Event.IO_ERROR);
                };
            }
            var d = __define,c=WebImageLoader;p=c.prototype;
            /**
             * @private
             * 启动一次图像加载。注意：若之前已经调用过加载请求，重新调用 load() 将终止先前的请求，并开始新的加载。
             * @param url 要加载的图像文件的地址。
             */
            p.load = function (url) {
                if (useXHR && url.indexOf("data:") != 0) {
                    var request = this.request;
                    if (!request) {
                        request = this.request = new lark.web.WebHttpRequest();
                        request.on(lark.Event.COMPLETE, this.onBlobLoaded, this);
                        request.on(lark.Event.IO_ERROR, this.onBlobError, this);
                        request.responseType = "blob";
                    }
                    if (DEBUG) {
                        this.currentURL = url;
                    }
                    request.open(url);
                    request.send();
                }
                else {
                    this.loadImage(url);
                }
            };
            /**
             * @private
             */
            p.onBlobLoaded = function (event) {
                var blob = this.request.response;
                this.loadImage(winURL.createObjectURL(blob));
            };
            /**
             * @private
             */
            p.onBlobError = function (event) {
                if (DEBUG && !this.hasListener(lark.Event.IO_ERROR)) {
                    lark.$error(1011, this.currentURL);
                }
                this.emitWith(lark.Event.IO_ERROR);
            };
            /**
             * @private
             */
            p.loadImage = function (src) {
                var image = new Image();
                this.data = null;
                this.currentImage = image;
                if (this.crossOrigin) {
                    image.crossOrigin = this.crossOrigin;
                }
                image.onload = this.onImageComplete;
                image.onerror = this.onLoadError;
                image.src = src;
            };
            /**
             * @private
             */
            p.getImage = function (event) {
                var image = event.target;
                if (useXHR) {
                    winURL.revokeObjectURL(image.src);
                }
                image.onerror = null;
                image.onload = null;
                if (this.currentImage !== image) {
                    return null;
                }
                this.currentImage = null;
                return image;
            };
            return WebImageLoader;
        })(lark.EventEmitter);
        web.WebImageLoader = WebImageLoader;
        lark.registerClass(WebImageLoader,"lark.web.WebImageLoader",["lark.ImageLoader"]);
        lark.ImageLoader = WebImageLoader;
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
         */
        var WebHttpRequest = (function (_super) {
            __extends(WebHttpRequest, _super);
            /**
             * @private
             */
            function WebHttpRequest() {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this._url = "";
                /**
                 * @private
                 */
                this.onReadyStateChange = function () {
                    var xhr = _this._xhr;
                    if (xhr.readyState == 4) {
                        if (xhr.status >= 400 || xhr.status == 0) {
                            if (DEBUG && !_this.hasListener(lark.Event.IO_ERROR)) {
                                lark.$error(1011, _this._url);
                            }
                            _this.emitWith(lark.Event.IO_ERROR);
                        }
                        else {
                            _this.emitWith(lark.Event.COMPLETE);
                        }
                    }
                };
                /**
                 * @private
                 */
                this.updateProgress = function (event) {
                    if (event.lengthComputable) {
                        lark.ProgressEvent.emitProgressEvent(_this, lark.ProgressEvent.PROGRESS, event.loaded, event.total);
                    }
                };
                this._xhr = new XMLHttpRequest();
                this._xhr.onreadystatechange = this.onReadyStateChange;
                this._xhr.onprogress = this.updateProgress;
            }
            var d = __define,c=WebHttpRequest;p=c.prototype;
            d(p, "response",
                /**
                 * @private
                 * 本次请求返回的数据，数据类型根据responseType设置的值确定。
                 */
                function () {
                    if (this._xhr.response)
                        return this._xhr.response;
                    if (this._xhr.responseXML)
                        return this._xhr.responseXML;
                    if (this._xhr.responseText)
                        return this._xhr.responseText;
                    return null;
                },undefined
            );
            d(p, "responseType",
                /**
                 * @private
                 * 设置返回的数据格式，请使用 HttpResponseType 里定义的枚举值。设置非法的值或不设置，都将使用HttpResponseType.TEXT。
                 */
                function () {
                    return this._xhr.responseType;
                },
                function (value) {
                    this._xhr.responseType = value;
                }
            );
            d(p, "withCredentials",
                /**
                 * @private
                 * 表明在进行跨站(cross-site)的访问控制(Access-Control)请求时，是否使用认证信息(例如cookie或授权的header)。 默认为 false。(这个标志不会影响同站的请求)
                 */
                function () {
                    return this._xhr.withCredentials;
                },
                function (value) {
                    this._xhr.withCredentials = !!value;
                }
            );
            /**
             * @private
             * 初始化一个请求.注意，若在已经发出请求的对象上调用此方法，相当于立即调用abort().
             * @param url 该请求所要访问的URL该请求所要访问的URL
             * @param method 请求所使用的HTTP方法， 请使用 HttpMethod 定义的枚举值.
             */
            p.open = function (url, method) {
                if (method === void 0) { method = "GET"; }
                this._url = url;
                this._xhr.open(method, url, true);
            };
            /**
             * @private
             * 发送请求.
             * @param data 需要发送的数据
             */
            p.send = function (data) {
                this._xhr.send(data);
            };
            /**
             * @private
             * 如果请求已经被发送,则立刻中止请求.
             */
            p.abort = function () {
                this._xhr.abort();
            };
            /**
             * @private
             * 返回所有响应头信息(响应头名和值), 如果响应头还没接受,则返回"".
             */
            p.getAllResponseHeaders = function () {
                var result = this._xhr.getAllResponseHeaders();
                return result ? result : "";
            };
            /**
             * @private
             * 给指定的HTTP请求头赋值.在这之前,您必须确认已经调用 open() 方法打开了一个url.
             * @param header 将要被赋值的请求头名称.
             * @param value 给指定的请求头赋的值.
             */
            p.setRequestHeader = function (header, value) {
                this._xhr.setRequestHeader(header, value);
            };
            /**
             * @private
             * 返回指定的响应头的值, 如果响应头还没被接受,或该响应头不存在,则返回"".
             * @param header 要返回的响应头名称
             */
            p.getResponseHeader = function (header) {
                var result = this._xhr.getResponseHeader(header);
                return result ? result : "";
            };
            return WebHttpRequest;
        })(lark.EventEmitter);
        web.WebHttpRequest = WebHttpRequest;
        lark.registerClass(WebHttpRequest,"lark.web.WebHttpRequest",["lark.HttpRequest"]);
        lark.HttpRequest = WebHttpRequest;
        if (DEBUG) {
            lark.$markReadOnly(WebHttpRequest.prototype, "response");
        }
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
         */
        var WebCapability = (function () {
            function WebCapability() {
            }
            var d = __define,c=WebCapability;p=c.prototype;
            /**
             * @private
             * 检测系统属性
             */
            WebCapability.detect = function () {
                var capabilities = lark.Capabilities;
                var ua = navigator.userAgent.toLowerCase();
                capabilities.$isMobile = (ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
                if (capabilities.$isMobile) {
                    if (ua.indexOf("windows") < 0 && (ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("ipod") != -1)) {
                        capabilities.$os = "iOS";
                    }
                    else if (ua.indexOf("android") != -1 && ua.indexOf("linux") != -1) {
                        capabilities.$os = "Android";
                    }
                    else if (ua.indexOf("windows") != -1) {
                        capabilities.$os = "Windows Phone";
                    }
                }
                else {
                    if (ua.indexOf("windows nt") != -1) {
                        capabilities.$os = "Windows PC";
                    }
                    else if (ua.indexOf("mac os") != -1) {
                        capabilities.$os = "Mac OS";
                    }
                }
                var h5 = WebCapability.checkHtml5Support();
                capabilities.$hasGeolocation = h5.geo;
                capabilities.$hasMotion = h5.m;
                capabilities.$hasOrientation = h5.ortt;
                var language = (navigator.language || navigator.browserLanguage).toLowerCase();
                var strings = language.split("-");
                if (strings.length > 1) {
                    strings[1] = strings[1].toUpperCase();
                }
                capabilities.$language = strings.join("-");
            };
            /**
             * @private
             *
             */
            WebCapability.checkHtml5Support = function () {
                var webaudio = ('webkitAudioContext' in window) || ('AudioContext' in window);
                var geolocation = 'geolocation' in navigator;
                var orientation = 'DeviceOrientationEvent' in window;
                var motion = 'DeviceMotionEvent' in window;
                return {
                    geo: geolocation,
                    ortt: orientation,
                    m: motion
                };
            };
            return WebCapability;
        })();
        web.WebCapability = WebCapability;
        lark.registerClass(WebCapability,"lark.web.WebCapability");
        WebCapability.detect();
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
// There is no HTMLDivElement in webkit for air
if (window['HTMLVideoElement'] == undefined) {
    window['HTMLVideoElement'] = HTMLDivElement;
}
var lark;
(function (lark) {
    var web;
    (function (web) {
        var className = "lark.BitmapData";
        lark.registerClass(HTMLImageElement, className);
        lark.registerClass(HTMLCanvasElement, className);
        lark.registerClass(HTMLVideoElement, className);
        /**
         * @private
         * 转换 Image，Canvas，Video 为 Lark 框架内使用的 BitmapData 对象。
         */
        function toBitmapData(data) {
            data["hashCode"] = data["$hashCode"] = lark.$hashCount++;
            return data;
        }
        web.toBitmapData = toBitmapData;
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
         * XML节点基类
         */
        var XMLNode = (function () {
            /**
             * @private
             */
            function XMLNode(nodeType, parent) {
                this.nodeType = nodeType;
                this.parent = parent;
            }
            var d = __define,c=XMLNode;p=c.prototype;
            return XMLNode;
        })();
        web.XMLNode = XMLNode;
        lark.registerClass(XMLNode,"lark.web.XMLNode");
        /**
         * @private
         * XML节点对象
         */
        var XML = (function (_super) {
            __extends(XML, _super);
            /**
             * @private
             */
            function XML(localName, parent, prefix, namespace, name) {
                _super.call(this, 1, parent);
                /**
                 * @private
                 * 当前节点上的属性列表
                 */
                this.attributes = {};
                /**
                 * @private
                 * 当前节点的子节点列表
                 */
                this.children = [];
                this.localName = localName;
                this.prefix = prefix;
                this.namespace = namespace;
                this.name = name;
            }
            var d = __define,c=XML;p=c.prototype;
            return XML;
        })(XMLNode);
        web.XML = XML;
        lark.registerClass(XML,"lark.web.XML");
        /**
         * @private
         * XML文本节点
         */
        var XMLText = (function (_super) {
            __extends(XMLText, _super);
            /**
             * @private
             */
            function XMLText(text, parent) {
                _super.call(this, 3, parent);
                this.text = text;
            }
            var d = __define,c=XMLText;p=c.prototype;
            return XMLText;
        })(XMLNode);
        web.XMLText = XMLText;
        lark.registerClass(XMLText,"lark.web.XMLText");
        var parser = new DOMParser();
        /**
         * @private
         * 解析字符串为XML对象
         * @param text 要解析的字符串
         */
        function parse(text) {
            var xmlDoc = parser.parseFromString(text, "text/xml");
            var length = xmlDoc.childNodes.length;
            for (var i = 0; i < length; i++) {
                var node = xmlDoc.childNodes[i];
                if (node.nodeType === 1) {
                    return parseNode(node, null);
                }
            }
            return null;
        }
        /**
         * @private
         * 解析一个节点
         */
        function parseNode(node, parent) {
            if (node.localName == "parsererror") {
                throw new Error(node.textContent);
            }
            var xml = new XML(node.localName, parent, node.prefix, node.namespaceURI, node.nodeName);
            var nodeAttributes = node.attributes;
            var attributes = xml.attributes;
            var length = nodeAttributes.length;
            for (var i = 0; i < length; i++) {
                var attributeNode = nodeAttributes[i];
                var name = attributeNode.name;
                if (name.indexOf("xmlns:") === 0) {
                    continue;
                }
                attributes[name] = attributeNode.value;
            }
            var childNodes = node.childNodes;
            length = childNodes.length;
            var children = xml.children;
            for (i = 0; i < length; i++) {
                var childNode = childNodes[i];
                var nodeType = childNode.nodeType;
                var childXML = null;
                if (nodeType === 1) {
                    childXML = parseNode(childNode, xml);
                }
                else if (nodeType === 3) {
                    var text = childNode.textContent.trim();
                    if (text) {
                        childXML = new XMLText(text, xml);
                    }
                }
                if (childXML) {
                    children.push(childXML);
                }
            }
            return xml;
        }
        lark.XML = { parse: parse };
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
        var surfacePool = [];
        var isQQBrowser = navigator.userAgent.indexOf("QQBrowser") != -1;
        /**
         * @private
         */
        var CanvasFactory = (function () {
            /**
             * @private
             */
            function CanvasFactory() {
                lark.sys.sharedRenderContext = this.create().renderContext;
                for (var i = 0; i < 3; i++) {
                    surfacePool.push(this.create());
                }
            }
            var d = __define,c=CanvasFactory;p=c.prototype;
            /**
             * @private
             * 从对象池取出或创建一个新的Surface实例
             * @param useOnce 表示对取出实例的使用是一次性的，用完后立即会释放。
             */
            p.create = function (useOnce) {
                var surface = (useOnce || surfacePool.length > 3) ? surfacePool.pop() : null;
                if (!surface) {
                    var canvas = document.createElement("canvas");
                    if (isQQBrowser && !this.testCanvasValid(canvas)) {
                        lark.warn("failed to create canvas!");
                        return null;
                    }
                    surface = this.createSurface(canvas);
                }
                return surface;
            };
            /**
             * @private
             * 释放一个Surface实例
             * @param surface 要释放的Surface实例
             */
            p.release = function (surface) {
                if (!surface) {
                    return;
                }
                surface.width = surface.height = 1;
                surfacePool.push(surface);
            };
            /**
             * @private
             * 检测创建的canvas是否有效，QQ浏览器对硬件内存小等于1G的手机，限制Canvas创建的数量为19个。
             * 针对这个限制,同时满足以下两个条件就不会对显示造成任何影响：
             * 1.不要嵌套使用BlendMode，即使用了混合模式的容器内部不要再设置另一个子项的混合模式。
             * 2.不要嵌套使用遮罩，即遮罩对象或被遮罩对象的内部子项不要再设置另一个遮罩。
             * cacheAsBitmap功能已经自动对这个限制做了兼容，即使设置cacheAsBitmap为true，若Canvas数量不足，将会放弃缓存，以保证渲染显示正确。
             * 另外，如果要销毁一个开启过cacheAsBitmap的显示对象，在断开引用前建议显式将cacheAsBitmap置为false，这样可以回收一个Canvas对象。
             */
            p.testCanvasValid = function (canvas) {
                canvas.height = 1;
                canvas.width = 1;
                var data = canvas.toDataURL("image/png");
                if (data == 'data:,')
                    return false;
                return true;
            };
            /**
             * @private
             */
            p.createSurface = function (canvas) {
                var context = canvas.getContext("2d");
                canvas["renderContext"] = context;
                context["surface"] = canvas;
                web.toBitmapData(canvas);
                var drawImage = context.drawImage;
                context.drawImage = function (image, offsetX, offsetY, width, height, surfaceOffsetX, surfaceOffsetY, surfaceImageWidth, surfaceImageHeight) {
                    if (!image || image["width"] === 0 || image["height"] === 0) {
                        return;
                    }
                    drawImage.apply(context, arguments);
                };
                if (context["imageSmoothingEnabled"] === void 0) {
                    var keys = ["webkitImageSmoothingEnabled", "mozImageSmoothingEnabled", "msImageSmoothingEnabled"];
                    for (var i = keys.length - 1; i >= 0; i--) {
                        var key = keys[i];
                        if (context[key] !== void 0) {
                            break;
                        }
                    }
                    try {
                        Object.defineProperty(context, "imageSmoothingEnabled", {
                            get: function () {
                                return this[key];
                            },
                            set: function (value) {
                                this[key] = value;
                            }
                        });
                    }
                    catch (e) {
                        context["imageSmoothingEnabled"] = context[key];
                    }
                }
                return canvas;
            };
            return CanvasFactory;
        })();
        web.CanvasFactory = CanvasFactory;
        lark.registerClass(CanvasFactory,"lark.web.CanvasFactory",["lark.sys.SurfaceFactory"]);
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
         * Canvas屏幕适配器
         */
        var WebScreen = (function (_super) {
            __extends(WebScreen, _super);
            /**
             * @private
             * 创建一个WebScreen实例
             * @param container 播放器外层容器
             * @param scaleMode 舞台缩放模式
             * @param contentWidth 初始化内容宽度
             * @param contentHeight 初始化内容高度
             */
            function WebScreen(container, canvas, scaleMode, contentWidth, contentHeight, orientation) {
                _super.call(this);
                this.container = container;
                this.canvas = canvas;
                this.scaleMode = scaleMode;
                this.contentWidth = contentWidth;
                this.contentHeight = contentHeight;
                this.orientation = orientation;
                this.attachCanvas(container, canvas);
            }
            var d = __define,c=WebScreen;p=c.prototype;
            /**
             * @private
             * 添加canvas到container。
             */
            p.attachCanvas = function (container, canvas) {
                var style = canvas.style;
                style.cursor = "default";
                style.position = "absolute";
                style.top = "0";
                style.bottom = "0";
                style.left = "0";
                style.right = "0";
                container.appendChild(canvas);
                style = container.style;
                style.overflow = "hidden";
                style.position = "relative";
            };
            /**
             * @private
             * 更新播放器视口尺寸
             */
            p.updateScreenSize = function (player, webTouch, webText) {
                var canvas = this.canvas;
                if (canvas['userTyping'])
                    return;
                var screenRect = this.container.getBoundingClientRect();
                var shouldRotate = false;
                if (this.orientation != lark.sys.OrientationMode.NOT_SET) {
                    shouldRotate = this.orientation != lark.sys.OrientationMode.PORTRAIT && screenRect.height > screenRect.width || this.orientation == lark.sys.OrientationMode.PORTRAIT && screenRect.width > screenRect.height;
                }
                var screenWidth = shouldRotate ? screenRect.height : screenRect.width;
                var screenHeight = shouldRotate ? screenRect.width : screenRect.height;
                var stageSize = lark.sys.screenAdapter.calculateStageSize(this.scaleMode, screenWidth, screenHeight, this.contentWidth, this.contentHeight);
                var stageWidth = stageSize.stageWidth;
                var stageHeight = stageSize.stageHeight;
                var displayWidth = stageSize.displayWidth;
                var displayHeight = stageSize.displayHeight;
                if (canvas.width !== stageWidth) {
                    canvas.width = stageWidth;
                }
                if (canvas.height !== stageHeight) {
                    canvas.height = stageHeight;
                }
                canvas.style.width = displayWidth + "px";
                canvas.style.height = displayHeight + "px";
                canvas.style.top = (screenRect.height - displayHeight) / 2 + "px";
                canvas.style.left = (screenRect.width - displayWidth) / 2 + "px";
                var rotation = 0;
                if (shouldRotate) {
                    if (this.orientation == lark.sys.OrientationMode.LANDSCAPE)
                        rotation = 90;
                    else
                        rotation = -90;
                }
                var transform = "rotate(" + rotation + "deg)";
                canvas.style['webkitTransform'] = transform;
                canvas.style.transform = transform;
                player.updateStageSize(stageWidth, stageHeight);
                var scalex = displayWidth / stageWidth, scaley = displayHeight / stageHeight;
                webTouch.updateScaleMode(scalex, scaley, rotation);
                webText.updateScaleMode(scalex, scaley, (screenRect.width - displayWidth) / 2, (screenRect.height - displayHeight) / 2, displayWidth / 2, displayHeight / 2, rotation);
            };
            return WebScreen;
        })(lark.LarkObject);
        web.WebScreen = WebScreen;
        lark.registerClass(WebScreen,"lark.web.WebScreen");
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided this the following conditions are met:
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
         */
        var WebTouchHandler = (function (_super) {
            __extends(WebTouchHandler, _super);
            /**
             * @private
             */
            function WebTouchHandler(touch, canvas) {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.onTouchBegin = function (event) {
                    var location = _this.getLocation(event);
                    _this.touch.onTouchBegin(location.x, location.y, event.identifier);
                };
                /**
                 * @private
                 */
                this.onTouchMove = function (event) {
                    var location = _this.getLocation(event);
                    _this.touch.onTouchMove(location.x, location.y, event.identifier);
                };
                /**
                 * @private
                 */
                this.onTouchEnd = function (event) {
                    var location = _this.getLocation(event);
                    _this.touch.onTouchEnd(location.x, location.y, event.identifier);
                };
                /**
                 * @private
                 */
                this.scaleX = 1;
                /**
                 * @private
                 */
                this.scaleY = 1;
                /**
                 * @private
                 */
                this.rotation = 0;
                this.canvas = canvas;
                this.touch = touch;
                this.addListeners();
            }
            var d = __define,c=WebTouchHandler;p=c.prototype;
            /**
             * @private
             * 添加事件监听
             */
            p.addListeners = function () {
                var _this = this;
                if (window.navigator.msPointerEnabled) {
                    this.canvas.addEventListener("MSPointerDown", function (event) {
                        _this.onTouchBegin(event);
                        _this.prevent(event);
                    }, false);
                    this.canvas.addEventListener("MSPointerMove", function (event) {
                        _this.onTouchMove(event);
                        _this.prevent(event);
                    }, false);
                    this.canvas.addEventListener("MSPointerUp", function (event) {
                        _this.onTouchEnd(event);
                        _this.prevent(event);
                    }, false);
                }
                else {
                    if (!lark.Capabilities.$isMobile) {
                        this.addMouseListener();
                    }
                    this.addTouchListener();
                }
            };
            /**
             * @private
             *
             */
            p.addMouseListener = function () {
                this.canvas.addEventListener("mousedown", this.onTouchBegin);
                this.canvas.addEventListener("mousemove", this.onTouchMove);
                window.addEventListener("mouseup", this.onTouchEnd);
            };
            /**
             * @private
             *
             */
            p.addTouchListener = function () {
                var _this = this;
                this.canvas.addEventListener("touchstart", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        _this.onTouchBegin(event.changedTouches[i]);
                    }
                    _this.prevent(event);
                }, false);
                this.canvas.addEventListener("touchmove", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        _this.onTouchMove(event.changedTouches[i]);
                    }
                    _this.prevent(event);
                }, false);
                this.canvas.addEventListener("touchend", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        _this.onTouchEnd(event.changedTouches[i]);
                    }
                    _this.prevent(event);
                }, false);
                this.canvas.addEventListener("touchcancel", function (event) {
                    var l = event.changedTouches.length;
                    for (var i = 0; i < l; i++) {
                        _this.onTouchEnd(event.changedTouches[i]);
                    }
                    _this.prevent(event);
                }, false);
            };
            /**
             * @private
             */
            p.prevent = function (event) {
                event.stopPropagation();
                if (event["isScroll"] != true && !this.canvas['userTyping']) {
                    event.preventDefault();
                }
            };
            /**
             * @private
             */
            p.getLocation = function (event) {
                event.identifier = +event.identifier || 0;
                var doc = document.documentElement;
                var box = this.canvas.getBoundingClientRect();
                var left = box.left + window.pageXOffset - doc.clientLeft;
                var top = box.top + window.pageYOffset - doc.clientTop;
                var x = event.pageX - left, newx = x;
                var y = event.pageY - top, newy = y;
                if (this.rotation == 90) {
                    newx = y;
                    newy = box.width - x;
                }
                else if (this.rotation == -90) {
                    newx = box.height - y;
                    newy = x;
                }
                newx = newx / this.scaleX;
                newy = newy / this.scaleY;
                return lark.$TempPoint.setTo(Math.round(newx), Math.round(newy));
            };
            /**
             * @private
             * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
             * @param scaleX 水平方向的缩放比例。
             * @param scaleY 垂直方向的缩放比例。
             */
            p.updateScaleMode = function (scaleX, scaleY, rotation) {
                this.scaleX = scaleX;
                this.scaleY = scaleY;
                this.rotation = rotation;
            };
            return WebTouchHandler;
        })(lark.LarkObject);
        web.WebTouchHandler = WebTouchHandler;
        lark.registerClass(WebTouchHandler,"lark.web.WebTouchHandler");
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
        var tempPoint = new lark.Point();
        /**
         * @private
         * Web 环境下的输入文本
         */
        var WebTextAdapter = (function (_super) {
            __extends(WebTextAdapter, _super);
            /**
             * @private
             */
            function WebTextAdapter(container, stage, canvas) {
                var _this = this;
                _super.call(this);
                /**
                 * @private
                 */
                this.scaleX = 1;
                /**
                 * @private
                 */
                this.scaleY = 1;
                /**
                 * @private
                 */
                this.offsetX = 1;
                /**
                 * @private
                 */
                this.offsetY = 1;
                /**
                 * @private
                 */
                this.anchorX = 0;
                /**
                 * @private
                 */
                this.anchorY = 0;
                /**
                 * @private
                 */
                this.rotation = 0;
                /**
                 * @private
                 */
                this.pendingToShowHtmlInput = false;
                /**
                 * @private
                 */
                this.currentTextInput = null;
                /**
                 * @private
                 */
                this.singleLineTextInput = null;
                /**
                 * @private
                 */
                this.multiLineTextInput = null;
                /**
                 * @private
                 */
                this.lastSelectAnchor = 0;
                /**
                 * @private
                 */
                this.lastSelectActive = 0;
                /**
                 * @private
                 */
                this.handleContainerClick = function (e) {
                    if (_this.pendingToShowHtmlInput) {
                        _this.pendingToShowHtmlInput = false;
                        e.stopImmediatePropagation();
                        _this.$initializeInput();
                        var currentHtmlInput = _this.currentHtmlInput;
                        currentHtmlInput.onblur = _this.handleHtmlInputBlur;
                        currentHtmlInput.oninput = _this.handleHtmlInputInputEvent;
                        currentHtmlInput.focus();
                        currentHtmlInput.onclick = _this.getInputSelection;
                        currentHtmlInput.onselect = _this.getInputSelection;
                        currentHtmlInput.onkeydown = _this.getInputSelection;
                        _this.$selectRange(_this.currentTextInput.selectionActivePosition, _this.currentTextInput.selectionAnchorPosition);
                        _this.getInputSelection();
                        _this.currentTextInput.$startInput();
                    }
                    else if (_this.currentTextInput != null) {
                        _this.$removeCurrentTextInput();
                    }
                };
                /**
                 * @private
                 */
                this.handleHtmlInputInputEvent = function (e) {
                    _this.currentTextInput.$setUserInputText(_this.currentHtmlInput.value);
                    _this.getInputSelection();
                };
                /**
                 * @private
                 */
                this.handleHtmlInputBlur = function (e) {
                    var htmlInput = _this.currentHtmlInput;
                    var textInput = _this.currentTextInput;
                    _this.$removeCurrentTextInput();
                    textInput.selectRange(_this.lastSelectAnchor, _this.lastSelectActive);
                };
                /**
                 * @private
                 */
                this.getInputSelection = function () {
                    var end = _this.currentHtmlInput.selectionEnd;
                    var start = _this.currentHtmlInput.selectionStart;
                    var direction = _this.currentHtmlInput.selectionDirection || "forward";
                    _this.lastSelectAnchor = direction == 'forward' ? start : end;
                    _this.lastSelectActive = direction == 'forward' ? end : start;
                };
                this.$stage = stage;
                this.canvas = canvas;
                this.container = container;
                lark.sys.$cacheTextAdapter(this);
                this.createHtmlInputs();
            }
            var d = __define,c=WebTextAdapter;p=c.prototype;
            /**
             * @private
             * 当用户点击TextInput时，将它设置为正在输入的TextInput对象，HTML text input 会显示出来并获得焦点
             * @param currentTextInput 要输入的TextInput对象
             */
            p.$setCurrentTextInput = function (currentTextInput) {
                if (this.currentTextInput != null)
                    this.$removeCurrentTextInput();
                this.currentTextInput = currentTextInput;
                this.currentHtmlInput = currentTextInput.wordWrap ? this.multiLineTextInput : this.singleLineTextInput;
                if (currentTextInput.displayAsPassword) {
                    this.currentHtmlInput = this.singleLineTextInput;
                }
                this.currentHtmlInput.value = this.currentTextInput.text;
                this.pendingToShowHtmlInput = true;
                this.canvas['userTyping'] = true;
            };
            /**
             * @private
             * 清空正在输入的TextInput，隐藏HTML text input。
             */
            p.$removeCurrentTextInput = function () {
                window.scrollTo(0, 0);
                var currentTextInput = this.currentTextInput;
                var currentHtmlInput = this.currentHtmlInput;
                currentHtmlInput.onblur = null;
                currentHtmlInput.oninput = null;
                currentHtmlInput.onclick = null;
                currentHtmlInput.onselect = null;
                currentHtmlInput.onkeydown = null;
                this.resetHtmlInputStyle(currentHtmlInput);
                this.resetTextContainerStyle();
                currentTextInput.$setUserInputText(currentHtmlInput.value);
                currentTextInput.$endInput();
                this.currentHtmlInput = null;
                this.currentTextInput = null;
                this.pendingToShowHtmlInput = false;
                this.canvas['userTyping'] = false;
            };
            /**
             * @private
             * 更新屏幕当前的缩放比例，用于计算准确的点击位置。
             * @param scaleX 水平方向的缩放比例。
             * @param scaleY 垂直方向的缩放比例。
             * @param offsetX canvas 相对 container 的横向偏移位置
             * @param offsetY canvas 相对 container 的纵向偏移位置
             */
            p.updateScaleMode = function (scaleX, scaleY, offsetX, offsetY, anchorX, anchorY, rotaion) {
                if (rotaion === void 0) { rotaion = 0; }
                this.scaleX = scaleX;
                this.scaleY = scaleY;
                this.offsetX = offsetX;
                this.offsetY = offsetY;
                this.anchorX = anchorX;
                this.anchorY = anchorY;
                this.rotation = rotaion;
            };
            /**
             * @private
             *
             */
            p.createHtmlInputs = function () {
                var div = document.createElement("div");
                this.textContainer = div;
                div.id = "text-container-" + this.hashCode;
                this.resetTextContainerStyle();
                var singleHtmlInput = document.createElement("input");
                singleHtmlInput.type = "text";
                var multiLineHtmlInput = document.createElement("textarea");
                multiLineHtmlInput.style['resize'] = 'none';
                this.resetHtmlInputStyle(singleHtmlInput);
                this.resetHtmlInputStyle(multiLineHtmlInput);
                div.appendChild(singleHtmlInput);
                div.appendChild(multiLineHtmlInput);
                this.container.appendChild(div);
                this.singleLineTextInput = singleHtmlInput;
                this.multiLineTextInput = multiLineHtmlInput;
                this.canvas.addEventListener("click", this.handleContainerClick);
            };
            /**
             * @private
             */
            p.resetHtmlElementStyle = function (element) {
                element.style.position = "absolute";
                element.style.left = "0px";
                element.style.top = "0px";
                element.style.border = "none";
                element.style.padding = "2px 0";
                element.style[getPrefixStyleName("transformOrigin")] = "0% 0% 0px";
            };
            /**
             * @private
             */
            p.resetHtmlInputStyle = function (element) {
                element.setAttribute("tabindex", "-1");
                element.style.width = "1px";
                element.style.height = "12px";
                element.style.outline = "thin";
                element.style.background = "none";
                element.style.overflow = "hidden";
                element.style.wordBreak = "break-all";
                element.style.opacity = '0';
                this.resetHtmlElementStyle(element);
            };
            /**
             * @private
             */
            p.resetTextContainerStyle = function () {
                var style = this.textContainer.style;
                style.height = "0px";
                style.width = "0px";
                style.top = "-100px";
                this.resetHtmlElementStyle(this.textContainer);
            };
            /**
             * @private
             * 更新HTML5 text input 的属性值
             */
            p.$initializeInput = function () {
                this.singleLineTextInput.style.display = "none";
                this.multiLineTextInput.style.display = "none";
                var textInput = this.currentTextInput;
                var htmlInput = this.currentHtmlInput;
                if (textInput.displayAsPassword) {
                    htmlInput.type = "password";
                }
                else {
                    htmlInput.type = "text";
                }
                var scaleX = this.scaleX;
                var scaleY = this.scaleY;
                var matrix = textInput.$getConcatenatedMatrix().clone();
                matrix.scale(scaleX, scaleY);
                var p = textInput.localToGlobal(0, 0, tempPoint);
                var containerX = this.offsetX + p.x * scaleX, containerY = this.offsetY + p.y * scaleY;
                this.textContainer.style.left = containerX + "px";
                this.textContainer.style.top = containerY + "px";
                scaleX = matrix.$getScaleX();
                scaleY = matrix.$getScaleY();
                var width = textInput.width * scaleX;
                var height = textInput.height * scaleY;
                this.textContainer.style.width = width + "px";
                this.textContainer.style.height = height + "px";
                this.textContainer.style[getPrefixStyleName("transformOrigin")] = "" + (this.anchorX + this.offsetX - containerX) + "px " + (this.anchorY + this.offsetY - containerY) + "px";
                this.textContainer.style[getPrefixStyleName("transform")] = "rotate(" + this.rotation + "deg)";
                var setElementStyle = this.setElementStyle.bind(this);
                setElementStyle("fontFamily", textInput.fontFamily);
                setElementStyle("fontStyle", textInput.italic ? "italic" : "normal");
                setElementStyle("fontWeight", textInput.bold ? "bold" : "normal");
                setElementStyle("textAlign", textInput.textAlign);
                setElementStyle("fontSize", textInput.fontSize + "px");
                setElementStyle("lineHeight", textInput.fontSize + "px");
                setElementStyle("color", lark.sys.toColorString(textInput.textColor));
                setElementStyle("verticalAlign", textInput.verticalAlign);
                setElementStyle("display", "block");
                setElementStyle("width", textInput.width + "px");
                setElementStyle("height", textInput.height + "px");
                setElementStyle(getPrefixStyleName('transform'), 'matrix(' + [matrix.a, matrix.b, matrix.c, matrix.d, 0, 0].join(",") + ')');
                setTimeout(function () {
                    htmlInput.style.opacity = '1';
                }, 0);
                if (textInput.wordWrap == false && textInput.verticalAlign != lark.VerticalAlign.MIDDLE) {
                    var padding = textInput.height - textInput.fontSize + 2;
                    var styleName = textInput.verticalAlign == lark.VerticalAlign.TOP ? 'paddingBottom' : 'paddingTop';
                    setElementStyle(styleName, padding + "px");
                    setElementStyle("height", textInput.fontSize + "px");
                }
                if (textInput.text != htmlInput.value) {
                    htmlInput.value = textInput.text;
                }
                if (textInput.maxChars != 0)
                    htmlInput.maxLength = textInput.maxChars;
                else if (htmlInput.maxLength >= 0)
                    htmlInput.maxLength = 0x800000;
            };
            /**
             * @private
             */
            p.$selectRange = function (anchorPosition, activePosition) {
                var start = Math.min(anchorPosition, activePosition);
                var end = Math.max(anchorPosition, activePosition);
                this.currentHtmlInput.setSelectionRange(start, end, anchorPosition < activePosition ? "forward" : "backward");
            };
            /**
             * @private
             */
            p.setElementStyle = function (style, value) {
                if (this.currentHtmlInput) {
                    this.currentHtmlInput.style[style] = value;
                }
            };
            return WebTextAdapter;
        })(lark.LarkObject);
        web.WebTextAdapter = WebTextAdapter;
        lark.registerClass(WebTextAdapter,"lark.web.WebTextAdapter",["lark.sys.ITextAdapter"]);
        /**
         * @private
         */
        var $CurrentPrefix = null;
        /**
         * @private
         */
        function getPrefixStyleName(name) {
            if ($CurrentPrefix == null)
                $CurrentPrefix = getPrefix();
            return $CurrentPrefix + name.charAt(0).toUpperCase() + name.substr(1);
        }
        /**
         * @private
         */
        function getPrefix() {
            var tempStyle = document.createElement('div').style;
            var prefix = "";
            var transArr = ["t", "webkitT", "msT", "MozT", "OT"];
            for (var i = 0; i < transArr.length; i++) {
                var transform = transArr[i] + 'ransform';
                if (transform in tempStyle) {
                    prefix = transArr[i];
                }
            }
            return prefix.substr(0, prefix.length - 1);
        }
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
        var containerList = [];
        /**
         * @private
         * 刷新所有Lark播放器的显示区域尺寸。仅当使用外部JavaScript代码动态修改了Lark容器大小时，需要手动调用此方法刷新显示区域。
         * 当网页尺寸发生改变时此方法会自动被调用。
         */
        function updateScreenSize() {
            var length = containerList.length;
            for (var i = 0; i < length; i++) {
                var container = containerList[i];
                var player = container["lark-player"];
                var webTouch = container["lark-touch"];
                var webScreen = container["lark-screen"];
                var webText = container["lark-text-layer"];
                webScreen.updateScreenSize(player, webTouch, webText);
            }
        }
        web.updateScreenSize = updateScreenSize;
        /**
         * @private
         * 网页加载完成，实例化页面中定义的Larksys标签
         */
        function runLark() {
            var ticker = lark.sys.$ticker = new lark.sys.Ticker();
            startTicker(ticker);
            var surfaceFactory = new web.CanvasFactory();
            lark.sys.surfaceFactory = surfaceFactory;
            if (!lark.sys.screenAdapter) {
                lark.sys.screenAdapter = new lark.sys.ScreenAdapter();
            }
            var list = document.querySelectorAll(".lark-player");
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var container = list[i];
                createPlayer(container);
            }
        }
        /**
         * @private
         * Lark网页版程序入口
         */
        function createPlayer(container) {
            containerList.push(container);
            var entryClassName = container.getAttribute("data-entry-class");
            var contentWidth = +container.getAttribute("data-content-width") || 480;
            var contentHeight = +container.getAttribute("data-content-height") || 800;
            var scaleMode = container.getAttribute("data-scale-mode");
            var orientation = container.getAttribute("data-orientation") || lark.sys.OrientationMode.NOT_SET;
            var surface = lark.sys.surfaceFactory.create();
            var canvas = surface;
            var webScreen = new web.WebScreen(container, canvas, scaleMode, contentWidth, contentHeight, orientation);
            var stage = new lark.Stage();
            var touch = new lark.sys.TouchHandler(stage);
            var webTouch = new web.WebTouchHandler(touch, canvas);
            var webText = new web.WebTextAdapter(container, stage, canvas);
            var player = new lark.sys.Player(surface.renderContext, stage, entryClassName);
            if (DEBUG) {
                var showPaintRect = container.getAttribute("data-show-paint-rect") == "true";
                player.showPaintRect(showPaintRect);
                var showFPS = container.getAttribute("data-show-fps") == "true";
                var showLog = container.getAttribute("data-show-log") == "true";
                var logFilter = container.getAttribute("data-log-filter");
                if (showFPS || showLog) {
                    player.displayFPS(showFPS, showLog, logFilter);
                }
                var language = navigator.language || navigator.browserLanguage || "en_US";
                language = language.replace("-", "_");
                if (language in lark.$locale_strings)
                    lark.$language = language;
            }
            container["lark-player"] = player;
            container["lark-touch"] = webTouch;
            container["lark-screen"] = webScreen;
            container["lark-text-layer"] = webText;
            webScreen.updateScreenSize(player, webTouch, webText);
            player.start();
        }
        /**
         * @private
         * 启动心跳计时器。
         */
        function startTicker(ticker) {
            var requestAnimationFrame = window["requestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["oRequestAnimationFrame"] || window["msRequestAnimationFrame"];
            if (!requestAnimationFrame) {
                requestAnimationFrame = function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                };
            }
            requestAnimationFrame.call(window, onTick);
            function onTick() {
                ticker.update();
                requestAnimationFrame.call(window, onTick);
            }
        }
        //覆盖原生的isNaN()方法实现，在不同浏览器上有2~10倍性能提升。
        window["isNaN"] = function (value) {
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
            console.warn.apply(console, toArray(arguments));
        };
        lark.error = function () {
            console.error.apply(console, toArray(arguments));
        };
        lark.assert = function () {
            console.assert.apply(console, toArray(arguments));
        };
        if (DEBUG) {
            lark.log = function () {
                if (DEBUG) {
                    var length = arguments.length;
                    var info = "";
                    for (var i = 0; i < length; i++) {
                        info += arguments[i] + " ";
                    }
                    lark.sys.$logToFPS(info);
                }
                console.log.apply(console, toArray(arguments));
            };
        }
        else {
            lark.log = function () {
                console.log.apply(console, toArray(arguments));
            };
        }
        window.addEventListener("load", runLark);
        window.addEventListener("resize", updateScreenSize);
    })(web = lark.web || (lark.web = {}));
})(lark || (lark = {}));
