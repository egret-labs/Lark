/**
 * @language en_US
 * The following example uses the TouchEventExample and lark.Shape classes to show how mouse events are dispatched using a simple image.
 */
/**
 * @language zh_CN
 * 以下示例使用 TouchEventExample 和 lark.Shape 类来说明如何使用简单图像调度鼠标事件。
 */
class TouchEventExample extends lark.Sprite {

    public constructor() {
        super();
        var child = new lark.Shape();
        this.addChild(child);
        child.graphics.fillStyle = "#FFCC00";
        child.graphics.fillRect(0,0,100,100);
        child.on(lark.TouchEvent.TOUCH_BEGIN,this.touchBeginHandler,this);
        child.on(lark.TouchEvent.TOUCH_MOVE,this.touchMoveHandler,this);
        child.on(lark.TouchEvent.TOUCH_END,this.touchEndHandler,this);
        child.on(lark.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchReleaseOutSideHandler,this);
        child.on(lark.TouchEvent.TOUCH_TAP,this.touchTapHandler,this);

        var another = new lark.Shape();
        this.addChild(another);
        another.graphics.fillStyle = "#00CCFF";
        another.graphics.fillRect(200,0,100,100);
    }

    private touchBeginHandler(event:lark.TouchEvent):void {
        console.log("touchBeginHandler");
    }

    private touchMoveHandler(event:lark.TouchEvent):void {
        console.log("touchMoveHandler");
    }

    private touchEndHandler(event:lark.TouchEvent):void {
        console.log("touchEndHandler");

    }

    private touchReleaseOutSideHandler(event:lark.TouchEvent):void {
        console.log("touchReleaseOutSideHandler");
    }

    private touchTapHandler(event:lark.TouchEvent):void {
        console.log("touchTapHandler");
    }
}