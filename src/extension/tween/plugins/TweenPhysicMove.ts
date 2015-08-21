module lark {

    export class TweenPhysicMove extends HashObject implements IPlugin {

        constructor() {
            super();
        }

        public init(tween:Tween, propertiesTo:Object, propertiesFrom:Object):string[] {
            this.tween = tween;
            var useAttributes = [];
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
            if ("x" in propertiesTo) {
            }
            return useAttributes;
        }

        private tween:Tween;
        private startX:number;
        private vx:number;
        private ax:number;
        private endX:number;
        private startY:number;
        private vy:number;
        private ay:number;
        private endY:number;

        public update(value:number):void {
            //var target = this.tween.target;
            //target.x = this.startX + this.vx*value + .5*this.vx;
            //target.y = value * (path[i].y - path[i - 1].y) + path[i - 1].y;
        }

        public static freeFallTo(target:any, time:number, groundY:number):Tween {
            return new Tween(target, time, {"y": groundY, "physicMove": {"fall": true}});
        }
    }

    Tween.registerPlugin("physicMove", lark.TweenPhysicMove);
}