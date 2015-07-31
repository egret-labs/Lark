/**
 * @language en_US
 * The following example uses the class UIEventExample to show the ui component trigger the event
 */
/**
 * @language zh_CN
 * 以下示例使用 UIEventExample 类来演示UI组件触发事件
 */
class UIEventExample extends lark.Sprite {
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE, this.init, this);
    }
    private progress: swan.ProgressBar;
    private init(): void {
        var panel = this.getPanel();
        panel.x = 200;
        panel.on(swan.UIEvent.CREATION_COMPLETE, this.onUIEventHandler, this);
        panel.on(swan.UIEvent.CLOSING, this.onUIEventHandler, this);
        panel.on(swan.UIEvent.MOVE, this.onUIEventHandler, this);
        this.addChild(panel);

        var list = new swan.List();
        var arr = new swan.ArrayCollection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        list.dataProvider = arr;
        list.itemRenderer = IR_UIEvents;
        var scroller = new swan.Scroller();
        scroller.viewport = list;
        scroller.height = 190;
        this.addChild(scroller);
        scroller.on(swan.UIEvent.CHANGE_START, this.onUIEventHandler, this);
        scroller.on(swan.UIEvent.CHANGE_END, this.onUIEventHandler, this);
    }
    private onUIEventHandler(e: swan.UIEvent): void {
        console.log("swan.UIEvent:",e.type)
    }
    private getPanel(): swan.Panel {
        var exmlButton =
        `<s:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:s="http://ns.egret.com/swan">
            <s:Image source="resources/button_up.png" source.down="resources/button_down.png" scale9Grid="1,3,8,8" width="100%" height="100%"/>
            <s:Label id="labelDisplay" top="8" bottom="8" left="8" right="8" fontSize="20" fontFamily="Tahoma" textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
        </s:Skin>`;
        EXML.parse(exmlButton);

        var exml =
        `<s:Skin class="skins.PanelSkin" xmlns:s="http://ns.egret.com/swan" minWidth="450" minHeight="25">
            <s:Image left="0" right="0" bottom="0"  top="0" source="resources/border.png" scale9Grid="2,2,12,12"/>
            <s:Group id="moveArea" left="0" right="0" top="1" height="45">
                <s:Image left="0" right="0" bottom="0"  top="0" source="resources/header.png"/>
                <s:Label id="titleDisplay" fontSize="20" fontFamily="Tahoma" textColor="0xFFFFFF" wordWrap="false" left="15" right="5" verticalCenter="0"/>
            </s:Group>
            <s:Group id="contentGroup" width="100%" height="200" top="50" bottom="30"/>
            <s:Button skinName = "skins.ButtonSkin" id="closeButton" label="close" bottom="5" horizontalCenter="0"/>
        </s:Skin>`;
        var clazz = EXML.parse(exml);
        var panel = new swan.Panel();
        panel.skinName = "skins.PanelSkin";
        return panel;
    }
}

class IR_UIEvents extends swan.ItemRenderer {
    private label: swan.Label;
    constructor() {
        super();
        this.label = new swan.Label();
        this.addChild(this.label);
    }
    protected dataChanged(): void {
        this.label.text = "label:" + this.data.toString();
    }
}
