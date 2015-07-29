/**
 * @language en_US
 * The following example uses the class JustifyAlignExample to show
 * the values for property horizontalAlign
 */
/**
 * @language zh_CN
 * 以下示例使用 JustifyAlignExample 类来演示 horizontalAlign 属性的对齐常量值
 */
class JustifyAlignExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }
    private init(): void {
      var theme = new swan.Theme("resources/green-theme.json", this.stage);
      var arrAlign = [swan.JustifyAlign.JUSTIFY, swan.JustifyAlign.CONTENT_JUSTIFY];
      for (var i = 0, max = arrAlign.length; i < max; i++) {
          var group = new swan.Group();
          group.width = 500;
          group.height = 100;
          group.y = i*120;
          this.addChild(group);
          var layout = new swan.HorizontalLayout();
          layout.horizontalAlign = arrAlign[i];
          group.layout = layout;
          var txt = this.getTxt(arrAlign[i]);
          txt.x = 500;
          txt.y = i*120;
          this.addChild(txt);
          for (var j = 0; j < 4; j++) {
            var btn = new swan.Button();
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
