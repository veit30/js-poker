
class Player {
  constructor(name, positionId, clientId) {
    this.name = name;
    this.positionId = positionId;
    this.clientId = clientId;
    this.cards = [];
    this.chips = [];
  }

  get money() {
    return this.chips.reduce((a,c) => {return a + c.value;},0);
  }
}

module.exports = Player;
