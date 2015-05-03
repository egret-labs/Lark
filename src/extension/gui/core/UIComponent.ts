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
     * GUI显示对象基类
     */
    export interface UIComponent extends DisplayObject {

        ///**
        // * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
        // * 请务必调用super.createChildren()以完成父类组件的初始化
        // */
        // protected createChildren():void{
        // }

        ///**
        // * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
        // */
        // protected commitProperties():void{
        // }

        ///**
        // * 测量组件尺寸
        // */
        // protected measure():void{
        // }

        ///**
        // * 更新显示列表
        // */
        // protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void{
        // }

        ///**
        // * 标记父级容器的尺寸和显示列表为失效
        // */
        // protected invalidateParentSizeAndDisplayList:()=>void;

        $uiValues:Float64Array;

        $includeInLayout:boolean;

        /**
         * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
         * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
         */
        includeInLayout:boolean;
        /**
         * 距父级容器离左边距离
         */
        left:number;

        /**
         * 距父级容器右边距离
         */
        right:number;

        /**
         * 距父级容器顶部距离
         */
        top:number;

        /**
         * 距父级容器底部距离
         */
        bottom:number;

        /**
         * 在父级容器中距水平中心位置的距离
         */
        horizontalCenter:number;

        /**
         * 在父级容器中距竖直中心位置的距离
         */
        verticalCenter:number;

        /**
         * 相对父级容器宽度的百分比
         */
        percentWidth:number;

        /**
         * 相对父级容器高度的百分比
         */
        percentHeight:number;

        /**
         * 外部显式指定的宽度
         */
        explicitWidth:number;

        /**
         * 外部显式指定的高度
         */
        explicitHeight:number;


        /**
         * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
         */
        minWidth:number;
        /**
         * 组件的最大高度。同时影响测量和自动布局的尺寸。
         */
        maxWidth:number;

        /**
         * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
         */
        minHeight:number;
        /**
         * 组件的最大高度,同时影响测量和自动布局的尺寸。
         */
        maxHeight:number;

        /**
         * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
         */
        measuredWidth:number;

        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         */
        measuredHeight:number;

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        setMeasuredSize(width:number, height:number):void;


        /**
         * 标记提交过需要延迟应用的属性
         */
        invalidateProperties():void;

        /**
         * 验证组件的属性
         */
        validateProperties():void;

        /**
         * 标记提交过需要验证组件尺寸
         */
        invalidateSize():void;

        /**
         * 验证组件的尺寸
         */
        validateSize():void;

        /**
         * 标记需要验证显示列表
         */
        invalidateDisplayList():void;

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        validateDisplayList():void;

        /**
         * 立即应用组件及其子项的所有属性
         */
        validateNow():void;

        /**
         * 设置组件的布局宽高
         */
        setLayoutBoundsSize(layoutWidth:number, layoutHeight:number):void;

        /**
         * 设置组件的布局位置
         */
        setLayoutBoundsPosition(x:number, y:number):void;

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        getLayoutBounds(bounds:Rectangle):Rectangle;

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        getPreferredBounds(bounds:Rectangle):Rectangle;
    }

}

module lark.player {

    function isDeltaIdentity(m) {
        return (m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1);
    }
    // 请不要直接修改以下代码内容，正确的修改步骤：
    //
    // 1.在UIComponentImpl修改，编译生成UICOmponentImpl.js
    // 2.拷贝构造函数内容到 export function UIComponent()内。
    // 3.拷贝属性和方法体（从includeInLayout属性开始，之前的方法不拷贝）声明部分到 implementUIComponent() 内。
    // 4.全局替换UIComponentImpl.prototype为prototype。
    //
    // 自定义类实现UIComponent的步骤：
    // 1.在自定义类的构造函数里调用：player.UIComponent.call(this);
    // 2.拷贝UIComponent接口定义的所有内容(包括注释掉的protected函数)到自定义类，将非注释掉的部分都加上public，并把函数声明改为=>变量声明方式。

