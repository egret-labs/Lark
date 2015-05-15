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

    var groupCount:number = 0;

    /**
     * 显示列表深度排序
     */
    function breadthOrderCompare(a:DisplayObject, b:DisplayObject):number {
        var aParent = a.parent;
        var bParent = b.parent;

        if (!aParent || !bParent)
            return 0;

        var aNestLevel = a.$nestLevel;
        var bNestLevel = b.$nestLevel;

        var aIndex = 0;
        var bIndex = 0;

        if (aParent == bParent) {
            aIndex = aParent.getChildIndex(a);
            bIndex = bParent.getChildIndex(b);
        }

        if (aNestLevel > bNestLevel || aIndex > bIndex)
            return 1;
        if (aNestLevel < bNestLevel || bIndex > aIndex)
            return -1;
        if (a == b)
            return 0;
        return breadthOrderCompare(aParent, bParent);
    }


    /**
     * RadioButtonGroup 组件定义一组 RadioButton 组件，这些组件相互排斥；因此，用户每次只能选择一个 RadioButton 组件
     */
    export class RadioButtonGroup extends EventEmitter {
        /**
         * 创建一个RadioButtonGroup实例
         */
        public constructor() {
            super();
            this.$name = "_radioButtonGroup" + groupCount++;
        }

        /**
         * 组名
         */
        $name:string = null;
        /**
         * 单选按钮列表
         */
        private radioButtons:RadioButton[] = [];

        /**
         * 获取指定索引的单选按钮
         * @param index 单选按钮的索引
         */
        public getRadioButtonAt(index:number):RadioButton {
            return this.radioButtons[index];
        }

        $enabled:boolean = true;

        /**
         * 组件是否可以接受用户交互。默认值为true。设置此属性将影响组内所有单选按钮。
         */
        public get enabled():boolean {
            return this.$enabled;
        }

        public set enabled(value:boolean) {
            value = !!value;
            if (this.$enabled === value)
                return;
            this.$enabled = value;
            var buttons = this.radioButtons;
            var length = buttons.length;
            for (var i = 0; i < length; i++)
                buttons[i].invalidateSkinState();
        }

        /**
         * 组内单选按钮数量
         */
        public get numRadioButtons():number {
            return this.radioButtons.length;
        }

        private _selectedValue:any = null;
        /**
         * 当前被选中的单选按钮的value属性值。注意，此属性仅当目标RadioButton在显示列表时有效。
         */
        public get selectedValue():any {
            if (this.selection) {
                return this.selection.value != null ?
                    this.selection.value :
                    this.selection.label;
            }
            return null;
        }

        public set selectedValue(value:any) {
            this._selectedValue = value;
            if (value == null) {
                this.$setSelection(null, false);
                return;
            }
            var n = this.numRadioButtons;
            for (var i = 0; i < n; i++) {
                var radioButton = this.radioButtons[i];
                if (radioButton.value == value ||
                    radioButton.label == value) {
                    this.changeSelection(i, false);
                    this._selectedValue = null;
                    UIEvent.emitUIEvent(this, UIEvent.VALUE_COMMIT);
                    break;
                }
            }
        }

        private _selection:RadioButton = null;
        /**
         * 当前被选中的单选按钮引用,注意，此属性仅当目标RadioButton在显示列表时有效。
         */
        public get selection():RadioButton {
            return this._selection;
        }

        public set selection(value:RadioButton) {
            if (this._selection == value)
                return;
            this.$setSelection(value, false);
        }

        /**
         * 添加单选按钮到组内
         */
        $addInstance(instance:RadioButton):void {
            instance.on(Event.REMOVED, this.removedHandler, this);
            var buttons = this.radioButtons;
            buttons.push(instance);
            buttons.sort(breadthOrderCompare);
            var length = buttons.length;
            for (var i = 0; i < length; i++) {
                buttons[i].$indexNumber = i;
            }
            if (this._selectedValue)
                this.selectedValue = this._selectedValue;
            if (instance.selected == true)
                this.selection = instance;

            instance.$radioButtonGroup = this;
            instance.invalidateSkinState();
        }

        /**
         * 从组里移除单选按钮
         */
        $removeInstance(instance:RadioButton, addListener?:boolean):void {
            if (instance) {
                var foundInstance = false;
                var buttons = this.radioButtons;
                var length = buttons.length;
                for (var i = 0; i < length; i++) {
                    var rb = buttons[i];
                    if (foundInstance) {
                        rb.$indexNumber = rb.$indexNumber - 1;
                    }
                    else if (rb == instance) {
                        if (addListener)
                            instance.on(Event.ADDED, this.addedHandler, this);
                        if (instance == this._selection)
                            this._selection = null;
                        instance.$radioButtonGroup = null;
                        instance.invalidateSkinState();
                        this.radioButtons.splice(i, 1);
                        foundInstance = true;
                        i--;
                    }
                }
            }
        }

        /**
         * 设置选中的单选按钮
         */
        $setSelection(value:RadioButton, fireChange?:boolean):void {
            if (this._selection == value)
                return;

            if (!value) {
                if (this._selection) {
                    this._selection.selected = false;
                    this._selection = null;
                    if (fireChange)
                        this.emitWith(Event.CHANGE);
                }
            }
            else {
                var n = this.numRadioButtons;
                for (var i = 0; i < n; i++) {
                    if (value == this.getRadioButtonAt(i)) {
                        this.changeSelection(i, fireChange);
                        break;
                    }
                }
            }
            UIEvent.emitUIEvent(this, UIEvent.VALUE_COMMIT);
        }

        /**
         * 改变选中项
         */
        private changeSelection(index:number, fireChange?:boolean):void {
            var rb = this.getRadioButtonAt(index);
            if (rb && rb != this._selection) {

                if (this._selection)
                    this._selection.selected = false;
                this._selection = rb;
                this._selection.selected = true;
                if (fireChange)
                    this.emitWith(Event.CHANGE);
            }
        }


        /**
         * 单选按钮添加到显示列表
         */
        private addedHandler(event:Event):void {
            var rb:RadioButton = event.target;
            if (rb) {
                rb.removeListener(Event.ADDED, this.addedHandler, this);
                this.$addInstance(rb);
            }
        }

        /**
         * 单选按钮从显示列表移除
         */
        private removedHandler(event:Event):void {
            var rb:RadioButton = event.target;
            if (rb) {
                rb.removeListener(Event.REMOVED, this.removedHandler, this);
                this.$removeInstance(rb, true);
            }
        }
    }

    registerClass(RadioButtonGroup,Types.RadioButtonGroup);

}