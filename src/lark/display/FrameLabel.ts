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

module lark
{
    /**
     * @private
     * @language en_US
     * The FrameLabel object contains properties that specify a frame number and the corresponding label name.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * FrameLabel 对象包含用来指定帧编号及相应标签名称的属性。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class FrameLabel extends LarkObject {

        /**
         * @language en_US
         * Constructor.
         * @param name The label name.
         * @param frame The frame number associated with the label name.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         * @param name 标签名称。
         * @param frame 与标签名称关联的帧编号。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(name:string, frame:number) {
            super();
            this.$name = name;
            this.$frame = frame;
        }

        /**
         * @private
         */
        $frame:number;

        /**
         * @language en_US
         * The frame number containing the label.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 包含标签的帧编号。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get frame():number {
            return this.$frame;
        }

        /**
         * @private
         */
        $name:string;

        /**
         * @language en_US
         * The name of the label.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 标签的名称。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get name():string {
            return this.$name;
        }
    }
}