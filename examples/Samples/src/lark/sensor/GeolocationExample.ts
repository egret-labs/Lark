/**
 * @language en_US
 * The following example uses the lark.Geolocation class to get the GEO location of the device.
 */
/**
 * @language zh_CN
 * 下面的示例使用 lark.Geolocation 来获取设备的地理位置
 */
class GeolocationExample extends lark.Sprite {
    labelGps: lark.TextField;
    constructor() {
        super();
        var labelGps = new lark.TextField();
        labelGps.y = 50;
        labelGps.x = 50;
        labelGps.textColor = 0xFFFFFF;
        this.addChild(labelGps);
        

        this.labelGps = labelGps;

        var gps = new lark.Geolocation();
        gps.on(lark.Event.CHANGE, this.onGotLocation, this);
        gps.start();
        
    }

    onGotLocation(e: lark.GeolocationEvent) {
        this.labelGps.text = "当前位置:" + e.latitude.toFixed(1) + "," + e.longitude.toFixed(1)
        + "\n位置精度：" + e.accuracy
        + "\n海拔：" + e.altitude
        + "\n海拔精度：" + e.altitudeAccuracy
        + "\n速度：" + e.speed
        + "\n前进方向：" + e.heading
    }
}