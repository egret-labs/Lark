module lark {

    /**
     * @private
     */
    export class EaseFunction {

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
            return Math.sin((t - 1) * Math.PI * .5) + 1;
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
            return Math.sin(t * Math.PI * .5);
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
            return Math.sin((t - .5) * Math.PI) * .5 + .5;
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
                return Math.sin(t * Math.PI) * .5;
            }
            return Math.sin((t - 1) * Math.PI) * .5 + 1;
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
            if (t < .5) {
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
            var s = (t - .5) * (t - .5) * 2;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
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
            if (t < .5) {
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
            return (t - .5) * (t - .5) * (t - .5) * 4 + .5;
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
            var a = (t - 1);
            return -a * a * a * a + 1;
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
            if (t < .5) {
                return t * t * t * t * 8;
            }
            var a = (t - 1);
            return -a * a * a * a * 8 + 1;
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
            var s = (t - .5) * (t - .5) * (t - .5) * (t - .5) * 8;
            if (t < .5) {
                return .5 - s;
            }
            return .5 + s;
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
            var a = t - 1;
            return a * a * a * a * a + 1;
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
            if (t < .5) {
                return t * t * t * t * t * 16;
            }
            var a = t - 1;
            return a * a * a * a * a * 16 + 1;
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
            var a = t - .5;
            return a * a * a * a * a * 16 + 0.5;
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
            if (t < .5) {
                return Math.pow(2, 10 * (t * 2 - 1)) * .5;
            }
            return -Math.pow(2, -10 * (t - .5) * 2) * .5 + 1.00048828125;
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
            if (t < .5) {
                return -Math.pow(2, -20 * t) * .5 + .5;
            }
            return Math.pow(2, 10 * ((t - .5) * 2 - 1)) * .5 + .5;
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
            if (t < .5) {
                return .5 - Math.sqrt(.25 - t * t);
            }
            return Math.sqrt(.25 - (1 - t) * (1 - t)) + .5;
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
            var s = Math.sqrt(.25 - (.5 - t) * (.5 - t));
            if (t < .5) {
                return s;
            }
            return 1 - s;
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
            var a = t - 1;
            return 2.70158 * a * a * a + 1.70158 * a * a + 1;
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
            var a = t - 1;
            if (t < .5) {
                return 10.80632 * t * t * t - 3.40316 * t * t;
            }
            return 10.80632 * a * a * a + 3.40316 * a * a + 1;
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
            var a = t - .5;
            if (t < .5) {
                return 10.80632 * a * a * a + 3.40316 * a * a + .5;
            }
            return 10.80632 * a * a * a - 3.40316 * a * a + .5;
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
            return -(Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.075) * 2 * Math.PI / .3));
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
            if (t == 0 || t == .5 || t == 1) return t;

            return (Math.pow(2, 10 * -t) * Math.sin((-t - .075) * 2 * Math.PI / .3)) + 1;
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
            if (t == 0 || t == .5 || t == 1) return t;
            if (t < .5) {
                return -(Math.pow(2, 10 * t - 10) * Math.sin((t * 2 - 2.15) * Math.PI / .3));
            }
            return (Math.pow(2, 10 - 20 * t) * Math.sin((-4 * t + 1.85) * Math.PI / .3)) * .5 + 1;
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
            if (t == 0 || t == .5 || t == 1) return t;
            if (t < .5) {
                return (Math.pow(2, -20 * t) * Math.sin((-t * 4 - .15) * Math.PI / .3)) * .5 + .5;
            }
            return -(Math.pow(2, 20 * (t - 1)) * Math.sin((t * 4 - 4.15) * Math.PI / .3)) * .5 + .5;
        }

        private static bounceEaseIn(t:number):number {
            return 1 - EaseFunction.bounceEaseOut(1 - t);
        }

        private static bounceEaseOut(t:number):number {
            var s:number;
            var a = 7.5625;
            var b = 2.75;
            if (t < (1 / 2.75)) {
                s = a * t * t;
            } else if (t < (2 / b)) {
                s = (a * (t - (1.5 / b)) * (t - (1.5 / b)) + .75);
            } else if (t < (2.5 / b)) {
                s = (a * (t - (2.25 / b)) * (t - (2.25 / b)) + .9375);
            } else {
                s = (a * (t - (2.625 / b)) * (t - (2.625 / b)) + .984375);
            }
            return s;
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
        public static BounceEaseIn = EaseFunction.bounceEaseIn;

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
        public static BounceEaseOut = EaseFunction.bounceEaseOut;
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
            if (t < .5) return EaseFunction.bounceEaseIn(t * 2) * .5;
            else return EaseFunction.bounceEaseOut(t * 2 - 1) * .5 + .5;
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
            if (t < .5) return EaseFunction.bounceEaseOut(t * 2) * .5;
            else return EaseFunction.bounceEaseIn(t * 2 - 1) * .5 + .5;
        }
    }
}