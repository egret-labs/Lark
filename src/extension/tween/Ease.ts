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
        public static NONE = "None";

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
        public static SINE_EASE_IN = "SineEaseIn";

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
        public static SINE_EASE_IN_OUT = "SineEaseInOut";

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
        public static QUAD_EASE_IN = "QuadEaseIn";

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
        public static QUAD_EASE_OUT = "QuadEaseOut";

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
        public static QUAD_EASE_IN_OUT = "QuadEaseInOut";

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
        public static QUAD_EASE_OUT_IN = "QuadEaseOutIn";

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
        public static CUBIC_EASE_IN = "CubicEaseIn";

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
        public static CUBIC_EASE_OUT = "CubicEaseOut";

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
        public static CUBIC_EASE_IN_OUT = "CubicEaseInOut";

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
        public static CUBIC_EASE_OUT_IN = "CubicEaseOutIn";

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
        public static QUART_EASE_IN = "QuartEaseIn";

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
        public static QUART_EASE_OUT = "QuartEaseOut";

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
        public static QUART_EASE_IN_OUT = "QuartEaseInOut";

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
        public static QUART_EASE_OUT_IN = "QuartEaseOutIn";

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
        public static QUINT_EASE_IN = "QuintEaseIn";

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
        public static QUINT_EASE_OUT = "QuintEaseOut";

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
        public static QUINT_EASE_IN_OUT = "QuintEaseInOut";

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
        public static QUINT_EASE_OUT_IN = "QuintEaseOutIn";

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
        public static EXPO_EASE_IN = "ExpoEaseIn";

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
        public static EXPO_EASE_OUT = "ExpoEaseOut";

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
        public static EXPO_EASE_IN_OUT = "ExpoEaseInOut";

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
        public static EXPO_EASE_OUT_IN = "ExpoEaseOutIn";

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
        public static CIRC_EASE_IN = "CircEaseIn";

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
        public static CIRC_EASE_OUT = "CircEaseOut";

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
        public static CIRC_EASE_IN_OUT = "CircEaseInOut";

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
        public static CIRC_EASE_OUT_IN = "CircEaseOutIn";

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
        public static BACK_EASE_IN = "BackEaseIn";

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
        public static BACK_EASE_OUT = "BackEaseOut";

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
        public static BACK_EASE_IN_OUT = "BackEaseInOut";

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
        public static BACK_EASE_OUT_IN = "BackEaseOutIn";

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
        public static ELASTIC_EASE_IN = "ElasticEaseIn";

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
        public static ELASTIC_EASE_OUT = "ElasticEaseOut";

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
        public static ELASTIC_EASE_IN_OUT = "ElasticEaseInOut";

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
        public static ELASTIC_EASE_OUT_IN = "ElasticEaseOutIn";

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
        public static BOUNCE_EASE_IN = "BounceEaseIn";

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
        public static BOUNCE_EASE_IN_OUT = "BounceEaseInOut";

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
        public static BOUNCE_EASE_OUT_IN = "BounceEaseOutIn";

        /**
         * @language en_US
         * Register custom ease function.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 注册自定义缓动函数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static registerEaseFunction(name:string,ease:Function):void {
            EaseFunction[name] = ease;
        }
    }
}