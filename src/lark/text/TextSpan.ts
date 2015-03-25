module lark {
    /**
     * 最小的文本显示对象
     */
    export class TextSpan extends HashObject {
        constructor(
            text: string ,
            style:ITextStyle,
            textWidth: number ,
            length: number ,
            x: number,
            y:number) {
            super();
            this.text = text;
            this.style = style;
            this.textWidth = textWidth;
            this.x = +x || 0;
            this.y = +y || 0;
        }


        public text: string;
        public x: number;
        public y: number;
        public textWidth: number;
        public style: ITextStyle;
        public length: number;

        public get height() {
            return this.style.fontSize * 1.2;
        }

        public get width() {
            return this.textWidth;
        }

        $toFontString(includeSize = false) {
            return this.style.toFontString(includeSize);
        }

        $toColorString() {
            var value = this.style.color;
            if(value < 0)
                value = 0;
            if(value > 16777215)
                value = 16777215;
            var color:string = value.toString(16).toUpperCase();
            while(color.length<6){
                color = "0"+color;
            }
            return "#"+color;
        }
    }
}