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
     * @language zh_CN
     * Sound 允许您在应用程序中使用声音。使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
     * 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
     *
     * @event egret.Event.COMPLETE 音频加载完成时抛出
     */
    /**
     * @language en_US
     * The Sound class lets you work with sound in an application.
     * The Sound class lets you create a Sound object, load and play an external audio file into that object.
     * More detailed control of the sound is performed through the SoundChannel
     *
     * @event egret.Event.COMPLETE Emit when the audio resource is loaded and ready to play
     */
    export interface Sound {

        /**
         * @language zh_CN
         * 启动从指定 URL 加载外部音频文件的过程。
         * @param url 需要加载的音频文件URL
         */
        /**
         * @language en_US
         * Initiates loading of an external audio file from the specified URL.
         * @param url Audio file URL
         */
        load(url?:string):void;

        /**
         * @language zh_CN
         * 生成一个新的 SoundChannel 对象来播放该声音。此方法返回 SoundChannel 对象，访问该对象可停止声音调整音量。
         * @param startTime 应开始播放的初始位置（以毫秒为单位），默认值是 0
         * @param loops 定义在声道停止播放之前，声音循环回 startTime 值的次数，默认值是 0
         */
        /**
         * @language en_US
         * Generates a new SoundChannel object to play back the sound.
         * @param startTime The initial position in milliseconds at which playback should start, (default = 0)
         * @param loops Defines the number of times a sound loops back to the startTime value before the sound channel stops playback. (default = 0)
         */
        play(startTime?:number, loops?:number):SoundChannel;

        /**
         * @language zh_CN
         * 关闭该流，从而停止所有数据的下载。
         */
        /**
         * @language en_US
         * Closes the stream, causing any download of data to cease
         */
        close():void;
    }

    /**
    * @language zh_CN
     * SoundChannel 类控制应用程序中的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * SoundChannel 类包含 stop() 方法、用于设置音量和监视播放进度的属性。
     *
     * @event egret.Event.COMPLETE 音频播放完成时抛出
    */
    /**
     * @language en_US
     * The SoundChannel class controls a sound in an application.
     * Every sound is assigned to a sound channel, and the application
     * can have multiple sound channels that are mixed together.
     * The SoundChannel class contains a stop() method, properties for
     * set the volume of the channel
     *
     * @event egret.Event.COMPLETE Emit when a sound has finished playing
     */
    export interface SoundChannel {

        /**
         * @language zh_CN
         * 音量范围从 0（静音）至 1（最大音量）。
         */
        /**
         * @language en_US
         * The volume, ranging from 0 (silent) to 1 (full volume).
         */
        volume:number;

        /**
         * @language zh_CN
         * [只读] 当播放声音时，position 属性表示声音文件中当前播放的位置（以毫秒为单位）
         */
        /**
         * @language en_US
         * [read-only]  When the sound is playing, the position property indicates
         * in milliseconds the current point that is being played in the sound file.
         */
        position:number;

        /**
         * @language zh_CN
         * 停止在该声道中播放声音。
         */
        /**
         * @language en_US
         * Stops the sound playing in the channel.
         */
        stop():void;
    }

    export var Sound:{

        /**
         * @language zh_CN
         * 创建 Sound 对象、将外部音频文件加载到该对象并播放该文件
         * @param url 需要加载的音频文件URL
         */
        /**
         * @language en_US
         * Create Sound object, load an external audio file and play
         * @param url Audio file URL
         */
        new(url?:string):Sound
    };
}
