const RenderEngine = require('./RenderEngine.js');
const TextButton = require('../model/TextButton.js');
const IconButton = require('../model/IconButton.js');
const InputField = require('../model/InputField.js');
const AlertBox = require('../model/AlertBox.js');
const Label = require('../model/Label.js');
const {COLOR, FONT, SVG_DATA} = require('../model/Utils.js');

module.exports = class InputLayerRenderEngine extends RenderEngine {
  constructor(ctx,inputHandler) {
    super(ctx)

    this.inputHandler = inputHandler;
    this.menuElements = []
    this.state = 'menu';
    this.reset();
    this.pointing = false;
    // this.inputFields = {
    //   host: undefined;
    //   name: undefined;
    // }
    // this.updateButtons();
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
    switch(this.state) {
      case 'game-lobby':
      case 'menu':
      case 'host-game':
      case 'join-game': this.renderBackground(COLOR.darkGrey); break;
      case 'ingame': this.clear();
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
          } else if (key.key.length === 1){ // only single character
            text += key.key;
          }
        }
        me.text = text;
      }
      me.render(this.ctx,hover);
    })

    if (this.pointing) {
      this.ctx.canvas.style.cursor = 'pointer';
    } else {
      this.ctx.canvas.style.cursor = 'auto';
    }
  }
  // need to reset all active buttons;
  reset() {
    console.log('resetting buttons');
    ['joinButton','hostButton','hostGameButton','hostInput','playerNameInput'].forEach(b => {
      this.inputHandler.deleteClickEventBinding(b);
    })
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
        if (elem instanceof InputField && elem.text === '') {
          empty = true
        }
      })
      if (empty) {
        this.state = 'menu';
        this.loadMenu();
        this.addAlertBox(new AlertBox(
          this.ctx.canvas.width * .15,
          this.ctx.canvas.width * .15,
          this.ctx.canvas.width * .2,
          this.ctx.canvas.width * .05,
          {
            hover: COLOR.alertRedHover,
            idle: COLOR.alertRed,
            text: COLOR.darkGray
          },
          'inputAlertBox',
          'Name or host not set try again!'
        ),(parent,self) => {
          parent.inputHandler.deleteClickEventBinding(self.label);
          parent.menuElements = parent.menuElements.filter(e => {
            return e.label !== self.label;
          })
        });

      } else {
        console.log("game lobby initialized");
        // check if lobby can be created (right address and name is unique...)

        // communicate to game logic layer

        // delete all buttons and stuff here

        // init a lobby screen
      }
    }
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
      // something to let know that this is a player joining
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
      self.state = 'settings';
      self.reset();
    });
  }

}
