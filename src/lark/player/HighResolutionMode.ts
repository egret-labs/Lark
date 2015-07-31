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


module lark.sys {
    /**
     * @private
     * HighResolutionMode 类为高分辨率屏幕显示模式提供可选值。
     * 可选值为<br/>
     *  DEFAULT = "default" 使用设备的逻辑分辨率作为舞台的尺寸和渲染分辨率。
     *  RETINA = "retina"   使用设备的逻辑分辨率作为舞台的尺寸，但使用高清分辨率来渲染。
     *  DEVICE = "device"   使用设备的物理分辨率作为舞台的尺寸
     */
    export class HighResolutionMode {

        /**
         * @private
         * 使用设备提供的逻辑分辨率作为舞台的尺寸和渲染分辨率。
         * 这种模式下，相同字号的文本在不同DPI的屏幕上具有相同的视觉尺寸，但在高DPI屏幕下文字会模糊。
         */
        public static DEFAULT = "default";
        /**
         * @private
         * 使用设备提供的逻辑分辨率作为舞台的尺寸，但使用高清分辨率来渲染。
         * 这种模式下，相同字号的文字在不同DPI的屏幕上具有相同的视觉尺寸，在高DPI屏幕下文字会有更好的渲染效果。
         */
        public static RETINA = "retina";
        /**
         * @private
         * 使用设备的物理分辨率作为舞台的尺寸
         * 这种模式下，相同字号的文字在不同DPI的屏幕上视觉尺寸会不同，在高DPI屏幕下文字看起来会比较小。
         */
        public static DEVICE = "device";
    }
} 