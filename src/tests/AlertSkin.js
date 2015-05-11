(function (_super) {
    function AlertSkin() {
        _super.call(this);

        this.maxWidth = 710;
        this.minHeight = 230;
        this.minWidth = 470;
        this.elementsContent = [this.moveArea_i(),this.contentDisplay_i(),this.contentDisplay_i()];
    }
    __extends(AlertSkin, _super);
    var _proto = AlertSkin.prototype;

    _proto.titleDisplay_i = function () {
        var t = new lark.gui.Label();
        this.titleDisplay = t;
        t.fontFamily = "Tahoma";
        t.fontSize = 26;
        t.horizontalAlign = "center";
        t.left = 5;
        t.minHeight = 28;
        t.right = 5;
        t.text = "titleDisplay";
        t.textColor = 0x727070;
        t.verticalAlign = "middle";
        t.verticalCenter = 0;
        return t;
    };
    _proto.titleDisplay_i = function () {
        var t = new lark.gui.Label();
        this.titleDisplay = t;
        t.fontFamily = "Tahoma";
        t.fontSize = 26;
        t.horizontalAlign = "center";
        t.left = 5;
        t.minHeight = 28;
        t.right = 5;
        t.text = "titleDisplay";
        t.textColor = 0x727070;
        t.verticalAlign = "middle";
        t.verticalCenter = 0;
        return t;
    };
    _proto.moveArea_i = function () {
        var t = new lark.gui.Group();
        this.moveArea = t;
        t.height = 50;
        t.left = 6;
        t.right = 6;
        t.elementsContent = [this.titleDisplay_i(),this.titleDisplay_i()];
        return t;
    };
    _proto.contentDisplay_i = function () {
        var t = new lark.gui.Label();
        this.contentDisplay = t;
        t.bottom = 45;
        t.fontFamily = "Tahoma";
        t.fontSize = 22;
        t.horizontalAlign = "center";
        t.left = 1;
        t.right = 1;
        t.text = "contentDisplay";
        t.textColor = 0x727070;
        t.top = 36;
        t.verticalAlign = "middle";
        return t;
    };
    _proto.contentDisplay_i = function () {
        var t = new lark.gui.Label();
        this.contentDisplay = t;
        t.bottom = 45;
        t.fontFamily = "Tahoma";
        t.fontSize = 22;
        t.horizontalAlign = "center";
        t.left = 1;
        t.right = 1;
        t.text = "contentDisplay";
        t.textColor = 0x727070;
        t.top = 36;
        t.verticalAlign = "middle";
        return t;
    };
    Object.defineProperty(__proto, "skinParts", {
        get: function () {
            return ["titleDisplay","moveArea","contentDisplay"];
        },
        enumerable: true,
        configurable: true
    });
    return AlertSkin;
})();
