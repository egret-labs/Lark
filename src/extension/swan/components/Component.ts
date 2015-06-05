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

module swan.sys {
    export const enum ComponentKeys {
        hostComponentKey,
        skinName,
        explicitState,
        enabled,
        stateIsDirty,
        skinNameExplicitlySet,
        explicitTouchChildren,
        explicitTouchEnabled,
        skin
    }
}

module swan {

    var parsedClasses:any = {};

    /**
     * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。
     *
     * @event lark.Event.COMPLETE 当设置skinName为外部exml文件路径时，加载并完成EXML解析后调度。
     */
    export class Component extends lark.Sprite implements UIComponent {
        public constructor() {
            super();
            this.initializeUIValues();
            this.$Component = {
                0: null,         //hostComponentKey,
                1: null,         //skinName,
                2: "",           //explicitState,
                3: true,         //enabled,
                4: false,        //stateIsDirty,
                5: false,        //skinNameExplicitlySet,
                6: false,        //explicitTouchChildren,
                7: false,        //explicitTouchEnabled
                8: null          //skin
            };
        }

        $Component:Object;

        /**
         * 主机组件标识符。用于唯一确定一个组件的名称。通常用于在主题中查询默认皮肤名。
         *
         * @see swan.Theme#getSkinName()
         */
        public get hostComponentKey():string {
            return this.$Component[sys.ComponentKeys.hostComponentKey];
        }

        public set hostComponentKey(value:string) {
            this.$Component[sys.ComponentKeys.hostComponentKey] = value;
        }

        /**
         * 皮肤标识符。有效值可为：皮肤类定义,皮肤类名,皮肤实例,EXML文件内容,或外部EXML文件路径，
         */
        public get skinName():any {
            return this.$Component[sys.ComponentKeys.skinName];
        }

        public set skinName(value:any) {
            var values = this.$Component;
            values[sys.ComponentKeys.skinNameExplicitlySet] = true;
            if (values[sys.ComponentKeys.skinName] == value)
                return;
            values[sys.ComponentKeys.skinName] = value;
            this.$parseSkinName();
        }

        /**
         * 解析skinName
         */
        $parseSkinName():void {
            var skinName = this.skinName;
            var skin:any;
            if (skinName) {
                if (skinName.prototype) {
                    skin = new skinName();
                }
                else if (typeof(skinName) == "string") {
                    var clazz:any;
                    var text:string = skinName.trim();
                    if (text.charAt(0) == "<") {
                        clazz = EXML.parse(text);
                    }
                    else if (text.substr(text.length - 5, 5).toLowerCase() == ".exml") {
                        clazz = parsedClasses[skinName];
                        if(!clazz){
                            EXML.load(skinName,this.onExmlLoaded,this);
                            return;
                        }
                        this.emitWith(lark.Event.COMPLETE);
                    }
                    else{
                        clazz = lark.getDefinitionByName(skinName);
                    }
                    if (clazz) {
                        skin = new clazz();
                    }
                }
                else {
                    skin = skinName;
                }
            }
            this.$setSkin(skin);
        }

        private onExmlLoaded(clazz:any,url:string):void {
            parsedClasses[url] = clazz;
            if(this.skinName!=url){
                return;
            }
            var skin = new clazz();
            this.$setSkin(skin)
            this.emitWith(lark.Event.COMPLETE);
        }

        /**
         * [只读]皮肤对象实例。
         */
        public get skin():Skin {
            return this.$Component[sys.ComponentKeys.skin];
        }

        /**
         * 设置皮肤实例
         */
        $setSkin(skin:Skin):void {
            if (!lark.is(skin, Types.Skin)) {
                skin = null;
                DEBUG && lark.$error(2202);
            }
            var values = this.$Component;
            var oldSkin:Skin = values[sys.ComponentKeys.skin];
            if (oldSkin) {
                var skinParts:string[] = oldSkin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    if (this[partName]) {
                        this.setSkinPart(partName, null);
                    }
                }
                var children = oldSkin.$elementsContent;
                if (children) {
                    length = children.length;
                    for (var i = 0; i < length; i++) {
                        var child = children[i];
                        if(child.$parent==this){
                            this.removeChild(child);
                        }
                    }
                }
                oldSkin.hostComponent = null;
            }
            values[sys.ComponentKeys.skin] = skin;
            if (skin) {
                skin.hostComponent = this;
                var skinParts:string[] = skin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    var instance = skin[partName];
                    if (instance) {
                        this.setSkinPart(partName, instance);
                    }
                }
                children = skin.$elementsContent;
                if (children) {
                    length = children.length;
                    for (i = 0; i < length; i++) {
                        this.addChild(children[i]);
                    }
                }
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        }


