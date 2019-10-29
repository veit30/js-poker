module.exports = class Player {
  constructor(name, positionId, clientId, avatar) {
    this.name = name;
    this.positionId = positionId;
    this.clientId = clientId;
    this.cards = [];
    this.chips = [];
    this.money = 0;
    this.ready = false;
    this.blind = 'none'; //big, small
    this.lastBet = 0;
    this.broke = false;
    this.fold = false;
    this.hasTurn = false;
    this.avatar = avatar || '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  // get money() {
  //   return this.chips.reduce((a,c) => {return a + c.value;},0);
  // }

  isReady() {
    this.ready = true;
  }

  notReady() {
    this.ready = false;
  }

  get chipMoney() {
    return this.chips.reduce((a,c) => a+parseInt(c.value), 0);
  }

  static toPlayer(obj) {
    let player = new Player();
    Object.assign(player,obj);
    return player;
  }
}
