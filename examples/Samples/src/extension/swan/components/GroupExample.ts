class GroupExample extends lark.Sprite {

    public constructor() {
        super();

        var exml =
            '<s:Group xmlns:s="http://ns.egret.com/swan">'
                + '<s:layout>'
                 + '<s:HorizontalLayout gap="20"/>'
                + '</s:layout>'
                + '<s:Group>'
                    + '<s:layout>'
                        + '<s:VerticalLayout gap="20"/>'
                    + '</s:layout>'
                    + '<s:Label id="name" text="北京"/>'
                    + '<s:Label id="weather" text="晴天"/>'
                    + '<s:Image id="icon" source="resources/sunny.png"/>'
                + '</s:Group>'
                + '<s:Group>'
                    + '<s:layout>'
                        + '<s:VerticalLayout gap="20"/>'
                    + '</s:layout>'
                    + '<s:Label id="name" text="上海"/>'
                    + '<s:Label id="weather" text="多云"/>'
                    + '<s:Image id="icon" source="resources/cloudy.png"/>'
                + '</s:Group>'
            + '</s:Group>'

        var clazz = EXML.parse(exml);
        var group:swan.Group = new clazz();
        this.addChild(group);
    }
}