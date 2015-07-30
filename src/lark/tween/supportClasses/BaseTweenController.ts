module lark {

    export class BaseTweenController extends lark.LarkObject {

        public constructor(tween:Tween,attributes:Object) {
            super();
            this._tween = tween;
            this._attributes = attributes;
            this.keys = Object.keys(attributes);
        }

        _tween:Tween;

        public get tween():Tween {
            return this._tween;
        }

        /**
         * @private
         */
        protected keys:Array<string>;

        /**
         * @private
         */
        protected startAttributes:Object;

        /**
         * @private
         */
        protected _attributes:Object;

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
        public ready():void {
            var host = this._tween.host;
            var startAttributes = {};
            var keys = this.keys;
            var length = keys.length;
            for(var i  = 0; i < length; i++) {
                var key = keys[i];
                startAttributes[key] = host[key];
            }
            this.startAttributes = startAttributes;
        }

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
        public update(value:number):void
        {

        }
    }
}