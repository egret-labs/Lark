/// <reference path="../lib/types.d.ts" />
var FileUtil = require('../lib/FileUtil');
var CompileOptions = (function () {
    function CompileOptions() {
        this.esTarget = 'ES5';
    }
    Object.defineProperty(CompileOptions.prototype, "dirName", {
        get: function () {
            return FileUtil.getFileName(this.projectDir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "srcDir", {
        get: function () {
            return FileUtil.joinPath(this.projectDir, "src/");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "larkPropertiesFile", {
        get: function () {
            return FileUtil.joinPath(this.projectDir, "lark.json");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "debugDir", {
        get: function () {
            return FileUtil.joinPath(this.projectDir, "bin-debug/");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "releaseDir", {
        get: function () {
            return FileUtil.joinPath(this.projectDir, "bin-release/");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "out", {
        get: function () {
            var filename = this.publish ? FileUtil.joinPath(this.outDir, 'main.min.js') : undefined;
            return filename;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "outDir", {
        get: function () {
            return this.publish ? this.releaseDir : this.debugDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "templateDir", {
        get: function () {
            return FileUtil.joinPath(this.projectDir, "template/");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "host", {
        get: function () {
            return "localhost";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "port", {
        get: function () {
            return 3000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "websocketUrl", {
        get: function () {
            var url = "ws://" + this.host + ':' + this.port;
            return url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "manageUrl", {
        get: function () {
            var url = "http://" + this.host + ':' + this.port + '/$/';
            return url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileOptions.prototype, "startUrl", {
        get: function () {
            var url = "http://" + this.host + ':' + this.port + '/bin-debug/index.html';
            return url;
        },
        enumerable: true,
        configurable: true
    });
    CompileOptions.parse = function (option) {
        var it = new CompileOptions();
        for (var p in option) {
            it[p] = option[p];
        }
        return it;
    };
    CompileOptions.prototype.toJSON = function () {
        var options = this;
        var json = {};
        for (var k in this) {
            var disc = Object.getOwnPropertyDescriptor(options, k) || Object.getOwnPropertyDescriptor(CompileOptions.prototype, k);
            if (!disc)
                continue;
            if (disc.enumerable == false)
                continue;
            if (typeof disc.value == 'function')
                continue;
            json[k] = options[k];
        }
        return json;
    };
    return CompileOptions;
})();
module.exports = CompileOptions;
