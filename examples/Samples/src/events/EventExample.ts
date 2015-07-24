/**
 * @language en_US
 * The following example uses the EventExample class and the Square custom class to demonstrate how to manage event bubbling.
 */
/**
 * @language zh_CN
 * 以下示例使用 EventExample 类和 Square 自定义类来说明如何管理事件冒泡。
 */
class EventExample extends lark.Sprite {

    public constructor() {
        super();
        var square_0:Square = new Square(300, 0x336633);
        this.addChild(square_0);

        var square_1:Square = new Square(250, 0x669966);
        square_0.addChild(square_1);

        var square_2:Square = new Square(200, 0x66CC66);
        square_1.addChild(square_2);

        var square_3:Square = new Square(150, 0xAA0000);
        square_3.shouldBubble = false;
        square_2.addChild(square_3);

        var square_4:Square = new Square(100, 0x66FF66);
        square_3.addChild(square_4);

        var square_5:Square = new Square(50, 0xCC0000);
        square_5.shouldBubble = false;
        square_4.addChild(square_5);

        this.on(lark.TouchEvent.TOUCH_END, this.clickHandler, this);
    }

    private clickHandler(e:lark.Event):void {
        console.log(">> stage: " + e.type + " event from " + e.target.name + " called on " + this.name);
        console.log(">> --------------------------------------------");
    }
}

class Square extends lark.Sprite {
    private shape:lark.Shape;
    private sideLen:number;
    private color:number;
    public shouldBubble:boolean = true;

    public constructor(sideLen:number, color:number) {
        super();
        this.shape = new lark.Shape();
        this.addChild(this.shape);
        this.sideLen = sideLen;
        this.color = color;
        this.init();
        this.draw();
    }

    private init():void {
        this.on(lark.TouchEvent.TOUCH_END, this.firstClickHandler, this);
        this.on(lark.TouchEvent.TOUCH_END, this.secondClickHandler, this);
        this.on(lark.TouchEvent.TOUCH_END, this.thirdClickHandler, this);
    }

    private draw():void {
        this.shape.graphics.fillStyle = this.color;
        this.shape.graphics.fillRect(0, 0, this.sideLen, this.sideLen);
    }

    private firstClickHandler(e:lark.TouchEvent):void {
        console.log(">> 1e: " + e.type + " event from " + e.target.name + " called on " + this.name);
        if(!this.shouldBubble) {
            e.stopPropagation();
        }
    }

    private secondClickHandler(e:lark.TouchEvent):void {
        console.log(">> 2e: " + e.type + " event from " + e.target.name + " called on " + this.name);
        if(!this.shouldBubble) {
            e.stopImmediatePropagation();
            console.log(">> --------------------------------------------");
        }
    }

    private thirdClickHandler(e:lark.TouchEvent):void {
        console.log(">> 3e: " + e.type + " event from " + e.target.name + " called on " + this.name);
    }
}