/**
 * @language en_US
 * The following example uses the class DisplayObjectExample to show how to change the alpha rotation scale width height
 */
/**
 * @language zh_CN
 * 以下示例使用 DisplayObjectExample 类来说明如何改变alpha、旋转、缩放、大小
 */
class DisplayObjectExample extends lark.Sprite {
    private sp_alpha: lark.Sprite;
    private sp_rotation: lark.Sprite;
    private sp_scale: lark.Sprite;
    private sp_width_height: lark.Sprite;
    constructor() {
        super();
        this.sp_alpha = this.getSprite(0xff0000);
        this.sp_alpha.y = 150;
        this.addChild(this.sp_alpha);
        this.sp_alpha.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouch, this);

        this.sp_rotation = this.getSprite(0xff0000);
        this.sp_rotation.x = 150; this.sp_rotation.y = 150;
        this.addChild(this.sp_rotation);
        this.sp_rotation.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouch, this);

        this.sp_scale = this.getSprite(0xff0000);
        this.sp_scale.x = 300; this.sp_scale.y = 150;
        this.addChild(this.sp_scale);
        this.sp_scale.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouch, this);

        this.sp_width_height = this.getSprite(0xff0000);
        this.sp_width_height.y = 300;
        this.addChild(this.sp_width_height);
        this.sp_width_height.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    }
    private onTouch(e: lark.TouchEvent): void {
        switch (e.currentTarget) {
            case this.sp_alpha:
                this.sp_alpha.alpha = Math.random();
                break;
            case this.sp_rotation:
                this.sp_rotation.rotation += 10;
                break;
            case this.sp_scale:
                this.sp_scale.scaleX = 0.5 + Math.random() * 0.5;
                this.sp_scale.scaleY = 0.5 + Math.random() * 0.5;
                break;
            case this.sp_width_height:
                this.sp_width_height.width = 50 + Math.random() * 50;
                this.sp_width_height.height = 50 + Math.random() * 50;
                break;
        }
    }

    private getSprite(color: number): lark.Sprite {
        var sp = new lark.Sprite();
        var shape = new lark.Shape();
        shape.graphics.fillStyle = color;
        shape.graphics.fillRect(0, 0, 50, 50);
        sp.addChild(shape);
        return sp;
    }
}
