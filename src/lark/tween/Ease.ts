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
        public static None(t:number):number {
            return t;
        }

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
        public static SineEaseIn(t:number):number {
            return Math.sin((t - 1) * Math.PI * 0.5) + 1;
        }

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
        public static SineEaseOut(t:number):number {
            return Math.sin(t * Math.PI * 0.5);
        }

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
        public static SineEaseInOut(t:number):number {
            if (t < 0.5) {
                return Math.sin((t * 2 - 1) * Math.PI * 0.5) * 0.5 + 0.5;
            }
            return Math.sin((t - 0.5) * Math.PI) * 0.5 + 0.5;
        }

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
        public static SineEaseOutIn(t:number):number {
            if (t < 0.5) {
                return Math.sin(t * Math.PI) * 0.5;
            }
            return Math.sin(((t - 0.5) * 2 - 1) * Math.PI * 0.5) * 0.5 + 1;
        }

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
        public static QuadEaseIn(t:number):number {
            return t * t;
        }

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
        public static QuadEaseOut(t:number):number {
            return -(t - 1) * (t - 1) + 1;
        }

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
        public static QuadEaseInOut(t:number):number {
            if (t < 0.5) {
                return t * t * 2;
            }
            return -(t - 1) * (t - 1) * 2 + 1;
        }

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
        public static QuadEaseOutIn(t:number):number {
            if (t < 0.5) {
                return -(t - 0.5) * (t - 0.5) * 2 + 0.5;
            }
            return (t - 0.5) * (t - 0.5) * 2 + 0.5;
        }

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
        public static CubicEaseIn(t:number):number {
            return t * t * t;
        }

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
        public static CubicEaseOut(t:number):number {
            return (t - 1) * (t - 1) * (t - 1) + 1;
        }

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
        public static CubicEaseInOut(t:number):number {
            if (t < 0.5) {
                return t * t * t * 4;
            }
            return (t - 1) * (t - 1) * (t - 1) * 4 + 1;
        }

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
        public static CubicEaseOutIn(t:number):number {
            return (t - 0.5) * (t - 0.5) * (t - 0.5) * 4 + 0.5;
        }

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
        public static QuartEaseIn(t:number):number {
            return t * t * t * t;
        }

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
        public static QuartEaseOut(t:number):number {
            return -(t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
        }

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
        public static QuartEaseInOut(t:number):number {
            if (t < 0.5) {
                return t * t * t * t * 8;
            }
            return -(t - 1) * (t - 1) * (t - 1) * (t - 1) * 8 + 1;
        }

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
        public static QuartEaseOutIn(t:number):number {
            if (t < 0.5) {
                return -(t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * 8 + 0.5;
            }
            return (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * 8 + 0.5;
        }

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
        public static QuintEaseIn(t:number):number {
            return t * t * t * t * t;
        }

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
        public static QuintEaseOut(t:number):number {
            return (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
        }

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
        public static QuintEaseInOut(t:number):number {
            if (t < 0.5) {
                return t * t * t * t * t * 16;
            }
            return (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) * 16 + 1;
        }

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
        public static QuintEaseOutIn(t:number):number {
            return (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * 16 + 0.5;
        }

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
        public static ExpoEaseIn(t:number):number {
            return Math.pow(2, 10 * (t - 1));
        }

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
        public static ExpoEaseOut(t:number):number {
            return -Math.pow(2, -10 * t) + 1;
        }

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
        public static ExpoEaseInOut(t:number):number {
            if (t < 0.5) {
                return Math.pow(2, 10 * (t * 2 - 1)) * 0.5;
            }
            return -Math.pow(2, -10 * (t - 0.5) * 2) * 0.5 + 1.00048828125;
        }

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
        public static ExpoEaseOutIn(t:number):number {
            if (t < 0.5) {
                return -Math.pow(2, -20 * t) * 0.5 + 0.5;
            }
            return Math.pow(2, 10 * ((t - 0.5) * 2 - 1)) * 0.5 + 0.5;
        }

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
        public static CircEaseIn(t:number):number {
            return 1 - Math.sqrt(1 - t * t);
        }

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
        public static CircEaseOut(t:number):number {
            return Math.sqrt(1 - (1 - t) * (1 - t));
        }

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
        public static CircEaseInOut(t:number):number {
            if (t < 0.5) {
                return 0.5 - Math.sqrt(0.25 - t * t);
            }
            return Math.sqrt(0.25 - (1 - t) * (1 - t)) + 0.5;
        }

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
        public static CircEaseOutIn(t:number):number {
            if (t < 0.5) {
                return Math.sqrt(0.25 - (0.5 - t) * (0.5 - t));
            }
            return 1 - Math.sqrt(0.25 - (t - 0.5) * (t - 0.5));
        }

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
        public static BackEaseIn(t:number):number {
            return 2.70158 * t * t * t - 1.70158 * t * t;
        }

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
        public static BackEaseOut(t:number):number {
            return 2.70158 * (t - 1) * (t - 1) * (t - 1) + 1.70158 * (t - 1) * (t - 1) + 1;
        }

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
        public static BackEaseInOut(t:number):number {
            if (t < 0.5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * (t - 1) * (t - 1) * (t - 1) + 3.40316 * (t - 1) * (t - 1) + 1;
        }

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
        public static BackEaseOutIn(t:number):number {
            if (t < 0.5) {
                return 10.80632 * (t - 0.5) * (t - 0.5) * (t - 0.5) + 3.40316 * (t - 0.5) * (t - 0.5) + 0.5;
            }
            return 10.80632 * (t - 0.5) * (t - 0.5) * (t - 0.5) - 3.40316 * (t - 0.5) * (t - 0.5) + 0.5;
        }

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
        public static ElasticEaseIn(t:number):number {
            if (t == 0 || t == 1) return t;
            return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / 0.3));
        }

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
        public static ElasticEaseOut(t:number):number {
            if (t == 0 || t == 1) return t;
            return (Math.pow(2, 10 * -t) * Math.sin((-t - 0.075) * 2 * Math.PI / 0.3)) + 1;
        }

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
        public static ElasticEaseInOut(t:number):number {
            if (t == 0 || t == 0.5 || t == 1) return t;
            if (t < 0.5) {
                return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / 0.3));
            }
            return (Math.pow(2, 10 * -(t - 0.5) * 2) * Math.sin((-(t - 0.5) * 2 - 0.075) * 2 * Math.PI / 0.3)) * 0.5 + 1;
        }

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
        public static ElasticEaseOutIn(t:number):number {
            if (t == 0 || t == 0.5 || t == 1) return t;
            if (t < 0.5) {
                return (Math.pow(2, 20 * -t) * Math.sin((-t * 2 - 0.075) * 2 * Math.PI / 0.3)) * 0.5 + 0.5;
            }
            return -(Math.pow(2, 10 * ((t - 0.5) * 2 - 1)) * Math.sin(((t - 0.5) * 2 - 1.075) * 2 * Math.PI / 0.3)) * 0.5 + 0.5;
        }

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
        public static BounceEaseIn(t:number):number {
            if (1 - t < (1 / 2.75)) {
                return 1 - 7.5625 * (1 - t) * (1 - t);
            } else if (1 - t < (2 / 2.75)) {
                return 1 - (7.5625 * ((1 - t) - (1.5 / 2.75)) * ((1 - t) - (1.5 / 2.75)) + .75);
            } else if (1 - t < (2.5 / 2.75)) {
                return 1 - (7.5625 * ((1 - t) - (2.25 / 2.75)) * ((1 - t) - (2.25 / 2.75)) + .9375);
            }
            return 1 - (7.5625 * ((1 - t) - (2.625 / 2.75)) * ((1 - t) - (2.625 / 2.75)) + .984375);
        }

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
        public static BounceEaseOut(t:number):number {
            if (t < (1 / 2.75)) {
                return 7.5625 * t * t;
            } else if (t < (2 / 2.75)) {
                return (7.5625 * (t - (1.5 / 2.75)) * (t - (1.5 / 2.75)) + .75);
            } else if (t < (2.5 / 2.75)) {
                return (7.5625 * (t - (2.25 / 2.75)) * (t - (2.25 / 2.75)) + .9375);
            }
            return (7.5625 * (t - (2.625 / 2.75)) * (t - (2.625 / 2.75)) + .984375);
        }

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
        public static BounceEaseInOut(t:number):number {
            if (t < 0.5) {
                if (1 - t * 2 < (1 / 2.75)) {
                    return 0.5 - 7.5625 * (1 - t * 2) * (0.5 - t);
                } else if (1 - t * 2 < (2 / 2.75)) {
                    return 0.5 - 0.5 * (7.5625 * ((1 - t * 2) - (1.5 / 2.75)) * ((1 - t * 2) - (1.5 / 2.75)) + .75);
                } else if (1 - t * 2 < (2.5 / 2.75)) {
                    return 0.5 - 0.5 * (7.5625 * ((1 - t * 2) - (2.25 / 2.75)) * ((1 - t * 2) - (2.25 / 2.75)) + .9375);
                } else {
                    return 0.5 - 0.5 * (7.5625 * ((1 - t * 2) - (2.625 / 2.75)) * ((1 - t * 2) - (2.625 / 2.75)) + .984375);
                }
            } else {
                if ((t - 0.5) * 2 < (1 / 2.75)) {
                    return 7.5625 * (t - 0.5) * (t - 0.5) * 2 + 0.5;
                } else if ((t - 0.5) * 2 < (2 / 2.75)) {
                    return (7.5625 * ((t - 0.5) * 2 - (1.5 / 2.75)) * ((t - 0.5) * 2 - (1.5 / 2.75)) + .75) * 0.5 + 0.5;
                } else if ((t - 0.5) * 2 < (2.5 / 2.75)) {
                    return (7.5625 * ((t - 0.5) * 2 - (2.25 / 2.75)) * ((t - 0.5) * 2 - (2.25 / 2.75)) + .9375) * 0.5 + 0.5;
                }
                else {
                    return (7.5625 * ((t - 0.5) * 2 - (2.625 / 2.75)) * ((t - 0.5) * 2 - (2.625 / 2.75)) + .984375) * 0.5 + 0.5;
                }
            }
            return 0;
        }

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
        public static BounceEaseOutIn(t:number):number {
            if (t < 0.5) {
                if (t * 2 < (1 / 2.75)) {
                    return 7.5625 * t * t * 2;
                } else if (t * 2 < (2 / 2.75)) {
                    return (7.5625 * (t * 2 - (1.5 / 2.75)) * (t * 2 - (1.5 / 2.75)) + .75) * 0.5;
                } else if (t * 2 < (2.5 / 2.75)) {
                    return (7.5625 * (t * 2 - (2.25 / 2.75)) * (t * 2 - (2.25 / 2.75)) + .9375) * 0.5;
                }
                else {
                    return (7.5625 * (t * 2 - (2.625 / 2.75)) * (t * 2 - (2.625 / 2.75)) + .984375) * 0.5;
                }
            }
            else {
                if (1 - (t - 0.5) * 2 < (1 / 2.75)) {
                    return 1 - 7.5625 * (1 - (t - 0.5) * 2) * (1 - (t - 0.5) * 2) * 0.5;
                } else if (1 - (t - 0.5) * 2 < (2 / 2.75)) {
                    return 1 - (7.5625 * ((1 - (t - 0.5) * 2) - (1.5 / 2.75)) * ((1 - (t - 0.5) * 2) - (1.5 / 2.75)) + .75) * 0.5;
                } else if (1 - (t - 0.5) * 2 < (2.5 / 2.75)) {
                    return 1 - (7.5625 * ((1 - (t - 0.5) * 2) - (2.25 / 2.75)) * ((1 - (t - 0.5) * 2) - (2.25 / 2.75)) + .9375) * 0.5;
                }
                else {
                    return 1 - (7.5625 * ((1 - (t - 0.5) * 2) - (2.625 / 2.75)) * ((1 - (t - 0.5) * 2) - (2.625 / 2.75)) + .984375) * 0.5;
                }
            }
            return 0;
        }
    }
}