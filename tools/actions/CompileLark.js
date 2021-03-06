/// <reference path="../lib/types.d.ts" />
var utils = require('../lib/utils');
var Compiler = require('./Compiler');
var FileUtil = require('../lib/FileUtil');
var ANY = 'any';
var CompileLark = (function () {
    function CompileLark() {
        this.dtsFiles = [];
    }
    CompileLark.prototype.make = function () {
        var self = this;
        var code = 0;
        var options = lark.options;
        var manifest = lark.manifest;
        var penddings = [];
        var currentPlatform, currentConfig;
        global.registerClass = manifest.registerClass;
        var outputDir = this.getModuleOutputPath();
        this.compiler = new Compiler();
        global.registerClass = manifest.registerClass;
        var configurations = [
            { name: "debug", declaration: true },
            { name: "release", minify: true }
        ];
        utils.clean(outputDir);
        for (var i = 0; i < manifest.modules.length; i++) {
            var m = manifest.modules[i];
            preduceSwanModule(m);
            listModuleFiles(m);
            for (var j = 0; j < configurations.length; j++) {
                var config = configurations[j];
                for (var k = 0; k < manifest.platforms.length; k++) {
                    var platform = manifest.platforms[k];
                    code = this.buildModule(m, platform, config);
                    if (code != 0) {
                        delSwanTemp(m);
                        return code;
                    }
                }
            }
            delSwanTemp(m);
        }
        this.hideInternalMethods();
        return code;
    };
    CompileLark.prototype.buildModule = function (m, platform, configuration) {
        var _this = this;
        var name = m.name;
        var fileName = name;
        var options = lark.options;
        var larkRoot = lark.options.larkRoot;
        if (platform.name != ANY) {
            fileName += "." + platform.name;
        }
        if (configuration.minify) {
            fileName += ".min";
        }
        var depends = m.dependencies.map(function (name) { return _this.getModuleOutputPath(name, name + '.d.ts'); });
        if (platform.name != ANY) {
            depends.push(this.getModuleOutputPath(m.name, name + '.d.ts'));
        }
        var outDir = this.getModuleOutputPath(null, null, m.outFile);
        var declareFile = this.getModuleOutputPath(m.name, fileName + ".d.ts", m.outFile);
        var singleFile = this.getModuleOutputPath(m.name, fileName + ".js", m.outFile);
        var moduleRoot = FileUtil.joinPath(larkRoot, m.root);
        var tss = [];
        m.files.forEach(function (file) {
            var path = null;
            var sourcePlatform = null, sourceConfig = null;
            if (typeof (file) == 'string') {
                path = file;
            }
            else {
                var source = file;
                path = source.path;
                sourcePlatform = source.platform;
                sourceConfig = source.debug === true ? "debug" : source.debug === false ? "release" : null;
            }
            var platformOK = sourcePlatform == null && platform.name == ANY || sourcePlatform == platform.name;
            var configOK = sourceConfig == null || sourceConfig == configuration.name;
            if (platformOK && configOK) {
                tss.push(path);
            }
        });
        if (tss.length == 0)
            return 0;
        tss = depends.concat(tss);
        var dts = platform.declaration && configuration.declaration;
        var result = this.compiler.compile({ args: options, def: dts, out: singleFile, files: tss, outDir: null });
        if (result.exitStatus != 0) {
            result.messages.forEach(function (m) { return console.log(m); });
            return result.exitStatus;
        }
        if (dts) {
            this.dtsFiles.push([declareFile, depends]);
        }
        if (configuration.minify) {
            utils.minify(singleFile, singleFile);
        }
        return 0;
    };
    CompileLark.prototype.getModuleOutputPath = function (m, filePath, outFile) {
        if (filePath === void 0) { filePath = ""; }
        if (outFile === void 0) { outFile = "build/"; }
        var path = FileUtil.joinPath(lark.options.larkRoot, outFile);
        if (m)
            path += m + '/';
        path += filePath;
        return path;
    };
    CompileLark.prototype.hideInternalMethods = function () {
        var _this = this;
        var tempDts = [];
        global.ignoreDollar = true;
        this.dtsFiles.forEach(function (d) {
            var dts = d[0], depends = d[1];
            var tempDtsName = dts.replace(/\.d\.ts/, 'd.ts');
            var singleFile = dts.replace(/\.d\.ts/, 'd.js');
            FileUtil.copy(dts, tempDtsName);
            var tss = depends.concat(tempDtsName);
            var result = _this.compiler.compile({
                args: lark.options,
                def: true,
                out: singleFile,
                files: tss,
                outDir: null
            });
            if (result.messages && result.messages.length) {
                result.messages.forEach(function (m) { return console.log(m); });
            }
            FileUtil.remove(singleFile);
            FileUtil.remove(tempDtsName);
            tempDts.push(tempDtsName.replace(/\.ts$/, '.d.ts'));
        });
        this.dtsFiles.forEach(function (d) {
            FileUtil.remove(d[0]);
        });
        tempDts.forEach(function (d) {
            var dts = d.replace(/d\.d\.ts$/, '.d.ts');
            FileUtil.copy(d, dts);
            FileUtil.remove(d);
        });
        global.ignoreDollar = false;
    };
    return CompileLark;
})();
function testPlatform(value, array) {
    return (value == ANY && (array == null || array.length == 0)) || (array && array.indexOf(value) >= 0);
}
function testConfig(value, array) {
    return value == ANY || array == null || array.indexOf(value) >= 0;
}
function listModuleFiles(m) {
    var tsFiles = [];
    if (m.noOtherTs !== true)
        tsFiles = FileUtil.search(FileUtil.joinPath(lark.options.larkRoot, m.root), "ts");
    var specFiles = {};
    m.files.forEach(function (f, i) {
        var fileName = typeof (f) == 'string' ? f : f.path;
        fileName = FileUtil.joinPath(m.root, fileName);
        fileName = FileUtil.joinPath(lark.options.larkRoot, fileName);
        if (f['path'])
            f['path'] = fileName;
        else
            m.files[i] = fileName;
        specFiles[fileName] = true;
    });
    tsFiles.forEach(function (f) {
        if (!specFiles[f])
            m.files.push(f);
    });
}
function delSwanTemp(m) {
    if (m.name != "swan" || !m.sourceRoot) {
        return;
    }
    var pathBefore = FileUtil.joinPath(lark.options.larkRoot, m.root);
    FileUtil.remove(pathBefore);
}
function preduceSwanModule(m) {
    if (m.name != "swan" || !m.sourceRoot) {
        return;
    }
    var replaces = [
        ["Lark 1.0", "Egret 2.4"],
        ["lark.", "egret."],
        ["IEventEmitter", "IEventDispatcher"],
        ["EventEmitter", "EventDispatcher"],
        [".on(", ".addEventListener("],
        [".removeListener(", ".removeEventListener("],
        [".emit(", ".dispatchEvent("],
        [".emitWith(", ".dispatchEventWith("],
        [".hasListener(", ".hasEventListener("],
        [".emitTouchEvent(", ".dispatchTouchEvent("],
        [".BitmapData", ".Texture"],
        [".Sprite", ".DisplayObjectContainer"],
        [".TextInput", ".TextField"],
        [".ImageLoader", ".URLLoader"],
        [".HttpRequest", ".URLLoader"],
    ];
    var tsFiles = [];
    if (m.noOtherTs !== true)
        tsFiles = FileUtil.search(FileUtil.joinPath(lark.options.larkRoot, m.sourceRoot), "ts");
    var pathBefore = FileUtil.joinPath(lark.options.larkRoot, m.sourceRoot);
    for (var i = 0; i < tsFiles.length; i++) {
        var content = FileUtil.read(tsFiles[i]);
        var saveFile = FileUtil.joinPath(lark.options.larkRoot, m.root);
        var currenFile = tsFiles[i];
        var resultFile = currenFile.slice(pathBefore.length, currenFile.length);
        saveFile += resultFile;
        for (var r = 0; r < replaces.length; r++) {
            if (!replaces[r]) {
                console.log("r = ", r);
            }
            content = replaceAll(content, replaces[r][0], replaces[r][1]);
        }
        content = changeDefine(content, "lark", "egret");
        FileUtil.save(saveFile, content);
    }
}
function replaceAll(content, search, replace) {
    var slen = search.length;
    var rlen = replace.length;
    for (var i = 0; i < content.length; i++) {
        if (content.slice(i, i + slen) == search) {
            content = content.slice(0, i) + replace + content.slice(i + slen, content.length);
            i += rlen - slen;
        }
    }
    return content;
}
function changeDefine(content, current, change) {
    var cuIF = "//if " + current;
    var chIF = "//if " + change;
    for (var i = 0; i < content.length; i++) {
        if (content.slice(i, i + cuIF.length) == cuIF) {
            content = content.slice(0, i) + "/*" + content.slice(i, content.length);
            i += 2;
            for (; i < content.length; i++) {
                if (content.slice(i, i + 9) == "//endif*/") {
                    i++;
                    break;
                }
            }
        }
        else if (content.slice(i, i + chIF.length) == chIF) {
            var before = content.slice(0, i - 2);
            var end = content.slice(i, content.length);
            content = before + end;
            i += 2;
            for (; i < content.length; i++) {
                if (content.slice(i, i + 9) == "//endif*/") {
                    i++;
                    break;
                }
            }
        }
    }
    return content;
}
module.exports = CompileLark;
