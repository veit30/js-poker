const RenderEngine = require('../view/RenderEngine.js');
const TableRenderEngine = require('../view/TableRenderEngine.js');
const GameRenderEngine = require('../view/GameRenderEngine.js');
const InputLayerRenderEngine = require('../view/InputLayerRenderEngine.js');
const Card = require('../model/Card.js');
const Player = require('../model/Player.js');
const GameObjectController = require('./GameObjectController.js');
const InputHandler = require('./InputHandler.js');
const Text = require('../model/Text.js');
const Game = require('../model/Game.js');
const GameServer = require('../server/GameServer.js');
const SwitchTextButton = require('../model/SwitchTextButton.js');
const {
  COLOR, KEY, FONT, communityCardPosition, playersCardRotation,
  playersCardPosition
} = require('../model/Utils.js');
const io = require('socket.io-client');


// controller for poker game
module.exports = class PokerGameController {
  // maybe as player json?
  constructor(options) {

    this.options = options;
    this.chips = [];
    this.tableCanvas;
    this.gameCanvas;
    this.inputCanvas;
    this.inputFields = []
    this.server;
    this.serverSocket;
    this.clientSocket;
    this.connectToServer = false;
    this.ckientReadyState = false;
    this.inputHandler = new InputHandler();
    this.setupCanvas();
    this.tableView = new TableRenderEngine(this.tableCanvas.getContext('2d'));
    this.gameView = new GameRenderEngine(this.gameCanvas.getContext('2d'));
    this.inputView = new InputLayerRenderEngine(
      this.inputCanvas.getContext('2d'),
      this.inputHandler
    );
    this.objectController = new GameObjectController(this.gameCanvas.getContext('2d'));
    this.addResizeListener();
    this.tableView.renderBackground(COLOR.lightGray);
    this.tableView.renderTable();

  }

  addResizeListener() {
    this.resizeEnd;

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeEnd);
      this.stop();
      this.resizeEnd = setTimeout(() => {
        let evt = new Event('resize-end');
        window.dispatchEvent(evt);
      }, 200);
    });


    window.addEventListener('resize-end',() => {
      this.updateCanvas();
      this.tableView.renderBackground(COLOR.lightGray);
      this.tableView.renderTable();
      this.objectController.windowResized = true;
      this.inputView.reset();
      // this.game.potChanged = true;
      this.start();
    });
  }

  updateCanvas() {
    this.tableCanvas.width = this.tableCanvas.clientWidth;
    this.tableCanvas.height = this.tableCanvas.clientHeight;
    this.gameCanvas.width = this.gameCanvas.clientWidth;
    this.gameCanvas.height = this.gameCanvas.clientHeight;
    this.inputCanvas.width = this.inputCanvas.clientWidth;
    this.inputCanvas.height = this.inputCanvas.clientHeight;
  }

  renderGameObjects() {
    let gameObjects = [];
    for (let player of this.game.players) {
      gameObjects = gameObjects.concat(player.cards);
    }
    gameObjects = gameObjects
      .concat([this.game.deck[0]])
      // .concat(this.game.chips)
      .concat(this.game.communityCards);
    this.gameView.clear();
    this.gameView.renderDeckShadow(
      {
        x: this.gameCanvas.width * .5,
        y: this.gameCanvas.height * .5 - (this.gameCanvas.width * .4) * .35
      },
      'rgba(0,0,0,0.4)'
    );
    for(let go of gameObjects) {
      switch(go.constructor.name) {
        case 'Card': this.gameView.renderCard(go); break;
        case 'Chip': this.gameView.renderChip(go); break;
      }
    }
  }

  updateGameObjects() {
    let gameObjects = [];
    for (let player of this.game.players) {
      gameObjects = gameObjects.concat(player.cards);
    }
    gameObjects = gameObjects
      .concat(this.game.deck)
      //.concat(this.game.chips)
      .concat(this.game.communityCards);
    for (let go of gameObjects) {
      this.objectController.update(go);
    }
    if (this.objectController.windowResized) {
      this.objectController.windowResized = false;
    }
  }
  // testing
  initGame() {
    this.game = new Game(this.gameCanvas);
    this.game.addPlayer(new Player('John',3,283791))
    this.game.addPlayer(new Player('Adam',4,832374))
    this.game.addPlayer(new Player('Daniel',5,832947))
    this.game.addPlayer(new Player('Ive',6,908732))
    this.game.addPlayer(new Player('Luke',7,932874))
    this.game.startNewGame();
    this.movePlayerCards();
    this.initGameObjects();
  }

  // basic game loop function
  async start() {
    this.inputView.renderMenu();
    if (this.inputView.state === 'ingame') {
      // Keyboard inputs are only used for testing purposes for now
      if (this.inputHandler.askKeyPress(KEY.C)) {
        this.flopTurnRiver();
        this.game.round++;
      }
      if (this.inputHandler.askKeyPress(KEY.UP)) {
        this.game.pot++;
        this.game.potChanged = true;
      }
      if (this.inputHandler.askKeyPress(KEY.DOWN)) {
        this.game.pot--;
        this.game.potChanged = true;
      }
      if (this.game.hasNewPot()) {
        this.displayPotSize();
        this.game.noticedPotSize();
      }
      // this.updateGameObjects();
      // this.renderGameObjects();
    } else if (this.inputView.state === 'game-lobby') {
      // first time in lobby
      if (this.inputView.connectionMethod === 'host') {
        this.inputView.connectionMethod = '';
        this.server = new GameServer(this.inputView.inputs.host);
        let init = await this.server.init();
        if (!init) {
          this.inputView.state = 'menu';
          this.sendWarning(`Can't create server on host: ${this.inputView.inputs.host}.`, 'noServerAlert');
          this.raf = requestAnimationFrame(() => this.start());
        }
        this.clientSocket = io(`http://${this.inputView.inputs.host}`);
        this.addSocketHandlers();
        this.clientSocket.emit('newGame', {canvas: this.gameCanvas});
        this.clientSocket.emit('playerJoin',{name:this.inputView.inputs.name});
      } else if (this.inputView.connectionMethod === 'join') {
        this.inputView.connectionMethod = '';
        this.clientSocket = io(`http://${this.inputView.inputs.host}`);
        // wait for max of 3 sec for a connection to happen
        this.addSocketHandlers();
        setTimeout(() => {
          if (!this.connectToServer) {
            this.inputView.state = 'menu';
            this.sendWarning(`Unable to connect to ${this.inputView.inputs.host}`, 'noConAlert');
            this.raf = requestAnimationFrame(() => this.start());
          }
        }, 3000);
        this.clientSocket.emit('playerJoin',{name:this.inputView.inputs.name});
      }
      // everytime else
      if (this.inputView.readyState && !this.clientReadyState) {
        this.clientReadyState = true;
        this.clientSocket.emit('playerReady');
      } else if (!this.inputView.readyState && this.clientReadyState) {
        this.clientReadyState = false;
        this.clientSocket.emit('playerNotReady');
      }

    }
    this.raf = requestAnimationFrame(() => this.start());
  }

  initGameObjects() {
    let gameObjecs = this.collectGameObjects();
    gameObjecs.forEach(g => {
      this.objectController.calcRelPosProp(g);
    })
  }

  sendWarning(text, label) {
    this.inputView.alert = {};
    this.inputView.alert.text = text;
    this.inputView.alert.label = label;
    this.inputView.alert.type = 'warn';
    this.inputView.reset();
  }

  sendGood(text, label) {
    this.inputView.alert = {};
    this.inputView.alert.text = text;
    this.inputView.alert.label = label;
    this.inputView.alert.type = 'good';
    this.inputView.reset();
  }

  addSocketHandlers() {
    this.clientSocket.on('msg', data => {
      console.log(`Received msg:${data.msg}`);
    });
    this.clientSocket.on('returnPlayers', data => {
      if(!data) {
        this.inputView.state = 'menu';
        this.sendWarning('Sorry, max. amout of players reached on table.', 'tableFullAlert');
        return;
      }
      let allReady = data.players.reduce((acc,cur) => {
        if(!acc) return false;
        if (!cur.ready) return false;
        return true;
      },true)
      console.log(data.players, allReady);
      if (allReady && data.players.length === 1) {
        this.sendWarning('Two or more players required to start a game.', 'notEnoughtPlayersAlert');
        // this.clientSocket.emit('playerNotReady');
        this.inputView.menuElements.forEach(me => {
          if (me instanceof SwitchTextButton && me.label === 'readyButton') {
            me.triggered = false;
          }
        });
        this.inputView.readyState = false;
        return;
      } else if (allReady && data.players.length > 1) {
        this.inputView.initStartCountdown();
      } else if (!allReady) {
        this.inputView.abordStartCountdown();
      }
      this.inputView.players = data.players;
    });
    this.clientSocket.on('startGame', () => {
      this.inputView.state = 'ingame';
    })
    this.clientSocket.on('connect', () => {
      this.connectToServer = true;
    });
    this.clientSocket.on('addr', data => {
      this.sendGood(`Connected to: [${data.address}:${data.port}]`, 'connectAlert');
    })
  }

  collectGameObjects() {
    let gameObjects = [];
    this.game.players.forEach(p => {
      gameObjects.push(...p.cards);
      gameObjects.push(...p.chips);
    });
    gameObjects.push(...this.game.deck)
    gameObjects.push(...this.game.communityCards)
    return gameObjects;
  }

  displayPotSize() {
    this.tableView.renderTable();
    let potText = new Text(this.game.potStr,this.inputCanvas.width * .03,FONT.MAIN,undefined,undefined,'left');
    let width = potText.calcWidth(this.inputCanvas.getContext('2d'));
    this.tableView.renderText(
      this.inputCanvas.width * .5 + ((this.inputCanvas.width * .08) - width * 1.15),
      this.inputCanvas.height *.5 - this.inputCanvas.width * .054,
      potText
    );
  }


  moveCommunityCards() {
    this.game.communityCards.forEach(card => {
      if (card.doneMoves == 0) {
        this.objectController.addMove(card,{
          xd: communityCardPosition(this.gameCanvas,i).x,
          yd: communityCardPosition(this.gameCanvas,i).y,
          rotation: 0,
          easing: 'ease-out',
          time: 500,
          delay: 10,
          flipAfter: true
        })
      }
    })
  }

  movePlayerCards() {
    let delay = 500;
    let card;

    for(let i = 0; i < 2; i++) {
      this.game.players.forEach(player => {
        card = player.cards[i];
        this.objectController.addMove(card,{
          xd: playersCardPosition(player.positionId,i,this.gameCanvas).x,
          yd: playersCardPosition(player.positionId,i,this.gameCanvas).y,
          rotation: playersCardRotation(player.positionId),
          easing: 'ease-out',
          time: 500,
          delay: delay,
          flipAfter: true
        })
        delay += 500;
      })
    }


  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = undefined;
  }

  setupCanvas() {
    this.tableCanvas = document.createElement('canvas');
    this.gameCanvas = document.createElement('canvas');
    this.inputCanvas = document.createElement('canvas');

    this.tableCanvas.id = 'table-canvas';
    this.gameCanvas.id = 'game-canvas';
    this.inputCanvas.id = 'input-canvas';
    this.tableCanvas.style.zIndex = '1';
    this.gameCanvas.style.zIndex = '2';
    this.inputCanvas.style.zIndex = '3';

    document.body.appendChild(this.tableCanvas);
    document.body.appendChild(this.gameCanvas);
    document.body.appendChild(this.inputCanvas);

    this.updateCanvas();

  }
}
