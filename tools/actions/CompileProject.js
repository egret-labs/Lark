/// <reference path="../lib/types.d.ts" />
var Compiler = require('./Compiler');
var FileUtil = require('../lib/FileUtil');
var CompileProject = (function () {
    function CompileProject() {
    }
    CompileProject.prototype.compileProject = function (option, files) {
        if (files && this.recompile) {
            files = files.map(function (f) { return f.replace(option.projectDir, ""); });
            this.recompile(files);
            return;
        }
        var compiler = new Compiler();
        var tsList = FileUtil.search(option.srcDir, "ts");
        var compileResult = compiler.compile({
            args: option,
            files: tsList,
            out: option.out,
            outDir: option.outDir
        });
        var files = GetJavaScriptFileNames(compileResult.files, /^src\//);
        compileResult.files = files;
        this.recompile = compileResult.compileWithChanges;
        return compileResult;
    };
    return CompileProject;
})();
function GetJavaScriptFileNames(tsFiles, root, prefix) {
    var files = [];
    tsFiles.forEach(function (f) {
        if (!f)
            return;
        if (/\.d\.ts$/.test(f))
            return;
        f = FileUtil.escapePath(f);
        f = f.replace(root, '').replace(/\.ts$/, '.js').replace(/^\//, '');
        if (prefix) {
            f = prefix + f;
        }
        files.push(f);
    });
    return files;
}
module.exports = CompileProject;
