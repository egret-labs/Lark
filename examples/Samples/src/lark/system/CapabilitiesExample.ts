/**
 * @language en_US
 * The following example outputs the values found in the lark.Capabilities object. First, it outputs the values into a text field. Then, it outputs the values using several calls to console.log().
 */
/**
 * @language zh_CN
 * 下列示例输出在 lark.Capabilities 对象中找到的值。首先，此示例将值输出到文本字段中。然后，使用对 console.log() 的多个调用输出值。
 */
class CapabilitiesExample extends lark.Sprite {

    public constructor() {
        super();
        this.showCapabilities();
    }

    private showCapabilities():void {
        var tf:lark.TextField = new lark.TextField();
        tf.height = 600;
        tf.width = 400;
        tf.wordWrap = true;

        tf.text = "	hasGeolocation: " + lark.Capabilities.	hasGeolocation +

            "\nhasMotion: " + lark.Capabilities.hasMotion +
            "\nhasOrientation: " + lark.Capabilities.hasOrientation +
            "\nisMobile: " + lark.Capabilities.isMobile +
            "\nlanguage: " + lark.Capabilities.language +
            "\nos: " + lark.Capabilities.os;

        this.addChild(tf);

        console.log("hasGeolocation: " + lark.Capabilities.hasGeolocation);
        console.log("hasMotion: " + lark.Capabilities.hasMotion);
        console.log("hasOrientation: " + lark.Capabilities.hasOrientation);
        console.log("isMobile: " + lark.Capabilities.isMobile);
        console.log("language: " + lark.Capabilities.language);
        console.log("os: " + lark.Capabilities.os);

    }
}