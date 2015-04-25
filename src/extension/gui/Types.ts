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
     * 为Lark引擎内的类或接口定义的枚举值。通常作为实例检查类型的方法 isType() 的参数。
     */
    export enum Types {
        /**
         * IEventEmitter 接口定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
         * 事件目标是 Lark 事件模型的重要组成部分。事件目标是事件如何通过显示列表层次结构这一问题的焦点。当发生鼠标单击或按键等事件时，
         * 会将事件对象调度到从显示列表根开始的事件流中。事件对象进行到事件目标的往返行程，在概念上，此往返行程被划分为三个阶段：
         * 捕获阶段包括从根到事件目标节点之前的最后一个节点的行程，目标阶段仅包括事件目标节点，冒泡阶段包括到显示列表的根的回程上遇到的任何后续节点。
         * 通常，使用户定义的类能够调度事件的最简单方法是扩展 EventEmitter。如果无法扩展（即，如果该类已经扩展了另一个类），
         * 则可以实现 IEventEmitter 接口，创建 EventEmitter 成员，并编写一些简单的挂钩，将调用连接到聚合的 EventEmitter 中。
         */
        UIComponent = 1001,
        /**
         * UI事件
         */
        UIEvent,
        /**
         * UI尺寸改变事件
         */
        ReiszeEvent,
        /**
         * UI移动事件
         */
        MoveEvent
    }
}