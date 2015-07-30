/**
 * @language en_US
 * Usually swan.Component is used as a container for basic layout.
 */
/**
 * @language zh_CN
 * 通常 swan.Component 可以作为简单布局的容器。
 */
class ComponentExample extends lark.Sprite {

    public constructor() {
        super();

        var shape = new lark.Shape();
        shape.graphics.fillStyle = 0x666666;
        shape.graphics.fillRect(0,0,400,300);
        this.addChild(shape);

        var base = new swan.Component();
        base.width = 400;
        base.height = 300;
        this.addChild(base);

        var label = new swan.Label();
        label.text = "标题";
        label.horizontalCenter = 0;
        base.addChild(label);

        var signature = new swan.Label();
        signature.text = "Mr.Lark";
        signature.right = 0;
        signature.bottom = 0;
        base.addChild(signature);
    }
}