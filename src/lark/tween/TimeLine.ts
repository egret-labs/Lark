module lark {

    export class TimeLine extends lark.HashObject {

        constructor() {
            super();
        }

        private lastTime:number = -1;
        private _currentTime:number = 0;

        //获取当前时间
        public get currentTime():number {
            return this._currentTime;
        }

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
            this._totalTime = endTime;
        }

        private _totalTime:number = 0;
        private invalidTotalTime:boolean = true;

        $invalidateTotalTime():void {
            if (this.invalidTotalTime == false) {
                return;
            }
            this.invalidTotalTime = false;
        }

        private _loop:number = 1;

        //是否循环播放
        public get loop():number {
            return this._loop;
        }

        public set loop(value:number) {
            this._loop = value;
        }

        private _isPlaying:boolean = false;

        public get isPlaying():boolean {
            return this._isPlaying;
        }

        private update(timeStamp:number):boolean {
            var totalTime = this.getTotalTime();
            this._currentTime += timeStamp - this.lastTime;
            this.lastTime = timeStamp;

            if (this._currentTime >= totalTime) {
                this._currentTime = totalTime;
                this._loop--;
                if (!this._loop) {
                    this.setPlaying(false);
                }
            }

            var tweens = this.tweens;
            var tween:Tween;
            var calls = this.calls;
            var call;

            for (var i = 0, len = tweens.length; i < len; i++) {
                tween = tweens[i];
                if (tween.$startTime <= this._currentTime || tween.$startTime + tween.$time >= this.lastTime && tween.$startTime + tween.$time < this.currentTime) {
                    tweens[i].$update(this._currentTime);
                }
            }
            for (i = calls.length, len = calls.length; i < len; i++) {
                call = calls[i];
                if (call.time >= this.lastTime && call.time <= this._currentTime) {
                    call.callBack.apply(call.thisObj, call.args);
                }
            }

            if (this._currentTime == totalTime && this._loop) {
                this._currentTime = 0;
            }
            return true;
        }

        //播放。时间轴默认是停止的。调用此方法可以开始播放，也可以在停止后调用此方法继续播放。
        public play():void {
            var now = lark.getTimer();
            this.setPlaying(true, now);
            this.update(now);
        }

        //暂停播放。
        public stop():void {
            this.setPlaying(false);
        }

        private setPlaying(value:boolean, time?:number):void {
            if (this._isPlaying == value) {
                return;
            }
            this._isPlaying = value;
            if (value) {
                lark.startTick(this.update, this);
                this.lastTime = time;
                //var tweens = this.tweens;
                //for (var i = 0, len = tweens.length; i < len; i++) {
                //    if (tweens[i].$initFlag == false) {
                //        tweens[i].start();
                //    }
                //}
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
            this.setPlaying(true, now);
            this.update(now);
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
            this.setPlaying(false);
            this.update(now);
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
        }

        private calls:Array<any> = [];

        //添加回调函数。
        public call(time:number, callBack:Function, thisObj?:any, ...args):void {
            this.calls.push({"time": time, "callBack": callBack, "thisObj": thisObj, "args": args});
        }
    }
}