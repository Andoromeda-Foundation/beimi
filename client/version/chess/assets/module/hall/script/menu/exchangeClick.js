var beiMiCommon = require("BeiMiCommon");

cc.Class({
    extends: beiMiCommon,

    properties: {
        currencyForm: {
            //选择币种UI
            default: null,
            type: cc.Node
        },
        currencyMenu: {
            //选择币种UI下拉选单
            default: null,
            type: cc.Node
        },
        currencyLabel: {
            //选择币种文本
            default: null,
            type: cc.Label
        },
        pointsLabel: {
            //转账点数文本
            default: null,
            type: cc.Label
        },
        balanceLabel: {
            //玩家余额文本
            default: null,
            type: cc.Label
        },
        //键盘音效
        buttonAudio: {
            default: null,
            type: cc.AudioClip
        },
        moneyArray: {
            //货币
            default: [],
            type: cc.Label
        },
        popups: {
            //弹窗
            default: null,
            type: cc.Node
        },
        popupsLabel1: {
            //弹窗标题
            default: null,
            type: cc.Label
        },
        popupsLabel2: {
            //弹窗正文
            default: null,
            type: cc.Label
        },
        buttonArray: {
            //按钮
            default: [],
            type: cc.Button
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.pointsString = "0";
        this.points = 0;

    },

    start () {
        //持续监听到触摸事件,监听到就执行selectCurrency
        this.currencyForm.on("touchstart", this.selectCurrency, this);
    },

    //开关币种选单
    selectCurrency: function () {
        if (this.currencyMenu.active) {
            this.currencyMenu.active = false;
        } else {
            this.currencyMenu.active = true;
        }
    },

    //切换币种
    changeCurrency: function (event, customEventData) {
        this.currentCurrency = customEventData;

        console.log("当前币种：" + this.currentCurrency);
        switch (this.currentCurrency) {
            case "1":
                //改变currencyLabel显示的文本
                this.currencyLabel.string = "金幣";
                break;
            case "2":
                this.currencyLabel.string = "禮券";
                break;
            case "3":
                this.currencyLabel.string = "娛樂幣";
                break;
            case "4":
                this.currencyLabel.string = "紅利";
                break;
        }
        this.balance = this.playerInfo.balance[this.currentCurrency - 1].amount;

        if (this.points > this.balance) {
            this.points = this.balance;
            this.pointsString = this.balance.toFixed();
            this.pointsLabel.string = this.points;
        }
        //根据汇率显示兑换后额度的部分
        // if (this.playerInfo.gameInfo != null) {
        //     this.balanceLabel.string = this.points * this.playerInfo.gameInfo[this.currentCurrency - 1].rate;
        // }
        this.currencyMenu.active = false;
    },

    //虚拟键盘输入
    keyboard: function (event, customEventData) {
        //播放声音
        // if (this.playerInfo.soundEffectControl) {
        //     cc.audioEngine.playEffect(this.buttonAudio, false);
        // }
        switch (customEventData) {
            case "backspace":
                this.pointsString = this.pointsString.slice(
                    0,
                    this.pointsString.length - 1
                );
                break;
            case "remove":
                this.pointsString = "";
                break;
            default:
                this.pointsString += customEventData;
        }
        this.points = Number(this.pointsString);
        console.log(this.points);
        //判断是否超过余额
        if (this.points > this.balance) {
            this.points = this.balance;
            this.pointsString = this.balance.toFixed();
        }

        //换币最大值
        var maxVal = 1000000000;
        if (this.points > maxVal) {
            this.points = maxVal;
            this.pointsString = maxVal.toFixed();
        }

        //将输入结果显示在pointsLabel组件上
        this.pointsLabel.string = this.points;
        //根据汇率显示兑换后额度的部分
        // if (this.playerInfo.gameInfo != null) {
        //     this.balanceLabel.string = this.points * this.playerInfo.gameInfo[this.currentCurrency - 1].rate;
        // }
    },

    //更新按钮
    updateButton: function (event, customEventData) {
        console.log("更新按钮被按下");
        this.gameExit = true;
        //ConnectionUiSwitch = false;
        //断开连接
        //this.canvasNode.getComponent("LobbyMain").exitGame_Function();
        //重新加载
        cc.director.loadScene("hall");
    },

    //返回按钮
    returnButton: function (event, customEventData) {
        this.redirectToHomeWeb();
    },

    //确认按钮
    confirmButton: function (event, customEventData) {
        console.log("确认按钮被按下");
        if (this.currentCurrency == "2" | this.currentCurrency == "4") {
            if (Number(this.points) % 2 != 0) {
                //输入金额为0时
                this.tipBox("對幣失敗", "紅利和禮券只允許兌換偶數個", 2);
                return;
            }
        }

        if (this.points != 0) {
            this.closeAllButtons();
            //兑换的代码写在这里
            this.closeOpenWin();//关闭换币窗口

        } else {
            //输入金额为0时
            this.tipBox("對幣失敗", "請輸入大於0的金額", 2);
        }
    },

    //关闭按钮避免误触
    closeAllButtons: function () {
        this.buttonArray.forEach((button) => {
            button.interactable = false;
        });
    },

    //结果弹窗
    tipBox: function (popupsLabel1, popupsLabel2, respResult) {
        if(respResult = null) {
            respResult = 2;
        }
        this.respResult = respResult;
        this.popups.active = true;
        this.popupsLabel1.string = popupsLabel1;
        this.popupsLabel2.string = popupsLabel2;
    },

    //弹窗当中的确认按钮
    popupsConfirmButton: function () {
        this.popups.active = false;
        console.log("this.respResult:" + this.respResult);
        switch (this.respResult) {
            case 0:
                //重新加载场景
                console.log("重新加载场景");
                // this.canvasNode.getComponent("LobbyMain").exitGame_Function();
                // this.playerInfo.gameBalance = 0;
                cc.director.loadScene("hall");
                break;
            case 1:
                //兑换成功
                // this.canvasNode.getChildByName("com_Button").active = true;
                // this.canvasNode.getChildByName("com_GameMenu").active = true;
                // this.canvasNode.getChildByName("Transfer_Window").active = false;
                // this.grabBullButtonClick_Function();
                this.closeOpenWin();//关闭换币窗口
                break;
            case 2:
                //关掉窗口什么都不做
                break;
            case 3:
                //退出游戏
                console.log("退出游戏");
                this.redirectToHomeWeb();
                break;
        }
    },

    //跳转到娱乐家大厅
    redirectToHomeWeb: function () {
        //window.location.href = this.playerInfo.homeServer;
        window.location.href = 'http://ec2-13-112-176-197.ap-northeast-1.compute.amazonaws.com';
    },

    // update (dt) {},
});
