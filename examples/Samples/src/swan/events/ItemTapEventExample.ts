/**
 * @language en_US
 * The following example uses the class ItemTapEventExample to show the represents events that are emitted when a item has been touched
 */
/**
 * @language zh_CN
 * 以下示例使用 ItemTapEventExample 类来演示列表项触碰事件
 */
class ItemTapEventExample extends lark.Sprite {
    constructor() {
        super();
        var list = new swan.List();
        var arr = new swan.ArrayCollection(["a1", "a2", "a3", "a4", "a5", "a6"]);
        list.dataProvider = arr;
        list.itemRenderer = IR_ItemTapEvent;
        this.addChild(list);
        list.on(swan.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
    }
    private onItemTapHandler(e: swan.ItemTapEvent): void {
        console.log(e.item, e.itemRenderer, e.itemIndex)
    }
}
class IR_ItemTapEvent extends swan.ItemRenderer {
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
