//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015; Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms; with or without
//  modification; are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice; this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice; this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES; INCLUDING; BUT NOT LIMITED TO; THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT; INDIRECT;
//  INCIDENTAL; SPECIAL; EXEMPLARY; OR CONSEQUENTIAL DAMAGES (INCLUDING; BUT NOT
//  LIMITED TO; PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE; DATA;
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY; WHETHER IN CONTRACT; STRICT LIABILITY; OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE;
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

module lark.gui {

    $locale_strings = $locale_strings || {};
    var locale_strings = $locale_strings;

    //EXML报错信息
    locale_strings[2001] = "{0}: 找不到EXML文件";
    locale_strings[2002] = "{0}: 不是有效的XML文件:\n{1}";
    locale_strings[2003] = "{0}: 无法找到节点所对应的类定义\n{1}";
    locale_strings[2004] = "{0}: 节点不能含有同名的id属性\n{1}";
    locale_strings[2005] = "{0}: 节点上不存在名为'{1}'的属性或样式名:\n{2}";
    locale_strings[2006] = "{0}: 未定义的视图状态名称:'{1}'\n{2}";
    locale_strings[2007] = "{0}: 只有处于容器内的egret.IVisualElement对象可以使用includeIn和excludeFrom属性\n{1}";
    locale_strings[2008] = "{0}: 无法将'{1}'类型的值赋给属性:'{2}'\n{3}";
    locale_strings[2009] = "{0}: 在节点属性值的‘{}’标签内只能引用一个ID，不允许使用复杂表达式\n{1}";
    locale_strings[2010] = "{0}: 属性:'{1}'所引用的ID: '{2}'不存在\n{3}";
    locale_strings[2011] = "{0}: 无法将多个子节点赋值给同一个属性:'{1}'\n{2}";
    locale_strings[2012] = "{0}: 节点上不存在默认属性，必须显式声明子节点要赋值到的属性名\n{1}";
    locale_strings[2013] = "{0}: 类型为Array的属性节点上不允许使用视图状态语法\n{1}";
    locale_strings[2014] = "{0}: 不允许将皮肤类自身赋值给节点属性\n{1}";
    locale_strings[2015] = "{0}: 节点引用的类定义:{1}不存在\n{2}";
    locale_strings[2016] = "{0}: 节点上'scale9Grid'属性值的格式错误:{1}";
    locale_strings[2017] = "{0}: 节点上缺少命名空间前缀:{1}";
    locale_strings[2018] = "{0}: 节点上'skinName'属性值的格式错误:{1}";
    locale_strings[2019] = "{0}: 容器的子项必须是可视节点:{1}";
    locale_strings[2020] = "{0}: 在w:Declarations内的子节点，不允许使用includeIn和excludeFrom属性\n{1}";

    //EXML警告信息
    locale_strings[2102] = "{0}: 在属性节点上找不到任何子节点\n{1}";
    locale_strings[2103] = "{0}: 节点上的同一个属性'{1}'被多次赋值\n{2}";
    locale_strings[2104] = "无法实例化组件：{0} ，请检查该组件构造函数参数是否为空。";

    //GUI报错与警告信息
    locale_strings[2201] = "BasicLayout 不支持虚拟化。";
    locale_strings[2202] = "皮肤解析出错，skinName 属性的值必须要能够解析为一个Skin子类的实例。";
    locale_strings[2203] = "素材解析出错，找不到URL：{0} 所对应的资源。";
}