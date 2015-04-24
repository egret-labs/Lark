/// <reference path="../lib/types.d.ts" />
global.TotalJS = { Controller: {} };
var Default = require('./controllers/default');
var total = require('../lib/totaljs/');
function startServer(options) {
    options.projectDir = options.projectDir || '/public/';
    options.port = options.port || 3000;
    total.setRoot(__dirname);
    Default.UserProjectPath = options.projectDir;
    console.log('server root', __dirname);
    framework.config['directory-views'] = '~' + __dirname + '/views/';
    framework.config['directory-controllers'] = '~' + __dirname + '/controllers/';
    total.http('debug', { port: options.port });
}
exports.startServer = startServer;
//# sourceMappingURL=server.js.map