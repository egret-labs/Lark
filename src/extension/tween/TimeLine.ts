module lark {

    export class TimeLine extends lark.HashObject {

        constructor() {
            super();
        }

        private lastTime:number = -1;
        private _currentTime:number = 0;

        //获取总时间。
        public get totalTime():number {
            return this.getTotalTime();
        }

        private getTotalTime():number {
            if (this.invalidTotalTime == true) {
                return this._totalTime;
            }
            this.invalidTotalTime = true;
            var tweens = this.tweens;
            var endTime = 0;
            var time;
            for (var i = 0, len = tweens.length; i < len; i++) {
                time = tweens[i].startTime + tweens[i].time;
                if (time > endTime) {
                    endTime = time;
                }
            }
            this._totalTime = endTime*1000;
            return endTime;
        }

        private _totalTime:number = 0;
        private invalidTotalTime:boolean = true;

        $invalidateTotalTime():void {
            if (this.invalidTotalTime == false) {
                return;
            }
            this.invalidTotalTime = false;
        }

        private _loop:boolean = false;

        //是否循环播放
        public get loop():boolean {
            return this._loop;
        }

        public set loop(value:boolean) {
            this._loop = value;
        }

        private _isPlaying:boolean = false;

        public get isPlaying():boolean {
            return this._isPlaying;
        }

        private update(timeStamp:number):boolean {
            var totalTime = this.getTotalTime();
            var lastTime = this._currentTime;
            this._currentTime += timeStamp - this.lastTime;
            var currentTime = -1;
            var loopTime = 0;
            if (this._currentTime >= totalTime) {
                currentTime = this._currentTime % totalTime;
                loopTime = Math.floor(this._currentTime / totalTime);
                if (!this._loop) {
                    this.$setPlaying(false);
                }
            }
            while (loopTime > -1) {
                if (loopTime && currentTime != -1) {
                    this._currentTime = totalTime;
                }
                var calls = this.calls;
                var call;
                for (i = 0, len = calls.length; i < len; i++) {
                    call = calls[i];
                    if (call.time > lastTime && call.time <= this._currentTime || (call.time == 0 && lastTime == 0 && this._currentTime)) {
                        call.callBack.apply(call.thisObj, call.args);
                    }
                }
                var tweens = this.tweens;
                var tween:Tween;
                for (var i = 0, len = tweens.length; i < len; i++) {
                    tween = tweens[i];
                    if (tween.$startTime + tween.$time > lastTime && tween.$startTime <= this._currentTime || (tween.$startTime == 0 && lastTime == 0 && this._currentTime)) {
                        tween.$update(this._currentTime);
                    }
                }
                loopTime--;
                if (loopTime == 0) {
                    if (currentTime != -1) {
                        lastTime = 0;
                        this._currentTime = currentTime;
                    }
                } else {
                    if (loopTime) {
                        lastTime = 0;
                    }
                }
                if (this._loop == false) {
                    break;
                }
            }
            this.lastTime = timeStamp;
            return true;
        }

        //播放。时间轴默认是停止的。调用此方法可以开始播放，也可以在停止后调用此方法继续播放。
        public play():void {
            var now = lark.getTimer();
            this.$setPlaying(true, now);
        }

        //暂停播放。
        public stop():void {
            this.$setPlaying(false);
        }

        $setPlaying(value:boolean, time?:number):void {
            if (value) {
                this.lastTime = time;
            }
            if (this._isPlaying == value) {
                return;
            }
            this._isPlaying = value;
            if (value) {
                lark.startTick(this.update, this);
            } else {
                lark.stopTick(this.update, this);
            }
        }

        //跳到指定的帧并播放。
        public gotoAndPlay(time:number):void {
            if (!this.tweens.length) {
                return;
            }
            time = +time | 0;
            time = time < 0 ? 0 : time;
            if (time > this.totalTime) {
                time = this.totalTime;
            }
            this._currentTime = time;
            var now = lark.getTimer();
            this.$setPlaying(true, now);
        }

        //跳到指定的帧并停止。
        public gotoAndStop(time:number):void {
            if (!this.tweens.length) {
                return;
            }
            time = +time | 0;
            time = time < 0 ? 0 : time;
            if (time > this.totalTime) {
                time = this.totalTime;
            }
            this._currentTime = time;
            var now = lark.getTimer();
            this.$setPlaying(false);
        }

        private tweens:Tween[] = [];

        //添加Tween。
        public addTween(tween:Tween):Tween {
            this.tweens.push(tween);
            tween.$setTimeLine(this);
            this.$invalidateTotalTime();
            return tween;
        }

        //移除Tween。
        public removeTween(tween:Tween):void {
            var tweens = this.tweens;
            for (var i = 0, len = tweens.length; i < len; i++) {
                if (tweens[i] == tween) {
                    tweens.splice(i, 1)[0].$setTimeLine(null);
                    this.$invalidateTotalTime();
                    break;
                }
            }
            if (tweens.length == 0) {
                this.$setPlaying(false);
            }
        }

        private calls:Array<any> = [];

        //添加回调函数。
        public call(time:number, callBack:Function, thisObj?:any, ...args):void {
            this.calls.push({"time": time, "callBack": callBack, "thisObj": thisObj, "args": args});
        }
    }
}