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
     * StageScaleMode 类为 Stage.scaleMode 属性提供值。
     */
    export enum StageScaleMode {
        /**
         * 不缩放应用程序内容。即使在更改播放器视口大小时，它仍然保持不变。如果播放器视口比内容小，则可能进行一些裁切。
         * 在此模式下，无法指定舞台尺寸（Stage.stageWidth,Stage.stageHeight），舞台尺寸始终跟播放器视口大小保持一致。
         */
        NO_SCALE = 1,
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较宽方向填满播放器视口，另一个方向的两侧可能会不够宽而留有黑边。
         * 在此模式下，应用程序内容尺寸由舞台尺寸(Stage.stageWidth,Stage.stageHeight)决定，初始化时需手动设置舞台尺寸。
         */
        SHOW_ALL = 2,
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
         * 在此模式下，应用程序内容尺寸由舞台尺寸(Stage.stageWidth,Stage.stageHeight)决定，初始化时需手动设置舞台尺寸。
         */
        NO_BORDER = 3,
        /**
         * 不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器视口。
         * 在此模式下，应用程序内容尺寸由舞台尺寸(Stage.stageWidth,Stage.stageHeight)决定，初始化时需手动设置舞台尺寸。
         */
        EXACT_FIT = 4,

        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
         * 在此模式下，应用程序内容宽度由舞台宽度(Stage.stageWidth)决定，初始化时需手动设置舞台宽度。
         * 无法指定舞台高度(Stage.stageHeight)，舞台高度由当前的缩放比例与播放器视口高度决定。
         */
        FIXED_WIDTH = 5,
        /**
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
         * 在此模式下，应用程序内容高度由舞台高度(Stage.stageHeight)决定，初始化时需手动设置舞台高度。
         * 无法指定舞台宽度(Stage.stageWidth)，舞台宽度由当前的缩放比例与播放器视口宽度决定。
         */
        FIXED_HEIGHT = 6
    }
}