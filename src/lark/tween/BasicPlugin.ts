module lark {

    export class BasicPlugin extends lark.HashObject implements IPlugin {

        public constructor() {
            super();
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public init(tween:Tween, propertiesTo:Object, propertiesFrom:Object):Array<string> {
            this.tween = tween;
            this._attributes = propertiesTo;
            this.keys = Object.keys(propertiesTo);
            var target = tween.target;
            var startAttributes = {};
            var keys = this.keys;
            var length = keys.length;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                if (propertiesFrom && key in propertiesFrom) {
                    startAttributes[key] = propertiesFrom[key];
                }
                else {
                    startAttributes[key] = target[key];
                }
            }
            this.startAttributes = startAttributes;
            return null;
        }

        /**
         * @private
         */
        protected tween:Tween;

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
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update(value:number):void {
            var target = this.tween.target;
            var keys = this.keys;
            var length = keys.length;
            var startAttributes = this.startAttributes;
            for (var i = 0; i < length; i++) {
                var key = keys[i];
                target[key] = (this._attributes[key] - startAttributes[key]) * value + startAttributes[key];
            }
        }
    }
}