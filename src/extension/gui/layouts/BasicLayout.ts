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
     * 基本布局
     */
    export class BasicLayout extends LayoutBase {
        /**
         * 创建一个基本布局实例
         */
        public constructor() {
            super();
        }


        /**
         * BasicLayout不支持虚拟布局，设置这个属性无效
         */
        public useVirtualLayout:boolean;

        /**
         *基于目标的内容测量其默认大小，并（可选）测量目标的默认最小大小
         */
        public measure():void {
            super.measure();
            player.measure(this.$target);
        }


        /**
         * 调整目标的元素的大小并定位这些元素
         * @param unscaledWidth
         * @param unscaledHeight
         */
        public updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            var target = this.$target;
            var pos = player.updateDisplayList(target,unscaledWidth,unscaledHeight);
            target.setContentSize(Math.ceil(pos.x), Math.ceil(pos.y));
        }
    }

    if (DEBUG) {
        Object.defineProperty(BasicLayout.prototype, "useVirtualLayout", {
            /**
             * 此布局不支持虚拟布局，设置这个属性无效
             */
            get: function () {
                return this.$useVirtualLayout;
            },
            set: function (value) {
                $error(2001);
            },
            enumerable: true,
            configurable: true
        });
    }

}

module lark.player {

    /**
     * 一个工具方法，使用BasicLayout规则测量目标对象。
     */
    export function measure(target:gui.GroupBase|gui.SkinnableComponent):void{
        if(!target){
            return;
        }
        var width = 0;
        var height = 0;

        var count = target.numChildren;
        for (var i = 0; i < count; i++) {
            var layoutElement = <gui.UIComponent> (target.getChildAt(i));
            if (!layoutElement.isType(gui.Types.UIComponent) || !layoutElement.$includeInLayout) {
                continue;
            }

            var values = layoutElement.$uiComponentValues;
            var hCenter = values[player.UIComponentValues.horizontalCenter];
            var vCenter = values[player.UIComponentValues.verticalCenter];
            var left = values[player.UIComponentValues.left];
            var right = values[player.UIComponentValues.right];
            var top = values[player.UIComponentValues.top];
            var bottom = values[player.UIComponentValues.bottom];

            var extX:number;
            var extY:number;

            var bounds = layoutElement.getPreferredBounds($TempRectangle);

            if (!isNone(left) && !isNone(right)) {
                extX = left + right;
            }
            else if (!isNone(hCenter)) {
                extX = Math.abs(hCenter) * 2;
            }
            else if (!isNone(left) || !isNone(right)) {
                extX = isNone(left) ? 0 : left;
                extX += isNone(right) ? 0 : right;
            }
            else {
                extX = bounds.x;
            }

            if (!isNone(top) && !isNone(bottom)) {
                extY = top + bottom;
            }
            else if (!isNone(vCenter)) {
                extY = Math.abs(vCenter) * 2;
            }
            else if (!isNone(top) || !isNone(bottom)) {
                extY = isNone(top) ? 0 : top;
                extY += isNone(bottom) ? 0 : bottom;
            }
            else {
                extY = bounds.y;
            }

            var preferredWidth = bounds.width;
            var preferredHeight = bounds.height;
            width = Math.ceil(Math.max(width, extX + preferredWidth));
            height = Math.ceil(Math.max(height, extY + preferredHeight));
        }

        target.setMeasuredSize(width,height);
    }

    /**
     * 一个工具方法，使用BasicLayout规则布局目标对象。
     */
    export function updateDisplayList(target:gui.GroupBase|gui.SkinnableComponent,
                                                 unscaledWidth:number, unscaledHeight:number):Point{
        if (!target)
            return;

        var count = target.numChildren;

        var maxX = 0;
        var maxY = 0;
        var bounds = $TempRectangle;
        for (var i = 0; i < count; i++) {
            var layoutElement = <gui.UIComponent> (target.getChildAt(i));
            if (!layoutElement.isType(gui.Types.UIComponent) || !layoutElement.$includeInLayout) {
                continue;
            }

            var values = layoutElement.$uiComponentValues;
            var hCenter = values[player.UIComponentValues.horizontalCenter];
            var vCenter = values[player.UIComponentValues.verticalCenter];
            var left = values[player.UIComponentValues.left];
            var right = values[player.UIComponentValues.right];
            var top = values[player.UIComponentValues.top];
            var bottom = values[player.UIComponentValues.bottom];
            var percentWidth = values[player.UIComponentValues.percentWidth];
            var percentHeight = values[player.UIComponentValues.percentHeight];

            var childWidth = NONE;
            var childHeight = NONE;

            if (!isNone(left) && !isNone(right)) {
                childWidth = unscaledWidth - right - left;
            }
            else if (!isNone(percentWidth)) {
                childWidth = Math.round(unscaledWidth * Math.min(percentWidth * 0.01, 1));
            }

            if (!isNone(top) && !isNone(bottom)) {
                childHeight = unscaledHeight - bottom - top;
            }
            else if (!isNone(percentHeight)) {
                childHeight = Math.round(unscaledHeight * Math.min(percentHeight * 0.01, 1));
            }

            layoutElement.setLayoutBoundsSize(childWidth, childHeight);
            layoutElement.getLayoutBounds(bounds);
            var elementWidth = bounds.width;
            var elementHeight = bounds.height;


            var childX = NONE;
            var childY = NONE;

            if (!isNone(hCenter))
                childX = Math.round((unscaledWidth - elementWidth) / 2 + hCenter);
            else if (!isNone(left))
                childX = left;
            else if (!isNone(right))
                childX = unscaledWidth - elementWidth - right;
            else
                childX = bounds.x;

            if (!isNone(vCenter))
                childY = Math.round((unscaledHeight - elementHeight) / 2 + vCenter);
            else if (!isNone(top))
                childY = top;
            else if (!isNone(bottom))
                childY = unscaledHeight - elementHeight - bottom;
            else
                childY = bounds.y;

            layoutElement.setLayoutBoundsPosition(childX, childY);

            maxX = Math.max(maxX, childX + elementWidth);
            maxY = Math.max(maxY, childY + elementHeight);
        }
        return $TempPoint.setTo(maxX,maxY);
    }
}