declare var wx;

module demo {
    
    export class MotionDemo extends lark.DisplayObjectContainer {
        constructor() {
            super();

            this.on(lark.Event.ADDED_TO_STAGE,() => {
                var btnTakePhoto = new lark.TextField("点击拍照", { bold: true, fontSize: 50, align: "center",color:0xFF0000 });
                btnTakePhoto.y = 100;
                btnTakePhoto.width = 300;
                btnTakePhoto.x = (this.stage.stageWidth - 300) / 2;
                btnTakePhoto.on(lark.TouchEvent.TOUCH_BEGIN, e=> {
                    var playground = new Playground("demo/weixin/image/face.jpg");
                    this.addChild(playground);
                    //wx.chooseImage({
                    //    success: res=> {

                    //    }
                    //})
                }, this);
                this.addChild(btnTakePhoto);
                //var playground = new Playground("demo/weixin/image/face.jpg");
                //this.addChild(playground);
            }, this);

        }
    }

    

    export class Playground extends lark.DisplayObjectContainer {
        private motionSeed = new lark.OrientationListener();
        private viewport = new Viewport();
        private message = new lark.TextField("", { fontSize: 12 });
        private vx = 0;
        private vy = 0;
        private background = new lark.Bitmap();
        private gift = new Gift();
        private player: lark.DisplayObject = new lark.Bitmap();
        private leftArrow = new lark.Bitmap();
        private rightArrow = new lark.Bitmap();
        constructor(faceUrl:string) {
            super();
            this.message.x = 10;
            this.message.y = 10;
            this.addChild(this.message);
            this.addChild(this.gift);
            this.leftArrow.visible = false;
            this.rightArrow.visible = false;
            this.addChild(this.leftArrow);
            this.addChild(this.rightArrow);
            this.addChild(lark.FPS.display);
            this.initListener();
            lark.loadImage("demo/weixin/image/background.jpg", t=> {
                this.background.texture = t;
                this.background.scaleY = 2;
                this.background.scaleX = 2;
                this.addChildAt(this.background, 0);
            });
            lark.loadImage("demo/weixin/image/arrowleft.png", t=> this.leftArrow.texture = t);
            lark.loadImage("demo/weixin/image/arrowright.png", t=> this.rightArrow.texture = t);

            Face.detect(faceUrl, t=> {
                this.player = new Player(t);
                this.addChild(this.player);
            });
        }



        private initListener() {
            this.motionSeed.on("change", this.onTilted, this);
            this.viewport.on("change", this.onViewportChanged, this);
            this.gift.on(lark.TouchEvent.TOUCH_BEGIN, this.gift.fall, this.gift);
            this.on(lark.Event.ENTER_FRAME, this.updateScene, this);
        }

        private updateScene() {
            var bg = this.background;
            var bgWidth = bg.width;
            var stageW = this.stage.stageWidth;
            var stageH = this.stage.stageHeight;
            var x = bg.x - this.vx;
            if (x > 0)
                x = stageW - bgWidth;
            else if (x < (stageW - bgWidth))
                x = 0;
            bg.x = x;


            var y = this.player.y;
            x = this.player.x;
            y+= this.vy;
            x += this.vx;

            if (x < 0)
                x = 0;
            if (x > (stageW - this.player.width))
                x = stageW - this.player.width;

            if (y < 0)
                y = 0;
            if (y > (stageH - this.player.height))
                y = stageH - this.player.height;
            this.player.x = x;
            this.player.y = y;

            var player = this.gift;
            this.leftArrow.visible = player.x < - player.width;
            this.rightArrow.visible = player.x > stageW;
            this.rightArrow.x = stageW - this.rightArrow.width;

        }
        initDeviceX = NaN;
        private onTilted(e: lark.OrientationEvent) {
            if (isNaN(this.initDeviceX))
                this.initDeviceX = e.x;
            var offset = Math.abs(e.y);
            this.vx = e.y;
            this.vy = e.x - this.initDeviceX;
            this.gift.vwx = e.y;

            var canvas = document.getElementById("lark-sample");
            canvas.style.transform = "rotate3d(" + (0 - e.x)+", 0, "+e.y+", 20deg)";
        }

        private onViewportChanged(e: lark.Event) {
            var view = this.viewport;
        }
    }

    class Viewport extends lark.EventEmitter {
        private _x: number = 0;
        private _y: number = 0;


        public get x() {
            return this._x;
        }
        public get y() {
            return this._y;
        }

        public set x(value: number) {
            this._x = value;
            this.emitWith("change");
        }
        public set y(value: number) {
            this._y = value;
            this.emitWith("change");
        }
    }

    class Gift extends lark.DisplayObjectContainer {
        private photo = new lark.Bitmap();
        private vx = 0;
        private vy = 0;

        public vwx = 0;
        public vwy = 0;

        constructor() {
            super();
            lark.loadImage("demo/weixin/image/gift.png", t=> this.photo.texture = t);
            this.addChild(this.photo);
            this.on(lark.Event.ENTER_FRAME, this.update, this);
            setInterval(() => {
                this.vx = Math.random() * 20 - 10
                this.vy = Math.random() * 40 - 20;
            }, 2000);
        }

        private update() {
            var stageH = this.stage.stageHeight;
            var height = this.height;
            var x = this.x + this.vx - this.vwx;
            var y = this.y + this.vy - this.vwy;

            var flipy = false;
            var flipx = false;

            if (y < 0) {
                y = 0;
                flipy = true;
            }
            if (y > stageH - height) {
                y = stageH - height;
                flipy = true;
            }

            if (x < -1000) {
                x = -1000;
                flipx = true
            }
            if (x > 1000) {
                x = 1000;
                flipx = true
            }
            if (flipx)
                this.vx = Math.random() * 40 - 20;
            if (flipy)
                this.vy = Math.random() * 40 - 20;
            this.x = x;
            this.y = y;
        }


        public fall() {
            var speedUp = e=> {
                this.vy += 3;
                if (this.y > 1200) {
                    this.removeListener(lark.Event.ENTER_FRAME, speedUp, this);
                    this.y = 100;
                    this.vy = 0;
                }
            };
            this.on(lark.Event.ENTER_FRAME, speedUp, this);
        }
    }

    class Player extends lark.DisplayObjectContainer {
        photo: lark.Bitmap;
        mask: lark.Bitmap;
        constructor(texture:lark.Texture) {
            super();

            lark.loadImage("demo/weixin/image/egret.png?a=1", t=> {
                egretMask = t;
                var photo = new lark.Bitmap(texture);
                var mask = new lark.Bitmap(egretMask);


                mask.width = 150;
                mask.height = 250;
                mask.x = 0;
                mask.y = 0;

                photo.width = 120;
                photo.height = 120;
                photo.y = 90;
                photo.x = 15;

                this.photo = photo;
                this.mask = mask;
                this.addChild(this.photo);
                this.addChild(this.mask);
            });
        }
    }

    var egretMask: lark.Texture = null;
}