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
            var btn = this.getButton();
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
