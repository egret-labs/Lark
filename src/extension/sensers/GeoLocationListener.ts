

module lark {
    export class Position {
        timestamp: Date;
        coords: Coordinates;
    }

    export interface Coordinates {
        altitudeAccuracy: number;
        longitude: number;
        latitude: number;
        speed: number;
        heading: number;
        altitude: number;
        accuracy: number;
    }

    export class PositionError {
        code: number;
        message: string;
    }
    export interface PositionOptions {
        enableHighAccuracy?: boolean;
        timeout?: number;
        maximumAge?: number;
    }

    export class LocationEvent extends Event {
        constructor(type:string, location?: Position,error?:PositionError, bubbles?: boolean, cancelable?: boolean) {
            super("change", bubbles, cancelable);
            this.location = location;
            this.error = error;
        }
        public location: Position;
        public error: PositionError;
    }

    export interface GeoLocationListener extends EventEmitter {
        on(type: "change", listener: (event: LocationEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: "error", listener: (event: LocationEvent) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        on(type: string, listener: (event: Event) => void, thisObject: any, useCapture?: boolean, priority?: number): void;
        getLocation(callback: (position: lark.Position,error:PositionError) => void);
    }

    export var GeoLocationListener: { new (): GeoLocationListener };
}