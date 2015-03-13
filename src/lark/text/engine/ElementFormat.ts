module lark.text {
    export class ElementFormat extends HashObject {

        fontDescription: FontDescription = null;

        color: number = 0x000000;
        fontSize: number = 12;
        verticalAlign = VerticalAlign.BOTTOM;
        toFontString(): string {
            return this.fontSize + "px " + this.fontDescription.toString();
        }
    }
}