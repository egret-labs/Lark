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

    export class Capabilities {

        static $language:string = "zh-CN";
        /**
         * 指定运行内容的系统的语言代码。语言指定为 ISO 639-1 中的小写双字母语言代码。
         * 对于中文，另外使用 ISO 3166 中的大写双字母国家/地区代码，以区分简体中文和繁体中文。
         * 以下是可能但不限于的语言和值：
         * 简体中文  zh-CN
         * 繁体中文  zh-TW
         * 英语      en
         * 日语      ja
         * 韩语      ko
         * 法语      fr
         * 捷克语    cs
         * 丹麦语    da
         * 荷兰语    nl
         * 芬兰语    fi
         * 德语      de
         * 匈牙利语   hu
         * 意大利语   it
         * 挪威语    no
         * 其他/未知 xu
         * 波兰语    pl
         * 葡萄牙语  pt
         * 俄语      ru
         * 西班牙语  es
         * 瑞典语    sv
         * 土耳其语  tr
         */
        public static get language():string{
            return Capabilities.$language;
        }

        static $isMobile:boolean;

        public static get isMobile():boolean{
            return Capabilities.$isMobile;
        }

        static $os:string = "Unknown";

        /**
         * 指示当前的操作系统。os 属性返回下列字符串：
         *
         * 苹果移动操作系统     "iOS"
         * 安卓移动操作系统     "Android"
         * 微软移动操作系统     "Windows Phone"
         * 微软桌面操作系统     "Windows"
         * 苹果桌面操作系统     "Mac OS"
         * 未知操作系统        "Unknown"
         */
        public static get os():string{
            return Capabilities.$os;
        }


        static $location: boolean;

        public static get location(): boolean {
            return Capabilities.$location;
        }


        static $orientation: boolean;

        public static get orientation(): boolean {
            return Capabilities.$orientation;
        }


        static $motion: boolean;

        public static get motion(): boolean {
            return Capabilities.$motion;
        }
    }

    if(DEBUG){
        lark.$markReadOnly(Capabilities,"language");
        lark.$markReadOnly(Capabilities,"isMobile");
        lark.$markReadOnly(Capabilities,"orientation");
        lark.$markReadOnly(Capabilities,"motion");
        lark.$markReadOnly(Capabilities,"location");
        lark.$markReadOnly(Capabilities,"os");
    }

}