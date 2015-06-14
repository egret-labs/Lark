declare module lark {
    /**
     * @copy lark.Motion
     */
    var Motion: {
        new (): Motion;
    };
    /**
     * @language en_US
     * The Motion class emits events based on activity detected by the device's motion sensor.
     * This data represents the device's movement along a 3-dimensional axis. When the device moves,
     * the sensor detects this movement and emit the CHANGE event. @see lark.MotionEvent
     *
     * @event lark.Event.CHANGE device is moved
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Motion 类从用户设备读取运动状态信息并派发 CHANGE 事件。
     * 当设备移动时，传感器会检测到此移动并返回设备加速度，重力和旋转数据。@see lark.MotionEvent
     * Motion 类提供了 start 和 stop 方法，来启动和停止运动信息检查
     *
     * @event lark.Event.CHANGE 运动状态发生改变
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Motion extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor device movement
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备运动状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor device movement
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备运动状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
    /**
     * @language en_US
     * MotionEvent represents the device's movement
     * Acceleration and accelerationIncludingGravity to represents the device's acceleration
     * RotationRate to represents the device's rotation
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * MotionEvent 类呈现设备运动的具体信息
     * Acceleration 和 accelerationIncludingGravity 呈现设备三个维度的加速度信息
     * RotationRate 呈现设备的旋转状态信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    class MotionEvent extends Event {
        /**
         * @language en_US
         * An object giving the acceleration of the device on the three axis X, Y and Z. Acceleration is expressed in m/s2.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * acceleration 表示设备在 X Y Z 轴方将的加速度信息，单位是  m/s2，不包含重力
         * @version Lark 1.0
         * @platform Web,Native
         */
        acceleration: DeviceAcceleration;
        /**
         * @language en_US
         * An object giving the acceleration of the device on the three axis X, Y and Z with the effect of gravity. Acceleration is expressed in m/s2.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * acceleration 表示设备在 X Y Z 轴方将的加速度信息，单位是  m/s2，包含重力
         * @version Lark 1.0
         * @platform Web,Native
         */
        accelerationIncludingGravity: DeviceAcceleration;
        /**
         * @language en_US
         * An object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is express in degrees per seconds.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * rotationRate 表示设备在 alpha、 beta 和 gamma 三个轴向的角速度信息，单位是 角度每秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        rotationRate: DeviceRotationRate;
    }
    /**
     * @language en_US
     * A DeviceRotationRate object provides information about the rate at which
     * the device is rotating around all three axes.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DeviceRotationRate 提供设备围绕三个轴旋转的角速度信息，单位是 角度/秒
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface DeviceRotationRate {
        /**
         * @language en_US
         * The amount of rotation around the Z axis, in degrees per second.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备绕 Z 轴旋转的角速度信息，单位是 度/秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        alpha: number;
        /**
         * @language en_US
         * The amount of rotation around the X axis, in degrees per second.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备绕 X 轴旋转的角速度信息，单位是 度/秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        beta: number;
        /**
         * @language en_US
         * The amount of rotation around the Y axis, in degrees per second.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备绕 Y 轴旋转的角速度信息，单位是 度/秒
         * @version Lark 1.0
         * @platform Web,Native
         */
        gamma: number;
    }
    /**
     * @language en_US
     * A DeviceAcceleration object provides information about the amount
     * of acceleration the device is experiencing along all three axes.
     * Acceleration is expressed in m/s2.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * DeviceAcceleration 提供设备在三个维度的加速度信息，加速度值的单位是 m/s2
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface DeviceAcceleration {
        /**
         * @language en_US
         * The amount of acceleration along the X axis
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * X 轴方向的加速度值
         * @version Lark 1.0
         * @platform Web,Native
         */
        x: number;
        /**
         * @language en_US
         * The amount of acceleration along the Y axis
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Y 轴方向的加速度值
         * @version Lark 1.0
         * @platform Web,Native
         */
        y: number;
        /**
         * @language en_US
         * The amount of acceleration along the Z axis
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * Z 轴方向的加速度值
         * @version Lark 1.0
         * @platform Web,Native
         */
        z: number;
    }
}
