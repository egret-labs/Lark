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
     * Provides constant enum values for type checking in the module of Swan. It is usually passed as the parameters of the lark.is() method.
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
        Group = 1002,
        /**
         * @copy swan.DataGroup
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        DataGroup = 1003,
        /**
         * @copy swan.ListBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ListBase = 1004,
        /**
         * @copy swan.TabBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        TabBar = 1005,
        /**
         * @copy swan.List
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        List = 1006,
        /**
         * @copy swan.IItemRenderer
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        IItemRenderer = 1007,
        /**
         * @copy swan.ItemRenderer
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ItemRenderer = 1008,
        /**
         * @copy swan.Component
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Component = 1009,
        /**
         * @copy swan.Label
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Label = 1010,
        /**
         * @copy swan.Image
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Image = 1011,
        /**
         * @copy swan.Skin
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Skin = 1012,
        /**
         * @copy swan.Theme
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Theme = 1013,
        /**
         * @copy swan.UIEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        UIEvent = 1014,
        /**
         * @copy swan.CollectionEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        CollectionEvent = 1015,
        /**
         * @copy swan.PropertyEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        PropertyEvent = 1016,
        /**
         * @copy swan.ItemTapEvent
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ItemTapEvent = 1017,
        /**
         * @copy swan.ArrayCollection
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ArrayCollection = 1018,
        /**
         * @copy swan.LayoutBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        LayoutBase = 1019,
        /**
         * @copy swan.LinearLayoutBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        LinearLayoutBase = 1020,
        /**
         * @copy swan.BasicLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        BasicLayout = 1021,
        /**
         * @copy swan.HorizontalLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        HorizontalLayout = 1022,
        /**
         * @copy swan.VerticalLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        VerticalLayout = 1023,
        /**
         * @copy swan.Panel
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Panel = 1024,
        /**
         * @copy swan.Button
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Button = 1025,
        /**
         * @copy swan.ToggleButton
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ToggleButton = 1026,
        /**
         * @copy swan.CheckBox
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        CheckBox = 1027,
        /**
         * @copy swan.ToggleSwitch
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ToggleSwitch = 1028,
        /**
         * @copy swan.RadioButton
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        RadioButton = 1029,
        /**
         * @copy swan.RadioButtonGroup
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        RadioButtonGroup = 1030,
        /**
         * @copy swan.State
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        State = 1031,
        /**
         * @copy swan.IOverride
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        IOverride = 1032,
        /**
         * @copy swan.AddItems
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        AddItems = 1033,
        /**
         * @copy swan.SetProperty
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        SetProperty = 1034,
        /**
         * @copy swan.Watcher
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Watcher = 1035,
        /**
         * @copy swan.ViewStack
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ViewStack = 1036,
        /**
         * @copy swan.Scroller
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Scroller = 1037,
        /**
         * @copy swan.ScrollBarBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        ScrollBarBase = 1038,
        /**
         * @copy swan.VScrollBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        VScrollBar = 1039,
        /**
         * @copy swan.HScrollBar
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        HScrollBar = 1040,
        /**
         * @copy swan.Range
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        Range = 1041,
        /**
         * @copy swan.SliderBase
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        SliderBase = 1042,
        /**
         * @copy swan.HSlider
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        HSlider = 1043,
        /**
         * @copy swan.VSlider
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        VSlider = 1044,
        /**
         * @copy swan.IViewport
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        IViewport = 1045,
        /**
         * @copy swan.TileLayout
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        TileLayout = 1046,
        /**
         * @copy swan.EditableText
         *
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        EditableText = 1047
    }
}