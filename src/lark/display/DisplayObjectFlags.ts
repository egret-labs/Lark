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
    /**
     * 显示对象失效标志
     */
    export const enum DisplayObjectFlags {

        //DisplayObject使用的：0x1,0x2,0x4,0x8,0x10,0x20,0x40,0x80,0x100,0x200,0x400,0x800,0x1000,0x2000,0x4000,0x8000,0x10000
        // 未使用的：
        // 0x20000,0x40000,0x80000,0x100000,0x200000,0x400000,0x800000,0x1000000,0x2000000,0x4000000,0x8000000,0x10000000,
        // 0x20000000,0x40000000,0x80000000,0x100000000,0x200000000,0x400000000,0x800000000,0x1000000000,0x2000000000,
        // 0x4000000000,0x8000000000,0x10000000000,0x20000000000,0x40000000000,0x80000000000,0x100000000000,0x200000000000

        None = 0x0000,

        /**
         * 显示对象可见的标志
         */
        Visible = 0x0001,

        /**
         * 显示对象自身的绘制区域尺寸失效
         */
        InvalidContentBounds = 0x0002,

        /**
         * 显示对象的矩形区域尺寸失效，包括自身绘制区域和子项的区域集合
         */
        InvalidBounds = 0x0004,

        /**
         * 显示对象的matrix属性失效标志，通常因为scaleX，width等属性发生改变。
         */
        InvalidMatrix = 0x0008,

        /**
         * 显示对象祖代的矩阵失效。
         */
        InvalidConcatenatedMatrix = 0x0010,

        /**
         * 显示对象祖代的逆矩阵失效。
         */
        InvalidInvertedConcatenatedMatrix = 0x0020,

        /**
         * 显示对象祖代的透明度属性失效。
         */
        InvalidConcatenatedAlpha = 0x0040,
        /**
         * 显示对象应该被缓存成位图的标志，即使没有设置这个标志，也有可能被缓存成位图，例如含有滤镜的情况。
         * 而当设置了这个标志，如果内存不足，也会放弃缓存。
         */
        CacheAsBitmap = 0x0080,

        /**
         * 显示对象自身的RenderNode需要重绘的标志
         */
        DirtyRender = 0x0100,
        /**
         * 子项中已经全部含有DirtyRender标志，无需继续遍历。
         */
        DirtyChildren = 0x200,

        /**
         * DirtyRender|DirtyChildren
         */
        Dirty = DirtyRender|DirtyChildren,
        /**
         * 添加或删除子项时，需要向子项传递的标志。
         */
        DownOnAddedOrRemoved = DisplayObjectFlags.InvalidConcatenatedMatrix |
            DisplayObjectFlags.InvalidInvertedConcatenatedMatrix |
            DisplayObjectFlags.InvalidConcatenatedAlpha

    }

}