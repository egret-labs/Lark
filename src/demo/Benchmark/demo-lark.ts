

module demo {
    var texture: lark.Texture;
    lark.loadImage(demo.Benchmark.ImageUrl, t=> texture = t); 
    export class LarkElementGenerator {
        public elements: lark.Bitmap[] = [];

        public generate(count: number, container: lark.DisplayObjectContainer) {
            for (var i = 0; i < count; i++) {
                var element = this.createImage();
                this.elements.push(element);
                container.addChild(element);
            }
        }

        public doTransform(element: any, a: number, b: number) {
            //var image = <HTMLImageElement>element;
            //image.style.transform = "rotate(" + rotation.toFixed(2) + "deg) scale(" + scale.toFixed(2) + ")";
            //translate(50px,100px);
            //image.style.webkitTransform = "translate(" + (Math.sin(scale) * 100).toFixed(2) + "px," + (Math.sin(rotation) * 100).toFixed(2) + "px)";

            var bitmap = <lark.Bitmap>element;
            bitmap.x = Math.sin(a) * 100 + bitmap['__x'];
            bitmap.y = Math.sin(b) * 100 + bitmap['__y'];
        }

        private createImage() {
            var size = Math.random() * 300 + 20;
            var x = Math.random() * 320, y = Math.random() * 600;

            var image = new lark.Bitmap(texture);
            //image.style.top = y + "px";
            //image.style.left = x + "px";
            //image.style.position = "absolute";
            //image['scale'] = Math.random() + 0.5;
            //image['rotate'] = Math.random() * 360;
            //image['a'] = Math.random() * 3.14;
            //image['b'] = Math.random() * 3.14;
            image.x = x;
            image.y = y;

            image["__x"] = x;
            image["__y"] = y;
            image.scaleX = image.scaleY = Math.random() + 0.5;
            //image.rotation = Math.random() * 360;
            image['a'] = Math.random() * 3.14;
            image['b'] = Math.random() * 3.14;
            return image;
        }
    }

    export class BenchmarkMain extends lark.DisplayObjectContainer{
        constructor() {
            super();
            this.on(lark.Event.ADDED_TO_STAGE, e=> container = this, this);
            this.on(lark.Event.ENTER_FRAME, e=> Benchmark.animate(), this);
        }
    }

    document.addEventListener("readystatechange", e=> {
        if (document.readyState == "interactive") {
            demo.generator = new LarkElementGenerator();
        }
    });
}