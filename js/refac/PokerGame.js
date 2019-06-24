class PokerGame {
  // maybe as player json?
  constructor(id,options) {

    this.id = id;
    this.options = options;
    this.players = [];
    this.cards = [];
    this.chips = [];
    this.setupCanvas();
    // this.addResizeListener();
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
      window.poker.table.height = 
      try {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      } catch (e) {
        if(e instanceof TypeError) {
          console.log(e);
        }
      }
      this.start();
    });
  }

  addCardAt(type,value,pos) {

  }

  generateCards() {

  }

  addChip(value) {
    let chip = new Chip(200,200,0,value,Color.red,this.ctx);
    this.chips.push(chip);
  }

  clear() {
    this.ctx.fillStyle = Color.white;
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
  }

  reset() {
    this.clear();
    this.table.draw();
  }

  renderIngame() {
    this.reset();
    this.renderGO();
  }

  renderGO() {
    for(let card of this.cards) {card.draw()};
    for(let chip of this.chips) {chip.draw()};
  }

  updateGO() {
    for(let card of this.cards) {card.update();}
    for(let chip of this.chips) {chip.update();}
  }

  start() {
    this.updateGO();
    this.renderIngame();
    this.raf = requestAnimationFrame(() => this.start());
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = undefined;
  }

  setupCanvas() {
    this.canvas = document.createElement("canvas");

    this.canvas.id = this.id;
    document.body.appendChild(this.canvas);
    window.poker.ctx = this.canvas.getContext('2d');
  }
}
