/**
 * @language en_US
 * The following example shows the general use of a Group.
 */
/**
 * @language zh_CN
 * 下面的例子显示了一个 Group 的常规用法。
 */
class GroupExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            `<s:Group xmlns:s="http://ns.egret.com/swan">
                <s:layout>
                 <s:HorizontalLayout gap="20"/>
                </s:layout>
                <s:Group>
                    <s:layout>
                        <s:VerticalLayout gap="20"/>
                    </s:layout>
                    <s:Label text="北京" textColor="0xFFFFFF"/>
                    <s:Label text="晴天" textColor="0xFFFFCC"/>
                    <s:Image source="resources/sunny.png"/>
                </s:Group>
                <s:Group>
                    <s:layout>
                        <s:VerticalLayout gap="20"/>
                    </s:layout>
                    <s:Label text="上海" textColor="0xFFFFFF"/>
                    <s:Label text="多云" textColor="0xFFFFCC"/>
                    <s:Image source="resources/cloudy.png"/>
                </s:Group>
            </s:Group>`;

        var clazz = EXML.parse(exml);
        var group:swan.Group = new clazz();
        this.addChild(group);
    }
}