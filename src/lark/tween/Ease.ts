module lark {

    /**
     * @language en_US
     * Ease defines some common easing function.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Ease 定义了一些常用的缓动函数。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class Ease {

        /**
         * @language en_US
         * Uniform type of easing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 匀速缓动类型。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static None = "None";

        /**
         * @language en_US
         * sine curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * sin 曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static SineEaseIn = "SineEaseIn";

        /**
         * @language en_US
         * sine curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * sin 曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static SineEaseOut = "SineEaseOut";

        /**
         * @language en_US
         * sine curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * sin 曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,NativeEaseInOutSine
         */
        public static SineEaseInOut = "SineEaseInOut";

        /**
         * @language en_US
         * sine curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * sin 曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,NativeEaseInOutSine
         */
        public static SineEaseOutIn = "SineEaseOutIn";

        /**
         * @language en_US
         * x to the 2 power curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 2 次方曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuadEaseIn = "QuadEaseIn";

        /**
         * @language en_US
         * x to the 2 power curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 2 次方曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuadEaseOut = "QuadEaseOut";

        /**
         * @language en_US
         * x to the 2 power curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 2 次方曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuadEaseInOut = "QuadEaseInOut";

        /**
         * @language en_US
         * x to the 2 power curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 2 次方曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuadEaseOutIn = "QuadEaseOutIn";

        /**
         * @language en_US
         * x to the third 3 curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CubicEaseIn = "CubicEaseIn";

        /**
         * @language en_US
         * x to the third 3 curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CubicEaseOut = "CubicEaseOut";

        /**
         * @language en_US
         * x to the 3 power curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CubicEaseInOut = "CubicEaseInOut";

        /**
         * @language en_US
         * x to the 3 power curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CubicEaseOutIn = "CubicEaseOutIn";

        /**
         * @language en_US
         * x to the 4 power curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 4 次方曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuartEaseIn = "QuartEaseIn";

        /**
         * @language en_US
         * x to the 4 power curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 4 次方曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuartEaseOut = "QuartEaseOut";

        /**
         * @language en_US
         * x to the 4 power curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 4 次方曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuartEaseInOut = "QuartEaseInOut";

        /**
         * @language en_US
         * x to the 4 power curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 4 次方曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuartEaseOutIn = "QuartEaseOutIn";

        /**
         * @language en_US
         * x to the 5 power curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 5 次方曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuintEaseIn = "QuintEaseIn";

        /**
         * @language en_US
         * x to the 5 power curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 5 次方曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuintEaseOut = "QuintEaseOut";

        /**
         * @language en_US
         * x to the 5 power curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 5 次方曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuintEaseInOut = "QuintEaseInOut";

        /**
         * @language en_US
         * x to the 5 power curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 5 次方曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static QuintEaseOutIn = "QuintEaseOutIn";

        /**
         * @language en_US
         * Exponential curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ExpoEaseIn = "ExpoEaseIn";

        /**
         * @language en_US
         * Exponential curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ExpoEaseOut = "ExpoEaseOut";

        /**
         * @language en_US
         * Exponential curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ExpoEaseInOut = "ExpoEaseInOut";

        /**
         * @language en_US
         * Exponential curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ExpoEaseOutIn = "ExpoEaseOutIn";

        /**
         * @language en_US
         * Circle curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CircEaseIn = "CircEaseIn";

        /**
         * @language en_US
         * Circle curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CircEaseOut = "CircEaseOut";

        /**
         * @language en_US
         * Circle curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CircEaseInOut = "CircEaseInOut";

        /**
         * @language en_US
         * Circle curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static CircEaseOutIn = "CircEaseOutIn";

        /**
         * @language en_US
         * 3 power curve x of Rebound curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方回弹曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BackEaseIn = "BackEaseIn";

        /**
         * @language en_US
         * 3 power curve x of Rebound curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方回弹曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BackEaseOut = "BackEaseOut";

        /**
         * @language en_US
         * 3 power curve x of Rebound curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方回弹曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BackEaseInOut = "BackEaseInOut";

        /**
         * @language en_US
         * 3 power curve x of Rebound curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * x 的 3 次方回弹曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BackEaseOutIn = "BackEaseOutIn";

        /**
         * @language en_US
         * Exponential Decay curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数衰减曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ElasticEaseIn = "ElasticEaseIn";

        /**
         * @language en_US
         * Exponential Decay curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数衰减曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ElasticEaseOut = "ElasticEaseOut";

        /**
         * @language en_US
         * Exponential Decay curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数衰减曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ElasticEaseInOut = "ElasticEaseInOut";

        /**
         * @language en_US
         * Exponential Decay curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 指数衰减曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static ElasticEaseOutIn = "ElasticEaseOutIn";

        /**
         * @language en_US
         * Circle curve fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BounceEaseIn = "BounceEaseIn";

        /**
         * @language en_US
         * Circle curve fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BounceEaseOut = "BounceEaseOut";
        /**
         * @language en_US
         * Circle curve fade in and fade out.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡入淡出。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BounceEaseInOut = "BounceEaseInOut";

        /**
         * @language en_US
         * Circle curve fade out and fade in.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 圆形曲线淡出淡入。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static BounceEaseOutIn = "BounceEaseOutIn";
    }
}