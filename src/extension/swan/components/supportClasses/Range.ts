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

    /**
     * @private
     */
    export const enum RangeKeys{
        /**
         * @private
         */
        maximum,
        /**
         * @private
         */
        maxChanged,
        /**
         * @private
         */
        minimum,
        /**
         * @private
         */
        minChanged,
        /**
         * @private
         */
        value,
        /**
         * @private
         */
        changedValue,
        /**
         * @private
         */
        valueChanged,
        /**
         * @private
         */
        snapInterval,
        /**
         * @private
         */
        snapIntervalChanged,
        /**
         * @private
         */
        explicitSnapInterval
    }
}

module swan {

    /**
     * @language en_US
     * 范围选取组件,该组件包含一个值和这个值所允许的最大最小约束范围。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 范围选取组件,该组件包含一个值和这个值所允许的最大最小约束范围。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Range extends Component {
        /**
         * @language en_US
         * 创建一个 Range 实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Range 实例
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.$Range = {
                0: 100,         //maximum
                1: false,       //maxChanged
                2: 0,           //minimum
                3: false,       //minChanged
                4: 0,           //value
                5: 0,           //changedValue
                6: false,       //valueChanged
                7: 1,           //snapInterval
                8: false,       //snapIntervalChanged
                9: false,       //explicitSnapInterval
            };
        }

        /**
         * @private
         */
        $Range:Object;

        /**
         * @language en_US
         * 最大有效值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 最大有效值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get maximum():number {
            return this.$Range[sys.RangeKeys.maximum];
        }

        public set maximum(value:number) {
            value = +value || 0;
            var values = this.$Range;
            if (value === values[sys.RangeKeys.maximum])
                return;
            values[sys.RangeKeys.maximum] = value;
            values[sys.RangeKeys.maxChanged] = true;
            this.invalidateProperties();
            this.invalidateDisplayList();
        }

        /**
         * @language en_US
         * 最小有效值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 最小有效值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get minimum():number {
            return this.$Range[sys.RangeKeys.minimum];
        }

        public set minimum(value:number) {
            value = +value || 0;
            var values = this.$Range;
            if (value === values[sys.RangeKeys.minimum])
                return;
            values[sys.RangeKeys.minimum] = value;
            values[sys.RangeKeys.minChanged] = true;
            this.invalidateProperties();
            this.invalidateDisplayList();
        }

        /**
         * @language en_US
         * 此范围的当前值。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 此范围的当前值。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get value():number {
            var values = this.$Range;
            return values[sys.RangeKeys.valueChanged] ?
                values[sys.RangeKeys.changedValue] : values[sys.RangeKeys.value];
        }

        public set value(newValue:number) {
            newValue = +newValue || 0;
            this.$setValue(newValue);
        }

        /**
         * @private
         * 
         * @param newValue 
         */
        $setValue(newValue:number) {
            if (newValue === this.value)
                return;
            var values = this.$Range;
            values[sys.RangeKeys.changedValue] = newValue;
            values[sys.RangeKeys.valueChanged] = true;
            this.invalidateProperties();
        }

        /**
         * @language en_US
         * snapInterval 属性定义 value 属性的有效值。如果为非零，则有效值为 minimum 与此属性的整数倍数之和，且小于或等于 maximum。
         * 例如，如果 minimum 为 10，maximum 为 20，而此属性为 3，则可能的有效值为 10、13、16、19 和 20.
         * 如果此属性的值为零，则仅会将有效值约束到介于 minimum 和 maximum 之间（包括两者）。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * snapInterval 属性定义 value 属性的有效值。如果为非零，则有效值为 minimum 与此属性的整数倍数之和，且小于或等于 maximum。
         * 例如，如果 minimum 为 10，maximum 为 20，而此属性为 3，则可能的有效值为 10、13、16、19 和 20.
         * 如果此属性的值为零，则仅会将有效值约束到介于 minimum 和 maximum 之间（包括两者）。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        public get snapInterval():number {
            return this.$Range[sys.RangeKeys.snapInterval];
        }

        public set snapInterval(value:number) {
            var values = this.$Range;
            values[sys.RangeKeys.explicitSnapInterval] = true;
            value = +value || 0;
            if (value === values[sys.RangeKeys.snapInterval])
                return;
            if (lark.isNone(value)) {
                values[sys.RangeKeys.snapInterval] = 1;
                values[sys.RangeKeys.explicitSnapInterval] = false;
            }
            else {
                values[sys.RangeKeys.snapInterval] = value;
            }

            values[sys.RangeKeys.snapIntervalChanged] = true;

            this.invalidateProperties();
        }

        /**
         * @language en_US
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 处理对组件设置的属性
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected commitProperties():void {
            super.commitProperties();
            var values = this.$Range;
            if (values[sys.RangeKeys.minimum] > values[sys.RangeKeys.maximum]) {

                if (!values[sys.RangeKeys.maxChanged])
                    values[sys.RangeKeys.minimum] = values[sys.RangeKeys.maximum];
                else
                    values[sys.RangeKeys.maximum] = values[sys.RangeKeys.minimum];
            }

            if (values[sys.RangeKeys.valueChanged] || values[sys.RangeKeys.maxChanged] ||
                values[sys.RangeKeys.minChanged] || values[sys.RangeKeys.snapIntervalChanged]) {
                var currentValue = values[sys.RangeKeys.valueChanged] ?
                    values[sys.RangeKeys.changedValue] : values[sys.RangeKeys.value];
                values[sys.RangeKeys.valueChanged] = false;
                values[sys.RangeKeys.maxChanged] = false;
                values[sys.RangeKeys.minChanged] = false;
                values[sys.RangeKeys.snapIntervalChanged] = false;
                this.setValue(this.nearestValidValue(currentValue, values[sys.RangeKeys.snapInterval]));
            }
        }

        /**
         * @private
         * 修正size到最接近snapInterval的整数倍
         */
        private nearestValidSize(size:number):number {
            var interval:number = this.snapInterval;
            if (interval == 0)
                return size;

            var validSize:number = Math.round(size / interval) * interval;
            return (Math.abs(validSize) < interval) ? interval : validSize;
        }

