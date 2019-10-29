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
const Avatar = require('../model/Avatar.js');
const Label = require('../model/Label.js');
const {
  COLOR, KEY, FONT, communityCardPosition, playersCardRotation,
  playersCardPosition, playersAvatarPosition, playersChipPosition, numDots, avatarWidth,
  playersMoneyLabelProperties, playersNameLabelProperties
} = require('../model/Utils.js');
const io = require('socket.io-client');


// controller for poker game
module.exports = class PokerGameController {
  // maybe as player json?
  constructor() {

    this.chips = [];
    this.game;
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
    this.tableView.renderBackground(COLOR.darkGray);
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
      this.tableView.renderBackground(COLOR.darkGray);
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
    this.game.players.forEach(p => {
      gameObjects.push(...p.cards);
      gameObjects.push(...p.chips);
    });
    gameObjects.push(this.game.deck[0]);
    gameObjects.push(...this.game.communityCards);
    gameObjects.push(...this.game.chips);

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
      gameObjects = gameObjects.concat(player.chips);
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
    let pos,rot,avatar,avatarPos, moneyLabelProps, nameLabelProps, moneyLabel, nameLabel;
    let chipAmount = 5;
    let colors = [COLOR.chipPurple,COLOR.chipRed,COLOR.chipBlue,COLOR.chipGrey,COLOR.chipGreen,COLOR.chipYellow]
    let cycle = 0;
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < chipAmount; j++) {
        pos = playersChipPosition(i,j,chipAmount,this.gameCanvas);
        this.gameView.renderChip({
          x: pos.x,
          y: pos.y,
          rotation: 0,
          color: colors[cycle++]
        });
        if (cycle === 5) cycle = 0;
      }
      pos = playersCardPosition(i,0,this.gameCanvas);
      rot = playersCardRotation(i);
      this.gameView.renderCardBack({
        x: pos.x,
        y: pos.y,
        rotation: rot,
      })
      pos = playersCardPosition(i,1,this.gameCanvas);
      this.gameView.renderCardBack({
        x: pos.x,
        y: pos.y,
        rotation: rot,
      });
      // avatarPos = playersAvatarPosition(i,this.inputCanvas);
      // avatar = new Avatar(
      //   avatarPos.x,
      //   avatarPos.y,
      //   avatarWidth(this.inputCanvas),
      //   COLOR.chipBlue
      // );
      // avatar.render(this.inputCanvas.getContext('2d'));
      // moneyLabelProps = playersMoneyLabelProperties(i,this.inputCanvas);
      // nameLabelProps = playersNameLabelProperties(i,this.inputCanvas);
      // moneyLabel = new Label(
      //   moneyLabelProps.x,
      //   moneyLabelProps.y,
      //   '2500',
      //   moneyLabelProps.size,
      //   COLOR.white
      // );
      // moneyLabel.render(this.inputCanvas.getContext('2d'));
      // nameLabel = new Label(
      //   nameLabelProps.x,
      //   nameLabelProps.y,
      //   'Player-' + i,
      //   nameLabelProps.size,
      //   COLOR.white
      // )
      // nameLabel.render(this.inputCanvas.getContext('2d'));
    }
    if (this.inputView.state === 'ingame') {
      switch(this.inputView.playersCall.call) {
        case 'call':
          this.clientSocket.emit('call');
          break;
        case 'fold':
          this.clientSocket.emit('fold');
          break;
        case 'check':
          this.clientSocket.emit('check')
          break;
        case 'raise':
        this.clientSocket.emit('raise',this.inputView.playersCall.money);
      }
      this.updateGameObjects();
      this.renderGameObjects();
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
        this.clientSocket.emit('newGame');
        this.clientSocket.emit('playerJoin',{name:this.inputView.inputs.name});
      } else if (this.inputView.connectionMethod === 'join') {
        this.inputView.connectionMethod = '';
        this.clientSocket = io(`http://${this.inputView.inputs.host}`);
        this.addSocketHandlers();
        setTimeout(() => {
          if (!this.connectToServer) {
            this.inputView.state = 'menu';
            this.sendWarning(`Unable to connect to ${this.inputView.inputs.host}`, 'noConAlert');
            // TODO close connection from clientSocket to prevent reconnect
            // TODO
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

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = undefined;
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
    this.clientSocket.on('confirmId',id => {
      this.inputView.playerId = id;
    })
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
      let players = data.players.map(Player.toPlayer);
      this.inputView.players = players;
    });
    this.clientSocket.on('startGame', data => {
      this.game = Game.toGame(data);
      this.game.players = this.game.players.map(Player.toPlayer);
      this.game.reorderPlayerPositonsTo(this.clientSocket.id);
      this.game.players.forEach(p => {
        p.cards[0] = Card.toCard(p.cards[0]);
        p.cards[1] = Card.toCard(p.cards[1]);
        p.cards[0].setProps({
          x: this.gameCanvas.width * .5,
          y: this.gameCanvas.height * .5 - (this.gameCanvas.width * .4) * .35,
          rotation: 0
        });
        p.cards[1].setProps({
          x: this.gameCanvas.width * .5,
          y: this.gameCanvas.height * .5 - (this.gameCanvas.width * .4) * .35,
          rotation: 0
        });
      });
      this.game.deck = this.game.deck.map(c => {
        c = Card.toCard(c);
        c.setProps({
          x: this.gameCanvas.width * .5,
          y: this.gameCanvas.height * .5 - (this.gameCanvas.width * .4) * .35,
          rotation: 0
        });
        return c;
      });
      // add right player positions
      this.inputView.players = this.game.players;
      this.initGameObjects();
      this.movePlayerCards();
      this.movePlayerChips();
      this.displayPotSize();
      this.inputView.state = 'ingame';
      this.inputView.reset();
    });

    this.clientSocket.on('playerCall', game => {
      // updating all players
      let playerIndex;
      game.players.forEach(p => {
        console.log(p);
        playerIndex = this.game.players.findIndex(gamePlayer => gamePlayer.clientId === p.clientId);
        this.game.players[playerIndex].money = p.money;
        this.game.players[playerIndex].lastBet = p.lastBet;
        this.game.players[playerIndex].hasTurn = p.hasTurn;
        this.game.players[playerIndex].fold = p.fold;
      });
      this.inputView.players = this.game.players;

      this.movePlayerChips();
      this.displayPotSize();
      this.inputView.reset();
    });
    this.clientSocket.on('callWarning', () => {
      sendWarning('You ar not able to call', 'callWarning');
    });
    this.clientSocket.on('connect', () => {
      this.connectToServer = true;
    });
    this.clientSocket.on('addr', data => {
      this.sendGood(`Connected to: [${data.address}:${data.port}]`, 'connectAlert');
    })
  }

  displayPotSize() {
    let potText = new Text(numDots(this.game.pot),this.inputCanvas.width * .03,FONT.MAIN,undefined,undefined,'left');
    let width = potText.calcWidth(this.inputCanvas.getContext('2d'));
    this.tableView.renderText(
      this.inputCanvas.width * .5 + ((this.inputCanvas.width * .08) - width * 1.3),
      this.inputCanvas.height *.5 - this.inputCanvas.width * .054,
      potText
    );
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

  initGameObjects() {
    let gameObjecs = this.collectGameObjects();
    gameObjecs.forEach(g => {
      this.objectController.calcRelPosProp(g);
    })
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
    let card, cardPos;

    for(let i = 0; i < 2; i++) {
      this.game.players.forEach(player => {
        card = player.cards[i];
        cardPos = playersCardPosition(player.positionId,i,this.gameCanvas);
        this.objectController.addMove(card,{
          xd: cardPos.x,
          yd: cardPos.y,
          rotation: playersCardRotation(player.positionId),
          easing: 'ease-out',
          time: 500,
          delay: delay,
          flipAfter: player.clientId === this.clientSocket.id ? true : false
        })
        delay += 200;
      })
    }
  }

  movePlayerChips() {
    let delay = 100;
    let chips, chipPos, bet, avatarPos, chipMoney;
    // proably bugged because not adding new chips but redoing moneyToChips every time
    let chipBackup = {};
    this.game.players.forEach(p => {
      chipBackup[p.clientId] = p.chips;
    });
    console.log(chipBackup);
    this.game.players.forEach(p => {
      chipMoney = p.chips.reduce((a,c) => a+c.value,0);
      bet = p.lastBet - chipMoney;
      chips = this.game.moneyToChips(bet);
      avatarPos = playersAvatarPosition(p.positionId, this.gameCanvas);
      chips = chips.map(c => {
        c.setProps({
          x: avatarPos.x,
          y: avatarPos.y,
          rotation: 0
        });
        return c;
      });
      p.chips = chips;
      p.chips.push(...chipBackup[p.clientId]);
      p.chips.map((c,i) => {
        chipPos = playersChipPosition(p.positionId,i,p.chips.length,this.gameCanvas);
        console.log(chipPos);
        this.objectController.addMove(c, {
          xd: chipPos.x,
          yd: chipPos.y,
          rotation: 0,
          easing: 'ease-out',
          time: 200,
          delay: delay
        });
        delay += 100;
        return c;
      });
    })

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
