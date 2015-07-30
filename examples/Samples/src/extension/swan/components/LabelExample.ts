/**
 * @language en_US
 * The following example shows some of the tags, as well as the relative positioning.
 */
/**
 * @language zh_CN
 * 下面的例子显示了一些标签，以及相对定位。
 */
class LabelExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            '<s:Group width="600" height="400" xmlns:s="http://ns.egret.com/swan">'
                + '<s:Label text="左上角" left="0" top="0" textColor="0xFFFFFF"/>'
                + '<s:Label text="右上角" right="0" top="0" textColor="0xFFFFFF"/>'
                + '<s:Label text="左下角" left="0" bottom="0" textColor="0xFFFFFF"/>'
                + '<s:Label text="右下角" right="0" bottom="0" textColor="0xFFFFFF"/>'
                + '<s:Label text="居中" horizontalCenter="0" verticalCenter="0" textColor="0xFFFFFF"/>'
            + '</s:Group>';

        var clazz = EXML.parse(exml);
        var group:swan.Group = new clazz();
        this.addChild(group);
    }
}