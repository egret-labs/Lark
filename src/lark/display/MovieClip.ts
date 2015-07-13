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
     * The FrameLabel object contains properties that specify a frame number and the corresponding label name.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
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

    /**
     * @language en_US
     * The MovieClip object unlike the Sprite object, a MovieClip object has a timeline.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * MovieClip 对象不同于 Sprite 对象，MovieClip 对象拥有一个时间轴。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class MovieClip extends Sprite {

        /**
         * @language en_US
         * Constructor.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor() {
            super();
            this.$currentFrame = 0;
            this.$isPlaying = false;
            this.$labels = [];
            this.$frames = [];
        }

        /**
         * @private
         */
        $currentFrame:number;

        /**
         * @language en_US
         * Specifies the number of the frame in which the playhead is located in the timeline of the MovieClip instance. If the movie clip has multiple scenes, this value is the frame number in the current scene.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定播放头在 MovieClip 实例的时间轴中所处的帧的编号。如果影片剪辑有多个场景，该值是当前场景中的帧编号。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentFrame():number {
            return this.$currentFrame;
        }

        /**
         * @language en_US
         * The label at the current frame in the timeline of the MovieClip instance. If the current frame has no label, currentLabel is null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * MovieClip 实例的时间轴中当前帧上的标签。如果当前帧没有标签，则 currentLabel 为 null。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentFrameLabel():string {
            for (var i = this.$labels.length - 1; i >= 0; i--) {
                if (this.$labels[i].frame == this.$currentFrame) {
                    return this.$labels[i].name;
                }
            }
            return null;
        }

        /**
         * @language en_US
         * The current label in which the playhead is located in the timeline of the MovieClip instance. If the current frame has no label, currentLabel is set to the name of the previous frame that includes a label. If the current frame and previous frames do not include a label, currentLabel returns null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在 MovieClip 实例的时间轴中播放头所在的当前标签。如果当前帧没有标签，currentLabel 将被设置为包含标签的先前帧的名称。如果当前帧和先前帧都不包含标签，currentLabel 返回 null。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentLabel():string {
            for (var i = this.$labels.length - 1; i >= 0; i--) {
                if (this.$labels[i].frame <= this.$currentFrame) {
                    return this.$labels[i].name;
                }
            }
            return null;
        }

        /**
         * @private
         */
        $frames;

        /**
         * @private
         */
        $labels:Array<FrameLabel>;

        /**
         * @language en_US
         * Returns an array of FrameLabel objects. The array includes all frame labels from the entire MovieClip instance.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回由 FrameLabel 对象组成的数组。数组会包括整个 MovieClip 实例的所有帧标签。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get labels():Array<FrameLabel>{
            return this.$labels;
        }

        /**
         * @private
         */
        $isPlaying:boolean;

        /**
         * @language en_US
         * A movie clip is playing or not.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  MovieClip 实例当前是否正在播放。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get isPlaying():boolean {
            return this.$isPlaying;
        }

        /**
         * @private
         */
        private playCurrentFrame() {
        }
    }
}