/**
 * @language en_US
 * The following example uses the class BindingExample to show how to performing data binding
 */
/**
 * @language zh_CN
 * 以下示例使用 BindingExample 类来说明如何执行数据绑定
 */
class BindingExample extends lark.Sprite {
    public porp: number = 789;
    public porp2: number = 456;
    constructor() {
        super();
        swan.Binding.bindProperty(this, ["porp"], this, "porp2");
        swan.Binding.bindHandler(this, ["porp"], this.watcherHander, this);
        this.porp = 666;
        this.porp = 123;
    }
    public watcherHander(value: any): void {
        console.log("watcherHander:", value, this.porp, this.porp2);
    }
}
