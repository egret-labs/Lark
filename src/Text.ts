//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module lark {
    export class Text extends DisplayObject {

        public constructor() {
            super();
        }

    }
}

function resize() {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("lark_canvas");
    var context = canvas.getContext("2d");
    setTimeout(() => context.fillText("Hello Text!", canvas.width / 2, canvas.height / 2 + 200), 300);
}


function load() {
    resize();


    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("lark_canvas");
    var context = canvas.getContext("2d");


    var count = 1000;
    var width = 0;


    var demoText = 'TextFormat(font:String=null,size:Object=null,color:Object=null,bold:Object=null,italic:Object=null,underline:Object=null,url:String=null,target:String=null,align:String=null,leftMargin:Object=null,rightMargin:Object=null,indent:Object=null,leading:Object=null)创建一个具有指定属性的TextFormat对象。TextFormat属性详细信息align属性align:String语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示段落的对齐方式。有效值为TextFormatAlign常数。默认值为TextFormatAlign.LEFT。实现publicfunctiongetalign():Stringpublicfunctionsetalign(value:String):void引发ArgumentError—指定的align不是flash.text.TextFormatAlign的成员。相关API元素flash.text.TextFormatAlign示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。blockIndent属性blockIndent:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示块缩进，以像素为单位。块缩进应用于整个文本块，即文本的所有行。而普通缩进(TextFormat.indent)只影响各段的第一行。如果此属性为null，则TextFormat对象不指定块缩进（块缩进为0）。实现publicfunctiongetblockIndent():ObjectpublicfunctionsetblockIndent(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。bold属性bold:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4指定文本是否为粗体字。默认值为null，这意味着不使用粗体字。如果值为true，则文本为粗体字。实现publicfunctiongetbold():Objectpublicfunctionsetbold(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。bullet属性bullet:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示文本为带项目符号的列表的一部分。在带项目符号的列表中，文本的各段都是缩进的。项目符号显示在各段第一行的左侧。默认值为null，这意味着不使用带项目符号的列表。实现publicfunctiongetbullet():Objectpublicfunctionsetbullet(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。color属性color:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示文本的颜色。包含三个8位RGB颜色成分的数字；例如，0xFF0000为红色，0x00FF00为绿色。默认值为null，这意味着FlashPlayer使用黑色(0x000000)。实现publicfunctiongetcolor():Objectpublicfunctionsetcolor(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。font属性font:String语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4使用此文本格式的文本的字体名称，以字符串形式表示。默认值为null，这意味着FlashPlayer对文本使用TimesNewRoman字体。实现publicfunctiongetfont():Stringpublicfunctionsetfont(value:String):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。indent属性indent:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示从左边距到段落中第一个字符的缩进。默认值为null，它表示不使用缩进。实现publicfunctiongetindent():Objectpublicfunctionsetindent(value:Object):void相关API元素flash.text.TextFormat.blockIndent示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。italic属性italic:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示使用此文本格式的文本是否为斜体。默认值为null，这意味着不使用斜体。实现publicfunctiongetitalic():Objectpublicfunctionsetitalic(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。kerning属性kerning:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.一个布尔值，表示是启用(true)还是禁用(false)字距调整。通过字距调整可为了提高可读性而调整某些字符对之间的像素，并且只在需要时（如使用大字体标题时）使用字距调整。仅嵌入字体支持字距调整。某些字体（如宋体）和等宽字体（如CourierNew）不支持字距调整。默认值为null，这意味着没有启用字距调整。实现publicfunctiongetkerning():Objectpublicfunctionsetkerning(value:Object):voidleading属性leading:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4一个整数，表示行与行之间的垂直间距（称为前导）量。默认值为null，它表示使用的前导量为0。实现publicfunctiongetleading():Objectpublicfunctionsetleading(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。leftMargin属性leftMargin:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4段落的左边距，以像素为单位。默认值为null，它表示左边距为0像素。实现publicfunctiongetleftMargin():ObjectpublicfunctionsetleftMargin(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。letterSpacing属性letterSpacing:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.一个数字，表示在所有字符之间均匀分配的空间量。该值指定在每个字符之后添加到进距的像素数。默认值为null，这意味着使用的字母间距为0个像素。可以使用十进制值，如1.75。实现publicfunctiongetletterSpacing():ObjectpublicfunctionsetletterSpacing(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。rightMargin属性rightMargin:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4段落的右边距，以像素为单位。默认值为null，它表示右边距为0像素。实现publicfunctiongetrightMargin():ObjectpublicfunctionsetrightMargin(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。size属性size:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4使用此文本格式的文本的大小（以像素为单位）。默认值为null，这意味着使用的大小为12。实现publicfunctiongetsize():Objectpublicfunctionsetsize(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。tabStops属性tabStops:Array语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4将自定义Tab停靠位指定为一个非负整数的数组。指定每个Tab停靠位，以像素为单位。如果没有指定自定义Tab停靠位(null)，则默认的Tab停靠位为4（平均字符宽度）。实现publicfunctiongettabStops():ArraypublicfunctionsettabStops(value:Array):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。target属性target:String语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示显示超链接的目标窗口。如果目标窗口为空字符串，则文本显示在默认目标窗口_self中。可以选择自定义名称或以下四种名称中的一个：_self指定当前窗口中的当前帧，_blank指定一个新窗口，_parent指定当前帧的父级，_top指定当前窗口中的顶级帧。如果TextFormat.url属性是空字符串或null，则虽然您可以获取或设置此属性，但该属性不起作用。实现publicfunctiongettarget():Stringpublicfunctionsettarget(value:String):void相关API元素flash.text.TextFormat.url示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。underline属性underline:Object语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示使用此文本格式的文本是带下划线(true)还是不带下划线(false)。此下划线类似于用<U>标签生成的下划线，但后者不是真正的下划线，因为它不能正确地跳过下行字符。默认值为null，它表示不使用下划线。实现publicfunctiongetunderline():Objectpublicfunctionsetunderline(value:Object):void示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。url属性url:String语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4表示使用此文本格式的文本的目标URL。如果url属性为空字符串，则文本没有超链接。默认值为null，它表示文本没有超链接。注意：必须使用htmlText属性对具有指定文本格式的文本进行设置以使超链接起作用。实现publicfunctiongeturl():Stringpublicfunctionseturl(value:String):void相关API元素flash.text.TextField.htmlText示例如何使用本示例有关如何使用此属性的说明，请参阅TextFormat()构造函数示例。构造函数详细信息TextFormat()构造函数publicfunctionTextFormat(font:String=null,size:Object=null,color:Object=null,bold:Object=null,italic:Object=null,underline:Object=null,url:String=null,target:String=null,align:String=null,leftMargin:Object=null,rightMargin:Object=null,indent:Object=null,leading:Object=null)语言版本:ActionScript3.0运行时版本:AIR1.0,FlashPlayer9.,FlashLite4创建一个具有指定属性的TextFormat对象。然后可更改TextFormat对象的属性以更改文本字段的格式设置。任何参数都可设置为null以表示该参数未定义。所有参数都是可选的；任何省略的参数都被视为null。参数font:String(default=null)—以字符串形式表示的文本字体名称。size:Object(default=null)—一个表示大小（以像素为单位）的整数。color:Object(default=null)—使用此文本格式的文本的颜色。包含三个8位RGB颜色成分的数字；例如，0xFF0000为红色，0x00FF00为绿色。bold:Object(default=null)—一个布尔值，表示文本是否为粗体字。italic:Object(default=null)—一个布尔值，表示文本是否为斜体。underline:Object(default=null)—一个布尔值，表示文本是否带有下划线。url:String(default=null)—使用此文本格式的文本超链接到的URL。如果url为空字符串，则表示文本没有超链接。target:String(default=null)—显示超链接的目标窗口。如果目标窗口为空字符串，则文本显示在默认目标窗口_self中。如果url参数设置为空字符串或值null，虽然您可以获取或设置此属性，但该属性不起作用。align:String(default=null)—段落的对齐方式，作为TextFormatAlign值。leftMargin:Object(default=null)—表示段落的左边距，以像素为单位。rightMargin:Object(default=null)—表示段落的右边距，以像素为单位。indent:Object(default=null)—一个整数，表示从左边距到段落中第一个字符的缩进。leading:Object(default=null)—一个数字，表示行与行之间的前导垂直间距量。示例(如何使用本示例)在下面的示例中，用户可以从应用于另一个文本字段内容的列表中选择不同的文本格式选项。如果用户单击文本字段的内容，该格式将恢复为默认（原始）格式。formatTextField文本字段将在单独的行中列出所有TextField类属性选项（kerning除外）。当用户单击formatTextField文本字段中的某一行时，将触发formatTextFieldClickHandler()方法。formatTextFieldClickHandler()方法调用TextField.getLineIndexAtPoint()方法以获取所单击的行的索引，然后调用TextField.getLineText()方法以获取行内容。switch语句将检查该行内容，并相应地设置newformatTextFormat对象的属性。然后，setTextFormat()方法将contentTextField文本字段的文本格式设置为新格式。通过单击不同的formatTextField行，用户可以将一个不同的格式应用于contentTextField文本字段。（Tab设置是一个数组，它为行中的每个Tab定义了单独的Tab停靠位。）如果选择了url或target行，用户必须单击contentTextField文本字段才能激活链接并显示目标URL（Flex主页）的内容。target属性的默认值为“_self”，这意味着，如果用户选择了url行，则会在当前窗口中显示该内容。要使target属性起作用，必须已经在url属性中设置了URL。如果用户单击contentTextField文本字段，将触发contentTextFieldClickHandler()方法，它将该字段的格式以及newFormatTextFormat对象设置为文本字段的默认（原始）格式。这将清除用户所做的所有格式更改。package{importflash.display.Sprite;importflash.text.TextField;importflash.text.TextFormat;importflash.text.TextFieldAutoSize;importflash.events.MouseEvent;importflash.text.TextFormatAlign;publicclassTextFormat_constructorExampleextendsSprite{privatevarcontentTextField:TextField=newTextField();privatevarformatTextField:TextField=newTextField();privatevarnewFormat:TextFormat=newTextFormat();publicfunctionTextFormat_constructorExample(){contentTextField.x=10;contentTextField.y=10;contentTextField.background=true;contentTextField.border=true;contentTextField.multiline=true;contentTextField.wordWrap=true;contentTextField.selectable=false;contentTextField.width=250;contentTextField.height=120;contentTextField.htmlText="<p>TheTextFormatclassrepresentscharacterformatting"+"information.UsetheTextFormatclasstocreatespecifictextformatting"+"fortextfields."+"</p><br>"+"\tTabOne"+"\tTabTwo<br>";formatTextField.x=10;formatTextField.y=140;formatTextField.background=true;formatTextField.border=true;formatTextField.autoSize=TextFieldAutoSize.LEFT;formatTextField.text="align:right\n"+"blockIndent:10pixels\n"+"bold:\n"+"bullet:\n"+"color:red\n"+"font:Arial\n"+"indent:20pixels\n"+"italic:\n"+"leading:5spaces\n"+"leftMargin:20pixels\n"+"letterSpacing:4pixels\n"+"rightMargin:20pixels\n"+"size:16point\n"+"target:newwindow\n"+"tabStops:50and150pixel\n"+"underline:\n"+"url:AdobeFlexpage\n";formatTextField.addEventListener(MouseEvent.CLICK,formatTextFieldClickHandler);contentTextField.addEventListener(MouseEvent.CLICK,contentTextFieldClickHandler);this.addChild(contentTextField);this.addChild(formatTextField);}privatefunctionformatTextFieldClickHandler(e:MouseEvent):void{varvalue:String="";vari:uint=0;varindex:int=formatTextField.getLineIndexAtPoint(e.localX,e.localY);varline:String=formatTextField.getLineText(index);;line=line.substr(0,(line.indexOf(":")));switch(line){case"align":newFormat.align=TextFormatAlign.RIGHT;break;case"blockIndent":newFormat.blockIndent=10;break;case"bold":newFormat.bold=true;break;case"bullet":newFormat.bullet=true;break;case"color":newFormat.color=0xFF0000;break;case"font":newFormat.font="Arial";break;case"indent":newFormat.indent=20;break;case"italic":newFormat.italic=true;break;case"leading":newFormat.leading=5;break;case"leftMargin":newFormat.leftMargin=20;break;case"letterSpacing":newFormat.letterSpacing=4;break;case"rightMargin":newFormat.rightMargin=20;break;case"size":newFormat.size=16;break;case"tabStops":newFormat.tabStops=[50,150];break;case"target":newFormat.url="http://www.adobe.com/products/flex/";newFormat.target="_blank";break;case"underline":newFormat.underline=true;break;case"url":newFormat.url="http://www.adobe.com/products/flex/";break;}contentTextField.setTextFormat(newFormat);}privatefunctioncontentTextFieldClickHandler(e:MouseEvent):void{contentTextField.setTextFormat(contentTextField.defaultTextFormat);newFormat=contentTextField.defaultTextFormat;}}}示例如何使用本示例TextFormatExample.as下例创建TextFieldExample类来显示默认位置(x=0,y=0)的文本消息。这是使用以下步骤完成的：创建了TextField类型的label属性。类构造函数调用函数configureLabel()configureLabel()函数首先创建一个新的TextField对象并将其赋给label然后将其参数设置为左对齐文本字段启用背景填充启用边框。接下来，configureLabel()将创建本地变量format，并将其赋给新TextFormat实例，将其参数设置为：字体类型=宋体字体颜色=纯红色字体大小=10字体下划线=true。标签的defaultTextFormat属性设置为format，而label实例将添加到显示列表中，此显示列表最初在舞台上显示不包含文本的文本字段（例如具有白色背景的小框）。最后（返回构造函数），通过调用以下setLabel()，标签的文本会设置为在坐标x=0，y=0处显示“HelloWorldandwelcometotheshow”。package{importflash.display.Sprite;importflash.text.TextField;importflash.text.TextFieldAutoSize;importflash.text.TextFormat;publicclassTextFormatExampleextendsSprite{privatevarlabel:TextField;publicfunctionTextFormatExample(){configureLabel();setLabel("HelloWorldandwelcometotheshow");}publicfunctionsetLabel(str:String):void{label.text=str;}privatefunctionconfigureLabel():void{label=newTextField();label.autoSize=TextFieldAutoSize.LEFT;label.background=true;label.border=true;varformat:TextFormat=newTextFormat();format.font="Verdana";format.color=0xFF0000;format.size=10;format.underline=true;label.defaultTextFormat=format;addChild(label);}}}';
    var start = performance.now();
    for (var i = 0; i < count; i++) {
        width = measureText(demoText, context);
    }
    var end = performance.now();
    console.log( width, end - start);




    //demoText = "Hello world";
    start = performance.now();
    for (var i = 0; i < count; i++) {
        width = context.measureText(demoText).width;
    }
    end = performance.now();

    console.log( width, end - start);




}
interface ILetterToWidth {
    [letter:number]:number
}

interface IStringDic {
    [key:string]:ILetterToWidth
}

var fontDic: IStringDic = {
    "Init": []
}



function measureText(text: string, context:CanvasRenderingContext2D) {
    var width = 0.0;
    var font = context.font;
    var letterdic = fontDic[font];
    if (letterdic==undefined) {
        letterdic = createFontDicFor(font, text, context);
        fontDic[font] = letterdic
    }
    var length = text.length;
    for (var i = 0; i < length; i++) {
        var letter = text.charCodeAt(i);
        var w = letterdic[letter];
        if (w >= 0) {
            width += w;
            continue;
        }
        w = context.measureText(text.charAt(i)).width;
        letterdic[letter] = w;
        width += w;
    }
    return width;
}

function createFontDicFor(font: string, text: string, context: CanvasRenderingContext2D) {
    var letterDic: ILetterToWidth = {};
    var length = text.length;
    for (var i = 0; i < length; i++) {
        var letter = text.charCodeAt(i);
        if (letter in letterDic)
            continue;
        var width = context.measureText(text.charAt(i)).width;
        letterDic[letter] = width;
    }
    return letterDic;
}

window.addEventListener("load", load);
window.addEventListener("resize", resize);