// controller for poker game
class PokerGameController {
  // maybe as player json?
  constructor(options) {

    this.options = options;
    this.players = [];
    this.cards = [];
    this.chips = [];
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
    this.addResizeListener();
    Table.render();
  }


  // for testing
  addCard(x,y,rotation,suit,value) {
    let card = new Card(x,y,rotation,suit,value);
    //card.flip();
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
      this.resizeEnd = setTimeout(() => {
        let evt = new Event('resize-end');
        window.dispatchEvent(evt);
      }, 200);
    });


    window.addEventListener('resize-end',() => {
      window.poker.resizeTimestamp = Date.now();
      window.poker.table.height = this.tableCanvas.clientWidth * .4;
      this.tableCanvas.width = this.tableCanvas.clientWidth;
      this.tableCanvas.height = this.tableCanvas.clientHeight;
      this.gameCanvas.width = this.gameCanvas.clientWidth;
      this.gameCanvas.height = this.gameCanvas.clientHeight;
      Table.render();
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
    let ctx = window.poker.game.ctx;
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    for(let card of this.cards) {card.render()};
    for(let chip of this.chips) {chip.render()};
  }

  updateGameObjects() {
    for(let card of this.cards) {card.update();}
    for(let chip of this.chips) {chip.update();}
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

    window.poker.table.ctx = this.tableCanvas.getContext('2d');
    window.poker.game.ctx = this.gameCanvas.getContext('2d');
    window.poker.table.height = this.tableCanvas.width * .4;
  }
}
