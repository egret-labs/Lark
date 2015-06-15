declare module lark {
    /**
     * @language en_US
     * The Sound class lets you work with sound in an application.
     * The Sound class lets you create a Sound object, load and play an external audio file into that object.
     * More detailed control of the sound is performed through the SoundChannel
     *
     * @event egret.Event.COMPLETE Emit when the audio resource is loaded and ready to play
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Sound 允许您在应用程序中使用声音。使用 Sound 类可以创建 Sound 对象、将外部音频文件加载到该对象并播放该文件。
     * 可通过 SoundChannel 对声音执行更精细的控制，如控制音量和监控播放进度。
     *
     * @event egret.Event.COMPLETE 音频加载完成时抛出
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Sound extends IEventEmitter {
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
        load(url?: string): void;
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
        play(startTime?: number, loop?: boolean): SoundChannel;
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
        close(): void;
    }
    /**
     * @copy lark.Sound
     */
    var Sound: {
        /**
         * @language en_US
         * Create Sound object, load an external audio file and play
         * @param url Audio file URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建 Sound 对象、将外部音频文件加载到该对象并播放该文件
         * @param url 需要加载的音频文件URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        new (url?: string): Sound;
    };
}
declare module lark {
    /**
     * @language en_US
     * The SoundChannel class controls a sound in an application.
     * Every sound is assigned to a sound channel, and the application
     * can have multiple sound channels that are mixed together.
     * The SoundChannel class contains a stop() method, properties for
     * set the volume of the channel
     *
     * @event egret.Event.COMPLETE Emit when a sound has finished playing
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
    * @language zh_CN
     * SoundChannel 类控制应用程序中的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。
     * SoundChannel 类包含 stop() 方法、用于设置音量和监视播放进度的属性。
     *
     * @event egret.Event.ENDED 音频播放完成时抛出
     * @version Lark 1.0
     * @platform Web,Native
    */
    interface SoundChannel extends IEventEmitter {
        /**
         * @language en_US
         * The volume, ranging from 0 (silent) to 1 (full volume).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 音量范围从 0（静音）至 1（最大音量）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        volume: number;
        /**
         * @language en_US
         * [read-only]  When the sound is playing, the position property indicates
         * in seconds the current point that is being played in the sound file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [只读] 当播放声音时，position 属性表示声音文件中当前播放的位置（以秒为单位）
         * @version Lark 1.0
         * @platform Web,Native
         */
        position: number;
        /**
         * @language en_US
         * Stops the sound playing in the channel.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止在该声道中播放声音。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The Video class lets you work with video in an application.
     * The Video class lets you create a Video object, load and play an external video file into that object.
     * [warning] On most mobile device, the video is playback in the full screen mode.
     *
     * @event egret.Event.COMPLETE Emit when the video resource is loaded and ready to play
     * @event egret.Event.ENDED Emit when the video playback ended
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Video 允许您在应用程序中使用视频。使用 Video 类可以创建 Video 对象、将外部视频文件加载到该对象并播放该文件。
     * [警告] 在大多数移动设备中，视频是强制全屏播放的，所以你可以直接调用 play() 方法全屏播放视频，不用将它绘制在Stage中。
     *
     * @event egret.Event.COMPLETE 视频加载完成时抛出
     * @event egret.Event.ENDED 视频播放完成时抛出
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Video extends IEventEmitter {
        /**
         * @language en_US
         * Initiates loading of an external video file from the specified URL.
         * @param url Audio file URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 启动从指定 URL 加载外部视频文件的过程。
         * @param url 需要加载的视频文件URL
         * @version Lark 1.0
         * @platform Web,Native
         */
        load(url?: string): void;
        /**
         * @language en_US
         * Play back the video.
         * @param startTime The initial position in seconds at which playback should start, (default = 0)
         * @param loop Defines should play the video again when the video is ended. (default = false)
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 播放该视频
         * @param startTime 应开始播放的初始位置（以秒为单位），默认值是 0
         * @param loop 是否需要循环播放，默认值是 false
         * @version Lark 1.0
         * @platform Web,Native
         */
        play(startTime?: number, loop?: boolean): any;
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
        close(): void;
        /**
         * @language en_US
         * The volume, ranging from 0 (silent) to 1 (full volume).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 音量范围从 0（静音）至 1（最大音量）。
         * @version Lark 1.0
         * @platform Web,Native
         */
        volume: number;
        /**
         * @language en_US
         * When the video is playing, the position property indicates
         * in seconds the current point that is being played in the video file.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当播放视频时，position 属性表示视频文件中当前播放的位置（以秒为单位）
         * @version Lark 1.0
         * @platform Web,Native
         */
        position: number;
        /**
         * @language en_US
         * Stop the video playing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止播放。
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
        /**
         * @language en_US
         * [read-only]Get bitmapData of the video file, you can use the video as bitmapData on the stage.
         * [warning] On most mobile device, the video is playback in the full screen mode.
         * So you can just use the play() method instead of draw it on the Stage
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * [只读] 获取视频的 bitmapData, 你可以将视频绘制到舞台上。
         * [警告] 在大多数移动设备中，视频是全屏播放的，所以你可以直接调用 play() 方法全屏播放视频，不用将它绘制在Stage中。
         * @version Lark 1.0
         * @platform Web,Native
         */
        bitmapData: BitmapData;
    }
    var Video: {
        new (src?: string): Video;
    };
}
declare module lark {
}
declare module lark {
}
