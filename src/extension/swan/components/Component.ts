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
     * @language en_US
     * The Component class defines the base class for skinnable components.
     * The skins used by a Component class are typically child classes of
     * the Skin class.<p/>
     *
     * Associate a skin class with a component class by setting the <code>skinClass</code> style property of the
     * component class.
     *
     * @event lark.Event.COMPLETE 当设置skinName为外部exml文件路径时，加载并完成EXML解析后调度。
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。<p/>
     *
     * 通过设置 component 类的 skinClass 样式属性，将 skin 类与 component 类相关联。
     *
     * @event lark.Event.COMPLETE 当设置skinName为外部exml文件路径时，加载并完成EXML解析后调度。
     *
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Component extends lark.Sprite implements UIComponent {
        /**
         * Constructor.
         *
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * 构造函数。
         *
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
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

        /**
         * @private
         */
        $Component:Object;

        /**
         * @language en_US
         * A identifier of host component which can determine only one component names.
         * Usually used for quering a default skin name in theme.
         * @default null
         * @see swan.Theme#getSkinName()
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 主机组件标识符。用于唯一确定一个组件的名称。通常用于在主题中查询默认皮肤名。
         *
         * @default null
         * @see swan.Theme#getSkinName()
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get hostComponentKey():string {
            return this.$Component[sys.ComponentKeys.hostComponentKey];
        }

        public set hostComponentKey(value:string) {
            this.$Component[sys.ComponentKeys.hostComponentKey] = value;
        }

        /**
         * @language en_US
         * Identifier of skin. Valid values: class definition of skin,
         * class name of skin, instance of skin, EXML or external EXML file path.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 皮肤标识符。有效值可为：皮肤类定义,皮肤类名,皮肤实例,EXML文件内容,或外部EXML文件路径，
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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
         * @private
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
            this.setSkin(skin);
        }

        /**
         * @private
         * @param clazz
         * @param url 
         */
        private onExmlLoaded(clazz:any,url:string):void {
            parsedClasses[url] = clazz;
            if(this.skinName!=url){
                return;
            }
            var skin = new clazz();
            this.setSkin(skin)
            this.emitWith(lark.Event.COMPLETE);
        }

        /**
         * @language en_US
         * [read-only] The instance of the skin class for this component instance.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [只读]皮肤对象实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get skin():Skin {
            return this.$Component[sys.ComponentKeys.skin];
        }

        /**
         * @language en_US
         * Setter for the skin instance.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置皮肤实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setSkin(skin:Skin):void {
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
                skin.hostComponent = this;
            }
            this.invalidateSize();
            this.invalidateDisplayList();
        }


        /**
         * @language en_US
         * Find the skin parts in the skin class and assign them to the properties of the component.
         * You do not call this method directly. This method will be invoked automatically when using a EXML as skin.
         * The ID for a tag in an EXML will be passed in as <code>partName</code>, and the instance of the tag will be
         * passed in as <code>instance</code>.
         * @param partName name of a skin part
         * @param instance instance of a skin part
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 关联一个对象到逻辑组件的指定皮肤部件上。通常您不需要手动调用此方法，当使用EXML文件作为组件皮肤，此方法将会被自动调用。
         * 在运行时，EXML文件内声明的id名称将作为此方法的partName参数，而id所对应的节点对象，将作为此方法的instance参数被依次传入。
         * @param partName 皮肤部件名称
         * @param instance 皮肤部件实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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
         * @language en_US
         * Called when a skin part is added.
         * You do not call this method directly.
         * Swan calls it automatically when it calls the <code>setSkinPart()</code> method.<p/>
         *
         * Override this function to attach behavior to the part, such as add event listener or
         * assign property values cached.
         * @param partName name of a skin part to add.
         * @param instance instance of a skin part to add.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 添加皮肤部件时调用。
         * 您无需直接调用此方法。
         * Swan 会在调用 setSkinPart()方法时自动调用此方法。<p/>
         *
         * 子类覆盖此方法，以在皮肤部件第一次附加时对其执行一些初始化操作，例如添加事件监听，赋值缓存的属性值等。
         * @param partName 要附加的皮肤部件名称。
         * @param instance 要附加的皮肤部件实例。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected partAdded(partName:string, instance:any):void {

        }

        /**
         * @language en_US
         * Called when an instance of a skin part is being removed.
         * You do not call this method directly.
         * Swan calls it automatically when it calls the <code>setSkinPart()</code> method.<p/>
         *
         * Override this function to clean behavior of the part, such as remove event listener or
         * disconnect the cache reference
         * @param partName name of a skin part to remove.
         * @param instance instance of a skin part to remove.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 正删除外观部件的实例时调用。
         * 您无需直接调用此方法。
         * Swan 会在调用 setSkinPart()方法时自动调用此方法。<p/>
         *
         * 子类覆盖此方法，以在皮肤部件从逻辑组件卸载时对其执行一些清理操作，例如移除事件监听，断开缓存的引用等。
         * @param partName 要卸载的皮肤部件名称
         * @param instance 要卸载的皮肤部件实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected partRemoved(partName:string, instance:any):void {

        }

        /**
         * @private
         * 
         * @param value 
         */
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

        /**
         * @private
         * 
         * @param value 
         */
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
         * @language en_US
         * Whether the component can accept user interaction.
         * After setting the <code>enabled</code> property to <code>false</code>, components will disabled touch event
         * (set <code>touchEnabled</code> and <code>touchChildren</code> to false) and set state of skin to "disabled".
         *
         * @default true
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件是否可以接受用户交互。
         * 将 enabled 属性设置为 false 后，
         * 组件会自动禁用触摸事件(将 touchEnabled 和 touchChildren 同时设置为 false)，
         * 部分组件可能还会将皮肤的视图状态设置为"disabled",使其所有子项的颜色变暗。
         *
         * @default true
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get enabled():boolean {
            return this.$Component[sys.ComponentKeys.enabled];
        }

        public set enabled(value:boolean) {
            value = !!value;
            this.$setEnabled(value);
        }

        /**
         * @private
         * 
         * @param value 
         */
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
         * @language en_US
         * The current view state of the component. When you use this property to set a component's state,
         * Swan will explicit update state of skin and ignore the return of <code>getCurrentState()</code>.
         *
         * Set to <code>""</code> or <code>null</code> to reset the component back to its base state.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的当前视图状态。显式设置此属性，
         * 将采用显式设置的值去更新皮肤状态，而忽略组件内部 getCurrentState() 方法返回的值。
         *
         * 将其设置为 "" 或 null 可将取消组件外部显式设置的视图状态名称，从而采用内部 getCurrentState() 方法返回的状态。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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
         * @language en_US
         * Marks the component so that the new state of the skin is set during a later screen update.
         * A subclass of SkinnableComponent must override <code>getCurrentState()</code> to return a value.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记组件当前的视图状态失效，调用此方法后，子类应该覆盖 <code>getCurrentState()</code> 方法来返回当前的视图状态名称。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateState():void {
            var values = this.$Component;
            if (values[sys.ComponentKeys.stateIsDirty])
                return;

            values[sys.ComponentKeys.stateIsDirty] = true;
            this.invalidateProperties();
        }

        /**
         * @language en_US
         * Returns the name of the state to be applied to the skin.<p/>
         * A subclass of SkinnableComponent must override this method to return a value.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回组件当前的皮肤状态名称,子类覆盖此方法定义各种状态名
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected getCurrentState():string {
            return "";
        }

        //========================皮肤视图状态===================end========================


        //=======================UIComponent接口实现===========================
        /**
         * @private
         * UIComponentImpl 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
         */
        private initializeUIValues:()=>void;

        /**
         * @language en_US
         * Create child objects of the component. This is an advanced method that you might override
         * when creating a subclass of Component. This method will be called once it be added to stage.
         * You must invoke <code>super.createChildren()</code> to complete initialization of the parent class
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 子类覆盖此方法可以执行一些初始化子项操作。此方法仅在组件第一次添加到舞台时回调一次。
         * 请务必调用super.createChildren()以完成父类组件的初始化
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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
         * @language en_US
         * Performs any final processing after child objects are created.
         * This is an advanced method that you might override
         * when creating a subclass of Component.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建子对象后执行任何最终处理。此方法在创建 Component 的子类时覆盖。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected childrenCreated():void {

        }

        /**
         * @language en_US
         * Processes the properties set on the component.
         * You can override this method when creating a subclass of Component.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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
         * @language en_US
         * Calculates the default size.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 测量组件尺寸
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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
         * @language en_US
         * Draws the object and/or sizes and positions its children.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新显示列表
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            sys.updateDisplayList(this, unscaledWidth, unscaledHeight);
        }

        /**
         * @language en_US
         * Method to invalidate parent size and display list if
         * this object affects its layout (includeInLayout is true).
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 此对象影响其布局时（includeInLayout 为 true），使父代大小和显示列表失效的方法。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected invalidateParentLayout():void {
        }

        /**
         * @private
         */
        $UIComponent:Object;

        /**
         * @private
         */
        $includeInLayout:boolean;

        /**
         * @language en_US
         * Specifies whether this component is included in the layout of the
         * parent container.
         * If <code>false</code>, the object size and position are not affected by its parent container's
         * layout.
         * This value is different with <code>visible</code>. the object size and position is still affected by its parent
         * container's layout when the <code>visible</code> is false.
         * @default true
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         *
         * @default true
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public includeInLayout:boolean;
        /**
         * @language en_US
         * The horizontal distance in pixels from the left edge of the component to the
         * anchor target's left edge.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器离左边距离。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public left:number;

        /**
         * @language en_US
         * The horizontal distance in pixels from the right edge of the component to the
         * anchor target's right edge.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器右边距离。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public right:number;

        /**
         * @language en_US
         * The vertical distance in pixels from the top edge of the component to the
         * anchor target's top edge.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器顶部距离。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public top:number;

        /**
         * @language en_US
         * The vertical distance in pixels from the bottom edge of the component to the
         * anchor target's bottom edge.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 距父级容器底部距离。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public bottom:number;

        /**
         * @language en_US
         * The horizontal distance in pixels from the center of the component to the
         * center of the anchor target's content area.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在父级容器中距水平中心位置的距离。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public horizontalCenter:number;

        /**
         * @language en_US
         * The vertical distance in pixels from the center of the component to the
         *  center of the anchor target's content area.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在父级容器中距竖直中心位置的距离。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public verticalCenter:number;

        /**
         * @language en_US
         * Specifies the width of a component as a percentage
         * of its parent's size. Allowed values are 0-100.
         * Setting the <code>width</code> or <code>explicitWidth</code> properties
         * resets this property to lark.NONE.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 相对父级容器宽度的百分比。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public percentWidth:number;

        /**
         * @language en_US
         * Specifies the height of a component as a percentage
         * of its parent's size. Allowed values are 0-100.
         * Setting the <code>height</code> or <code>explicitHeight</code> properties
         * resets this property to lark.NONE.
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 相对父级容器高度的百分比。
         *
         * @default lark.NONE
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public percentHeight:number;

        /**
         * @language en_US
         * Number that specifies the explicit width of the component,
         * in pixels, in the component's coordinates.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 外部显式指定的宽度。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public explicitWidth:number;

        /**
         * @language en_US
         * Number that specifies the explicit height of the component,
         * in pixels, in the component's coordinates.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 外部显式指定的高度。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public explicitHeight:number;


        /**
         * @language en_US
         * The minimum recommended width of the component to be considered
         * by the parent during layout. This value is in the
         * component's coordinates, in pixels. The default value depends on
         * the component's implementation.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public minWidth:number;
        /**
         * @language en_US
         * The maximum recommended width of the component to be considered
         * by the parent during layout. This value is in the
         * component's coordinates, in pixels. The default value of this property is
         * set by the component developer.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public maxWidth:number;

        /**
         * @language en_US
         * The minimum recommended height of the component to be considered
         * by the parent during layout. This value is in the
         * component's coordinates, in pixels. The default value depends on
         * the component's implementation.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public minHeight:number;
        /**
         * @language en_US
         * The maximum recommended height of the component to be considered
         * by the parent during layout. This value is in the
         * component's coordinates, in pixels. The default value of this property is
         * set by the component developer.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public maxHeight:number;


        /**
         * @language en_US
         * Set the result of measuring.
         * @param width measured width
         * @param height measured height
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setMeasuredSize(width:number, height:number):void {
        }

        /**
         * @language en_US
         * Marks a component so that its <code>commitProperties()</code>
         * method gets called during a later screen update.<p/>
         *
         * Invalidation is a useful mechanism for eliminating duplicate
         * work by delaying processing of changes to a component until a
         * later screen update.<p/>
         *
         * For example, if you want to change the text color and size,
         * it would be wasteful to update the color immediately after you
         * change it and then update the size when it gets set.
         * It is more efficient to change both properties and then render
         * the text with its new size and color once.<p/>
         *
         * Invalidation methods rarely get called.
         * In general, setting a property on a component automatically
         * calls the appropriate invalidation method.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记提交过需要延迟应用的属性，以便在稍后屏幕更新期间调用该组件的 commitProperties() 方法。<p/>
         *
         * 这是一个很有用的机制，可将组件更改延迟到稍后屏幕更新时进行处理，从而消除了重复的工作。<p/>
         *
         * 例如，要更改文本颜色和大小，如果在更改颜色后立即进行更新，然后在设置大小后再更新大小，就有些浪费。
         * 同时更改两个属性后再使用新的大小和颜色一次性呈示文本，效率会更高。<p/>
         *
         * 很少调用 Invalidation 方法。通常，在组件上设置属性会自动调用合适的 invalidation 方法。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateProperties():void {
        }

        /**
         * @language en_US
         * Used by layout logic to validate the properties of a component
         * by calling the <code>commitProperties()</code> method.
         * In general, subclassers should
         * override the <code>commitProperties()</code> method and not this method.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由布局逻辑用于通过调用 commitProperties() 方法来验证组件的属性。
         * 通常，子类应覆盖 commitProperties() 方法，而不是覆盖此方法。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateProperties():void {
        }

        /**
         * @language en_US
         * Marks a component so that its <code>measure()</code>
         * method gets called during a later screen update.<p/>
         *
         * Invalidation is a useful mechanism for eliminating duplicate
         * work by delaying processing of changes to a component until a
         * later screen update.<p/>
         *
         * For example, if you want to change the text and font size,
         * it would be wasteful to update the text immediately after you
         * change it and then update the size when it gets set.
         * It is more efficient to change both properties and then render
         * the text with its new size once.<p/>
         *
         * Invalidation methods rarely get called.
         * In general, setting a property on a component automatically
         * calls the appropriate invalidation method.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记提交过需要验证组件尺寸，以便在稍后屏幕更新期间调用该组件的 measure() 方法。<p/>
         *
         * Invalidation 是一个很有用的机制，可将组件更改延迟到稍后屏幕更新时进行处理，从而消除了重复的工作。<p/>
         *
         * 例如，要更改文本和字体大小，如果在更改文本后立即进行更新，然后在设置大小后再更新大小，就有些浪费。
         * 更改两个属性后再使用新的大小一次性呈示文本，效率会更高。<p/>
         *
         * 很少调用 Invalidation 方法。通常，在组件上设置属性会自动调用合适的 invalidation 方法。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateSize():void {
        }

        /**
         * @language en_US
         * Validates the measured size of the component.
         * @param recursive If <code>true</code>, call this method
         *  on the objects children.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 验证组件的尺寸。
         * @param recursive 如果为 true，则调用对象子项的此方法。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateSize(recursive?:boolean):void {
        }

        /**
         * @language en_US
         * Marks a component so that its <code>updateDisplayList()</code>
         * method gets called during a later screen update.<p/>
         *
         * Invalidation is a useful mechanism for eliminating duplicate
         * work by delaying processing of changes to a component until a
         * later screen update.<p/>
         *
         * For example, if you want to change the width and height,
         * it would be wasteful to update the component immediately after you
         * change the width and then update again with the new height.
         * It is more efficient to change both properties and then render
         * the component with its new size once.<p/>
         *
         * Invalidation methods rarely get called.
         * In general, setting a property on a component automatically
         * calls the appropriate invalidation method.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标记需要验证显示列表，以便在稍后屏幕更新期间调用该组件的 updateDisplayList() 方法。<p/>
         *
         * Invalidation 是一个很有用的机制，可将组件更改延迟到稍后屏幕更新时进行处理，从而消除了重复的工作。<p/>
         *
         * 例如，要更改宽度和高度，如果在更改宽度后立即更新组件，然后在设置新高度后再次更新组件，就有些浪费。
         * 更改两个属性后再使用新的大小一次性呈示组件，效率会更高。<p/>
         *
         * 很少调用 Invalidation 方法。通常，在组件上设置属性会自动调用合适的 invalidation 方法。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public invalidateDisplayList():void {
        }

        /**
         * @language en_US
         * Validates the position and size of children and draws other
         * visuals.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 验证子项的位置和大小，并绘制其他可视内容。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateDisplayList():void {
        }

        /**
         * @language en_US
         * Validate and update the properties and layout of this object
         * and redraw it, if necessary.<p/>
         *
         * Processing properties that require substantial computation are normally
         * not processed until the script finishes executing.<p/>
         *
         * For example setting the <code>width</code> property is delayed, because it can
         * require recalculating the widths of the objects children or its parent.
         * Delaying the processing prevents it from being repeated
         * multiple times if the script sets the <code>width</code> property more than once.
         * This method lets you manually override this behavior.
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 验证并更新此对象的属性和布局，如果需要的话重绘对象。<p/>
         *
         * 通常只有当脚本执行完毕后，才会处理要求进行大量计算的处理属性。<p/>
         *
         * 例如，对 width 属性的设置可能会延迟，因为此设置需要重新计算这些对象的子项或父项的宽度。
         * 如果脚本多次设置了 width 属性，则延迟处理可防止进行多次处理。此方法允许您手动覆盖此行为。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public validateNow():void {
        }

        /**
         * @language en_US
         * Sets the layout size of the element.
         * This is the size that the element uses to draw on screen.<p/>
         *
         * If the <code>width</code> and/or <code>height</code> parameters are left unspecified (lark.NONE),
         * Swan sets the element's layout size to its preferred width and/or preferred height.<p/>
         *
         * Note that calls to the <code>setLayoutBoundSize()</code> method can affect the layout position, so
         * call <code>setLayoutBoundPosition()</code> after calling <code>setLayoutBoundSize()</code>.<p/>
         *
         * @param layoutWidth The element's layout width.
         * @param layoutHeight The element's layout height.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置元素的布局大小。这是元素在屏幕上进行绘制时所用的大小。<p/>
         *
         * 如果 width 和/或 height 参数尚未指定 (lark.NONE))，则 Swan 会将该元素的布局大小设置为首选宽度和/或首选高度。<p/>
         *
         * 请注意，调用 setLayoutBoundSize() 方法会影响布局位置，因此请在调用 setLayoutBoundSize()
         * 之后再调用 setLayoutBoundPosition()。
         *
         * @param layoutWidth 元素的布局宽度。
         * @param layoutHeight 元素的布局高度。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void {
        }

        /**
         * @language en_US
         * Sets the coordinates that the element uses to draw on screen.<p/>
         *
         * Note that calls to the <code>setLayoutBoundSize()</code> method can affect the layout position, so
         * call <code>setLayoutBoundPosition()</code> after calling <code>setLayoutBoundSize()</code>.<p/>
         *
         * @param x The x-coordinate of the top-left corner of the bounding box.
         * @param y The y-coordinate of the top-left corner of the bounding box.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置元素在屏幕上进行绘制时所用的布局坐标。<p/>
         *
         * 请注意，调用 setLayoutBoundSize() 方法会影响布局位置，因此请在调用 setLayoutBoundSize()
         * 之后再调用 setLayoutBoundPosition()。
         *
         * @param x 边框左上角的 X 坐标。
         * @param y 边框左上角的 Y 坐标。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public setLayoutBoundsPosition(x:number, y:number):void {
        }

        /**
         * @language en_US
         * Get the layout bounds that the element uses to draw on screen.
         * Commonly used in the <code>updateDisplayList()</code> method in parent container.<p/>
         * Priority: layout > explicit > measure.<p/>
         * The result of this method is contains <code>scale</code> and <code>rotation</code>.
         *
         * @param bounds the instance of <code>lark.Rectangle</code> can set result.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件的布局尺寸,常用于父级的<code>updateDisplayList()</code>方法中。<p/>
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸。<p/>
         * 注意此方法返回值已经包含scale和rotation。
         *
         * @param bounds 可以放置结果的<code>lark.Rectangle</code>实例。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public getLayoutBounds(bounds:lark.Rectangle):void {
        }

        /**
         * @language en_US
         * Get the element's preferred bounds。
         * Commonly used in the <code>measure()</code> method in parent container.<p/>
         * Priority: explicit > measure.<p/>
         * The result of this method is contains <code>scale</code> and <code>rotation</code>.
         *
         * @param bounds the instance of <code>lark.Rectangle</code> can set result.
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取组件的首选尺寸,常用于父级的<code>measure()</code>方法中。<p/>
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸。<p/>
         * 注意此方法返回值已经包含scale和rotation。
         *
         * @param bounds 可以放置结果的<code>lark.Rectangle</code>实例。
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
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