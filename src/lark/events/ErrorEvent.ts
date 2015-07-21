module lark {
    export class ErrorEvent extends Event {

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
        public static PERMISSION_DENIED: string = "permissionDenied";
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
        public static UNAVAILABLE: string = "unavailable";
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
