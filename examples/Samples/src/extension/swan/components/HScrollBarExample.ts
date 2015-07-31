class HScrollBarExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            `<s:Group xmlns:s="http://ns.egret.com/swan">
                <s:Image width="400" height="100" source="resources/selected.png" scale9Grid="1,1,4,4"/>
                <s:Scroller >
                    <s:Skin>
                        <s:HScrollBar id="horizontalScrollBar" width="100%" height="30" bottom="0">
                            <s:Skin>
                                <s:Image width="100%" height="100%" source="resources/track.png" scale9Grid="1,1,4,4"/>
                                <s:Image id="thumb" width="30" height="30" source="resources/thumb.png"  scale9Grid="1,1,4,4"/>
                            </s:Skin>
                        </s:HScrollBar>
                    </s:Skin>
                        <s:List id="list" width="400" height="100">
                            <s:layout>
                                <s:HorizontalLayout gap="20"/>
                            </s:layout>
                            <s:itemRenderer>
                                <s:ItemRenderer states="up,down,disabled" height="50">
                                    <s:Label text="{data.label}" textColor="0" horizontalCenter="0" verticalCenter="0"/>
                                </s:ItemRenderer>
                            </s:itemRenderer>
                            <s:ArrayCollection>
                                <s:Array>
                                    <s:Object label="项目1"/>
                                    <s:Object label="项目2"/>
                                    <s:Object label="项目3"/>
                                    <s:Object label="项目4"/>
                                    <s:Object label="项目5"/>
                                    <s:Object label="项目6"/>
                                    <s:Object label="项目7"/>
                                    <s:Object label="项目8"/>
                                    <s:Object label="项目9"/>
                                    <s:Object label="项目10"/>
                                    <s:Object label="项目11"/>
                                    <s:Object label="项目12"/>
                                    <s:Object label="项目13"/>
                                    <s:Object label="项目14"/>
                                    <s:Object label="项目15"/>
                                    <s:Object label="项目16"/>
                                </s:Array>
                            </s:ArrayCollection>
                        </s:List>
                </s:Scroller>
            </s:Group>`;

        var clazz = EXML.parse(exml);
        var scroller = new clazz();
        this.addChild(scroller);
    }
}