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
    export class EaseInSine implements IEase {

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public type = Ease.EaseInSine;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update (t:number):number
        {
            return Math.sin((t-1)*Math.PI/2) + 1;
        }
    }

    //注册Ease类型
    EasyFactory.registerEase(Ease.EaseInSine,EaseInSine);
}