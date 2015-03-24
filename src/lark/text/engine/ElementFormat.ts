module lark.text {
    //export class ElementFormat extends HashObject {

    //    fontDescription: FontDescription = null;

    //    color: number = 0x000000;
    //    fontSize: number = 12;
    //    verticalAlign = VerticalAlign.BOTTOM;
    //    float: string = TextFloat.NONE;
    //    toFontString(): string {
    //        return this.fontSize + "px " + this.fontDescription.toString();
    //    }

    //    public equals(other: ElementFormat) {
    //        return other == this || other.color == this.color &&
    //            other.fontDescription.equals(this.fontDescription) &&
    //            other.fontSize == this.fontSize &&
    //            other.verticalAlign == this.verticalAlign;
    //    }
    //}

    export type ElementFormat = ITextStyle;
}