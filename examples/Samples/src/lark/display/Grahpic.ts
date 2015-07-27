/**
 * @language en_US
 * The following example uses the class Graphics to show how to create the vector shape
 */
/**
 * @language zh_CN
 * 以下示例使用 Graphics 类来演示如何绘制矢量图形
 */
class Graphics extends lark.Sprite {
    public constructor() {
        super();

        this.doDrawCircle();
        this.doDrawRect();
        this.doDrawRoundRect();
        this.doDrawLine();
        this.doDrawnRadian();
    }

    private size: number = 80;
    private bgColor: number = 0xFFCC00;
    private borderColor: number = 0xFF0000;
    private borderSize: number = 4;
    //划线
    private doDrawLine(): void {
        var child = new lark.Shape();
        child.graphics.strokeStyle = this.borderColor;
        child.graphics.moveTo(10, 10);
        child.graphics.lineTo(50, 150);
        child.graphics.stroke();
        this.addChild(child);
        child.x = 200;
    }
    //画弧线
    private doDrawnRadian(): void {
        var child = new lark.Shape();
        child.graphics.strokeStyle = this.borderColor;
        child.graphics.beginPath();
        child.graphics.moveTo(50, 0);
        child.graphics.lineTo(100, 50);
        child.graphics.arc(100, 0, 50, 0, Math.PI * 0.5, true);
        child.graphics.bezierCurveTo(150, -50, 280, 200, 300, 0);
        child.graphics.quadraticCurveTo(400, 150, 450, 0);
        child.graphics.stroke();
        child.x = 200;
        child.y = 200;
        this.addChild(child);
    }


    //画圆
    private doDrawCircle(): void {
        var child = new lark.Shape();
        var halfSize = Math.round(this.size / 2);
        child.graphics.fillStyle = this.bgColor;
        child.graphics.strokeStyle = this.borderColor;
        child.graphics.lineWidth = this.borderSize;
        child.graphics.arc(0, 0, halfSize, 0, Math.PI * 2, false);
        child.graphics.fill();
        child.graphics.stroke();
        child.x = 50 + halfSize;
        child.y = 50;
        this.addChild(child);
    }

    //画矩形
    private doDrawRect(): void {
        var child = new lark.Shape();
        child.graphics.fillStyle = this.bgColor;
        child.graphics.strokeStyle = this.borderColor;
        child.graphics.lineWidth = this.borderSize;
        child.graphics.fillRect(0, 0, this.size, this.size);
        child.graphics.strokeRect(0, 0, this.size, this.size);
        child.x = 50;
        child.y = 100;
        this.addChild(child);
    }

    //画圆角矩形
    private doDrawRoundRect(): void {
        var r = this.size / 8;
        var child = new lark.Shape();
        child.graphics.fillStyle = this.bgColor;
        child.graphics.strokeStyle = this.borderColor;
        child.graphics.lineWidth = this.borderSize;
        child.graphics.beginPath();
        child.graphics.moveTo(r, 0);
        child.graphics.arcTo(this.size, 0, this.size, r, r);
        child.graphics.arcTo(this.size, this.size, this.size - r, this.size, r);
        child.graphics.arcTo(0, this.size, 0, this.size - r, r);
        child.graphics.arcTo(0, 0, r, 0, r);
        child.graphics.fill();
        child.graphics.closePath();
        child.graphics.stroke();
        child.x = 50;
        child.y = 200;
        this.addChild(child);
    }
}
