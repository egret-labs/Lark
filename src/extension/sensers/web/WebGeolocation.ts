
module lark {
    export class WebGeolocation extends EventEmitter implements Geolocation {
        muted:boolean;
        /*protected geolocation: NavigatorGeolocation;
        protected watchId: number;
        constructor(option?: PositionOptions) {
            super();
            this.geolocation = navigator.geolocation;
        }

        public getLocation(callback: (position: Position, error: PositionError) => void) {
            var geo = this.geolocation;

            //geo.getCurrentPosition(position=> callback(position, null), error=> callback(null, error));
        }

        public start() {
            var geo = this.geolocation;
            this.watchId = geo.watchPosition(this.onChange, this.onError, this.option);
        }

        public end() {
            var geo = this.geolocation;
            //geo.clearWatch(this.watchId);
        }

        private onChange(position:Position) {
            this.emit(new LocationEvent("change", position));
        }

        private onError(error: PositionError) {
            this.emit(new LocationEvent("error", null, error));
        }*/
    }
}

lark.Geolocation = lark.WebGeolocation;