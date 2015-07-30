class ListExample extends lark.Sprite {

    public constructor() {
        super();

        //var exml =
        //    '<s:Scroller class="ListExample_Scroller" name="ohwhat?" xmlns:s="http://ns.egret.com/swan">'
        //        + '<s:List id="list" name="ohlist" width="200" height="400">'
        //            + '<s:itemRenderer>'
        //                + '<s:ItemRenderer states="up,down,disabled" height="50">'
        //                    + '<s:Image source="resources/selected.png" includeIn="down" width="100%" height="100%"/>'
        //                    + '<s:Label text="{data.label}" textColor="0xFFFFFF" horizontalCenter="0" verticalCenter="0"/>'
        //                + '</s:ItemRenderer>'
        //            + '</s:itemRenderer>'
        //        + '</s:List>'
        //    + '</s:Scroller>';
        //
        //var clazz = EXML.parse(exml);
        //var scroller = new clazz();
        //this.addChild(scroller);
        //var list:swan.List = scroller.list;
        //var collection = new swan.ArrayCollection();
        //for(var i = 0; i < 20; i ++)
        //{
        //    collection.addItem({"label":"文本" + i});
        //}
        //list.dataProvider = collection;

        var list = new swan.List();
    }
}