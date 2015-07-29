/**
 * @language en_US
 * The following example uses the class CollectionEventExample to show the event when the associated collection changes
 * that exposes an any[] as a collection.
 */
/**
 * @language zh_CN
 * 以下示例使用 CollectionEventExample 类来说明如何使用集合类型数据改变事件
 */
class CollectionEventExample extends lark.Sprite {
    constructor() {
        super();
        var arr = [2, 1, 3];
        var arrayCollection = new swan.ArrayCollection();
        arrayCollection.source = arr;
        arrayCollection.on(swan.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this);
        arrayCollection.addItem(5);//add
        arrayCollection.addItemAt(6, 1);//add
        arrayCollection.source.sort();
        arrayCollection.refresh();//refersh
        arrayCollection.removeItemAt(2);//remove
        arrayCollection.removeAll();//remove
        arrayCollection.source = [1, 2, 3];//reset
        arrayCollection.replaceItemAt(7, 1);//replace
        arrayCollection.source[1] = 8;
        arrayCollection.itemUpdated(1);//update
    }
    private onCollectionChange(e: swan.CollectionEvent) {
        switch (e.kind) {
            case swan.CollectionEventKind.ADD:
                console.log("arrayCollection add", e.currentTarget.source, e.location);
                break;
            case swan.CollectionEventKind.REFRESH:
                console.log("arrayCollection refersh", e.currentTarget.source, e.location);
                break;
            case swan.CollectionEventKind.REMOVE:
                console.log("arrayCollection remove", e.currentTarget.source, e.location);
                break;
            case swan.CollectionEventKind.REPLACE:
                console.log("arrayCollection replace", e.currentTarget.source, e.location);
                break;
            case swan.CollectionEventKind.RESET:
                console.log("arrayCollection reset", e.currentTarget.source, e.location);
                break;
            case swan.CollectionEventKind.UPDATE:
                console.log("arrayCollection update", e.currentTarget.source, e.location);
                break;
        }
    }
}
