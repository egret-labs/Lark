module lark.text {
    /**
     * 最小的文本显示对象
     */
    export class TextSpan extends DisplayObject implements ISpan {
        constructor(
            text: string = null,
            fontString: string = "sans-serif",
            textWidth: number = 0,
            size: number = 12,
            color: number = 0x000000,
            length: number = 0) {
            super();
            this.text = text;
            if (!fontString)
                fontString = "sans-serif";
            this.fontString = fontString;
            this.textWidth = textWidth;
            this.size = size;
            this.color = color;
            this.length = length;
            this.$invalidateContentBounds();
        }


        public text: string;
        public fontString: string;
        public textWidth: number;
        public size: number;
        public color: number;
        public length: number;

        /**
         * 测量自身占用的矩形区域，如果是容器，还包括所有子项占据的区域。
         * @param bounds 测量结果存储在这个矩形对象内
         */
        $measureContentBounds(bounds: Rectangle): void {
            bounds.setTo(0, 0, this.textWidth, this.size);
        }

        private _renderNode:TextNode = new TextNode();

        /**
         * 获取渲染节点
         */
        $getRenderNode():RenderNode{
            var node = this._renderNode;
            node.update(this);
            node.text = this.text;
            node.size = this.size;
            node.font = this.$toFontString();
            node.style = this.$toColorString();
            node.textWidth = this.textWidth;
            return node;
        }

        $toFontString() {
            return this.size + "px " + this.fontString;
        }

        $toColorString() {
            return lark.toColorString(this.color);
        }
    }
}