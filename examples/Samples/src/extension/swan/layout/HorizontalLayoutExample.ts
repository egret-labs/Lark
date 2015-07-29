/**
 * @language en_US
 * The following example uses the class HorizontalLayoutExample to show
 * arranges the layout elements in a horizontal sequence,left to right
 */
/**
 * @language zh_CN
 * 以下示例使用 HorizontalLayoutExample 类来演示按水平顺序从左到右排列布局元素
 */
class HorizontalLayoutExample extends lark.Sprite {
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

        var layout = new swan.HorizontalLayout();
        layout.gap = 30;
        group.layout = layout;

        for(var i:number=0;i<3;i++){
          var btn = new swan.Button();
          group.addChild(btn);
        }
    }
}
