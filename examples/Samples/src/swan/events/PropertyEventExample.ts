/**
 * @language en_US
 * The following example uses the class PropertyEventExample to show represents the event object
 * passed to the event listener when one of the properties of
 * an object has changed, and provides information about the change.
 */
/**
 * @language zh_CN
 * 以下示例使用 PropertyEventExample 类来演示对象的一个属性发生更改时传递到事件侦听器的事件
 */
class PropertyEventExample extends lark.Sprite {
  private txt:swan.EditableText;
  private group:swan.Group;
    constructor() {
        super();
        this.once(lark.Event.ADDED_TO_STAGE,this.init,this);
    }
    private init():void{
      var theme = new swan.Theme("resources/green-theme.json", this.stage);

      this.group = new swan.Group();
      this.group.on(swan.PropertyEvent.PROPERTY_CHANGE,this.onChangeHandler,this);

      this.addChild(this.group);

      var layout = new swan.TileLayout();
      layout.horizontalGap = 20;
      layout.verticalGap = 20;
      layout.requestedColumnCount = 3;
      this.group.layout = layout;

      this.stage.on(lark.TouchEvent.TOUCH_TAP,this.onTouchHandler,this);
    }
    private onTouchHandler():void{
        var btn = new swan.Button();
        this.group.addChild(btn);
    }
    private onChangeHandler(e:swan.PropertyEvent):void{
      console.log(e.type);
    }
}
