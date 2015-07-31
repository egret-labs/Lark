/**
 * @language en_US
 * The following example uses the class VerticalLayoutExample to show
 * arranges the layout elements in a vertical sequence,top to bottom
 */
/**
 * @language zh_CN
 * 以下示例使用 VerticalLayoutExample 类来演示垂直顺序从上向下排列布局元素
 */
class VerticalLayoutExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }
    private init(): void {
        var group = new swan.Group();
        group.x = 20;
        group.y = 20;
        this.addChild(group);

        var layout = new swan.VerticalLayout();
        layout.gap = 30;
        group.layout = layout;

        var btn1 = this.getButton();
        group.addChild(btn1);

        var btn2 = this.getButton();
        group.addChild(btn2);

        var btn3 = this.getButton();
        group.addChild(btn3);
    }
    private getButton(): swan.Button {
        var exml =
            '<s:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:s="http://ns.egret.com/swan">'
            + '<s:Image source="resources/button_up.png" source.down="resources/button_down.png" scale9Grid="1,3,8,8" width="100%" height="100%"/>'
            + '<s:Label id="labelDisplay" top="8" bottom="8" left="8" right="8" fontSize="20" fontFamily="Tahoma" textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>'
            + '</s:Skin>';
        var clazz = EXML.parse(exml);
        var btn = new swan.Button();
        btn.skinName = "skins.ButtonSkin";
        return btn;
    }
}
