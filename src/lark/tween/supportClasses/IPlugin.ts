module lark {

    export interface IPlugin {


        /**
         * @language en_US
         * Tween ready. Measurement start value of the property.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Tween 准备就绪。测量属性的开始值。
         * @version Lark 1.0
         * @platform Web,Native
         */
        init(tween:Tween, propertiesTo:Object, propertiesFrom:Object):Array<string>;

        /**
         * @language en_US
         * Renewal Movement content. We need to implement this method in a subclass.
         * @param value 当前运动的位置。
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 更新运动内容。需要在子类中实现该方法。
         * @param value 当前运动的位置。
         * @version Lark 1.0
         * @platform Web,Native
         */
        update(value:number):void;
    }
}