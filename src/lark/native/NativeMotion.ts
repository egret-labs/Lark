
interface Navigator {
    accelerometer:any;
}

module lark.native {
    export class NativeMotion extends EventEmitter implements Motion {
        private watchId: number;

        start():void {
            this.watchId = navigator.accelerometer.watchAcceleration(this.onUpdate, this.onError);
        }

        stop():void {
            navigator.accelerometer.clearWatch(this.watchId);
        }

        /**
         * @private
         */
        protected onUpdate = (e: any) => {
            var event = new MotionEvent(Event.CHANGE);
            var acceleration: lark.DeviceAcceleration = {
                x: e.acceleration.x,
                y: e.acceleration.y,
                z: e.acceleration.z
            };
            var accelerationIncludingGravity: lark.DeviceAcceleration = {
                x: e.accelerationIncludingGravity.x,
                y: e.accelerationIncludingGravity.y,
                z: e.accelerationIncludingGravity.z
            };
            var rotation: lark.DeviceRotationRate = {
                alpha: e.rotationRate.alpha,
                beta: e.rotationRate.beta,
                gamma: e.rotationRate.gamma
            };
            event.acceleration = acceleration;
            event.accelerationIncludingGravity = accelerationIncludingGravity;
            event.rotationRate = rotation;
            this.emit(event);
        }

        private onError = (error: any) => {
            var errorType = ErrorEvent.UNAVAILABLE;
            if (error.code == error.PERMISSION_DENIED) {
                errorType = ErrorEvent.PERMISSION_DENIED;
            }

            var event = new ErrorEvent(Event.IO_ERROR);
            event.errorType = errorType;
            event.errorMessage = error.message;
            this.emit(event);
        }

    }
}
if (NATIVE) {
    lark.Motion = lark.native.NativeMotion;
}