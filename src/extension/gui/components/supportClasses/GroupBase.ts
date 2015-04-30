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
     * GUI容器基类
     */
    export class GroupBase extends Sprite implements UIComponent {

        public constructor() {
            super();
            player.UIComponent.call(this);
        }

        /**
         * 设置 contentWidth 和 contentHeight 属性，此方法由Layout类调用
         */
        public setContentSize(width:number, height:number):void{
            width = Math.ceil(width);
            height = Math.ceil(height);
        }

        //=======================UIComponent接口实现===========================
        /**
         * 创建子项,子类覆盖此方法以完成组件子项的初始化操作，
         * 请务必调用super.createChildren()以完成父类组件的初始化
         */
        protected createChildren():void {

        }

        /**
         * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
         */
        protected commitProperties():void {

        }

        /**
         * 测量组件尺寸
         */
        protected measure():void {

        }

        /**
         * 更新显示列表
         */
        protected updateDisplayList(unscaledWidth:number, unscaledHeight:number):void {

        }

        $uiComponentValues:Float64Array;

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
         * 组件的测量宽度（以像素为单位）。此值由 measure() 方法设置。
         */
        public measuredWidth:number;

        /**
         * 组件的默认高度（以像素为单位）。此值由 measure() 方法设置。
         */
        public measuredHeight:number;

        /**
         * 设置测量结果。
         * @param width 测量宽度
         * @param height 测量高度
         */
        public setMeasuredSize:(width:number, height:number)=>void;


        /**
         * 标记提交过需要延迟应用的属性
         */
        public invalidateProperties:()=>void;

        /**
         * 验证组件的属性
         */
        public validateProperties:()=>void;

        /**
         * 标记提交过需要验证组件尺寸
         */
        public invalidateSize:()=>void;

        /**
         * 验证组件的尺寸
         */
        public validateSize:()=>void;

        /**
         * 标记需要验证显示列表
         */
        public invalidateDisplayList:()=>void;

        /**
         * 验证子项的位置和大小，并绘制其他可视内容
         */
        public validateDisplayList:()=>void;

        /**
         * 立即应用组件及其子项的所有属性
         */
        public validateNow:()=>void;

        /**
         * 设置组件的布局宽高
         */
        public setLayoutBoundsSize:(layoutWidth:number, layoutHeight:number)=>void;

        /**
         * 设置组件的布局位置
         */
        public setLayoutBoundsPosition:(x:number, y:number)=>void;

        /**
         * 组件的布局尺寸,常用于父级的updateDisplayList()方法中
         * 按照：布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸,
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getLayoutBounds:(bounds:Rectangle)=>Rectangle;

        /**
         * 获取组件的首选尺寸,常用于父级的measure()方法中
         * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
         * 注意此方法返回值已经包含scale和rotation。
         */
        public getPreferredBounds:(bounds:Rectangle)=>Rectangle;
        /**
         * 标记父级容器的尺寸和显示列表为失效
         */
        protected invalidateParentSizeAndDisplayList:()=>void;
    }
    player.implementUIComponent(Group, Sprite);
    registerType(Group, [Types.UIComponent, Types.Group]);
}