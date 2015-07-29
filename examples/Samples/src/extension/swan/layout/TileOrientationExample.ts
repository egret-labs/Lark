/**
 * @language en_US
 * The following example uses the class TileOrientationExample to show
 *  the property orientation in TileLayout class
 */
/**
 * @language zh_CN
 * 以下示例使用 TileOrientationExample 类来演示 TileLayout 类的 orientation 可定义的值
 */
class TileOrientationExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }

    private init(): void {
        var theme = new swan.Theme("resources/green-theme.json", this.stage);
        var arrValues = [swan.TileOrientation.ROWS, swan.TileOrientation.COLUMNS];
        for (var i = 0, max = arrValues.length; i < max; i++) {
            var group = new swan.Group();
            group.width = 550;
            group.height = 180;
            group.y = i * 250;
            this.addChild(group);
            var layout = new swan.TileLayout();
            layout.orientation = arrValues[i];
            layout.requestedColumnCount = 3;
            layout.requestedRowCount = 3;
            group.layout = layout;
            var txt = this.getTxt(arrValues[i]);
            txt.x = 350;
            txt.y = i*250;
            this.addChild(txt);
            for (var j = 0; j < 6; j++) {
                var btn = new swan.Button();
                group.addChild(btn);
            }
        }
    }
    private getTxt(value: string): lark.TextField {
        var txt = new lark.TextField;
        txt.fontSize = 20;
        txt.textColor = 0xffffff;
        txt.text = value;
        return txt;
    }
}
