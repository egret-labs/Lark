/// <reference path="../lib/types.d.ts" />
var file = require('../lib/FileUtil');
var exml = require("../lib/exml/EXML");
function getSortedEXML() {
    var files = file.search(lark.options.srcDir, "exml");
    var exmls = files.map(function (path) { return ({
        path: path,
        content: file.read(path)
    }); });
    exmls.forEach(function (it) { return it.path = file.getRelativePath(lark.options.srcDir, it.path); });
    exmls = exml.sort(exmls);
    return exmls;
}
exports.getSortedEXML = getSortedEXML;
function updateSetting(merge) {
    if (merge === void 0) { merge = false; }
    var manifest;
    if (file.exists(lark.options.manifestPath)) {
        manifest = JSON.parse(file.read(lark.options.manifestPath));
    }
    else {
        manifest = {};
    }
    var themeDatas = [];
    if (!manifest.themes || manifest.themes.length == 0) {
        var themes = searchTheme();
        if (themes.length == 0) {
            themes.push("default.thm");
            themeDatas.push({});
        }
        manifest.themes = themes;
        manifest.defaultTheme = manifest.themes[0];
    }
    themeDatas = manifest.themes.map(function (t) {
        try {
            var data = JSON.parse(file.read(file.joinPath(lark.options.srcDir, t)));
            return data || {};
        }
        catch (e) {
            return {};
        }
    });
    var oldEXMLS = [];
    themeDatas.forEach(function (thm, i) {
        thm.exmls && thm.exmls.forEach(function (e) {
            var path = e.path ? e.path : e;
            if (oldEXMLS[path]) {
                oldEXMLS[path].theme += manifest.themes[i] + ",";
                return;
            }
            var exmlFile = {
                path: path,
                theme: "," + manifest.themes[i] + ","
            };
            oldEXMLS[path] = exmlFile;
            oldEXMLS.push(exmlFile);
        });
    });
    var exmls = getSortedEXML();
    themeDatas.forEach(function (thm) { return thm.exmls = []; });
    exmls.forEach(function (e) {
        var epath = e.path;
        var exmlEl = merge ? { path: e.path, content: e.content } : epath;
        themeDatas.forEach(function (thm, i) {
            if (epath in oldEXMLS) {
                var thmPath = manifest.themes[i];
                var exmlFile = oldEXMLS[epath];
                if (exmlFile.theme.indexOf("," + thmPath + ",") >= 0)
                    thm.exmls.push(exmlEl);
            }
            else
                thm.exmls.push(exmlEl);
        });
    });
    manifest.themes.forEach(function (thm, i) {
        var path = file.joinPath(lark.options.srcDir, thm);
        var thmData = JSON.stringify(themeDatas[i], null, "  ");
        file.save(path, thmData);
    });
    var manifestText = JSON.stringify(manifest, null, "  ");
    file.save(lark.options.manifestPath, manifestText);
}
exports.updateSetting = updateSetting;
function searchTheme() {
    var files = file.search(lark.options.srcDir, "thm");
    files = files.map(function (it) { return file.getRelativePath(lark.options.srcDir, it); });
    return files;
}
function sort(exmls) {
    var preload = exmls.filter(function (e) { return e.preload; });
}
