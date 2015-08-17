
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import file = require('../lib/FileUtil');
import exml = require("../lib/exml/EXML");

export function getSortedEXML(): exml.EXMLFile[]{
    
    var files = file.search(lark.options.srcDir, "exml");
    var exmls: exml.EXMLFile[] = files.map(path=> ({
            path: path,
            content: file.read(path)
    }));
    exmls.forEach(it=> it.path = file.getRelativePath(lark.options.srcDir, it.path));
    exmls = exml.sort(exmls);
    return exmls;
}


export function updateSetting(merge = false) {

    var manifest: lark.IProjectManifest
    if (file.exists(lark.options.manifestPath)) {
        manifest = JSON.parse(file.read(lark.options.manifestPath));
    }
    else {
        manifest = {};
    }


    var themeDatas: lark.ILarkTheme[] = [];

    if (!manifest.themes || manifest.themes.length == 0) {
        var themes = searchTheme();
        if (themes.length == 0) {
            themes.push("default.thm");
            themeDatas.push({});
        }
        manifest.themes = themes;
        manifest.defaultTheme = manifest.themes[0]
    }

    themeDatas = manifest.themes.map(t=> {
        try {
            var data = JSON.parse(file.read(file.joinPath(lark.options.srcDir, t)));
            return data || {};
        }
        catch (e) {
            return {};
        }
    });

    var oldEXMLS: EXMLFile[] = [];

    themeDatas.forEach((thm,i)=> {
        thm.exmls && thm.exmls.forEach(e=> {
            var path = e.path ? e.path : e;
            if (oldEXMLS[path]) {
                oldEXMLS[path].theme += manifest.themes[i] + ",";
                return;
            }
            var exmlFile = {
                path: path,
                theme:","+ manifest.themes[i]+","
            }
            oldEXMLS[path] = exmlFile;
            oldEXMLS.push(exmlFile);
        });
    });
    

    var exmls = getSortedEXML();

    themeDatas.forEach(thm=> thm.exmls = []);

    exmls.forEach(e=> {
        var epath = e.path;
        var exmlEl = merge ? { path: e.path, content: e.content } : epath;
        themeDatas.forEach((thm,i)=> {
            if (epath in oldEXMLS) {
                var thmPath = manifest.themes[i];
                var exmlFile = oldEXMLS[epath];
                if (exmlFile.theme.indexOf("," + thmPath+",") >= 0)
                    thm.exmls.push(exmlEl);
            }
            else
                thm.exmls.push(exmlEl);
        });

    });
    

    manifest.themes.forEach((thm, i) => {
        var path = file.joinPath(lark.options.srcDir, thm);
        var thmData = JSON.stringify(themeDatas[i], null, "  ");
        file.save(path, thmData);
    });

    var manifestText = JSON.stringify(manifest, null, "  ");
    file.save(lark.options.manifestPath, manifestText);
}

function searchTheme(): string[] {
    var files = file.search(lark.options.srcDir, "thm");
    files = files.map(it=> file.getRelativePath(lark.options.srcDir, it));
    return files;
}

function sort(exmls: exml.EXMLFile[]) {

    var preload = exmls.filter(e=> e.preload);


}


export interface SettingData {
    name: string;
    themes: { [name: string]: string|ThemeData };
    defaultTheme: string;
    exmls: Array<EXMLFile>
}

interface ThemeData {
    skins: { [component: string]: string };
}

interface EXMLFile {
    path: string;
    theme?: string;
    preload?: boolean;
}