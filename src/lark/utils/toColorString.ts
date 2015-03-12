module lark {
    /**
     * 转换数字为颜色字符串
	 * @param value 颜色值
	 * @returns {string} 颜色字符串，例如"#ffffff"。
     */
    export function toColorString(value:number):string{
        if(isNaN(value)||value < 0)
            value = 0;
        if(value > 16777215)
            value = 16777215;
        var color:string = value.toString(16).toUpperCase();
        while(color.length<6){
            color = "0"+color;
        }
        return "#"+color;
    }
}