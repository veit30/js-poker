// controller for poker game
class PokerGame {
  // maybe as player json?
  constructor(options) {

    this.options = options;
    this.players = [];
    this.cards = [];
    this.chips = [];
    window.poker = {
      table: {
        height: 0,
        ctx: undefined
      },
      game: {
        ctx: undefined
      }
  };
    this.setupCanvases();
    Table.render();
  }

  addCard(type,value) {
    let h = Math.floor(.4*this.canvas.width);
    let rot, card, i=1;
    for(let ca of Object.keys(PlayerCardsPos)) {
      card = new Card(
        this.canvas.width*.6,
        this.canvas.height*.5,
        0,type,value,this.ctx);
      card.flip();
      rot = ca.split("_")[0];
      card.moveTo(PlayerCardsPos[ca](this.canvas),PlayerCardsRot[rot],'ease-out',1000,1000)
      this.cards.push(card);
    }
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
      window.poker.table.height = this.tableCanvas.clientWidth * .4;
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


  renderIngame() {
    this.renderGO();
  }

  renderGameObjects() {
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

  setupCanvases() {
    this.tableCanvas = document.createElement('canvas');
    this.gameCanvas = document.createElement('canvas'),

    this.tableCanvas.id = 'table-canvas';
    this.gameCanvas.id = 'game-canvas';
    this.tableCanvas.style.zIndex = '1';
    this.tableCanvas.style.zIndex = '2';

    document.body.appendChild(this.tableCanvas);
    document.body.appendChild(this.gameCanvas);

    window.poker.table.ctx = this.tableCanvas.getContext('2d');
    window.poker.game.ctx = this.gameCanvas.getContext('2d');
    window.poker.table.height = this.tableCanvas.width * .4;
  }
}
