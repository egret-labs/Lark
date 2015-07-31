class EditablTextExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            `<s:Group xmlns:s="http://ns.egret.com/swan">
                <s:layout>
                    <s:VerticalLayout gap="20"/>
                </s:layout>
                <s:Group>
                    <s:Label text="账户：" fontSize="16" textColor="0xFFFFFF"/>
                    <s:EditableText x="60" fontSize="16" text="输入账户" textColor="0xAAAAFF"/>
                </s:Group>
                <s:Group>
                    <s:Label text="密码：" fontSize="16" textColor="0xFFFFFF"/>
                    <s:EditableText x="60" text="输入密码" displayAsPassword="true" fontSize="16" textColor="0xAAAAFF"/>
                </s:Group>
            </s:Group>`;

        var clazz = EXML.parse(exml);
        var group:swan.Group = new clazz();
        this.addChild(group);

    }
}