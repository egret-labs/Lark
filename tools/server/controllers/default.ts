/// <reference path="../../lib/types.d.ts" />

class Default extends TotalJS.Controller {

    static LarkStaticContentPath = '$/content/';

    static install() {
        var self = Default.prototype;
        framework.route('$/');
        framework.route('$/ping/',self.ping);
        framework.file('Lark manage static files', self.staticFiles);

    }


    staticFiles(req, res, isValidation) {

        if (isValidation)
            return req.url.indexOf(Default.LarkStaticContentPath) !== -1;

        var filePath = getLarkContentFullName(req);
        framework.responseFile(req, res, filePath);
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


export = Default;