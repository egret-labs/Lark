/**
 * @language en_US
 * The following example shows a HSlider.
 */
/**
 * @language zh_CN
 * 下面的例子显示了一个 HSlider。
 */
class HScrollBar extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            '<s:Scroller xmlns:s="http://ns.egret.com/swan">'
                + '<s:Image id="viewport" source="resources/posterfullscreen.jpg"/>'
                + '<s:Skin>'
                    + '<s:HScrollBar id="horizontalScrollBar" width="100%" bottom="0">'
                        + '<s:Skin>'
                            + '<s:Image width="100%" height="100%" source="resources/track.png" scale9Grid="1,1,4,4"/>'
                            + '<s:Image id="thumb" width="30" height="100%" source="resources/thumb.png"  scale9Grid="1,1,4,4"/>'
                        + '</s:Skin>'
                    + '</s:HScrollBar>'
                    + '<s:VScrollBar id="verticalScrollBar" width="100%" right="0">'
                        + '<s:Skin>'
                            + '<s:Image width="100%" height="100%" source="resources/track.png" scale9Grid="1,1,4,4"/>'
                            + '<s:Image id="thumb" width="100%" height="30" source="resources/thumb.png"  scale9Grid="1,1,4,4"/>'
                        + '</s:Skin>'
                    + '</s:VScrollBar>'
                + '</s:Skin>'
            + '</s:Scroller>';

        var clazz = EXML.parse(exml);
        var scroller = new clazz();
        this.addChild(scroller);
    }
}