module lark.text {
    /**
     * 最小的文本显示对象
     */
    export class TextSpan extends DisplayObject implements ISpan {
        constructor(

            public text: string = null,
            public fontName: string = "",
            public textWidth: number = 0,
            public bold: boolean = false,
            public italic: boolean = false,
            public size: number = 12,
            public color: number = 0x000000,
            public length: number = 0) {
            super();
            this.$invalidateContentBounds();
        }

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
            return this.size + "px " + this.fontName + " " + (this.italic ? FontDescription.ITALIC : "") + " " + (this.bold ? FontDescription.BOLD : "");
        }

        $toColorString() {
            return lark.toColorString(this.color);
        }
    }
}