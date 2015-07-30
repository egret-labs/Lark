module lark {


    /**
     * @language en_US
     * IEase definition is a continuous two-dimensional interval function, whose domain is [0,1], through (0,0) and (1,1) point.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * IEase 定义的是一个连续二维区间函数，它的定义域为 [0,1]，经过 (0,0) 点和 (1,1) 点。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export interface IEase {

        /**
         * @language en_US
         * Uniquely identifies the type of easing.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 缓动类型的唯一标识。
         * @version Lark 1.0
         * @platform Web,Native
         */
        type:string;

        /**
         * @language en_US
         * Get function value.
         * @param t Function arguments.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取函数值。
         * @param t 函数自变量。
         * @version Lark 1.0
         * @platform Web,Native
         */
        update (t:number):number;
    }
}