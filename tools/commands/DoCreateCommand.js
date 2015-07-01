/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var CopyFiles = require('../actions/CopyFiles');
var CompileProject = require('../actions/CompileProject');
var CompileTemplate = require('../actions/CompileTemplate');
var FileUtil = require('../lib/FileUtil');
var DoCreateCommand = (function () {
    function DoCreateCommand() {
    }
    DoCreateCommand.prototype.execute = function () {
        var proj = this.project;
        var options = lark.options;
        var template = FileUtil.joinPath(options.larkRoot, "tools/templates/" + proj.template);
        FileUtil.copy(template, options.projectDir);
        CopyFiles.copyLark();
        copyTemplate(proj);
        var compileProject = new CompileProject();
        var result = compileProject.compileProject(options);
        CopyFiles.copyProjectFiles();
        CompileTemplate.compileTemplates(options, result.files);
        var project = JSON.stringify(this.project, null, "  ");
        var tmpFile = FileUtil.joinPath(options.getTmpDir(), "proj.json");
        FileUtil.save(tmpFile, project);
        console.log(utils.tr(10017));
        return result.exitStatus;
    };
    return DoCreateCommand;
})();
function copyTemplate(project) {
    var options = lark.options;
    var templateFile = FileUtil.joinPath(options.templateDir, "index.html");
    if (!FileUtil.exists(templateFile))
        return;
    var larkFiles = [];
    var modules = project.modules;
    var platforms = project.platforms;
    modules.forEach(function (m) {
        larkFiles.push(utils.format("libs/{0}/{0}", m.name));
        platforms.forEach(function (p) {
            var scriptName = utils.format("libs/{0}/{0}.{1}", m.name, p.name);
            if (FileUtil.exists(FileUtil.joinPath(options.srcDir, scriptName + ".js")))
                larkFiles.push(scriptName);
        });
    });
    var content = FileUtil.read(templateFile);
    var scripts = larkFiles.map(function (f) { return utils.format('<script src="{0}.js" src-release="{0}.min.js"></script>', f); }).join('\r\n    ');
    content = content.replace('<script id="lark"></script>', scripts);
    content = content.replace(/\$entry\-class\$/ig, "Main");
    content = content.replace(/\$background\$/ig, project.background || "#888888");
    content = content.replace(/\$scale\-mode\$/ig, project.scaleMode || "noScale");
    content = content.replace(/\$orientation\$/ig, project.orientation || "notSet");
    content = content.replace(/\$content\-width\$/ig, project.contentWidth.toString());
    content = content.replace(/\$content\-height\$/ig, project.contentHeight.toString());
    content = content.replace(/\$show\-paint\-rects\$/ig, 'false');
    FileUtil.save(templateFile, content);
}
module.exports = DoCreateCommand;
