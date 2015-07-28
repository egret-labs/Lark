/**
 * @language en_US
 * The following example uses the class BasicLayoutExample to show the absolute layout
 */
/**
 * @language zh_CN
 * 以下示例使用 BasicLayoutExample 类来演示绝对布局
 */
class BasicLayoutExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }
    private init(): void {
        var theme = new swan.Theme("resources/green-theme.json", this.stage);

        var group = new swan.Group();
        this.addChild(group);

        var layout = new swan.BasicLayout();
        group.layout = layout;

        var btn1 = new swan.Button();
        group.addChild(btn1);

        var btn2 = new swan.Button();
        btn2.x = 110; btn2.y = 50;
        group.addChild(btn2);

        var btn3 = new swan.Button();
        btn3.x = 250; btn3.y = 20;
        group.addChild(btn3);
    }
}
