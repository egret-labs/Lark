

module lark {
    export class ImagePickerTest extends lark.Sprite {
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