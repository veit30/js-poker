let globalId = 0;
let nextId = () => {return globalId++;}
let resetId = () => {globalId = 0;}

export default class Player {
  constructor(name,id) {
    this.name = name;
    this.cards = [];
    this.id = id;
    this.chips = [];
  }

  get money() {
    return this.chips.reduce((a,c) => {return a + c.value;},0);
  }
}
