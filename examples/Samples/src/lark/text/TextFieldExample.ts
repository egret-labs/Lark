/**
 * @language en_US
 * The following example uses the TextFieldExample class show how to use the methods and properties of the TextField class to manipulate it.
 */
/**
 * @language zh_CN
 * 以下示例使用 TextFieldExample 类来说明如何使用它的方法和属性对文本字段进行操作
 */
class TextFieldExample extends lark.Sprite {
    constructor() {
        super();
        this.on(lark.Event.ADDED_TO_STAGE,this.onAddToStageHandler,this);
    }
    private onAddToStageHandler():void{
      var stageWidth = this.stage.stageWidth;
        var stageHeight = this.stage.stageHeight;


        var text1 = new lark.TextField();
        text1.width = stageWidth;
        text1.textColor = 0xff0000;
        text1.text = "Left aligned text";
        this.addChild(text1);

        var text2 = new lark.TextField();
        text2.width = stageWidth;
        text2.y = 60;
        text2.textColor = 0xff0000;
        text2.textAlign = lark.HorizontalAlign.CENTER;
        text2.text = "Horizontal center text";
        this.addChild(text2);

        var text3 = new lark.TextField();
        text3.width = stageWidth;
        text3.textColor = 0xff0000;
        text3.textAlign = lark.HorizontalAlign.RIGHT;
        text3.text = "Horizontal right text";
        this.addChild(text3);

        var text4 = new lark.TextField();
        text4.width = stageWidth;
        text4.height = stageHeight;
        text4.textColor = 0x009aff;
        text4.verticalAlign = lark.VerticalAlign.MIDDLE;
        text4.textAlign = lark.HorizontalAlign.CENTER;
        text4.text = "VerticalAlign middle text";
        this.addChild(text4);

        var text5 = new lark.TextField();
        text5.width = stageWidth;
        text5.height = stageHeight;
        text5.textColor = 0x009aff;
        text5.verticalAlign = lark.VerticalAlign.BOTTOM;
        text5.textAlign = lark.HorizontalAlign.CENTER;
        text5.text = "VerticalAlign bottom text";
        this.addChild(text5);

        var textMulti = new lark.TextField();
        textMulti.width = 200;
        textMulti.x = 100;
        textMulti.y = 100;
        textMulti.textColor = 0xff0000;
        textMulti.lineSpacing = 10;
        textMulti.text = "Multi line,Multi line,Multi line,Multi line,Multi line,Multi line";
        this.addChild(textMulti);

    }
}
