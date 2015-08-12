module lark {

    $locale_strings = $locale_strings || {};
    $locale_strings["en_US"] = $locale_strings["en_US"] || {};
    var locale_strings = $locale_strings["en_US"];

    //RES
    locale_strings[4000] = "RES.createGroup() passed in non-existed key value in configuration: {0}";
    locale_strings[4001] = "RES loaded non-existed or empty resource group:\"{0}\"";
    locale_strings[4002] = "Can't find the analyzer of the specified file type:{0}。 Please register the specified analyzer in the initialization of the project first,then start the resource loading process。";
    locale_strings[4003] = "The format of JSON file is incorrect: {0}\ndata: {1}";

}