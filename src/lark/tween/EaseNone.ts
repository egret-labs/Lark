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
    export class EaseNone implements IEase {

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public type = Ease.None;

        public update (t:number):number
        {
            return t;
        }
    }

    //注册Ease类型
    EasyFactory.registerEase(Ease.None,EaseNone);
}