    /**
     * UIComponent构造函数
     */
    export function UIComponent():void {
        this.$includeInLayout = true;
        this.$uiValues = new Float64Array([
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            0,
            0,
            0,
            100000,
            0,
            100000,
            0,
            0,
            lark.NONE,
            lark.NONE,
            0,
            0,
            0,
            0
        ]);
        this.createChildren();
    }

    /**
     * UIComponent代码复用工具方法
     */
    export function implementUIComponent(componentClass:any, _super:any):void {
        var prototype = componentClass.prototype;

        Object.defineProperty(prototype, "includeInLayout", {
            /**
             * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
             * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
             */
            get: function () {
                return this.$includeInLayout;
            },
            set: function (value) {
                value = !!value;
                if (this.$includeInLayout === value)
                    return;
                this.$includeInLayout = true;
                this.invalidateParentSizeAndDisplayList();
                this.$includeInLayout = value;
            },
            enumerable: true,
            configurable: true
        });
        prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this.checkInvalidateFlag();
        };
        /**
         * 检查属性失效标记并应用
         */
        prototype.checkInvalidateFlag = function (event) {
            var validator = lark.gui.validator;
            if (this.$hasFlags(131072 /* InvalidatePropertiesFlag */)) {
                validator.invalidateProperties(this);
            }
            if (this.$hasFlags(262144 /* InvalidateSizeFlag */)) {
                validator.invalidateSize(this);
            }
            if (this.$hasFlags(524288 /* InvalidateDisplayListFlag */)) {
                validator.invalidateDisplayList(this);
            }
        };
        Object.defineProperty(prototype, "left", {
            /**
             * 距父级容器离左边距离
             */
            get: function () {
                return this.$uiValues[0 /* left */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[0 /* left */] === value)
                    return;
                values[0 /* left */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "right", {
            /**
             * 距父级容器右边距离
             */
            get: function () {
                return this.$uiValues[1 /* right */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[1 /* right */] === value)
                    return;
                values[1 /* right */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "top", {
            /**
             * 距父级容器顶部距离
             */
            get: function () {
                return this.$uiValues[2 /* top */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[2 /* top */] === value)
                    return;
                values[2 /* top */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "bottom", {
            /**
             * 距父级容器底部距离
             */
            get: function () {
                return this.$uiValues[3 /* bottom */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[3 /* bottom */] == value)
                    return;
                values[3 /* bottom */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "horizontalCenter", {
            /**
             * 在父级容器中距水平中心位置的距离
             */
            get: function () {
                return this.$uiValues[4 /* horizontalCenter */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[4 /* horizontalCenter */] === value)
                    return;
                values[4 /* horizontalCenter */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "verticalCenter", {
            /**
             * 在父级容器中距竖直中心位置的距离
             */
            get: function () {
                return this.$uiValues[5 /* verticalCenter */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[5 /* verticalCenter */] === value)
                    return;
                values[5 /* verticalCenter */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "percentWidth", {
            /**
             * 相对父级容器宽度的百分比
             */
            get: function () {
                return this.$uiValues[6 /* percentWidth */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[6 /* percentWidth */] === value)
                    return;
                values[6 /* percentWidth */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "percentHeight", {
            /**
             * 相对父级容器高度的百分比
             */
            get: function () {
                return this.$uiValues[7 /* percentHeight */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[7 /* percentHeight */] === value)
                    return;
                values[7 /* percentHeight */] = value;
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "explicitWidth", {
            /**
             * 外部显式指定的宽度
             */
            get: function () {
                return this.$uiValues[8 /* explicitWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "explicitHeight", {
            /**
             * 外部显式指定的高度
             */
            get: function () {
                return this.$uiValues[9 /* explicitHeight */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "width", {
            /**
             * 组件宽度,默认值为lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
             */
            get: function () {
                return this.$uiValues[10 /* width */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[10 /* width */] === value && values[8 /* explicitWidth */] === value)
                    return;
                values[10 /* width */] = value;
                values[8 /* explicitWidth */] = value;
                if (lark.isNone(value))
                    this.invalidateSize();
                this.invalidateDisplayList();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "height", {
            /**
             * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
             */
            get: function () {
                return this.$uiValues[11 /* height */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[11 /* height */] === value && values[9 /* explicitHeight */] === value)
                    return;
                values[11 /* height */] = value;
                values[8 /* explicitWidth */] = value;
                if (isNaN(value))
                    this.invalidateSize();
                this.invalidateDisplayList();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        prototype.$setScaleX = function (value) {
            var change = _super.prototype.$setScaleX.call(this, value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        prototype.$setScaleY = function (value) {
            var change = _super.prototype.$setScaleY.call(this, value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        Object.defineProperty(prototype, "minWidth", {
            /**
             * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
             */
            get: function () {
                return this.$uiValues[12 /* minWidth */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[12 /* minWidth */] === value) {
                    return;
                }
                values[12 /* minWidth */] = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "maxWidth", {
            /**
             * 组件的最大高度。同时影响测量和自动布局的尺寸。
             */
            get: function () {
                return this.$uiValues[13 /* maxWidth */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[13 /* maxWidth */] === value) {
                    return;
                }
                values[13 /* maxWidth */] = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "minHeight", {
            /**
             * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
             */
            get: function () {
                return this.$uiValues[14 /* minHeight */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[14 /* minHeight */] === value) {
                    return;
                }
                values[14 /* minHeight */] = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "maxHeight", {
            /**
             * 组件的最大高度,同时影响测量和自动布局的尺寸。
             */
            get: function () {
                return this.$uiValues[15 /* maxHeight */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiValues;
                if (values[15 /* maxHeight */] === value) {
                    return;
                }
                values[15 /* maxHeight */] = value;
                this.invalidateSize();
                this.invalidateParentSizeAndDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredWidth", {
            /**
             * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
             */
            get: function () {
                return this.$uiValues[16 /* measuredWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredHeight", {
            /**
             * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
             */
            get: function () {
                return this.$uiValues[17 /* measuredHeight */];
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        prototype.setMeasuredSize = function (width, height) {
            var values = this.$uiValues;
            values[16 /* measuredWidth */] = Math.ceil(+width || 0);
            values[17 /* measuredHeight */] = Math.ceil(+height || 0);
        };
        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        prototype.setActualSize = function (w, h) {
            var change = false;
            var values = this.$uiValues;
            if (values[10 /* width */] !== w) {
                values[10 /* width */] = w;
                change = true;
            }
            if (values[11 /* height */] !== h) {
                values[11 /* height */] = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
            }
        };
        prototype.$setX = function (value) {
            var change = _super.prototype.$setX.call(this, value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        prototype.$setY = function (value) {
            var change = _super.prototype.$setY.call(this, value);
            if (change) {
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        /**
         * 标记属性失效
         */
        prototype.invalidateProperties = function () {
            if (!this.$hasFlags(131072 /* InvalidatePropertiesFlag */)) {
                this.$setFlags(131072 /* InvalidatePropertiesFlag */);
                if (this.$stage)
                    lark.gui.validator.invalidateProperties(this);
            }
        };
        /**
         * 验证组件的属性
         */
        prototype.validateProperties = function () {
            if (this.$hasFlags(131072 /* InvalidatePropertiesFlag */)) {
                this.commitProperties();
                this.$removeFlags(131072 /* InvalidatePropertiesFlag */);
            }
        };
        /**
         * 标记提交过需要验证组件尺寸
         */
        prototype.invalidateSize = function () {
            if (!this.$hasFlags(262144 /* InvalidateSizeFlag */)) {
                this.$setFlags(262144 /* InvalidateSizeFlag */);
                if (this.$stage)
                    lark.gui.validator.invalidateSize(this);
            }
        };
        /**
         * 验证组件的尺寸
         */
        prototype.validateSize = function () {
            if (this.$hasFlags(262144 /* InvalidateSizeFlag */)) {
                var changed = this.measureSizes();
                if (changed) {
                    this.invalidateDisplayList();
                    this.invalidateParentSizeAndDisplayList();
                }
                this.$removeFlags(262144 /* InvalidateSizeFlag */);
            }
        };
        /**
         * 测量组件尺寸，返回尺寸是否发生变化
         */
        prototype.measureSizes = function () {
            var changed = false;
            if (!this.$hasFlags(262144 /* InvalidateSizeFlag */))
                return changed;
            var values = this.$uiValues;
            if (lark.isNone(values[8 /* explicitWidth */]) || lark.isNone(values[9 /* explicitHeight */])) {
                this.measure();
                if (values[16 /* measuredWidth */] < values[12 /* minWidth */]) {
                    values[16 /* measuredWidth */] = values[12 /* minWidth */];
                }
                if (values[16 /* measuredWidth */] > values[13 /* maxWidth */]) {
                    values[16 /* measuredWidth */] = values[13 /* maxWidth */];
                }
                if (values[17 /* measuredHeight */] < values[14 /* minHeight */]) {
                    values[17 /* measuredHeight */] = values[14 /* minHeight */];
                }
                if (values[17 /* measuredHeight */] > values[15 /* maxHeight */]) {
                    values[17 /* measuredHeight */] = values[15 /* maxHeight */];
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            if (preferredW !== values[18 /* oldPreferWidth */] || preferredH !== values[19 /* oldPreferHeight */]) {
                values[18 /* oldPreferWidth */] = preferredW;
                values[19 /* oldPreferHeight */] = preferredH;
                changed = true;
            }
            return changed;
        };
        /**
         * 标记需要验证显示列表
         */
        prototype.invalidateDisplayList = function () {
            if (!this.$hasFlags(524288 /* InvalidateDisplayListFlag */)) {
                this.$setFlags(524288 /* InvalidateDisplayListFlag */);
                if (this.$stage)
                    lark.gui.validator.invalidateDisplayList(this);
            }
        };
        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        prototype.validateDisplayList = function () {
            if (this.$hasFlags(524288 /* InvalidateDisplayListFlag */)) {
                var unscaledWidth = 0;
                var unscaledHeight = 0;
                var values = this.$uiValues;
                if (this.$hasFlags(1048576 /* LayoutWidthExplicitlySet */)) {
                    unscaledWidth = values[10 /* width */];
                }
                else if (!lark.isNone(values[8 /* explicitWidth */])) {
                    unscaledWidth = values[8 /* explicitWidth */];
                }
                else {
                    unscaledWidth = values[16 /* measuredWidth */];
                }
                if (this.$hasFlags(2097152 /* LayoutHeightExplicitlySet */)) {
                    unscaledHeight = values[11 /* height */];
                }
                else if (!lark.isNone(values[9 /* explicitHeight */])) {
                    unscaledHeight = values[9 /* explicitHeight */];
                }
                else {
                    unscaledHeight = values[17 /* measuredHeight */];
                }
                this.setActualSize(unscaledWidth, unscaledHeight);
                this.updateDisplayList(unscaledWidth, unscaledHeight);
                this.$removeFlags(524288 /* InvalidateDisplayListFlag */);
            }
        };
        /**
         * 立即应用组件及其子项的所有属性
         */
        prototype.validateNow = function () {
            if (this.$stage)
                lark.gui.validator.validateClient(this);
        };
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        prototype.invalidateParentSizeAndDisplayList = function () {
            var parent = this.$parent;
            if (!parent || !this.$includeInLayout || !(parent.isType(1001 /* UIComponent */)))
                return;
            parent.invalidateSize();
            parent.invalidateDisplayList();
        };
        /**
         * 设置组件的布局宽高
         */
        prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            layoutHeight = +layoutHeight || 0;
            layoutWidth = +layoutWidth || 0;
            var values = this.$uiValues;
            var maxWidth = values[13 /* maxWidth */];
            var maxHeight = values[15 /* maxHeight */];
            var minWidth = Math.min(values[12 /* minWidth */], maxWidth);
            var minHeight = Math.min(values[14 /* minHeight */], maxHeight);
            var width;
            var height;
            if (lark.isNone(layoutWidth)) {
                this.$removeFlags(1048576 /* LayoutWidthExplicitlySet */);
                width = this.getPreferredUWidth();
            }
            else {
                this.$setFlags(1048576 /* LayoutWidthExplicitlySet */);
                width = Math.max(minWidth, Math.min(maxWidth, layoutWidth));
            }
            if (lark.isNone(layoutHeight)) {
                this.$removeFlags(2097152 /* LayoutHeightExplicitlySet */);
                height = this.getPreferredUHeight();
            }
            else {
                this.$setFlags(2097152 /* LayoutHeightExplicitlySet */);
                height = Math.max(minHeight, Math.min(maxHeight, layoutHeight));
            }
            var matrix = this.$getMatrix();
            if (isDeltaIdentity(matrix.$data)) {
                this.setActualSize(width, height);
                return;
            }
            var fitSize = player.MatrixUtil.fitBounds(layoutWidth, layoutHeight, matrix, values[8 /* explicitWidth */], values[9 /* explicitHeight */], this.getPreferredUWidth(), this.getPreferredUHeight(), minWidth, minHeight, maxWidth, maxHeight);
            if (!fitSize) {
                fitSize = lark.Point.create(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
            lark.Point.release(fitSize);
        };
        /**
         * 设置组件的布局位置
         */
        prototype.setLayoutBoundsPosition = function (x, y) {
            var matrix = this.$getMatrix();
            if (!isDeltaIdentity(matrix.$data)) {
                var bounds = this.getLayoutBounds(lark.$TempRectangle);
                x += this.$getX() - bounds.x;
                y += this.$getY() - bounds.y;
            }
            _super.prototype.$setX.call(this, x);
            _super.prototype.$setY.call(this, y);
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        prototype.getLayoutBounds = function (bounds) {
            var values = this.$uiValues;
            var w;
            if (this.$hasFlags(1048576 /* LayoutWidthExplicitlySet */)) {
                w = values[10 /* width */];
            }
            else if (!lark.isNone(values[8 /* explicitWidth */])) {
                w = values[8 /* explicitWidth */];
            }
            else {
                w = values[16 /* measuredWidth */];
            }
            var h;
            if (this.$hasFlags(2097152 /* LayoutHeightExplicitlySet */)) {
                h = values[11 /* height */];
            }
            else if (!lark.isNone(values[9 /* explicitHeight */])) {
                h = values[9 /* explicitHeight */];
            }
            else {
                h = values[17 /* measuredHeight */];
            }
            return this.applyMatrix(bounds, w, h);
        };
        prototype.getPreferredUWidth = function () {
            var values = this.$uiValues;
            return lark.isNone(values[8 /* explicitWidth */]) ? values[16 /* measuredWidth */] : values[8 /* explicitWidth */];
        };
        prototype.getPreferredUHeight = function () {
            var values = this.$uiValues;
            return lark.isNone(values[9 /* explicitHeight */]) ? values[17 /* measuredHeight */] : values[9 /* explicitHeight */];
        };
        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        prototype.getPreferredBounds = function (bounds) {
            var w = this.getPreferredUWidth();
            var h = this.getPreferredUHeight();
            return this.applyMatrix(bounds, w, h);
        };
        prototype.applyMatrix = function (bounds, w, h) {
            var bounds = bounds.setTo(0, 0, w, h);
            var matrix = this.$getMatrix();
            var m = matrix.$data;
            if (isDeltaIdentity(m)) {
                bounds.x += m[4];
                bounds.y += m[5];
            }
            else {
                matrix.$transformBounds(bounds);
            }
            return bounds;
        };
    }
}