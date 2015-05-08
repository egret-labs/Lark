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

module lark.gui {

    /**
     * 皮肤主题。实例化一个主题，能够在运行时修改全局的默认皮肤。
     */
    export class Theme extends EventEmitter {

        private static themeMap:{[key:number]:Theme} = {};

        /**
         * 获取组件对应的默认皮肤。
         */
        static $getDefaultSkin(client:SkinnableComponent,stage:Stage):any{
            var theme = Theme.themeMap[stage.$hashCode];
            if(!theme){
                return null;
            }
            return theme.getSkin(client);
        }

        public constructor(stage:Stage) {
            super();
            if (DEBUG && !stage) {
                $error(1003, "stage");
            }
            Theme.themeMap[stage.$hashCode] = this;
        }

        private skinMap:{[key:string]:string} = {};
        private flagToClassName:{[key:number]:string} = {};
        /**
         * 根据主机组件，获取对应的默认皮肤实例。
         * @param client 要获取默认皮肤的组件
         */
        public getSkin(client:SkinnableComponent):any{
            return null;
        }

        /**
         * 为指定的主机组件映射一个默认皮肤
         * @param hostComponentKey 主机组件名称，例如：“lark.gui.Button”
         * @param skinName 皮肤名称 例如："app.MyButtonSkin";
         */
        public mapSkin(hostComponentKey:string,skinName:string):void{
            if(DEBUG){
                if(!hostComponentKey){
                    $error(1003, "hostComponentKey");
                }
                if(!skinName){
                    $error(1003, "skinName");
                }
            }
            this.skinMap[hostComponentKey] = skinName;
            var clazz = getDefinitionByName(hostComponentKey);
            if(clazz&&clazz.prototype){
                var flag = clazz.prototype.__classFlag__;
                if(flag){
                    this.flagToClassName[flag] = hostComponentKey;
                }
            }
        }
    }

    registerType(Theme,Types.Theme);
}