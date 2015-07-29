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
    private progress:swan.ProgressBar;
    private init(): void {
        var theme = new swan.Theme("resources/green-theme.json", this.stage);

        var panel = new swan.Panel();
        panel.x = 200;
        panel.on(swan.UIEvent.CREATION_COMPLETE,this.onUIEventHandler,this);
        panel.on(swan.UIEvent.CLOSING,this.onUIEventHandler,this);
        panel.on(swan.UIEvent.MOVE,this.onUIEventHandler,this);
        this.addChild(panel);

        var list = new swan.List();
        var arr = new swan.ArrayCollection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        list.dataProvider = arr;
        list.itemRenderer = IR_UIEvents;
        var scroller = new swan.Scroller();
        scroller.viewport = list;
        scroller.height = 190;
        this.addChild(scroller);
        scroller.on(swan.UIEvent.CHANGE_START,this.onUIEventHandler,this);
        scroller.on(swan.UIEvent.CHANGE_END,this.onUIEventHandler,this);
    }
    private onUIEventHandler(e:swan.UIEvent):void{
      console.log(e.type)
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
