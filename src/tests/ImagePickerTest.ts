

module lark {
    export class ImagePickerTest extends lark.Sprite {
        constructor() {
            super();

            var button = new TextField("Pick a Image");
            button.x = 100;
            button.y = 100;

            var picker = new ImagePicker();

            button.on(TouchEvent.TOUCH_END, () => {
                setTimeout(() => picker.pick(), 200);
            }, this);

            this.addChild(button);
        }
    }
}