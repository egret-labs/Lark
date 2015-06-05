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
     * 皮肤主题。注意：皮肤主题是一次性设置的默认值,并不能运行时切换所有组件默认皮肤。切换单个皮肤您可以自行对Component.skinName赋值来修改。
     */
    export class Theme extends lark.EventEmitter {

        /**
         * 创建一个主题实例
         * @param configURL 要加载并解析的外部主题配置文件路径。若传入null，将不进行配置文件加载，
         * 之后需要在外部以代码方式手动调用 mapSkin() 方法完成每条默认皮肤名的注册。
         * @param stage 当前舞台引用。传入此参数，主题会自动注册自身到舞台上。
         * 若传入null，需要在外部手动调用stage.registerImplementation("swan.Theme",theme) 来完成主题的注册。
         */
        public constructor(configURL:string, stage:lark.Stage) {
            super();
            this.initialized = !configURL;
            if (stage) {
                stage.registerImplementation("swan.Theme", this);
            }
            this.load(configURL);
        }

        private initialized:boolean;

        private load(url:string):void {
            var request = new lark.HttpRequest();
            request.on(lark.Event.COMPLETE, this.onConfigLoaded, this);
            request.on(lark.Event.IO_ERROR, this.onConfigLoaded, this);
            request.open(url);
            request.send();
        }

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

        private delayList:Component[] = [];

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

        private skinMap:{[key:string]:string} = {};
        private flagToClassName:{[key:number]:string} = {};


        /**
         * 根据主机组件，获取对应的默认皮肤名。查询规则如下：
         * 1.使用client的hostComponentKey作为键查询默认皮肤名
         * 2.使用client的类名作为键查询默认皮肤名
         * 3.使用client的父类名作为键查询默认皮肤名
         * 4.不断重复3直到查询到皮肤名或父类为swan.Component时停止
         * @param client 要获取默认皮肤的组件
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
         * 为指定的主机组件映射一个默认皮肤
         * @param hostComponentKey 主机组件名称，例如：“swan.Button”
         * @param skinName 皮肤名称 例如："app.MyButtonSkin";
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