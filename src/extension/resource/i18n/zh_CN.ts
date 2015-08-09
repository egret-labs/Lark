module lark {

    $locale_strings = $locale_strings || {};
    $locale_strings["zh_CN"] = $locale_strings["zh_CN"] || {};
    var locale_strings = $locale_strings["zh_CN"];

    //RES
    locale_strings[4000] = "RES.createGroup()传入了配置中不存在的键值: {0}";
    locale_strings[4001] = "RES加载了不存在或空的资源组:\"{0}\"";
    locale_strings[4002] = "找不到指定文件类型的解析器:{0}。 请先在项目初始化里注册指定文件类型的解析器，再启动资源加载。";
    locale_strings[4003] = "JSON文件格式不正确: {0}\ndata: {1}";
}