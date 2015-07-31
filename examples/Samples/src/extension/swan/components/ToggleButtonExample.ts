class ToggleButtonExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            `<s:ToggleButton x="100" y="100" label="Toggle Button" xmlns:s="http://ns.egret.com/swan">
                <s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected">
                    <s:Image includeIn="up,down" source="resources/button_up.png" width="30" height="30" scale9Grid="1,1,4,4"/>
                    <s:Image includeIn="upAndSelected,downAndSelected" source="resources/button_down.png" width="30" height="30" scale9Grid="1,1,4,4"/>
                    <s:Label x="38" id="labelDisplay" textColor="0xffffff" fontSize="18" y="5"/>
                </s:Skin>
            </s:ToggleButton>`;

        var clazz = EXML.parse(exml);
        var button = new clazz();
        this.addChild(button);
    }
}