module lark {

    /**
     * @private
     */
    var initTweenFlag = true;

    /**
     * @language en_US
     * The tween.
     * @see lark.Tween
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * 缓动类。
     * @see lark.Tween
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class Tween extends lark.EventEmitter {

        public constructor(host:any, time:number, params?:Object, ease?:Function) {
            super();
            time = +time;
            this._time = time;
            this._host = host;
            if (time <= 0) return;
            var controller:BaseTransformation;
            if (params) {

                this._ease = ease;

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
                    if (typeof (attribute) != "number" || !(key in host)) {
                        delete params[key];
                        keys.splice(i, 1);
                        i--;
                        continue;
                    }
                }
                if (keys.length) {
                    controller = new BasicTransformation(this, params);
                    if(initTweenFlag) {
                        controller.ready();
                    }
                    this._controllers.push(controller);
                }
            }
            if (!this._ease) {
                this._ease = Ease.None;
            }
            if(initTweenFlag) {
                this._startTime = lark.getTimer();
                this._isPlaying = true;
            } else {
                this._isPlaying = false;
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
        _host:any;

        /**
         * @language en_US
         * The object to transform.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 要变换的对象。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get host():void {
            return this._host;
        }

        /**
         * @private
         */
        _ease:Function;

        public get ease():Function {
            return this._ease;
        }

        public set ease(val:Function) {
            this._ease = val;
        }

        /**
         * @private
         */
        _nextTween:Tween;

        public get nextTween():Tween {
            return this._nextTween;
        }

        public set nextTween(tween:Tween) {
            this._nextTween = tween;
        }

        /**
         * @private
         */
        _controllers:BaseTransformation[] = [];

        /**
         * @language en_US
         * Getting the number of transformation properties.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取变换属性的个数。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public get controllerLength():number {
            return this._controllers.length;
        }


        /**
         * @language en_US
         * Getting transformation properties.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取变换属性。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public getControllerAt(index:number):BaseTransformation {
            index = +index | 0;
            if (index < 0 || index >= this._controllers.length) {
                return null;
            }
            return this._controllers[index];
        }

        /**
         * @language en_US
         * Setting transformation properties.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设置变换属性。
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        public set controllers(vals:BaseTransformation[]) {
            if (this._controllers) {
                return;
            }
            this._controllers = vals;
        }

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
            if(this._startTime) {
                var length = this._controllers.length;
                for(var i = 0; i < length; i++) {
                    this._controllers[i].ready();
                }
            }
            this._startTime = time;
            this._isPlaying = true;
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


        public call(callBack:Function,thisObj?:any,params?:any):Tween {
            this._complete = callBack;
            this._completeThis = thisObj;
            this._completeParams = params;
            return this;
        }

        /**
         * @language en_US
         * Completely stop the current Tween. And recycling of cyberspace.
         * @see lark.Tween
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 完全停止当前 Tween。并回收资源。
         * @see lark.Tween
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
            var length = this._controllers.length;
            var s = this.ease(this._currentTime/this._time);
            for(var i = 0; i < length; i++) {
                this._controllers[i].update(s);
            }
            //if(this.hasListener(lark.Event.CHANGE)) {
            //    this.emitWith(lark.Event.CHANGE,false);
            //}
            if (this._currentTime == this._time) {
                lark.stopTick(this.update, this);
                //if(this.hasListener(lark.Event.COMPLETE)) {
                //    this.emitWith(lark.Event.COMPLETE,false);
                //}
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
        public to(object:any, time:number, params?:Object, ease?:any):Tween {
            initTweenFlag = false;
            var tween = new Tween(object, time, params, ease);
            initTweenFlag = true;
            return this.concatTween(tween);
        }

        _waitTime:number = 0;

        public wait(time:number):Tween {
            time = +time;
            this._waitTime = time;
            return this;
        }

        public static get(object:any, time:number, params?:Object, ease?:any):Tween {
            initTweenFlag = true;
            var tween = new Tween(object, time, params, ease);
            return tween;
        }
    }
}