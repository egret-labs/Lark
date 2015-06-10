
module lark.web {
    /**
     * @private
     */
    export class WebLocator extends EventEmitter implements Locator {
        /**
         * @private
         */
        private geolocation: Geolocation;
        /**
         * @private
         */
        private watchId: number;
        /**
         * @private
         */
        constructor(option?: PositionOptions) {
            super();
            this.geolocation = navigator.geolocation;
        }

        /**
         * @private
         * 
         */
        public start() {
            var geo = this.geolocation;
            if (geo)
                this.watchId = geo.watchPosition(this.onUpdate, this.onError);
            else
                this.onError({
                    code: 2,
                    message: lark.tr(3101),
                    PERMISSION_DENIED: 1,
                    POSITION_UNAVAILABLE:2
                });
        }

        /**
         * @private
         * 
         */
        public stop() {
            var geo = this.geolocation;
            geo.clearWatch(this.watchId);
        }

        /**
         * @private
         */
        private onUpdate = (position: Position) => {
            var event = new LocatorEvent(Event.CHANGE);
            var coords = position.coords;
            event.altitude = coords.altitude;
            event.heading = coords.heading;
            event.accuracy  = coords.accuracy;
            event.latitude = coords.latitude;
            event.longitude = coords.longitude;
            event.speed = coords.speed;
            event.altitudeAccuracy = coords.altitudeAccuracy;
            this.emit(event);
        };

        /**
         * @private
         */
        private onError = (error: { code: number; message: string; PERMISSION_DENIED:number } ) => {

            var errorType = LocatorEvent.UNAVAILABLE;
            if (error.code == error.PERMISSION_DENIED)
                errorType = LocatorEvent.PERMISSION_DENIED;

            var event = new LocatorEvent(Event.IO_ERROR);
            event.errorType = errorType;
            event.errorMessage = error.message;
            this.emit(event);
        };
    }
    lark.Locator = lark.web.WebLocator;
}
