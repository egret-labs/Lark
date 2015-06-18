declare module lark {
    /**
     * @language en_US
     * The Geolocation able to obtain the position of the device.
     * Geolocation will emit CHANGE event when the device's location is changed.
     * It will emit IO_ERROR event if the location request is denied
     * or there is no location service on the device.
     *
     * @event lark.Event.CHANGE The device's location is changed
     * @event lark.Event.IO_ERROR Error occurred while getting the location
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Geolocation 能够从设备的定位服务获取设备的当前位置。
     * 当设备的位置发生改变时 Geolocation 会派发 CHANGE 事件。
     * 当定位请求被拒绝或该设备没有定位服务时 Geolocation 会派发 IO_ERROR 事件。
     *
     * @event lark.Event.CHANGE 设备位置发生改变
     * @event lark.Event.IO_ERROR 获取设备位置时发生错误
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Geolocation extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor the device's location
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备位置信息
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor the device's location
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备位置信息
         * @returns
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
    /**
     * @copy lark.Geolocation
     */
    var Geolocation: {
        new (): Geolocation;
    };
}
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
declare module lark {
    /**
     * @copy lark.Orientation
     */
    var Orientation: {
        new (): Orientation;
    };
    /**
     * @language en_US
     * Orientation monitor the orientation of the device, send CHANGE event when the orientation is changed
     *
     * @event lark.Event.CHANGE device's orientation is changed
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * Orientation 监听设备方向的变化，当方向变化时派发 CHANGE 事件
     * @event lark.Event.CHANGE 设备方向改变时派发
     * @version Lark 1.0
     * @platform Web,Native
     */
    interface Orientation extends IEventEmitter {
        /**
         * @language en_US
         * Start to monitor the device's orientation
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 开始监听设备方向变化
         * @version Lark 1.0
         * @platform Web,Native
         */
        start(): void;
        /**
         * @language en_US
         * Stop monitor the device's orientation
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 停止监听设备方向变化
         * @version Lark 1.0
         * @platform Web,Native
         */
        stop(): void;
    }
}
declare module lark {
    /**
     * @language en_US
     * The GeolocationEvent represents the position and altitude of the device on Earth,
     * and show errors occurred while getting the location of the device.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * GeolocationEvent 提供设备的地理位置信息和获取位置时发生的错误信息
     * @version Lark 1.0
     * @platform Web,Native
     */
    class GeolocationEvent extends Event {
        /**
         * @language en_US
         * The acquisition of the location information failed because of app don't have permission.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 由于用户拒绝访问位置信息，获取位置信息失败
         * @version Lark 1.0
         * @platform Web,Native
         */
        static PERMISSION_DENIED: string;
        /**
         * @language en_US
         * The acquisition of the location failed because at least one internal source of position returned an internal error.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 设备位置服务不可用或者超时等原因没有得到位置信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        static UNAVAILABLE: string;
        /**
         * @language en_US
         * The position's longitude in decimal degrees.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前位置的经度信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        longitude: number;
        /**
         * @language en_US
         * The position's latitude in decimal degrees.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前位置的纬度信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        latitude: number;
        /**
         * @language en_US
         * The velocity of the device in meters per second. This value can be null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当前设备的速度 单位是 米/秒，这个值可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        speed: number;
        /**
         * @language en_US
         * The direction in which the device is traveling. This value, specified in degrees,
         * indicates how far off from heading due north the device is. 0 degrees represents
         * true true north, and the direction is determined clockwise (which means that east
         * is 90 degrees and west is 270 degrees). If speed is 0, heading is NaN. If the
         * device is unable to provide heading information, this value is null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备正在前进的方向，单位是度。heading 表示从正北开始顺时针旋转到当前方向的角度，
         * 比如正东是 90 度，正西是 270 度，如果 speed 是 0，heading 为 NaN。
         * @version Lark 1.0
         * @platform Web,Native
         */
        heading: number;
        /**
         * @language en_US
         * The position's altitude in metres, relative to sea level.
         * This value can be null if the implementation cannot provide the data.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该位置的海拔信息，如果设备没有实现这个属性时，这个值有可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        altitude: number;
        /**
         * @language en_US
         * The accuracy of the latitude and longitude properties, expressed in meters.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 经纬度的准确性，单位是米
         * @version Lark 1.0
         * @platform Web,Native
         */
        accuracy: number;
        /**
         * @language en_US
         * The accuracy of the altitude expressed in meters. This value can be null.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 该位置海拔信息的准确性，单位是米，这个值有可能为 null
         * @version Lark 1.0
         * @platform Web,Native
         */
        altitudeAccuracy: number;
        /**
         * @language en_US
         * The type of error occurred while get the location of the device. The value could be:
         * @see lark.GeolocationEvent.PERMISSION_DENIED
         * @see lark.GeolocationEvent.UNAVAILABLE
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取位置信息错误时的错误类型。值可能为：
         * @see lark.GeolocationEvent.PERMISSION_DENIED
         * @see lark.GeolocationEvent.UNAVAILABLE
         *
         * @version Lark 1.0
         * @platform Web,Native
         */
        errorType: string;
        /**
         * @language en_US
         * The error message occurred while get the location of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 获取位置信息错误的错误信息
         * @version Lark 1.0
         * @platform Web,Native
         */
        errorMessage: string;
    }
}
declare module lark {
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
}
declare module lark {
    /**
     * @language en_US
     * The OrientationEvent provides information from the physical orientation of the device.
     * Note: Currently, Browsers on the iOS and Android does not handle the coordinates the same way.
     * Take care about this while using them.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * OrientationEvent 提供设备的方向信息
     * 注意: 目前各个浏览器和操作系统处理方向的方式不完全相同，请根据使用场景做相应的校正，
     * 比如使用两次方向数据的变化而不是直接使用方向的值
     * @version Lark 1.0
     * @platform Web,Native
     */
    class OrientationEvent extends Event {
        /**
         * @language en_US
         * A number representing the motion of the device around the z axis,
         * express in degrees with values ranging from 0 to 360
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360
         * @version Lark 1.0
         * @platform Web,Native
         */
        alpha: number;
        /**
         * @language en_US
         * A number representing the motion of the device around the x axis,
         * express in degrees with values ranging from -180 to 180.
         * This represents a front to back motion of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.
         * 这个值表示设备从前向后的旋转状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        beta: number;
        /**
         * @language en_US
         * A number representing the motion of the device around the y axis,
         * express in degrees with values ranging from -90 to 90.
         * This represents a left to right motion of the device.
         * @version Lark 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.
         * 这个值表示设备从前向后的旋转状态
         * @version Lark 1.0
         * @platform Web,Native
         */
        gamma: number;
    }
}
declare module lark {
}
declare module lark {
}
