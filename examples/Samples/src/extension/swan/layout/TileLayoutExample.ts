/**
 * @language en_US
 * The following example uses the class TileLayoutExample to show
 * arranges the layout elements in columns and rows
 */
/**
 * @language zh_CN
 * 以下示例使用 TileLayoutExample 类来演示单元格元素
 */
class TileLayoutExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }
    private init(): void {
        var group = new swan.Group();
        this.addChild(group);

        var layout = new swan.TileLayout();
        layout.horizontalGap = 20;
        layout.verticalGap = 20;
        layout.requestedColumnCount = 3;
        group.layout = layout;

        for (var i: number = 0; i < 10; i++) {
            var btn = this.getButton();
            group.addChild(btn);
        }
    }
    private getButton(): swan.Button {
        var exml =
        `<s:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:s="http://ns.egret.com/swan">
            <s:Image source="resources/button_up.png" source.down="resources/button_down.png" scale9Grid="1,3,8,8" width="100%" height="100%"/>
            <s:Label id="labelDisplay" top="8" bottom="8" left="8" right="8" fontSize="20" fontFamily="Tahoma" textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
        </s:Skin>`;
        var clazz = EXML.parse(exml);
        var btn = new swan.Button();
        btn.skinName = "skins.ButtonSkin";
        return btn;
    }
}