        /**
         * 关联一个对象到逻辑组件的指定皮肤部件上。通常您不需要手动调用此方法，当使用EXML文件作为组件皮肤，此方法将会被自动调用。
         * 在运行时，EXML文件内声明的id名称将作为此方法的partName参数，而id所对应的节点对象，将作为此方法的instance参数被依次传入。
         * @param partName 皮肤部件名称
         * @param instance 皮肤部件实例
         */
        public setSkinPart(partName:string, instance:any):void {
            var oldInstance = this[partName];
            if (oldInstance) {
                this.partRemoved(partName, oldInstance);
            }
            this[partName] = instance;
            if (instance) {
                this.partAdded(partName, instance);
            }
        }

        /**
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称
         * @param instance 要附加的皮肤部件实例
         */
        protected partAdded(partName:string, instance:any):void {

        }

        /**
         * 子类覆盖此方法，以在皮肤部件从逻辑组件卸载时对其执行一些清理操作，例如移除事件监听，断开缓存的引用等。
         * @param partName 要卸载的皮肤部件名称
         * @param instance 要卸载的皮肤部件实例
         */
        protected partRemoved(partName:string, instance:any):void {

        }

        $setTouchChildren(value:boolean) {
            value = !!value;
            var values = this.$Component;
            if (values[sys.ComponentKeys.enabled]) {
                this.$toggleFlags(lark.sys.DisplayObjectFlags.TouchChildren, value);
            }
            else {
                values[sys.ComponentKeys.explicitTouchChildren] = value;
            }
        }

        $setTouchEnabled(value:boolean) {
            value = !!value;
            var values = this.$Component;
            if (values[sys.ComponentKeys.enabled]) {
                this.$toggleFlags(lark.sys.DisplayObjectFlags.TouchEnabled, value);
            }
            else {
                values[sys.ComponentKeys.explicitTouchEnabled] = value;
            }
        }

        /**
         * 组件是否可以接受用户交互。将 enabled 属性设置为 false 后，组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
         * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。默认值为 true。
         */
        public get enabled():boolean {
            return this.$Component[sys.ComponentKeys.enabled];
        }

        public set enabled(value:boolean) {
            value = !!value;
            this.$setEnabled(value);
        }

        $setEnabled(value:boolean):void {

            var values = this.$Component;
            if (value === values[sys.ComponentKeys.enabled]) {
                return;
            }
            values[sys.ComponentKeys.enabled] = value;
            if (value) {
                values[sys.ComponentKeys.explicitTouchEnabled] = this.touchEnabled;
                values[sys.ComponentKeys.explicitTouchChildren] = this.touchChildren;
            }
            else {
                super.$setTouchEnabled(values[sys.ComponentKeys.explicitTouchEnabled]);
                super.$setTouchChildren(values[sys.ComponentKeys.explicitTouchChildren]);
            }
            this.invalidateState();
        }

        //========================皮肤视图状态=====================start=======================

        /**
         * 组件的当前视图状态。显式设置此属性，将采用显式设置的值去更新皮肤状态，而忽略组件内部 getCurrentState() 方法返回的值。
         * 将其设置为 "" 或 null 可将取消组件外部显式设置的视图状态名称，从而采用内部 getCurrentState() 方法返回的状态。
         */
        public get currentState():string {
            var values = this.$Component;
            return values[sys.ComponentKeys.explicitState] ?
                values[sys.ComponentKeys.explicitState] : this.getCurrentState();
        }

