const RenderEngine = require('./RenderEngine.js');
const TextButton = require('../model/TextButton.js');
const IconButton = require('../model/IconButton.js');
const InputField = require('../model/InputField.js');
const AlertBox = require('../model/AlertBox.js');
const Label = require('../model/Label.js');
const Text = require('../model/Text.js');
const PlayerBar = require('../model/PlayerBar.js');
const {COLOR, FONT, SVG_DATA, testHost} = require('../model/Utils.js');

module.exports = class InputLayerRenderEngine extends RenderEngine {
  constructor(ctx,inputHandler,layerInterface) {
    super(ctx)

    this.inputHandler = inputHandler;
    this.menuElements = []
    this.state = 'menu';
    this.connectionMethod = ''
    this.layerInterface = layerInterface;
    this.pointing = false;
    this.reset();
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

  renderMenu() {
    this.pointing = false;
    let hover = false;
    this.layerInterface.gameState = this.state;
    if (this.state === 'ingame') {
      this.clear();
    } else {
      this.renderBackground(COLOR.darkGrey);
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

    if (this.layerInterface.players && this.layerInterface.players.length !== 0) {
      this.renderPlayerBars(this.layerInterface.players);
    }

    if (this.pointing) {
      this.ctx.canvas.style.cursor = 'pointer';
    } else {
      this.ctx.canvas.style.cursor = 'auto';
    }
  }

  reset() {
    let alerts = [];
    let host = '', playerName = '';
    console.log('resetting buttons');
    ['joinButton','hostButton','hostGameButton','hostInput','playerNameInput'].forEach(b => {
      this.inputHandler.deleteClickEventBinding(b);
    });
    if (this.layerInterface.alert) {
      this.addAlertBox(this.generateAlertBox(
        this.layerInterface.alert.text,
        this.layerInterface.alert.label
      ),(parent,self) => {
        parent.inputHandler.deleteClickEventBinding(self.label);
        parent.menuElements = parent.menuElements.filter(e => {
          return e.label !== self.label;
        });
      });
    }
    delete this.layerInterface.alert;
    this.menuElements.forEach(elem => {
      if (elem instanceof AlertBox) {
        alerts.push(elem);
      }
    });
    if (this.state === 'menu') {
      this.loadMenu();
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
            host = elem.text;
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
          'notSetAlertBox'
        ),(parent,self) => {
          parent.inputHandler.deleteClickEventBinding(self.label);
          parent.menuElements = parent.menuElements.filter(e => {
            return e.label !== self.label;
          });
        });
      } else {
        if (!testHost(host)) {
          this.state = 'menu';
          this.loadMenu();
          alerts = [];
          this.addAlertBox(this.generateAlertBox(
            'Wrong host address.',
            'wrongHostAlertBox'
          ),(parent,self) => {
            parent.inputHandler.deleteClickEventBinding(self.label);
            parent.menuElements = parent.menuElements.filter(e => {
              return e.label !== self.label;
            });
          });
        } else {
          this.layerInterface.host = host;
          this.layerInterface.playerName = playerName;
          this.layerInterface.connectionMethod = this.connectionMethod;
          if (this.connectionMethod !== '') {
            this.loadGameLobby();
          }
          this.connectionMethod = '';
        }
        console.log("game lobby initialized");
        // check if lobby can be created (right address and name is unique...)

        // communicate to game logic layer

        // delete all buttons and stuff here

        // init a lobby screen
      }
    }
    alerts && this.menuElements.push(...alerts);

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

  generateAlertBox(text,label) {
    let fontSize = this.ctx.canvas.width * .02;
    let textWidth = Text.calcWidthFromText(this.ctx,text,fontSize,'Kreon-Bold');
    let alertWidth = textWidth + textWidth * 0.2;
    let a = new AlertBox(
      alertWidth * 0.6,// x in abbh von text,
      this.ctx.canvas.width * .08,// y in abh. von text und ggf. von anderen alertboxen,
      alertWidth, // width in abh. von text
      this.ctx.canvas.width * .05,
      {
        hover: COLOR.alertRedHover,
        idle: COLOR.alertRed,
        text: COLOR.darkGray
      },
      label,
      text
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
    ), self => {
      self.state = 'join-game';
      self.reset();
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
    ), self => {
      self.state = 'host-game';
      self.reset();
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
    ), self => {
      //self.state = 'settings';
      self.state = 'menu';
      self.reset();
    });
  }

}
