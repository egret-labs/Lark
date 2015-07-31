module lark {

    export class BasicTransformation extends BaseTransformation {

        public constructor(tween:Tween,attributes:Object) {
            super(tween,attributes);
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update(value:number):void
        {
            var target = this._tween.target;
            var keys = this.keys;
            var length = keys.length;
            var startAttributes = this.startAttributes;
            for(var i = 0; i < length; i++) {
                var key = keys[i];
                target[key] = (this._attributes[key] - startAttributes[key])*value + startAttributes[key];
            }
        }
    }
}