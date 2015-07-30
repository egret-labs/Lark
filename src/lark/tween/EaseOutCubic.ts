module lark {

    /**
     * @language en_US
     * Uniform easing, it is a function of a segment.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 匀速缓动，它的函数是一条线段。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class EaseOutCubic implements IEase {

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public type = Ease.EaseOutCubic;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update (t:number):number
        {
            return (t-1)*(t-1)*(t-1) + 1;
        }
    }

    //注册Ease类型
    EasyFactory.registerEase(Ease.EaseOutCubic,EaseOutCubic);
}