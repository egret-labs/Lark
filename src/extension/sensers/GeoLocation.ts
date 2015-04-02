

module lark {
    export class GeoLocation extends EventEmitter {
        protected geolocation: Geolocation = null;
        constructor() {
            super();
            this.geolocation = navigator.geolocation;
        }

        public getLocation() {
            var geo = this.geolocation;
            geo.getCurrentPosition(position=> {
                console.log(position);
            }, error=> { });
        }
    }
}