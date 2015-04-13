module demo {
    export interface ElementGenerator {
        elements: any[];
        generate(count: number, container: any): void;
        doTransform(element: any, scale: number, rotation: number): void;
    }

    export var generator: ElementGenerator;
    export var container: any;

    export class Stats {
        public domElement: HTMLElement;
        private frames: number = 0;
        private start: number = Date.now();
        constructor() {
            var fps = document.createElement("span");
            fps.style.color = "#00CC22";
            fps.style.fontSize = "40px";
            fps.textContent = "0";
            this.domElement = fps;
        }
        begin() {
            this.frames++;
        }

        end() {
            if (this.frames >= 60) {
                var timespan = Date.now() - this.start;
                var fps = this.frames * 1000 / timespan;
                this.domElement.textContent = fps.toFixed(0);
                this.start = Date.now();
                this.frames = 0;
            }
        }
    }

    export class Benchmark {
        public static ImageUrl: string = "/image/egret.png";
        public static Run() {
            var btnAdd = document.getElementById("btnAdd");
            btnAdd.addEventListener("click", e=> {
                generator.generate(10, container);
                btnAdd.textContent = "Add 10 Elements, Total:" + generator.elements.length;
            });

            var btnDom = document.getElementById("btnDom");
            btnDom && btnDom.addEventListener("click", e=> {
                location.href = "dom.html";
            });

            var btnLark = document.getElementById("btnLark");
            btnLark && btnLark.addEventListener("click", e=> {
                location.href = "lark.html";
            });
        }

        public static animate() {
            Benchmark.updateElements();
        }

        public static updateElements() {
            generator.elements.forEach(el=> {
                el.a += 0.05;
                el.b += 0.05;
                generator.doTransform(el, el.a, el.b);
            });
        }
    }

    window.addEventListener("load", e=> Benchmark.Run());
}