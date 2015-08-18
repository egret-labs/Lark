module lark {

    export class BasicPlugin implements IPlugin {

        public constructor() {
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public init(tween:Tween,params:Object):void {
            this._tween = tween;
            this._attributes = params;
            this.keys = Object.keys(params);

            var target = this._tween.target;
            var startAttributes = {};
            var keys = this.keys;
            var length = keys.length;
            for(var i  = 0; i < length; i++) {
                var key = keys[i];
                startAttributes[key] = target[key];
            }
            this.startAttributes = startAttributes;
        }

        /**
         * @private
         */
        _tween:Tween;

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