class EditablTextExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            `<s:Group xmlns:s="http://ns.egret.com/swan">
                <s:layout>
                    <s:VerticalLayout gap="20"/>
                </s:layout>
                <s:Group>
                    <s:Label text="Accout：" fontSize="16" textColor="0xFFFFFF"/>
                    <s:EditableText x="100" fontSize="16" text="input accout" textColor="0xAAAAFF"/>
                </s:Group>
                <s:Group>
                    <s:Label text="Password：" fontSize="16" textColor="0xFFFFFF"/>
                    <s:EditableText x="100" text="input password" displayAsPassword="true" fontSize="16" textColor="0xAAAAFF"/>
                </s:Group>
            </s:Group>`;

        var clazz = EXML.parse(exml);
        var group:swan.Group = new clazz();
        this.addChild(group);

    }
}