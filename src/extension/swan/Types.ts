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

    //1001~2000预留给swan包下的类和接口
    /**
     * @language en_US
     * The enum class for definition of class and interface within Swan.
     * This class is usually used for checking an type of class through <code>lark.is()</code>
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 为 Swan 内的类或接口定义的枚举值。通常作为实例检查类型 lark.is() 方法的参数。
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export const enum Types {
        /**
         * @copy swan.Component
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        UIComponent = 1001,
        /**
         * @copy swan.Group
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Group,
        /**
         * @copy swan.DataGroup
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        DataGroup,
        /**
         * @copy swan.ListBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ListBase,
        /**
         * @copy swan.TabBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        TabBar,
        /**
         * @copy swan.List
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        List,
        /**
         * @copy swan.IItemRenderer
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        IItemRenderer,
        /**
         * @copy swan.ItemRenderer
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ItemRenderer,
        /**
         * @copy swan.Component
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Component,
        /**
         * @copy swan.Label
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Label,
        /**
         * @copy swan.Image
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Image,
        /**
         * @copy swan.Skin
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Skin,
        /**
         * @copy swan.Theme
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Theme,
        /**
         * @copy swan.UIEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        UIEvent,
        /**
         * @copy swan.CollectionEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        CollectionEvent,
        /**
         * @copy swan.PropertyEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        PropertyEvent,
        /**
         * @copy swan.ItemTapEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ItemTapEvent,
        /**
         * @copy swan.ArrayCollection
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ArrayCollection,
        /**
         * @copy swan.LayoutBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        LayoutBase,
        /**
         * @copy swan.LinearLayoutBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        LinearLayoutBase,
        /**
         * @copy swan.BasicLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        BasicLayout,
        /**
         * @copy swan.HorizontalLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        HorizontalLayout,
        /**
         * @copy swan.VerticalLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        VerticalLayout,
        /**
         * @copy swan.Panel
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Panel,
        /**
         * @copy swan.Button
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Button,
        /**
         * @copy swan.ToggleButton
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ToggleButton,
        /**
         * @copy swan.CheckBox
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        CheckBox,
        /**
         * @copy swan.ToggleSwitch
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ToggleSwitch,
        /**
         * @copy swan.RadioButton
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        RadioButton,
        /**
         * @copy swan.RadioButtonGroup
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        RadioButtonGroup,
        /**
         * @copy swan.State
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        State,
        /**
         * @copy swan.IOverride
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        IOverride,
        /**
         * @copy swan.AddItems
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        AddItems,
        /**
         * @copy swan.SetProperty
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        SetProperty,
        /**
         * @copy swan.Watcher
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Watcher,
        /**
         * @copy swan.ViewStack
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ViewStack,
        /**
         * @copy swan.Scroller
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Scroller,
        /**
         * @copy swan.ScrollBarBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ScrollBarBase,
        /**
         * @copy swan.VScrollBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        VScrollBar,
        /**
         * @copy swan.HScrollBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        HScrollBar,
        /**
         * @copy swan.Range
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Range,
        /**
         * @copy swan.SliderBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        SliderBase,
        /**
         * @copy swan.HSlider
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        HSlider,
        /**
         * @copy swan.VSlider
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        VSlider,
        /**
         * @copy swan.IViewport
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        IViewport,
        /**
         * @copy swan.TileLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        TileLayout,
        /**
         * @copy swan.EditableText
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        EditableText
    }
}