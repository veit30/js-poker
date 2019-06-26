class PokerGameController {
  // maybe as player json?
  constructor(players,props) {

    this.props = {
      canvas: {
        id: props ? props.canvas.id : 'poker-canvas' ,
        width: props ? props.canvas.width : undefined ,
        height: props ? props.canvas.height : undefined
      }
    }

    this.players = players;
    this.cards = [];
    this.chips = [];
    this.setupCanvas();
    this.scale = this.canvas.height * .0017 * 50;
    this.table = new Table(this.ctx);
    this.addResizeListener();
    // window.addEventListener("resize", () => {
    //     this.canvas.width = window.innerWidth;
    //     this.canvas.height = window.innerHeight;
    //     this.scale = this.canvas.height * .0017 * 50;
    //     this.start();
    // });

    //this.start();
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




    // let card = new Card(
    //   this.canvas.width*.6,
    //   this.canvas.height*.5,
    //   0,type,value,this.ctx);
    // let card2 = new Card(
    //   this.canvas.width*.6,
    //   this.canvas.height*.5,
    //   0,type,value,this.ctx);
    // card2.flip();
    // card.flip();
    // card.moveTo(PlayerCardsPos.UR_ONE(this.canvas),PlayerCardsRot.UR,'ease-out',1000,1000);
    // card2.moveTo(PlayerCardsPos.UR_TWO(this.canvas),PlayerCardsRot.UR,'ease-out',1000,1000)
    // this.cards.push(card);
    // this.cards.push(card2);
  }

  addResizeListener() {
    this.resizeEnd;
    window.addEventListener('resize', () => {
      clearTimeout(this.resizeEnd);
      this.resizeEnd = setTimeout(() => {
        let evt = new Event('resize-end');
        window.dispatchEvent(evt);
      }, 1000);
    });
    window.addEventListener('resize-end',() => {
      /*
      try {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.scale = this.canvas.height * .0017 * 50;
      } catch (e) {
        log(e);
        if(e instanceof TypeError) {
          log(e);
        }
      }
      */
      // this.canvas.width = window.innerWidth;
      log(this.canvas);
      log(window.innerWidth);
      log(this.canvas.clientHeight);
      log(this.canvas.clientWidth);
      // this.canvas.height = window.innerHeight;
      // this.scale = this.canvas.height * .0017 * 50;
      this.start();
    });
  }

  addCardAt(type,value,pos) {

  }

  addChip(value) {
    let chip = new Chip(200,200,0,value,Color.red,this.ctx);
    this.chips.push(chip);
  }

  clear() {
    // this.ctx.fillStyle = Color.darkGrey;
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
    let props = this.props;
    this.canvas = document.createElement("canvas");

    this.canvas.id = props.canvas.id;
    this.canvas.width = props.canvas.width ? props.canvas.width : window.innerWidth;
    this.canvas.height = props.canvas.height ? props.canvas.height : window.innerHeight;

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    window.ctx = this.ctx;
  }
}
