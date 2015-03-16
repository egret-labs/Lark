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

module lark.player {
    /**
     * 渲染节点标志
     */
    export enum NodeFlags {

        None = 0x00000,

        /**
         * 标识节点的尺寸是从子项列表自动计算出来的。如果这个标志是false，则此节点只能通过setBounds()方法来改变尺寸。
         */
        BoundsAutoCompute = 0x00002,

        /**
         * 标识这个节点作为其他节点的遮罩
         */
        IsMask = 0x00004,

        /**
         * 标识这个节点需要重绘
         */
        Dirty = 0x00010,

        /**
         * 标识这个节点的边界大小发生改变，需要重新计算。只有BoundsAutoCompute标志为true的节点才能设置此标志。
         */
        InvalidBounds = 0x00100,

        /**
         * 标识显示对象祖代的矩阵失效。
         */
        InvalidConcatenatedMatrix = 0x00200,

        /**
         * 标识显示对象祖代的逆矩阵失效。
         */
        InvalidInvertedConcatenatedMatrix = 0x00400,

        /**
         * 显示对象祖代的透明度属性失效。
         */
        InvalidConcatenatedAlpha = 0x00800,

        /**
         * 当一个节点发生从容器添加或删除操作时，要沿显示列表向上传递的标志。
         */
        UpOnAddedOrRemoved = InvalidBounds | Dirty,

        /**
         * 当一个节点发生位置移动时，沿显示列表向上传递的标志。
         */
        UpOnMoved = InvalidBounds | Dirty,

        /**
         * 当一个节点发生从容器添加或删除操作的标志，要沿显示列表向下传递的标志。
         */
        DownOnAddedOrRemoved = InvalidConcatenatedMatrix | InvalidInvertedConcatenatedMatrix | InvalidConcatenatedAlpha,

        /**
         * 当一个节点发生位置移动时，要沿显示列表向下传递的标志
         * Flags to propagate downwards when a node is moved.
         */
        DownOnMoved = InvalidConcatenatedMatrix | InvalidInvertedConcatenatedMatrix | InvalidConcatenatedAlpha,

        /**
         * 当一个节点发生透明度改变时，要沿显示列表向上传递的标志。
         */
        UpOnAlphaChanged = Dirty,

        /**
         * 当一个节点发生透明度改变时，要沿显示列表向下传递的标志。
         */
        DownOnAlphaChanged = InvalidConcatenatedAlpha,

        Visible = 0x10000,

        /**
         * 当一个节点失效时，要沿显示列表向上传递的标志
         */
        UpOnInvalidate = InvalidBounds | Dirty,

        /**
         * 节点初始化时的默认标志
         */
        Default = BoundsAutoCompute |
            InvalidBounds |
            InvalidConcatenatedMatrix |
            InvalidInvertedConcatenatedMatrix |
            Visible,

        /**
         * 标识此节点启用位图缓存模式
         */
        CacheAsBitmap = 0x20000,

        /**
         * 标识此节点绘制时需要贴紧像素点。
         */
        PixelSnapping = 0x40000,

        /**
         * 标识此节点绘制时采用平滑缩放算法。
         */
        ImageSmoothing = 0x80000,

        Dynamic = 0x100000,

        Scalable = 0x200000,

        Tileable = 0x400000,

        Transparent = 0x08000,
    }

}