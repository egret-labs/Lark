module lark {

    export class TweenPhysicMove extends HashObject implements IPlugin {

        constructor() {
            super();
        }

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public init(tween:Tween, propertiesTo:Object, propertiesFrom:Object):string[] {
            this.tween = tween;
            var useAttributes = ["physicMove"];
            var target = tween.target;
            var startX = target.x;
            var startY = target.y;
            if (propertiesFrom) {
                if ("x" in propertiesFrom) {
                    startX = +propertiesFrom["x"];
                }
                if ("y" in propertiesFrom) {
                    startY = +propertiesFrom["y"];
                }
            }
            this.startX = startX;
            this.startY = startY;
            var endX = startX;
            var endY = startY;
            if ("x" in propertiesTo) {
                endX = propertiesTo["x"];
                useAttributes.push("x");
            }
            if ("y" in propertiesTo) {
                endY = propertiesTo["y"];
                useAttributes.push("y");
            }
            var vx = 0;
            var vy = 0;
            if ("vx" in propertiesTo) {
                vx = propertiesTo["vx"];
                useAttributes.push("vx");
            }
            if ("vy" in propertiesTo) {
                vy = propertiesTo["vy"];
                useAttributes.push("vy");
            }
            this.vx = vx;
            this.vy = vy;
            var t = tween.time;
            this.ax = (endX - startX - vx*t)*2/(t*t);
            this.ay = (endY - startY - vy*t)*2/(t*t);
            this.time = t;
            return useAttributes;
        }

        private tween:Tween;
        private startX:number;
        private vx:number;
        private ax:number;
        private startY:number;
        private vy:number;
        private ay:number;
        private time:number;

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update(value:number):void {
            var target = this.tween.target;
            var t = this.time*value;
            target.x = this.startX + this.vx*t + .5*this.ax*t*t + this.startX;
            var lastY = target.y;
            target.y = this.startY + this.vy*t + .5*this.ay*t*t + this.startY;
            console.log(target.y,value,target.y - lastY);
        }

        public static freeFallTo(target:any, time:number, groundY:number):Tween {
            return new Tween(target, time, {"y": groundY, "physicMove": true});
        }
    }

    Tween.registerPlugin("physicMove", lark.TweenPhysicMove);
}