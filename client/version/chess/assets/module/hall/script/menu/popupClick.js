var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,

    properties: {
        checkout: {
            default: null,
            type: cc.Prefab
        },
        popup: {
            default: null,
            type: cc.Node
        }
    },

    // onLoad () {},

    start () {

    },

    defineButton() {
        cc.beimi.openwin = cc.instantiate(this.checkout);
        cc.beimi.openwin.parent = this.root();
        this.popup.destroy();
    },

    // update (dt) {},
});
