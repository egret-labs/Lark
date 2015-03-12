module lark.text {
    export class FontDescription extends HashObject {
        public static BOLD: string = "bold";
        public static ITALIC: string = "italic";
        public static NORMAL: string = "";

        public constructor(
            public fontName: string = "",
            /**
            * 表示字体是否是斜体 FontDescription.NORMAL or FontDescription.ITALIC
            */
            public italic:boolean = false,
            /**
            * 表示字体是否是粗体 FontDescription.NORMAL or FontDescription.BOLD
            */
            public bold: boolean = false) {
            super();
        }
        
        toString(): string {
            return this.fontName + " " + (this.italic ? FontDescription.ITALIC : "") + " " + (this.bold ? FontDescription.BOLD : "");
        }
    }
}