let globalId = 0;
let nextId = () => {return globalId++;}
let resetId = () => {globalId = 0;}

class Player {
  constructor(name) {
    this.name = name;
    this.cards = [];
    this.id = nextId();
    this.chips = [];
  }

  get money() {
    return this.chips.reduce((a,c) => {return a + c.value;},0);
  }
}
