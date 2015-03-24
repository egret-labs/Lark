interface ITextStyle {
    fontFamily?: string;
    fontSize?: number;
    bold?: boolean;
    italic?: boolean;
    color?: number;
    float?: string;
    verticalAlign?: lark.VerticalAlign;
    href?: string;
    target?: string;
}

interface IRichTextNode {
    text?: string;
    style?: ITextStyle;
    width?: number;
    height?: number;
    src?: string;
}
