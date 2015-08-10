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
this["DEBUG"] = true;
this["RELEASE"] = false;
var lark;
(function (lark) {
    function _error(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = lark.sys.tr.apply(null, arguments);
        lark.sys.$logToFPS("Error #" + code + ": " + text);
        throw new Error("#" + code + ": " + text);
    }
    lark.$error = _error;
    function _warn(code) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = lark.sys.tr.apply(null, arguments);
        lark.sys.$logToFPS("Warning #" + code + ": " + text);
        lark.warn("Warning #" + code + ": " + text);
    }
    lark.$warn = _warn;
    function _markReadOnly(instance, property, isStatic) {
        if (!isStatic) {
            instance = instance.prototype;
        }
        var className = lark.getQualifiedClassName(instance);
        var data = Object.getOwnPropertyDescriptor(instance, property);
        data.set = function (value) {
            lark.$warn(1010, className, property);
        };
        Object.defineProperty(instance, property, data);
    }
    lark.$markReadOnly = _markReadOnly;
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
     * @language en_US
     * Registers the runtime class information for a class.This method adds some strings which represent the class name or
     * some interface names to the class definition. After the registration,you can use lark.is() method to do the type checking
     * for the instance of this class.<br/>
     * Note:If you use the TypeScript programming language, the lark command line tool will automatically generate the registration code line.
     * You don't need to manually call this method.
     *
     * @example the following code shows how to register the runtime class information for the EventEmitter class and do the type checking:
     * <pre>
     *      lark.registerClass(lark.EventEmitter,"lark.EventEmitter",["lark.IEventEmitter"]);
     *      var emitter = new lark.EventEmitter();
     *      lark.log(lark.is(emitter, "lark.IEventEmitter"));  //true。
     *      lark.log(lark.is(emitter, "lark.EventEmitter"));   //true。
     *      lark.log(lark.is(emitter, "lark.Bitmap"));   //false。
     * </pre>
     * @param classDefinition the class definition to be registered.
     * @param className  a unique identification string of the specific class
     * @param interfaceNames a list of unique identification string of the specific interfaces.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 为一个类定义注册运行时类信息,用此方法往类定义上注册它自身以及所有接口对应的字符串。
     * 在运行时，这个类的实例将可以使用 lark.is() 方法传入一个字符串来判断实例类型。
     * @example 以下代码演示了如何为EventEmitter类注册运行时类信息并判断类型：
     * <pre>
     *      //为lark.EventEmitter类注册运行时类信息，由于它实现了IEventEmitter接口，这里应同时传入接口名对应的字符串。
     *      lark.registerClass(lark.EventEmitter,"lark.EventEmitter",["lark.IEventEmitter"]);
     *      var emitter = new lark.EventEmitter();
     *      lark.log(lark.is(emitter, "lark.IEventEmitter"));  //true。
     *      lark.log(lark.is(emitter, "lark.EventEmitter"));   //true。
     *      lark.log(lark.is(emitter, "lark.Bitmap"));   //false。
     * </pre>
     * 注意：若您使用 TypeScript 来编写程序，lark 命令行会自动帮您生成类信息注册代码行到最终的 Javascript 文件中。因此您不需要手动调用此方法。
     *
     * @param classDefinition 要注册的类定义。
     * @param className 要注册的类名。
     * @param interfaceNames 要注册的类所实现的接口名列表。
     * @version Lark 1.0
     * @platform Web,Native
     */
    function registerClass(classDefinition, className, interfaceNames) {
        if (DEBUG) {
            if (!classDefinition) {
                lark.$error(1003, "classDefinition");
            }
            if (!classDefinition.prototype) {
                lark.$error(1012, "classDefinition");
            }
            if (className === void 0) {
                lark.$error(1003, "className");
            }
        }
        var prototype = classDefinition.prototype;
        prototype.__class__ = className;
        var types = [className];
        if (interfaceNames) {
            types = types.concat(interfaceNames);
        }
        var superTypes = prototype.__types__;
        if (prototype.__types__) {
            var length = superTypes.length;
            for (var i = 0; i < length; i++) {
                var name = superTypes[i];
                if (types.indexOf(name) == -1) {
                    types.push(name);
                }
            }
        }
        prototype.__types__ = types;
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
     * @language en_US
     * Stops the timer started by the lark.startTick() method.
     * @param callBack the call back method. the timeStamp parameter of this method represents the number of milliseconds
     * since the Lark framework was initialized. If the return value of this method is true, it will force Lark runtime
     * to render after processing of this method completes.
     * @param thisObject the call back method's "this"
     * @includeExample examples/Samples/src/lark/utils/StartTickExample.ts
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 停止之前用 startTick() 方法启动的计时器。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     * @includeExample examples/Samples/src/lark/utils/StartTickExample.ts
     * @version Lark 1.0
     * @platform Web,Native
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
     * @copy lark.Geolocation
     */
    lark.Geolocation;
})(lark || (lark = {}));
var lark;
(function (lark) {
    /**
     * @copy lark.Motion
     */
    lark.Motion;
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
         * @private
         * 获取
         */
        function $getTextAdapter(textInput) {
            var stageHash = textInput.stage ? textInput.stage.$hashCode : 0;
            return stageToTextLayerMap[stageHash];
        }
        sys.$getTextAdapter = $getTextAdapter;
        /**
         * @private
         */
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
     * @language en_US
     * The StageScaleMode class provides values for the Stage.scaleMode property.
     * @see lark.Stage#scaleMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * StageScaleMode 类为舞台缩放模式提供值。
     * @see lark.Stage#scaleMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    var StageScaleMode = (function () {
        function StageScaleMode() {
        }
        var d = __define,c=StageScaleMode;p=c.prototype;
        /**
         * @language en_US
         * Specifies that the size of the application be fixed, so that it remains unchanged even as the size of the screen
         * changes. Cropping might occur if the screen is smaller than the content.<br/>
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the size of the screen.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 不缩放应用程序内容。即使在更改播放器视口大小时，它仍然保持不变。如果播放器视口比内容小，则可能进行一些裁切。
         * 在此模式下，舞台尺寸（Stage.stageWidth,Stage.stageHeight）始终跟播放器视口大小保持一致。
         * @version Lark 1.0
         * @platform Web,Native
         */
        StageScaleMode.NO_SCALE = "noScale";
        /**
         * @language en_US
         * @private
         * Specifies that the entire application be visible in the specified area without distortion while maintaining the
         * original aspect ratio of the application. Borders can appear on two sides of the application.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @private
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较宽方向填满播放器视口，另一个方向的两侧可能会不够宽而留有黑边。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        StageScaleMode.SHOW_ALL = "showAll";
        /**
         * @language en_US
         * Specifies that the entire application fill the specified area, without distortion but possibly with some cropping,
         * while maintaining the original aspect ratio of the application.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        StageScaleMode.NO_BORDER = "noBorder";
        /**
         * @language en_US
         * Specifies that the entire application be visible in the specified area without trying to preserve the original
         * aspect ratio. Distortion can occur.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器视口。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        StageScaleMode.EXACT_FIT = "exactFit";
        /**
         * @language en_US
         * Specifies that the width of the application be fixed,while maintaining the original aspect ratio of the application,
         * so that the height of the application might changes. Cropping might occur if the height of the screen is smaller than the content.
         * In this mode,the stage width always equals to the initial content width,but the stage height is determined by the content height
         * and the scaling factor of the stage width and the content width.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
         * 在此模式下，舞台宽度(Stage.stageWidth)始终等于初始化时外部传入的应用程序内容宽度。舞台高度(Stage.stageHeight)由当前的缩放比例与播放器视口高度决定。
         * @version Lark 1.0
         * @platform Web,Native
         */
        StageScaleMode.FIXED_WIDTH = "fixedWidth";
        /**
         * @language en_US
         * Specifies that the height of the application be fixed,while maintaining the original aspect ratio of the application,
         * so that the width of the application might changes. Cropping might occur if the width of the screen is smaller than the content.
         * In this mode,the stage height always equals to the initial content height,but the stage width is determined by the content width
         * and the scaling factor of the stage height and the content height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
         * 在此模式下，舞台高度(Stage.stageHeight)始终等于初始化时外部传入的应用程序内容高度。舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽度决定。
         * @version Lark 1.0
         * @platform Web,Native
         */
        StageScaleMode.FIXED_HEIGHT = "fixedHeight";
        return StageScaleMode;
    })();
    lark.StageScaleMode = StageScaleMode;
    lark.registerClass(StageScaleMode,"lark.StageScaleMode");
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
         * @private
         * 全局共享的RenderContext。通常用于交换缓存，测量文本或创建填充对象。
         */
        sys.sharedRenderContext;
        /**
         * @private
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
    /**
     * @copy lark.Orientation
     */
    lark.Orientation = null;
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
    /**
     * @language en_US
     * The HorizontalAlign class defines the possible values for the horizontal alignment.
     * @see lark.TextField#textAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HorizontalAlign 类为水平对齐方式定义可能的值。
     * @see lark.TextField#textAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    var HorizontalAlign = (function () {
        function HorizontalAlign() {
        }
        var d = __define,c=HorizontalAlign;p=c.prototype;
        /**
         * @language en_US
         * Horizontally align content to the left of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的左侧对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HorizontalAlign.LEFT = "left";
        /**
         * @language en_US
         * Horizontally align content to the right of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的右侧对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HorizontalAlign.RIGHT = "right";
        /**
         * @language en_US
         * Horizontally align content in the center of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在容器的水平中心对齐内容。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HorizontalAlign.CENTER = "center";
        return HorizontalAlign;
    })();
    lark.HorizontalAlign = HorizontalAlign;
    lark.registerClass(HorizontalAlign,"lark.HorizontalAlign");
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
     * @private
     */
    var $TextWidthCache = {};
    /**
     * @language en_US
     * Helper class to measure the width of text.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 用于文本宽度测量的辅助类
     * @version Lark 1.0
     * @platform Web,Native
     */
    var TextMeasurer = (function () {
        function TextMeasurer() {
        }
        var d = __define,c=TextMeasurer;p=c.prototype;
        /**
         * @language en_US
         * Returns the width of the text with some specific styles.
         * @param text the text to be measured.
         * @param font text font style of the given text.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 测量文本在指定样式下的宽度。
         * @param text 要测量的文本内容。
         * @param font 文本的样式值。
         * @version Lark 1.0
         * @platform Web,Native
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
    lark.registerClass(TextMeasurer,"lark.TextMeasurer");
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
         * @private
         * OrientationMode 类为舞台初始旋转模式提供值。
         */
        var OrientationMode = (function () {
            function OrientationMode() {
            }
            var d = __define,c=OrientationMode;p=c.prototype;
            /**
             * @private
             * 适配屏幕
             */
            OrientationMode.AUTO = "auto";
            /**
             * @private
             * 默认竖屏
             */
            OrientationMode.PORTRAIT = "portrait";
            /**
             * @private
             * 默认横屏，舞台顺时针旋转90度
             */
            OrientationMode.LANDSCAPE = "landscape";
            /**
             * @private
             * 默认横屏，舞台逆时针旋转90度
             */
            OrientationMode.LANDSCAPE_FLIPPED = "landscapeFlipped";
            return OrientationMode;
        })();
        sys.OrientationMode = OrientationMode;
        lark.registerClass(OrientationMode,"lark.sys.OrientationMode");
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
     * @language en_US
     * The VerticalAlign class defines the possible values for the vertical alignment.
     * @see lark.TextField#verticalAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * VerticalAlign 类为垂直对齐方式定义可能的值。
     * @see lark.TextField#verticalAlign
     * @version Lark 1.0
     * @platform Web,Native
     */
    var VerticalAlign = (function () {
        function VerticalAlign() {
        }
        var d = __define,c=VerticalAlign;p=c.prototype;
        /**
         * @language en_US
         * Vertically align content to the top of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的顶部对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        VerticalAlign.TOP = "top";
        /**
         * @language en_US
         * Vertically align content to the bottom of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将内容与容器的底部对齐。
         * @version Lark 1.0
         * @platform Web,Native
         */
        VerticalAlign.BOTTOM = "bottom";
        /**
         * @language en_US
         * Vertically align content in the middle of the container.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在容器的垂直中心对齐内容。
         * @version Lark 1.0
         * @platform Web,Native
         */
        VerticalAlign.MIDDLE = "middle";
        return VerticalAlign;
    })();
    lark.VerticalAlign = VerticalAlign;
    lark.registerClass(VerticalAlign,"lark.VerticalAlign");
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
     * @language en_US
     * The XML class contains properties for working with XML objects.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * XML 类包含用于处理 XML 对象的属性。
     * @version Lark 1.0
     * @platform Web,Native
     */
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
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        /**
         * @private
         * HighResolutionMode 类为高分辨率屏幕显示模式提供可选值。
         * 可选值为<br/>
         *  DEFAULT = "default" 使用设备的逻辑分辨率作为舞台的尺寸和渲染分辨率。
         *  RETINA = "retina"   使用设备的逻辑分辨率作为舞台的尺寸，但使用高清分辨率来渲染。
         *  DEVICE = "device"   使用设备的物理分辨率作为舞台的尺寸
         */
        var HighResolutionMode = (function () {
            function HighResolutionMode() {
            }
            var d = __define,c=HighResolutionMode;p=c.prototype;
            /**
             * @private
             * 使用设备提供的逻辑分辨率作为舞台的尺寸和渲染分辨率。
             * 这种模式下，相同字号的文本在不同DPI的屏幕上具有相同的视觉尺寸，但在高DPI屏幕下文字会模糊。
             */
            HighResolutionMode.DEFAULT = "default";
            /**
             * @private
             * 使用设备提供的逻辑分辨率作为舞台的尺寸，但使用高清分辨率来渲染。
             * 这种模式下，相同字号的文字在不同DPI的屏幕上具有相同的视觉尺寸，在高DPI屏幕下文字会有更好的渲染效果。
             */
            HighResolutionMode.RETINA = "retina";
            /**
             * @private
             * 使用设备的物理分辨率作为舞台的尺寸
             * 这种模式下，相同字号的文字在不同DPI的屏幕上视觉尺寸会不同，在高DPI屏幕下文字看起来会比较小。
             */
            HighResolutionMode.DEVICE = "device";
            return HighResolutionMode;
        })();
        sys.HighResolutionMode = HighResolutionMode;
        lark.registerClass(HighResolutionMode,"lark.sys.HighResolutionMode");
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
var lark;
(function (lark) {
    /**
     * @copy lark.Sound
     */
    lark.Sound;
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
     * @language en_US
     * Return the fully qualified class name of an object
     * @param value The object for which a fully qualified class name is desired. Any JavaScript value may be passed to
     * this method including all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns A string containing the fully qualified class name.
     * @example
     * <pre>
     *  lark.getQualifiedClassName(lark.DisplayObject) //return "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 返回对象的完全限定类名。
     * @param value 需要完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型
     * （如number)和类对象
     * @returns 包含完全限定类名称的字符串。
     * @example
     * <pre>
     *  lark.getQualifiedClassName(lark.DisplayObject) //返回 "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getQualifiedClassName(value) {
        var type = typeof value;
        if (!value || (type != "object" && !value.prototype)) {
            return type;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        if (prototype.hasOwnProperty("__class__")) {
            return prototype["__class__"];
        }
        var constructorString = prototype.constructor.toString();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    lark.getQualifiedClassName = getQualifiedClassName;
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
    /** @language en_US
     * Returns the fully qualified class name of the base class of the object specified by the value parameter.
     * @param value The object for which a parent class is desired. Any JavaScript value may be passed to this method including
     * all available JavaScript types, object instances, primitive types such as number, and class objects.
     * @returns  A fully qualified base class name, or null if none exists.
     * @example
     * <pre>
     *  lark.getQualifiedSuperclassName(lark.Bitmap) //return "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 返回 value 参数指定的对象的基类的完全限定类名。
     * @param value 需要取得父类的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象
     * @returns 完全限定的基类名称，或 null（如果不存在基类名称）。
     * @example
     * <pre>
     *  lark.getQualifiedSuperclassName(lark.Sprite) //返回 "lark.DisplayObject"
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getQualifiedSuperclassName(value) {
        if (!value || (typeof value != "object" && !value.prototype)) {
            return null;
        }
        var prototype = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        var superProto = Object.getPrototypeOf(prototype);
        if (!superProto) {
            return null;
        }
        var superClass = lark.getQualifiedClassName(superProto.constructor);
        if (!superClass) {
            return null;
        }
        return superClass;
    }
    lark.getQualifiedSuperclassName = getQualifiedSuperclassName;
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
     * @copy lark.Video
     */
    lark.Video;
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
     * @language en_US
     * Indicates whether an object is a instance of the class or interface specified as the parameter.This method is similar
     * to the instanceOf operator which indicate whether an object is a instance of the specific class,besides, it can indicate
     * whether an object is a instance of the specific interface.
     * @param instance the instance to be checked.
     * @param typeName the string value representing a specific class or interface.
     * @returns A value of true if the object is a instance of the class or interface specified as the parameter.
     * @example
     * <pre>
     *     var instance = new lark.Sprite();
     *     lark.log(lark.is(instance,"lark.Sprite"))  //true
     *     lark.log(lark.is(instance,"lark.DisplayObjectContainer"))  //true
     *     lark.log(lark.is(instance,"lark.Bitmap"))  //false
     * </pre>
     * @see lark.registerClass()
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 检查指定对象是否为 Lark 框架内指定接口或类或其子类的实例。此方法与使用 instanceOf 关键字作用类似，但除了判断类定义也能判断接口的实现。
     * @param instance 要判断的实例。
     * @param typeName 类或接口的完全名称.
     * @returns 返回true表示当前对象是指定类或接口的实例。
     * @example
     * <pre>
     *     var instance = new lark.Sprite();
     *     lark.log(lark.is(instance,"lark.Sprite"))  //true
     *     lark.log(lark.is(instance,"lark.DisplayObjectContainer"))  //true
     *     lark.log(lark.is(instance,"lark.Bitmap"))  //false
     * </pre>
     * @see lark.registerClass()
     * @version Lark 1.0
     * @platform Web,Native
     */
    function is(instance, typeName) {
        if (!instance || typeof instance != "object") {
            return false;
        }
        var prototype = Object.getPrototypeOf(instance);
        var types = prototype ? prototype.__types__ : null;
        if (!types) {
            return false;
        }
        return (types.indexOf(typeName) !== -1);
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
    /**
     * @language en_US
     * The HttpMethod class provides values that specify whether the HttpRequest object should use the POST method
     * or the GET method when sending data to a server.
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * HttpRequestMethod 类提供了一些值，这些值可指定在将数据发送到服务器时，
     * HttpRequest 对象应使用 POST 方法还是 GET 方法。
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    var HttpMethod = (function () {
        function HttpMethod() {
        }
        var d = __define,c=HttpMethod;p=c.prototype;
        /**
         * @language en_US
         * Specifies that the HttpRequest object is a GET.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 HttpRequest 对象是一个 GET。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HttpMethod.GET = "GET";
        /**
         * @language en_US
         * Specifies that the HttpRequest object is a POST.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示 HttpRequest 对象是一个 POST。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HttpMethod.POST = "POST";
        return HttpMethod;
    })();
    lark.HttpMethod = HttpMethod;
    lark.registerClass(HttpMethod,"lark.HttpMethod");
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
     * @language en_US
     * Creates a HttpRequest object.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 创建一个 HttpRequest 实例。
     * @version Lark 1.0
     * @platform Web,Native
     */
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
     * @language en_US
     * Register and start a timer,which will notify the callback method at a rate of 60 FPS ,and pass the current time stamp as parameters.<br/>
     * Note: After the registration,it will notify the callback method continuously,you can call the stopTick () method to stop it.
     * @param callBack the call back method. the timeStamp parameter of this method represents the number of milliseconds
     * since the Lark framework was initialized. If the return value of this method is true, it will force Lark runtime
     * to render after processing of this method completes.
     * @param thisObject the call back method's "this"
     * @includeExample examples/Samples/src/lark/utils/StartTickExample.ts
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 注册并启动一个计时器，通常会以60FPS的速率触发回调方法，并传入当前时间戳。注意：注册后将会持续触发回调方法，若要停止回调，需要手动调用stopTick()方法。
     * @param callBack 要执行的回调方法。参数 timeStamp 表示从启动Lark框架开始经过的时间(毫秒)。
     * 若回调方法返回值为true，其作用与TimerEvent.updateAfterEvent()类似，将会忽略帧频限制，在此方法处理完成后立即重绘屏幕。
     * @param thisObject 回调方法的this对象引用。
     * @includeExample examples/Samples/src/lark/utils/StartTickExample.ts
     * @version Lark 1.0
     * @platform Web,Native
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
    /**
     * @language en_US
     * Creates a ImageLoader object
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 创建一个 ImageLoader 实例
     * @version Lark 1.0
     * @platform Web,Native
     */
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
     * @private
     */
    lark.$START_TIME = 0;
    /**
     * @language en_US
     * Used to compute relative time.this method returns the number of milliseconds since the Lark framework was initialized
     * @returns The number of milliseconds since the Lark framework was initialized
     * @example
     * This example shows getting and printing the number of milliseconds since the Lark framework was initialized
     * <pre>
     *  var duration = lark.getTimer();
     *  console.log("duration: " + duration);
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 用于计算相对时间。此方法返回自启动 Lark 框架以来经过的毫秒数。
     * @returns 启动 Lark 框架以来经过的毫秒数。
     * @example
     * 获取并打印自启动 Lark 框架以来经过的毫秒数。
     * <pre>
     *  var duration = lark.getTimer();
     *  console.log("duration: " + duration);
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
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
    /**
     * @language en_US
     * The HttpResponseType class provides values that specify how downloaded data is received.
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * URLLoaderDataFormat 类提供了一些用于指定如何接收已下载数据的值。
     * @see lark.HttpRequest
     * @version Lark 1.0
     * @platform Web,Native
     */
    var HttpResponseType = (function () {
        function HttpResponseType() {
        }
        var d = __define,c=HttpResponseType;p=c.prototype;
        /**
         * @language en_US
         * Specifies that downloaded data is received as text. This is the default value of HttpRequest.responseType
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回字符串。HttpRequest.responseType属性的默认值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HttpResponseType.TEXT = "text";
        /**
         * @language en_US
         * Specifies that downloaded data is received as raw binary data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回二进制的ArrayBuffer对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        HttpResponseType.ARRAY_BUFFER = "arraybuffer";
        return HttpResponseType;
    })();
    lark.HttpResponseType = HttpResponseType;
    lark.registerClass(HttpResponseType,"lark.HttpResponseType");
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
     * @private
     */
    lark.$locale_strings = lark.$locale_strings || {};
    /**
     * @private
     */
    lark.$language = "en_US";
})(lark || (lark = {}));
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        /**
         * @private
         * 全局多语言翻译函数
         * @param code 要查询的字符串代码
         * @param args 替换字符串中{0}标志的参数列表
         * @returns 返回拼接后的字符串
         * @version Lark 1.0
         * @platform Web,Native
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
        sys.tr = tr;
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
        var regionPool = [];
        /**
         * @private
         */
        var Region = (function () {
            function Region() {
                /**
                 * @private
                 */
                this.minX = 0;
                /**
                 * @private
                 */
                this.minY = 0;
                /**
                 * @private
                 */
                this.maxX = 0;
                /**
                 * @private
                 */
                this.maxY = 0;
                /**
                 * @private
                 */
                this.width = 0;
                /**
                 * @private
                 */
                this.height = 0;
                /**
                 * @private
                 */
                this.area = 0;
                /**
                 * @private
                 * 是否发生移动
                 */
                this.moved = false;
            }
            var d = __define,c=Region;p=c.prototype;
            /**
             * @private
             * 释放一个Region实例到对象池
             */
            Region.release = function (region) {
                regionPool.push(region);
            };
            /**
             * @private
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
            /**
             * @private
             */
            p.setTo = function (minX, minY, maxX, maxY) {
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
                this.updateArea();
                return this;
            };
            /**
             * @private
             */
            p.updateArea = function () {
                this.width = this.maxX - this.minX;
                this.height = this.maxY - this.minY;
                this.area = this.width * this.height;
            };
            /**
             * @private
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
             * @private
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
            /**
             * @private
             */
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
             * @private
             * 确定此 Region 对象是否为空。
             */
            p.isEmpty = function () {
                return this.width <= 0 || this.height <= 0;
            };
            /**
             * @private
             */
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
            /**
             * @private
             */
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
                var minX, minY, maxX, maxY;
                //优化，通常情况下不缩放旋转的对象占多数，直接加上偏移量即可。
                if (a === 1.0 && b === 0.0 && c === 0.0 && d === 1.0) {
                    minX = Math.floor(x + tx) - 1;
                    minY = Math.floor(y + ty) - 1;
                    maxX = Math.ceil(xMax + tx) + 1;
                    maxY = Math.ceil(yMax + ty) + 1;
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
                    minX = Math.floor(x0 < x2 ? x0 : x2) - 1;
                    maxX = Math.ceil(x1 > x3 ? x1 : x3) + 1;
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
                    minY = Math.floor(y0 < y2 ? y0 : y2) - 1;
                    maxY = Math.ceil(y1 > y3 ? y1 : y3) + 1;
                }
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
                this.width = maxX - minX;
                this.height = maxY - minY;
                this.area = this.width * this.height;
            };
            return Region;
        })();
        sys.Region = Region;
        lark.registerClass(Region,"lark.sys.Region");
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
         * @private
         */
        function unionArea(r1, r2) {
            var minX = r1.minX < r2.minX ? r1.minX : r2.minX;
            var minY = r1.minY < r2.minY ? r1.minY : r2.minY;
            var maxX = r1.maxX > r2.maxX ? r1.maxX : r2.maxX;
            var maxY = r1.maxY > r2.maxY ? r1.maxY : r2.maxY;
            return (maxX - minX) * (maxY - minY);
        }
        /**
         * @private
         * 脏矩形计算工具类
         */
        var DirtyRegion = (function () {
            function DirtyRegion() {
                /**
                 * @private
                 */
                this.dirtyList = [];
                /**
                 * @private
                 */
                this.hasClipRect = false;
                /**
                 * @private
                 */
                this.clipWidth = 0;
                /**
                 * @private
                 */
                this.clipHeight = 0;
                /**
                 * @private
                 */
                this.clipArea = 0;
                /**
                 * @private
                 */
                this.clipRectChanged = false;
            }
            var d = __define,c=DirtyRegion;p=c.prototype;
            /**
             * @private
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
             * @private
             * 添加一个脏矩形区域，返回是否添加成功，当矩形为空或者在屏幕之外时返回false。
             */
            p.addRegion = function (target) {
                var minX = target.minX, minY = target.minY, maxX = target.maxX, maxY = target.maxY;
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
            /**
             * @private
             */
            p.clear = function () {
                var dirtyList = this.dirtyList;
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    sys.Region.release(dirtyList[i]);
                }
                dirtyList.length = 0;
            };
            /**
             * @private
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
             * @private
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
        lark.registerClass(DirtyRegion,"lark.sys.DirtyRegion");
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
     * @private
     */
    var getDefinitionByNameCache = {};
    /**
     * @language en_US
     * Returns a reference to the class object of the class specified by the name parameter.
     * @param name The name of a class.
     * @example
     * <pre>
     *  var clazz:any = lark.getDefinitionByName("lark.Shape"); //get definition of class lark.Shape
     *  var shape:lark.Shape = new clazz();
     *  shape.graphics.fillStyle = "#ff0000";
     *  shape.graphics.fillRect(0,0,100,100);
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 返回 name 参数指定的类的类对象引用。
     * @param name 类的名称。
     * @example
     * <pre>
     *  var clazz:any = lark.getDefinitionByName("lark.Shape"); //获取lark.Shape类定义
     *  var shape:lark.Shape = new clazz();
     *  shape.graphics.fillStyle = "#ff0000";
     *  shape.graphics.fillRect(0,0,100,100);
     * </pre>
     * @version Lark 1.0
     * @platform Web,Native
     */
    function getDefinitionByName(name) {
        if (!name)
            return null;
        var definition = getDefinitionByNameCache[name];
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
        getDefinitionByNameCache[name] = definition;
        return definition;
    }
    lark.getDefinitionByName = getDefinitionByName;
    if (DEBUG) {
        lark["cleanCache"] = function () {
            getDefinitionByNameCache = {};
        };
    }
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
var lark;
(function (lark) {
    //混合模式在Web端只有部分被支持，在 Native 中全部都支持。
    //目前所有平台的浏览器都支持的有：Layer,Alpha,Normal,Add,ERASE。
    //IOS中的所有浏览器以及Android内的部分浏览器还支持：Multiply,Screen,Lighten,Darken,Difference,Overlay,HardLight。
    //仅在 Native 端支持的有：Subtract,Invert。
    /**
     * @language en_US
     * A class that provides constant values for visual blend mode effects. These constants are used in the blendMode
     * property of the DisplayObject class.
     * @see lark.DisplayObject#blendMode
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/BlendModeExample.ts
     */
    /**
     * @language zh_CN
     * 提供混合模式可视效果的常量值的类,通常用于 DisplayObject 的 blendMode 属性上。
     * @see lark.DisplayObject#blendMode
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/BlendModeExample.ts
     */
    var BlendMode = (function () {
        function BlendMode() {
        }
        var d = __define,c=BlendMode;p=c.prototype;
        /**
         * @language en_US
         * The display object appears in front of the background. Pixel values of the display object override the pixel
         * values of the background. Where the display object is transparent, the background is visible.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该显示对象出现在背景前面。显示对象的像素值会覆盖背景的像素值。在显示对象为透明的区域，背景是可见的。
         * @version Lark 1.0
         * @platform Web,Native
         */
        BlendMode.NORMAL = "normal";
        /**
         * @language en_US
         * Adds the values of the constituent colors of the display object to the colors of its background, applying a
         * ceiling of 0xFF. This setting is commonly used for animating a lightening dissolve between two objects.<br/>
         * For example, if the display object has a pixel with an RGB value of 0xAAA633, and the background pixel has an
         * RGB value of 0xDD2200, the resulting RGB value for the displayed pixel is 0xFFC833 (because 0xAA + 0xDD > 0xFF,
         * 0xA6 + 0x22 = 0xC8, and 0x33 + 0x00 = 0x33).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将显示对象的原色值添加到它的背景颜色中，上限值为 0xFF。此设置通常用于使两个对象间的加亮溶解产生动画效果。<br/>
         * 例如，如果显示对象的某个像素的 RGB 值为 0xAAA633，背景像素的 RGB 值为 0xDD2200，则显示像素的结果 RGB 值为 0xFFC833
         * （因为 0xAA + 0xDD > 0xFF，0xA6 + 0x22 = 0xC8，且 0x33 + 0x00 = 0x33）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        BlendMode.ADD = "add";
        /**
         * @language en_US
         * Erases the background based on the alpha value of the display object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据显示对象的 Alpha 值擦除背景。Alpha 值不为0的区域将被擦除。
         * @version Lark 1.0
         * @platform Web,Native
         */
        BlendMode.ERASE = "erase";
        return BlendMode;
    })();
    lark.BlendMode = BlendMode;
    lark.registerClass(BlendMode,"lark.BlendMode");
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
        /**
         * @private
         * 转换 blendMode 字符串为数字。
         */
        function blendModeToNumber(blendMode) {
            var num = blendModeNumber[blendMode];
            return num === undefined ? 0 : num;
        }
        sys.blendModeToNumber = blendModeToNumber;
        /**
         * @private
         * 转换数字为 blendMode 字符串。
         */
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
var lark;
(function (lark) {
    /**
     * @language en_US
     * The Capabilities class provides properties that describe the system and runtime that are hosting the application.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/system/CapabilitiesExample.ts
     */
    /**
     * @language zh_CN
     * Capabilities 类提供一些属性，这些属性描述了承载应用程序的系统和运行时。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/system/CapabilitiesExample.ts
     */
    var Capabilities = (function () {
        function Capabilities() {
        }
        var d = __define,c=Capabilities;p=c.prototype;
        d(Capabilities, "language"
            /**
             * @language en_US
             * Specifies the language code of the system on which the content is running. The language is specified as a lowercase
             * two-letter language code from ISO 639-1. For Chinese, an additional uppercase two-letter country code from ISO 3166
             * distinguishes between Simplified and Traditional Chinese.<br/>
             * The following table lists the possible values,but not limited to them:
             * <ul>
             * <li>Simplified    Chinese  zh-CN</li>
             * <li>Traditional   Chinese  zh-TW</li>
             * <li>English       en</li>
             * <li>Japanese      ja</li>
             * <li>Korean        ko</li>
             * </ul>
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
             * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。<br/>
             * 以下是可能但不限于的语言和值：
             * <ul>
             * <li>简体中文  zh-CN</li>
             * <li>繁体中文  zh-TW</li>
             * <li>英语      en</li>
             * <li>日语      ja</li>
             * <li>韩语      ko</li>
             * </ul>
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$language;
            }
        );
        d(Capabilities, "isMobile"
            /**
             * @language en_US
             * Specifies whether the system is running in a mobile device.(such as a mobile phone or tablet)
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$isMobile;
            }
        );
        d(Capabilities, "os"
            /**
             * @language en_US
             * Specifies the current operating system. The os property can return the following strings:
             * <ul>
             * <li>iPhone            "iOS"</li>
             * <li>Android Phone     "Android"</li>
             * <li>Windows Phone     "Windows Phone"</li>
             * <li>Windows Desktop   "Windows PC"</li>
             * <li>Mac Desktop       "Mac OS"</li>
             * <li>Unknown OS        "Unknown"</li>
             * </ul>
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指示当前的操作系统。os 属性返回下列字符串：
             * <ul>
             * <li>苹果手机操作系统     "iOS"</li>
             * <li>安卓手机操作系统     "Android"</li>
             * <li>微软手机操作系统     "Windows Phone"</li>
             * <li>微软桌面操作系统     "Windows PC"</li>
             * <li>苹果桌面操作系统     "Mac OS"</li>
             * <li>未知操作系统        "Unknown"</li>
             * </ul>
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$os;
            }
        );
        d(Capabilities, "hasGeolocation"
            /**
             * @language en_US
             * Specifies whether the system supports the geolocation services
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指示系统是否支持地理位置服务
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$hasGeolocation;
            }
        );
        d(Capabilities, "hasOrientation"
            /**
             * @language en_US
             * Specifies whether the system supports detecting the device orientation.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指示系统是否支持检测设备方向
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$hasOrientation;
            }
        );
        d(Capabilities, "hasMotion"
            /**
             * @language en_US
             * Specifies whether the system supports the motion Sensor
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指示系统是否支持运动传感器
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$hasMotion;
            }
        );
        d(Capabilities, "devicePixelRatio"
            /**
             * @language en_US
             * The devicePixelRatio read-only property returns the ratio
             * of the (vertical) size of one physical pixel on the current display
             * device to the size of one logical pixel.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * devicePixelRatio 反应设备物理分辨率与逻辑分辨率的比值
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Capabilities.$devicePixelRatio;
            }
        );
        /**
         * @private
         */
        Capabilities.$language = "zh-CN";
        /**
         * @private
         */
        Capabilities.$os = "Unknown";
        return Capabilities;
    })();
    lark.Capabilities = Capabilities;
    lark.registerClass(Capabilities,"lark.Capabilities");
    if (DEBUG) {
        lark.$markReadOnly(Capabilities, "language", true);
        lark.$markReadOnly(Capabilities, "isMobile", true);
        lark.$markReadOnly(Capabilities, "hasOrientation", true);
        lark.$markReadOnly(Capabilities, "hasMotion", true);
        lark.$markReadOnly(Capabilities, "hasGeolocation", true);
        lark.$markReadOnly(Capabilities, "os", true);
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
    var sys;
    (function (sys) {
        /**
         * @private
         * 心跳计时器单例
         */
        sys.$ticker;
        /**
         * @private
         * 是否要广播Event.RENDER事件的标志。
         */
        sys.$invalidateRenderFlag = false;
        /**
         * @private
         * 需要立即刷新屏幕的标志
         */
        sys.$requestRenderingFlag = false;
        /**
         * @private
         * Lark心跳计时器
         */
        var Ticker = (function () {
            /**
             * @private
             */
            function Ticker() {
                /**
                 * @private
                 */
                this.playerList = [];
                /**
                 * @private
                 */
                this.callBackList = [];
                /**
                 * @private
                 */
                this.thisObjectList = [];
                /**
                 * @private
                 * 全局帧率
                 */
                this.$frameRate = 30;
                /**
                 * @private
                 */
                this.frameInterval = 2000;
                /**
                 * @private
                 */
                this.lastCount = 2000;
                if (DEBUG && sys.$ticker) {
                    lark.$error(1008, "lark.sys.Ticker");
                }
                lark.$START_TIME = Date.now();
            }
            var d = __define,c=Ticker;p=c.prototype;
            /**
             * @private
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
             * @private
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
            /**
             * @private
             */
            p.$startTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index != -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.push(callBack);
                this.thisObjectList.push(thisObject);
            };
            /**
             * @private
             */
            p.$stopTick = function (callBack, thisObject) {
                var index = this.getTickIndex(callBack, thisObject);
                if (index == -1) {
                    return;
                }
                this.concatTick();
                this.callBackList.splice(index, 1);
                this.thisObjectList.splice(index, 1);
            };
            /**
             * @private
             */
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
            /**
             * @private
             *
             */
            p.concatTick = function () {
                this.callBackList = this.callBackList.concat();
                this.thisObjectList = this.thisObjectList.concat();
            };
            /**
             * @private
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
             * @private
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
                this.render(true);
                this.broadcastEnterFrame();
            };
            /**
             * @private
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
             * @private
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
             * @private
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
        lark.registerClass(Ticker,"lark.sys.Ticker");
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
    /**
     * @private
     * 哈希计数
     */
    lark.$hashCount = 1;
    /**
     * @language en_US
     * The LarkObject class is the base class for all objects in the Lark framework.The LarkObject
     * class includes a hashCode property, which is a unique identification number of the instance.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Lark顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
     * @version Lark 1.0
     * @platform Web,Native
     */
    var LarkObject = (function () {
        /**
         * @language en_US
         * Initializes a LarkObject
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 LarkObject 对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        function LarkObject() {
            this.$hashCode = lark.$hashCount++;
        }
        var d = __define,c=LarkObject;p=c.prototype;
        d(p, "hashCode"
            /**
             * @language en_US
             * a unique identification number assigned to this instance.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$hashCode;
            }
        );
        return LarkObject;
    })();
    lark.LarkObject = LarkObject;
    lark.registerClass(LarkObject,"lark.LarkObject");
    if (DEBUG) {
        lark.$markReadOnly(LarkObject, "hashCode");
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
    locale_strings[1010] = "the property \"{1}\" of the class \"{0}\" is readonly";
    locale_strings[1011] = "Stream Error. URL: {0}";
    locale_strings[1012] = "The type of parameter {0} is wrong.";
    locale_strings[3001] = "Please call the play method when the media is loaded";
    locale_strings[3002] = "Please pass the URL of media you want to load";
    locale_strings[3003] = "When you want to play video in fullscreen mode, please call the play method when the media is loaded";
    locale_strings[3004] = "There is no location service on this device";
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
         * @private
         * 屏幕适配器实例，开发者可以通过给这个变量赋值实现了IScreenAdapter接口的实例，从而注入自定义的屏幕适配器。
         */
        sys.screenAdapter;
        /**
         * @private
         * 屏幕适配器默认实现，开发者可以实现自定义规则的屏幕适配器。并在初始化加载时将适配器的实例赋值给lark.sys.screenAdapter上，从而替换掉默认适配器。
         */
        var ScreenAdapter = (function (_super) {
            __extends(ScreenAdapter, _super);
            /**
             * @private
             */
            function ScreenAdapter() {
                _super.call(this);
            }
            var d = __define,c=ScreenAdapter;p=c.prototype;
            /**
             * @private
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
                    case lark.StageScaleMode.EXACT_FIT:
                        break;
                    case lark.StageScaleMode.FIXED_HEIGHT:
                        stageWidth = Math.round(screenWidth / scaleY);
                        break;
                    case lark.StageScaleMode.FIXED_WIDTH:
                        stageHeight = Math.round(screenHeight / scaleX);
                        break;
                    case lark.StageScaleMode.NO_BORDER:
                        if (scaleX > scaleY) {
                            displayHeight = Math.round(stageHeight * scaleX);
                        }
                        else {
                            displayWidth = Math.round(stageWidth * scaleY);
                        }
                        break;
                    case lark.StageScaleMode.SHOW_ALL:
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
        lark.registerClass(ScreenAdapter,"lark.sys.ScreenAdapter",["lark.sys.IScreenAdapter"]);
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
         * @private
         * 用户交互操作管理器
         */
        var TouchHandler = (function (_super) {
            __extends(TouchHandler, _super);
            /**
             * @private
             */
            function TouchHandler(stage) {
                _super.call(this);
                /**
                 * @private
                 */
                this.touchDownTarget = {};
                /**
                 * @private
                 */
                this.touchDownTime = {};
                /**
                 * @private
                 */
                this.lastTouchX = -1;
                /**
                 * @private
                 */
                this.lastTouchY = -1;
                this.stage = stage;
            }
            var d = __define,c=TouchHandler;p=c.prototype;
            /**
             * @private
             * 触摸开始（按下）
             * @param x 事件发生处相对于舞台的坐标x
             * @param y 事件发生处相对于舞台的坐标y
             * @param touchPointID 分配给触摸点的唯一标识号
             */
            p.onTouchBegin = function (x, y, touchPointID) {
                var target = this.findTarget(x, y);
                this.touchDownTarget[touchPointID] = target.$hashCode;
                this.touchDownTime[touchPointID] = lark.getTimer();
                lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_BEGIN, true, true, x, y, touchPointID);
            };
            /**
             * @private
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
             * @private
             * 触摸结束（弹起）
             * @param x 事件发生处相对于舞台的坐标x
             * @param y 事件发生处相对于舞台的坐标y
             * @param touchPointID 分配给触摸点的唯一标识号
             */
            p.onTouchEnd = function (x, y, touchPointID) {
                var target = this.findTarget(x, y);
                var oldTargetCode = this.touchDownTarget[touchPointID];
                delete this.touchDownTarget[touchPointID];
                lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_END, true, true, x, y, touchPointID);
                target = this.findTarget(x, y);
                if (oldTargetCode === target.$hashCode) {
                    lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_TAP, true, true, x, y, touchPointID);
                }
                else {
                    lark.TouchEvent.emitTouchEvent(target, lark.TouchEvent.TOUCH_RELEASE_OUTSIDE, true, true, x, y, touchPointID);
                }
                var time = lark.getTimer();
                if (time - this.touchDownTime[touchPointID] > 5000) {
                    var num = 0;
                    for (var key in this.touchDownTime) {
                        if (time - this.touchDownTime[key] > 5000) {
                            num++;
                        }
                    }
                    if (num == 3) {
                        var textField = new lark.TextField("powered by lark");
                        this.stage.addChild(textField);
                        setTimeout(function () {
                            if (textField.parent) {
                                textField.parent.removeChild(textField);
                            }
                        }, 2000);
                    }
                }
                delete this.touchDownTime[touchPointID];
            };
            /**
             * @private
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
        lark.registerClass(TouchHandler,"lark.sys.TouchHandler");
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
    locale_strings[1010] = "类 {0} 的属性 {1} 是只读的";
    locale_strings[1011] = "流错误。URL: {0}";
    locale_strings[1012] = "参数 {0} 的类型错误。";
    locale_strings[3001] = "请等待媒体加载完成后再调用 play 方法";
    locale_strings[3002] = "请指定要加载的媒体的URL";
    locale_strings[3003] = "全屏幕播放视频时，请先调用 load 方法，等待媒体加载完成后再调用 play 方法";
    locale_strings[3004] = "该设备不支持 Location 服务";
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
     * @private
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
     * @private
     * 两个点距离
     */
    function distance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
    /**
     * @private
     * 取两点之间的向量
     */
    function getVector(x1, y1, x2, y2, v) {
        var l = distance(x1, y1, x2, y2);
        v.x = (x2 - x1) / l;
        v.y = (y2 - y1) / l;
    }
    /**
     * @language en_US
     * The Graphics class contains a set of methods that you can use to create a vector shape. the Shape object that support
     * drawing includes a graphics property that is a Graphics object. The following are among those helper functions provided
     * @see lark.Shape
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/GraphicsExample.ts
     */
    /**
     * @language zh_CN
     * Graphics 类包含一组可用来创建矢量形状的方法。Shape是支持矢量绘制的显示对象。它含有一个 graphics 属性，该属性是一个 Graphics 对象。
     * @see lark.Shape
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/GraphicsExample.ts
     */
    var Graphics = (function (_super) {
        __extends(Graphics, _super);
        /**
         * @private
         */
        function Graphics() {
            _super.call(this);
            /**
             * @private
             * 绘图命令列表
             */
            this.$commands = [];
            this.reset();
        }
        var d = __define,c=Graphics;p=c.prototype;
        /**
         * @language en_US
         * creates a radial gradient given by the coordinates of the two circles represented by the parameters.
         * This method returns a radial GraphicsGradient.
         * @param x0 The x axis of the coordinate of the start circle.
         * @param y0 The y axis of the coordinate of the start circle.
         * @param r0 The radius of the start circle.
         * @param x1 The x axis of the coordinate of the end circle.
         * @param y1 The y axis of the coordinate of the end circle.
         * @param r1 The radius of the end circle.
         * @see lark.GraphicsGradient
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据参数确定的两个圆的坐标，创建一个放射性渐变。该方法返回一个放射性的 GraphicsGradient。
         * @param x0 开始圆形的 x 轴坐标。
         * @param y0 开始圆形的 y 轴坐标。
         * @param r0 开始圆形的半径。
         * @param x1 结束圆形的 x 轴坐标。
         * @param y1 结束圆形的 y 轴坐标。
         * @param r1 结束圆形的半径。
         * @see lark.GraphicsGradient
         * @version Lark 1.0
         * @platform Web,Native
         */
        Graphics.createRadialGradient = function (x0, y0, r0, x1, y1, r1) {
            return lark.sys.sharedRenderContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
        };
        /**
         * @language en_US
         * reates a gradient along the line given by the coordinates represented by the parameters.This method returns a linear GraphicsGradient.
         * @see lark.GraphicsGradient
         * @param x0 The x axis of the coordinate of the start point.
         * @param y0 The y axis of the coordinate of the start point.
         * @param x1 The x axis of the coordinate of the end point.
         * @param y1 The y axis of the coordinate of the end point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个沿参数坐标指定的直线的渐变。该方法返回一个线性的 GraphicsGradient 对象。
         * @param x0 起点的 x 轴坐标。
         * @param y0 起点的 y 轴坐标。
         * @param x1 终点的 x 轴坐标。
         * @param y1 终点的 y 轴坐标。
         * @see lark.GraphicsGradient
         * @version Lark 1.0
         * @platform Web,Native
         */
        Graphics.createLinearGradient = function (x0, y0, x1, y1) {
            return lark.sys.sharedRenderContext.createLinearGradient(x0, y0, x1, y1);
        };
        /**
         * @language en_US
         * creates a pattern using the specified image (BitmapData). It repeats the source in the directions specified by
         * the repetition argument. This method returns a GraphicsPattern.
         * @param bitmapData A BitmapData instance to be used as image to repeat.
         * @param repetition  indicating how to repeat the image. Possible values are:
         * "repeat" (both directions),
         * "repeat-x" (horizontal only),
         * "repeat-y" (vertical only), or
         * "no-repeat" (neither).
         * @see lark.GraphicsPattern
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 基于指定的源图象(BitmapData)创建一个模板，通过repetition参数指定源图像在什么方向上进行重复，返回一个GraphicsPattern对象。
         * @param bitmapData 做为重复图像源的 BitmapData 对象。
         * @param repetition 指定如何重复图像。
         * 可能的值有："repeat" (两个方向重复),"repeat-x" (仅水平方向重复),"repeat-y" (仅垂直方向重复),"no-repeat" (不重复).
         * @see lark.GraphicsPattern
         * @version Lark 1.0
         * @platform Web,Native
         */
        Graphics.createPattern = function (bitmapData, repetition) {
            return lark.sys.sharedRenderContext.createPattern(bitmapData, repetition);
        };
        d(p, "fillStyle"
            /**
             * @language en_US
             * specifies the color or style to use inside shapes.
             * @default "#000000"
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 设置要在图形内部填充的颜色或样式
             * @default "#000000"
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._fillStyle;
            }
            ,function (value) {
                if (typeof value == "number") {
                    value = lark.sys.toColorString(value);
                }
                this._fillStyle = value;
                this.pushCommand(5 /* fillStyle */, arguments);
            }
        );
        d(p, "lineWidth"
            /**
             * @language en_US
             * sets the thickness of lines in pixels.
             * setting zero, negative, Infinity and NaN values are ignored
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 设置线条粗细，以像素为单位。设置为0，负数，Infinity 或 NaN 将会被忽略。
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._lineWidth;
            }
            ,function (value) {
                this._lineWidth = value;
                this.pushCommand(3 /* lineWidth */, arguments);
            }
        );
        d(p, "lineCap"
            /**
             * @language en_US
             * determines how the end points of every line are drawn. There are three possible values for this property and those are:<br/>
             * <ul>
             * <li>"butt": The ends of lines are squared off at the endpoints.</li>
             * <li>"round": The ends of lines are rounded.</li>
             * <li>"square": The ends of lines are squared off by adding a box with an equal width and half the height of the line's thickness.</li>
             * </ul>
             * @default "butt"
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指定如何绘制每一条线段末端的属性。有3个可能的值，分别是：<br/>
             * <ul>
             * <li>"butt": 线段末端以方形结束。</li>
             * <li>"round": 线段末端以圆形结束。</li>
             * <li>"square": 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。</li>
             * </ul>
             * @default "butt"
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._lineCap;
            }
            ,function (value) {
                this._lineCap = value;
                this.pushCommand(1 /* lineCap */, arguments);
            }
        );
        d(p, "strokeStyle"
            /**
             * @language en_US
             * specifies the color or style to use for the lines around shapes.
             * @default "#000000"
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 设置要在图形边线填充的颜色或样式
             * @default "#000000"
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._strokeStyle;
            }
            ,function (value) {
                if (typeof value == "number") {
                    value = lark.sys.toColorString(value);
                }
                this._strokeStyle = value;
                this.pushCommand(4 /* strokeStyle */, arguments);
            }
        );
        d(p, "lineJoin"
            /**
             * @language en_US
             * specifies the type of joint appearance used at angles.There are three possible values for this property and those are:<br/>
             * <ul>
             * <li>"round": Rounds off the corners of a shape by filling an additional sector of disc centered at the common endpoint
             * of connected segments. The radius for these rounded corners is equal to the line width.</li>
             * <li>"bevel": Fills an additional triangular area between the common endpoint of connected segments, and the separate
             * outside rectangular corners of each segment.</li>
             * <li>"miter": Connected segments are joined by extending their outside edges to connect at a single point, with the
             * effect of filling an additional lozenge-shaped area. This setting is effected by the miterLimit property.</li>
             * </ul>
             * @default "miter"
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指定用于拐角的连接外观的类型。有3个可能的值，分别是：<br/>
             * <ul>
             * <li>"round": 圆角连接。</li>
             * <li>"bevel": 斜角连接。</li>
             * <li>"miter": 尖角连接。当使用尖角模式时，还可以同时使用 miterLimit 参数限制尖角的长度。</li>
             * </ul>
             * @default "miter"
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._lineJoin;
            }
            ,function (value) {
                this._lineJoin = value;
                this.pushCommand(2 /* lineJoin */, arguments);
            }
        );
        d(p, "miterLimit"
            /**
             * @language en_US
             * A number that indicates the limit at which a miter is cut off.
             * @default 10
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 用于表示剪切斜接的极限值的数字。
             * @default 10
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._miterLimit;
            }
            ,function (value) {
                this._miterLimit = value;
                this.pushCommand(0 /* miterLimit */, arguments);
            }
        );
        /**
         * @language en_US
         * adds an arc to the path which is centered at (x, y) position with radius r starting at startAngle and ending
         * at endAngle going in the given direction by anticlockwise (defaulting to clockwise).
         * @param x The x coordinate of the arc's center.
         * @param y The y coordinate of the arc's center.
         * @param radius The arc's radius.
         * @param startAngle The angle at which the arc starts, measured clockwise from the positive x axis and expressed in radians.
         * @param endAngle The angle at which the arc ends, measured clockwise from the positive x axis and expressed in radians.
         * @param anticlockwise if true, causes the arc to be drawn counter-clockwise between the two angles. By default it is drawn clockwise.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一段圆弧路径。圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。
         * @param x 圆弧中心（圆心）的 x 轴坐标。
         * @param y 圆弧中心（圆心）的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @param startAngle 圆弧的起始点， x轴方向开始计算，单位以弧度表示。
         * @param endAngle 圆弧的重点， 单位以弧度表示。
         * @param anticlockwise 如果为 true，逆时针绘制圆弧，反之，顺时针绘制。
         * @version Lark 1.0
         * @platform Web,Native
         */
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
        /**
         * @private
         * 测量圆弧的矩形大小
         */
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
        /**
         * @language en_US
         * adds a quadratic Bézier curve to the path. It requires two points. The first point is a control point and the
         * second one is the end point. The starting point is the last point in the current path, which can be changed using
         * moveTo() before creating the quadratic Bézier curve.
         * @param cpx The x axis of the coordinate for the control point.
         * @param cpy The y axis of the coordinate for the control point.
         * @param x The x axis of the coordinate for the end point.
         * @param y The y axis of the coordinate for the end point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一段二次贝塞尔曲线路径。它需要2个点。 第一个点是控制点，第二个点是终点。 起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 moveTo() 方法进行改变。
         * @param cpx 控制点的 x 轴坐标。
         * @param cpy 控制点的 y 轴坐标。
         * @param x 终点的 x 轴坐标。
         * @param y 终点的 y 轴坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.quadraticCurveTo = function (cpx, cpy, x, y) {
            this.pushCommand(7 /* quadraticCurveTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(cpx, cpy);
            this.extendByPoint(x, y);
        };
        /**
         * @language en_US
         * adds a cubic Bézier curve to the path. It requires three points. The first two points are control points and
         * the third one is the end point. The starting point is the last point in the current path, which can be changed
         * using moveTo() before creating the Bézier curve.
         * @param cp1x The x axis of the coordinate for the first control point.
         * @param cp1y The y axis of the coordinate for first control point.
         * @param cp2x The x axis of the coordinate for the second control point.
         * @param cp2y The y axis of the coordinate for the second control point.
         * @param x The x axis of the coordinate for the end point.
         * @param y The y axis of the coordinate for the end point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一段三次贝赛尔曲线路径。该方法需要三个点。 第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，
         * 绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。
         * @param cp1x 第一个控制点的 x 轴坐标。
         * @param cp1y 第一个控制点的 y 轴坐标。
         * @param cp2x 第二个控制点的 x 轴坐标。
         * @param cp2y 第二个控制点的 y 轴坐标。
         * @param x 结束点的 x 轴坐标。
         * @param y 结束点的 y 轴坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
            this.pushCommand(14 /* bezierCurveTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(cp1x, cp1y);
            this.extendByPoint(cp2x, cp2y);
            this.extendByPoint(x, y);
        };
        /**
         * @language en_US
         * connects the last point in the sub-path to the x, y coordinates with a straight line
         * @param x The x axis of the coordinate for the end of the line.
         * @param y The y axis of the coordinate for the end of the line.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用直线连接子路径的终点到x，y坐标。
         * @param x 直线终点的 x 轴坐标。
         * @param y 直线终点的 y 轴坐标。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.lineTo = function (x, y) {
            this.pushCommand(8 /* lineTo */, arguments);
            this.checkMoveTo();
            this.extendByPoint(x, y);
        };
        /**
         * @language en_US
         * fills the current or given path with the current fill style using the non-zero or even-odd winding rule.
         * @param fillRule The algorithm by which to determine if a point is inside a path or outside a path. Possible values:
         * "nonzero": The non-zero winding rule, which is the default rule.
         * "evenodd": The even-odd winding rule.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据当前的填充样式，填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。
         * @param fillRule 一种算法，决定点是在路径内还是在路径外。允许的值：
         * "nonzero": 非零环绕规则， 默认的规则。
         * "evenodd": 奇偶环绕规则。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.fill = function (fillRule) {
            this.pushCommand(9 /* fill */, arguments);
            this.hasFill = true;
        };
        /**
         * @language en_US
         * causes the point of the pen to move back to the start of the current sub-path. It tries to add a straight line
         * (but does not actually draw it) from the current point to the start. If the shape has already been closed or
         * has only one point, this function does nothing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.closePath = function () {
            this.pushCommand(10 /* closePath */, arguments);
        };
        /**
         * @language en_US
         * creates a path for a rectangle at position (x, y) with a size that is determined by width and height. Those
         * four points are connected by straight lines and the sub-path is marked as closed, so that you can fill or stroke this rectangle.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一段矩形路径，矩形的起点位置是 (x, y) ，尺寸为 width 和 height。矩形的4个点通过直线连接，子路径做为闭合的标记，所以你可以填充或者描边矩形。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.rect = function (x, y, width, height) {
            this.pushCommand(11 /* rect */, arguments);
            this.extendByPoint(x, y);
            this.extendByPoint(x + width, y + height);
        };
        /**
         * @language en_US
         * moves the starting point of a new sub-path to the (x, y) coordinates.
         * @param x The x axis of the point.
         * @param y The y axis of the point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将一个新的子路径的起始点移动到(x，y)坐标
         * @param x 点的 x 轴
         * @param y 点的 y 轴
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.moveTo = function (x, y) {
            this.pushCommand(12 /* moveTo */, arguments);
            this.moveToX = x;
            this.moveToY = y;
            this.hasMoved = true;
        };
        /**
         * @language en_US
         * draws a filled rectangle at (x, y) position whose size is determined by width and height and whose style is
         * determined by the fillStyle attribute.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制一个填充矩形。矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height ，fillStyle 属性决定矩形的样式。
         * @param x 矩形起始点的 x 轴坐标。
         * @param y 矩形起始点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.fillRect = function (x, y, width, height) {
            this.pushCommand(13 /* fillRect */, arguments);
            this.extendByPoint(x, y);
            this.extendByPoint(x + width, y + height);
            this.hasFill = true;
        };
        /**
         * @language en_US
         * strokes the current or given path with the current stroke style.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据当前的画线样式，绘制当前或已经存在的路径的方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.stroke = function () {
            this.pushCommand(15 /* stroke */, arguments);
            this.hasStroke = true;
        };
        /**
         * @language en_US
         * paints a rectangle which has a starting point at (x, y) and has a w width and an h height onto the surface,
         * using the current stroke style.
         * @param x The x axis of the coordinate for the rectangle starting point.
         * @param y The y axis of the coordinate for the rectangle starting point.
         * @param w The rectangle's width.
         * @param h The rectangle's height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用当前的绘画样式，描绘一个起点在 (x, y) 、宽度为 w 、高度为 h 的矩形的方法。
         * @param x 矩形起点的 x 轴坐标。
         * @param y 矩形起点的 y 轴坐标。
         * @param width 矩形的宽度。
         * @param height 矩形的高度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.strokeRect = function (x, y, width, height) {
            this.pushCommand(16 /* strokeRect */, arguments);
            this.hasStroke = true;
            this.extendByPoint(x, y);
            this.extendByPoint(x + width, y + height);
        };
        /**
         * @language en_US
         * starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 清空子路径列表开始一个新路径。 当你想创建一个新的路径时，调用此方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.beginPath = function () {
            this.pushCommand(17 /* beginPath */, arguments);
            this.hasMoved = false;
            this.moveToX = 0x8000000;
            this.moveToY = 0x8000000;
        };
        /**
         * @language en_US
         * adds an arc to the path with the given control points and radius, connected to the previous point by a straight line.
         * @param x1 The x axis of the coordinate for the first control point.
         * @param y1 The y axis of the coordinate for the first control point.
         * @param x2 The x axis of the coordinate for the second control point.
         * @param y2 The y axis of the coordinate for the second control point.
         * @param radius The arc's radius.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据控制点和半径绘制一段圆弧路径，使用直线连接前一个点。
         * @param x1 第一个控制点的 x 轴坐标。
         * @param y1 第一个控制点的 y 轴坐标。
         * @param x2 第二个控制点的 x 轴坐标。
         * @param y2 第二个控制点的 y 轴坐标。
         * @param radius 圆弧的半径。
         * @version Lark 1.0
         * @platform Web,Native
         */
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
         * @language en_US
         * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 清除绘制到此 Graphics 对象的图形，并重置填充和线条样式设置。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.clear = function () {
            this.reset();
            this.$commands.length = 0;
            this.$targetDisplay.$invalidateContentBounds();
        };
        /**
         * @private
         *
         */
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
        /**
         * @private
         */
        p.pushCommand = function (graphicsType, args) {
            this.$commands.push({ type: graphicsType, arguments: args });
            this.$targetDisplay.$invalidateContentBounds();
        };
        /**
         * @private
         */
        p.checkMoveTo = function () {
            if (this.hasMoved) {
                this.hasMoved = false;
                this.extendByPoint(this.moveToX, this.moveToY);
            }
        };
        /**
         * @private
         */
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
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
            var target = this.$targetDisplay;
            var m = target.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            var context = lark.sys.sharedRenderContext;
            context.surface.width = context.surface.height = 3;
            context.translate(1 - localX, 1 - localY);
            this.$render(context, true);
            var data = context.getImageData(1, 1, 1, 1).data;
            if (data[3] === 0) {
                return null;
            }
            return target;
        };
        /**
         * @private
         */
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
        /**
         * @private
         */
        p.$render = function (context, forHitTest) {
            context.save();
            context.fillStyle = "#000000";
            context.lineCap = "butt";
            context.lineJoin = "miter";
            context.lineWidth = 1;
            context.miterLimit = 10;
            context.strokeStyle = "#000000";
            context.beginPath(); //清理之前的缓存的路径
            var map = context["graphicsMap"];
            if (!map) {
                map = mapGraphicsFunction(context);
            }
            var commands = this.$commands;
            var length = commands.length;
            if (forHitTest) {
                for (var i = 0; i < length; i++) {
                    var command = commands[i];
                    var type = command.type;
                    //过滤透明填充的样式
                    if (type === 5 /* fillStyle */ || type == 4 /* strokeStyle */) {
                        continue;
                    }
                    map[command.type].apply(context, command.arguments);
                }
            }
            else {
                for (var i = 0; i < length; i++) {
                    var command = commands[i];
                    map[command.type].apply(context, command.arguments);
                }
            }
            context.restore();
        };
        return Graphics;
    })(lark.LarkObject);
    lark.Graphics = Graphics;
    lark.registerClass(Graphics,"lark.Graphics");
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
     * @language en_US
     * The Event class is used as the base class for the creation of Event objects, which are passed as parameters to event
     * listeners when an event occurs.The properties of the Event class carry basic information about an event, such as
     * the event's type or whether the event's default behavior can be canceled. For many events, such as the events represented
     * by the Event class constants, this basic information is sufficient. Other events, however, may require more detailed
     * information. Events associated with a touch tap, for example, need to include additional information about the
     * location of the touch event. You can pass such additional information to event listeners by extending the Event class,
     * which is what the TouchEvent class does. Lark API defines several Event subclasses for common events that require
     * additional information. Events associated with each of the Event subclasses are described in the documentation for
     * each class.The methods of the Event class can be used in event listener functions to affect the behavior of the event
     * object. Some events have an associated default behavior. Your event listener can cancel this behavior by calling the
     * preventDefault() method. You can also make the current event listener the last one to process an event by calling
     * the stopPropagation() or stopImmediatePropagation() method.
     * @see lark.EventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/EventExample.ts
     */
    /**
     * @language zh_CN
     * Event 类作为创建事件实例的基类，当发生事件时，Event 实例将作为参数传递给事件侦听器。Event 类的属性包含有关事件的基本信息，例如事件
     * 的类型或者是否可以取消事件的默认行为。对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
     * 例如，与触摸关联的事件需要包括有关触摸事件的位置信息。您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
     * Lark API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。Event 类的方法可以在
     * 事件侦听器函数中使用以影响事件对象的行为。某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
     * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
     * @see lark.EventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/EventExample.ts
     */
    var Event = (function (_super) {
        __extends(Event, _super);
        /**
         * @language en_US
         * Creates an Event object to pass as a parameter to event listeners.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param data the optional data associated with this event
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个作为参数传递给事件侦听器的 Event 对象。
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param data 与此事件对象关联的可选数据。
         * @version Lark 1.0
         * @platform Web,Native
         */
        function Event(type, bubbles, cancelable, data) {
            _super.call(this);
            /**
             * @private
             */
            this.$eventPhase = 2;
            /**
             * @private
             */
            this.$currentTarget = null;
            /**
             * @private
             */
            this.$target = null;
            /**
             * @private
             */
            this.$isDefaultPrevented = false;
            /**
             * @private
             */
            this.$isPropagationStopped = false;
            /**
             * @private
             */
            this.$isPropagationImmediateStopped = false;
            this.$type = type;
            this.$bubbles = !!bubbles;
            this.$cancelable = !!cancelable;
            this.data = data;
        }
        var d = __define,c=Event;p=c.prototype;
        d(p, "type"
            /**
             * @language en_US
             * The type of event. The type is case-sensitive.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  事件的类型。类型区分大小写。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$type;
            }
        );
        d(p, "bubbles"
            /**
             * @language en_US
             * Indicates whether an event is a bubbling event.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  表示事件是否为冒泡事件。如果事件可以冒泡，则此值为 true；否则为 false。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$bubbles;
            }
        );
        d(p, "cancelable"
            /**
             * @language en_US
             * Indicates whether the behavior associated with the event can be prevented. If the behavior can be
             * canceled, this value is true; otherwise it is false.
             * @see #preventDefault()
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  表示是否可以阻止与事件相关联的行为。如果可以取消该行为，则此值为 true；否则为 false。
             * @see #preventDefault()
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$cancelable;
            }
        );
        d(p, "eventPhase"
            /**
             * @language en_US
             * The current phase in the event flow. This property can contain the following numeric values:
             * The capture phase (EventPhase.CAPTURING_PHASE).
             * The target phase (EventPhase.AT_TARGET)
             * The bubbling phase (EventPhase.BUBBLING_PHASE).
             * @see lark.EventPhase
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  事件流中的当前阶段。此属性可以包含以下数值：
             * 捕获阶段 (EventPhase.CAPTURING_PHASE)。
             * 目标阶段 (EventPhase.AT_TARGET)。
             * 冒泡阶段 (EventPhase.BUBBLING_PHASE)。
             * @see lark.EventPhase
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$eventPhase;
            }
        );
        d(p, "currentTarget"
            /**
             * @language en_US
             * The object that is actively processing the Event object with an event listener. For example, if a
             * user clicks an OK button, the current target could be the node containing that button or one of its ancestors
             * that has registered an event listener for that event.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  当前正在使用某个事件侦听器处理 Event 对象的对象。例如，如果用户单击“确定”按钮，
             * 则当前目标可以是包含该按钮的节点，也可以是它的已为该事件注册了事件侦听器的始祖之一。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$currentTarget;
            }
        );
        d(p, "target"
            /**
             * @language en_US
             * The event target. This property contains the target node. For example, if a user clicks an OK button,
             * the target node is the display list node containing that button.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  事件目标。此属性包含目标节点。例如，如果用户单击“确定”按钮，则目标节点就是包含该按钮的显示列表节点。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$target;
            }
        );
        p.$setTarget = function (target) {
            this.$target = target;
        };
        /**
         * @language en_US
         * Checks whether the preventDefault() method has been called on the event. If the preventDefault() method has been
         * called, returns true; otherwise, returns false.
         * @returns If preventDefault() has been called, returns true; otherwise, returns false.
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 检查是否已对事件调用 preventDefault() 方法。
         * @returns 如果已调用 preventDefault() 方法，则返回 true；否则返回 false。
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.isDefaultPrevented = function () {
            return this.$isDefaultPrevented;
        };
        /**
         * @language en_US
         * Cancels an event's default behavior if that behavior can be canceled.Many events have associated behaviors that
         * are carried out by default. For example, if a user types a character into a text input, the default behavior
         * is that the character is displayed in the text input. Because the TextEvent.TEXT_INPUT event's default behavior
         * can be canceled, you can use the preventDefault() method to prevent the character from appearing.
         * You can use the Event.cancelable property to check whether you can prevent the default behavior associated with
         * a particular event. If the value of Event.cancelable is true, then preventDefault() can be used to cancel the event;
         * otherwise, preventDefault() has no effect.
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果可以取消事件的默认行为，则取消该行为。
         * 许多事件都有默认执行的关联行为。例如，如果用户在文本字段中键入一个字符，则默认行为就是在文本字段中显示该字符。
         * 由于可以取消 TextEvent.TEXT_INPUT 事件的默认行为，因此您可以使用 preventDefault() 方法来防止显示该字符。
         * 您可以使用 Event.cancelable 属性来检查是否可以防止与特定事件关联的默认行为。如果 Event.cancelable 的值为 true，
         * 则可以使用 preventDefault() 来取消事件；否则，preventDefault() 无效。
         * @see #cancelable
         * @see #isDefaultPrevented
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.preventDefault = function () {
            if (this.$cancelable)
                this.$isDefaultPrevented = true;
        };
        /**
         * @language en_US
         * Prevents processing of any event listeners in nodes subsequent to the current node in the event flow. This method
         * does not affect any event listeners in the current node (currentTarget). In contrast, the stopImmediatePropagation()
         * method prevents processing of event listeners in both the current node and subsequent nodes. Additional calls to this
         * method have no effect. This method can be called in any phase of the event flow.<br/>
         * Note: This method does not cancel the behavior associated with this event; see preventDefault() for that functionality.
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 currentTarget 中的任何事件侦听器。
         * 相比之下，stopImmediatePropagation() 方法可以防止对当前节点中和后续节点中的事件侦听器进行处理。
         * 对此方法的其它调用没有任何效果。可以在事件流的任何阶段中调用此方法。<br/>
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @see #stopImmediatePropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.stopPropagation = function () {
            if (this.$bubbles)
                this.$isPropagationStopped = true;
        };
        /**
         * @language en_US
         * Prevents processing of any event listeners in the current node and any subsequent nodes in the event flow.
         * This method takes effect immediately, and it affects event listeners in the current node. In contrast, the
         * stopPropagation() method doesn't take effect until all the event listeners in the current node finish processing.<br/>
         * Note: This method does not cancel the behavior associated with this event; see preventDefault() for that functionality.
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 防止对事件流中当前节点中和所有后续节点中的事件侦听器进行处理。此方法会立即生效，并且会影响当前节点中的事件侦听器。
         * 相比之下，在当前节点中的所有事件侦听器都完成处理之前，stopPropagation() 方法不会生效。<br/>
         * 注意：此方法不会取消与此事件相关联的行为；有关此功能的信息，请参阅 preventDefault()。
         * @see #stopPropagation()
         * @see #preventDefault()
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.stopImmediatePropagation = function () {
            if (this.$bubbles)
                this.$isPropagationImmediateStopped = true;
        };
        /**
         * @language en_US
         * This method will be called automatically when you pass the event object as the parameters to the Event.release() method.
         * If your custom event is designed for reusable,you should override this method to make sure all the references to external
         * objects are cleaned. if not,it may cause memory leaking.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当事件实例传递给Event.release()静态方法时，实例上的clean()方法将会被自动调用。
         * 若此自定义事件的实例设计为可以循环复用的，为了避免引起内存泄露，自定义事件需要覆盖此方法来确保实例被缓存前断开对外部对象的一切引用。
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.clean = function () {
            this.data = this.$currentTarget = null;
            this.$setTarget(null);
        };
        /**
         * @language en_US
         * Gets one event instance from the object pool or create a new one. We highly recommend using the Event.create()
         * and Event.release() methods to create and release an event object,it can reduce the number of reallocate objects,
         * which allows you to get better code execution performance.<br/>
         * Note: If you want to use this method to initialize your custom event object,you must make sure the constructor
         * of your custom event is the same as the constructor of lark.Event.
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;    //optional,initializes custom data here
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的事件实例。我们建议您尽可能使用Event.create()和Event.release() 这一对方法来创建和释放事件对象，
         * 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。<br/>
         * 注意：若使用此方法来创建自定义事件的实例，自定义的构造函数参数列表必须跟Event类一致。
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;  //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Lark 1.0
         * @platform Web,Native
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
                event.$eventPhase = 2 /* AT_TARGET */;
                return event;
            }
            return new EventClass(type, bubbles, cancelable);
        };
        /**
         * @language en_US
         * Releases an event object and cache it into the object pool.We highly recommend using the Event.create()
         * and Event.release() methods to create and release an event object,it can reduce the number of reallocate objects,
         * which allows you to get better code execution performance.<br/>
         * Note: The parameters of this method only accepts an instance created by the Event.create() method.
         * if not,it may throw an error.
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data; //optional,initializes custom data here
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个事件对象，并缓存到对象池。我们建议您尽可能使用Event.create()和Event.release() 这一对方法来创建和释放事件对象，
         * 这一对方法会将事件实例在内部缓存下来供下次循环使用，减少对象的创建次数,从而获得更高的代码运行性能。<br/>
         * 注意：此方法只能传入由Event.create()创建的事件实例，传入非法对象实例可能会导致报错。
         * @example
         * <pre>
         *    var event = Event.create(Event,type, bubbles);
         *    event.data = data;   //可选，若指定义事件上需要附加其他参数，可以在获取实例后在此处设置。
         *    this.emit(event);
         *    Event.release(event);
         * </pre>
         * @see #clean()
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.release = function (event) {
            event.clean();
            var EventClass = Object.getPrototypeOf(event).constructor;
            EventClass.eventPool.push(event);
        };
        /**
         * @language en_US
         * Emitted when a display object is added to the on stage display list, either directly or through the addition
         * of a sub tree in which the display object is contained.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.ADDED_TO_STAGE = "addedToStage";
        /**
         * @language en_US
         * Emitted when a display object is about to be removed from the display list, either directly or through the removal
         * of a sub tree in which the display object is contained.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.REMOVED_FROM_STAGE = "removedFromStage";
        /**
         * @language en_US
         * Emitted when a display object is added to the display list.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将显示对象添加到显示列表中时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.ADDED = "added";
        /**
         * @language en_US
         * Emitted when a display object is about to be removed from the display list.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将要从显示列表中删除显示对象时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.REMOVED = "removed";
        /**
         * @language en_US
         * [broadcast event] Emitted when the playhead is entering a new frame.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [广播事件] 进入新的一帧,监听此事件将会在下一帧开始时触发一次回调。这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.ENTER_FRAME = "enterFrame";
        /**
         * @language en_US
         * Emitted when the display list is about to be updated and rendered.
         * Note: Every time you want to receive a render event,you must call the stage.invalidate() method.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 渲染事件，监听此事件将会在本帧末即将开始渲染的前一刻触发回调，这是一个广播事件，可以在任何一个显示对象上监听，无论它是否在显示列表中。
         * 注意：每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 stage.invalidate() 方法，由于每帧只会触发一次屏幕刷新，
         * 若在 Event.RENDER 回调函数执行期间再次调用stage.invalidate()，将会被忽略。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.RENDER = "render";
        /**
         * @language en_US
         * Emitted when the size of stage or UIComponent is changed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 舞台尺寸或UI组件尺寸发生改变
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.RESIZE = "resize";
        /**
         * @language en_US
         * Emitted when the value or selection of a property is chaned.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 属性值或状态发生改变。通常是按钮的选中状态，或者列表的选中项索引改变。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.CHANGE = "change";
        /**
         * @language en_US
         * Emitted when the value or selection of a property is going to change.you can cancel this by calling the
         * preventDefault() method.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 属性值或状态即将发生改变,通常是按钮的选中状态，或者列表的选中项索引改变。可以通过调用 preventDefault() 方法阻止索引发生更改。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.CHANGING = "changing";
        /**
         * @language en_US
         * Emitted when the net request is complete.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 网络请求加载完成
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.COMPLETE = "complete";
        /**
         * @language en_US
         * Emitted when the net request is failed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 网络请求加载失败
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.IO_ERROR = "ioError";
        /**
         * @language en_US
         * Emitted when the TextInput instance gets focus.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * TextInput实例获得焦点
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.FOCUS_IN = "focusIn";
        /**
         * @language en_US
         * Emitted when the TextInput instance loses focus.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * TextInput实例失去焦点
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.FOCUS_OUT = "focusOut";
        /**
         * @language en_US
         * Emitted when the playback is ended.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 动画声音等播放完成
         * @version Lark 1.0
         * @platform Web,Native
         */
        Event.ENDED = "ended";
        return Event;
    })(lark.LarkObject);
    lark.Event = Event;
    lark.registerClass(Event,"lark.Event");
    if (DEBUG) {
        lark.$markReadOnly(Event, "type");
        lark.$markReadOnly(Event, "bubbles");
        lark.$markReadOnly(Event, "cancelable");
        lark.$markReadOnly(Event, "eventPhase");
        lark.$markReadOnly(Event, "currentTarget");
        lark.$markReadOnly(Event, "target");
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
    var pointPool = [];
    /**
     * @language en_US
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal
     * axis and y represents the vertical axis.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/geom/PointExample.ts
     */
    /**
     * @language zh_CN
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/geom/PointExample.ts
     */
    var Point = (function (_super) {
        __extends(Point, _super);
        /**
         * @language en_US
         * Creates a new point. If you pass no parameters to this method, a point is created at (0,0).
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 lark.Point 对象.若不传入任何参数，将会创建一个位于（0，0）位置的点。
         * @param x 该对象的x属性值，默认为0
         * @param y 该对象的y属性值，默认为0
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Releases a point instance to the object pool
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个Point实例到对象池
         * @version Lark 1.0
         * @platform Web,Native
         */
        Point.release = function (point) {
            if (!point) {
                return;
            }
            pointPool.push(point);
        };
        /**
         * @language en_US
         * get a point instance from the object pool or create a new one.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的Point对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Point.create = function (x, y) {
            var point = pointPool.pop();
            if (!point) {
                point = new Point();
            }
            return point.setTo(x, y);
        };
        d(p, "length"
            /**
             * @language en_US
             * The length of the line segment from (0,0) to this point.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  从 (0,0) 到此点的线段长度。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
        );
        /**
         * @language en_US
         * Sets the members of Point to the specified values
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Point 的成员设置为指定值
         * @param x 该对象的x属性值
         * @param y 该对象的y属性值
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.setTo = function (x, y) {
            this.x = x;
            this.y = y;
            return this;
        };
        /**
         * @language en_US
         * Creates a copy of this Point object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 克隆点对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.clone = function () {
            return new Point(this.x, this.y);
        };
        /**
         * @language en_US
         * Determines whether two points are equal. Two points are equal if they have the same x and y values.
         * @param toCompare The point to be compared.
         * @returns A value of true if the object is equal to this Point object; false if it is not equal.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定两个点是否相同。如果两个点具有相同的 x 和 y 值，则它们是相同的点。
         * @param toCompare 要比较的点。
         * @returns 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.equals = function (toCompare) {
            return this.x == toCompare.x && this.y == toCompare.y;
        };
        /**
         * @language en_US
         * Returns the distance between pt1 and pt2.
         * @param p1 The first point.
         * @param p2 The second point.
         * @returns The distance between the first and second points.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回 pt1 和 pt2 之间的距离。
         * @param p1 第一个点
         * @param p2 第二个点
         * @returns 第一个点和第二个点之间的距离。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Point.distance = function (p1, p2) {
            return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
        };
        return Point;
    })(lark.LarkObject);
    lark.Point = Point;
    lark.registerClass(Point,"lark.Point");
    if (DEBUG) {
        lark.$markReadOnly(Point, "length");
    }
    /**
     * @private
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
    var ONCE_EVENT_LIST = [];
    /**
     * @language en_US
     * The EventEmitter class is the base class for all classes that emit events. The EventEmitter class implements
     * the IEventEmitter interface and is the base class for the DisplayObject class. The EventEmitter class allows
     * any object on the display list to be an event target and as such, to use the methods of the IEventEmitter interface.
     * Event targets are an important part of the Lark event model. The event target serves as the focal point for how events
     * flow through the display list hierarchy. When an event such as a touch tap, Lark emits an event object into the
     * event flow from the root of the display list. The event object then makes its way through the display list until it
     * reaches the event target, at which point it begins its return trip through the display list. This round-trip journey
     * to the event target is conceptually divided into three phases: <br/>
     * the capture phase comprises the journey from the root to the last node before the event target's node, the target
     * phase comprises only the event target node, and the bubbling phase comprises any subsequent nodes encountered on
     * the return trip to the root of the display list. In general, the easiest way for a user-defined class to gain event
     * emitting capabilities is to extend EventEmitter. If this is impossible (that is, if the class is already extending
     * another class), you can instead implement the IEventEmitter interface, create an EventEmitter member, and write simple
     * hooks to route calls into the aggregated EventEmitter.
     * @see lark.IEventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/EventEmitterExample.ts
     */
    /**
     * @language zh_CN
     * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
     * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生触摸或按键等事件时，
     * 框架会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
     * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为三个阶段：
     * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括回程上遇到的任何后续节点到显示列表的根。
     * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），则可以实现
     * IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的映射，将调用连接到聚合的 EventEmitter 中。
     * @see lark.IEventEmitter
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/EventEmitterExample.ts
     */
    var EventEmitter = (function (_super) {
        __extends(EventEmitter, _super);
        /**
         * @language en_US
         * create an instance of the EventEmitter class.
         * @param target The target object for events emitted to the EventEmitter object. This parameter is used when
         * the EventEmitter instance is aggregated by a class that implements IEventEmitter it is necessary so that the
         * containing object can be the target for events. Do not use this parameter in simple cases in which a class extends EventEmitter.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 EventEmitter 类的实例
         * @param target 此 EventEmitter 所抛出事件对象的 target 指向。此参数主要用于一个实现了 IEventEmitter 接口的自定义类，
         * 以便抛出的事件对象的 target 属性可以指向自定义类自身。请勿在直接继承 EventEmitter 的情况下使用此参数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        function EventEmitter(target) {
            if (target === void 0) { target = null; }
            _super.call(this);
            this.$EventEmitter = {
                0: target ? target : this,
                1: {},
                2: {},
                3: 0
            };
        }
        var d = __define,c=EventEmitter;p=c.prototype;
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.on = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority);
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.once = function (type, listener, thisObject, useCapture, priority) {
            this.$addListener(type, listener, thisObject, useCapture, priority, true);
        };
        /**
         * @private
         */
        p.$addListener = function (type, listener, thisObject, useCapture, priority, emitOnce) {
            if (DEBUG) {
                if (!listener) {
                    lark.$error(1003, "listener");
                }
                if (typeof listener != "function") {
                    lark.$error(1012, "listener");
                }
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.hasListener = function (type) {
            var values = this.$EventEmitter;
            return !!(values[1 /* eventsMap */][type] || values[2 /* captureEventsMap */][type]);
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.willTrigger = function (type) {
            return this.hasListener(type);
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.emit = function (event) {
            event.$currentTarget = this.$EventEmitter[0 /* eventTarget */];
            event.$setTarget(event.$currentTarget);
            return this.$notifyListener(event, false);
        };
        /**
         * @private
         */
        p.$notifyListener = function (event, capturePhase) {
            var values = this.$EventEmitter;
            var eventMap = capturePhase ? values[2 /* captureEventsMap */] : values[1 /* eventsMap */];
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
    lark.registerClass(EventEmitter,"lark.EventEmitter",["lark.IEventEmitter"]);
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
     * @language en_US
     * MotionEvent represents the device's movement
     * Acceleration and accelerationIncludingGravity to represents the device's acceleration
     * RotationRate to represents the device's rotation
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * MotionEvent 类呈现设备运动的具体信息
     * Acceleration 和 accelerationIncludingGravity 呈现设备三个维度的加速度信息
     * RotationRate 呈现设备的旋转状态信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    var MotionEvent = (function (_super) {
        __extends(MotionEvent, _super);
        function MotionEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=MotionEvent;p=c.prototype;
        return MotionEvent;
    })(lark.Event);
    lark.MotionEvent = MotionEvent;
    lark.registerClass(MotionEvent,"lark.MotionEvent");
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
     * @language en_US
     * The OrientationEvent provides information from the physical orientation of the device.
     * Note: Currently, Browsers on the iOS and Android does not handle the coordinates the same way.
     * Take care about this while using them.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * OrientationEvent 提供设备的方向信息
     * 注意: 目前各个浏览器和操作系统处理方向的方式不完全相同，请根据使用场景做相应的校正，
     * 比如使用两次方向数据的变化而不是直接使用方向的值
     * @version Lark 1.0
     * @platform Web,Native
     */
    var OrientationEvent = (function (_super) {
        __extends(OrientationEvent, _super);
        function OrientationEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OrientationEvent;p=c.prototype;
        return OrientationEvent;
    })(lark.Event);
    lark.OrientationEvent = OrientationEvent;
    lark.registerClass(OrientationEvent,"lark.OrientationEvent");
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
     * @language en_US
     * A ProgressEvent object is emitted when a load operation has begun. These events are usually generated when data are
     * loaded into an application.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 当加载操作已开始,将调度 ProgressEvent 事件。这些事件通常在数据加载到应用程序中时生成。
     * @version Lark 1.0
     * @platform Web,Native
     */
    var ProgressEvent = (function (_super) {
        __extends(ProgressEvent, _super);
        /**
         * @language en_US
         * Creates an Event object that contains information about progress events.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information through the inherited cancelable property.
         * @param bytesLoaded The number of items or bytes loaded when the listener processes the event.
         * @param bytesTotal The total number of items or bytes that will be loaded if the loading process succeeds.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 ProgressEvent 对象
         * @param type  事件的类型，可以作为 Event.type 访问。
         * @param bubbles  确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param bytesLoaded 加载的项数或字节数
         * @param bytesTotal 加载的总项数或总字节数
         * @version Lark 1.0
         * @platform Web,Native
         */
        function ProgressEvent(type, bubbles, cancelable, bytesLoaded, bytesTotal) {
            _super.call(this, type, bubbles, cancelable);
            /**
             * @language en_US
             * The number of items or bytes loaded when the listener processes the event.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 在侦听器处理事件时加载的项数或字节数。
             * @version Lark 1.0
             * @platform Web,Native
             */
            this.bytesLoaded = 0;
            /**
             * @language en_US
             * The total number of items or bytes that will be loaded if the loading process succeeds.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 如果加载过程成功，将加载的总项数或总字节数。
             * @version Lark 1.0
             * @platform Web,Native
             */
            this.bytesTotal = 0;
            this.bytesLoaded = +bytesLoaded || 0;
            this.bytesTotal = +bytesTotal || 0;
        }
        var d = __define,c=ProgressEvent;p=c.prototype;
        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type the type of event
         * @param bytesLoaded The number of items or bytes loaded when the listener processes the event.
         * @param bytesTotal The total number of items or bytes that will be loaded if the loading process succeeds.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的EventEmitter对象来抛出事件对象。使用此方法能够减少事件对象创建的数量，从而获得更高的代码运行性能。
         * @param target 派发事件目标
         * @param type 事件类型
         * @param bytesLoaded 加载的项数或字节数
         * @param bytesTotal 加载的总项数或总字节数
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Emitted when data is received as the download operation progresses.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在下载操作过程中收到数据时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        ProgressEvent.PROGRESS = "progress";
        return ProgressEvent;
    })(lark.Event);
    lark.ProgressEvent = ProgressEvent;
    lark.registerClass(ProgressEvent,"lark.ProgressEvent");
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
     * @language en_US
     * A Timer object emits a TimerEvent objects whenever the Timer object reaches the interval specified by the Timer.delay property.
     * @see lark.Timer
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/TimerEventExample.ts
     */
    /**
     * @language zh_CN
     * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
     * @see lark.Timer
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/TimerEventExample.ts
     */
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        /**
         * @language en_US
         * Creates an Event object with specific information relevant to timer events.
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Event 对象，其中包含有关 timer 事件的特定信息。
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         * @version Lark 1.0
         * @platform Web,Native
         */
        function TimerEvent(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=TimerEvent;p=c.prototype;
        /**
         * @language en_US
         * Instructs Lark runtime to render after processing of this event completes, if the display list has been modified.
         * @example
         * <pre>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.on(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         * @example
         * <pre>
         *    function onTimer(event:TimerEvent):void {
         *        if (40 < mySp.x && mySp.x < 375) {
         *            mySp.x-= 50;
         *        } else {
         *            mySp.x=374;
         *        }
         *        event.updateAfterEvent();
         *    }
         *
         *    var moveTimer:Timer=new Timer(50,250);
         *    moveTimer.on(TimerEvent.TIMER,onTimer);
         *    moveTimer.start();
         * </pre>
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.updateAfterEvent = function () {
            lark.sys.$requestRenderingFlag = true;
        };
        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type The type of the event. Event listeners can access this information through the inherited type property.
         * @param bubbles Determines whether the Event object bubbles. Event listeners can access this information through
         * the inherited bubbles property.
         * @param cancelable Determines whether the Event object can be canceled. Event listeners can access this information
         * through the inherited cancelable property.
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的EventEmitter对象来抛出事件对象。抛出的对象将会缓存在对象池上，供下次循环复用。
         * @param target 事件派发目标
         * @param type 事件的类型。事件侦听器可以通过继承的 type 属性访问此信息。
         * @param bubbles 确定 Event 对象是否冒泡。事件侦听器可以通过继承的 bubbles 属性访问此信息。
         * @param cancelable 确定是否可以取消 Event 对象。事件侦听器可以通过继承的 cancelable 属性访问此信息。
         * @see lark.Event.create()
         * @see lark.Event.release()
         * @version Lark 1.0
         * @platform Web,Native
         */
        TimerEvent.emitTimerEvent = function (target, type, bubbles, cancelable) {
            var event = lark.Event.create(TimerEvent, type, bubbles, cancelable);
            var result = target.emit(event);
            lark.Event.release(event);
            return result;
        };
        /**
         * @language en_US
         * Emitted whenever a Timer object reaches an interval specified according to the Timer.delay property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 每当 Timer 对象达到根据 Timer.delay 属性指定的间隔时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TimerEvent.TIMER = "timer";
        /**
         * @language en_US
         * Emitted whenever it has completed the number of requests set by Timer.repeatCount.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 每当它完成 Timer.repeatCount 设置的请求数后调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TimerEvent.TIMER_COMPLETE = "timerComplete";
        return TimerEvent;
    })(lark.Event);
    lark.TimerEvent = TimerEvent;
    lark.registerClass(TimerEvent,"lark.TimerEvent");
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
     * @language en_US
     * The GeolocationEvent represents the position and altitude of the device on Earth,
     * and show errors occurred while getting the location of the device.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * GeolocationEvent 提供设备的地理位置信息和获取位置时发生的错误信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    var GeolocationEvent = (function (_super) {
        __extends(GeolocationEvent, _super);
        function GeolocationEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=GeolocationEvent;p=c.prototype;
        /**
         * @language en_US
         * The acquisition of the location information failed because of app don't have permission.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由于用户拒绝访问位置信息，获取位置信息失败
         * @version Lark 1.0
         * @platform Web,Native
         */
        GeolocationEvent.PERMISSION_DENIED = "permissionDenied";
        /**
         * @language en_US
         * The acquisition of the location failed because at least one internal source of position returned an internal error.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备位置服务不可用或者超时等原因没有得到位置信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        GeolocationEvent.UNAVAILABLE = "unavailable";
        return GeolocationEvent;
    })(lark.Event);
    lark.GeolocationEvent = GeolocationEvent;
    lark.registerClass(GeolocationEvent,"lark.GeolocationEvent");
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
     * @language en_US
     * A Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its
     * width and its height.<br/>
     * The x, y, width, and height properties of the Rectangle class are independent of each other; changing the value of
     * one property has no effect on the others. However, the right and bottom properties are integrally related to those
     * four properties. For example, if you change the value of the right property, the value of the width property changes;
     * if you change the bottom property, the value of the height property changes.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/geom/RectangleExample.ts
     */
    /**
     * @language zh_CN
     * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。<br/>
     * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
     * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
     * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/geom/RectangleExample.ts
     */
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        /**
         * @language en_US
         * Creates a new Rectangle object with the top-left corner specified by the x and y parameters and with the specified
         * width and height parameters.
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个新 Rectangle 对象，其左上角由 x 和 y 参数指定，并具有指定的 width 和 height 参数。
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Releases a rectangle instance to the object pool.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个Rectangle实例到对象池
         * @version Lark 1.0
         * @platform Web,Native
         */
        Rectangle.release = function (rect) {
            if (!rect) {
                return;
            }
            rectanglePool.push(rect);
        };
        /**
         * @language en_US
         * get a rectangle instance from the object pool or create a new one.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的Rectangle对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Rectangle.create = function () {
            var rect = rectanglePool.pop();
            if (!rect) {
                rect = new Rectangle();
            }
            return rect;
        };
        d(p, "right"
            /**
             * @language en_US
             * The sum of the x and width properties.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * x 和 width 属性的和。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.x + this.width;
            }
            ,function (value) {
                this.width = value - this.x;
            }
        );
        d(p, "bottom"
            /**
             * @language en_US
             * The sum of the y and height properties.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * y 和 height 属性的和。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.y + this.height;
            }
            ,function (value) {
                this.height = value - this.y;
            }
        );
        d(p, "left"
            /**
             * @language en_US
             * The x coordinate of the top-left corner of the rectangle. Changing the left property of a Rectangle object has
             * no effect on the y and height properties. However it does affect the width property, whereas changing the x value
             * does not affect the width property.
             * The value of the left property is equal to the value of the x property.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 矩形左上角的 x 坐标。更改 Rectangle 对象的 left 属性对 y 和 height 属性没有影响。但是，它会影响 width 属性，而更改 x 值不会影响 width 属性。
             * left 属性的值等于 x 属性的值。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.x;
            }
            ,function (value) {
                this.width += this.x - value;
                this.x = value;
            }
        );
        d(p, "top"
            /**
             * @language en_US
             * The y coordinate of the top-left corner of the rectangle. Changing the top property of a Rectangle object has
             * no effect on the x and width properties. However it does affect the height property, whereas changing the y
             * value does not affect the height property.<br/>
             * The value of the top property is equal to the value of the y property.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 矩形左上角的 y 坐标。更改 Rectangle 对象的 top 属性对 x 和 width 属性没有影响。但是，它会影响 height 属性，而更改 y 值不会影响 height 属性。<br/>
             * top 属性的值等于 y 属性的值。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.y;
            }
            ,function (value) {
                this.height += this.y - value;
                this.y = value;
            }
        );
        /**
         * @language en_US
         * Copies all of rectangle data from the source Rectangle object into the calling Rectangle object.
         * @param sourceRect The Rectangle object from which to copy the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将源 Rectangle 对象中的所有矩形数据复制到调用方 Rectangle 对象中。
         * @param sourceRect 要从中复制数据的 Rectangle 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.copyFrom = function (sourceRect) {
            this.x = sourceRect.x;
            this.y = sourceRect.y;
            this.width = sourceRect.width;
            this.height = sourceRect.height;
            return this;
        };
        /**
         * @language en_US
         * Sets the members of Rectangle to the specified values
         * @param x The x coordinate of the top-left corner of the rectangle.
         * @param y The y coordinate of the top-left corner of the rectangle.
         * @param width The width of the rectangle, in pixels.
         * @param height The height of the rectangle, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Rectangle 的成员设置为指定值
         * @param x 矩形左上角的 x 坐标。
         * @param y 矩形左上角的 y 坐标。
         * @param width 矩形的宽度（以像素为单位）。
         * @param height 矩形的高度（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.setTo = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            return this;
        };
        /**
         * @language en_US
         * Determines whether the specified point is contained within the rectangular region defined by this Rectangle object.
         * @param x The x coordinate (horizontal position) of the point.
         * @param y The y coordinate (vertical position) of the point.
         * @returns A value of true if the Rectangle object contains the specified point; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
         * @param x 检测点的x轴
         * @param y 检测点的y轴
         * @returns 如果检测点位于矩形内，返回true，否则，返回false
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.contains = function (x, y) {
            return this.x <= x && this.x + this.width >= x && this.y <= y && this.y + this.height >= y;
        };
        /**
         * @language en_US
         * If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns
         * the area of intersection as a Rectangle object. If the rectangles do not intersect, this method returns an empty
         * Rectangle object with its properties set to 0.
         * @param toIntersect The Rectangle object to compare against to see if it intersects with this Rectangle object.
         * @returns A Rectangle object that equals the area of intersection. If the rectangles do not intersect, this method
         * returns an empty Rectangle object; that is, a rectangle with its x, y, width, and height properties set to 0.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果在 toIntersect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，
         * 则此方法返回一个空的 Rectangle 对象，其属性设置为 0。
         * @param toIntersect 要对照比较以查看其是否与此 Rectangle 对象相交的 Rectangle 对象。
         * @returns 等于交集区域的 Rectangle 对象。如果该矩形不相交，则此方法返回一个空的 Rectangle 对象；即，其 x、y、width 和
         * height 属性均设置为 0 的矩形。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.intersection = function (toIntersect) {
            return this.clone().$intersectInPlace(toIntersect);
        };
        /**
         * @private
         */
        p.$intersectInPlace = function (clipRect) {
            var x0 = this.x;
            var y0 = this.y;
            var x1 = clipRect.x;
            var y1 = clipRect.y;
            var l = Math.max(x0, x1);
            var r = Math.min(x0 + this.width, x1 + clipRect.width);
            if (l <= r) {
                var t = Math.max(y0, y1);
                var b = Math.min(y0 + this.height, y1 + clipRect.height);
                if (t <= b) {
                    this.setTo(l, t, r - l, b - t);
                    return this;
                }
            }
            this.setEmpty();
            return this;
        };
        /**
         * @language en_US
         * Determines whether the object specified in the toIntersect parameter intersects with this Rectangle object.
         * This method checks the x, y, width, and height properties of the specified Rectangle object to see if it
         * intersects with this Rectangle object.
         * @param toIntersect The Rectangle object to compare against this Rectangle object.
         * @returns A value of true if the specified object intersects with this Rectangle object; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定在 toIntersect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle
         * 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
         * @param toIntersect 要与此 Rectangle 对象比较的 Rectangle 对象。
         * @returns 如果两个矩形相交，返回true，否则返回false
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.intersects = function (toIntersect) {
            return Math.max(this.x, toIntersect.x) <= Math.min(this.right, toIntersect.right) && Math.max(this.y, toIntersect.y) <= Math.min(this.bottom, toIntersect.bottom);
        };
        /**
         * @language en_US
         * Determines whether or not this Rectangle object is empty.
         * @returns A value of true if the Rectangle object's width or height is less than or equal to 0; otherwise false.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 确定此 Rectangle 对象是否为空。
         * @returns 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.isEmpty = function () {
            return this.width <= 0 || this.height <= 0;
        };
        /**
         * @language en_US
         * Sets all of the Rectangle object's properties to 0. A Rectangle object is empty if its width or height is less than or equal to 0.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Rectangle 对象的所有属性设置为 0。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.setEmpty = function () {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        };
        /**
         * @language en_US
         * Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @returns A new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回一个新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @returns 新的 Rectangle 对象，其 x、y、width 和 height 属性的值与原始 Rectangle 对象的对应值相同。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        /**
         * @private
         */
        p.$getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * this.width + v * this.height;
        };
        /**
         * @private
         */
        p.$getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * this.width + u * this.height;
        };
        return Rectangle;
    })(lark.LarkObject);
    lark.Rectangle = Rectangle;
    lark.registerClass(Rectangle,"lark.Rectangle");
    /**
     * @private
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
     * @language en_US
     * The Timer class is the interface to timers, which let you run code on a specified time sequence. Use the start()
     * method to start a timer. Add an event listener for the timer event to set up code to be run on the timer interval.<br/>
     * You can create Timer objects to run once or repeat at specified intervals to execute code on a schedule. Depending
     * on the framerate or the runtime environment (available memory and other factors), the runtime may emit events at
     * slightly offset intervals.
     * @see lark.TimerEvent
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/utils/TimerExample.ts
     */
    /**
     * @language zh_CN
     * Timer 类是计时器的接口，它使您能按指定的时间序列运行代码。
     * 使用 start() 方法来启动计时器。为 timer 事件添加事件侦听器，以便将代码设置为按计时器间隔运行。
     * 可以创建 Timer 对象以运行一次或按指定间隔重复运行，从而按计划执行代码。
     * 根据 Lark 的帧速率或运行时环境（可用内存和其他因素），运行时调度事件的间隔可能稍有不同。
     * @see lark.TimerEvent
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/utils/TimerExample.ts
     */
    var Timer = (function (_super) {
        __extends(Timer, _super);
        /**
         * @language en_US
         * Constructs a new Timer object with the specified delay and repeatCount states.
         * @param delay The delay between timer events, in milliseconds. A delay lower than 20 milliseconds is not recommended.
         * Timer frequency is limited to 60 frames per second, meaning a delay lower than 16.6 milliseconds causes runtime problems.
         * @param repeatCount Specifies the number of repetitions. If zero, the timer repeats indefinitely.If nonzero,
         * the timer runs the specified number of times and then stops.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定的 delay 和 repeatCount 状态构造新的 Timer 对象。
         * @param delay 计时器事件间的延迟（以毫秒为单位）。建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
         * @param repeatCount 指定重复次数。如果为零，则计时器将持续不断重复运行。如果不为 0，则将运行计时器，运行次数为指定的次数，然后停止。
         * @version Lark 1.0
         * @platform Web,Native
         */
        function Timer(delay, repeatCount) {
            if (repeatCount === void 0) { repeatCount = 0; }
            _super.call(this);
            /**
             * @private
             */
            this._delay = 0;
            /**
             * @private
             */
            this._currentCount = 0;
            /**
             * @private
             */
            this._running = false;
            /**
             * @private
             */
            this.updateInterval = 1000;
            /**
             * @private
             */
            this.lastCount = 1000;
            this.delay = delay;
            this.repeatCount = +repeatCount | 0;
        }
        var d = __define,c=Timer;p=c.prototype;
        d(p, "delay"
            /**
             * @language en_US
             * The delay between timer events, in milliseconds. A delay lower than 20 milliseconds is not recommended.<br/>
             * Note: Timer frequency is limited to 60 frames per second, meaning a delay lower than 16.6 milliseconds causes runtime problems.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 计时器事件间的延迟（以毫秒为单位）。如果在计时器正在运行时设置延迟间隔，则计时器将按相同的 repeatCount 迭代重新启动。<br/>
             * 注意：建议 delay 不要低于 20 毫秒。计时器频率不得超过 60 帧/秒，这意味着低于 16.6 毫秒的延迟可导致出现运行时问题。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._delay;
            }
            ,function (value) {
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
        d(p, "currentCount"
            /**
             * @language en_US
             * The total number of times the timer has fired since it started at zero. If the timer has been reset, only the fires since the reset are counted.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 计时器从 0 开始后触发的总次数。如果已重置了计时器，则只会计入重置后的触发次数。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._currentCount;
            }
        );
        d(p, "running"
            /**
             * @language en_US
             * The timer's current state; true if the timer is running, otherwise false.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 计时器的当前状态；如果计时器正在运行，则为 true，否则为 false。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._running;
            }
        );
        /**
         * @language en_US
         * Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.
         * Then, when start() is called, the timer instance runs for the specified number of repetitions, as set by the repeatCount value.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果计时器正在运行，则停止计时器，并将 currentCount 属性设回为 0，这类似于秒表的重置按钮。然后，在调用 start() 后，将运行计时器实例，运行次数为指定的重复次数（由 repeatCount 值设置）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.reset = function () {
            this.stop();
            this._currentCount = 0;
        };
        /**
         * @language en_US
         * Starts the timer, if it is not already running.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果计时器尚未运行，则启动计时器。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.start = function () {
            if (this._running)
                return;
            lark.startTick(this.$update, this);
            this._running = true;
        };
        /**
         * @language en_US
         * Stops the timer. When start() is called after stop(), the timer instance runs for the remaining number of
         * repetitions, as set by the repeatCount property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止计时器。如果在调用 stop() 后调用 start()，则将继续运行计时器实例，运行次数为剩余的 重复次数（由 repeatCount 属性设置）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.stop = function () {
            if (!this._running)
                return;
            lark.stopTick(this.$update, this);
            this._running = false;
        };
        /**
         * @private
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
    lark.registerClass(Timer,"lark.Timer");
    if (DEBUG) {
        lark.$markReadOnly(Timer, "currentCount");
        lark.$markReadOnly(Timer, "running");
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
    var PI = Math.PI;
    var HalfPI = PI / 2;
    var PacPI = PI + HalfPI;
    var TwoPI = PI * 2;
    /**
     * @private
     */
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
    /**
     * @private
     */
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
     * @language en_US
     * The Matrix class represents a transformation matrix that determines how to map points from one coordinate space to
     * another. You can perform various graphical transformations on a display object by setting the properties of a Matrix
     * object, applying that Matrix object to the matrix property of a display object, These transformation functions include
     * translation (x and y repositioning), rotation, scaling, and skewing.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
     * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
     * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
     * @version Lark 1.0
     * @platform Web,Native
     */
    var Matrix = (function (_super) {
        __extends(Matrix, _super);
        /**
         * @language en_US
         * Creates a new Matrix object with the specified parameters.
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 使用指定参数创建一个 Matrix 对象
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Releases a matrix instance to the object pool
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个Matrix实例到对象池
         * @version Lark 1.0
         * @platform Web,Native
         */
        Matrix.release = function (matrix) {
            if (!matrix) {
                return;
            }
            matrixPool.push(matrix);
        };
        /**
         * @language en_US
         * get a matrix instance from the object pool or create a new one.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池中取出或创建一个新的Matrix对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        Matrix.create = function () {
            var matrix = matrixPool.pop();
            if (!matrix) {
                matrix = new Matrix();
            }
            return matrix;
        };
        /**
         * @language en_US
         * Returns a new Matrix object that is a clone of this matrix, with an exact copy of the contained object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回一个新的 Matrix 对象，它是此矩阵的克隆，带有与所含对象完全相同的副本。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        };
        /**
         * @language en_US
         * Concatenates a matrix with the current matrix, effectively combining the geometric effects of the two. In mathematical
         * terms, concatenating two matrixes is the same as combining them using matrix multiplication.
         * @param other The matrix to be concatenated to the source matrix.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将某个矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。在数学术语中，将两个矩阵连接起来与使用矩阵乘法将它们结合起来是相同的。
         * @param other 要连接到源矩阵的矩阵。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Copies all of the matrix data from the source Point object into the calling Matrix object.
         * @param other  The Matrix object from which to copy the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将源 Matrix 对象中的所有矩阵数据复制到调用方 Matrix 对象中。
         * @param other 要拷贝的目标矩阵
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Sets each matrix property to a value that causes a null transformation. An object transformed by applying an
         * identity matrix will be identical to the original. After calling the identity() method, the resulting matrix
         * has the following properties: a=1, b=0, c=0, d=1, tx=0, ty=0.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 为每个矩阵属性设置一个值，该值将导致矩阵无转换。通过应用恒等矩阵转换的对象将与原始对象完全相同。
         * 调用 identity() 方法后，生成的矩阵具有以下属性：a=1、b=0、c=0、d=1、tx=0 和 ty=0。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        };
        /**
         * @language en_US
         * Performs the opposite transformation of the original matrix. You can apply an inverted matrix to an object to
         * undo the transformation performed when applying the original matrix.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 执行原始矩阵的逆转换。
         * 您可以将一个逆矩阵应用于对象来撤消在应用原始矩阵时执行的转换。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.invert = function () {
            this.$invertInto(this);
        };
        /**
         * @private
         */
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
         * @language en_US
         * Applies a rotation transformation to the Matrix object.
         * The rotate() method alters the a, b, c, and d properties of the Matrix object.
         * @param angle The rotation angle in radians.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 对 Matrix 对象应用旋转转换。
         * rotate() 方法将更改 Matrix 对象的 a、b、c 和 d 属性。
         * @param angle 以弧度为单位的旋转角度。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Applies a scaling transformation to the matrix. The x axis is multiplied by sx, and the y axis it is multiplied by sy.
         * The scale() method alters the a and d properties of the Matrix object.
         * @param sx A multiplier used to scale the object along the x axis.
         * @param sy A multiplier used to scale the object along the y axis.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 对矩阵应用缩放转换。x 轴乘以 sx，y 轴乘以 sy。
         * scale() 方法将更改 Matrix 对象的 a 和 d 属性。
         * @param sx 用于沿 x 轴缩放对象的乘数。
         * @param sy 用于沿 y 轴缩放对象的乘数。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Sets the members of Matrix to the specified values
         * @param a The value that affects the positioning of pixels along the x axis when scaling or rotating an image.
         * @param b The value that affects the positioning of pixels along the y axis when rotating or skewing an image.
         * @param c The value that affects the positioning of pixels along the x axis when rotating or skewing an image.
         * @param d The value that affects the positioning of pixels along the y axis when scaling or rotating an image..
         * @param tx The distance by which to translate each point along the x axis.
         * @param ty The distance by which to translate each point along the y axis.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将 Matrix 的成员设置为指定值
         * @param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
         * @param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
         * @param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
         * @param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
         * @param tx 沿 x 轴平移每个点的距离。
         * @param ty 沿 y 轴平移每个点的距离。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Returns the result of applying the geometric transformation represented by the Matrix object to the specified point.
         * @param pointX The x coordinate for which you want to get the result of the Matrix transformation.
         * @param pointY The y coordinate for which you want to get the result of the Matrix transformation.
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns The point resulting from applying the Matrix transformation.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回将 Matrix 对象表示的几何转换应用于指定点所产生的结果。
         * @param pointX 想要获得其矩阵转换结果的点的x坐标。
         * @param pointY 想要获得其矩阵转换结果的点的y坐标。
         * @param resultPoint 框架建议尽可能减少创建对象次数来优化性能，可以从外部传入一个复用的Point对象来存储结果，若不传入将创建一个新的Point对象返回。
         * @returns 由应用矩阵转换所产生的点。
         * @version Lark 1.0
         * @platform Web,Native
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
         * @language en_US
         * Translates the matrix along the x and y axes, as specified by the dx and dy parameters.
         * @param dx The amount of movement along the x axis to the right, in pixels.
         * @param dy The amount of movement down along the y axis, in pixels.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 沿 x 和 y 轴平移矩阵，由 dx 和 dy 参数指定。
         * @param dx 沿 x 轴向右移动的量（以像素为单位）。
         * @param dy 沿 y 轴向下移动的量（以像素为单位）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.translate = function (dx, dy) {
            this.tx += dx;
            this.ty += dy;
        };
        /**
         * @language en_US
         * Determines whether two matrixes are equal.
         * @param other The matrix to be compared.
         * @returns A value of true if the object is equal to this Matrix object; false if it is not equal.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 是否与另一个矩阵数据相等
         * @param other 要比较的另一个矩阵对象。
         * @returns 是否相等，ture表示相等。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.equals = function (other) {
            return this.a === other.a && this.b === other.b && this.c === other.c && this.d === other.d && this.tx === other.tx && this.ty === other.ty;
        };
        /**
         * @private
         */
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
        /**
         * @private
         */
        p.getDeterminant = function () {
            return this.a * this.d - this.b * this.c;
        };
        /**
         * @private
         */
        p.$getScaleX = function () {
            var m = this;
            if (m.a === 1 && m.b === 0) {
                return 1;
            }
            var result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.getDeterminant() < 0 ? -result : result;
        };
        /**
         * @private
         */
        p.$getScaleY = function () {
            var m = this;
            if (m.c === 0 && m.d === 1) {
                return 1;
            }
            var result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.getDeterminant() < 0 ? -result : result;
        };
        /**
         * @private
         */
        p.$getSkewX = function () {
            return Math.atan2(this.d, this.c) - (PI / 2);
        };
        /**
         * @private
         */
        p.$getSkewY = function () {
            return Math.atan2(this.b, this.a);
        };
        /**
         * @private
         */
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
         * @private
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
    lark.registerClass(Matrix,"lark.Matrix");
    /**
     * @private
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
     * @private
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
     * @language en_US
     * The DisplayObject class is the base class for all objects that can be placed on the display list. The display list
     * manages all objects displayed in the runtime. Use the DisplayObjectContainer class to arrange the display
     * objects in the display list. DisplayObjectContainer objects can have child display objects, while other display objects,
     * such as Shape and TextField objects, are "leaf" nodes that have only parents and siblings, no children.
     * The DisplayObject class supports basic functionality like the x and y position of an object, as well as more advanced
     * properties of the object such as its transformation matrix.<br/>
     * The DisplayObject class contains several broadcast events.Normally, the target of any particular event is a specific
     * DisplayObject instance. For example, the target of an added event is the specific DisplayObject instance that was added
     * to the display list. Having a single target restricts the placement of event listeners to that target and in some cases
     * the target's ancestors on the display list. With broadcast events, however, the target is not a specific DisplayObject
     * instance, but rather all DisplayObject instances, including those that are not on the display list. This means that you
     * can add a listener to any DisplayObject instance to listen for broadcast events.
     *
     * @event lark.Event.ADDED Emitted when a display object is added to the display list.
     * @event lark.Event.ADDED_TO_STAGE Emitted when a display object is added to the on stage display list, either directly or through the addition of a sub tree in which the display object is contained.
     * @event lark.Event.REMOVED Emitted when a display object is about to be removed from the display list.
     * @event lark.Event.REMOVED_FROM_STAGE Emitted when a display object is about to be removed from the display list, either directly or through the removal of a sub tree in which the display object is contained.
     * @event lark.Event.ENTER_FRAME [broadcast event] Emitted when the playhead is entering a new frame.
     * @event lark.Event.RENDER [broadcast event] Emitted when the display list is about to be updated and rendered.
     * @event lark.TouchEvent.TOUCH_MOVE Emitted when the user touches the device, and is continuously dispatched until the point of contact is removed.
     * @event lark.TouchEvent.TOUCH_BEGIN Emitted when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
     * @event lark.TouchEvent.TOUCH_END Emitted when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone or tablet with a touch screen).
     * @event lark.TouchEvent.TOUCH_TAP Emitted when the user lifts the point of contact over the same DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @event lark.TouchEvent.TOUCH_RELEASE_OUTSIDE Emitted when the user lifts the point of contact over the different DisplayObject instance on which the contact was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display object on a mobile phone or tablet with a touch screen).
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/DisplayObjectExample.ts
     */
    /**
     * @language zh_CN
     * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 类排列
     * 显示列表中的显示对象。DisplayObjectContainer 对象可以有子显示对象，而其他显示对象（如 Shape 和 TextField 对象）是“叶”节点，没有子项，只有父级和
     * 同级。DisplayObject 类有一些基本的属性（如确定坐标位置的 x 和 y 属性），也有一些高级的对象属性（如 Matrix 矩阵变换）。<br/>
     * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。例如，added 事件的目标是已添加到显示列表
     * 的目标 DisplayObject 实例。若只有一个目标，则会将事件侦听器限制为只能监听在该目标上（在某些情况下，可监听在显示列表中该目标的祖代上）。
     * 但是对于广播事件，目标不是特定的 DisplayObject 实例，而是所有 DisplayObject 实例（包括那些不在显示列表中的实例）。这意味着您可以向任何
     * DisplayObject 实例添加侦听器来侦听广播事件。
     *
     * @event lark.Event.ADDED 将显示对象添加到显示列表中时调度。
     * @event lark.Event.ADDED_TO_STAGE 在将显示对象直接添加到舞台显示列表或将包含显示对象的子树添加至舞台显示列表中时调度。
     * @event lark.Event.REMOVED 将要从显示列表中删除显示对象时调度。
     * @event lark.Event.REMOVED_FROM_STAGE 在从显示列表中直接删除显示对象或删除包含显示对象的子树时调度。
     * @event lark.Event.ENTER_FRAME [广播事件] 播放头进入新帧时调度。
     * @event lark.Event.RENDER [广播事件] 将要更新和呈现显示列表时调度。
     * @event lark.TouchEvent.TOUCH_MOVE 当用户触碰设备时进行调度，而且会连续调度，直到接触点被删除。
     * @event lark.TouchEvent.TOUCH_BEGIN 当用户第一次触摸启用触摸的设备时（例如，用手指触摸配有触摸屏的移动电话或平板电脑）调度。
     * @event lark.TouchEvent.TOUCH_END 当用户移除与启用触摸的设备的接触时（例如，将手指从配有触摸屏的移动电话或平板电脑上抬起）调度。
     * @event lark.TouchEvent.TOUCH_TAP 当用户在启用触摸设备上的已启动接触的同一 DisplayObject 实例上抬起接触点时（例如，在配有触摸屏的移动电话或平板电脑的显示对象上的某一点处按下并释放手指）调度。
     * @event lark.TouchEvent.TOUCH_RELEASE_OUTSIDE 当用户在启用触摸设备上的已启动接触的不同 DisplayObject 实例上抬起接触点时（例如，在配有触摸屏的移动电话或平板电脑的显示对象上的某一点处按下并释放手指）调度。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/DisplayObjectExample.ts
     */
    var DisplayObject = (function (_super) {
        __extends(DisplayObject, _super);
        /**
         * @language en_US
         * Initializes a DisplayObject object
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个显示对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        function DisplayObject() {
            _super.call(this);
            /**
             * @private
             * 能够含有子项的类将子项列表存储在这个属性里。
             */
            this.$children = null;
            /**
             * @private
             */
            this.$parent = null;
            /**
             * @private
             */
            this.$stage = null;
            /**
             * @private
             * 这个对象在显示列表中的嵌套深度，舞台为1，它的子项为2，子项的子项为3，以此类推。当对象不在显示列表中时此属性值为0.
             */
            this.$nestLevel = 0;
            /**
             * @private
             */
            this.$visible = true;
            /**
             * @private
             * cacheAsBitmap创建的缓存位图节点。
             */
            this.$displayList = null;
            /**
             * @private
             */
            this.$alpha = 1;
            this.$touchEnabled = true;
            /**
             * @private
             */
            this.$scrollRect = null;
            /**
             * @private
             */
            this.$blendMode = 0;
            /**
             * @private
             * 被遮罩的对象
             */
            this.$maskedObject = null;
            /**
             * @private
             */
            this.$mask = null;
            /**
             * @private
             */
            this.$parentDisplayList = null;
            /**
             * @private
             * 是否需要重绘的标志，此属性在渲染时会被访问，所以单独声明一个直接的变量。
             */
            this.$isDirty = false;
            /**
             * @private
             * 这个对象在舞台上的整体透明度
             */
            this.$renderAlpha = 1;
            /**
             * @private
             * 相对于显示列表根节点或位图缓存根节点上的矩阵对象
             */
            this.$renderMatrix = new lark.Matrix();
            /**
             * @private
             * 此显示对象自身（不包括子项）在显示列表根节点或位图缓存根节点上的显示尺寸。
             */
            this.$renderRegion = null;
            this.$displayFlags = 880 /* InitFlags */;
            this.$DisplayObject = {
                0: 1,
                1: 1,
                2: 0,
                3: 0,
                4: 0,
                5: "",
                6: new lark.Matrix(),
                7: new lark.Matrix(),
                8: new lark.Matrix(),
                9: new lark.Rectangle(),
                10: new lark.Rectangle(),
                11: false,
            };
        }
        var d = __define,c=DisplayObject;p=c.prototype;
        /**
         * @private
         * 添加一个标志量
         */
        p.$setFlags = function (flags) {
            this.$displayFlags |= flags;
        };
        /**
         * @private
         * 移除一个标志量
         */
        p.$removeFlags = function (flags) {
            this.$displayFlags &= ~flags;
        };
        /**
         * @private
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
        /**
         * @private
         * 是否含有指定的所有标志量
         */
        p.$hasFlags = function (flags) {
            return (this.$displayFlags & flags) === flags;
        };
        /**
         * @private
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
         * @private
         * 沿着显示列表向下传递标志量，非容器直接设置自身的flag，此方法会在 DisplayObjectContainer 中被覆盖。
         */
        p.$propagateFlagsDown = function (flags) {
            this.$setFlags(flags);
        };
        /**
         * @private
         * 是否含有多个标志量其中之一。
         */
        p.$hasAnyFlags = function (flags) {
            return !!(this.$displayFlags & flags);
        };
        /**
         * @private
         * 标记矩阵失效
         */
        p.invalidateMatrix = function () {
            this.$setFlags(8 /* InvalidMatrix */);
            this.invalidatePosition();
        };
        /**
         * @private
         * 标记这个显示对象在父级容器的位置发生了改变。
         */
        p.invalidatePosition = function () {
            this.$invalidateTransform();
            this.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ | 32 /* InvalidInvertedConcatenatedMatrix */);
            if (this.$parent) {
                this.$parent.$propagateFlagsUp(4 /* InvalidBounds */);
            }
        };
        d(p, "name"
            /**
             * @language en_US
             * Indicates the instance name of the DisplayObject. The object can be identified in the child list of its parent
             * display object container by calling the getChildByName() method of the display object container.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示 DisplayObject 的实例名称。
             * 通过调用父显示对象容器的 getChildByName() 方法，可以在父显示对象容器的子列表中标识该对象。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[5 /* name */];
            }
            ,function (value) {
                this.$DisplayObject[5 /* name */] = value;
            }
        );
        d(p, "parent"
            /**
             * @language en_US
             * Indicates the DisplayObjectContainer object that contains this display object. Use the parent property to specify
             * a relative path to display objects that are above the current display object in the display list hierarchy.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示包含此显示对象的 DisplayObjectContainer 对象。
             * 使用 parent 属性可以指定高于显示列表层次结构中当前显示对象的显示对象的相对路径。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$parent;
            }
        );
        /**
         * @private
         * 设置父级显示对象
         */
        p.$setParent = function (parent) {
            this.$parent = parent;
        };
        /**
         * @private
         * 显示对象添加到舞台
         */
        p.$onAddToStage = function (stage, nestLevel) {
            this.$stage = stage;
            this.$nestLevel = nestLevel;
            lark.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(this);
        };
        /**
         * @private
         * 显示对象从舞台移除
         */
        p.$onRemoveFromStage = function () {
            this.$nestLevel = 0;
            lark.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(this);
        };
        d(p, "stage"
            /**
             * @language en_US
             * The Stage of the display object. you can create and load multiple display objects into the display list, and
             * the stage property of each display object refers to the same Stage object.<br/>
             * If a display object is not added to the display list, its stage property is set to null.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 显示对象的舞台。
             * 例如，您可以创建多个显示对象并加载到显示列表中，每个显示对象的 stage 属性是指相同的 Stage 对象。<br/>
             * 如果显示对象未添加到显示列表，则其 stage 属性会设置为 null。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$stage;
            }
        );
        d(p, "matrix"
            /**
             * @language en_US
             * A Matrix object containing values that alter the scaling, rotation, and translation of the display object.<br/>
             * Note: to change the value of a display object's matrix, you must make a copy of the entire matrix object, then copy
             * the new object into the matrix property of the display object.
             * @example the following code increases the tx value of a display object's matrix
             * <pre>
             *     var myMatrix:Matrix = myDisplayObject.matrix;
             *     myMatrix.tx += 10;
             *     myDisplayObject.matrix = myMatrix;
             * </pre>
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个 Matrix 对象，其中包含更改显示对象的缩放、旋转和平移的值。<br/>
             * 注意：要改变一个显示对象矩阵的值，您必引用整个矩阵对象，然后将它重新赋值给显示对象的 matrix 属性。
             * @example 以下代码改变了显示对象矩阵的tx属性值：
             * <pre>
             *     var myMatrix:Matrix = myDisplayObject.matrix;
             *     myMatrix.tx += 10;
             *     myDisplayObject.matrix = myMatrix;
             * </pre>
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$getMatrix().clone();
            }
            ,function (value) {
                this.$setMatrix(value);
            }
        );
        /**
         * @private
         * 获取矩阵
         */
        p.$getMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(8 /* InvalidMatrix */)) {
                values[6 /* matrix */].$updateScaleAndRotation(values[0 /* scaleX */], values[1 /* scaleY */], values[2 /* skewX */], values[3 /* skewY */]);
                this.$removeFlags(8 /* InvalidMatrix */);
            }
            return values[6 /* matrix */];
        };
        /**
         * @private
         * 设置矩阵
         */
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
         * @private
         * 获得这个显示对象以及它所有父级对象的连接矩阵。
         */
        p.$getConcatenatedMatrix = function () {
            var matrix = this.$DisplayObject[7 /* concatenatedMatrix */];
            if (this.$hasFlags(16 /* InvalidConcatenatedMatrix */)) {
                if (this.$parent) {
                    this.$parent.$getConcatenatedMatrix().$preMultiplyInto(this.$getMatrix(), matrix);
                    var rect = this.$scrollRect;
                    if (rect) {
                        matrix.$preMultiplyInto(lark.$TempMatrix.setTo(1, 0, 0, 1, -rect.x, -rect.y), matrix);
                    }
                }
                else {
                    matrix.copyFrom(this.$getMatrix());
                }
                if (this.$displayList) {
                    this.$displayList.$renderRegion.moved = true;
                }
                if (this.$renderRegion) {
                    this.$renderRegion.moved = true;
                }
                this.$removeFlags(16 /* InvalidConcatenatedMatrix */);
            }
            return matrix;
        };
        /**
         * @private
         * 获取链接矩阵
         */
        p.$getInvertedConcatenatedMatrix = function () {
            var values = this.$DisplayObject;
            if (this.$hasFlags(32 /* InvalidInvertedConcatenatedMatrix */)) {
                this.$getConcatenatedMatrix().$invertInto(values[8 /* invertedConcatenatedMatrix */]);
                this.$removeFlags(32 /* InvalidInvertedConcatenatedMatrix */);
            }
            return values[8 /* invertedConcatenatedMatrix */];
        };
        d(p, "x"
            /**
             * @language en_US
             * Indicates the x coordinate of the DisplayObject instance relative to the local coordinates of the parent
             * DisplayObjectContainer.<br/>
             * If the object is inside a DisplayObjectContainer that has transformations, it is in
             * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer
             * rotated 90° counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is
             * rotated 90° counterclockwise. The object's coordinates refer to the registration point position.
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 x 坐标。<br/>
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
             * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$getX();
            }
            ,function (value) {
                this.$setX(value);
            }
        );
        /**
         * @private
         * 获取x坐标
         */
        p.$getX = function () {
            return this.$DisplayObject[6 /* matrix */].tx;
        };
        /**
         * @private
         * 设置x坐标
         */
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
        d(p, "y"
            /**
             * @language en_US
             * Indicates the y coordinate of the DisplayObject instance relative to the local coordinates of the parent
             * DisplayObjectContainer. <br/>
             * If the object is inside a DisplayObjectContainer that has transformations, it is in
             * the local coordinate system of the enclosing DisplayObjectContainer. Thus, for a DisplayObjectContainer rotated
             * 90° counterclockwise, the DisplayObjectContainer's children inherit a coordinate system that is rotated 90°
             * counterclockwise. The object's coordinates refer to the registration point position.
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示 DisplayObject 实例相对于父级 DisplayObjectContainer 本地坐标的 y 坐标。<br/>
             * 如果该对象位于具有变形的 DisplayObjectContainer 内，则它也位于包含 DisplayObjectContainer 的本地坐标系中。
             * 因此，对于逆时针旋转 90 度的 DisplayObjectContainer，该 DisplayObjectContainer 的子级将继承逆时针旋转 90 度的坐标系。
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$getY();
            }
            ,function (value) {
                this.$setY(value);
            }
        );
        /**
         * @private
         * 获取y坐标
         */
        p.$getY = function () {
            return this.$DisplayObject[6 /* matrix */].ty;
        };
        /**
         * @private
         * 设置y坐标
         */
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
        d(p, "scaleX"
            /**
             * @language en_US
             * Indicates the horizontal scale (percentage) of the object as applied from the registration point. <br/>
             * The default 1.0 equals 100% scale.Scaling the local coordinate system changes the x and y property values, which are
             * defined in whole pixels.
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示从注册点开始应用的对象的水平缩放比例（百分比）。<br/>
             * 1.0 等于 100% 缩放。缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[0 /* scaleX */];
            }
            ,function (value) {
                this.$setScaleX(value);
            }
        );
        /**
         * @private
         * 设置水平缩放值
         */
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
        d(p, "scaleY"
            /**
             * @language en_US
             * Indicates the vertical scale (percentage) of an object as applied from the registration point of the object.
             * 1.0 is 100% scale.Scaling the local coordinate system changes the x and y property values, which are defined
             * in whole pixels.
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示从对象注册点开始应用的对象的垂直缩放比例（百分比）。1.0 是 100% 缩放。
             * 缩放本地坐标系统将更改 x 和 y 属性值，这些属性值是以整像素定义的。
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[1 /* scaleY */];
            }
            ,function (value) {
                this.$setScaleY(value);
            }
        );
        /**
         * @private
         * 设置垂直缩放值
         */
        p.$setScaleY = function (value) {
            value = +value || 0;
            if (value === this.$DisplayObject[1 /* scaleY */]) {
                return false;
            }
            this.$DisplayObject[1 /* scaleY */] = value;
            this.invalidateMatrix();
            return true;
        };
        d(p, "rotation"
            /**
             * @language en_US
             * Indicates the rotation of the DisplayObject instance, in degrees, from its original orientation. Values from
             * 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation. Values outside
             * this range are added to or subtracted from 360 to obtain a value within the range. For example, the statement
             * myDisplayObject.rotation = 450 is the same as myDisplayObject.rotation = 90.
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示 DisplayObject 实例距其原始方向的旋转程度，以度为单位。
             * 从 0 到 180 的值表示顺时针方向旋转；从 0 到 -180 的值表示逆时针方向旋转。对于此范围之外的值，可以通过加上或
             * 减去 360 获得该范围内的值。例如，myDisplayObject.rotation = 450语句与 myDisplayObject.rotation = 90 是相同的。
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[4 /* rotation */];
            }
            ,function (value) {
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
        d(p, "width"
            /**
             * @language en_US
             * Indicates the width of the display object, in pixels. The width is calculated based on the bounds of the content
             * of the display object. When you set the width property, the scaleX property is adjusted accordingly.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示显示对象的宽度，以像素为单位。宽度是根据显示对象内容的范围来计算的。如果您设置了 width 属性，则 scaleX 属性会相应调整.
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$getWidth();
            }
            ,function (value) {
                this.$setWidth(value);
            }
        );
        /**
         * @private
         * 获取显示宽度
         */
        p.$getWidth = function () {
            return this.$getTransformedBounds(this.$parent, lark.$TempRectangle).width;
        };
        /**
         * @private
         * 设置显示宽度
         */
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
        d(p, "height"
            /**
             * @language en_US
             * Indicates the height of the display object, in pixels. The height is calculated based on the bounds of the
             * content of the display object. When you set the height property, the scaleY property is adjusted accordingly.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示显示对象的高度，以像素为单位。高度是根据显示对象内容的范围来计算的。如果您设置了 height 属性，则 scaleY 属性会相应调整。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$getHeight();
            }
            ,function (value) {
                this.$setHeight(value);
            }
        );
        /**
         * @private
         * 获取显示高度
         */
        p.$getHeight = function () {
            return this.$getTransformedBounds(this.$parent, lark.$TempRectangle).height;
        };
        /**
         * @private
         * 设置显示高度
         */
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
        d(p, "visible"
            /**
             * @language en_US
             * Whether or not the display object is visible. Display objects that are not visible are disabled. For example,
             * if visible=false for an DisplayObject instance, it cannot receive touch or other user input.
             * @default true
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 显示对象是否可见。不可见的显示对象将被禁用。例如，如果实例的 visible 为 false，则无法接受触摸或用户交互操作。
             * @default true
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$visible;
            }
            ,function (value) {
                value = !!value;
                if (value === this.$visible) {
                    return;
                }
                this.$visible = value;
                this.$invalidateTransform();
            }
        );
        d(p, "cacheAsBitmap"
            /**
             * @language en_US
             * If set to true, Lark runtime caches an internal bitmap representation of the display object. This caching can
             * increase performance for display objects that contain complex vector content. After you set the cacheAsBitmap
             * property to true, the rendering does not change, however the display object performs pixel snapping automatically.
             * The execution speed can be significantly faster depending on the complexity of the content.The cacheAsBitmap
             * property is best used with display objects that have mostly static content and that do not scale and rotate frequently.<br/>
             * Note: The display object will not create the bitmap caching when the memory exceeds the upper limit,even if you set it to true.
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 如果设置为 true，则 Lark 运行时将缓存显示对象的内部位图表示形式。此缓存可以提高包含复杂矢量内容的显示对象的性能。
             * 将 cacheAsBitmap 属性设置为 true 后，呈现并不更改，但是，显示对象将自动执行像素贴紧。执行速度可能会大大加快，
             * 具体取决于显示对象内容的复杂性。最好将 cacheAsBitmap 属性与主要具有静态内容且不频繁缩放或旋转的显示对象一起使用。<br/>
             * 注意：在内存超过上限的情况下，即使将 cacheAsBitmap 属性设置为 true，显示对象也不使用位图缓存。
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$DisplayObject[11 /* cacheAsBitmap */];
            }
            ,function (value) {
                value = !!value;
                this.$DisplayObject[11 /* cacheAsBitmap */] = value;
                var hasDisplayList = !!this.$displayList;
                if (hasDisplayList === value) {
                    return;
                }
                if (value) {
                    var displayList = lark.sys.DisplayList.create(this);
                    if (displayList) {
                        this.$displayList = displayList;
                        if (this.$parentDisplayList) {
                            displayList.setDevicePixelRatio(this.$parentDisplayList.$ratioMatrix.a);
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
         * @private
         * cacheAsBitmap属性改变
         */
        p.$cacheAsBitmapChanged = function () {
            var parentCache = this.$displayList || this.$parentDisplayList;
            if (this.$renderRegion) {
                parentCache.markDirty(this);
            }
            this.$propagateFlagsDown(16 /* InvalidConcatenatedMatrix */ | 32 /* InvalidInvertedConcatenatedMatrix */);
        };
        d(p, "alpha"
            /**
             * @language en_US
             * Indicates the alpha transparency value of the object specified. Valid values are 0 (fully transparent) to 1 (fully opaque).
             * The default value is 1. Display objects with alpha set to 0 are active, even though they are invisible.
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 表示指定对象的 Alpha 透明度值。
             * 有效值为 0（完全透明）到 1（完全不透明）。alpha 设置为 0 的显示对象是可触摸的，即使它们不可见。
             * @default 1
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$alpha;
            }
            ,function (value) {
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
         * @private
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
        d(p, "touchEnabled"
            /**
             * @language en_US
             * Specifies whether this object receives touch or other user input. The default value is true, which means that
             * by default any DisplayObject instance that is on the display list receives touch events. If touchEnabled is
             * set to false, the instance does not receive any touch events (or other user input events). Any children of
             * this instance on the display list are not affected. To change the touchEnabled behavior for all children of
             * an object on the display list, use DisplayObjectContainer.touchChildren.
             * @see lark.DisplayObjectContainer#touchChildren
             * @default true
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指定此对象是否接收触摸或其他用户输入。默认值为 true，这表示默认情况下，显示列表上的任何 isplayObject 实例都会接收触摸事件或
             * 其他用户输入事件。如果将 touchEnabled 设置为 false，则实例将不接收任何触摸事件（或其他用户输入事件）。显示列表上的该实例的任
             * 何子级都不会受到影响。要更改显示列表上对象的所有子级的 touchEnabled 行为，请使用 DisplayObjectContainer.touchChildren。
             * @see lark.DisplayObjectContainer#touchChildren
             * @default true
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$touchEnabled;
            }
            ,function (value) {
                this.$setTouchEnabled(!!value);
            }
        );
        /**
         * @private
         */
        p.$setTouchEnabled = function (value) {
            this.$touchEnabled = value;
        };
        d(p, "scrollRect"
            /**
             * @language en_US
             * The scroll rectangle bounds of the display object. The display object is cropped to the size defined by the rectangle,
             * and it scrolls within the rectangle when you change the x and y properties of the scrollRect object. A scrolled display
             * object always scrolls in whole pixel increments.You can scroll an object left and right by setting the x property of
             * the scrollRect Rectangle object. You can scroll an object up and down by setting the y property of the scrollRect
             * Rectangle object. If the display object is rotated 90° and you scroll it left and right, the display object actually
             * scrolls up and down.<br/>
             *
             * Note: to change the value of a display object's scrollRect, you must make a copy of the entire scrollRect object, then copy
             * the new object into the scrollRect property of the display object.
             * @example the following code increases the x value of a display object's scrollRect
             * <pre>
             *     var myRectangle:Rectangle = myDisplayObject.scrollRect;
             *     myRectangle.x += 10;
             *     myDisplayObject.scrollRect = myRectangle;
             * </pre>
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 显示对象的滚动矩形范围。显示对象被裁切为矩形定义的大小，当您更改 scrollRect 对象的 x 和 y 属性时，它会在矩形内滚动。
             * 滚动的显示对象始终以整像素为增量进行滚动。您可以通过设置 scrollRect Rectangle 对象的 x 属性来左右滚动对象， 还可以通过设置
             * scrollRect 对象的 y 属性来上下滚动对象。如果显示对象旋转了 90 度，并且您左右滚动它，则实际上显示对象会上下滚动。<br/>
             *
             * 注意：要改变一个显示对象 scrollRect 属性的值，您必引用整个 scrollRect 对象，然后将它重新赋值给显示对象的 scrollRect 属性。
             * @example 以下代码改变了显示对象 scrollRect 的 x 属性值：
             * <pre>
             *     var myRectangle:Rectangle = myDisplayObject.scrollRect;
             *     myRectangle.x += 10;
             *     myDisplayObject.scrollRect = myRectangle;
             * </pre>
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$scrollRect;
            }
            ,function (value) {
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
        d(p, "blendMode"
            /**
             * @language en_US
             * A value from the BlendMode class that specifies which blend mode to use. Determine how a source image (new one)
             * is drawn on the target image (old one).<br/>
             * If you attempt to set this property to an invalid value, Lark runtime set the value to BlendMode.NORMAL.
             * @default lark.BlendMode.NORMAL
             * @see lark.BlendMode
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * BlendMode 枚举中的一个值，用于指定要使用的混合模式，确定如何将一个源（新的）图像绘制到目标（已有）的图像上<br/>
             * 如果尝试将此属性设置为无效值，则运行时会将此值设置为 BlendMode.NORMAL。
             * @default lark.BlendMode.NORMAL
             * @see lark.BlendMode
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return lark.sys.numberToBlendMode(this.$blendMode);
            }
            ,function (value) {
                var mode = lark.sys.blendModeToNumber(value);
                if (mode === this.$blendMode) {
                    return;
                }
                this.$blendMode = mode;
                this.$invalidateTransform();
            }
        );
        d(p, "mask"
            /**
             * @language en_US
             * The calling display object is masked by the specified mask object. To ensure that masking works when the Stage
             * is scaled, the mask display object must be in an active part of the display list. The mask object itself is not drawn.
             * Set mask to null to remove the mask. To be able to scale a mask object, it must be on the display list. To be
             * able to drag a mask Sprite object , it must be on the display list.<br/>
             * Note: A single mask object cannot be used to mask more than one calling display object. When the mask is assigned
             * to a second display object, it is removed as the mask of the first object, and that object's mask property becomes null.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 调用显示对象被指定的 mask 对象遮罩。要确保当舞台缩放时蒙版仍然有效，mask 显示对象必须处于显示列表的活动部分。
             * 但不绘制 mask 对象本身。将 mask 设置为 null 可删除蒙版。要能够缩放遮罩对象，它必须在显示列表中。要能够拖动蒙版
             * Sprite 对象，它必须在显示列表中。<br/>
             * 注意：单个 mask 对象不能用于遮罩多个执行调用的显示对象。在将 mask 分配给第二个显示对象时，会撤消其作为第一个对象的遮罩，
             * 该对象的 mask 属性将变为 null。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$mask;
            }
            ,function (value) {
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
         * @language en_US
         * Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
         * @param targetCoordinateSpace The display object that defines the coordinate system to use.
         * @param resultRect A reusable instance of Rectangle for saving the results. Passing this parameter can reduce the number of reallocate objects
         *, which allows you to get better code execution performance..
         * @returns The rectangle that defines the area of the display object relative to the targetCoordinateSpace object's coordinate system.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回一个矩形，该矩形定义相对于 targetCoordinateSpace 对象坐标系的显示对象区域。
         * @param targetCoordinateSpace 定义要使用的坐标系的显示对象。
         * @param resultRect 一个用于存储结果的可复用Rectangle实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 定义与 targetCoordinateSpace 对象坐标系统相关的显示对象面积的矩形。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.getBounds = function (targetCoordinateSpace, resultRect) {
            targetCoordinateSpace = targetCoordinateSpace || this;
            return this.$getTransformedBounds(targetCoordinateSpace, resultRect);
        };
        /**
         * @private
         */
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
         * @language en_US
         * Converts the point object from the Stage (global) coordinates to the display object's (local) coordinates.
         * @param stageX the x value in the global coordinates
         * @param stageY the y value in the global coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns A Point object with coordinates relative to the display object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将从舞台（全局）坐标转换为显示对象的（本地）坐标。
         * @param stageX 舞台坐标x
         * @param stageY 舞台坐标y
         * @param resultPoint 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 具有相对于显示对象的坐标的 Point 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.globalToLocal = function (stageX, stageY, resultPoint) {
            var m = this.$getInvertedConcatenatedMatrix();
            return m.transformPoint(stageX, stageY, resultPoint);
        };
        /**
         * @language en_US
         * Converts the point object from the display object's (local) coordinates to the Stage (global) coordinates.
         * @param localX the x value in the local coordinates
         * @param localY the x value in the local coordinates
         * @param resultPoint A reusable instance of Point for saving the results. Passing this parameter can reduce the
         * number of reallocate objects, which allows you to get better code execution performance.
         * @returns  A Point object with coordinates relative to the Stage.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将显示对象的（本地）坐标转换为舞台（全局）坐标。
         * @param localX 本地坐标 x
         * @param localY 本地坐标 y
         * @param resultPoint 一个用于存储结果的可复用 Point 实例，传入此参数能够减少内部创建对象的次数，从而获得更高的运行性能。
         * @returns 一个具有相对于舞台坐标的 Point 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.localToGlobal = function (localX, localY, resultPoint) {
            var m = this.$getConcatenatedMatrix();
            return m.transformPoint(localX, localY, resultPoint);
        };
        /**
         * @private
         * 标记自身的测量尺寸失效
         */
        p.$invalidateContentBounds = function () {
            this.$invalidate();
            this.$setFlags(2 /* InvalidContentBounds */);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
        };
        /**
         * @private
         * 获取显示对象占用的矩形区域集合，通常包括自身绘制的测量区域，如果是容器，还包括所有子项占据的区域。
         */
        p.$getOriginalBounds = function () {
            var bounds = this.$DisplayObject[9 /* bounds */];
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
         * @private
         * 测量子项占用的矩形区域
         * 注意：此方法在渲染过程中调用，整个渲染过程中显示列表应该保持静止，要防止用户代码在渲染过程中对显示列表进行修改，渲染阶段不能抛出任何事件或执行任何回调函数。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        p.$measureChildBounds = function (bounds) {
        };
        /**
         * @private
         */
        p.$getContentBounds = function () {
            var bounds = this.$DisplayObject[10 /* contentBounds */];
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
         * @private
         * 测量自身占用的矩形区域，注意：此测量结果并不包括子项占据的区域。
         * 注意：此方法在渲染过程中调用，整个渲染过程中显示列表应该保持静止，要防止用户代码在渲染过程中对显示列表进行修改，渲染阶段不能抛出任何事件或执行任何回调函数。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        p.$measureContentBounds = function (bounds) {
        };
        /**
         * @private
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
         * @private
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
         * @private
         * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
         * 注意：此方法在渲染过程中调用，整个渲染过程中显示列表应该保持静止，要防止用户代码在渲染过程中对显示列表进行修改，渲染阶段不能抛出任何事件或执行任何回调函数。
         */
        p.$update = function () {
            this.$removeFlagsUp(768 /* Dirty */);
            this.$getConcatenatedAlpha();
            //必须在访问moved属性前调用以下两个方法，因为moved属性在以下两个方法内重置。
            var concatenatedMatrix = this.$getConcatenatedMatrix();
            var bounds = this.$getContentBounds();
            var displayList = this.$displayList || this.$parentDisplayList;
            var region = this.$renderRegion;
            if (!displayList) {
                region.setTo(0, 0, 0, 0);
                region.moved = false;
                return false;
            }
            if (!region.moved && !displayList.$ratioChanged) {
                return false;
            }
            region.moved = false;
            var matrix = this.$renderMatrix;
            matrix.copyFrom(concatenatedMatrix);
            var root = displayList.root;
            if (root !== this.$stage) {
                this.$getConcatenatedMatrixAt(root, matrix);
            }
            displayList.$ratioMatrix.$preMultiplyInto(matrix, matrix);
            region.updateRegion(bounds, matrix);
            return true;
        };
        /**
         * @private
         * 获取相对于指定根节点的连接矩阵。
         * @param root 根节点显示对象
         * @param matrix 目标显示对象相对于舞台的完整连接矩阵。
         */
        p.$getConcatenatedMatrixAt = function (root, matrix) {
            var invertMatrix = root.$getInvertedConcatenatedMatrix();
            if (invertMatrix.a === 0 || invertMatrix.d === 0) {
                var target = this;
                var rootLevel = root.$nestLevel;
                matrix.identity();
                while (target.$nestLevel > rootLevel) {
                    var rect = target.$scrollRect;
                    if (rect) {
                        matrix.concat(lark.$TempMatrix.setTo(1, 0, 0, 1, -rect.x, -rect.y));
                    }
                    matrix.concat(target.$getMatrix());
                    target = target.$parent;
                }
            }
            else {
                invertMatrix.$preMultiplyInto(matrix, matrix);
            }
        };
        /**
         * @private
         * 执行渲染,绘制自身到屏幕。
         * 注意：此方法在渲染过程中调用，整个渲染过程中显示列表应该保持静止，要防止用户代码在渲染过程中对显示列表进行修改，渲染阶段不能抛出任何事件或执行任何回调函数。
         */
        p.$render = function (context) {
        };
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
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
                    if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                        return null;
                    }
                }
                return this;
            }
            return null;
        };
        /**
         * @private
         */
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
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
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
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.emit = function (event) {
            if (!event.$bubbles) {
                return _super.prototype.emit.call(this, event);
            }
            var list = this.$getPropagationList(this);
            var targetIndex = list.length * 0.5;
            event.$setTarget(this);
            this.$emitPropagationEvent(event, list, targetIndex);
            return !event.$isDefaultPrevented;
        };
        /**
         * @private
         * 获取事件流列表。注意：Lark框架的事件流与Flash实现并不一致。
         *
         * 事件流有三个阶段：捕获，目标，冒泡。
         * Flash里默认的的事件监听若不开启useCapture将监听目标和冒泡阶段。若开始capture将只能监听捕获当不包括目标的事件。
         * 可以在Flash中写一个简单的测试：实例化一个非容器显示对象，例如TextField。分别监听useCapture为true和false时的鼠标事件。
         * 点击后将只有useCapture为false的回调函数输出信息。也就带来一个问题「Flash的捕获阶段不能监听到最内层对象本身，只在父级列表有效」。
         *
         * 而HTML里的事件流设置useCapture为true时是能监听到目标阶段的，也就是目标阶段会被触发两次，在捕获和冒泡过程各触发一次。这样可以避免
         * 前面提到的监听捕获无法监听目标本身的问题。
         *
         * Lark最终采用了HTML里目标节点触发两次的事件流方式。
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
        /**
         * @private
         */
        p.$emitPropagationEvent = function (event, list, targetIndex) {
            var length = list.length;
            var captureIndex = targetIndex - 1;
            for (var i = 0; i < length; i++) {
                var currentTarget = list[i];
                event.$currentTarget = currentTarget;
                if (i < captureIndex)
                    event.$eventPhase = 1 /* CAPTURING_PHASE */;
                else if (i == targetIndex || i == captureIndex)
                    event.$eventPhase = 2 /* AT_TARGET */;
                else
                    event.$eventPhase = 3 /* BUBBLING_PHASE */;
                currentTarget.$notifyListener(event, i < targetIndex);
                if (event.$isPropagationStopped || event.$isPropagationImmediateStopped) {
                    return;
                }
            }
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.willTrigger = function (type) {
            var parent = this;
            while (parent) {
                if (parent.hasListener(type))
                    return true;
                parent = parent.$parent;
            }
            return false;
        };
        /**
         * @private
         */
        DisplayObject.$enterFrameCallBackList = [];
        /**
         * @private
         */
        DisplayObject.$renderCallBackList = [];
        return DisplayObject;
    })(lark.EventEmitter);
    lark.DisplayObject = DisplayObject;
    lark.registerClass(DisplayObject,"lark.DisplayObject",["lark.sys.Renderable"]);
    if (DEBUG) {
        lark.$markReadOnly(DisplayObject, "parent");
        lark.$markReadOnly(DisplayObject, "stage");
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
    var localPoint = new lark.Point();
    /**
     * @language en_US
     * The TouchEvent class lets you handle events on devices that detect user contact with the device (such as a finger
     * on a touch screen).When a user interacts with a device such as a mobile phone or tablet with a touch screen, the
     * user typically touches the screen with his or her fingers or a pointing device. You can develop applications that
     * respond to basic touch events (such as a single finger tap) with the TouchEvent class. Create event listeners using
     * the event types defined in this class.
     * Note: When objects are nested on the display list, touch events target the deepest possible nested object that is
     * visible in the display list. This object is called the target node. To have a target node's ancestor (an object
     * containing the target node in the display list) receive notification of a touch event, use EventEmitter.on()
     * on the ancestor node with the type parameter set to the specific touch event you want to detect.
     *
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/TouchEventExample.ts
     */
    /**
     * @language zh_CN
     * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
     * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
     * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
     * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
     * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
     * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
     *
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/events/TouchEventExample.ts
     */
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        /**
         * @language en_US
         * Creates an Event object that contains information about touch events.
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param stageX The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @param stageY The vertical coordinate at which the event occurred in global Stage coordinates.
         * @param touchPointID A unique identification number assigned to the touch point.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 TouchEvent 对象，其中包含有关Touch事件的信息
         * @param type 事件的类型，可以作为 Event.type 访问。
         * @param bubbles 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
         * @param cancelable 确定是否可以取消 Event 对象。默认值为 false。
         * @param stageX 事件发生点在全局舞台坐标系中的水平坐标
         * @param stageY 事件发生点在全局舞台坐标系中的垂直坐标
         * @param touchPointID 分配给触摸点的唯一标识号
         * @version Lark 1.0
         * @platform Web,Native
         */
        function TouchEvent(type, bubbles, cancelable, stageX, stageY, touchPointID) {
            _super.call(this, type, bubbles, cancelable);
            this.targetChanged = true;
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
        d(p, "stageX"
            /**
             * @language en_US
             * The horizontal coordinate at which the event occurred in global Stage coordinates.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 事件发生点在全局舞台坐标中的水平坐标。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$stageX;
            }
        );
        d(p, "stageY"
            /**
             * @language en_US
             * The vertical coordinate at which the event occurred in global Stage coordinates.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 事件发生点在全局舞台坐标中的垂直坐标。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$stageY;
            }
        );
        d(p, "localX"
            /**
             * @language en_US
             * The horizontal coordinate at which the event occurred relative to the display object.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 事件发生点相对于所属显示对象的水平坐标。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.targetChanged) {
                    this.getLocalXY();
                }
                return this._localX;
            }
        );
        d(p, "localY"
            /**
             * @language en_US
             * The vertical coordinate at which the event occurred relative to the display object.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 事件发生点相对于所属显示对象的垂直坐标。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                if (this.targetChanged) {
                    this.getLocalXY();
                }
                return this._localY;
            }
        );
        /**
         * @private
         */
        p.getLocalXY = function () {
            this.targetChanged = false;
            var m = this.$target.$getInvertedConcatenatedMatrix();
            m.transformPoint(this.$stageX, this.$stageY, localPoint);
            this._localX = localPoint.x;
            this._localY = localPoint.y;
        };
        p.$setTarget = function (target) {
            this.$target = target;
            this.targetChanged = !!target;
        };
        /**
         * @language en_US
         * Instructs Lark runtime to render after processing of this event completes, if the display list has been modified.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 如果已修改显示列表，调用此方法将会忽略帧频限制，在此事件处理完成后立即重绘屏幕。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.updateAfterEvent = function () {
            lark.sys.$requestRenderingFlag = true;
        };
        /**
         * @language en_US
         * uses a specified target to emit an event. Using this method can reduce the number of
         * reallocate event objects, which allows you to get better code execution performance.
         * @param target the event target
         * @param type  The type of the event, accessible as Event.type.
         * @param bubbles  Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false.
         * @param cancelable Determines whether the Event object can be canceled. The default values is false.
         * @param stageX The horizontal coordinate at which the event occurred in global Stage coordinates.
         * @param stageY The vertical coordinate at which the event occurred in global Stage coordinates.
         * @param touchPointID A unique identification number (as an int) assigned to the touch point.
         *
         * @see lark.Event.create()
         * @see lark.Event.release()
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
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
         * @platform Web,Native
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
         * @language en_US
         * Emitted when the user touches the device, and is continuously emitted until the point of contact is removed.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户触碰设备时进行调度，而且会连续调度，直到接触点被删除。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TouchEvent.TOUCH_MOVE = "touchMove";
        /**
         * @language en_US
         * Emitted when the user first contacts a touch-enabled device (such as touches a finger to a mobile phone or tablet with a touch screen).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户第一次触摸启用触摸的设备时（例如，用手指触摸配有触摸屏的移动电话或平板电脑）调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TouchEvent.TOUCH_BEGIN = "touchBegin";
        /**
         * @language en_US
         * Emitted when the user removes contact with a touch-enabled device (such as lifts a finger off a mobile phone
         * or tablet with a touch screen).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户移除与启用触摸的设备的接触时（例如，将手指从配有触摸屏的移动电话或平板电脑上抬起）调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TouchEvent.TOUCH_END = "touchEnd";
        /**
         * @language en_US
         * Emitted when the user lifts the point of contact over the same DisplayObject instance on which the contact
         * was initiated on a touch-enabled device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户在触摸设备上与开始触摸的同一 DisplayObject 实例上抬起接触点时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TouchEvent.TOUCH_TAP = "touchTap";
        /**
         * @language en_US
         * Emitted when the user lifts the point of contact over the different DisplayObject instance on which the contact
         * was initiated on a touch-enabled device (such as presses and releases a finger from a single point over a display
         * object on a mobile phone or tablet with a touch screen).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当用户在触摸设备上与开始触摸的不同 DisplayObject 实例上抬起接触点时调度。
         * @version Lark 1.0
         * @platform Web,Native
         */
        TouchEvent.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        return TouchEvent;
    })(lark.Event);
    lark.TouchEvent = TouchEvent;
    lark.registerClass(TouchEvent,"lark.TouchEvent");
    if (DEBUG) {
        lark.$markReadOnly(TouchEvent, "stageX");
        lark.$markReadOnly(TouchEvent, "stageY");
        lark.$markReadOnly(TouchEvent, "localX");
        lark.$markReadOnly(TouchEvent, "localY");
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
     * @language en_US
     * This class is used to create lightweight shapes using the drawing application program interface (API). The Shape
     * class includes a graphics property, which lets you access methods from the Graphics class.
     * @see lark.Graphics
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/ShapeExample.ts
     */
    /**
     * @language zh_CN
     * 此类用于使用绘图应用程序编程接口 (API) 创建简单形状。Shape 类含有 graphics 属性，通过该属性您可以访问各种矢量绘图方法。
     * @see lark.Graphics
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/ShapeExample.ts
     */
    var Shape = (function (_super) {
        __extends(Shape, _super);
        /**
         * @language en_US
         * Creates a new Shape object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Shape 对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        function Shape() {
            _super.call(this);
            this.$graphics = new lark.Graphics();
            this.$graphics.$targetDisplay = this;
            this.$renderRegion = new lark.sys.Region();
        }
        var d = __define,c=Shape;p=c.prototype;
        d(p, "graphics"
            /**
             * @language en_US
             * Specifies the Graphics object belonging to this Shape object, where vector drawing commands can occur.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  获取 Shape 中的 Graphics 对象。可通过此对象执行矢量绘图命令。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$graphics;
            }
        );
        p.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target) {
                target = this.$graphics.$hitTest(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            this.$graphics.$measureContentBounds(bounds);
        };
        /**
         * @private
         */
        p.$render = function (context) {
            this.$graphics.$render(context, false);
        };
        return Shape;
    })(lark.DisplayObject);
    lark.Shape = Shape;
    lark.registerClass(Shape,"lark.Shape");
    if (DEBUG) {
        lark.$markReadOnly(Shape, "graphics");
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
     * @language en_US
     * The Bitmap class represents display objects that represent bitmap images.
     * The Bitmap() constructor allows you to create a Bitmap object that contains a reference to a BitmapData object.
     * After you create a Bitmap object, use the addChild() or addChildAt() method of the parent DisplayObjectContainer
     * instance to place the bitmap on the display list.A Bitmap object can share its BitmapData reference among several
     * Bitmap objects, independent of translation or rotation properties. Because you can create multiple Bitmap objects
     * that reference the same BitmapData object, multiple display objects can use the same complex BitmapData object
     * without incurring the memory overhead of a BitmapData object for each display object instance.
     *
     * @see lark.BitmapData
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/BitmapExample.ts
     */
    /**
     * @language zh_CN
     * Bitmap 类表示用于显示位图图片的显示对象。
     * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象引用的 Bitmap 对象。创建了 Bitmap 对象后，
     * 使用父级 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法可以将位图放在显示列表中。
     * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与缩放或旋转属性无关。
     * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的 BitmapData 对象，
     * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生额外内存开销。
     *
     * @see lark.BitmapData
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/BitmapExample.ts
     */
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        /**
         * @language en_US
         * Initializes a Bitmap object to refer to the specified BitmapData object.
         * @param bitmapData The BitmapData object being referenced.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个引用指定 BitmapData 实例的 Bitmap 对象
         * @param bitmapData 被引用的 BitmapData 实例
         * @version Lark 1.0
         * @platform Web,Native
         */
        function Bitmap(bitmapData) {
            _super.call(this);
            /**
             * @private
             */
            this.$smoothing = true;
            this._pixelHitTest = false;
            this.$renderRegion = new lark.sys.Region();
            this.bitmapData = bitmapData;
        }
        var d = __define,c=Bitmap;p=c.prototype;
        d(p, "bitmapData"
            /**
             * @language en_US
             * bitmapData The BitmapData object being referenced.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 被引用的 BitmapData 对象。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$bitmapData;
            }
            ,function (value) {
                this.$setBitmapData(value);
            }
        );
        /**
         * @private
         */
        p.$setBitmapData = function (value) {
            if (value == this.$bitmapData) {
                return;
            }
            this.$bitmapData = value;
            this.$invalidateContentBounds();
        };
        d(p, "smoothing"
            /**
             * @language en_US
             * Whether or not the bitmap is smoothed when scaled.
             * @default true。
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 控制在缩放时是否对位图进行平滑处理。
             * @default true。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$smoothing;
            }
            ,function (value) {
                value = !!value;
                if (value === this.$smoothing) {
                    return;
                }
                this.$smoothing = value;
                this.$invalidate();
            }
        );
        d(p, "pixelHitTest"
            /**
             * @language en_US
             * Specifies whether this object use precise hit testing by checking the alpha value of each pixel.If pixelHitTest
             * is set to true,the transparent area of the bitmap will be touched through.
             * Note:If the image is loaded from cross origin,that we can't access to the pixel data,so it might cause
             * the pixelHitTest property invalid.
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 是否开启精确像素碰撞。设置为true显示对象本身的透明区域将能够被穿透。<br/>
             * 注意：若图片资源是以跨域方式从外部服务器加载的，将无法访问图片的像素数据，而导致此属性失效。
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this._pixelHitTest;
            }
            ,function (value) {
                this._pixelHitTest = !!value;
            }
        );
        p.$hitTest = function (stageX, stageY) {
            var target = _super.prototype.$hitTest.call(this, stageX, stageY);
            if (target && this._pixelHitTest) {
                target = this.hitTestPixel(stageX, stageY);
            }
            return target;
        };
        /**
         * @private
         */
        p.hitTestPixel = function (stageX, stageY) {
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
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
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            var bitmapData = this.$bitmapData;
            if (bitmapData) {
                bounds.setTo(0, 0, bitmapData.width, bitmapData.height);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         */
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
    lark.registerClass(Bitmap,"lark.Bitmap");
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
     * @language en_US
     * The Sprite class is a basic display list building block: a display list node that can contain children.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/SpriteExample.ts
     */
    /**
     * @language zh_CN
     * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/SpriteExample.ts
     */
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        /**
         * @language en_US
         * Creates a new Sprite instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 实例化一个容器
         * @version Lark 1.0
         * @platform Web,Native
         */
        function Sprite() {
            _super.call(this);
            this.$touchChildren = true;
            this.$children = [];
        }
        var d = __define,c=Sprite;p=c.prototype;
        /**
         * @private
         */
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
        d(p, "numChildren"
            /**
             * @inheritDoc
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$children.length;
            }
        );
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.addChild = function (child) {
            var index = this.$children.length;
            if (child.$parent == this)
                index--;
            return this.doAddChild(child, index);
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
        /**
         * @private
         */
        p.doAddChild = function (child, index) {
            if (DEBUG) {
                if (child == this) {
                    lark.$error(1005);
                }
                else if (lark.is(child, "lark.DisplayObjectContainer") && child.contains(this)) {
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.getChildIndex = function (child) {
            return this.$children.indexOf(child);
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
        /**
         * @private
         */
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
            this.assignParentDisplayList(child, displayList, null);
            child.$propagateFlagsDown(624 /* DownOnAddedOrRemoved */);
            child.$setParent(null);
            children.splice(index, 1);
            this.$propagateFlagsUp(4 /* InvalidBounds */);
            return child;
        };
        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.setChildIndex = function (child, index) {
            index = +index | 0;
            if (index < 0 || index >= this.$children.length) {
                index = this.$children.length - 1;
            }
            this.doSetChildIndex(child, index);
        };
        /**
         * @private
         */
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
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
        /**
         * @private
         */
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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.removeChildren = function () {
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.doRemoveChild(i);
            }
        };
        /**
         * @private
         * 一个子项被添加到容器内，此方法不仅在操作addChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        p.$childAdded = function (child, index) {
        };
        /**
         * @private
         * 一个子项从容器内移除，此方法不仅在操作removeChild()时会被回调，在操作setChildIndex()或swapChildren时也会回调。
         * 当子项索引发生改变时，会先触发$childRemoved()方法，然后触发$childAdded()方法。
         */
        p.$childRemoved = function (child, index) {
        };
        /**
         * @private
         */
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
        /**
         * @private
         *
         */
        p.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var children = this.$children;
            var length = children.length;
            for (var i = 0; i < length; i++) {
                var child = children[i];
                child.$onRemoveFromStage();
            }
        };
        /**
         * @private
         */
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
        d(p, "touchChildren"
            /**
             * @inheritDoc
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$touchChildren;
            }
            ,function (value) {
                this.$setTouchChildren(!!value);
            }
        );
        /**
         * @private
         */
        p.$setTouchChildren = function (value) {
            this.$touchChildren = value;
        };
        /**
         * @private
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
         * @private
         * 标记自身以及所有子项在父级中变换叠加的显示内容失效。此方法不会触发自身的cacheAsBitmap重绘。
         * 通常用于矩阵改变或从显示列表添加和移除时。若自身的显示内容已经改变需要重绘，应该调用$invalidate()。
         */
        p.$invalidateTransform = function () {
            this.markChildDirty(this, this.$parentDisplayList);
        };
        /**
         * @private
         */
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
         * @private
         */
        p.$cacheAsBitmapChanged = function () {
            _super.prototype.$cacheAsBitmapChanged.call(this);
            var cacheRoot = this.$displayList || this.$parentDisplayList;
            var children = this.$children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.assignParentDisplayList(children[i], cacheRoot, cacheRoot);
            }
        };
        /**
         * @private
         */
        p.assignParentDisplayList = function (child, parentCache, newParent) {
            child.$parentDisplayList = newParent;
            child.$setFlags(512 /* DirtyChildren */);
            var displayList = child.$displayList;
            if ((child.$renderRegion || displayList) && parentCache) {
                parentCache.markDirty(displayList || child);
            }
            if (displayList) {
                return;
            }
            var children = child.$children;
            if (children) {
                for (var i = children.length - 1; i >= 0; i--) {
                    this.assignParentDisplayList(children[i], parentCache, newParent);
                }
            }
        };
        /**
         * @private
         */
        p.$hitTest = function (stageX, stageY) {
            if (!this.$visible) {
                return null;
            }
            var m = this.$getInvertedConcatenatedMatrix();
            var localX = m.a * stageX + m.c * stageY + m.tx;
            var localY = m.b * stageX + m.d * stageY + m.ty;
            if (this.$scrollRect && !this.$scrollRect.contains(localX, localY)) {
                return null;
            }
            if (this.$mask && !this.$mask.$hitTest(stageX, stageY)) {
                return null;
            }
            var children = this.$children;
            var found = false;
            for (var i = children.length - 1; i >= 0; i--) {
                var child = children[i];
                if (child.$maskedObject) {
                    continue;
                }
                var target = child.$hitTest(stageX, stageY);
                if (target) {
                    found = true;
                    if (target.$touchEnabled) {
                        break;
                    }
                    else {
                        target = null;
                    }
                }
            }
            if (target) {
                if (this.$touchChildren) {
                    return target;
                }
                return this;
            }
            if (found) {
                return this;
            }
            return _super.prototype.$hitTest.call(this, stageX, stageY);
        };
        /**
         * @private
         */
        Sprite.$EVENT_ADD_TO_STAGE_LIST = [];
        /**
         * @private
         */
        Sprite.$EVENT_REMOVE_FROM_STAGE_LIST = [];
        return Sprite;
    })(lark.DisplayObject);
    lark.Sprite = Sprite;
    lark.registerClass(Sprite,"lark.Sprite",["lark.DisplayObjectContainer"]);
    if (DEBUG) {
        lark.$markReadOnly(Sprite, "numChildren");
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
    var SplitRegex = new RegExp("(?=[\u00BF-\u1FFF\u2C00-\uD7FF]|\b|\s)(?![。，！、》…）)}”】\.\,\!\?\]\:])");
    /**
     * @language en_US
     * The TextField class is used to create display objects for text display. You can use the methods and properties of
     * the TextField class to manipulate it.<br/>
     * In TextField, three character sequences are recognized as explicit line breaks: CR ("\r"), LF ("\n"), and CR+LF ("\r\n").<br/>
     * If you don't specify any kind of width for a TextField, then the longest line, as determined by these explicit line
     * breaks, determines the width of the TextField.<br/>
     * If you do specify some kind of width, then the specified text is word-wrapped at the right edge of the component's
     * bounds, because the default value of the wordWrap is true. If the text extends below the bottom of the component, it is clipped.<br/>
     * To disable this automatic wrapping, set the wordWrap to false. Then lines are broken only where the text contains
     * an explicit line break, and the ends of lines extending past the right edge is clipped.
     * @see lark.TextInput
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/text/TextFieldExample.ts
     */
    /**
     * @language zh_CN
     * TextField 类用于创建显示对象以显示文本。可以使用 TextField 类的方法和属性对文本字段进行操作。<br/>
     * 在 TextField 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。<br/>
     * 如果没有为 TextField 指定宽度，则由这些显式换行符确定的最长行确定 TextField 的宽度。<br/>
     * 如果指定了某个宽度，则指定文本将在组件边界的右边缘换行，因为 wordWrap 的默认值为 true。如果文本扩展到低于组件底部，则将被剪切。<br/>
     * 要禁用此自动换行，请将 wordWrap 设置为 false。这样的话，只有 text 包含显式换行符时才会换行，且将剪切超过右边缘的行尾。
     * @see lark.TextInput
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/text/TextFieldExample.ts
     */
    var TextField = (function (_super) {
        __extends(TextField, _super);
        /**
         * @language en_US
         * Creates a new TextField instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个TextField对象
         * @version Lark 1.0
         * @platform Web,Native
         */
        function TextField(text) {
            _super.call(this);
            /**
             * @private
             */
            this.textLines = [];
            this.$renderRegion = new lark.sys.Region();
            this.$TextField = {
                0: 30,
                1: 0,
                2: 0x000000,
                3: NaN,
                4: NaN,
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
        d(p, "fontFamily"
            /**
             * @language en_US
             * The name of the font to use, or a comma-separated list of font names.
             * @default "sans-serif"
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 要使用的字体的名称或用逗号分隔的字体名称列表。
             * @default "sans-serif"
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[8 /* fontFamily */];
            }
            ,function (value) {
                var values = this.$TextField;
                if (values[8 /* fontFamily */] == value) {
                    return;
                }
                values[8 /* fontFamily */] = value;
                this.invalidateFontString();
            }
        );
        d(p, "fontSize"
            /**
             * @language en_US
             * The size in pixels of text
             * @default 30
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本的字号大小。
             * @default 30
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[0 /* fontSize */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$TextField;
                if (values[0 /* fontSize */] === value) {
                    return;
                }
                values[0 /* fontSize */] = value;
                this.invalidateFontString();
            }
        );
        d(p, "bold"
            /**
             * @language en_US
             * Specifies whether the text is boldface.
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 是否显示为粗体。
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[15 /* bold */];
            }
            ,function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value === values[15 /* bold */]) {
                    return;
                }
                values[15 /* bold */] = value;
                this.invalidateFontString();
            }
        );
        d(p, "italic"
            /**
             * @language en_US
             * Determines whether the text is italic font.
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 是否显示为斜体。
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[16 /* italic */];
            }
            ,function (value) {
                value = !!value;
                var values = this.$TextField;
                if (value === values[16 /* italic */]) {
                    return;
                }
                values[16 /* italic */] = value;
                this.invalidateFontString();
            }
        );
        /**
         * @private
         *
         */
        p.invalidateFontString = function () {
            this.$TextField[17 /* fontStringChanged */] = true;
            this.$invalidateContentBounds();
        };
        /**
         * @private
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
        d(p, "textAlign"
            /**
             * @language en_US
             * Horizontal alignment of text.
             * @default：lark.HorizontalAlign.LEFT
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本的水平对齐方式。
             * @default：lark.HorizontalAlign.LEFT
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[9 /* textAlign */];
            }
            ,function (value) {
                var values = this.$TextField;
                if (values[9 /* textAlign */] == value) {
                    return;
                }
                values[9 /* textAlign */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "verticalAlign"
            /**
             * @language en_US
             * Vertical alignment of text.
             * @default：lark.VerticalAlign.TOP
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文字的垂直对齐方式。
             * @default：lark.VerticalAlign.TOP
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[10 /* verticalAlign */];
            }
            ,function (value) {
                var values = this.$TextField;
                if (values[10 /* verticalAlign */] == value) {
                    return;
                }
                values[10 /* verticalAlign */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "lineSpacing"
            /**
             * @language en_US
             * An integer representing the amount of vertical space between lines.
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个整数，表示行与行之间的垂直间距量
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[1 /* lineSpacing */];
            }
            ,function (value) {
                value = +value || 0;
                var values = this.$TextField;
                if (values[1 /* lineSpacing */] === value)
                    return;
                values[1 /* lineSpacing */] = value;
                this.$invalidateContentBounds();
            }
        );
        d(p, "textColor"
            /**
             * @language en_US
             * Color of the text.
             * @default 0x000000
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 文本颜色
             * @default 0x000000
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[2 /* textColor */];
            }
            ,function (value) {
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
        d(p, "wordWrap"
            /**
             * @language en_US
             * A Boolean value that indicates whether the text field has word wrap. If the value of wordWrap is true, the text
             * field has word wrap; if the value is false, the text field does not have word wrap.
             * @default true
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个布尔值，表示文本字段是否自动换行。如果 wordWrap 的值为 true，则该文本字段自动换行；
             * 如果值为 false，则该文本字段不自动换行,如果同时显式设置过宽度，超出宽度的部分将被截断。
             * @default true
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[19 /* wordWrap */];
            }
            ,function (value) {
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
        d(p, "text"
            /**
             * @language en_US
             * A string to display in the text field.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 要显示的文本内容
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[13 /* text */];
            }
            ,function (value) {
                if (value === null || value === undefined) {
                    value = "";
                }
                value = value + "";
                this.$setText(value);
            }
        );
        /**
         * @private
         */
        p.$setText = function (value) {
            var values = this.$TextField;
            if (value == values[13 /* text */])
                return;
            values[13 /* text */] = value;
            this.$invalidateContentBounds();
        };
        d(p, "numLines"
            /**
             * @language en_US
             * Defines the number of text lines in a multiline text field. If wordWrap property is set to true, the number of
             * lines increases when text wraps.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  定义多行文本字段中的文本行数。如果 wordWrap 属性设置为 true，则在文本自动换行时会增加行数。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.textLines.length;
            }
        );
        d(p, "textWidth"
            /**
             * @language en_US
             * The width of the text in pixels.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  文本内容宽度
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                this.updateTextLines();
                return this.$TextField[5 /* textWidth */];
            }
        );
        d(p, "textHeight"
            /**
             * @language en_US
             * The height of the text in pixels.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             *  文本内容高度
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                this.updateTextLines();
                return this.$TextField[6 /* textHeight */];
            }
        );
        /**
         * @private
         */
        p.$getWidth = function () {
            var w = this.$TextField[3 /* textFieldWidth */];
            return isNaN(w) ? this.$getContentBounds().width : w;
        };
        /**
         * @private
         */
        p.$setWidth = function (value) {
            value = +value;
            var values = this.$TextField;
            if (value < 0 || value === values[3 /* textFieldWidth */]) {
                return;
            }
            values[3 /* textFieldWidth */] = value;
            this.$invalidateContentBounds();
        };
        /**
         * @private
         */
        p.$getHeight = function () {
            var h = this.$TextField[4 /* textFieldHeight */];
            return isNaN(h) ? this.$getContentBounds().height : h;
        };
        /**
         * @private
         */
        p.$setHeight = function (value) {
            value = +value;
            var values = this.$TextField;
            if (value < 0 || value === values[4 /* textFieldHeight */]) {
                return;
            }
            values[4 /* textFieldHeight */] = value;
            this.$invalidateContentBounds();
        };
        /**
         * @private
         */
        p.$invalidateContentBounds = function () {
            _super.prototype.$invalidateContentBounds.call(this);
            this.$TextField[18 /* textLinesChanged */] = true;
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            this.updateTextLines();
            var values = this.$TextField;
            var height;
            if (isNaN(values[4 /* textFieldHeight */])) {
                height = values[6 /* textHeight */];
            }
            else {
                height = values[4 /* textFieldHeight */];
                var lineHeight = values[0 /* fontSize */] + 4;
                if (height < lineHeight) {
                    height = lineHeight;
                }
            }
            var width = isNaN(values[3 /* textFieldWidth */]) ? values[5 /* textWidth */] : values[3 /* textFieldWidth */];
            if (width < values[7 /* textDrawWidth */]) {
                width = values[7 /* textDrawWidth */];
            }
            bounds.setTo(0, 0, width, height);
        };
        /**
         * @private
         */
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
            var hasHeightSet = !isNaN(values[4 /* textFieldHeight */]);
            var explicitHeight = hasHeightSet ? values[4 /* textFieldHeight */] : Number.POSITIVE_INFINITY;
            if (hasHeightSet && textHeight < explicitHeight) {
                var vAlign = 0;
                if (values[10 /* verticalAlign */] == lark.VerticalAlign.MIDDLE)
                    vAlign = 0.5;
                else if (values[10 /* verticalAlign */] == lark.VerticalAlign.BOTTOM)
                    vAlign = 1;
                drawY += vAlign * (explicitHeight - textHeight);
            }
            var roundOff = drawY;
            drawY = Math.round(drawY);
            roundOff = drawY - roundOff;
            var hAlign = 0;
            if (values[9 /* textAlign */] == lark.HorizontalAlign.CENTER) {
                hAlign = 0.5;
            }
            else if (values[9 /* textAlign */] == lark.HorizontalAlign.RIGHT) {
                hAlign = 1;
            }
            var measuredWidths = values[14 /* measuredWidths */];
            var maxWidth;
            if (isNaN(values[3 /* textFieldWidth */])) {
                maxWidth = values[5 /* textWidth */];
            }
            else {
                maxWidth = values[3 /* textFieldWidth */];
            }
            var maxYPos = explicitHeight - 2 + roundOff;
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
        /**
         * @private
         */
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
            var hasWidthSet = !isNaN(textFieldWidth);
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
        /**
         * @private
         */
        p.$splitWords = function (line) {
            return line.split(SplitRegex);
        };
        return TextField;
    })(lark.DisplayObject);
    lark.TextField = TextField;
    lark.registerClass(TextField,"lark.TextField");
    /**
     * @private
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
})(lark || (lark = {}));
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        /**
         * @private
         * 返回格式化的字体样式文本
         */
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
        /**
         * @private
         * 返回字符串形式的颜色值
         */
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
        if (DEBUG) {
            lark.$markReadOnly(lark.TextField, "numLines");
            lark.$markReadOnly(lark.TextField, "textWidth");
            lark.$markReadOnly(lark.TextField, "textHeight");
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
var lark;
(function (lark) {
    var sys;
    (function (sys) {
        var displayListPool = [];
        var blendModes = ["source-over", "lighter", "destination-out"];
        var defaultCompositeOp = "source-over";
        /**
         * @private
         * 显示列表
         */
        var DisplayList = (function (_super) {
            __extends(DisplayList, _super);
            /**
             * @private
             * 创建一个DisplayList对象
             */
            function DisplayList(root) {
                _super.call(this);
                /**
                 * @private
                 * 是否需要重绘
                 */
                this.$isDirty = false;
                /**
                 * @private
                 * 在舞台上的透明度
                 */
                this.$renderAlpha = 1;
                /**
                 * @private
                 * 相对于显示列表根节点或位图缓存根节点的矩阵对象
                 */
                this.$renderMatrix = new lark.Matrix();
                this.$ratioMatrix = new lark.Matrix();
                this.$ratioChanged = false;
                this.$pixelRatio = 1;
                /**
                 * @private
                 * 在显示列表根节点或位图缓存根节点上的显示区域
                 */
                this.$renderRegion = new sys.Region();
                /**
                 * @private
                 * 呈现绘制结果的目标画布
                 */
                this.surface = null;
                /**
                 * @private
                 */
                this.offsetX = 0;
                /**
                 * @private
                 */
                this.offsetY = 0;
                /**
                 * @private
                 */
                this.needRedraw = false;
                /**
                 * @private
                 */
                this.rootMatrix = new lark.Matrix();
                /**
                 * @private
                 * 显示对象的渲染节点发生改变时，把自身的IRenderable对象注册到此列表上。
                 */
                this.dirtyNodes = {};
                /**
                 * @private
                 */
                this.dirtyNodeList = [];
                /**
                 * @private
                 */
                this.dirtyList = null;
                /**
                 * @private
                 */
                this.dirtyRegion = new sys.DirtyRegion();
                /**
                 * @private
                 * 表示目标Surface首次被使用。
                 */
                this.sizeChanged = true;
                this.root = root;
            }
            var d = __define,c=DisplayList;p=c.prototype;
            /**
             * @private
             * 释放一个DisplayList实例到对象池
             */
            DisplayList.release = function (displayList) {
                sys.surfaceFactory.release(displayList.surface);
                lark.Matrix.release(displayList.$renderMatrix);
                lark.Matrix.release(displayList.$ratioMatrix);
                displayList.surface = null;
                displayList.renderContext = null;
                displayList.root = null;
                displayList.$renderMatrix = null;
                displayList.$ratioMatrix = null;
                displayList.needRedraw = false;
                displayList.$isDirty = false;
                displayListPool.push(displayList);
            };
            /**
             * @private
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
                displayList.root = target;
                displayList.$renderMatrix = lark.Matrix.create();
                displayList.$renderMatrix.setTo(1, 0, 0, 1, 0, 0);
                displayList.$pixelRatio = 1;
                displayList.$ratioMatrix = lark.Matrix.create();
                displayList.$ratioMatrix.setTo(1, 0, 0, 1, 0, 0);
                displayList.needRedraw = true;
                displayList.$isDirty = true;
                return displayList;
            };
            /**
             * @private
             * 更新对象在舞台上的显示区域和透明度,返回显示区域是否发生改变。
             */
            p.$update = function () {
                var target = this.root;
                //当cache对象的显示列表已经加入dirtyList，对象又取消cache的时候，root为空
                if (target == null) {
                    return false;
                }
                target.$removeFlagsUp(768 /* Dirty */);
                this.$renderAlpha = target.$getConcatenatedAlpha();
                //必须在访问moved属性前调用以下两个方法，因为moved属性在以下两个方法内重置。
                var concatenatedMatrix = target.$getConcatenatedMatrix();
                var bounds = target.$getOriginalBounds();
                var displayList = target.$parentDisplayList;
                var pixelRatio = 1;
                if (displayList)
                    pixelRatio = displayList.$pixelRatio;
                else if (target.stage && target.stage.$displayList)
                    pixelRatio = target.stage.$displayList.$pixelRatio;
                this.setDevicePixelRatio(pixelRatio);
                var region = this.$renderRegion;
                if (this.needRedraw) {
                    this.updateDirtyRegions();
                }
                if (!displayList) {
                    region.setTo(0, 0, 0, 0);
                    region.moved = false;
                    return false;
                }
                if (!region.moved && !displayList.$ratioChanged) {
                    return false;
                }
                region.moved = false;
                var matrix = this.$renderMatrix;
                matrix.copyFrom(concatenatedMatrix);
                var root = displayList.root;
                if (root !== target.$stage) {
                    target.$getConcatenatedMatrixAt(root, matrix);
                }
                this.$ratioMatrix.$preMultiplyInto(matrix, matrix);
                region.updateRegion(bounds, matrix);
                return true;
            };
            /**
             * @private
             *
             * @param context
             */
            p.$render = function (context) {
                var data = this.surface;
                if (data) {
                    context.drawImage(data, this.offsetX, this.offsetY, data.width / this.$pixelRatio, data.height / this.$pixelRatio);
                }
            };
            /**
             * @private
             * 设置剪裁边界，不再绘制完整目标对象，画布尺寸由外部决定，超过边界的节点将跳过绘制。
             */
            p.setClipRect = function (width, height) {
                width *= this.$pixelRatio;
                height *= this.$pixelRatio;
                this.dirtyRegion.setClipRect(width, height);
                this.rootMatrix = null; //只有舞台画布才能设置ClipRect
                var surface = this.renderContext.surface;
                surface.width = width;
                surface.height = height;
                this.surface = surface;
            };
            /**
             * @private
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
             * @private
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
             * @private
             * 绘制根节点显示对象到目标画布，返回draw的次数。
             */
            p.drawToSurface = function () {
                var m = this.rootMatrix;
                if (m) {
                    this.changeSurfaceSize();
                }
                var context = this.renderContext;
                //绘制脏矩形区域
                context.save();
                context.beginPath();
                if (m) {
                    context.setTransform(1, 0, 0, 1, -this.offsetX * this.$pixelRatio, -this.offsetY * this.$pixelRatio);
                }
                var dirtyList = this.dirtyList;
                this.dirtyList = null;
                var length = dirtyList.length;
                for (var i = 0; i < length; i++) {
                    var region = dirtyList[i];
                    context.clearRect(region.minX, region.minY, region.width, region.height);
                    context.rect(region.minX, region.minY, region.width, region.height);
                }
                context.clip();
                if (m) {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                //绘制显示对象
                var drawCalls = this.drawDisplayObject(this.root, context, dirtyList, m, null, null);
                //清除脏矩形区域
                context.restore();
                this.dirtyRegion.clear();
                this.needRedraw = false;
                this.$ratioChanged = false;
                return drawCalls;
            };
            /**
             * @private
             * 绘制一个显示对象
             */
            p.drawDisplayObject = function (displayObject, context, dirtyList, rootMatrix, displayList, clipRegion) {
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
                        if (rootMatrix) {
                            context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            node.$render(context);
                            context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                        }
                        else {
                            context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                            node.$render(context);
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
                        if (child.$blendMode !== 0 || (child.$mask && child.$mask.$parentDisplayList)) {
                            drawCalls += this.drawWithClip(child, context, dirtyList, rootMatrix, clipRegion);
                        }
                        else if (child.$scrollRect) {
                            drawCalls += this.drawWithScrollRect(child, context, dirtyList, rootMatrix, clipRegion);
                        }
                        else {
                            if (DEBUG && child["isFPS"]) {
                                this.drawDisplayObject(child, context, dirtyList, rootMatrix, child.$displayList, clipRegion);
                            }
                            else {
                                drawCalls += this.drawDisplayObject(child, context, dirtyList, rootMatrix, child.$displayList, clipRegion);
                            }
                        }
                    }
                }
                return drawCalls;
            };
            /**
             * @private
             */
            p.drawWithClip = function (displayObject, context, dirtyList, rootMatrix, clipRegion) {
                var drawCalls = 0;
                var hasBlendMode = (displayObject.$blendMode !== 0);
                if (hasBlendMode) {
                    var compositeOp = blendModes[displayObject.$blendMode];
                    if (!compositeOp) {
                        compositeOp = defaultCompositeOp;
                    }
                }
                var scrollRect = displayObject.$scrollRect;
                var mask = displayObject.$mask;
                if (mask && !mask.$parentDisplayList) {
                    mask = null; //如果遮罩不在显示列表中，放弃绘制遮罩。
                }
                //计算scrollRect和mask的clip区域是否需要绘制，不需要就直接返回，跳过所有子项的遍历。
                var maskRegion;
                var displayMatrix = lark.Matrix.create();
                displayMatrix.copyFrom(displayObject.$getConcatenatedMatrix());
                var root = displayObject.$parentDisplayList.root;
                var invertedMatrix;
                if (root !== displayObject.$stage) {
                    invertedMatrix = root.$getInvertedConcatenatedMatrix();
                    invertedMatrix.$preMultiplyInto(displayMatrix, displayMatrix);
                }
                this.$ratioMatrix.$preMultiplyInto(displayMatrix, displayMatrix);
                if (mask) {
                    var bounds = mask.$getOriginalBounds();
                    maskRegion = sys.Region.create();
                    var m = lark.Matrix.create();
                    m.copyFrom(mask.$getConcatenatedMatrix());
                    if (invertedMatrix) {
                        invertedMatrix.$preMultiplyInto(m, m);
                    }
                    this.$ratioMatrix.$preMultiplyInto(m, m);
                    maskRegion.updateRegion(bounds, m);
                    lark.Matrix.release(m);
                }
                var region;
                if (scrollRect) {
                    region = sys.Region.create();
                    region.updateRegion(scrollRect, displayMatrix);
                }
                if (region && maskRegion) {
                    region.intersect(maskRegion);
                    sys.Region.release(maskRegion);
                }
                else if (!region && maskRegion) {
                    region = maskRegion;
                }
                if (region) {
                    if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                        sys.Region.release(region);
                        lark.Matrix.release(displayMatrix);
                        return drawCalls;
                    }
                }
                else {
                    region = sys.Region.create();
                    bounds = displayObject.$getOriginalBounds();
                    region.updateRegion(bounds, displayMatrix);
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
                    lark.Matrix.release(displayMatrix);
                    return drawCalls;
                }
                //绘制显示对象自身，若有scrollRect，应用clip
                var displayContext = this.createRenderContext(region.width, region.height);
                if (!displayContext) {
                    drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayObject.$displayList, clipRegion);
                    sys.Region.release(region);
                    lark.Matrix.release(displayMatrix);
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
                var rootM = lark.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                drawCalls += this.drawDisplayObject(displayObject, displayContext, dirtyList, rootM, displayObject.$displayList, region);
                lark.Matrix.release(rootM);
                //绘制遮罩
                if (mask) {
                    var maskContext = this.createRenderContext(region.width, region.height);
                    if (!maskContext) {
                        drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayObject.$displayList, clipRegion);
                        sys.surfaceFactory.release(displayContext.surface);
                        sys.Region.release(region);
                        lark.Matrix.release(displayMatrix);
                        return drawCalls;
                    }
                    maskContext.setTransform(1, 0, 0, 1, -region.minX, -region.minY);
                    rootM = lark.Matrix.create().setTo(1, 0, 0, 1, -region.minX, -region.minY);
                    var calls = this.drawDisplayObject(mask, maskContext, dirtyList, rootM, mask.$displayList, region);
                    lark.Matrix.release(rootM);
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
                    if (hasBlendMode) {
                        context.globalCompositeOperation = compositeOp;
                    }
                    if (rootMatrix) {
                        context.translate(region.minX, region.minY);
                        context.drawImage(displayContext.surface, 0, 0);
                        context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                    }
                    else {
                        context.setTransform(1, 0, 0, 1, region.minX, region.minY);
                        context.drawImage(displayContext.surface, 0, 0);
                    }
                    if (hasBlendMode) {
                        context.globalCompositeOperation = defaultCompositeOp;
                    }
                }
                sys.surfaceFactory.release(displayContext.surface);
                sys.Region.release(region);
                lark.Matrix.release(displayMatrix);
                return drawCalls;
            };
            /**
             * @private
             */
            p.drawWithScrollRect = function (displayObject, context, dirtyList, rootMatrix, clipRegion) {
                var drawCalls = 0;
                var scrollRect = displayObject.$scrollRect;
                var m = lark.Matrix.create();
                m.copyFrom(displayObject.$getConcatenatedMatrix());
                var root = displayObject.$parentDisplayList.root;
                if (root !== displayObject.$stage) {
                    root.$getInvertedConcatenatedMatrix().$preMultiplyInto(m, m);
                }
                this.$ratioMatrix.$preMultiplyInto(m, m);
                var region = sys.Region.create();
                if (!scrollRect.isEmpty()) {
                    region.updateRegion(scrollRect, m);
                }
                if (region.isEmpty() || (clipRegion && !clipRegion.intersects(region))) {
                    sys.Region.release(region);
                    lark.Matrix.release(m);
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
                    lark.Matrix.release(m);
                    return drawCalls;
                }
                //绘制显示对象自身
                context.save();
                if (rootMatrix) {
                    context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                    context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                else {
                    context.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                }
                context.beginPath();
                context.rect(scrollRect.x, scrollRect.y, scrollRect.width, scrollRect.height);
                context.clip();
                if (rootMatrix) {
                    context.setTransform(rootMatrix.a, rootMatrix.b, rootMatrix.c, rootMatrix.d, rootMatrix.tx * this.$pixelRatio, rootMatrix.ty * this.$pixelRatio);
                }
                drawCalls += this.drawDisplayObject(displayObject, context, dirtyList, rootMatrix, displayObject.$displayList, region);
                context.restore();
                sys.Region.release(region);
                lark.Matrix.release(m);
                return drawCalls;
            };
            /**
             * @private
             */
            p.createRenderContext = function (width, height) {
                var surface = sys.surfaceFactory.create(true);
                if (!surface) {
                    return null;
                }
                //在chrome里，小等于256*256的canvas会不启用GPU加速。
                surface.width = Math.max(257, width);
                surface.height = Math.max(257, height);
                return surface.renderContext;
            };
            /**
             * @private
             * 改变画布的尺寸，由于画布尺寸修改会清空原始画布。所以这里将原始画布绘制到一个新画布上，再与原始画布交换。
             */
            p.changeSurfaceSize = function () {
                var root = this.root;
                var oldOffsetX = this.offsetX;
                var oldOffsetY = this.offsetY;
                var bounds = this.root.$getOriginalBounds();
                var scaleX = this.$pixelRatio;
                var scaleY = this.$pixelRatio;
                this.offsetX = bounds.x;
                this.offsetY = bounds.y;
                var oldContext = this.renderContext;
                var oldSurface = oldContext.surface;
                if (this.sizeChanged) {
                    this.sizeChanged = false;
                    oldSurface.width = bounds.width * scaleX;
                    oldSurface.height = bounds.height * scaleY;
                }
                else {
                    var newContext = sys.sharedRenderContext;
                    var newSurface = newContext.surface;
                    sys.sharedRenderContext = oldContext;
                    this.renderContext = newContext;
                    this.surface = newSurface;
                    newSurface.width = bounds.width * scaleX;
                    newSurface.height = bounds.height * scaleY;
                    if (oldSurface.width !== 0 && oldSurface.height !== 0) {
                        newContext.setTransform(1, 0, 0, 1, 0, 0);
                        newContext.drawImage(oldSurface, (oldOffsetX - this.offsetX) * scaleX, (oldOffsetY - this.offsetY) * scaleY);
                    }
                    oldSurface.height = 1;
                    oldSurface.width = 1;
                }
                this.rootMatrix.setTo(1, 0, 0, 1, -this.offsetX, -this.offsetY);
                this.renderContext.setTransform(1, 0, 0, 1, -bounds.x, -bounds.y);
            };
            p.setDevicePixelRatio = function (ratio) {
                if (ratio === void 0) { ratio = 1; }
                if (this.$pixelRatio == ratio && this.$ratioMatrix)
                    return;
                if (!this.$ratioMatrix)
                    this.$ratioMatrix = lark.Matrix.create();
                this.$ratioChanged = true;
                this.$pixelRatio = ratio;
                this.$ratioMatrix.setTo(ratio, 0, 0, ratio, 0, 0);
                this.root.$invalidate(true);
            };
            return DisplayList;
        })(lark.LarkObject);
        sys.DisplayList = DisplayList;
        lark.registerClass(DisplayList,"lark.sys.DisplayList",["lark.sys.Renderable"]);
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
     * @language en_US
     * The TextInput class is used to create display objects for text display and input.The methods of the TextInput class
     * let you set, select, and manipulate the text inputted by a user.
     * @event lark.Event.FOCUS_IN Dispatched after a display object gains focus.
     * @event lark.Event.FOCUS_OUT Dispatched after a display object loses focus.
     * @see lark.TextField
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/text/TextInputExample.ts
     */
    /**
     * @language zh_CN
     * TextInput 类用于创建显示对象以显示和输入文本。TextInput 类的方法允许您设置、选择并操作用户输入的文本。
     * @event lark.Event.FOCUS_IN 显示对象获得焦点后调度。
     * @event lark.Event.FOCUS_OUT 显示对象失去焦点后调度。
     * @see lark.TextField
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/text/TextInputExample.ts
     */
    var TextInput = (function (_super) {
        __extends(TextInput, _super);
        /**
         * @language en_US
         * Creates a new TextInput instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 TextInput 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        function TextInput() {
            _super.call(this);
            /**
             * @private
             */
            this._isTyping = false;
            /**
             * @private
             */
            this._isFocus = false;
            /**
             * @private
             */
            this.timeoutId = -1;
            this.$TextField[19 /* wordWrap */] = false;
            this.$TextField[22 /* selectionActivePosition */] = NaN;
            this.$TextField[23 /* selectionAnchorPosition */] = NaN;
            this.on(lark.TouchEvent.TOUCH_BEGIN, this.handleTouchBegin, this);
        }
        var d = __define,c=TextInput;p=c.prototype;
        d(p, "displayAsPassword"
            /**
             * @language en_US
             * Specifies whether the text input is a password text input. If the value of this property is true, the text input
             * is treated as a password text input and hides the input characters using asterisks instead of the actual characters.
             * If false, the text input is not treated as a password text input.
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 指定输入框是否是密码输入框。如果此属性的值为 true，则输入框被视为密码输入框，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，
             * 则不会将输入框视为密码输入框。
             * @default false
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[20 /* displayAsPassword */];
            }
            ,function (value) {
                if (this.$TextField[20 /* displayAsPassword */] == value)
                    return;
                this.$TextField[20 /* displayAsPassword */] = value;
                if (value)
                    this.wordWrap = false;
                this.$invalidateContentBounds();
            }
        );
        d(p, "maxChars"
            /**
             * @language en_US
             * The maximum number of characters that the text field can contain, as entered by a user. A script can insert more
             * text than maxChars allows; the maxChars property indicates only how much text a user can enter. If the value
             * of this property is 0, a user can enter an unlimited amount of text.
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 输入框中最多可包含的字符数（即用户输入的字符数）。代码方式可以插入比 maxChars 允许的字符数更多的文本；maxChars 属性仅表示用户可
             * 以输入多少文本。如果此属性的值为 0，则用户可以输入无限数量的文本。
             * @default 0
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$TextField[21 /* maxChars */];
            }
            ,function (value) {
                var values = this.$TextField;
                if (values[21 /* maxChars */] == value)
                    return;
                values[21 /* maxChars */] = value;
                this.updateTextAdapter();
            }
        );
        d(p, "selectionActivePosition"
            /**
             * @language en_US
             * A character position, relative to the beginning of the text string, specifying the end of the selection that
             * moves when the selection is extended with the arrow keys.The active position may be either the start or the
             * end of the selection.<br/>
             * For example, if you drag-select from position 12 to position 8, then selectionAnchorPosition will be 12 and
             * selectionActivePosition will be 8, and when you press Left-Arrow selectionActivePosition will become 7.<br/>
             * A value of -1 indicates "not set".
             * @default -1
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 相对于 text 字符串开头的字符位置，用于指定用箭头键扩展选区时该选区的终点。活动位置可以是选区的起点或终点。<br/>
             * 例如，如果拖动选择位置 12 到位置 8 之间的区域，则 selectionAnchorPosition 将为 12，selectionActivePosition 将为 8，
             * 按向左箭头后 selectionActivePosition 将变为 7。<br/>
             * 值为 -1 时，表示“未设置”。
             * @default -1
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                var begin = this.$TextField[22 /* selectionActivePosition */];
                if (isNaN(begin))
                    begin = this.text.length;
                return begin;
            }
        );
        d(p, "selectionAnchorPosition"
            /**
             * @language en_US
             * A character position, relative to the beginning of the text String, specifying the end of the selection that
             * stays fixed when the selection is extended with the arrow keys.The anchor position may be either the start or
             * the end of the selection.<br/>
             * For example, if you drag-select from position 12 to position 8, then selectionAnchorPosition will be 12 and
             * selectionActivePosition will be 8, and when you press Left-Arrow selectionActivePosition will become 7.<br/>
             * A value of -1 indicates "not set".
             * @default -1
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 相对于 text 字符串开头的字符位置，用于指定用箭头键扩展选区时该选区保持固定的终点。锚点位置可以是选区的起点或终点。<br/>
             * 例如，如果拖动选择位置 12 到位置 8 之间的区域，则 selectionAnchorPosition 将为 12，selectionActivePosition 将为 8，
             * 按向左箭头后 selectionActivePosition 将变为 7。<br/>
             * 值为 -1 时，表示“未设置”。
             * @default -1
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                var end = this.$TextField[23 /* selectionAnchorPosition */];
                if (isNaN(end))
                    end = this.text.length;
                return end;
            }
        );
        /**
         * @language en_US
         * Selects a specified range of characters.<br/>
         * If either position is negative, it will deselect the text range.
         * @param anchorPosition The character position specifying the end of the selection that stays fixed when the selection is extended.
         * @param activePosition The character position specifying the end of the selection that moves when the selection is extended.
         * @see #selectionAnchorPosition
         * @see #selectionActivePosition
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 选择指定范围的字符。<br/>
         * 如果任一位置为负，则它将取消选择该文本范围。
         * @param anchorPosition 字符位置，用于指定扩展选区时保持固定的选区的未端。
         * @param activePosition 字符位置，用于指定扩展选区时移动的选区的未端。
         * @see #selectionAnchorPosition
         * @see #selectionActivePosition
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.selectRange = function (anchorPosition, activePosition) {
            anchorPosition = anchorPosition | 0;
            activePosition = activePosition | 0;
            if (anchorPosition == this.$TextField[23 /* selectionAnchorPosition */] && activePosition == this.$TextField[22 /* selectionActivePosition */])
                return;
            this.$TextField[23 /* selectionAnchorPosition */] = anchorPosition;
            this.$TextField[22 /* selectionActivePosition */] = activePosition;
            if (this._isFocus) {
                var layer = lark.sys.$getTextAdapter(this);
                layer.$selectRange(anchorPosition, activePosition);
            }
        };
        /**
         * @private
         */
        p.handleTouchBegin = function (e) {
            if (this._isFocus)
                return;
            this._isFocus = true;
            this.setAsCurrent();
        };
        /**
         * @private
         */
        p.setAsCurrent = function () {
            var layer = lark.sys.$getTextAdapter(this);
            layer.$setCurrentTextInput(this);
        };
        /**
         * @private
         * Call by TextAdapter set text
         */
        p.$setUserInputText = function (text) {
            if (text == this.text)
                return;
            this.$setText(text);
            this.emitWith(lark.Event.CHANGE);
        };
        /**
         * @private
         */
        p.$startInput = function () {
            this._isTyping = true;
            this.$invalidateContentBounds();
            this.emitWith(lark.Event.FOCUS_IN);
        };
        /**
         * @private
         */
        p.$endInput = function () {
            this._isTyping = false;
            this._isFocus = false;
            this.$invalidateContentBounds();
            this.emitWith(lark.Event.FOCUS_OUT);
        };
        /**
         * @private
         */
        p.$setX = function (value) {
            this.updateTextAdapter();
            return _super.prototype.$setX.call(this, value);
        };
        /**
         * @private
         */
        p.$setY = function (value) {
            this.updateTextAdapter();
            return _super.prototype.$setY.call(this, value);
        };
        /**
         * @private
         */
        p.$measureContentBounds = function (bounds) {
            _super.prototype.$measureContentBounds.call(this, bounds);
            this.updateTextAdapter();
        };
        /**
         * @private
         */
        p.$render = function (context) {
            if (this._isTyping) {
                return;
            }
            _super.prototype.$render.call(this, context);
        };
        /**
         * @private
         */
        p.updateTextAdapter = function () {
            var _this = this;
            if (!this._isFocus) {
                return;
            }
            if (this.timeoutId != -1)
                clearTimeout(this.timeoutId);
            this.timeoutId = setTimeout(function () {
                if (_this._isFocus) {
                    var layer = lark.sys.$getTextAdapter(_this);
                    layer.$initializeInput();
                }
                _this.timeoutId = -1;
            }, 0);
        };
        /**
         * @private
         */
        p.$splitWords = function (line) {
            var words = new Array(line.length);
            for (var i = 0; i < line.length; i++)
                words[i] = line.charAt(i);
            return words;
        };
        return TextInput;
    })(lark.TextField);
    lark.TextInput = TextInput;
    lark.registerClass(TextInput,"lark.TextInput");
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
     * @language en_US
     * The Stage class represents the main drawing area.The Stage object is not globally accessible. You need to access
     * it through the stage property of a DisplayObject instance.<br/>
     * The Stage class has several ancestor classes — Sprite, DisplayObject, and EventEmitter — from which it inherits
     * properties and methods. Many of these properties and methods are inapplicable to Stage objects.
     * @event lark.Event.RESIZE Emitted when the stageWidth or stageHeight property of the Stage object is changed.
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/StageExample.ts
     */
    /**
     * @language zh_CN
     * Stage 类代表主绘图区。
     * 可以利用 DisplayObject 实例的 stage 属性进行访问。<br/>
     * Stage 类具有多个祖代类: Sprite、DisplayObject 和 EventEmitter，属性和方法便是从这些类继承而来的。
     * 从这些继承的许多属性和方法不适用于 Stage 对象。
     * @event lark.Event.RESIZE 当stageWidth或stageHeight属性发生改变时调度
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/display/StageExample.ts
     */
    var Stage = (function (_super) {
        __extends(Stage, _super);
        /**
         * @private
         * Stage不许允许自行实例化
         */
        function Stage() {
            _super.call(this);
            /**
             * @private
             */
            this.$stageWidth = 0;
            /**
             * @private
             */
            this.$stageHeight = 0;
            this.$scaleMode = "noScale";
            this.$highResolutionMode = "default";
            /**
             * @private
             */
            this.implMap = {};
            this.$stage = this;
            this.$nestLevel = 1;
        }
        var d = __define,c=Stage;p=c.prototype;
        d(p, "frameRate"
            /**
             * @language en_US
             * Gets and sets the frame rate of the stage. The frame rate is defined as frames per second. Valid range for the
             * frame rate is from 0.01 to 1000 frames per second.<br/>
             * Note: setting the frameRate property of one Stage object changes the frame rate for all Stage objects
             * @default 30
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 获取并设置舞台的帧速率。帧速率是指每秒显示的帧数。帧速率的有效范围为每秒 0.01 到 60 个帧。<br/>
             * 注意: 修改任何一个Stage的frameRate属性都会同步修改其他Stage的帧率。
             * @default 30
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return lark.sys.$ticker.$frameRate;
            }
            ,function (value) {
                lark.sys.$ticker.$setFrameRate(value);
            }
        );
        d(p, "stageWidth"
            /**
             * @language en_US
             * Indicates the width of the stage, in pixels.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 舞台的当前宽度（以像素为单位）。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$stageWidth;
            }
        );
        d(p, "stageHeight"
            /**
             * @language en_US
             * Indicates the height of the stage, in pixels.
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 舞台的当前高度（以像素为单位）。
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$stageHeight;
            }
        );
        d(p, "scaleMode"
            /**
             * @language en_US
             * A value from the StageScaleMode class that specifies which scale mode to use.
             * @see lark.StageScaleMode
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * 一个 StageScaleMode 类中的值，指定要使用哪种缩放模式。
             * @see lark.StageScaleMode
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$scaleMode;
            }
            ,function (value) {
                if (this.$scaleMode == value) {
                    return;
                }
                this.$scaleMode = value;
                this.$screen.updateScreenSize();
            }
        );
        d(p, "highResolutionMode"
            /**
             * @language en_US
             * HighResolutionMode defines render modes for high resolution devices
             *  HighResolutionMode.DEFAULT = "default" use device's logic resolution as the stage resolution and rendering resolution
             *  HighResolutionMode.RETINA = "retina"   use device's logic resolution as the stage resolution but rendering with high resolution
             *  HighResolutionMode.DEVICE = "device"   use device's phyical resolution as the stage resolution and rendering resolution
             * @version Lark 1.0
             * @platform Web,Native
             */
            /**
             * @language zh_CN
             * HighResolutionMode 类为高分辨率屏幕显示模式提供可选值。
             * 可选值为<br/>
             *  HighResolutionMode.DEFAULT = "default" 使用设备的逻辑分辨率作为舞台的尺寸和渲染分辨率。
             *  HighResolutionMode.RETINA = "retina"   使用设备的逻辑分辨率作为舞台的尺寸，但使用高清分辨率来渲染。
             *  HighResolutionMode.DEVICE = "device"   使用设备的物理分辨率作为舞台的尺寸
             * @version Lark 1.0
             * @platform Web,Native
             */
            ,function () {
                return this.$highResolutionMode;
            }
            ,function (value) {
                if (this.$highResolutionMode == value)
                    return;
                this.$highResolutionMode = value;
                this.$screen.updateScreenSize();
            }
        );
        /**
         * @language en_US
         * After you call the invalidate() method, when the display list is next rendered, the Lark runtime sends a render
         * event to each display object that has registered to listen for the render event. You must call the invalidate()
         * method each time you want the Lark runtime to send render events.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 调用 invalidate() 方法后，在显示列表下次呈现时，Lark 会向每个已注册侦听 Event.RENDER 事件的显示对象发送一个 Event.RENDER 事件。
         * 每次您希望 Lark 发送 Event.RENDER 事件时，都必须调用 invalidate() 方法。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.invalidate = function () {
            lark.sys.$invalidateRenderFlag = true;
        };
        /**
         * @language en_US
         * Adds an interface-name-to-implementation-class mapping to the registry.
         * @param interfaceName the interface name to register. For example："swan.IAssetAdapter","swan.Theme"
         * @param instance the instance to register.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 注册一个接口实现。
         * @param interfaceName 注入的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @param instance 实现此接口的实例。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.registerImplementation = function (interfaceName, instance) {
            this.implMap[interfaceName] = instance;
        };
        /**
         * @language en_US
         * Returns the singleton instance of the implementation class that was registered for the specified interface.
         * This method is usually called by lark framework.
         * @param interfaceName The interface name to identify. For example："swan.IAssetAdapter","swan.Theme"
         * @returns the singleton instance of the implementation class
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取一个接口实现。此方法通常由框架内部调用。获取项目注入的自定义实现实例。
         * @param interfaceName 要获取的接口名称。例如："swan.IAssetAdapter","swan.Theme"
         * @returns 返回实现此接口的实例。
         * @version Lark 1.0
         * @platform Web,Native
         */
        p.getImplementation = function (interfaceName) {
            return this.implMap[interfaceName];
        };
        return Stage;
    })(lark.Sprite);
    lark.Stage = Stage;
    lark.registerClass(Stage,"lark.Stage");
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
    if (DEBUG) {
        lark.$markReadOnly(Stage, "stageWidth");
        lark.$markReadOnly(Stage, "stageHeight");
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
    var sys;
    (function (sys) {
        /**
         * @private
         * Lark播放器
         */
        var Player = (function (_super) {
            __extends(Player, _super);
            /**
             * @private
             * 实例化一个播放器对象。
             */
            function Player(context, stage, entryClassName) {
                _super.call(this);
                /**
                 * @private
                 */
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
            /**
             * @private
             */
            p.createDisplayList = function (stage, context) {
                var displayList = new sys.DisplayList(stage);
                displayList.renderContext = context;
                stage.$displayList = displayList;
                displayList.setClipRect(stage.$stageWidth, stage.$stageHeight);
                return displayList;
            };
            /**
             * @private
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
            /**
             * @private
             *
             */
            p.initialize = function () {
                var rootClass;
                if (this.entryClassName) {
                    rootClass = lark.getDefinitionByName(this.entryClassName);
                }
                if (rootClass) {
                    var rootContainer = new rootClass();
                    this.root = rootContainer;
                    if (rootContainer instanceof lark.DisplayObject) {
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
             * @private
             * 停止播放器，停止后将不能重新启动。
             */
            p.stop = function () {
                this.pause();
                this.stage = null;
            };
            /**
             * @private
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
             * @private
             * 渲染屏幕。
             * 注意：整个渲染过程中显示列表应该保持静止，要防止用户代码在渲染过程中对显示列表进行修改，渲染阶段不能抛出任何事件或执行任何回调函数。
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
             * @private
             * 更新舞台尺寸
             * @param stageWidth 舞台宽度（以像素为单位）
             * @param stageHeight 舞台高度（以像素为单位）
             */
            p.updateStageSize = function (stageWidth, stageHeight, pixelRatio) {
                if (pixelRatio === void 0) { pixelRatio = 1; }
                var stage = this.stage;
                if (stageWidth !== stage.$stageWidth || stageHeight !== stage.$stageHeight || this.screenDisplayList.$pixelRatio !== pixelRatio) {
                    stage.$stageWidth = stageWidth;
                    stage.$stageHeight = stageHeight;
                    this.screenDisplayList.setDevicePixelRatio(pixelRatio);
                    this.screenDisplayList.setClipRect(stageWidth, stageHeight);
                    if (DEBUG && this.stageDisplayList) {
                        this.stageDisplayList.setDevicePixelRatio(pixelRatio);
                        this.stageDisplayList.setClipRect(stageWidth, stageHeight);
                    }
                    stage.emitWith(lark.Event.RESIZE);
                    stage.$invalidate(true);
                }
            };
            return Player;
        })(lark.LarkObject);
        sys.Player = Player;
        lark.registerClass(Player,"lark.sys.Player");
        /**
         * @private
         */
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
            function displayFPS(showFPS, showLog, logFilter, logColor) {
                showLog = !!showLog;
                this.showFPS = !!showFPS;
                this.showLog = showLog;
                if (!this.fpsDisplay) {
                    fpsDisplay = this.fpsDisplay = new FPS(this.stage, showFPS, showLog, logFilter, logColor);
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
                function FPSImpl(stage, showFPS, showLog, logFilter, logColor) {
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
                    this.createDisplay(logColor);
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
                FPSImpl.prototype.createDisplay = function (textColor) {
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
                    textField.textColor = textColor;
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
                    this.infoText.width = NaN;
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
