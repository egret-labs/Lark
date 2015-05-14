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
     * 皮肤基类。通常情况下，您不需要手动创建这个类的实例，而是通过解析EXML文件后自动生成。
     */
    export class Skin extends LarkObject {

        /**
         * 皮肤部件名称列表
         */
        public skinParts:string[];

        /**
         * 皮肤的最大宽度。仅影响主机组件的测量结果。
         */
        public maxWidth:number = 100000;
        /**
         * 皮肤的最小宽度,此属性设置为大于maxWidth的值时无效。仅影响主机组件的测量结果。
         */
        public minWidth:number = 0;
        /**
         * 皮肤的最大高度。仅影响主机组件的测量结果。
         */
        public maxHeight:number = 100000;
        /**
         * 皮肤的最小高度,此属性设置为大于maxHeight的值时无效。仅影响主机组件的测量结果。
         */
        public minHeight:number = 0;
        /**
         * 皮肤显式设置宽度,设置为NONE表示不显式设置。仅影响主机组件的测量结果。
         */
        public width:number = NONE;
        /**
         * 皮肤显式设置高度,设置为NONE表示不显式设置。仅影响主机组件的测量结果。
         */
        public height:number = NONE;

        $elementsContent:DisplayObject[] = [];

        public set elementsContent(value:DisplayObject[]) {
            this.$elementsContent = value;
        }


        private _hostComponent: SkinnableComponent = null;
        /**
         * 此皮肤附加到的主机组件
         */
        public get hostComponent():SkinnableComponent{
            return this._hostComponent;
        }

        public set hostComponent(value:SkinnableComponent){
            if(this._hostComponent==value)
                return;
            this._hostComponent = value;

            if(this._hostComponent){
                if(this.currentStateChanged){
                    this.commitCurrentState();
                }
            }
        }


        //========================state相关函数===============start=========================

        private _states:State[] = [];
        /**
         * 为此组件定义的视图状态。
         */
        public get states():State[] {
            return this._states;
        }

        public set states(value:State[]) {
            if (!value)
                value = [];
            this._states = value;
            this.currentStateChanged = true;
            this.requestedCurrentState = this._currentState;
            if (!this.getState(this.requestedCurrentState)) {
                this.requestedCurrentState = this.getDefaultState();
            }
        }

        /**
         * 当前视图状态发生改变的标志
         */
        private currentStateChanged:boolean = false;

        private _currentState:string = null;
        /**
         * 存储还未验证的视图状态
         */
        private requestedCurrentState:string = null;

        /**
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         */
        public get currentState():string {
            return this.currentStateChanged?this.requestedCurrentState:this._currentState;
        }

        public set currentState(value:string) {
            if (value != this.currentState) {
                this.requestedCurrentState = value;
                this.currentStateChanged = true;
                if (this._hostComponent) {
                    this.commitCurrentState();
                }
            }
        }

        /**
         * 返回默认状态
         */
        private getDefaultState():string {
            if (this._states.length > 0) {
                return this._states[0].name;
            }
            return null;
        }

        /**
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        public commitCurrentState():void {
            if (!this.currentStateChanged)
                return;
            this.currentStateChanged = false;
            var destination:State = this.getState(this.requestedCurrentState);
            if (!destination) {
                this.requestedCurrentState = this.getDefaultState();
            }
            this.removeState(this._currentState);
            this._currentState = this.requestedCurrentState;
            this.applyState(this._currentState);
        }


        /**
         * 通过名称返回视图状态
         */
        private getState(stateName:string):State {
            if (!stateName)
                return null;
            var states = this._states;
            var length = states.length;
            for (var i = 0; i < length; i++) {
                var state = states[i];
                if (state.name == stateName)
                    return state;
            }
            return null;
        }

        /**
         * 移除指定的视图状态以及所依赖的所有父级状态，除了与新状态的共同状态外
         */
        private removeState(stateName:string):void {
            var state:State = this.getState(stateName);
            if (state) {
                var overrides:Array<IOverride> = state.overrides;
                for (var i:number = overrides.length - 1; i >= 0; i--)
                    overrides[i].remove(this);
            }
        }

        /**
         * 应用新状态
         */
        private applyState(stateName:string):void {
            var state:State = this.getState(stateName);
            if (state) {
                var overrides:Array<any> = state.overrides;
                var length:number = overrides.length;
                for (var i:number = 0; i < length; i++)
                    overrides[i].apply(this);
            }
        }

        //========================state相关函数===============end=========================

    }

    registerClass(Skin, Types.Skin);
    registerProperty(Skin, "elementsContent", "Array", true);
}