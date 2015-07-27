/**
 * @language en_US
 * The following example uses the PointExample class to create a number of new Point objects at various x,y coordinates and then uses the console.log() method to output the results of various class methods.
 */
/**
 * @language zh_CN
 * 下面的示例使用 PointExample 类在不同的 x,y 坐标处创建多个新 Point 对象，然后使用 console.log() 方法输出各种类方法的结果。
 */
class PointExample extends lark.Sprite {

    public constructor() {
        super();
        var point1:lark.Point = new lark.Point();
        console.log(point1);  // (x=0, y=0)

        var point2:lark.Point = new lark.Point(6, 8);
        console.log(point2); // (x=6, y=8)

        console.log(lark.Point.distance(point1, point2)); // 10

        var point3:lark.Point = point2.clone();
        console.log(point2.equals(point3)); // true
    }
}