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
     * @language en_US
     * The StageScaleMode class provides values for the Stage.scaleMode property.
     * @see lark.Stage#scaleMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * StageScaleMode 类为舞台缩放模式提供值。
     * @see lark.Stage#scaleMode
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class StageScaleMode {
        /**
         * @language en_US
         * Specifies that the size of the application be fixed, so that it remains unchanged even as the size of the screen
         * changes. Cropping might occur if the screen is smaller than the content.<br/>
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the size of the screen.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 不缩放应用程序内容。即使在更改播放器视口大小时，它仍然保持不变。如果播放器视口比内容小，则可能进行一些裁切。
         * 在此模式下，舞台尺寸（Stage.stageWidth,Stage.stageHeight）始终跟播放器视口大小保持一致。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static NO_SCALE:string = "noScale";
        /**
         * @language en_US
         * @private
         * Specifies that the entire application be visible in the specified area without distortion while maintaining the
         * original aspect ratio of the application. Borders can appear on two sides of the application.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @private
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较宽方向填满播放器视口，另一个方向的两侧可能会不够宽而留有黑边。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static SHOW_ALL:string = "showAll";
        /**
         * @language en_US
         * Specifies that the entire application fill the specified area, without distortion but possibly with some cropping,
         * while maintaining the original aspect ratio of the application.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容的较窄方向填满播放器视口，另一个方向的两侧可能会超出播放器视口而被裁切。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static NO_BORDER:string = "noBorder";
        /**
         * @language en_US
         * Specifies that the entire application be visible in the specified area without trying to preserve the original
         * aspect ratio. Distortion can occur.
         * In this mode,the size of the stage (Stage.stageWidth,Stage.stageHeight) always equals to the initial content size.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 不保持原始宽高比缩放应用程序内容，缩放后应用程序内容正好填满播放器视口。
         * 在此模式下，舞台尺寸(Stage.stageWidth,Stage.stageHeight)始终等于初始化时外部传入的应用程序内容尺寸。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static EXACT_FIT:string = "exactFit";

        /**
         * @language en_US
         * Specifies that the width of the application be fixed,while maintaining the original aspect ratio of the application,
         * so that the height of the application might changes. Cropping might occur if the height of the screen is smaller than the content.
         * In this mode,the stage width always equals to the initial content width,but the stage height is determined by the content height
         * and the scaling factor of the stage width and the content width.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始宽度不变，高度可能会改变。
         * 在此模式下，舞台宽度(Stage.stageWidth)始终等于初始化时外部传入的应用程序内容宽度。舞台高度(Stage.stageHeight)由当前的缩放比例与播放器视口高度决定。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static FIXED_WIDTH:string = "fixedWidth";
        /**
         * @language en_US
         * Specifies that the height of the application be fixed,while maintaining the original aspect ratio of the application,
         * so that the width of the application might changes. Cropping might occur if the width of the screen is smaller than the content.
         * In this mode,the stage height always equals to the initial content height,but the stage width is determined by the content width
         * and the scaling factor of the stage height and the content height.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 保持原始宽高比缩放应用程序内容，缩放后应用程序内容在水平和垂直方向都填满播放器视口，但只保持应用程序内容的原始高度不变，宽度可能会改变。
         * 在此模式下，舞台高度(Stage.stageHeight)始终等于初始化时外部传入的应用程序内容高度。舞台宽度(Stage.stageWidth)由当前的缩放比例与播放器视口宽度决定。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static FIXED_HEIGHT:string = "fixedHeight";
    }
}