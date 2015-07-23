/**
 * @language en_US
 * The following example uses the RectangleExample class to create three new Rectangle objects at various x,y coordinates and with various heights and widths and then uses the console.log() method to confirm that the Rectangle instances were successfully created.
 */
/**
 * @language zh_CN
 * 下面的示例使用 RectangleExample 类以不同的高度和宽度在不同的 x , y 坐标处创建三个新的 Rectangle 对象，随后使用 console.log() 方法确认是否成功创建了 Rectangle 实例。
 */
class RectangleExample extends lark.Sprite {

    public constructor() {
        super();
        var firstRect:lark.Rectangle = new lark.Rectangle();
        console.log(firstRect);  // (x=0, y=0, w=0, h=0)
        var secondRect:lark.Rectangle = new lark.Rectangle(1, 3, 11, 13);
        console.log(secondRect); // (x=1, y=3, w=11, h=13)
        var thirdRect:lark.Rectangle = new lark.Rectangle(5, 8, 17, 19);
        console.log(thirdRect);  // (x=5, y=8, w=17, h=19)
        var isContained:lark.Rectangle = secondRect.intersection(thirdRect);
        console.log(isContained); // Rectangle(x=5, y=8, w=7, h=8)
    }
}