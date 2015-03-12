module lark.text {
    export class GroupElement extends ContentElement {
        constructor(elements:Array<ContentElement>) {
            super();
            this._elements = elements;
        }

        protected _elements: Array<ContentElement> = null;
        public setElements(value: Array<ContentElement>) {
            this._elements = value;
        }

        public $createSpan(width: number, isFirstSpan: boolean = false, startIndex: number = 0): CreateSpanResult {
            var elementLength = 0;
            var startElementIndex = -1;
            var indexInStartElement = 0;
            this._elements.some((it, i) => {
                elementLength += it.length;
                if (elementLength > startIndex) {
                    startElementIndex = i;
                    indexInStartElement = it.length - (elementLength - startIndex);
                    return true;
                }
            });

            //startIndex 大于 总长度，不能再创建新 span
            if (startElementIndex == -1) {
                return {
                    span: null,
                    ended: true,
                    length: 0,
                    full: false
                };
            }

            for (var i = startElementIndex; i < this._elements.length; i++) {
                var content = this._elements[startElementIndex];
                var result = content.$createSpan(width, isFirstSpan, indexInStartElement);

                //得到 span 返回结果
                if (result.span != null) {
                    break;
                }

                //没有生成 span 也没有结束，说明下一个元素过宽，需要换行
                if (!result.ended) {
                    return result;
                }

                //元素结束，而且是最后一个元素，虽然没有生成 span，但是已经到达结尾，所以也要结束
                if (result.ended && i == this._elements.length - 1)
                    return result;
            }

            return {
                span: result.span,
                full: result.full,
                ended: result.ended && i == this._elements.length - 1,
                length: result.length
            };
        }
    }
}