        /**
         * @language en_US
         * 修正输入的值为有效值
         * @param value 输入值。
         * @param interval snapInterval 的值，或 snapInterval 的整数倍数。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 修正输入的值为有效值
         * @param value 输入值。
         * @param interval snapInterval 的值，或 snapInterval 的整数倍数。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected nearestValidValue(value:number, interval:number):number {
            var values = this.$Range;
            if (interval == 0)
                return Math.max(values[sys.RangeKeys.minimum], Math.min(values[sys.RangeKeys.maximum], value));

            var maxValue = values[sys.RangeKeys.maximum] - values[sys.RangeKeys.minimum];
            var scale = 1;

            value -= values[sys.RangeKeys.minimum];
            if (interval != Math.round(interval)) {
                var parts = ((1 + interval).toString()).split(".");
                scale = Math.pow(10, parts[1].length);
                maxValue *= scale;
                value = Math.round(value * scale);
                interval = Math.round(interval * scale);
            }

            var lower = Math.max(0, Math.floor(value / interval) * interval);
            var upper = Math.min(maxValue, Math.floor((value + interval) / interval) * interval);
            var validValue = ((value - lower) >= ((upper - lower) / 2)) ? upper : lower;

            return (validValue / scale) + values[sys.RangeKeys.minimum];
        }

        /**
         * @language en_US
         * 设置当前值。此方法假定调用者已经使用了 nearestValidValue() 方法来约束 value 参数
         * @param value value属性的新值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置当前值。此方法假定调用者已经使用了 nearestValidValue() 方法来约束 value 参数
         * @param value value属性的新值
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected setValue(value:number):void {
            var values = this.$Range;
            if (values[sys.RangeKeys.value] === value)
            return;
            if (values[sys.RangeKeys.maximum] > values[sys.RangeKeys.minimum])
                values[sys.RangeKeys.value] = Math.min(values[sys.RangeKeys.maximum],
                    Math.max(values[sys.RangeKeys.minimum], value));
            else
                values[sys.RangeKeys.value] = value;
            values[sys.RangeKeys.valueChanged] = false;
            this.invalidateDisplayList();
            PropertyEvent.emitPropertyEvent(this,PropertyEvent.PROPERTY_CHANGE,"value");
        }

        /**
         * @language en_US
         * 绘制对象和/或设置其子项的大小和位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 绘制对象和/或设置其子项的大小和位置
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateDisplayList(w:number, h:number):void {
            super.updateDisplayList(w, h);
            this.updateSkinDisplayList();
        }

        /**
         * @language en_US
         * 更新皮肤部件（通常为滑块）的大小和可见性。
         * 子类覆盖此方法以基于 minimum、maximum 和 value 属性更新滑块的大小、位置和可见性。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新皮肤部件（通常为滑块）的大小和可见性。
         * 子类覆盖此方法以基于 minimum、maximum 和 value 属性更新滑块的大小、位置和可见性。
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        protected updateSkinDisplayList():void {
        }
    }

    /**
     * @private
     */
    registerBindable(Range.prototype,"value");
    /**
     * @private
     */
    lark.registerClass(Range,Types.Range);
}