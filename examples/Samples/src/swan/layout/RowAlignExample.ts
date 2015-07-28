/**
 * @language en_US
 * The following example uses the class RowAlignExample to show
 *  the property rowAlign in TileLayout class
 */
/**
 * @language zh_CN
 * 以下示例使用 RowAlignExample 类来演示 TileLayout 类的 rowAlign 可定义的值
 */
class RowAlignExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(): void {
        var theme = new swan.Theme("resources/green-theme.json", this.stage);
        var arrAlign = [swan.RowAlign.TOP, swan.RowAlign.JUSTIFY_USING_GAP, swan.RowAlign.JUSTIFY_USING_HEIGHT];
        for (var i = 0, max = arrAlign.length; i < max; i++) {
            var group = new swan.Group();
            group.width = 300;
            group.height = 180;
            group.y = i*250;
            this.addChild(group);
            var layout = new swan.TileLayout();
            layout.rowAlign = arrAlign[i];
            layout.requestedColumnCount = 3;
            group.layout = layout;
            var txt = this.getTxt(arrAlign[i]);
            txt.x = 310;
            txt.y = i*250;
            this.addChild(txt);
            for (var j = 0; j < 6; j++) {
              var btn = new swan.Button();
              btn.percentWidth = 100;
              btn.percentHeight = 100;
              group.addChild(btn);
            }
        }
    }
    private getTxt(value: string): lark.TextField {
        var txt = new lark.TextField;
        txt.text = value;
        txt.textColor = 0xffffff;
        return txt;
    }
}
