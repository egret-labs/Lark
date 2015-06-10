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
     * 存储根据groupName自动创建的RadioButtonGroup列表
     */
    var automaticRadioButtonGroups = {};

    /**
     * @language en_US
     * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class RadioButton extends ToggleButton {
        /**
         * @language en_US
         * 创建一个RadioButton
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个RadioButton
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.groupName = "radioGroup";
        }

        /**
         * @private
         * 在RadioButtonGroup中的索引
         */
        $indexNumber:number = 0;
        /**
         * @private
         * 所属的RadioButtonGroup
         */
        $radioButtonGroup:RadioButtonGroup = null;

        /**
         * @language en_US
         * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get enabled():boolean {
            if (!this.$Component[sys.ComponentKeys.enabled]) {
                return false;
            }
            return !this.$radioButtonGroup ||
                this.$radioButtonGroup.$enabled;
        }

        public set enabled(value:boolean) {
            this.$setEnabled(value);

        }


        /**
         * @private
         */
        private _group:RadioButtonGroup = null;
        /**
         * @language en_US
         * 此单选按钮所属的组。同一个组的多个单选按钮之间互斥。
         * 若不设置此属性，则根据groupName属性自动创建一个唯一的RadioButtonGroup。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 此单选按钮所属的组。同一个组的多个单选按钮之间互斥。
         * 若不设置此属性，则根据groupName属性自动创建一个唯一的RadioButtonGroup。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get group():RadioButtonGroup {
            if (!this._group && this._groupName) {
                var g:RadioButtonGroup = automaticRadioButtonGroups[this._groupName];
                if (!g) {
                    g = new RadioButtonGroup();
                    g.$name = this._groupName;
                    automaticRadioButtonGroups[this._groupName] = g;
                }
                this._group = g;
            }
            return this._group;
        }

        public set group(value:RadioButtonGroup) {
            if (this._group == value)
                return;
            if (this.$radioButtonGroup)
                this.$radioButtonGroup.$removeInstance(this, false);
            this._group = value;
            this._groupName = value ? this.group.$name : "radioGroup";
            this.groupChanged = true;

            this.invalidateProperties();
            this.invalidateDisplayList();
        }

        /**
         * @private
         */
        private groupChanged:boolean = false;

        /**
         * @private
         */
        private _groupName:string = "radioGroup";
        /**
         * @language en_US
         * 所属组的名称,具有相同组名的多个单选按钮之间互斥。默认值:"radioGroup"。
         * 可以把此属性当做设置组的一个简便方式，作用与设置group属性相同,。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 所属组的名称,具有相同组名的多个单选按钮之间互斥。默认值:"radioGroup"。
         * 可以把此属性当做设置组的一个简便方式，作用与设置group属性相同,。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get groupName():string {
            return this._groupName;
        }

        public set groupName(value:string) {
            if (!value || value == "")
                return;
            this._groupName = value;
            if (this.$radioButtonGroup)
                this.$radioButtonGroup.$removeInstance(this, false);
            this._group = null;
            this.groupChanged = true;
            this.invalidateProperties();
            this.invalidateDisplayList();
        }

        /**
         * @private
         * 
         * @param value 
         */
        $setSelected(value:boolean) {
            super.$setSelected(value);
            this.invalidateDisplayList();
        }


        /**
         * @private
         */
        private _value:any = null;
        /**
         * @language en_US
         * 与此单选按钮关联的自定义数据。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 与此单选按钮关联的自定义数据。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get value():any {
            return this._value;
        }

        public set value(value:any) {
            if (this._value == value)
                return;

            this._value = value;

            if (this.$selected && this.group){
                PropertyEvent.emitPropertyEvent(this.group,PropertyEvent.PROPERTY_CHANGE,"selectedValue");
            }
        }

        /**
         * @language en_US
         * 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties():void {
            if (this.groupChanged) {
                this.addToGroup();
                this.groupChanged = false;
            }
            super.commitProperties();
        }


        /**
         * @language en_US
         * 
         * @param unscaledWidth 
         * @param unscaledHeight 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @param unscaledWidth 
         * @param unscaledHeight 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            if (this.group) {
                if (this.$selected)
                    this._group.$setSelection(this, false);
                else if (this.group.selection == this)
                    this._group.$setSelection(null, false);
            }
        }

        /**
         * @language en_US
         * 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected buttonReleased():void {
            if (!this.enabled || this.selected)
                return;
            if (!this.$radioButtonGroup)
                this.addToGroup();
            super.buttonReleased();
            this.group.$setSelection(this, true);
        }

        /**
         * @private
         * 添此单选按钮加到组
         */
        private addToGroup():RadioButtonGroup {
            var g:RadioButtonGroup = this.group;
            if (g)
                g.$addInstance(this);
            return g;
        }
    }

    lark.registerClass(RadioButton,Types.RadioButton);
}