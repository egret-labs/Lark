module lark.text {
    /**
     * 最小的文本显示对象
     */
    export class TextSpan extends DisplayObject {
        constructor(
            text: string = null,
            fontString: string = "sans-serif",
            textWidth: number = 0,
            size: number = 12,
            color: number = 0x000000,
            length: number = 0) {
            super();
            this.$renderNode = new lark.player.TextNode(this);
            this.text = text;
            if (!fontString)
                fontString = "sans-serif";
            this.fontString = fontString;
            this.textWidth = textWidth;
            this.size = +size|0;
            this.color = +color|0;
            this.length = +length|0;
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

        /**
         * 获取渲染节点
         */
        $updateRenderNode():void{
            super.$updateRenderNode();
            var node = <lark.player.TextNode>this.$renderNode;
            node.text = this.text;
            node.size = this.size;
            node.font = this.fontString;
            node.style = this.$toColorString();
            node.textWidth = this.textWidth;
        }

        $toFontString() {
            return this.size + "px " + this.fontString;
        }

        $toColorString() {
            var value = this.color;
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