
/// <reference path="../lib/types.d.ts" />

import utils = require('../lib/utils');
import server = require('../server/server');
import CopyFiles = require('../actions/CopyFiles');
import CompileProject = require('../actions/CompileProject');
import CompileTemplate = require('../actions/CompileTemplate');
import FileUtil = require('../lib/FileUtil');

class DoCreateCommand implements lark.Command {
    project:lark.ILarkProject;
    execute():number {
        var proj = this.project;
        var options = lark.options;
        var template = FileUtil.joinPath(options.larkRoot, "tools/templates/" + proj.template);
        FileUtil.copy(template, options.projectDir);
        CopyFiles.copyLark();
        copyTemplate(proj);
        var compileProject = new CompileProject();
        var result = compileProject.compileProject(options);
        CopyFiles.copyProjectFiles();
        CompileTemplate.compileTemplates(options,result.files);
        return result.exitStatus;
    }
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
        platforms.forEach(p=> {
            var scriptName = utils.format("libs/{0}/{0}.{1}", m.name, p.name);
            if(FileUtil.exists(FileUtil.joinPath(options.srcDir,scriptName+".js")))
                larkFiles.push(scriptName);
        });
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

export = DoCreateCommand;