

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
    export class ImagePickerTest extends lark.Sprite {
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
        constructor() {
            super();

            var button = new TextField("Pick a Image");
            button.x = 100;
            button.y = 100;

            var picker = new ImagePicker();
            picker.multiple = false;
            picker.on(Event.CHANGE,()=>{
                var datas = picker.bitmapDatas;

                datas.forEach((bmp,i)=>{
                    var bitmap = new Bitmap(bmp);
                    bitmap.y = i*200+140;
                    bitmap.height = 200;
                    bitmap.width = 300;
                    this.addChild(bitmap);
                })

            },this);
            button.on(TouchEvent.TOUCH_END, () => {
                setTimeout(() => picker.pick(), 200);
            }, this);

            this.addChild(button);
        }
    }
}