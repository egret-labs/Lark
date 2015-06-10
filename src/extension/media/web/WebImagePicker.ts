


module lark.web {
    export class WebImagePicker extends EventEmitter {
        pick() {
            var input = document.createElement('input');
            input.type = "file";
            input.accept = "image/*";
            input.style.display = "none";
            document.body.appendChild(input);
            input.click();
        }
    }


    lark.ImagePicker = lark.web.WebImagePicker;
}