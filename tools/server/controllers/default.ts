/// <reference path="../../lib/types.d.ts" />

import file = require('../../lib/FileUtil');

class Default extends TotalJS.Controller {

    static LarkStaticContentPath = '$/content/';
    static UserProjectPath = null;

    static install() {
        var self = Default.prototype;
        framework.route('$/', self.manage);
        framework.route('$/shutdown', self.shutdown);
        framework.route('$/ping/', self.ping);
        framework.file('Lark manage static files', self.staticFiles);
        framework.file('User project static files', self.projectFiles);

    }

    manage() {
        var viewdata: lark.server.ViewModel = {
            options: lark.server.options.toJSON()
        };
        this.repository = viewdata;
        this.view('index');
    }

    shutdown() {
        console.log('The server has been shutdown');
        this.res.send(200, '');
        setTimeout(() => process.exit(0), 200);
    }

    staticFiles(req, res, isValidation) {

        if (isValidation)
        {
            return req.url.indexOf(Default.LarkStaticContentPath) !== -1;
        }

        var filePath = getLarkContentFullName(req);
        framework.responseFile(req, res, filePath);
    }

    projectFiles(req, res, isValidation) {

        if (isValidation)
        {
            if (req.url.indexOf('$/') >= 0)
                return false;
            var path = getUserProjectContentFullName(req);
            return file.exists(path);
        }

        var path = getUserProjectContentFullName(req);
        framework.responseFile(req, res, path);
    }

    ping() {
        console.log('call ping');
        var res: Response = this.res;
        res.send(200, 'OK');
    }
}


function getLarkContentFullName(req) {
    var url:string = req.url;
    var path = url.replace(Default.LarkStaticContentPath, '');
    var fullpath = utils.combine('~',__dirname,'../content/', path);
    return fullpath;
}

function getUserProjectContentFullName(req) {
    var url: string = req.url;
    var fullpath = utils.combine('~', Default.UserProjectPath, url);
    return fullpath;
}


export = Default;