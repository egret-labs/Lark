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
        var theme = new swan.Theme("resources/green-theme.json", this.stage);

        var group = new swan.Group();
        group.x = 20;
        group.y = 20;
        this.addChild(group);

        var layout = new swan.VerticalLayout();
        layout.gap = 30;
        group.layout = layout;

        var btn1 = new swan.Button();
        group.addChild(btn1);

        var btn2 = new swan.Button();
        group.addChild(btn2);

        var btn3 = new swan.Button();
        group.addChild(btn3);
    }
}
