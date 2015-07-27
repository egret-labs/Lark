/**
 * @language en_US
 * The following example uses the class BlendMode to show the 3 kind of blend mode effects
 */
/**
 * @language zh_CN
 * 以下示例使用 BlendMode 演示3种混合模式的效果
 */
class BlendMode extends lark.Sprite {
    constructor() {
        super();
        //画3个方块，点击会设置不同的混合模式
        this.basic1 = this.getSprite(0xFF0000);
        this.basic2 = this.getSprite(0xFF0000);
        this.basic3 = this.getSprite(0xFF0000);

        this.addChild(this.basic1);
        this.basic1.on(lark.TouchEvent.TOUCH_TAP, this.onNormal, this);

        this.basic2.x = 100;
        this.addChild(this.basic2);
        this.basic2.on(lark.TouchEvent.TOUCH_TAP, this.onAdd, this);

        this.basic3.x = 200;
        this.addChild(this.basic3);
        this.basic3.on(lark.TouchEvent.TOUCH_TAP, this.onERASE, this);

        this.top = this.getSprite(0x3333FF);
        this.top.y = 100;
        this.addChild(this.top);
    }
    //三个红色方块
    private basic1: lark.Sprite;
    private basic2: lark.Sprite;
    private basic3: lark.Sprite;
    //顶部的蓝色方块，用于设置 BlendMode
    private top: lark.Sprite;

    private onNormal(): void {
        this.top.x = this.basic1.x;
        this.top.y = this.basic1.y;
        this.addChild(this.top);
        this.top.blendMode = lark.BlendMode.NORMAL;
    }
    private onAdd(): void {
        this.top.x = this.basic2.x;
        this.top.y = this.basic2.y;
        this.addChild(this.top);
        this.top.blendMode = lark.BlendMode.ADD;
    }
    private onERASE(): void {
        this.top.x = this.basic3.x;
        this.top.y = this.basic3.y;
        this.addChild(this.top);
        this.top.blendMode = lark.BlendMode.ERASE;
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
