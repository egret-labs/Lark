interface Navigator {
    compass:any;
}

module lark.native {
    export class NativeOrientation extends EventEmitter implements Orientation {
        private watchId: number;

        start():void {
            this.watchId = navigator.compass.watchHeading(this.onUpdate, this.onError);
        }

        stop():void {
            navigator.compass.clearWatch(this.watchId);
        }

        /**
         * @private
         */
        protected onUpdate = (e: any) => {
            var event = new OrientationEvent(Event.CHANGE);
            event.beta = e.beta;
            event.gamma = e.gamma;
            event.alpha = e.alpha;
            this.emit(event);
        }

        private onError = (error: any) => {
            var errorType = ErrorEvent.UNAVAILABLE;
            if (error.code == error.PERMISSION_DENIED)
                errorType = ErrorEvent.PERMISSION_DENIED;

            var event = new ErrorEvent(Event.IO_ERROR);
            event.errorType = errorType;
            event.errorMessage = error.message;
            this.emit(event);
        }

    }
}

if (NATIVE) {
    lark.Orientation = lark.native.NativeOrientation;
}