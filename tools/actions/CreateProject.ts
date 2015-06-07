
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import Compiler = require('./Compiler');
import FileUtil = require('../lib/FileUtil');


export function create(project:lark.ILarkProject) {
	
}


function copyTemplate(project:lark.ILarkProject) {
    var options = lark.options;
    var templateFile = FileUtil.joinPath(options.templateDir, "index.html");
    if (!FileUtil.exists(templateFile))
        return;
    var larkFiles: string[] = [];

    var modules = project.modules;
    var platforms = project.platforms;
    modules.forEach(m=> {
        larkFiles.push(utils.format("libs/{0}/{0}", m.name));
        platforms.forEach(p=> larkFiles.push(utils.format("libs/{0}/{0}.{1}", m.name, p.name)));
    });

    
    var content = FileUtil.read(templateFile);
    var scripts = larkFiles.map(f=> utils.format('<script src="{0}.js" src-release="{0}.min.js"></script>',f)).join('\r\n    ');
    content = content.replace('<script id="lark"></script>', scripts);
    content = content.replace(/\$entry\-class\$/ig, "Main");
    content = content.replace(/\$scale\-mode\$/ig, project.scaleMode);
    content = content.replace(/\$content\-width\$/ig, project.contentWidth.toString());
    content = content.replace(/\$content\-height\$/ig, project.contentHeight.toString());
    content = content.replace(/\$show\-paint\-rects\$/ig, 'false');

    FileUtil.save(templateFile, content);
}