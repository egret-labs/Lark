var url = require('url');
var http = require('http');
var Project = require('./project');
var file = require('../lib/FileUtil');
var childProcess = require('child_process');
var LARK_SERVICE_PORT = 51598;
//Lark version, use to shutdown if the version is different to the value passed by the build command
var version = process.argv[2];
var projects = {};
var serviceCreated = false;
/**
* Start Lark Service
*/
function run() {
    http.createServer(function (req, res) {
        console.log(req.url);
        var task = parseRequest(req);
        if (task.command == 'shutdown' || task.version && task.version != version) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("{}");
            shutdown();
        }
        if (task.command == 'init') {
            var proj = getProject(task.path);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            proj.buildPort = res;
            setInterval(function () { return res.write("{}"); }, 15000);
        }
        else if (task.command == 'buildResult') {
            var proj = getProject(task.path);
            proj.onBuildServiceMessage(task);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("");
        }
        else if (task.command == 'build') {
            handleBuildTask(task, res);
            global.gc && global.gc();
        }
    }).listen(LARK_SERVICE_PORT, '127.0.0.1');
}
exports.run = run;
/**
*  Send command to Lark Service
*/
function execCommand(command, callback, startServer) {
    if (startServer === void 0) { startServer = true; }
    var options = lark.options;
    var requestUrl = getServiceURL(command);
    var commandRequest = http.get(requestUrl, function (res) {
        res.setEncoding('utf-8');
        res.on('data', function (text) {
            try {
                var cmd = JSON.parse(text);
            }
            catch (e) {
                cmd = { exitCode: 0, messages: [], command: "build" };
            }
            callback && callback(cmd);
        });
    });
    commandRequest.once('error', function (e) {
        if (!startServer)
            return;
        if (!serviceCreated) {
            startBackgroundService();
        }
        setTimeout(function () { return execCommand(command, callback); }, 200);
    });
    commandRequest.setTimeout(100);
    return commandRequest;
}
exports.execCommand = execCommand;
function getProject(path) {
    var project;
    if (!projects[path]) {
        project = new Project();
        project.path = path;
        project.init();
        projects[path] = project;
        return project;
    }
    return projects[path];
}
function handleBuildTask(info, currentRes) {
    var project = getProject(info.path);
    project.fileChanged();
    var res = project.penddingRequest;
    if (res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ command: "build", exitCode: 0 }));
    }
    project.penddingRequest = currentRes;
}
function startBackgroundService() {
    serviceCreated = true;
    var options = lark.options;
    var nodePath = process.execPath, service = file.joinPath(options.larkRoot, 'tools/bin/lark');
    var startupParams = ['--expose-gc', service, 'service'];
    var server = childProcess.spawn(nodePath, startupParams, {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
        cwd: process.cwd(),
        silent: true
    });
    server.on("exit", function () { return serviceCreated = false; });
}
function shutdown() {
    for (var path in projects) {
        var project = projects[path];
        project.shutdown();
    }
    console.log("shutdown");
    process.exit(0);
}
function parseRequest(req) {
    var uri = url.parse(req.url, true);
    var command = uri.query.q;
    return JSON.parse(command) || {};
}
function getServiceURL(params) {
    var json = JSON.stringify(params);
    return "http://127.0.0.1:" + LARK_SERVICE_PORT + "/?q=" + encodeURIComponent(json);
}
/// <reference path="../lib/types.d.ts" /> 
//# sourceMappingURL=index.js.map