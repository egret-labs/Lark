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

module lark {
    //1~1000预留给lark包下的类和接口
    /**
     * 为Lark引擎内的类或接口定义的枚举值。通常作为实例检查类型的方法 isType() 的参数。
     */
    export const enum Types {
        /**
         * IEventEmitter 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
         * 事件目标是 Lark 事件模型的重要组成部分。事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击或按键等事件时，
         * 会将事件对象调度到从显示列表根开始的事件流中。事件对象进行到事件目标的往返行程，在概念上，此往返行程被划分为三个阶段：
         * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括到显示列表的根的回程上遇到的任何后续节点。
         * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），
         * 则可以实现 IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的挂钩，将调用连接到聚合的 EventEmitter 中。
         */
        IEventEmitter = 1,
        /**
         * EventEmitter 是 Lark 的事件派发器类，负责进行事件的发送和侦听。
         * 事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击、触摸或按键等事件时，
         * 引擎会将事件对象调度到从显示列表根开始的事件流中。然后该事件对象在显示列表中前进，直到到达事件目标，
         * 然后从这一点开始其在显示列表中的回程。在概念上，到事件目标的此往返行程被划分为三个阶段：
         * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括回程上遇到的任何后续节点到显示列表的根。
         */
        EventEmitter,
        /**
         * DisplayObject 类是可放在显示列表中的所有对象的基类。该显示列表管理运行时显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
         * DisplayObjectContainer 对象可以有子显示对象，而其他显示对象是“叶”节点，只有父级和同级，没有子级。
         * DisplayObject 类支持基本功能（如对象的 x 和 y 位置），也支持更高级的对象属性（如它的转换矩阵），所有显示对象都继承自 DisplayObject 类。
         * DisplayObject 类包含若干广播事件。通常，任何特定事件的目标均为一个特定的 DisplayObject 实例。
         * 若只有一个目标，则会将事件侦听器限制为只能放置到该目标上（在某些情况下，可放置到显示列表中该目标的祖代上），这意味着您可以向任何 DisplayObject 实例添加侦听器来侦听广播事件。
         */
        DisplayObject,
        /**
         * DisplayObjectContainer 类是可用作显示列表中显示对象容器的所有对象的基类。
         * 该显示列表管理运行时中显示的所有对象。使用 DisplayObjectContainer 类排列显示列表中的显示对象。
         * 每个 DisplayObjectContainer 对象都有自己的子级列表，用于组织对象的 Z 轴顺序。Z 轴顺序是由前至后的顺序，
         * 可确定哪个对象绘制在前，哪个对象绘制在后等。
         */
        DisplayObjectContainer,
        /**
         * Sprite 类是基本显示列表构造块：一个可包含子项的显示列表节点。
         */
        Sprite,
        /**
         * Bitmap 类表示用于表示位图图像的显示对象。这些图像可以是使用 Bitmap() 构造函数创建的图像。
         * 利用 Bitmap() 构造函数，可以创建包含对 BitmapData 对象的引用的 Bitmap 对象。创建了 Bitmap 对象后，
         * 使用父 DisplayObjectContainer 实例的 addChild() 或 addChildAt() 方法将位图放在显示列表中。
         * 一个 Bitmap 对象可在若干 Bitmap 对象之中共享其 BitmapData 引用，与转换属性或旋转属性无关。
         * 由于能够创建引用相同 BitmapData 对象的多个 Bitmap 对象，因此，多个显示对象可以使用相同的复杂 BitmapData 对象，
         * 而不会因为每个显示对象实例使用一个 BitmapData 对象而产生内存开销。
         */
        Bitmap,
        /**
         * Graphics 类包含一组可用来创建矢量形状的方法。支持绘制的显示对象包括 Sprite 和 Shape 对象。
         * 这些类中的每一个类都包括 graphics 属性，该属性是一个 Graphics 对象。
         */
        Graphics,
        /**
         * 此类用于使用 Lark 绘图应用程序编程接口 (API) 创建简单形状。Shape 类包括 graphics 属性，该属性使您可以从 Graphics 类访问方法。
         */
        Shape,
        /**
         * Stage 类代表主绘图区，表示显示 Lark 内容的整个区域。
         * 可以利用 DisplayObject 实例的 stage 属性进行访问。
         * Stage 类具有多个祖代类 -- DisplayObjectContainer、DisplayObject 和 EventDispatcher，属性和方法便是从这些类继承而来的。
         * 从这些继承的许多属性和方法不适用于 Stage 对象。
         */
        Stage,
        /**
         * Event 类作为创建 Event 对象的基类，当发生事件时，Event 对象将作为参数传递给事件侦听器。
         * Event 类的属性包含有关事件的基本信息，例如事件的类型或者是否可以取消事件的默认行为。
         * 对于许多事件（如由 Event 类常量表示的事件），此基本信息就足够了。但其他事件可能需要更详细的信息。
         * 例如，与触摸关联的事件需要包括有关触摸事件的位置以及在触摸事件期间是否按下了任何键的其他信息。
         * 您可以通过扩展 Event 类（TouchEvent 类执行的操作）将此类其他信息传递给事件侦听器。
         * Lark API 为需要其他信息的常见事件定义多个 Event 子类。与每个 Event 子类关联的事件将在每个类的文档中加以介绍。
         * Event 类的方法可以在事件侦听器函数中使用以影响事件对象的行为。
         * 某些事件有关联的默认行为，通过调用 preventDefault() 方法，您的事件侦听器可以取消此行为。
         * 可以通过调用 stopPropagation() 或 stopImmediatePropagation() 方法，将当前事件侦听器作为处理事件的最后一个事件侦听器。
         */
        Event,
        /**
         * 每当 Timer 对象达到由 Timer.delay 属性指定的间隔时，Timer 对象即会调度 TimerEvent 对象。
         */
        TimerEvent,
        /**
         * 使用 TouchEvent 类，您可以处理设备上那些检测用户与设备之间的接触的事件。
         * 当用户与带有触摸屏的移动电话或平板电脑等设备交互时，用户通常使用手指或指针设备接触屏幕。可使用 TouchEvent
         * 类开发响应基本触摸事件（如单个手指点击）的应用程序。使用此类中定义的事件类型创建事件侦听器。
         * 注意：当对象嵌套在显示列表中时，触摸事件的目标将是显示列表中可见的最深的可能嵌套对象。
         * 此对象称为目标节点。要使目标节点的祖代（祖代是一个包含显示列表中所有目标节点的对象，从舞台到目标节点的父节点均包括在内）
         * 接收触摸事件的通知，请对祖代节点使用 EventEmitter.on() 并将 type 参数设置为要检测的特定触摸事件。
         */
        TouchEvent,
        /**
         * Matrix 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。
         * 您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix
         * 对象应用于显示对象的 matrix 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。
         */
        Matrix,
        /**
         * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
         */
        Point,
        /**
         * Rectangle 对象是按其位置（由它左上角的点 (x, y) 确定）以及宽度和高度定义的区域。
         * Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。
         * 但是，right 和 bottom 属性与这四个属性是整体相关的。例如，如果更改 right 属性的值，则 width
         * 属性的值将发生变化；如果更改 bottom 属性，则 height 属性的值将发生变化。
         */
        Rectangle,
        /**
         * TextField 类用于创建显示对象以显示文本。
         * 可以使用 TextField 类的方法和属性对文本字段进行操作。
         */
        TextField

    }
}