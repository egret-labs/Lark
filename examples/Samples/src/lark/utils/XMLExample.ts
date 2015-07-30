/**
 * @language en_US
 * The following example uses the class XMLExample to show how to get attributes of lark.xml.
 */
/**
 * @language zh_CN
 * 以下示例使用 XMLExample 类来说明 lark.xml 的基本属性访问。
 */
class XMLExample extends lark.Sprite {

    public constructor() {
        super();
        var source =
            '<familys xmlns="http://www.w3.org/2005/Atom">'
                + '<family doorNumber="1001">'
                    + '<member relation="father" name="John"/>'
                    + '<member relation="mather" name="Ada"/>'
                    + '<member relation="daughter" name="Lucy"/>'
                + '</family>'
                + '<family doorNumber="1002">'
                    + '<member relation="father" name="Jack"/>'
                    + '<member relation="mather" name="Afra"/>'
                    + '<member relation="son" name="Jom"/>'
                + '</family>'
            + '</familys>';

        var familys = lark.XML.parse(source);
        console.log(familys.name); //familys
        console.log(familys.localName); //familys
        console.log(familys.nodeType); //1
        console.log(familys.namespace); //http://www.w3.org/2005/Atom

        var children = familys.children;
        console.log(children.length); //2

        var family1:lark.XML = <lark.XML><any>children[0];
        console.log(family1.name); //family
        console.log(family1.localName); //family
        console.log(family1.nodeType); //1
        console.log(family1.namespace); //http://www.w3.org/2005/Atom
        console.log(family1.attributes.doorNumber); //1001

        var father1:lark.XML = <lark.XML><any>family1.children[0];
        console.log(father1.name); //member
        console.log(father1.localName); //member
        console.log(father1.nodeType); //1
        console.log(father1.namespace); //http://www.w3.org/2005/Atom
        console.log(father1.attributes.relation); //father
        console.log(father1.attributes.name); //John
    }
}