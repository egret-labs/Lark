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
        public static EaseInSine(t:number):number {
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
        public static EaseOutSine(t:number):number {
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
        public static EaseInOutSine(t:number):number {
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
        public static EaseOutInSine(t:number):number {
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
        public static EaseInQuad(t:number):number {
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
        public static EaseOutQuad(t:number):number {
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
        public static EaseInOutQuad(t:number):number {
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
        public static EaseOutInQuad(t:number):number {
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
        public static EaseInCubic(t:number):number {
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
        public static EaseOutCubic(t:number):number {
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
        public static EaseInOutCubic(t:number):number {
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
        public static EaseOutInCubic(t:number):number {
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
        public static EaseInQuart(t:number):number {
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
        public static EaseOutQuart(t:number):number {
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
        public static EaseInOutQuart(t:number):number {
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
        public static EaseOutInQuart(t:number):number {
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
        public static EaseInQuint(t:number):number {
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
        public static EaseOutQuint(t:number):number {
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
        public static EaseInOutQuint(t:number):number {
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
        public static EaseOutInQuint(t:number):number {
            return (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * 16 + 0.5;
        }

        ///**
        // * @language en_US
        // * x to the 6 power curve fade in.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的 6 次方曲线淡入。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseInExpo(t:number):number {
        //    return t * t * t * t * t * t;
        //}
        //
        ///**
        // * @language en_US
        // * x to the 6 power curve fade out.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的 6 次方曲线淡出。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseOutExpo(t:number):number {
        //    return -(t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) + 1;
        //}
        //
        ///**
        // * @language en_US
        // * x to the 6 power curve fade in and fade out.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的 6 次方曲线淡入淡出。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseInOutExpo(t:number):number {
        //    if (t < 0.5) {
        //        return t * t * t * t * t * t * 32;
        //    }
        //    return -(t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) * (t - 1) * 32 + 1;
        //}
        //
        ///**
        // * @language en_US
        // * x to the 6 power curve fade out and fade in.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的 6 次方曲线淡出淡入。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseOutInExpo(t:number):number {
        //    if (t < 0.5) {
        //        return -(t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * 32 + 0.5;
        //    }
        //    return (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * (t - 0.5) * 32 + 0.5;
        //}

        ///**
        // * @language en_US
        // * x to the circle curve fade in.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的圆形曲线淡入。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseInCirc(t:number):number {
        //    return 1 - Math.sqrt((1 - t)*(1 - t));
        //}
        //
        ///**
        // * @language en_US
        // * x to the circle curve fade out.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的圆形曲线淡出。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseOutCirc(t:number):number {
        //    return -(t - 1) * (t - 1) + 1;
        //}
        //
        ///**
        // * @language en_US
        // * x to the circle curve fade in and fade out.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的圆形曲线淡入淡出。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseInOutCirc(t:number):number {
        //    if (t < 0.5) {
        //        return t * t * 2;
        //    }
        //    return -(t - 1) * (t - 1) * 2 + 1;
        //}
        //
        ///**
        // * @language en_US
        // * x to the circle curve fade out and fade in.
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        ///**
        // * @language zh_CN
        // * x 的圆形曲线淡出淡入。
        // * @version Lark 1.0
        // * @platform Web,Native
        // */
        //public static EaseOutInCirc(t:number):number {
        //    if (t < 0.5) {
        //        return -(t - 0.5) * (t - 0.5) * 2 + 0.5;
        //    }
        //    return (t - 0.5) * (t - 0.5) * 2 + 0.5;
        //}
    }


}