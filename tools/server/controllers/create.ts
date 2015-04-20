/// <reference path="../../lib/types.d.ts" />


class Create extends TotalJS.Controller {
    static install(total: TotalJS.Framework) {
        var self = Create.prototype;
        total.route('$/create/');
    }

    createView() {
        this.view('create');
    }
}



export = Create;