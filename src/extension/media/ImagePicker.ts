



module lark {
    /**
     * @language en_US
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export interface ImagePicker extends EventEmitter {
        /**
         * @language en_US
         * 
         * @returns 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 
         * @returns 
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        pick(): void;
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        multiple:boolean;
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        bitmapDatas:lark.BitmapData[];
    }

    /**
     * @language en_US
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export var ImagePicker: {
        new (): ImagePicker;
    }
}