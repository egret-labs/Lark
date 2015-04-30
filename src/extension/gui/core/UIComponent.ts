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
        // protected createChildren():void;

        ///**
        // * 标记父级容器的尺寸和显示列表为失效
        // */
        // protected invalidateParentSizeAndDisplayList():void;

        ///**
        // * 更新显示列表
        // */
        // protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void;

        ///**
        // * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
        // */
        // protected commitProperties():void;

        ///**
        // * 测量组件尺寸
        // */
        // protected measure():void;

        $uiComponentValues:Float64Array;

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

    export function UIComponent():void {
        this.$includeInLayout = true;
        this.$uiComponentValues = new Float64Array([
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
            lark.NONE,
            0,
            lark.NONE,
            0,
            0,
            100000,
            0,
            100000,
            0,
            0,
            lark.NONE,
            lark.NONE,
            lark.NONE,
            lark.NONE,
        ]);
        this.createChildren();
    }

    /**
     * UIComponent代码复用工具方法
     */
    export function implementUIComponent(componentClass:any, _super:any):void {
        var prototype = componentClass.prototype;

        var commitProperties = prototype.commitProperties;
        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        prototype.commitProperties = function () {
            var values = this.$uiComponentValues;
            if (values[10 /* oldWidth */] != values[11 /* width */] || values[12 /* oldHeight */] != values[13 /* height */]) {
                this.emitResizeEvent();
            }
            if (values[20 /* oldX */] != this.$getX() || values[21 /* oldY */] != this.$getY()) {
                this.emitMoveEvent();
            }
            commitProperties();
        };

        var measure = prototype.measure;
        /**
         * 测量组件尺寸
         */
        prototype.measure = function () {
            var values = this.$uiComponentValues;
            values[19 /* measuredHeight */] = 0;
            values[18 /* measuredWidth */] = 0;
            measure();
        };

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
                return this.$uiComponentValues[0 /* left */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[1 /* right */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[2 /* top */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[3 /* bottom */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[4 /* horizontalCenter */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[5 /* verticalCenter */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[6 /* percentWidth */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[7 /* percentHeight */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
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
                return this.$uiComponentValues[8 /* explicitWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "explicitHeight", {
            /**
             * 外部显式指定的高度
             */
            get: function () {
                return this.$uiComponentValues[9 /* explicitHeight */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "width", {
            /**
             * 组件宽度,默认值为lark.NONE,设置为lark.NONE将使用组件的measure()方法自动计算尺寸
             */
            get: function () {
                return this.$uiComponentValues[11 /* width */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
                if (values[11 /* width */] === value && values[8 /* explicitWidth */] === value)
                    return;
                values[11 /* width */] = value;
                values[8 /* explicitWidth */] = value;
                if (lark.isNone(value))
                    this.invalidateSize();
                this.invalidateProperties();
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
                return this.$uiComponentValues[13 /* height */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
                if (values[13 /* height */] === value && values[9 /* explicitHeight */] === value)
                    return;
                values[13 /* height */] = value;
                values[8 /* explicitWidth */] = value;
                if (isNaN(value))
                    this.invalidateSize();
                this.invalidateProperties();
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
                return this.$uiComponentValues[14 /* minWidth */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
                if (values[14 /* minWidth */] === value) {
                    return;
                }
                values[14 /* minWidth */] = value;
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
                return this.$uiComponentValues[15 /* maxWidth */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
                if (values[15 /* maxWidth */] === value) {
                    return;
                }
                values[15 /* maxWidth */] = value;
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
                return this.$uiComponentValues[16 /* minHeight */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
                if (values[16 /* minHeight */] === value) {
                    return;
                }
                values[16 /* minHeight */] = value;
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
                return this.$uiComponentValues[17 /* maxHeight */];
            },
            set: function (value) {
                value = +value || 0;
                var values = this.$uiComponentValues;
                if (values[17 /* maxHeight */] === value) {
                    return;
                }
                values[17 /* maxHeight */] = value;
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
                return this.$uiComponentValues[18 /* measuredWidth */];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(prototype, "measuredHeight", {
            /**
             * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
             */
            get: function () {
                return this.$uiComponentValues[19 /* measuredHeight */];
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
            var values = this.$uiComponentValues;
            values[18 /* measuredWidth */] = Math.ceil(+width || 0);
            values[19 /* measuredHeight */] = Math.ceil(+height || 0);
        };
        /**
         * 设置组件的宽高。此方法不同于直接设置width,height属性，
         * 不会影响显式标记尺寸属性
         */
        prototype.setActualSize = function (w, h) {
            var change = false;
            var values = this.$uiComponentValues;
            if (values[11 /* width */] !== w) {
                values[11 /* width */] = w;
                change = true;
            }
            if (values[13 /* height */] !== h) {
                values[13 /* height */] = h;
                change = true;
            }
            if (change) {
                this.invalidateDisplayList();
                this.emitResizeEvent();
            }
        };
        prototype.$setX = function (value) {
            var change = _super.prototype.$setX.call(this, value);
            if (change) {
                this.invalidateProperties();
                this.invalidateParentSizeAndDisplayList();
            }
            return change;
        };
        prototype.$setY = function (value) {
            var change = _super.prototype.$setY.call(this, value);
            if (change) {
                this.invalidateProperties();
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
            var values = this.$uiComponentValues;
            if (lark.isNone(values[8 /* explicitWidth */]) || lark.isNone(values[9 /* explicitHeight */])) {
                this.measure();
                if (values[18 /* measuredWidth */] < values[14 /* minWidth */]) {
                    values[18 /* measuredWidth */] = values[14 /* minWidth */];
                }
                if (values[18 /* measuredWidth */] > values[15 /* maxWidth */]) {
                    values[18 /* measuredWidth */] = values[15 /* maxWidth */];
                }
                if (values[19 /* measuredHeight */] < values[16 /* minHeight */]) {
                    values[19 /* measuredHeight */] = values[16 /* minHeight */];
                }
                if (values[19 /* measuredHeight */] > values[17 /* maxHeight */]) {
                    values[19 /* measuredHeight */] = values[17 /* maxHeight */];
                }
            }
            var preferredW = this.getPreferredUWidth();
            var preferredH = this.getPreferredUHeight();
            if (preferredW !== values[22 /* oldPreferWidth */] || preferredH !== values[23 /* oldPreferHeight */]) {
                values[22 /* oldPreferWidth */] = preferredW;
                values[23 /* oldPreferHeight */] = preferredH;
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
                var values = this.$uiComponentValues;
                if (this.$hasFlags(1048576 /* LayoutWidthExplicitlySet */)) {
                    unscaledWidth = values[11 /* width */];
                }
                else if (!lark.isNone(values[8 /* explicitWidth */])) {
                    unscaledWidth = values[8 /* explicitWidth */];
                }
                else {
                    unscaledWidth = values[18 /* measuredWidth */];
                }
                if (this.$hasFlags(2097152 /* LayoutHeightExplicitlySet */)) {
                    unscaledHeight = values[13 /* height */];
                }
                else if (!lark.isNone(values[9 /* explicitHeight */])) {
                    unscaledHeight = values[9 /* explicitHeight */];
                }
                else {
                    unscaledHeight = values[19 /* measuredHeight */];
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
         *  抛出移动事件
         */
        prototype.emitMoveEvent = function () {
            var values = this.$uiComponentValues;
            if (this.hasListener(lark.gui.MoveEvent.MOVE)) {
                lark.gui.MoveEvent.emitMoveEvent(this, values[20 /* oldX */], values[21 /* oldY */]);
            }
            values[20 /* oldX */] = this.$getX();
            values[21 /* oldY */] = this.$getY();
        };
        /**
         *  抛出尺寸改变事件
         */
        prototype.emitResizeEvent = function () {
            var values = this.$uiComponentValues;
            if (this.hasListener(lark.gui.ResizeEvent.RESIZE)) {
                lark.gui.ResizeEvent.emitResizeEvent(this, values[10 /* oldWidth */], values[12 /* oldHeight */]);
            }
            values[10 /* oldWidth */] = values[11 /* width */];
            values[12 /* oldHeight */] = values[13 /* height */];
        };
        /**
         * 设置组件的布局宽高
         */
        prototype.setLayoutBoundsSize = function (layoutWidth, layoutHeight) {
            layoutHeight = +layoutHeight || 0;
            layoutWidth = +layoutWidth || 0;
            var values = this.$uiComponentValues;
            var maxWidth = values[15 /* maxWidth */];
            var maxHeight = values[17 /* maxHeight */];
            var minWidth = Math.min(values[14 /* minWidth */], maxWidth);
            var minHeight = Math.min(values[16 /* minHeight */], maxHeight);
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
                fitSize = new lark.Point(minWidth, minHeight);
            }
            this.setActualSize(fitSize.x, fitSize.y);
        };
        /**
         * 设置组件的布局位置
         */
        prototype.setLayoutBoundsPosition = function (x, y) {
            var changed = false;
            var matrix = this.$getMatrix();
            if (!isDeltaIdentity(matrix.$data)) {
                var bounds = this.getLayoutBounds(lark.$TempRectangle);
                x += this.$getX() - bounds.x;
                y += this.$getY() - bounds.y;
            }
            changed = _super.prototype.$setX.call(this, x);
            changed = _super.prototype.$setY.call(this, y) || changed;
            if (changed) {
                this.emitMoveEvent();
            }
        };
        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        prototype.getLayoutBounds = function (bounds) {
            var values = this.$uiComponentValues;
            var w;
            if (this.$hasFlags(1048576 /* LayoutWidthExplicitlySet */)) {
                w = values[11 /* width */];
            }
            else if (!lark.isNone(values[8 /* explicitWidth */])) {
                w = values[8 /* explicitWidth */];
            }
            else {
                w = values[18 /* measuredWidth */];
            }
            var h;
            if (this.$hasFlags(2097152 /* LayoutHeightExplicitlySet */)) {
                h = values[13 /* height */];
            }
            else if (!lark.isNone(values[9 /* explicitHeight */])) {
                h = values[9 /* explicitHeight */];
            }
            else {
                h = values[19 /* measuredHeight */];
            }
            return this.applyMatrix(bounds, w, h);
        };
        prototype.getPreferredUWidth = function () {
            var values = this.$uiComponentValues;
            return lark.isNone(values[8 /* explicitWidth */]) ? values[18 /* measuredWidth */] : values[8 /* explicitWidth */];
        };
        prototype.getPreferredUHeight = function () {
            var values = this.$uiComponentValues;
            return lark.isNone(values[9 /* explicitHeight */]) ? values[19 /* measuredHeight */] : values[9 /* explicitHeight */];
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
            var x = 0, y = 0;
            var scrollRect = this.$scrollRect;
            if (scrollRect) {
                x = scrollRect.x;
                y = scrollRect.y;
            }
            var bounds = bounds.setTo(x, y, w, h);
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