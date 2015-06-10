

module lark {

    /**
     * @copy lark.Orientation
     */
    export var Orientation: { new (): Orientation } = null;


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
    export interface Orientation extends IEventEmitter {
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

    /**
     * @language en_US
     * The OrientationEvent provides information from the physical orientation of the device.
     * [Warning] Currently, Browsers on the iOS and Android does not handle the coordinates the same way.
     * Take care about this while using them.
     * @version Lark 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * OrientationEvent 提供设备的方向信息
     * [警告] 目前各个浏览器和操作系统处理方向的方式不完全相同，请根据使用场景做相应的校正，
     * 比如使用两次方向数据的变化而不是直接使用方向的值
     * @version Lark 1.0
     * @platform Web,Native
     */
    export class OrientationEvent extends Event {
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
        public alpha: number;
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
        public beta: number;
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
        public gamma: number;
    }
}