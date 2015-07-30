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
        var theme = new swan.Theme("resources/green-theme.json", this.stage);

        var group = new swan.Group();
        this.addChild(group);

        var layout = new swan.TileLayout();
        layout.horizontalGap = 20;
        layout.verticalGap = 20;
        layout.requestedColumnCount = 3;
        group.layout = layout;

        for (var i: number = 0; i < 10; i++) {
            var btn = new swan.Button();
            group.addChild(btn);
        }

    }
}
