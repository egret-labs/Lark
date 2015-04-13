

module demo {
    export class DomElementGenerator {
        public elements: HTMLElement[] = [];

        public generate(count: number,container:HTMLElement) {
            for (var i = 0; i < count; i++) {
                var element = this.createImage();
                this.elements.push(element);
                container.appendChild(element);
            }
        }

        public doTransform(element:any,scale:number,rotation:number) {
            var image = <HTMLImageElement>element;
            //image.style.transform = "rotate(" + rotation.toFixed(2) + "deg) scale(" + scale.toFixed(2) + ")";
            //translate(50px,100px);
            image.style['webkitTransform'] = "translate(" + (Math.sin(scale) * 100).toFixed(2) + "px," + (Math.sin(rotation) * 100).toFixed(2) + "px)";
        }

        private createImage() {
            var size = Math.random() * 150 + 20;
            var x = Math.random() * 320, y = Math.random() * 600;
            var image = new Image(size, size);
            image.src = Benchmark.ImageUrl;
            image.style.top = y + "px";
            image.style.left = x + "px";
            image.style.position = "absolute";
            image['scale'] = Math.random() + 0.5;
            image['rotate'] = Math.random() * 360;
            image['a'] = Math.random()*3.14;
            image['b'] = Math.random()*3.14;
            return image;
        }
    }

    document.addEventListener("readystatechange", e=> {
        if (document.readyState == "interactive")
        {
            demo.generator = new DomElementGenerator();
            demo.container = document.body;
        }
    });
}