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

module swan {

    /**
     * @language en_US
     * Pay atention: The skin theme is the default value for once setting, and it can not be changed while running.
     * You can change a skin of a component with <code>skinName</code> property.
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 皮肤主题。注意：皮肤主题是一次性设置的默认值,并不能运行时切换所有组件默认皮肤。切换单个皮肤您可以自行对Component.skinName赋值来修改。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Theme extends lark.EventEmitter {

        /**
         * @language en_US
         * create an instance of Theme
         * @param configURL the external theme path. if <code>null</code>, you need to register the default skin name with
         * <code>mapSkin()</code> manually.
         * @param stage current stage. The theme will register to the stage with this parameter.
         * If <code>null</code>, you need to register with <code>stage.registerImplementation("swan.Theme",theme)</code>
         * manually.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个主题实例
         * @param configURL 要加载并解析的外部主题配置文件路径。若传入 <code>null</code>，将不进行配置文件加载，
         * 之后需要在外部以代码方式手动调用 <code>mapSkin()</code> 方法完成每条默认皮肤名的注册。
         * @param stage 当前舞台引用。传入此参数，主题会自动注册自身到舞台上。
         * 若传入null，需要在外部手动调用 <code>stage.registerImplementation("swan.Theme",theme)</code> 来完成主题的注册。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor(configURL:string, stage:lark.Stage) {
            super();
            this.initialized = !configURL;
            if (stage) {
                stage.registerImplementation("swan.Theme", this);
            }
            this.load(configURL);
        }

        /**
         * @private
         */
        private initialized:boolean;

        /**
         * @private
         * 
         * @param url 
         */
        private load(url:string):void {
            var request = new lark.HttpRequest();
            request.on(lark.Event.COMPLETE, this.onConfigLoaded, this);
            request.on(lark.Event.IO_ERROR, this.onConfigLoaded, this);
            request.open(url);
            request.send();
        }

        /**
         * @private
         * 
         * @param event 
         */
        private onConfigLoaded(event:lark.Event):void {
            var request:lark.HttpRequest = event.target;
            try {
                var data = JSON.parse(request.response);
            }
            catch (e) {
                if (DEBUG) {
                    lark.error(e.message);
                }
            }

            if (data && data.skins) {
                var skinMap = this.skinMap
                var skins = data.skins;
                var keys = Object.keys(skins);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    var key = keys[i];
                    if (!skinMap[key]) {
                        this.mapSkin(key, skins[key]);
                    }
                }
            }
            this.initialized = true;
            this.hadleDelayList();
        }

        /**
         * @private
         */
        private delayList:Component[] = [];

        /**
         * @private
         * 
         */
        private hadleDelayList():void {
            var list = this.delayList;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var client = list[i];
                if (!client.$Component[sys.ComponentKeys.skinNameExplicitlySet]) {
                    var skinName = this.getSkinName(client);
                    if (skinName) {
                        client.$Component[sys.ComponentKeys.skinName] = skinName;
                        client.$parseSkinName();
                    }
                }
            }
            list.length = 0;
        }

        /**
         * @private
         */
        private skinMap:{[key:string]:string} = {};
        /**
         * @private
         */
        private flagToClassName:{[key:number]:string} = {};


        /**
         * @language en_US
         * According to the host component to get the default skin name.
         * Search rules are as follows:
         * <li>1. Use the <code>hostComponentKey</code> of client to search.</li>
         * <li>2. Use the class name of client to search.</li>
         * <li>3. Use the parent class name of client to search.</li>
         * <li>4. Repeat step 3 until find the skin name or the parent is <code>swan.Component</code>.</li>
         * @param client the component need to get the default skin.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 根据主机组件，获取对应的默认皮肤名。查询规则如下：
         * <li>1.使用client的hostComponentKey作为键查询默认皮肤名。</li>
         * <li>2.使用client的类名作为键查询默认皮肤名。</li>
         * <li>3.使用client的父类名作为键查询默认皮肤名。</li>
         * <li>4.不断重复3直到查询到皮肤名或父类为swan.Component时停止。</li>
         * @param client 要获取默认皮肤的组件。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getSkinName(client:Component):string {
            if (!this.initialized) {
                if (this.delayList.indexOf(client) == -1) {
                    this.delayList.push(client);
                }
                return;
            }
            var skinMap = this.skinMap;
            var skinName:string = skinMap[client.hostComponentKey];
            if (!skinName) {
                skinName = this.findSkinName(client);
            }
            return skinName;
        }

        /**
         * @private
         * 
         * @param prototype 
         * @returns 
         */
        private findSkinName(prototype:any):string {
            if (!prototype) {
                return "";
            }
            var flag = prototype["__classFlag__"];
            if (flag === void 0) {
                return "";
            }
            var key = this.flagToClassName[flag];
            var skinName = this.skinMap[key];
            if (skinName || flag === Types.Component) {
                return skinName;
            }
            return this.findSkinName(Object.getPrototypeOf(prototype));
        }

        /**
         * @language en_US
         * Map a default skin for the specified host component.
         * @param hostComponentKey the name of host component, such as "swan.Button".
         * @param skinName the name of skin, such as "app.MyButtonSkin".
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 为指定的主机组件映射一个默认皮肤。
         * @param hostComponentKey 主机组件名称，例如：“swan.Button”。
         * @param skinName 皮肤名称 例如："app.MyButtonSkin"。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public mapSkin(hostComponentKey:string, skinName:string):void {
            if (DEBUG) {
                if (!hostComponentKey) {
                    lark.$error(1003, "hostComponentKey");
                }
                if (!skinName) {
                    lark.$error(1003, "skinName");
                }
            }
            this.skinMap[hostComponentKey] = skinName;
            var clazz = lark.getDefinitionByName(hostComponentKey);
            if (clazz && clazz.prototype) {
                var flag = clazz.prototype.__classFlag__;
                if (flag) {
                    this.flagToClassName[flag] = hostComponentKey;
                }
            }
        }
    }

    lark.registerClass(Theme, Types.Theme);
}