class Sensors extends lark.Sprite{
    labelGps:lark.TextField;
    labelMotion:lark.TextField;
    labelOrientation:lark.TextField;
    constructor() {
        super();
        var labelGps = new lark.TextField();
        labelGps.y = 50;
        labelGps.x = 50;
        this.addChild(labelGps);

        var labelMotion = new lark.TextField();
        labelMotion.y = 150;
        labelMotion.x = 50;
        this.addChild(labelMotion);

        var labelOrientation = new lark.TextField();
        labelOrientation.y = 300;
        labelOrientation.x = 50;
        this.addChild(labelOrientation);

        this.labelGps = labelGps;
        this.labelMotion = labelMotion;
        this.labelOrientation = labelOrientation;

        var gps = new lark.Geolocation();
        gps.on(lark.Event.CHANGE,this.onGotLocation,this);
        gps.start();

        var motion = new lark.Motion();
        motion.on(lark.Event.CHANGE,this.onMove,this);
        motion.start();

        var orientation = new lark.Orientation();
        orientation.on(lark.Event.CHANGE,this.onOrientation,this);
        orientation.start();
    }

    onGotLocation(e:lark.GeolocationEvent){
        this.labelGps.text = "当前位置:"+e.latitude.toFixed(1)+","+e.longitude.toFixed(1);
    }

    onMove(e:lark.MotionEvent){
        this.labelMotion.text =
            "加速度: \nx:"+e.accelerationIncludingGravity.x
            +",\ny:"+e.accelerationIncludingGravity.y
            +",\nz:"+e.accelerationIncludingGravity.z;
    }

    onOrientation(e:lark.OrientationEvent){
        this.labelOrientation.text =
            "方向: \nalpha:"+e.alpha
            +",\nbeta:"+e.beta
            +",\ngamma:"+e.gamma;
    }
}