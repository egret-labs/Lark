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
     * The Sound class lets you work with sound in an application.
     * The Sound class lets you create a Sound object, load and play an external audio file into that object.
     * More detailed control of the sound is performed through the SoundChannel
     *
     * @event lark.Event.COMPLETE Emit when the audio resource is loaded and ready to play
     * @event lark.Event.IO_ERROR Emit when the audio resource is failed to load
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/media/SoundExample.ts
     */
    /**
     * @language zh_CN
     * Sound 允许您在应用程序中使用声音。使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
     * 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
     *
     * @event lark.Event.COMPLETE 音频加载完成时抛出
     * @event lark.Event.IO_ERROR 音频加载失败时抛出
     * @version Lark 1.0
     * @platform Web,Native
     * @includeExample examples/Samples/src/lark/media/SoundExample.ts
     */
    export interface Sound extends IEventEmitter {

        /**
         * @language en_US
         * Initiates loading of an external audio file from the specified URL.
         * @param url Audio file URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 启动从指定 URL 加载外部音频文件的过程。
         * @param url 需要加载的音频文件URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        load(url?:string):void;

        /**
         * @language en_US
         * Generates a new SoundChannel object to play back the sound.
         * @param startTime The initial position in seconds at which playback should start, (default = 0)
         * @param loop Defines should play the audio again when the audio is ended. (default = false)
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 生成一个新的 SoundChannel 对象来播放该声音。此方法返回 SoundChannel 对象，访问该对象可停止声音调整音量。
         * @param startTime 应开始播放的初始位置（以秒为单位），默认值是 0
         * @param loop 是否需要循环播放，默认值是 false
         * @version Lark 1.0
         * @platform Web,Native
         */
        play(startTime?:number, loop?:boolean):SoundChannel;

        /**
         * @language en_US
         * Closes the stream, causing any download of data to cease
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 关闭该流，从而停止所有数据的下载。
         * @version Lark 1.0
         * @platform Web,Native
         */
        close():void;
    }


    /**
     * @copy lark.Sound
     */
    export var Sound:{

        /**
         * @language en_US
         * Create Sound object, load an external audio file and play
         * @param url Audio file URL, Sound will start to load the media if url is not empty
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建 Sound 对象、将外部音频文件加载到该对象并播放该文件
         * @param url 需要加载的音频文件URL,如果指定了 url, Sound会立即开始加载指定的媒体文件
         * @version Lark 1.0
         * @platform Web,Native
         */
        new(url?:string):Sound
    };
}
