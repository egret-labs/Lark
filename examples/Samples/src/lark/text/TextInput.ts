/**
 * @language en_US
 * The following example show how to create display objects for text display and input.
 * When the TextInput changing, a listener method onChange() will output the message.
 */
/**
 * @language zh_CN
 * 以下示例使用 TextInput 类来说明如何显示和输入文字。当输入文字改变的时候，侦听器方法 onChange() 会输出当前的文字
 */
class TextInput extends lark.Sprite {
    constructor() {
        super();
        var input = new lark.TextInput();
        input.textColor = 0xff0000;
        input.text = "请输入文字";
        this.addChild(input);
        input.on(lark.Event.CHANGE,this.onChange,this);

        var password = new lark.TextInput();
        password.displayAsPassword = true;
        password.textColor = 0xff0000;
        password.text = "请输入密码";
        password.y = 100;
        this.addChild(password);
        password.on(lark.Event.CHANGE,this.onChange,this);

    }
    private onChange(e:lark.Event):void{
        console.log(e.currentTarget.text);
    }
}
