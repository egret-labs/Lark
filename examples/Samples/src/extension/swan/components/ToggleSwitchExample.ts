class ToggleSwitchExample extends lark.Sprite{
    public constructor() {
        super();

        var exml =
            `<s:Group xmlns:s="http://ns.egret.com/swan">
                <s:ToggleButton x="100" y="100">
                    <s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected">
                        <s:Label includeIn="up,down" text="off"/>
                        <s:Label includeIn="upAndSelected,downAndSelected" text="on"/>
                    </s:Skin>
                </s:ToggleButton>
                <s:Label x="50" id="labelDisplay" textColor="0xffffff" text="click toggle switch !" fontSize="18" y="60"/>
            </s:Group>`;

        var clazz = EXML.parse(exml);
        var group = new clazz();
        this.addChild(group);
    }
}