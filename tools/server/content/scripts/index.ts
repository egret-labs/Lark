/// <reference path="../../../lib/types.d.ts" />
/// <reference path="utils.ts" />




module lark.portal {
    export class Index {
        console: HTMLPreElement;
        btnShutdown: HTMLButtonElement;
        init() {
            this.console = <HTMLPreElement>document.getElementById('console');
            this.btnShutdown = <HTMLButtonElement>document.getElementById('btnShutdown');
            this.btnShutdown.addEventListener('click', e=> get('/$/shutdown'));
            this.connectWS();

        }

        connectWS() {
            var ws = new WebSocket(lark.server.options.websocketUrl);
            ws.addEventListener('open', e=> this.onwsConnect);
            ws.addEventListener('message', e=> this.onMessage(e));
            ws.addEventListener('close', e=> this.onLog('connection is closed'));
            ws.addEventListener('error', e=> this.onLog('error when trying to connect the server' + e.error));

            setInterval(() => ws.readyState == ws.OPEN && ws.send(JSON.stringify({ ping: true })), 60 * 1000);
        }

        onwsConnect() {
            console.log("Connected!");
            this.onLog("Connected!");
        }

        onMessage(e: MessageEvent) {
            var data: lark.CommandResult = null;
            try {
                data = JSON.parse(e.data);
            }
            catch (e) {

            }
            if (data.type == 'log') {
                this.onLog(data.data.map(p=> {
                    var type = typeof p;
                    if (type == 'object')
                        return JSON.stringify(p, null, "  ");
                    return p;
                }).join(' '));
            }
        }

        onLog(message:string) {
            var text = this.console.textContent;
            text += '\n' + message;
            this.console.textContent = text;
            this.console.scrollTop += 10000;
        }
    }
}


window.addEventListener('load', function () {
    var manage = new lark.portal.Index();
    manage.init();
})