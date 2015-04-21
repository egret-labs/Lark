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

    export const enum BlendMode {
        /**
         * 默认。在目标图像上显示源图像。
         */
        SourceOver,
        /**
         * 在目标图像顶部显示源图像。源图像位于目标图像之外的部分是不可见的。
         */
        SourceAtop,
        /**
         * 在目标图像中显示源图像。只有目标图像内的源图像部分会显示，目标图像是透明的。
         */
        SourceIn,
        /**
         * 在目标图像之外显示源图像。只会显示目标图像之外源图像部分，目标图像是透明的。
         */
        SourceOut,
        /**
         * 在源图像上方显示目标图像。
         */
        DestinationOver,
        /**
         * 在源图像顶部显示目标图像。源图像之外的目标图像部分不会被显示。
         */
        DestinationAtop,
        /**
         * 在源图像中显示目标图像。只有源图像内的目标图像部分会被显示，源图像是透明的。
         */
        DestinationIn,
        /**
         * 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。
         */
        DestinationOut,
        /**
         * 两图形中重叠部分作加色处理。
         */
        Lighter,
        /**
         * 两图形中重叠的部分作减色处理。
         */
        Darker,
        /**
         * 重叠的部分会变成透明。
         */
        Xor,
        /**
         * 只源图像会被保留，其它都被清除掉。
         */
        Copy
    }
}