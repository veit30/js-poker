import RenderEngine from '../view/RenderEngine.js';
import Card from '../model/Card.js';
import GameObjectController from './GameObjectController.js';
import {COLOR} from '../model/Utils.js';
// controller for poker game
export default class PokerGameController {
  // maybe as player json?
  constructor(options) {

    this.options = options;
    this.players = [];
    this.cards = [];
    this.chips = [];
    this.tableCanvas;
    this.gameCanvas;
    window.poker = {
      table: {
        height: 0,
        ctx: undefined,
        rotation: 0
      },
      game: {
        ctx: undefined
      },
      resizeTimestamp: 0
    };
    this.setupCanvas();
    this.tableView = new RenderEngine(this.tableCanvas.getContext('2d'));
    this.gameView = new RenderEngine(this.gameCanvas.getContext('2d'));
    this.gameObjectsUpdater = new GameObjectUpdater(this.gameCanvas.getContext('2d'));
    this.addResizeListener();
    this.tableView.renderBackground(COLOR.lightGray);
    this.tableView.renderTable();
  }


  // for testing
  addCard(x,y,rotation,suit,value) {
    let card = new Card(x,y,rotation,suit,value);
    this.gameObjectsUpdater.calcRelPosProp(card);
    card.flip();
    this.cards.push(card);
    // let rot, card, i=1;
    // for(let ca of Object.keys(PlayerCardsPos)) {
    //   card = new Card(
    //     this.canvas.width*.6,
    //     this.canvas.height*.5,
    //     0,type,value,this.ctx);
    //   card.flip();
    //   rot = ca.split("_")[0];
    //   card.moveTo(PlayerCardsPos[ca](this.canvas),PlayerCardsRot[rot],'ease-out',1000,1000)
    //   this.cards.push(card);
    // }
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
      window.poker.resizeTimestamp = Date.now();
      this.tableCanvas.width = this.tableCanvas.clientWidth;
      this.tableCanvas.height = this.tableCanvas.clientHeight;
      this.gameCanvas.width = this.gameCanvas.clientWidth;
      this.gameCanvas.height = this.gameCanvas.clientHeight;
      this.tableView.renderBackground(COLOR.lightGray);
      this.tableView.renderTable();
      this.gameObjectsUpdater.windowResized = true;
      this.start();
    });
  }

  generateCards() {

  }

  addChip(value) {
    let chip = new Chip(200,200,0,value,Color.red,this.ctx);
    this.chips.push(chip);
  }

  renderGameObjects() {
    let gameObjects = this.cards.concat(this.chips);
    for(let go of gameObjects) {
      switch(go.constructor.name) {
        case 'Card': this.gameView.renderCard(go); break;
        case 'Chip': this.gameView.renderChip(go); break;
      }
    }
  }

  updateGameObjects() {
    let gameObjects = this.cards.concat(this.chips);
    for (let go of gameObjects) {
      this.gameObjectsUpdater.update(go);
    }
    if (this.gameObjectsUpdater.windowResized) {
      this.gameObjectsUpdater.windowResized = false;
    }
  }

  start() {
    this.updateGameObjects();
    this.renderGameObjects();
    this.raf = requestAnimationFrame(() => this.start());
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = undefined;
  }

  setupCanvas() {
    this.tableCanvas = document.createElement('canvas');
    this.gameCanvas = document.createElement('canvas'),

    this.tableCanvas.id = 'table-canvas';
    this.gameCanvas.id = 'game-canvas';
    this.tableCanvas.style.zIndex = '1';
    this.gameCanvas.style.zIndex = '2';

    document.body.appendChild(this.tableCanvas);
    document.body.appendChild(this.gameCanvas);

    this.tableCanvas.width = this.tableCanvas.clientWidth;
    this.tableCanvas.height = this.tableCanvas.clientHeight;
    this.gameCanvas.width = this.gameCanvas.clientWidth;
    this.gameCanvas.height = this.gameCanvas.clientHeight;
  }
}
