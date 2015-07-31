
/**
 * @language en_US
 * The following example uses the lark.Orientation class to monitor the orientation changes of the device.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.Orientation 来跟踪设备方向的变化。
 */
class OrientationExample extends lark.Sprite {
    labelOrientation: lark.TextField;
    constructor() {
        super();

        var labelOrientation = new lark.TextField();
        labelOrientation.y = 50;
        labelOrientation.x = 50;
        labelOrientation.textColor = 0xFFFFFF;
        this.addChild(labelOrientation);
        
        this.labelOrientation = labelOrientation;
        
        var orientation = new lark.Orientation();
        orientation.on(lark.Event.CHANGE, this.onOrientation, this);
        orientation.start();
    }

    onOrientation(e: lark.OrientationEvent) {
        this.labelOrientation.text =
        "Orientation: \nalpha:" + e.alpha
        + ",\nbeta:" + e.beta
        + ",\ngamma:" + e.gamma;
    }
}