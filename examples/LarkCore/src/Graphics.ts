class Graphics extends lark.Sprite {
    constructor(){
        super();
        
        var y = 50;
        var shape = new lark.Shape();
        var graphics = shape.graphics;
        graphics.lineWidth = 10;

        graphics.strokeStyle="#990000";
        graphics.beginPath();
        graphics.moveTo( 200, 200 );
        graphics.bezierCurveTo( 175, 125, 325, 275 , 300, 200 );
        graphics.stroke();
        
        this.addChild( shape );
        return;
        
        graphics.beginPath();
        graphics.moveTo(50,y);
        graphics.lineTo(150,y);
        graphics.stroke();
        
        graphics.beginPath();
        graphics.moveTo(200,y);
        graphics.lineTo(300,y);
        graphics.strokeStyle="#0022FF";
        graphics.stroke();
        
        graphics.lineCap = "round";
        graphics.beginPath();
        graphics.moveTo(350,y);
        graphics.lineTo(450,y);
        graphics.strokeStyle="#00CC22";
        graphics.stroke();
        
        
        
        y+=100;
        graphics.strokeStyle="#000000";
        graphics.beginPath();
        graphics.moveTo(50,y);
        graphics.arc(100,y,50,Math.PI,Math.PI*2);
        graphics.stroke();
        
        graphics.beginPath();
        graphics.moveTo(200,y);
        graphics.bezierCurveTo(180,50,280,200,300,y);
        graphics.stroke();
                
        graphics.strokeStyle="#00CC22";
        graphics.beginPath();
        graphics.moveTo(350,y);
        graphics.quadraticCurveTo(400,50,450,y);
        graphics.stroke();
        
        
        
        y+=100;
        graphics.strokeStyle="#000000";
        graphics.beginPath();
        graphics.moveTo(50,y);
        graphics.lineTo(100,y+50);
        graphics.arc(100,y,50,0,Math.PI*0.5,true);
        graphics.bezierCurveTo(150,y-50,280,200,300,y);
        graphics.quadraticCurveTo(400,y+150,450,y);
        graphics.stroke();
        
        
        y+=150;
        graphics.beginPath();
        graphics.fillStyle="#000000";
        graphics.fillRect(50,y,100,50);
        
        graphics.beginPath();
        graphics.fillStyle="#0033DD";
        graphics.arc(250, y+25, 50, 0, 2 * Math.PI, false);
        graphics.fill();
        
        graphics.beginPath();
        graphics.arc(400,y+10,50,0,Math.PI,true);
        graphics.closePath();
        graphics.fillStyle="#000000";
        graphics.fill();
        graphics.strokeStyle="#00CC22";
        graphics.stroke();
        
        
        y+=100;
        
        var mask = new lark.Shape();
        var masked = new lark.Shape();
        
        mask.x = 50;
        mask.y = y;
        mask.graphics.beginPath();
        mask.graphics.arc(50, 70, 70, 0, 2 * Math.PI);
        mask.graphics.fill();
        
        masked.graphics.beginPath();
        masked.graphics.fillStyle="#DD0000";
        masked.graphics.fillRect(0,0,200,50);
        masked.graphics.fillStyle="#00DD00";
        masked.graphics.fillRect(0,50,200,50);
        masked.graphics.fillStyle="#0000DD";
        masked.graphics.fillRect(0,100,200,50);
        
        masked.mask = mask;
        masked.y = y;
        
        
        var hollowMask = new lark.Shape();
        var hollowMasked = new lark.Shape();
        
        hollowMask.x = 300;
        hollowMask.y = y;
        
        //
        //  为了画一个镂空的矩形，要保证外圈的绘制方向和内部镂空图形的绘制方向相反
        //
        //       →→→→→→→→→→→→→→
        //       ↑      ←     ↓
        //       ↑   ↓     ↑  ↓
        //       ↑      →     ↓
        //       ←←←←←←←←←←←←←←
        //
        hollowMask.graphics.beginPath();
        hollowMask.graphics.moveTo(0,0);
        hollowMask.graphics.lineTo(200,0);
        hollowMask.graphics.lineTo(200,150);
        hollowMask.graphics.lineTo(0,150);
        hollowMask.graphics.lineTo(0,0);
        hollowMask.graphics.arc(100, 75, 60, 0, 2 * Math.PI,true);
        hollowMask.graphics.fill();
        
        hollowMasked.graphics.beginPath();
        hollowMasked.graphics.fillStyle="#DD0000";
        hollowMasked.graphics.fillRect(0,0,200,50);
        hollowMasked.graphics.fillStyle="#00DD00";
        hollowMasked.graphics.fillRect(0,50,200,50);
        hollowMasked.graphics.fillStyle="#0000DD";
        hollowMasked.graphics.fillRect(0,100,200,50);
        
        hollowMasked.mask = hollowMask;
        hollowMasked.x = 300;
        hollowMasked.y = y;
        
        
        
        this.addChild(shape);
        this.addChild(mask);
        this.addChild(masked);
        this.addChild(hollowMask);
        this.addChild(hollowMasked);
        
        
    }
}