        public set currentState(value:string) {
            var values = this.$Component;
            if (value == values[sys.ComponentKeys.explicitState]) {
                return;
            }
            values[sys.ComponentKeys.explicitState] = value;
            this.invalidateState();
        }

        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        public invalidateState():void {
            var values = this.$Component;
            if (values[sys.ComponentKeys.stateIsDirty])
                return;

            values[sys.ComponentKeys.stateIsDirty] = true;
            this.invalidateProperties();
        }

        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        protected getCurrentState():string {
            return "";
        }

        //========================皮肤视图状态===================end========================


        //=======================UIComponent接口实现===========================
        /**
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues:()=>void;

        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {
            var values = this.$Component;
            if (!values[sys.ComponentKeys.skinNameExplicitlySet]) {
                var theme = this.$stage.getImplementation("swan.Theme");
                if(theme){
                    var skinName = theme.getSkinName(this);
                    if (skinName) {
                        values[sys.ComponentKeys.skinName] = skinName;
                        this.$parseSkinName();
                    }
                }
            }
        }

        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated():void {

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {
            sys.UIComponentImpl.prototype["commitProperties"].call(this);
            var values = this.$Component;
            if (values[sys.ComponentKeys.stateIsDirty]) {
                values[sys.ComponentKeys.stateIsDirty] = false;
                if (values[sys.ComponentKeys.skin]) {
                    values[sys.ComponentKeys.skin].currentState = this.currentState;
                }
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {
            sys.measure(this);
            var skin = this.$Component[sys.ComponentKeys.skin];
            if (!skin) {
                return;
            }
            var values = this.$UIComponent;
            if (!lark.isNone(skin.width)) {
                values[sys.UIKeys.measuredWidth] = skin.width;
            }
            else {
                if (values[sys.UIKeys.measuredWidth] < skin.minWidth) {
                    values[sys.UIKeys.measuredWidth] = skin.minWidth;
                }
                if (values[sys.UIKeys.measuredWidth] > skin.maxWidth) {
                    values[sys.UIKeys.measuredWidth] = skin.maxWidth;
                }
            }

            if (!lark.isNone(skin.height)) {
                values[sys.UIKeys.measuredHeight] = skin.height;
            }
            else {
                if (values[sys.UIKeys.measuredHeight] < skin.minHeight) {
                    values[sys.UIKeys.measuredHeight] = skin.minHeight;
                }
                if (values[sys.UIKeys.measuredHeight] > skin.maxHeight) {
                    values[sys.UIKeys.measuredHeight] = skin.maxHeight;
                }
            }
        }

        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            sys.updateDisplayList(this, unscaledWidth, unscaledHeight);
        }

        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentLayout():void {
        }

        $UIComponent:Object;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        public includeInLayout:boolean;
        /**
         * 距父级容器离左边距离
         */
        public left:number;

        /**
         * 距父级容器右边距离
         */
        public right:number;

        /**
         * 距父级容器顶部距离
         */
        public top:number;

        /**
         * 距父级容器底部距离
         */
        public bottom:number;

        /**
         * 在父级容器中距水平中心位置的距离
         */
        public horizontalCenter:number;

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        public verticalCenter:number;

        /**
         * 相对父级容器宽度的百分比
         */
        public percentWidth:number;

        /**
         * 相对父级容器高度的百分比
         */
        public percentHeight:number;

        /**
         * 外部显式指定的宽度
         */
        public explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        public explicitHeight:number;


        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        public minWidth:number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        public maxWidth:number;

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        public minHeight:number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        public maxHeight:number;


        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        public setMeasuredSize(width:number, height:number):void {
        }

        /**
         * 标记提交过需要延迟应用的属性
         */
        public invalidateProperties():void {
        }

        /**
         * 验证组件的属性
         */
        public validateProperties():void {
        }

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize():void {
        }

        /**
         * 验证组件的尺寸
         */
        public validateSize(recursive?:boolean):void {
        }

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList():void {
        }

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList():void {
        }

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow():void {
        }

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
        }

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
        }

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
        }

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds(bounds:lark.Rectangle):void {
        }
    }
    registerProperty(Component, "skinName", "Class");
    sys.implementUIComponent(Component, lark.Sprite, true);
    lark.registerClass(Component, Types.Component, [Types.UIComponent]);
    if(DEBUG){
        lark.$markReadOnly(Component.prototype,"skin");
    }
}