
/**
 * @language en_US
 * The following example uses the lark.Motion class to monitor the movement of the device.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.Motion 来跟踪设备的运动状态。
 */
class MotionExample extends lark.Sprite {
    labelMotion: lark.TextField;
    constructor() {
        super();

        var labelMotion = new lark.TextField();
        labelMotion.y = 50;
        labelMotion.x = 50;
        labelMotion.textColor = 0xFFFFFF;
        this.addChild(labelMotion);
        
        this.labelMotion = labelMotion;

        var motion = new lark.Motion();
        motion.on(lark.Event.CHANGE, this.onMove, this);
        motion.start();
    }

    onMove(e: lark.MotionEvent) {
        this.labelMotion.text =
        "Acceleration (including gravity): \nx:" + e.accelerationIncludingGravity.x
        + ",\ny:" + e.accelerationIncludingGravity.y
        + ",\nz:" + e.accelerationIncludingGravity.z
        + "\nAcceleration: "
        + "\nx:" + e.acceleration.x
        + ",\ny:" + e.acceleration.y
        + ",\nz:" + e.acceleration.z
        + "\nAngular velocity: "
        + "\nalpha:" + e.rotationRate.alpha
        + ",\nbeta:" + e.rotationRate.beta
        + ",\ngamma:" + e.rotationRate.gamma;
    }
}