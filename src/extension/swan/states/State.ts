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
     * State 类定义视图状态，即组件的特定视图。
     */
    export class State extends lark.LarkObject {
        /**
         * 创建一个State实例
         */
        public constructor(name:string, overrides:IOverride[]) {
            super();
            this.name = name;
            this.overrides = overrides;
        }

        /**
         * 视图状态的名称。给定组件的状态名称必须唯一。必须设置此属性。
         */
        public name:string;

        /**
         * 该视图状态的覆盖，表现为实现 IOverride 接口的对象的数组。
         * 这些覆盖在进入状态时按顺序应用，在退出状态时按相反的顺序删除。
         */
        public overrides:IOverride[];
        /**
         * 此视图状态作为 string 数组所属的状态组。
         */
        public stateGroups:string[];

        /**
         * 初始化视图状态
         */
        public initialize(host:any, stage:lark.Stage):void {
            var overrides = this.overrides;
            var length = overrides.length;
            for (var i = 0; i < length; i++) {
                var addItems:AddItems = <AddItems>overrides[i];
                if (lark.is(addItems, Types.AddItems)) {
                    var target:lark.DisplayObject = host[addItems.target];
                    if (lark.is(target, Types.Image)&&!target.$parent) {
                        stage.addChild(target);
                        stage.removeChild(target);
                    }
                }
            }
        }
    }

    lark.registerClass(State, Types.State);
}

module swan.sys {

    export class StateClient {

        $stateValues:StateValues;

        /**
         * 为此组件定义的视图状态。
         */
        public get states():swan.State[] {
            return this.$stateValues.states;
        }

        public set states(value:swan.State[]) {
            if (!value)
                value = [];
            var values = this.$stateValues;
            values.states = value;
            var statesMap = {};
            var length = value.length;
            for (var i = 0; i < length; i++) {
                var state = value[i];
                statesMap[state.name] = state;
            }
            values.statesMap = statesMap;
            if (values.parent) {
                this.commitCurrentState();
            }
        }

        /**
         * 组件的当前视图状态。将其设置为 "" 或 null 可将组件重置回其基本状态。
         */
        public get currentState():string {
            return this.$stateValues.currentState;
        }

        public set currentState(value:string) {
            var values = this.$stateValues;
            values.explicitState = value;
            values.currentState = value;
            this.commitCurrentState();
        }

        /**
         * 应用当前的视图状态。子类覆盖此方法在视图状态发生改变时执行相应更新操作。
         */
        private commitCurrentState():void {
            var values = this.$stateValues;
            if (!values.parent) {
                return;
            }
            var destination:swan.State = values.statesMap[values.currentState];
            if (!destination) {
                if (values.states.length > 0) {
                    values.currentState = values.states[0].name;
                }
                else {
                    return;
                }
            }
            if (values.oldState == values.currentState) {
                return;
            }

            var parent = values.parent;
            var state = values.statesMap[values.oldState];
            if (state) {
                var overrides = state.overrides;
                var length = overrides.length;
                for (var i = 0; i < length; i++) {
                    overrides[i].remove(this, parent);
                }
            }

            values.oldState = values.currentState;

            state = values.statesMap[values.currentState];
            if (state) {
                overrides = state.overrides;
                length = overrides.length;
                for (i = 0; i < length; i++) {
                    overrides[i].apply(this, parent);
                }
            }
        }

        /**
         * 返回是否含有指定名称的视图状态
         * @param stateName 要检查的视图状态名称
         */
        public hasState(stateName:string):boolean {
            return !!this.$stateValues.statesMap[stateName];
        }

        /**
         * 初始化所有视图状态
         */
        private initializeStates(stage:lark.Stage):void {
            this.$stateValues.intialized = true;
            var states = this.states;
            var length = states.length;
            for (var i = 0; i < length; i++) {
                states[i].initialize(this,stage);
            }
        }
    }

    export class StateValues {

        public intialized:boolean = false;

        public statesMap:any = {};

        public states:swan.State[] = [];

        public oldState:string = null;

        public explicitState:string = null;

        public currentState:string = null;

        public parent:lark.DisplayObjectContainer = null;
    }
}