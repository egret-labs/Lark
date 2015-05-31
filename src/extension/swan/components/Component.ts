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
     * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。
     */
    export class Component extends lark.Sprite implements UIComponent {
        public constructor() {
            super();
            sys.UIComponentImpl.call(this);
        }

        /**
         * 主机组件标识符。用于唯一确定一个组件的名称。
         * 用户自定义的组件若不对此属性赋值，将会继承父级的标识符定义。
         */
        public hostComponentKey:string = null;

        private _skinName:any = null;
        /**
         * 皮肤标识符。有效值可为：皮肤类定义,皮肤类名,或皮肤实例，
         */
        public get skinName():any {
            return this._skinName;
        }

        public set skinName(value:any) {
            this.$setFlags(sys.UIFlags.skinNameExplicitlySet);
            if (this._skinName == value)
                return;
            this._skinName = value;
            this.parseSkinName();
        }

        /**
         * 解析skinName
         */
        private parseSkinName():void {
            var skinName = this._skinName;
            var skin:any;
            if (skinName) {
                if (skinName.prototype) {
                    skin = new skinName();
                }
                else if (typeof(skinName) == "string") {
                    var clazz:any = lark.getDefinitionByName(<string><any> skinName);
                    if (clazz) {
                        skin = new clazz();
                    }
                }
                else {
                    skin = skinName;
                }
            }
            if (!lark.is(skin, Types.Skin)) {
                skin = null;
                DEBUG && lark.$error(2202);
            }
            this.$setSkin(skin);
        }


        $skin:Skin = null;

        /**
         * [只读]皮肤对象实例。
         */
        public get skin():Skin {
            return this.$skin;
        }

        /**
         * 设置皮肤实例
         */
        $setSkin(skin:Skin):void {
            var oldSkin = this.$skin;
            if (oldSkin) {
                var skinParts:string[] = oldSkin.skinParts;
                var length = skinParts.length;
                for (var i = 0; i < length; i++) {
                    var partName = skinParts[i];
                    if (this[partName]) {
                        this.setSkinPart(partName, null);
                    }
                }
                oldSkin.hostComponent = null;
            }
            this.removeChildren();
            this.$skin = skin;
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
                var children = skin.$elementsContent;
                if (children) {
                    var length = children.length;
                    for (var i = 0; i < length; i++) {
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
            if (this.$hasFlags(sys.UIFlags.enabled)) {
                this.$toggleFlags(lark.sys.DisplayObjectFlags.TouchChildren, value);
            }
            else {
                this.$toggleFlags(sys.UIFlags.explicitTouchChildren, value);
            }
        }

        $setTouchEnabled(value:boolean) {
            value = !!value;
            if (this.$hasFlags(sys.UIFlags.enabled)) {
                this.$toggleFlags(lark.sys.DisplayObjectFlags.TouchEnabled, value);
            }
            else {
                this.$toggleFlags(sys.UIFlags.explicitTouchEnabled, value);
            }
        }

        /**
         * 组件是否可以接受用户交互。将 enabled 属性设置为 false 后，组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
         * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。默认值为 true。
         */
        public get enabled():boolean {
            return this.$hasFlags(sys.UIFlags.enabled);
        }

        public set enabled(value:boolean) {
            this.$setEnabled(value);
        }

        $setEnabled(value:boolean):void {
            value = !!value;
            if (value === this.$hasFlags(sys.UIFlags.enabled)) {
                return;
            }
            this.$toggleFlags(sys.UIFlags.enabled, value);
            if (value) {
                this.$toggleFlags(sys.UIFlags.explicitTouchEnabled, this.touchEnabled);
                this.$toggleFlags(sys.UIFlags.explicitTouchChildren, this.touchChildren);
            }
            else {
                super.$setTouchEnabled(this.$hasFlags(sys.UIFlags.explicitTouchEnabled));
                super.$setTouchChildren(this.$hasFlags(sys.UIFlags.explicitTouchChildren));
            }
            this.invalidateState();
        }

        //========================皮肤视图状态=====================start=======================

        private explicitState:string = "";

        /**
         * 组件的当前视图状态。显式设置此属性，将采用显式设置的值去更新皮肤状态，而忽略组件内部 getCurrentState() 方法返回的值。
         * 将其设置为 "" 或 null 可将取消组件外部显式设置的视图状态名称，从而采用内部 getCurrentState() 方法返回的状态。
         */
        public get currentState():string {
            return this.explicitState ?
                this.explicitState : this.getCurrentState();
        }

        public set currentState(value:string) {
            if (value == this.explicitState) {
                return;
            }
            this.explicitState = value;
            this.invalidateState();
        }

        /**
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 getCurrentState() 方法来返回当前的视图状态名称。
         */
        public invalidateState():void {
            if (this.$hasFlags(sys.UIFlags.stateIsDirty))
                return;

            this.$setFlags(sys.UIFlags.stateIsDirty);
            this.invalidateProperties();
        }

        /**
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         */
        protected getCurrentState():string {
            return "";
        }

        //========================皮肤视图状态===================end========================

        /**
         * 检查属性失效标记并应用
         */
        private checkInvalidateFlag:(event?:Event)=>void;

        //=======================UIComponent接口实现===========================
        /**
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {
            if (!this.$hasFlags(sys.UIFlags.skinNameExplicitlySet)) {
                var skin = Theme.$getDefaultSkin(this, this.$stage);
                if (skin) {
                    this.$setSkin(skin);
                }
            }
        }

        /**
         * 子项创建完成,此方法在createChildren()之后执行。
         */
        protected childrenCreated():void{

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {
            sys.UIComponentImpl.prototype["commitProperties"].call(this);
            if (this.$hasFlags(sys.UIFlags.stateIsDirty)) {
                this.$removeFlags(sys.UIFlags.stateIsDirty);
                if (this.$skin) {
                    this.$skin.currentState = this.currentState;
                }
            }
        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {
            sys.measure(this);
            var skin = this.$skin;
            if (!skin) {
                return;
            }
            var values = this.$uiValues;
            if (!lark.isNone(skin.width)) {
                values[sys.UIValues.measuredWidth] = skin.width;
            }
            else {
                if (values[sys.UIValues.measuredWidth] < skin.minWidth) {
                    values[sys.UIValues.measuredWidth] = skin.minWidth;
                }
                if (values[sys.UIValues.measuredWidth] > skin.maxWidth) {
                    values[sys.UIValues.measuredWidth] = skin.maxWidth;
                }
            }

            if (!lark.isNone(skin.height)) {
                values[sys.UIValues.measuredHeight] = skin.height;
            }
            else {
                if (values[sys.UIValues.measuredHeight] < skin.minHeight) {
                    values[sys.UIValues.measuredHeight] = skin.minHeight;
                }
                if (values[sys.UIValues.measuredHeight] > skin.maxHeight) {
                    values[sys.UIValues.measuredHeight] = skin.maxHeight;
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

        $uiValues:Float64Array;

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
}