cc.Class({
    extends: cc.Component,

    properties: {
        target:{
            default:null ,
            type : cc.Node
        },
        button:{
            default:null ,
            type : cc.Node
        },
    },

    // use this for initialization
    //onLoad: function () {},

    start() {
        this.handCards = this.target.getComponent("HandCards");
    },

    onClick () {
        if(this.handCards.take == true){
            //出牌
            this.node.dispatchEvent( new cc.Event.EventCustom('takecard', true) );
        }else{
            this.handCards.uncheck();
            this.handCards.take = true;
            this.target.y = this.target.y + 30;
        }
    },
});
