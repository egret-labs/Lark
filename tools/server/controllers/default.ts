/// <reference path="../../lib/types.d.ts" />

import url = require('url');
import file = require('../../lib/FileUtil');
import Entry = require('../../compiler/Entry');
import Build = require('../../build/index');
import Create = require('../../compiler/Create');
import Project = require('../../compiler/Project');
import CompileOptions = require('../../compiler/CompileOptions');

var exportObject = {
    LarkStaticContentPath: '$/content/',
    UserProjectPath: null,
    install: install
};

export = exportObject;
var self = this;
function install() {
    addRoute('$/', preview);
    addRoute('$/ping/', ping);
    addRoute('$/create/', create);
    addRoute('$/manage/', manage);
    addRoute('$/command/', command);
    addRoute('$/shutdown', shutdown);
    framework.file('Lark manage static files', staticFiles);
    framework.file('User project static files', projectFiles);

}

function addRoute(path: string, method: Function) {
    framework.route(path, function () {
        self = this;
        var viewdata: lark.server.ViewModel = {
            options: lark.server.options.toJSON(),
            manifest: lark.manifest,
            IPs:lark.server.IPs
        };
        this.repository = viewdata;
        method.call(this);
    });
}

    

function preview() {
    this.view('index');
}

function create() {
    if (this.req.query['proj'])
        return doCreate();

    this.view('create');
}

function doCreate() {
    var projJSON = self.req.query['proj'];
    try {
        var proj = JSON.parse(projJSON);
            
        var create = new Create(lark.options);
        create.doCreate(proj);
        self.res.send(200, 'OK');
    }
    catch (e) {
        console.log(e);
        self.res.send(500, JSON.stringify(e, null, '  '));
    }
}

function manage() {
    if (self.req.query['proj'])
        doManage()
    this.view('manage');
}

function doManage() {
    var projJSON = self.req.query['proj'];
    try {
        var proj = JSON.parse(projJSON);
        var project = new Project();
        project.parse(proj);
        lark.options.project = project;
        lark.options.includeLark = true;
        var build = new Build(lark.options);
        build.saveProject();
        build.run();
        self.res.send(200, 'OK');
    }
    catch (e) {
        console.log(e);
        self.res.send(500, JSON.stringify(e, null, '  '));
    }
}

function shutdown() {
    console.log('The server has been shutdown');
    self.res.send(200, '');
    setTimeout(() => process.exit(0), 200);
}

function ping() {
    console.log('call ping');
    var res: Response = self.res;
    res.send(200, 'OK');
}

function command() {
    var logs = []
    function writeLog(params) { logs.push(params); }
    lark.server.console.on('log', writeLog);

    var commandString = self.req.query['command'];
    var commandOption: lark.ICompileOptions;
    try {
        commandOption = JSON.parse(commandString);
    }
    catch (e) {
        console.log(e);
    }
    var options = CompileOptions.parse(commandOption);
    var exitcode = Entry.executeOption(options);
    var result: lark.CommandResult = {
        type: 'result',
        exitCode: exitcode,
        message: '',
        data: logs
    };
    lark.server.console.removeListener('log', writeLog);
    self.res.json(result);
}

function staticFiles(req, res, isValidation) {

    if (isValidation)
    {
        return req.url.indexOf(exportObject.LarkStaticContentPath) !== -1;
    }

    var filePath = getLarkContentFullName(req);
    framework.responseFile(req, res, filePath);
}

function projectFiles(req, res, isValidation) {

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



function getLarkContentFullName(req) {
    var url:string = req.url;
    var path = url.replace(exportObject.LarkStaticContentPath, '');
    var fullpath = utils.combine('~',__dirname,'../content/', path);
    return fullpath;
}

function getUserProjectContentFullName(req) {
    var uri = url.parse(req.url);
    var fullpath = utils.combine('~', exportObject.UserProjectPath, uri.pathname);
    return fullpath;
}
