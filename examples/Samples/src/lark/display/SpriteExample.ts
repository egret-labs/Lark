/**
 * @language en_US
 * The following example uses the class SpriteExample to show how to drag a Sprite object
 */
/**
 * @language zh_CN
 * 以下示例使用 SpriteExample 类来拖动一个对象
 */
class SpriteExample extends lark.Sprite {
    public constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }

    private sp: lark.Sprite;

    private init(): void {
        this.sp = new lark.Sprite();
        var shape = new lark.Shape();
        shape.graphics.fillStyle = 0xFFCC00;
        shape.graphics.fillRect(0, 0, 50, 50);
        this.sp.addChild(shape);
        this.addChild(this.sp);
        //点击舞台拖拽方块
        this.stage.on(lark.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.on(lark.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchBegin(e: lark.TouchEvent): void {
        this.stage.on(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }

    private onTouchEnd(e: lark.TouchEvent): void {
        this.stage.removeListener(lark.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }

    private onTouchMove(e: lark.TouchEvent): void {
        this.sp.x = e.stageX - 25;
        this.sp.y = e.stageY - 25;
    }
}
