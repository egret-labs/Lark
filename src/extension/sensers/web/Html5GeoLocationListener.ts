

module lark {
    export class Html5GeoLocationListener extends EventEmitter implements GeoLocationListener {
        protected geolocation: Geolocation;
        protected option: PositionOptions;
        protected watchId: number;
        constructor(option?: PositionOptions) {
            super();
            var geo = navigator.geolocation;
            this.geolocation = navigator.geolocation;
            this.option = option;
        }

        public getLocation(callback: (position: lark.Position, error: PositionError) => void) {
            var geo = this.geolocation;
            geo.getCurrentPosition(position=> callback(position, null), error=> callback(null, error));
        }

        public start() {
            var geo = this.geolocation;
            this.watchId = geo.watchPosition(this.onChange, this.onError, this.option);
        }

        public end() {
            var geo = this.geolocation;
            geo.clearWatch(this.watchId);
        }

        private onChange(position:Position) {
            this.emit(new LocationEvent("change", position));
        }

        private onError(error: PositionError) {
            this.emit(new LocationEvent("error", null, error));
        }
    }
}

lark.GeoLocationListener = lark.Html5GeoLocationListener;
lark.PositionError = PositionError;
lark.Position = Position;