module lark {
    /**
     * 最小的文本显示对象
     */
    export class TextSpan extends DisplayObject {
        constructor(
            text: string ,
            style:ITextStyle,
            textWidth: number = 0,
            length: number = 0) {
            super();
            this.$renderNode = new lark.player.TextNode(this);
            this.text = text;
            this.style = style;
            this.textWidth = textWidth;
            this.$invalidateContentBounds();
        }


        public text: string;
        public textWidth: number;
        public style: ITextStyle;
        public length: number;

        /**
         * 测量自身占用的矩形区域，如果是容器，还包括所有子项占据的区域。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        $measureContentBounds(bounds: Rectangle): void {
            bounds.setTo(0, 0, this.textWidth, this.style.fontSize);
        }

        /**
         * 获取渲染节点
         */
        $updateRenderNode():void{
            super.$updateRenderNode();
            var node = <lark.player.TextNode>this.$renderNode;
            node.text = this.text;
            node.size = this.style.fontSize;
            node.font = this.style.toFontString(true);
            node.style = this.$toColorString();
            node.textWidth = this.textWidth;
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