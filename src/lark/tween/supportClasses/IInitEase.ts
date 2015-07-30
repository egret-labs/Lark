module lark {

    /**
     * @language en_US
     * IInitEase differs from IEase that when a slow moving object is implementation of the interface when the object is removed from the pool EaseFactory EaseFactory init function will be called once the object.
     * @see lark.IEase
     * @see lark.EaseFactory
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * IInitEase 与 IEase 不同之处在于，当一个实现该接口的缓动对象从 EaseFactory 对象池取出时 EaseFactory 会调用一次该对象的 init 函数。
     * @see lark.IEase
     * @see lark.EaseFactory
     * @version Lark 1.0
     * @platform Web,Native
     */
    export interface IInitEase extends IEase {

        init();
    }
}