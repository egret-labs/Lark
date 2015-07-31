class RadioButtonGroupExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            `<s:Group xmlns:s="http://ns.egret.com/swan">
                <s:layout>
                    <s:VerticalLayout gap="20"/>
                </s:layout>
                <s:RadioButton groupName="en" label="A. This is a radioButton.">
                    <s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected">
                        <s:Image includeIn="disabledAndSelected" source="resources/CheckBox/checkbox_select_disabled.png"/>
                        <s:Image includeIn="downAndSelected" source="resources/CheckBox/checkbox_select_down.png"/>
                        <s:Image includeIn="upAndSelected" source="resources/CheckBox/checkbox_select_up.png"/>
                        <s:Image includeIn="up,down,disabled" source="resources/CheckBox/checkbox_unselect.png"/>
                        <s:Label x="38" id="labelDisplay" textColor="0xffffff" fontSize="18"/>
                    </s:Skin>
                </s:RadioButton>
                <s:RadioButton groupName="en" label="B. This is a progressBar.">
                    <s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected">
                        <s:Image includeIn="disabledAndSelected" source="resources/CheckBox/checkbox_select_disabled.png"/>
                        <s:Image includeIn="downAndSelected" source="resources/CheckBox/checkbox_select_down.png"/>
                        <s:Image includeIn="upAndSelected" source="resources/CheckBox/checkbox_select_up.png"/>
                        <s:Image includeIn="up,down,disabled" source="resources/CheckBox/checkbox_unselect.png"/>
                        <s:Label x="38" id="labelDisplay" textColor="0xffffff" fontSize="18"/>
                    </s:Skin>
                </s:RadioButton>
                <s:RadioButton groupName="cn" label="1. 今天是晴天.">
                    <s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected">
                        <s:Image includeIn="disabledAndSelected" source="resources/CheckBox/checkbox_select_disabled.png"/>
                        <s:Image includeIn="downAndSelected" source="resources/CheckBox/checkbox_select_down.png"/>
                        <s:Image includeIn="upAndSelected" source="resources/CheckBox/checkbox_select_up.png"/>
                        <s:Image includeIn="up,down,disabled" source="resources/CheckBox/checkbox_unselect.png"/>
                        <s:Label x="38" id="labelDisplay" textColor="0xffffff" fontSize="18"/>
                    </s:Skin>
                </s:RadioButton>
                <s:RadioButton groupName="cn" label="2. 今天是雨天.">
                    <s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected">
                        <s:Image includeIn="disabledAndSelected" source="resources/CheckBox/checkbox_select_disabled.png"/>
                        <s:Image includeIn="downAndSelected" source="resources/CheckBox/checkbox_select_down.png"/>
                        <s:Image includeIn="upAndSelected" source="resources/CheckBox/checkbox_select_up.png"/>
                        <s:Image includeIn="up,down,disabled" source="resources/CheckBox/checkbox_unselect.png"/>
                        <s:Label x="38" id="labelDisplay" textColor="0xffffff" fontSize="18"/>
                    </s:Skin>
                </s:RadioButton>
            </s:Group>`;

        var clazz = EXML.parse(exml);
        var group = new clazz();
        this.addChild(group);
        group.x = 50;
        group.y = 50;
    }

}