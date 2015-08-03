module lark {

    /**
     * @private
     */
    var initTweenFlag = true;

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
        public constructor(target:any, time:number, params:Object, ease?:string) {
            super();
            time = +time;
            this._time = time;
            this._target = target;
            if (time <= 0) return;
            this.params = params;
            this.ease = ease;
            if (!this._ease) {
                this.ease = Ease.None;
            }
            if(initTweenFlag) {
                this._startTime = lark.getTimer();
                this._isPlaying = true;
                this.initParmas();
            } else {
                this._isPlaying = false;
            }
        }

        /**
         * @private
         */
        private params:Object;

        /**
         * @private
         */
        private initParmas():void {
            var controller:IPlugin;
            var params = this.params;
            if (params) {
                var keys = Object.keys(params);
                for (var i = 0; i < keys.length; i++) {
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
                    controller.init(this, params);
                    this._pugins.push(controller);
                }
            }
            lark.startTick(this.update, this);
        }

        /**
         * @private
         */
        _time:number;


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
            return this._time;
        }

        /**
         * @private
         */
        _startTime:number = -1;

        /**
         * @private
         */
        _currentTime:number = 0;

        /**
         * @language en_US
         * The current transformation time.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前的变换时间。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get currentTime():number {
            return this._currentTime;
        }

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
        public get target():void {
            return this._target;
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
            if(!easeCache[val]) {
                var func = EaseFunction[val];
                if(func == null) {
                    //warn
                    return;
                }
                var cache = [];
                for(var i = 0; i <= 1000; i++) {
                    cache[i] = func(i/1000);
                }
                easeCache[val] = cache;
            }
            this._ease = val;
            this._easeData = easeCache[val];
        }

        /**
         * @private
         */
        _nextTween:Tween;

        /**
         * @language en_US
         * The next tween.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 下一个Tween。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get nextTween():Tween {
            return this._nextTween;
        }

        public set nextTween(tween:Tween) {
            this._nextTween = tween;
        }

        /**
         * @private
         */
        _pugins:IPlugin[] = [];

        /**
         * @language en_US
         * Pauses the current Tween.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 暂停当前 Tween。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public pause():void {
            this._isPlaying = false;
        }

        /**
         * @private
         */
        private _isPlaying:boolean;

        /**
         * @language en_US
         * The tween is playing or not.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前 Tween 是否正则播放。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public isPlaying():boolean {
            return this._isPlaying;
        }

        /**
         * @language en_US
         * Plays the current Tween. If you pause before too, we will continue to play.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 播放当前 Tween。如果之前暂停过，会继续播放。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public play():void {
            this._isPlaying = true;
        }

        $initPlay(time:number):void {
            this._startTime = time;
            this._isPlaying = true;
            this.initParmas();
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
        public call(callBack:Function,thisObj?:any,params?:any):Tween {
            this._complete = callBack;
            this._completeThis = thisObj;
            this._completeParams = params;
            return this;
        }

        /**
         * @language en_US
         * Completely stop the current Tween. And recycling of cyberspace.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 完全停止当前 Tween。并回收资源。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public kill():void {
            this._isPlaying = false;
            lark.stopTick(this.update, this);
        }

        /**
         * @private
         */
        private _bePlay:boolean = false;

        /**
         * @private
         * @param time
         * @returns {boolean}
         */
        private update(time:number):boolean {
            if (this._isPlaying == false) {
                return true;
            }
            this._bePlay = true;
            this._currentTime = time - this._startTime;
            if (this._currentTime > this._time) {
                this._currentTime = this._time;
            }
            var length = this._pugins.length;
            var s = this._easeData[1000*(this._currentTime/this._time)|0];
            for(var i = 0; i < length; i++) {
                this._pugins[i].update(s);
            }
            if (this._currentTime == this._time) {
                lark.stopTick(this.update, this);
                if(this._complete != null) {
                    this._complete.apply(this._completeThis,this._completeParams);
                }
                if(this._waitTime) {
                    this._waitTime += lark.getTimer();
                    lark.startTick(this.waitEndTime,this);
                }
                else {
                    if (this._nextTween) {
                        this._nextTween.$initPlay(time);
                    }
                }
            }
            return true;
        }

        /**
         * @private
         */
        private waitEndTime(time:number):boolean {
            if(time > this._waitTime) {
                lark.stopTick(this.waitEndTime,this);
                if (this._nextTween) {
                    this._nextTween.$initPlay(time);
                }
            }
            return true;
        }

        /**
         * @private
         * @param tween
         * @returns {Tween}
         */
        private concatTween(tween:Tween):Tween {
            var lastTween = this;
            while (lastTween.nextTween) {
                lastTween = lastTween.nextTween;
            }
            lastTween.nextTween = tween;
            return tween;
        }

        /**
         * @language en_US
         * Link to a Tween. Tween from the current target will have been looking back, until it finds a Tween object is not set nextTween property, and is connected to the back of Tween.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 链接一个 Tween 。会从当前 Tween 对象一直往后找，直到发现一个 Tween 对象没有设置 nextTween 属性，并连到那个 Tween 后面。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public to(target:any, time:number, params?:Object, ease?:any):Tween {
            initTweenFlag = false;
            var tween = new Tween(target, time, params, ease);
            initTweenFlag = true;
            return this.concatTween(tween);
        }

        /**
         * @privbate
         */
        _waitTime:number = 0;

        /**
         * @language en_US
         * The time to wait before the next tween starts.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 在下一个动画开始前等待多少时间。
         * @version Lark 1.0
         * @platform Web,Native
         */
        public wait(time:number):Tween {
            time = +time;
            this._waitTime = time;
            return this;
        }

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
        public static get(target:any, time:number, params?:Object, ease?:any):Tween {
            initTweenFlag = true;
            var tween = new Tween(target, time, params, ease);
            return tween;
        }

        private static plugins = {};

        public static registerPlugin(paramName:string,plugin:IPlugin) {
            Tween.plugins[paramName] = plugin;
        }
    }
}