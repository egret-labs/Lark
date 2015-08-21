module lark {

    export class TweenPath extends HashObject implements IPlugin {

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
            var useAttributes = ["path"];
            var path:Point[] = propertiesTo["path"];
            var target = tween.target;
            var start:Point = Point.create(target.x, target.y);
            path.splice(0, 0, start);
            if (propertiesFrom) {
                if ("x" in propertiesFrom) {
                    start.x = +propertiesFrom["x"];
                }
                if ("y" in propertiesFrom) {
                    start.y = +propertiesFrom["y"];
                }
            }
            if ("x" in propertiesTo && "y" in propertiesTo) {
                useAttributes.push("x");
                useAttributes.push("y");
                path.push(Point.create(+propertiesTo["x"], +propertiesTo["y"]));
            }
            this.path = path;
            this.pathSum = [0];
            for (var i = 1, len = path.length; i < len; i++) {
                this.pathSum[i] = this.pathSum[i - 1] + Math.sqrt((path[i].x - path[i - 1].x) * (path[i].x - path[i - 1].x) + (path[i].y - path[i - 1].y) * (path[i].y - path[i - 1].y));
            }
            var sum = this.pathSum[len - 1];
            for (i = 1; i < len; i++) {
                this.pathSum[i] = this.pathSum[i] / sum;
            }
            return useAttributes;
        }

        private tween:Tween;
        private pathSum:number[];
        private path:Point[];

        /**
         * @inheritDoc
         * @version Lark 1.0
         * @platform Web,Native
         */
        public update(value:number):void {
            var path = this.path;
            var target = this.tween.target;
            var pathSum = this.pathSum;
            var i, len;
            for (i = 1, len = pathSum.length; i < len; i++) {
                if (value > pathSum[i - 1] && value <= pathSum[i]) {
                    break;
                }
            }
            if (value <= 0) {
                i = 1;
            }
            else if (value >= 1) {
                i = len - 1;
            }
            var value = (value - pathSum[i - 1]) / (pathSum[i] - pathSum[i - 1]);
            target.x = value * (path[i].x - path[i - 1].x) + path[i - 1].x;
            target.y = value * (path[i].y - path[i - 1].y) + path[i - 1].y;
        }

        public static to(target:any, time:number, path:Point[], ease?:string):Tween {
            return Tween.to(target, time, {"path": path}, ease);
        }

        public static vto(target:any, v:number, path:Point[], ease?:string):Tween {
            var sum = 0;
            for(var i = 1, len = path.length; i < len; i++) {
                sum += Math.sqrt((path[i].y -path[i-1].y)*(path[i].y -path[i-1].y) + (path[i].y -path[i-1].y)*(path[i].y -path[i-1].y));
            }
            var time = sum/v;
            return Tween.to(target, time, {"path": path}, ease);
        }
    }

    Tween.registerPlugin("path", lark.TweenPath);
}