
import Action = require('./Action');
import Build = require('./Build');
import FileUtil = require('../lib/FileUtil');

class Create extends Action {

    public run() {
        super.run();
        var option = this.options;
        FileUtil.createDirectory(option.srcDir);
        FileUtil.createDirectory(option.debugDir);
        var templateDir = FileUtil.joinPath(option.larkRoot, 'template');
        FileUtil.copy(templateDir, option.templateDir);
        Build.buildLark(this.options);
    }
}

export = Create;