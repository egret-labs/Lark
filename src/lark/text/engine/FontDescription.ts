module lark.text {
    export class FontDescription extends HashObject {
        public constructor(fontName: string = "sans-serif", italic:boolean = false, bold: boolean = false) {
            super();
            this.fontName = fontName;
            this.italic = italic;
            this.bold = bold;
        }

        public fontName: string;
        /**
        * 表示字体是否是斜体 FontDescription.NORMAL or FontDescription.ITALIC
        */
        public italic: boolean;
        /**
        * 表示字体是否是粗体 FontDescription.NORMAL or FontDescription.BOLD
        */
        public bold: boolean;
        toString(): string {
            return (this.fontName || "sans-serif") + " " + (this.italic ? "italic" : "") + " " + (this.bold ? "bold" : "");
        }

        public equals(other: FontDescription) {
            return other == this || other.bold == this.bold &&
                other.fontName == this.fontName &&
                other.italic == this.italic;
        }
    }
}