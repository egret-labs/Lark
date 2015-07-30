module lark {

    /**
     * @language en_US
     * sine curve.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * sin 曲线。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class EaseOutSine implements IEase {

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public type = Ease.EaseOutSine;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update (t:number):number
        {
            return Math.sin(t*Math.PI/2);
        }
    }

    //注册Ease类型
    EasyFactory.registerEase(Ease.EaseOutSine,EaseOutSine);
}