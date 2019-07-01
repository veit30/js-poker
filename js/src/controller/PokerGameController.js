import RenderEngine from '../view/RenderEngine.js';
import TableRenderEngine from '../view/TableRenderEngine.js'
import GameRenderEngine from '../view/GameRenderEngine.js'
import InputLayerRenderEngine from '../view/InputLayerRenderEngine.js'
import Card from '../model/Card.js';
import Player from '../model/Player.js';
import GameObjectController from './GameObjectController.js';
import InputHandler from './InputHandler.js';
import Text from '../model/Text.js'
import {
  COLOR,CARD_SUIT,CARD_VALUE,KEY,FONT,
  communityCardPosition, playersCardRotation, playersCardPosition,numDots
} from '../model/Utils.js';
// controller for poker game
export default class PokerGameController {
  // maybe as player json?
  constructor(options) {

    this.options = options;
    this.players = [];
    this.cards = [];
    this.communityCards = [];
    this.chips = [];
    this.tableCanvas;
    this.gameCanvas;
    this.inputCanvas;
    this.game = {
      round: 0,
      state: 'menu',
      pot: 10000,
      potChanged: true
    };
    this.buttons = [];

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
      this.game.potChanged = true;
      this.start();
    });
  }

  generateCards() {
    let card;
    for (let suit of Object.keys(CARD_SUIT)) {
      for (let value of Object.keys(CARD_VALUE)) {
        card = new Card(
          this.gameCanvas.width * .5,
          this.gameCanvas.height * .5 - (this.gameCanvas.width * .4) * .35,
          0,
          CARD_SUIT[suit],
          CARD_VALUE[value]
        );
        this.objectController.calcRelPosProp(card);
        this.cards.push(card);
      }
    }
  }

  shuffleCards() {
    for (let i = 0, len = this.cards.length; i < len; i++) {
      let randomIndex = Math.floor(Math.random() * len);
      let tmpCard1 = this.cards[randomIndex];
      let tmpCard2 = this.cards[i];
      this.cards[i] = tmpCard1;
      this.cards[randomIndex] = tmpCard2;
    }
  }

  updateCanvas() {
    this.tableCanvas.width = this.tableCanvas.clientWidth;
    this.tableCanvas.height = this.tableCanvas.clientHeight;
    this.gameCanvas.width = this.gameCanvas.clientWidth;
    this.gameCanvas.height = this.gameCanvas.clientHeight;
    this.inputCanvas.width = this.inputCanvas.clientWidth;
    this.inputCanvas.height = this.inputCanvas.clientHeight;
  }

  addChip(value) {
    let chip = new Chip(200,200,0,value,Color.red,this.ctx);
    this.chips.push(chip);
  }

  renderGameObjects() {
    let gameObjects = [];
    for (let player of this.players) {
      gameObjects = gameObjects.concat(player.cards);
    }
    gameObjects = gameObjects
      .concat([this.cards[0]])
      .concat(this.chips)
      .concat(this.communityCards);
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
    for (let player of this.players) {
      gameObjects = gameObjects.concat(player.cards);
    }
    gameObjects = gameObjects
      .concat(this.cards)
      .concat(this.chips)
      .concat(this.communityCards);
    for (let go of gameObjects) {
      this.objectController.update(go);
    }
    if (this.objectController.windowResized) {
      this.objectController.windowResized = false;
    }
  }

  startGame() {
    this.addPlayer('John',3);
    this.addPlayer('Adam',4);
    this.addPlayer('Flavio',6);
    this.addPlayer('Ron',7);
    this.generateCards();
    this.shuffleCards();
    this.dealCards();
    this.game.round = 1;
  }

  addPlayer(name,id) {
    let player = new Player(name,id)
    this.players.push(player);
  }

  // basic game loop function
  start() {
    this.inputView.renderMenu();
    this.game.state = this.inputView.state;
    if (this.game.state === 'ingame') {
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
      if (this.game.potChanged) {
        this.tableView.renderTable();
        let potTextStr = numDots(this.game.pot);
        let potText = new Text(numDots(this.game.pot),this.inputCanvas.width * .03,FONT.MAIN,undefined,undefined,'left');
        let width = potText.calcWidth(this.tableCanvas.getContext('2d'));
        this.tableView.renderText(
          this.inputCanvas.width * .5 + ((this.inputCanvas.width * .08) - width * 1.1),
          this.inputCanvas.height *.5 - this.inputCanvas.width * .054,
          potText
        );
        this.game.potChanged = false;
      }
    }

    this.updateGameObjects();
    this.renderGameObjects();
    this.raf = requestAnimationFrame(() => this.start());
  }

  flopTurnRiver() {
    let card,index = [];
    if (this.game.round === 1 && this.communityCards.length < 3) {
      index = [0,1,2];
    } else if (this.game.round === 2 && this.communityCards.length < 4) {
      index = [3];
    } else if (this.game.round === 3 && this.communityCards.length < 5) {
      index = [4];
    }

    for (let i of index) {
      card = this.cards.shift();
      this.objectController.addMove(card,{
        xd: communityCardPosition(this.gameCanvas,i).x,
        yd: communityCardPosition(this.gameCanvas,i).y,
        rotation: 0,
        easing: 'ease-out',
        time: 500,
        delay: 10,
        flipAfter: true
      })
      this.communityCards.push(card);
    }

    console.log(this.communityCards.length)
  }

  dealCards() {
    let delay = 500;
    let card;
    for(let i = 0; i < 2; i++) {
      for (let p = 0; p < this.players.length; p++) {
        card = this.cards.shift();
        this.objectController.addMove(card,{
          xd: playersCardPosition(this.players[p].id,i,this.gameCanvas).x,
          yd: playersCardPosition(this.players[p].id,i,this.gameCanvas).y,
          rotation: playersCardRotation(this.players[p].id),
          easing: 'ease-out',
          time: 500,
          delay: delay,
          flipAfter: true
        })
        delay += 500;
        this.players[p].cards.push(card);
      }
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
