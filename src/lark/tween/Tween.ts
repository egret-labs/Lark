module lark {

    /**
     * @private
     */
    var initTweenFlag = true;

    export class Tween extends lark.EventEmitter {

        public constructor(time:number, host?:any, params?:Object) {
            super();
            time = +time;
            this._time = time;
            this._host = host;
            if (time <= 0) return;
            var controller:BaseTweenController;
            if (params) {
                var ease = params["ease"];
                if(ease) {
                    if(typeof ease == "string") {
                        this._ease = EasyFactory.getEase(ease);
                    } else if(lark.is(ease,"lark.IEase")) {
                        this._ease = ease;
                    }
                }

                if (host) {
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
                        controller = new BasicTweenController(this, params);
                        if(initTweenFlag) {
                            controller.ready();
                        }
                        this._controllers.push(controller);
                    }
                }
            }
            if (!this._ease) {
                this._ease = EasyFactory.getEase(Ease.None);
            }
            if(initTweenFlag) {
                this._startTime = lark.getTimer();
                this._isPlaying = true;
            } else {
                this._isPlaying = false;
            }
            lark.startTick(this.update, this);
        }

        _time:number;

        public get time():number {
            return this._time;
        }

        _startTime:number = -1;

        _currentTime:number = 0;

        public get currentTime():number {
            return this._currentTime;
        }

        _host:any;

        public get host():void {
            return this._host;
        }

        _ease:IEase;

        public get ease():IEase {
            return this._ease;
        }

        _nextTween:Tween;

        public get nextTween():Tween {
            return this._nextTween;
        }

        public set nextTween(tween:Tween) {
            this._nextTween = tween;
        }

        _controllers:BaseTweenController[] = [];

        public get controllerLength():number {
            return this._controllers.length;
        }

        public getControllerAt(index:number):BaseTweenController {
            index = +index | 0;
            if (index < 0 || index >= this._controllers.length) {
                return null;
            }
            return this._controllers[index];
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
        public set controllers(vals:BaseTweenController[]) {
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
            var s = this.ease.update(this._currentTime/this._time);
            for(var i = 0; i < length; i++) {
                this._controllers[i].update(s);
            }
            if(this.hasListener(lark.Event.CHANGE)) {
                this.emitWith(lark.Event.CHANGE,false);
            }
            if (this._currentTime == this._time) {
                lark.stopTick(this.update, this);
                if(this.hasListener(lark.Event.COMPLETE)) {
                    this.emitWith(lark.Event.COMPLETE,false);
                }
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
        public concatTweenTo(time:number, object?:any, params?:Object):Tween {
            initTweenFlag = false;
            var tween = new Tween(time, object, params);
            initTweenFlag = true;
            return this.concatTween(tween);
        }

        public static to(time:number, object?:any, params?:Object):Tween {
            initTweenFlag = true;
            var tween = new Tween(time, object, params);
            return tween;
        }
    }
}