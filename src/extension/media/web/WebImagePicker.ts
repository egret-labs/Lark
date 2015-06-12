


module lark.web {
    /**
     * @private
     */
    export class WebImagePicker extends EventEmitter implements ImagePicker{

        /**
         * @private
         */
        bitmapDatas:lark.BitmapData[];
        /**
         * @private
         */
        multiple:boolean = false;

        /**
         * @private
         * 
         */
        pick() {
            var input = $createTempFileInput();
            input.multiple = !!this.multiple;
            input.onchange = this.onFileChange;
            input.click();

        }

        /**
         * @private
         */
        private onFileChange = (e) => {
            var target:HTMLInputElement = e.target;
            var count = target.files.length;
            this.bitmapDatas = [];
            for(var i=0;i<count;i++){
                (()=>{
                    var file = target.files[i];
                    var img = new Image();
                    var url:typeof URL = window["URL"] ? window["URL"] : window["webkitURL"];
                    img.src = url.createObjectURL(file);
                    img.onload = (e) => {
                        url.revokeObjectURL(img.src);
                        this.bitmapDatas.push(toBitmapData(img));
                        if(this.bitmapDatas.length == count){
                            this.onGotFiles();
                        }
                    };
                })();
            }
        };

        /**
         * @private
         * 
         */
        private onGotFiles(){
            this.emitWith(Event.CHANGE);
        }
    }

    /**
     * @private
     */
    var $fileInput:HTMLInputElement = null;
    /**
     * @private
     * 
     * @returns 
     */
    function $createTempFileInput():HTMLInputElement {
        if(!$fileInput){
            var input = document.createElement('input');
            input.type = "file";
            input.multiple = true;
            input.accept = "image/*";
            input.style.display = "none";
            document.body.appendChild(input);
            return input;
        }

    }

    lark.ImagePicker = lark.web.WebImagePicker;
}