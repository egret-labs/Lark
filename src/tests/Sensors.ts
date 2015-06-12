
module lark {
    /**
     * @language en_US
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    /**
     * @language zh_CN
     * @version Lark 1.0
     * @version Swan 1.0
     * @platform Web,Native
     */
    export class Sensors extends Sprite {
        /**
         * @language en_US
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * @version Lark 1.0
         * @version Swan 1.0
         * @platform Web,Native
         */
        constructor() {
            super();

            var locationText = new TextField();
            var motionText = new TextField();
            motionText.x = 50;
            motionText.y = 80;
            var orgText = new TextField();
            orgText.x = 50;
            orgText.y = 160;

            this.addChild(locationText);
            this.addChild(motionText);
            this.addChild(orgText);

            var locator = new lark.Geolocation();
            locator.on('change', (e: lark.GeolocationEvent) => locationText.text = e.latitude + "," + e.longitude, this);
            locator.on('ioError', (e: lark.GeolocationEvent) => locationText.text = e.errorType, this);
            locator.start();

            var motion = new lark.Motion();
            motion.on(Event.CHANGE, (e: lark.MotionEvent) => {
                motionText.text = JSON.stringify({
                    x: e.rotationRate.alpha.toFixed(3),
                    y: e.rotationRate.beta.toFixed(3),
                    z: e.rotationRate.gamma.toFixed(3)
                });
            }, this);
            motion.start();

            var ortt = new lark.Orientation();
            ortt.on(Event.CHANGE, (e: lark.OrientationEvent) => {
                orgText.text = JSON.stringify({
                    x: e.alpha.toFixed(3),
                    y: e.beta.toFixed(3),
                    z: e.gamma.toFixed(3)
                });
            }, this);
            ortt.start();
        }
    }
}