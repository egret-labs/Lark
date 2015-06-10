

module lark {

    export interface Geolocation extends EventEmitter {
        muted:boolean;
    }

    export var Geolocation: { new (): Geolocation };


    export class GeolocationEvent extends Event {

        public static UPDATE:string = "update";
        constructor(type:string, bubbles?: boolean, cancelable?: boolean) {
            super("update", bubbles, cancelable);
        }

        longitude: number;
        latitude: number;
        speed: number;
        heading: number;
        altitude: number;
        horizontalAccuracy:number;
        verticalAccuracy:number;
    }
}