
/**
 * @language en_US
 * The following example shows how to extend swan.Range to a instrumentation style Component
 */
/**
 * @language zh_CN
 * 下面的例子显示了如何实现一个仪表效果的 swan.Range 组件
 */
class RangeViewer extends swan.Range {
    pointer: swan.Image;
    constructor() {
        super();
        this.skinName =
        `<s:Skin class="skins.RangeViewerSkin" minWidth="30" minHeight="18" xmlns:s="http://ns.egret.com/swan">
	        <s:Image x="0" y="0" source="resources/range-background.png"/>
	        <s:Image id="pointer" x="60" y="60" source="resources/pointer.png"/>
        </s:Skin>`;
    }
    protected updateSkinDisplayList() {
        var range = this.maximum - this.minimum;
        var rate = (this.value - this.minimum) / range;
        var angle = -150 + rate * 120;
        this.pointer.rotation = angle;
    }
}

class RangeExample extends swan.Group {
    constructor() {
        super();
        
        var rangeViewer = new RangeViewer();
        rangeViewer.minimum = 0;
        rangeViewer.maximum = 120;
        rangeViewer.x = 50;
        rangeViewer.y = 50;

        var timer = new lark.Timer(1000);
        timer.on(lark.TimerEvent.TIMER, e=> rangeViewer.value = Math.random() * 120, this);
        timer.start();

        this.addChild(rangeViewer);
    }
}
