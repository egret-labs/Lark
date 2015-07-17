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
     * @private
     * @language en_US
     * The MovieClip object unlike the Sprite object, a MovieClip object has a timeline.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @private
     * @language zh_CN
     * MovieClip 对象不同于 Sprite 对象，MovieClip 对象拥有一个时间轴。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export interface IMovieClip extends DisplayObject {

        /**
         * @language en_US
         * Specifies the number of the frame in which the playhead is located in the timeline of the MovieClip instance. If the movie clip has multiple scenes, this value is the frame number in the current scene.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指定播放头在 MovieClip 实例的时间轴中所处的帧的编号。如果影片剪辑有多个场景，该值是当前场景中的帧编号。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        currentFrame:number;

        /**
         * @language en_US
         * The label at the current frame in the timeline of the MovieClip instance. If the current frame has no label, currentLabel is null.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * MovieClip 实例的时间轴中当前帧上的标签。如果当前帧没有标签，则 currentLabel 为 null。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        currentFrameLabel:string;

        /**
         * @language en_US
         * The current label in which the playhead is located in the timeline of the MovieClip instance. If the current frame has no label, currentLabel is set to the name of the previous frame that includes a label. If the current frame and previous frames do not include a label, currentLabel returns null.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在 MovieClip 实例的时间轴中播放头所在的当前标签。如果当前帧没有标签，currentLabel 将被设置为包含标签的先前帧的名称。如果当前帧和先前帧都不包含标签，currentLabel 返回 null。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        currentLabel:string;

        /**
         * @language en_US
         * Returns an array of FrameLabel objects. The array includes all frame labels from the entire MovieClip instance.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 返回由 FrameLabel 对象组成的数组。数组会包括整个 MovieClip 实例的所有帧标签。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        labels:Array<FrameLabel>;

        /**
         * @language en_US
         * A movie clip is playing or not.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         *  MovieClip 实例当前是否正在播放。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        isPlaying:boolean;

        /**
         * @language en_US
         * The totalFrames property returns the total number of frames in the movie clip.
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * totalFrames 属性会返回影片剪辑中帧的总数。
         * @readOnly
         * @version Lark 1.0
         * @platform Web,Native
         */
        totalFrames:number;

        /**
         * @language en_US
         * Starts playing the MovieClip at the specified frame.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从指定帧开始播放 MovieClip 。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        gotoAndPlay(frame:any):void;

        /**
         * @language en_US
         * Brings the playhead to the specified frame of the movie clip and stops it there.
         * @param frame A number representing the frame number, or a string representing the label of the frame, to which the playhead is sent.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头移到影片剪辑的指定帧并停在那里。
         * @param frame 表示播放头转到的帧编号的数字，或者表示播放头转到的帧标签的字符串。
         * @version Lark 1.0
         * @platform Web,Native
         */
        gotoAndStop(frame:any):void;

        /**
         * @language en_US
         * Sends the playhead to the next frame and stops it.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头转到下一帧并停止。
         * @version Lark 1.0
         * @platform Web,Native
         */
        nextFrame():void;

        /**
         * @language en_US
         * Moves the playhead in the timeline of the movie clip.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在影片剪辑的时间轴中移动播放头。
         * @version Lark 1.0
         * @platform Web,Native
         */
        play():void;

        /**
         * @language en_US
         * Sends the playhead to the last frame and stops it.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 将播放头转到前一帧并停止。
         * @version Lark 1.0
         * @platform Web,Native
         */
        prevFrame():void;

        /**
         * @language en_US
         * Stops the playhead in the movie clip.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止影片剪辑中的播放头。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop():void;
    }
}