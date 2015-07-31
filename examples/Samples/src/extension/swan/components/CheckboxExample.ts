

class CheckboxExample extends swan.Group {
    constructor() {
        super();

        var checkboxSkin = 
            `<s:Skin states="up,down,disabled,upAndSelected,downAndSelected,disabledAndSelected" xmlns:s="http://ns.egret.com/swan">
                <s:Group width="100%" height="100%">
                    <s:layout>
                        <s:HorizontalLayout verticalAlign="middle"/>
                    </s:layout>
                    <s:Image fillMode="scale" alpha="1" alpha.disabled="0.5" alpha.down="0.7"
                             source="resources/CheckBox/checkbox_unselect.png"
                             source.upAndSelected="resources/CheckBox/checkbox_select_up.png"
                             source.downAndSelected="resources/CheckBox/checkbox_select_down.png"
                             source.disabledAndSelected="resources/CheckBox/checkbox_select_disabled.png"/>
                    <s:Label id="labelDisplay" fontSize="20" textColor="0x707070"
                             textAlign="center" verticalAlign="middle"
                             fontFamily="Tahoma"/>
                </s:Group>
            </s:Skin>`;

        var checkbox = new swan.CheckBox();

        //组件可以接受：皮肤类定义,皮肤类名,皮肤实例,EXML文件内容,或外部EXML文件路径作为 skinName 的值
        //这里我们直接用 EXML 内容作为 skinName
        checkbox.skinName = checkboxSkin;
        checkbox.label = "CheckBox Example";
        checkbox.on(lark.Event.CHANGE, e=> checkbox.label = checkbox.selected ? "Selected" : "Unselected", this);
        checkbox.x = 50;
        checkbox.y = 50;
        this.addChild(checkbox);
    }
}