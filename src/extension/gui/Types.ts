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
    //1001~2000预留给lark.gui包下的类和接口
    /**
     * 为Lark GUI模块内的类或接口定义的枚举值。通常作为实例检查类型 lark.is() 方法的参数。
     */
    export enum Types {
        /**
         * GUI显示对象基类
         */
        UIComponent = 1001,
        /**
         * GUI容器基类
         */
        Group,
        /**
         * DataGroup 是数据容器基类,将数据项目转换为可视元素以进行显示
         */
        DataGroup,
        /**
         * 数据项目的容器基类,将数据项目转换为可视元素以进行显示。
         */
        ListBase,
        /**
         * 列表组件
         */
        List,
        /**
         * 列表类组件的项呈示器接口
         */
        IItemRenderer,
        /**
         * 项呈示器基类，通常作为List类的项目视图模板。
         */
        ItemRenderer,
        /**
         * Component 类定义可设置外观的组件的基类。Component 类所使用的外观通常是 Skin 类的子类。
         */
        Component,
        /**
         * Label 是可以呈示一行或多行统一格式文本的UI组件。要显示的文本由 text 属性确定。文本格式由样式属性指定，例如 fontFamily 和 fontSize。
         * 因为 Label 运行速度快且占用内存少，所以它特别适合用于显示多个小型非交互式文本的情况，例如，项呈示器和 Button 外观中的标签。
         * 在 Label 中，将以下三个字符序列识别为显式换行符：CR（“\r”）、LF（“\n”）和 CR+LF（“\r\n”）。
         * 如果没有为 Label 指定宽度，则由这些显式换行符确定的最长行确定 Label 的宽度。
         * 如果指定了宽度，则指定文本将在组件边界的右边缘换行，如果文本扩展到低于组件底部，则将被剪切。
         */
        Label,
        /**
         * Image 控件允许您在运行时显示 JPEG、PNG 等图片文件文件。Image 继承至 Bitmap，因此您可以直接对其 bitmapData 属性，
         * 赋值从外部加载得到的位图数据以显示对应图片。同时，Image 还提供了更加方便的 source 属性，source 属性可以接受一个网络图片url作为值，
         * 赋值为url后，它内部会自动去加载并显示图片。并且您同样也可以直接把 BitmapData 对象赋值给 source 属性以显示图片。
         * Image 控件可以直接替代 Bitmap 在显示列表中使用。
         *
         * @event lark.Event.COMPLETE 当图片加载完成后调度
         */
        Image,
        /**
         * 含有视图状态功能的皮肤基类。
         */
        Skin,
        /**
         * 皮肤主题。实例化一个主题，能够在运行时修改全局的默认皮肤。
         */
        Theme,
        /**
         * UI事件
         */
        UIEvent,
        /**
         * 集合类型数据改变事件
         */
        CollectionEvent,
        /**
         * 对象的一个属性发生更改时传递到事件侦听器的事件
         */
        PropertyEvent,
        /**
         * 列表单击事件
         */
        ItemClickEvent,
        /**
         * 数组的集合类数据结构包装器
         * 通常作为列表组件的数据源，使用这种数据结构包装普通数组，
         * 能在数据源发生改变的时候主动通知视图刷新变更的数据项
         */
        ArrayCollection,
        /**
         * 容器布局基类。若要创建使用 Group 容器的自定义布局，必须扩展 LayoutBase 或其子类之一。
         * 子类必须实现 updateDisplayList() 方法（定位 target Group 的子项并调整这些子项的大小）和 measure() 方法（计算 target 的默认大小）。
         */
        LayoutBase,
        /**
         * 线性布局基类，通常作为 HorizontalLayout 和 VerticalLayout 的父类。
         */
        LinearLayoutBase,
        /**
         * BasicLayout 类根据其各个设置彼此独立地排列布局元素。
         * BasicLayout（也称为绝对布局）要求显式定位每个容器子代。可以使用子代的 x 和 y 属性，或使用约束来定位每个子代。
         */
        BasicLayout,
        /**
         * 水平布局
         */
        HorizontalLayout,
        /**
         * 垂直布局
         */
        VerticalLayout,
        /**
         * 带有标题，关闭按钮，可移动区域的面板组件。注意：当第一次通过触摸交互操作移动面板时，面板的 includeInLayout 属性将会自动被设置为false，
         * 以确保移动不会受到自动布局属性的影响。若之后还需要启用面板在父级容器中的自动布局，需手动设置 includeInLayout 为 true。
         * @event lark.gui.UIEvent.CLOSING 面板即将关闭事件，在关闭按钮被点击后抛出，监听此事件并调用event.preventDefault()能够阻止面板被关闭。
         */
        Panel,
        /**
         * 按钮组件
         */
        Button,
        /**
         * 切换按钮
         */
        ToggleButton,
        /**
         * 复选框
         */
        CheckBox,
        /**
         * 开关按钮
         */
        ToggleSwitch,
        /**
         * RadioButton 组件使用户可在一组互相排斥的选择中做出一种选择
         */
        RadioButton,
        /**
         * RadioButtonGroup 组件定义一组 RadioButton 组件，这些组件相互排斥；因此，用户每次只能选择一个 RadioButton 组件
         */
        RadioButtonGroup,
        /**
         * State 类定义视图状态，即组件的特定视图。
         */
        State,
        /**
         * IOverride 接口定义视图状态的覆盖操作。State 类 overrides 属性数组中的所有条目均必须实现此接口。
         */
        IOverride,
        /**
         * 视图添加状态显示元素操作
         */
        AddItems,
        /**
         * 视图状态设置属性操作
         */
        SetProperty,
        /**
         * Watcher 类能够监视可绑定属性的改变，您可以定义一个事件处理函数作为 Watcher 的回调方法，在每次可绑定属性的值改变时都执行此函数。
         */
        Watcher

    }
}