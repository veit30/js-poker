const RenderEngine = require('./RenderEngine.js');
const TextButton = require('../model/TextButton.js');
const SwitchTextButton = require('../model/SwitchTextButton.js');
const IconButton = require('../model/IconButton.js');
const InputField = require('../model/InputField.js');
const AlertBox = require('../model/AlertBox.js');
const Label = require('../model/Label.js');
const Text = require('../model/Text.js');
const PlayerBar = require('../model/PlayerBar.js');
const Countdown = require('../model/Countdown.js');
const Slider = require('../model/Slider.js');
const Avatar = require('../model/Avatar.js');
const {COLOR, FONT, SVG_DATA, testHost, PLAYER_POSITION, playersAvatarPosition,
  avatarWidth, playersNameLabelProperties, playersMoneyLabelProperties, tableHeight, playersChipLabelProperties
} = require('../model/Utils.js');

module.exports = class InputLayerRenderEngine extends RenderEngine {
  constructor(ctx,inputHandler) {
    super(ctx)

    this.inputHandler = inputHandler;
    this.menuElements = []
    this.state = 'menu';
    this.connectionMethod = ''
    this.inputs = {}; // can have host and name
    this.alert = {}; // can have text and label
    this.players;
    this.playersCall = {
      call: '', // call, fold, raise, check
      money: 0, // when raised then taken,
    }
    this.pointing = false;
    this.readyState = false;
    this.playerId;
    this.reset();
  }

  resetPlayersCall() {
    this.playersCall = {
      call: '', // call, fold, raise, check
      money: 0, // when raised then taken,
    }
  }

  addButton(button,callback) {
    this.inputHandler.bindOnClickEvent(ev => {
      if (button.intersect({x:ev.x, y:ev.y})) {
        console.log(`Clicked at Button ${button.label}`);
        this.ctx.canvas.style.cursor = 'auto';
        callback(this);
      }
    }, button.label);

    this.menuElements.push(button);
  }

  addSlider(slider, dragCallback) {
    this.inputHandler.bindOnDrag(ev => {
      if (slider.intersect({x:ev.x,y:ev.y})) {
        // console.log(`slider move ${slider.label}`);
      };
      dragCallback(slider,{x:ev.x,y:ev.y});
    }, slider.label);
    this.inputHandler.bindOnMouseDown(ev => slider.intersect({x:ev.x,y:ev.y}), slider.label);
    this.menuElements.push(slider);
  }

  addInputField(inputField,callback) {
    this.inputHandler.bindOnClickEvent(ev => {
      if(inputField.intersect({x:ev.x, y:ev.y})) {
        console.log(`Clicked at InputField: ${inputField.label}`);
        inputField.focus = true;
        this.ctx.canvas.style.cursor = 'auto';
        callback(this);
      } else {
        inputField.focus = false;
      }
    },inputField.label);

    this.menuElements.push(inputField);
  }

  addAlertBox(alertBox,callback) {
    this.inputHandler.bindOnClickEvent(ev => {
      if(alertBox.intersect({x:ev.x, y:ev.y})) {
        console.log(`Clicked at AlertBox: ${alertBox.label}`);
        this.ctx.canvas.style.cursor = 'auto';
        callback(this,alertBox);
      }
    },alertBox.label);

    this.menuElements.push(alertBox);
  }

  addAvatar(avatar,callback) {
    this.menuElements.push(avatar);
  }

  renderMenu() {
    this.pointing = false;
    let hover = false;
    if (this.state === 'ingame') {
      this.clear();
    } else {
      this.renderBackground(COLOR.darkGrey);
      // this.clear();
    }
    this.menuElements.forEach(me => {
      hover = me.intersect(this.inputHandler.cursor);
      hover && (this.pointing = true);
      if (me instanceof InputField && me.focus) {
        let text = me.text;
        let key = this.inputHandler.getPressedKey();
        if (key) {
          if (key.key === 'Backspace') { // for deleting stuff
            text = text.slice(0, -1);
          } else if (key.key === 'Tab') {
            me.focus = false;
            this.menuElements.forEach(me2 => {
              if (me2.label !== me.label) {
                me2.focus = true;
              }
            })
          } else if (key.key.length === 1){ // only single character
            text += key.key;
          }
        }
        me.text = text;
      }
      me.render(this.ctx,hover);
    })

    if (this.state === 'game-lobby') {
      if (this.players && this.players.length !== 0) {
        this.renderPlayerBars(this.players);
      }
    }

    if (this.pointing) {
      this.ctx.canvas.style.cursor = 'pointer';
    } else {
      this.ctx.canvas.style.cursor = 'auto';
    }
  }

  reset() {

    // this.players = [
    //   {
    //     positionId: 0,
    //     name: 'Player0',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 1,
    //     name: 'Player1',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 2,
    //     name: 'Player2',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 3,
    //     name: 'Player2',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 4,
    //     name: 'Player2',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 5,
    //     name: 'Player2',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 6,
    //     name: 'Player2',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   },
    //   {
    //     positionId: 7,
    //     name: 'Player2',
    //     avatar: '#'+Math.floor(Math.random()*16777215).toString(16),
    //     money: 600,
    //   }
    // ]
    this.resetPlayersCall();
    let alerts = [];
    let host = '', playerName = '';
    console.log('resetting buttons');
    ['joinButton','hostButton','hostGameButton','hostInput','playerNameInput'].forEach(b => {
      this.inputHandler.deleteClickEventBinding(b);
    });
    if (this.alert && this.alert.text) {
      this.addAlertBox(this.generateAlertBox(
        this.alert.text,
        this.alert.label,
        this.alert.type
      ),(parent,self) => {
        parent.inputHandler.deleteClickEventBinding(self.label);
        parent.menuElements = parent.menuElements.filter(e => {
          return e.label !== self.label;
        });
      });
    }
    this.alert = {};
    this.menuElements.forEach(elem => {
      if (elem instanceof AlertBox) {
        alerts.push(elem);
      }
    });
    if (this.state === 'menu') {
      this.loadMenu();
      // this.loadIngameView();
    } else if (this.state === 'host-game') {
      this.loadHostMenu();
    } else if (this.state === 'join-game') {
      this.loadJoinMenu();
    } else if (this.state === 'ingame') {
      this.loadIngameView();
    } else if (this.state === 'game-lobby') {
      let empty = false;
      this.menuElements.forEach(elem => {
        if (elem instanceof InputField) {
          if (elem.text === '') {
            empty = true
          }
          if (elem.label === 'hostInput') {
            // TEST
            if (elem.text === 'lh') {
              host = 'localhost:3000'
            } else {
              host = elem.text;
            }
          }
          if (elem.label === 'playerNameInput') {
            playerName = elem.text;
          }
        }
      })
      if (empty) {
        this.state = 'menu';
        this.loadMenu();
        alerts = [];
        this.addAlertBox(this.generateAlertBox(
          'Name or host not set, try again!',
          'notSetAlertBox',
          'warn'
        ),(parent,self) => {
          parent.inputHandler.deleteClickEventBinding(self.label);
          parent.menuElements = parent.menuElements.filter(e => {
            return e.label !== self.label;
          });
        });
      } else {
        if (host !== '' && !testHost(host)) {
          this.state = 'menu';
          this.loadMenu();
          alerts = [];
          this.addAlertBox(this.generateAlertBox(
            'Wrong host address.',
            'wrongHostAlertBox',
            'warn'
          ),(parent,self) => {
            parent.inputHandler.deleteClickEventBinding(self.label);
            parent.menuElements = parent.menuElements.filter(e => {
              return e.label !== self.label;
            });
          });
        } else {
          this.inputs.host = host;
          this.inputs.name = playerName;
          // if (this.connectionMethod !== '') {
          //   this.loadGameLobby();
          // }
        }
        this.loadGameLobby();
        console.log("game lobby initialized");
      }
    }
    alerts && this.menuElements.push(...alerts);
  }

  initStartCountdown() {
    // delete countdown labels and countdown
    this.menuElements.push(new Label(
      this.ctx.canvas.width * .75,
      this.ctx.canvas.height * .9,
      'Game starting in...',
      this.ctx.canvas.height * .02,
      COLOR.shadedWhite,
      'center',
      'countdown'
    ));
    this.menuElements.push(new Countdown(
      this.ctx.canvas.width * .9,
      this.ctx.canvas.height * .9,
      3,
      this.ctx.canvas.height * .02,
      COLOR.shadedWhite,
      'right',
      'countdown',
      () => {
        this.abordStartCountdown();
        // something here?
      }
    ));
  }

  abordStartCountdown() {
    this.menuElements = this.menuElements.filter(me => {
      return me.label != 'countdown';
    });
  }

  renderPlayerBars(players) {
    let baseY = this.ctx.canvas.height * .2,
    width = this.ctx.canvas.width * .4,
    height = this.ctx.canvas.height * .04;
    players.forEach((p,i) => {
      PlayerBar.render(
        this.ctx,
        this.ctx.canvas.width * .5,
        baseY + height * 1.3 * i,
        width,
        height,
        p
      );
    });
  }

  generateAlertBox(text,label,type) {
    let fontSize = this.ctx.canvas.width * .02;
    let textWidth = Text.calcWidthFromText(this.ctx,text,fontSize,'Kreon-Bold');
    let alertWidth = textWidth + textWidth * 0.2;
    let a = new AlertBox(
      alertWidth * 0.6,// x in abbh von text,
      this.ctx.canvas.width * .08,// y in abh. von text und ggf. von anderen alertboxen,
      alertWidth, // width in abh. von text
      this.ctx.canvas.width * .05,
      {
        warn: {
          hover: COLOR.alertRedHover,
          idle: COLOR.alertRed,
          text: COLOR.darkGray
        },
        neutral: {
          hover: COLOR.alertRedHover,
          idle: COLOR.alertRed,
          text: COLOR.darkGray
        },
        good: {
          hover: COLOR.alertGreenHover,
          idle: COLOR.alertGreen,
          text: COLOR.darkGray
        }
      },
      label,
      text,
      type
    );
    return a
  }

  loadHostMenu() {
    this.menuElements = [];
    this.addButton(new TextButton(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 + this.ctx.canvas.width * 0.1,
      this.ctx.canvas.width * .25,
      this.ctx.canvas.width * .05,
      {
        idle : COLOR.blue,
        hover : COLOR.darkerBlue,
        stroke : COLOR.white,
        text : COLOR.white
      },
      'hostGameButton',
      'Host'
    ), parent => {
      parent.state = 'game-lobby';
      parent.connectionMethod = "host";

      // player is hosting and joining the lobby!
      parent.reset();
    });

    this.addInputField(new InputField(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.18,
      this.ctx.canvas.width * .3,
      this.ctx.canvas.width * .06,
      {
        idle: COLOR.lighterGray,
        hover: COLOR.darkGray,
        text: COLOR.white
      },
      'hostInput',
      ''
    ), parent => true);

    this.addInputField(new InputField(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * .05,
      this.ctx.canvas.width * .3,
      this.ctx.canvas.width * .06,
      {
        idle: COLOR.lighterGray,
        hover: COLOR.darkGray,
        text: COLOR.white
      },
      'playerNameInput',
      ''
    ), parent => true);

    this.menuElements.push(new Label(
      this.ctx.canvas.width * .5 - this.ctx.canvas.width * .15,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.11,
      'Your player name:',
      this.ctx.canvas.width * .04,
      COLOR.white,
      'left',
      'nameLabel'
    ));

    this.menuElements.push(new Label(
      this.ctx.canvas.width * .5 - this.ctx.canvas.width * .15,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.24,
      'Host address:',
      this.ctx.canvas.width * .04,
      COLOR.white,
      'left',
      'hostLabel'
    ));
  }

  loadJoinMenu() {
    this.menuElements = [];
    this.addButton(new TextButton(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 + this.ctx.canvas.width * 0.1,
      this.ctx.canvas.width * .25,
      this.ctx.canvas.width * .05,
      {
        idle : COLOR.blue,
        hover : COLOR.darkerBlue,
        stroke : COLOR.white,
        text : COLOR.white
      },
      'joinButton',
      'Join now'
    ), parent => {
      parent.state = 'game-lobby';
      parent.connectionMethod = "join"
      parent.reset();
    });

    this.addInputField(new InputField(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.18,
      this.ctx.canvas.width * .3,
      this.ctx.canvas.width * .06,
      {
        idle: COLOR.lighterGray,
        hover: COLOR.darkGray,
        text: COLOR.white
      },
      'hostInput',
      '',
    ), parent => true);

    this.addInputField(new InputField(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * .05,
      this.ctx.canvas.width * .3,
      this.ctx.canvas.width * .06,
      {
        idle: COLOR.lighterGray,
        hover: COLOR.darkGray,
        text: COLOR.white
      },
      'playerNameInput',
      '',
    ), parent => true);

    this.menuElements.push(new Label(
      this.ctx.canvas.width * .5 - this.ctx.canvas.width * .15,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.11,
      'Your player name:',
      this.ctx.canvas.width * .04,
      COLOR.white,
      'left',
      'nameLabel'
    ));

    this.menuElements.push(new Label(
      this.ctx.canvas.width * .5 - this.ctx.canvas.width * .15,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.24,
      'Host address:',
      this.ctx.canvas.width * .04,
      COLOR.white,
      'left',
      'hostLabel'
    ));
  }

  loadGameLobby() {
    this.menuElements = [];
    this.menuElements.push(new Label(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .1,
      'Lobby',
      this.ctx.canvas.height * .05,
      COLOR.shadedWhite,
      'center',
      'lobby-label'
    ));
    this.addButton(new SwitchTextButton(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .9,
      this.ctx.canvas.width * .25,
      this.ctx.canvas.width * .05,
      {
        idle : COLOR.buttonGray,
        hover : COLOR.buttonGrayHover,
        triggeredHover: COLOR.buttonGreenHover,
        triggeredIdle: COLOR.buttonGreen,
        stroke : COLOR.white,
        text : COLOR.white
      },
      'readyButton',
      ['Not Ready','Ready']
    ), parent => {
      let t = false;
      parent.menuElements.forEach(me => {
        if (me instanceof SwitchTextButton && me.label === 'readyButton') {
          me.trigger();
          t = me.triggered;
        }
      });
      parent.readyState = t;
      // self.state = 'game-lobby';
      // self.reset();
    })
    // make some blinking text here and a cancel button.
    // once a player connected there need to be a ready button
    // when all players are ready then the game starts immedeatly
  }

  loadMenu() {
    this.menuElements = [];
    this.addButton(new TextButton(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 - this.ctx.canvas.width * 0.03,
      this.ctx.canvas.width * .25,
      this.ctx.canvas.width * .05,
      {
        idle : COLOR.blue,
        hover : COLOR.darkerBlue,
        stroke : COLOR.white,
        text : COLOR.white
      },
      'joinButton',
      'Join game'
    ), parent => {
      parent.state = 'join-game';
      parent.reset();
    });
    this.addButton(new TextButton(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5 + this.ctx.canvas.width * 0.03,
      this.ctx.canvas.width * .25,
      this.ctx.canvas.width * .05,
      {
        idle : COLOR.blue,
        hover : COLOR.darkerBlue,
        stroke : COLOR.white,
        text : COLOR.white
      },
      'hostButton',
      'Host game'
    ), parent => {
      parent.state = 'host-game';
      parent.reset();
    });
    this.addButton(new IconButton(
      this.ctx.canvas.width - this.ctx.canvas.width * .035,
      this.ctx.canvas.width * .035,
      this.ctx.canvas.width * .05,
      this.ctx.canvas.width * .05,
      {
        idle: COLOR.white,
        hover: COLOR.shadedWhite
      },
      'settingsButton',
      SVG_DATA.gearlock
    ), parent => {
      //self.state = 'settings';
      parent.state = 'menu';
      parent.reset();
    });

  }

  loadIngameView() {
    console.log("loaded ingame view");
    this.menuElements = [];
    let avatarPos, moneyLabelProps, nameLabelProps, chipLabelProps;
    // player müssen nach reordering geupdatet werden
    this.players.forEach(p => {
      avatarPos = playersAvatarPosition(p.positionId,this.ctx.canvas);
      moneyLabelProps = playersMoneyLabelProperties(p.positionId,this.ctx.canvas);
      nameLabelProps = playersNameLabelProperties(p.positionId,this.ctx.canvas);
      chipLabelProps = playersChipLabelProperties(p.positionId,this.ctx.canvas);
      this.addAvatar(new Avatar(
        avatarPos.x,
        avatarPos.y,
        avatarWidth(this.ctx.canvas),
        p.avatar,
        p.broke ? 'broke' : p.hasTurn ? 'active' : ''
      ));

      this.menuElements.push(new Label(
        nameLabelProps.x,
        nameLabelProps.y,
        p.name,
        nameLabelProps.size,
        p.broke ? COLOR.chipGrey : p.hasTurn ? COLOR.alertGreenHover : COLOR.white,
        'center',
        'PlayerName-' + p.clientId,
        true
      ));
      this.menuElements.push(new Label(
        moneyLabelProps.x,
        moneyLabelProps.y,
        p.money,
        moneyLabelProps.size,
        p.broke ? COLOR.chipGrey : p.hasTurn ? COLOR.alertGreenHover : COLOR.white,
        'center',
        'PlayerMoney-' + p.clientId,
        true
      ));
      if (p.chipMoney > 0) {
        this.menuElements.push(new Label(
          chipLabelProps.x,
          chipLabelProps.y,
          p.chipMoney,
          chipLabelProps.size,
          COLOR.white,
          chipLabelProps.alignment,
          'chipLabel-' + p.clientId,
          true
        ));
      }
    });
    let hasTurn = this.players.find(p => p.clientId === this.playerId).hasTurn;
    if (hasTurn) {
      this.addButton(new TextButton(
        this.ctx.canvas.width * .5 - tableHeight(this.ctx.canvas) * .27,
        this.ctx.canvas.height * .5 + tableHeight(this.ctx.canvas) * .22,
        tableHeight(this.ctx.canvas) * .2,
        tableHeight(this.ctx.canvas) * .06,
        {
          idle : COLOR.brown2,
          hover : COLOR.brown,
          stroke : COLOR.white,
          text : COLOR.white
        },
        'callButton',
        'Call'
      ), parent => {
        parent.playersCall = {
          call: 'call',
        }
      });
      this.addButton(new TextButton(
        this.ctx.canvas.width * .5 - tableHeight(this.ctx.canvas) * .27,
        this.ctx.canvas.height * .5 + tableHeight(this.ctx.canvas) * .31,
        tableHeight(this.ctx.canvas) * .2,
        tableHeight(this.ctx.canvas) * .06,
        {
          idle : COLOR.brown2,
          hover : COLOR.brown,
          stroke : COLOR.white,
          text : COLOR.white
        },
        'checkButton',
        'Check'
      ), parent => {
        parent.playersCall = {
          call: 'check',
        }
      });
      this.addButton(new TextButton(
        this.ctx.canvas.width * .5 - tableHeight(this.ctx.canvas) * .27,
        this.ctx.canvas.height * .5 + tableHeight(this.ctx.canvas) * .4,
        tableHeight(this.ctx.canvas) * .2,
        tableHeight(this.ctx.canvas) * .06,
        {
          idle : COLOR.brown2,
          hover : COLOR.brown,
          stroke : COLOR.white,
          text : COLOR.white
        },
        'foldButton',
        'Fold'
      ), parent => {
        parent.playersCall = {
          call: 'fold',
        }
      });

      this.addButton(new TextButton(
        this.ctx.canvas.width * .5 + tableHeight(this.ctx.canvas) * .27,
        this.ctx.canvas.height * .5 + tableHeight(this.ctx.canvas) * .4,
        tableHeight(this.ctx.canvas) * .2,
        tableHeight(this.ctx.canvas) * .06,
        {
          idle : COLOR.brown2,
          hover : COLOR.brown,
          stroke : COLOR.white,
          text : COLOR.white
        },
        'raiseButton',
        'Raise'
      ), parent => {
        parent.playersCall = {
          call: 'raise',
          money: 0
        }
      });

      this.menuElements.push(new Label(
        this.ctx.canvas.width * .5 + tableHeight(this.ctx.canvas) * .27,
        this.ctx.canvas.height * .5 + tableHeight(this.ctx.canvas) * .31,
        0,
        tableHeight(this.ctx.canvas) * 0.05,
        COLOR.white,
        'center',
        'raiseSize'
      ));

      this.addSlider(new Slider(
        this.ctx.canvas.width * .5 + tableHeight(this.ctx.canvas) * .42,
        this.ctx.canvas.height * .5 + tableHeight(this.ctx.canvas) * .4,
        tableHeight(this.ctx.canvas) * .7,
        tableHeight(this.ctx.canvas) * .04,
        'vertical',
        'raiseSlider'
      ), (self,mouse) => {
        self.moveTo(mouse);
        let opi = this.players.findIndex(p => p.clientId === this.playerId);
        let raiseLabelIndex = this.menuElements.findIndex(me => me.label === 'raiseSize');
        this.menuElements[raiseLabelIndex].text = Math.floor(self.value * this.players[opi].money);
        // this.menuElements[raiseLabelIndex].text = Math.floor(self.value * 630);
      });
    }


  }

}
