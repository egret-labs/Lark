module lark {

    /**
     * @private
     */
    var easeCache = {};

    /**
     * @language en_US
     * The tween.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 缓动类。
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class Tween extends lark.EventEmitter {

        /**
         * @language en_US
         * Constructor.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 构造函数。
         * @param target 要变换的属性
         * @version Lark 1.0
         * @platform Web,Native
         */
        public constructor(target:any, time:number, propertiesTo:Object, ease?:string, propertiesFrom?:Object) {
            super();
            time = +time;
            if (time < 0) {
                time = 0;
            }
            this.$time = time;
            this._target = target;
            this._propertiesTo = propertiesTo;
            this._propertiesFrom = propertiesFrom;
            this.ease = ease;
            if (!this._ease) {
                this.ease = Ease.NONE;
            }
            var timeLine = new lark.TimeLine();
            timeLine.addTween(this);
            timeLine.play();
        }

        private invalidProperty:boolean = false;

        /**
         * @private
         */
        private _propertiesTo:Object;

        public set propertiesTo(value:Object) {
            this._propertiesTo = value;
            this.invalidProperty = false;
        }

        private _propertiesFrom:Object;

        public set propertiesFrom(value:Object) {
            this._propertiesFrom = value;
            this.invalidProperty = false;
        }

        /**
         * @private
         */
        $time:number;


        /**
         * @language en_US
         * The total transformation time.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 总的变换时间。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get time():number {
            return this.$time*1000;
        }

        public set time(value:number) {
            value = +value | 0;
            this.$time = (+value)/1000;
            if (this._timeLine) {
                this._timeLine.$invalidateTotalTime();
            }
        }

        /**
         * @private
         */
        $startTime:number = 0;

        public get startTime():number {
            return this.$startTime*1000;
        }

        public set startTime(value:number) {
            value = +value | 0;
            if (value < 0) {
                value = 0;
            }
            this.$startTime = value/1000;
            if (this._timeLine) {
                this._timeLine.$invalidateTotalTime();
            }
            this.invalidProperty = false;
        }

        /**
         * @private
         */
        _currentTime:number = 0;

        /**
         * @private
         */
        _target:any;

        /**
         * @language en_US
         * The object to transform.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要变换的对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get target():any {
            return this._target;
        }

        public set target(value:any) {
            this._target = value;
            this.invalidProperty = false;
        }

        /**
         * @private
         */
        _ease:string;

        /**
         * @private
         */
        _easeData:Object;

        /**
         * @language en_US
         * The type of ease.
         * @see lark.Ease
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 缓动类型。
         * @see lark.Ease
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get ease():string {
            return this._ease;
        }

        public set ease(val:string) {
            if (!easeCache[val]) {
                var func = EaseFunction[val];
                if (func == null) {
                    /**
                     * to do
                     * warn can't find the ease function
                     */
                    return;
                }
                var cache = [];
                for (var i = 0; i <= 2000; i++) {
                    cache[i] = func(i / 2000);
                }
                easeCache[val] = cache;
            }
            this._ease = val;
            this._easeData = easeCache[val];
        }

        /**
         * @private
         */
        private _timeLine:TimeLine;

        public get timeLine():TimeLine {
            if (!this._timeLine) {
                this._timeLine = new lark.TimeLine();
                this._timeLine.addTween(this);
            }
            return this._timeLine;
        }

        /**
         * @private
         */
        $setTimeLine(value:TimeLine) {
            if (this._timeLine) {
                this._timeLine.removeTween(this);
            }
            this._timeLine = value;
        }

        /**
         * @private
         */
        pugins:IPlugin[] = [];

        /**
         * @private
         */
        private initParmas():void {
            var controller:IPlugin;
            var params = this._propertiesTo;
            var allPlugins = Tween.plugins;
            if (params) {
                var keys = Object.keys(allPlugins);
                for (var i = 0, len = keys.length; i < len; i++) {
                    if (keys[i] in params) {
                        controller = new allPlugins[keys[i]];
                        controller.init(this, params, this._propertiesFrom);
                        this.pugins.push(controller);
                    }
                }
                keys = Object.keys(params);
                for (i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (typeof (key) != "string") {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                    var attribute = params[key];
                    if (typeof (attribute) != "number" || !(key in this._target)) {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                }
                if (keys.length) {
                    controller = new BasicPlugin();
                    controller.init(this, params, this._propertiesFrom);
                    this.pugins.push(controller);
                }
            }
            this.invalidProperty = true;
        }

        /**
         * @private
         */
        _complete:Function;

        /**
         * @private
         */
        _completeThis:any;

        /**
         * @private
         */
        _completeParams:any;


        /**
         * @language en_US
         * Tween end callback function.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Tween 结束回调函数。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public call(callBack:Function, thisObj?:any, ...args):Tween {
            this._complete = callBack;
            this._completeThis = thisObj;
            this._completeParams = args;
            return this;
        }

        /**
         * @private
         */
        _update:Function;

        /**
         * @private
         */
        _updateThis:any;

        /**
         * @private
         */
        _updateParams:any;

        public update(callBack:Function, thisObj?:any, ...args):Tween {
            this._update = callBack;
            this._updateThis = thisObj;
            this._updateParams = args;
            return this;
        }

        /**
         * @private
         * @param time
         * @returns {boolean}
         */
        $update(time:number):boolean {
            if (!this.invalidProperty) {
                this.initParmas();
            }
            this._currentTime = time - this.$startTime;
            if (this._currentTime > this.$time) {
                this._currentTime = this.$time;
            }
            var length = this.pugins.length;
            var s = this._easeData[2000 * (this._currentTime / this.$time) | 0];
            for (var i = 0; i < length; i++) {
                this.pugins[i].update(s);
            }
            if (this._update != null) {
                this._update.apply(this._updateThis, this._updateParams);
            }
            if (this._currentTime == this.$time) {
                if (this._complete != null) {
                    this._complete.apply(this._completeThis, this._completeParams);
                }
            }
            return true;
        }

        private _autoRelease:boolean = true;
        //public

        public release():void {
            Tween.tweens.push(this);
        }

        private static tweens:Tween[] = [];

        /**
         * @language en_US
         * Create a Tween object.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 创建一个 Tween 对象。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static to(target:any, time:number, propertiesTo:Object, ease?:string, propertiesFrom?:Object):Tween {
            return new Tween(target, time, propertiesTo, ease, propertiesFrom);
        }

        /**
         * @private
         */
        private static plugins = {};

        /**
         * @language en_US
         * Register a Tween parameter parser.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 注册一个 Tween 参数解析器。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public static registerPlugin(paramName:string, plugin:any):void {
            Tween.plugins[paramName] = plugin;
        }
    }
}