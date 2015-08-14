/// <reference path="../lib/types.d.ts" />
var exml = require('../actions/SortEXML');
var EXML = (function () {
    function EXML() {
    }
    EXML.prototype.execute = function () {
        exml.updateSetting(true);
        return 0;
    };
    return EXML;
})();
module.exports = EXML;
