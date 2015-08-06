module lark {

    export class AnimationData extends lark.LarkObject {

        $bitmapDatas:BitmapData[] = [];
        $xs:number[] = [];
        $ys:number[] = [];
        $clipRects:Rectangle[] = [];

        public constructor() {
            super();
        }

        public get frameTotals():number {
            return this.$bitmapDatas.length;
        }

        public create():Animation {
            return new Animation(this.$bitmapDatas,this.$xs,this.$ys,this.$clipRects);
        }
    }
}