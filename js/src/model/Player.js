module.exports = class Player {
  constructor(name, positionId, clientId) {
    this.name = name;
    this.positionId = positionId;
    this.clientId = clientId;
    this.cards = [];
    this.chips = [];
    this.ready = false;
  }

  get money() {
    return this.chips.reduce((a,c) => {return a + c.value;},0);
  }

  isReady() {
    this.ready = true;
  }

  notReady() {
    this.ready = false;
  }
}
