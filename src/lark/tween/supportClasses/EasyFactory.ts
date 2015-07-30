module lark {

    /**
     * @private
     */
    var easePool:Object = {};
    var easeClazz:Object = {};

    /**
     * @language en_US
     * Easing object factory. Rational use of factory methods to create a number of saves easing object.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 缓动对象工厂。合理利用工厂里的方法可以节省创建缓动对象的次数。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class EasyFactory {

        /**
         * @language en_US
         * Take a specified type of easing object from the pool. This type of object if the object does not re-create a pool.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 从对象池里取一个指定类型的缓动对象。如果对象池没有该类型的对象会重新创建一个。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static getEase(type:string):IEase {
            var ease:IEase;
            if(!easePool[type] || !easePool[type].length) {
                ease = EasyFactory.createEase(type);
            }
            else {
                ease = easePool[type].pop();
                if(lark.is(ease,"lark.IInitEase")) {
                    (<IInitEase>ease).init();
                }
            }
            return ease;
        }

        /**
         * @private
         */
        private static createEase(type:string):IEase {
            if(easeClazz[type]) return new easeClazz[type]();
            if(DEBUG) {
                //提示warn，未找到对应的ease类
            }
            return null;
        }

        /**
         * @language en_US
         * The release of a slow moving object.It will be automatically added to easing the object pool.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 释放一个缓动对象。会自动加入到缓动对象池中。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static releaseEase(ease:IEase):void {
            if(!easePool[ease.type]) {
                easePool[ease.type] = [];
            }
            easePool[ease.type].push(ease);
        }

        /**
         * @language en_US
         * Register a type of easing. Ease property so that the use Tween.to when params parameter can be the type of easing , And the program will automatically move to obtain relief from the object pool. For example Tween.to (2, txt, {x: 200, ease: Ease.none}).
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 注册一个缓动类型。这样在使用 Tween.to 的时候 params 参数的 ease 属性可以只指定缓动类型，同时程序会自动从对象池中获取缓动。例如 Tween.to(2,txt,{x:200,ease:Ease.none})。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static registerEase(type:string,clazz:any):void {
            if(easeClazz[type]) {
                if(DEBUG) {
                    //提示已注册的ease类型
                }
                return;
            }
            easeClazz[type] = clazz;
        }
    }
}