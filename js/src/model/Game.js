const {CARD_VALUE, CARD_SUIT, numDots, COLOR} = require('./Utils.js');
const Card = require('./Card.js');
const Chip = require('./Chip.js');

module.exports = class Game {
  constructor() {
    this.deck = [];
    this.players = [];
    this.communityCards = [];
    this.pot = 0;
    this.lastPot = 0;
    this.highestBet = 0;
    this.state = 'new'; // flop, turn, river, end
    this.chips = [];
    this.chipTypes = {};
    this.blinds = {
      small: 0,
      big: 0
    };
  }

  startNewGame() {
    this.generateDeck();
    this.shuffleDeck();
    this.sortPlayers();
    this.assignBlinds();
    this.dealPlayercards();
    this.chipTypes = {
      100: COLOR.chipPurple,
      50: COLOR.chipBlue,
      25: COLOR.chipGreen,
      10: COLOR.chipGrey,
      5: COLOR.chipRed
    };
    this.assignMoney(2500);
    this.blind = 10;
    this.payBlinds();
    this.nextPlayer();
  }

  get currentPlayer() {
    return this.players.findIndex(p => p.hasTrun);
  }

  set blind(val) {
    this.blinds.small = Math.floor(val / 2);
    this.blinds.big = val;
  }

  get blind() {
    return this.blinds.big;
  }

  callFrom(clientId) {
    let pi = this.players.findIndex(p => p.clientId === clientId);
    let oldMoney = this.players[pi].money;
    let bet;
    if (this.highestBet === 0) {
      bet = this.blind
    } else {
      bet = this.highestBet - this.players[pi].lastBet
    }
    this.players[pi].money -= bet;
    if (this.players[pi].money > 0) {
      this.players[pi].lastBet = this.highestBet;
      this.pot += bet;
    } else {
      this.players[pi].lastBet = oldMoney;
      this.players[pi].money = 0;
      this.pot += oldMoney
    }
    console.log(this.players);
    this.nextPlayer();
    return true;
  }

  foldFrom(clientId) {
    let pi = this.players.findIndex(p => p.clientId === clientId);
    this.players[pi].fold = true;
    this.nextPlayer();
  }

  raiseFrom(clientId,value) {

  }

  checkFrom(clientId) {

  }

  getPlayerAfterBig() {
    let next = this.players.findIndex(p => p.blind === 'big');
    do {
      ++next;
      if (next === this.players.length) {
        next = 0;
      }
    } while (this.players[next].broke);
    return next;
  }

  nextPlayer() {
    let currentPlayer = this.players.findIndex(p => p.hasTurn);
    this.players[currentPlayer].hasTurn = false;
    do {
      currentPlayer++;
      if (currentPlayer === this.players.length) {
        currentPlayer = 0;
      }
    } while (this.players[currentPlayer].broke || this.players[currentPlayer].fold);

    this.players[currentPlayer].hasTurn = true;
  }

  startNewRound() {
    this.resetGame();
    this.generateDeck();
    this.shuffleDeck();
    this.dealPlayercards();
    this.rotateBlinds();
    this.state = 'new';
  }

  payBlinds() {
    let moneyAfterBlind;
    this.players.forEach(p => {
      if (p.blind === 'small' || p.blind === 'big') {
        moneyAfterBlind = p.money - this.blinds[p.blind];
        if (moneyAfterBlind < 0) {
          p.lastBet = p.money;
          p.money = 0;
        } else {
          p.lastBet = this.blinds[p.blind];
          p.money = moneyAfterBlind;
        }
        this.pot += p.lastBet;
        if (p.lastBet > this.highestBet) this.highestBet = p.lastBet;
      }

    });
  }

  resetGame() {
    this.communityCards = [];
    this.lastPot = this.pot;
    this.pot = 0;
    this.chips = [];
    this.players = this.players.map(p => {
      p.cards = [];
      p.hasTurn = false;
      return p;
    })
  }

  assignBlinds() {
    let randNum = Math.floor(Math.random() * this.players.length);
    this.players[randNum].blind = 'small';
    if ((randNum + 1) >= this.players.length) {
      this.players[0].blind = 'big';
      this.players[0].hasTurn = true;
    } else {
      this.players[randNum + 1].blind = 'big';
      this.players[randNum + 1].hasTurn = true;
    }

    console.log(this.players);
  }

  rotateBlinds() {
    let blindIndex;
    this.players.forEach((p,i) => {
      if (p.blind = 'small') {
        blindIndex = i;
        this.players[i].blind = 'none';
      }
      if (p.blind = 'big') {
        this.players[i].blind = 'none';
      }
    });
    let flag = false;
    if (!this.players.find(p => !p.broke)) return;
    ['small','big'].forEach(b => {
      while (!flag) {
        ++blindIndex;
        if(blindIndex < this.players.length) {
          if (!this.players[blindIndex].broke) {
            this.players[blindIndex].blind = b;
            if (b === 'big') {
              this.players[blindeIndex].hasTurn = true;
            }
            flag = true;
          }
        } else {
          blindIndex = 0;
          continue;
        }
      }
      flag = false;
    });

  }

  sortPlayers() {
    this.players = this.players.sort((a,b) => a.positionId - b.positionId);
  }

  assignMoney(val) {
    this.players.forEach(p => {
      p.money = val;
    })
  }

  generateDeck() {
    this.deck = [];
    let card;
    Object.keys(CARD_SUIT).forEach(suit => {
      Object.keys(CARD_VALUE).forEach(value => {
        card = new Card(
          0,
          0,
          0,
          CARD_SUIT[suit],
          CARD_VALUE[value]
        );
        this.deck.push(card);
      })
    });
  }

  moneyToChips(money) {
    let chips = [];
    let left = money;
    let amount;
    Object.keys(this.chipTypes)
    .sort((a,b) => parseInt(b)-parseInt(a))
    .forEach(ct => {
      amount = Math.floor(left / parseInt(ct));
      left = left % parseInt(ct);
      while(amount-- > 0) {
        chips.push(new Chip(0,0,0,ct,this.chipTypes[ct]));
      }
    });
    return chips;
  }

  shuffleDeck() {
    this.deck = this.deck
      .map(a => [Math.random(),a])
      .sort((a,b) => a[0]-b[0])
      .map(a => a[1]);
  }

  addCommunityCards() {
    let card,index = 0;
    switch(this.state) {
      case 'flop': index = 3; break;
      case 'turn':
      case 'river': index = 1; break;
    }

    // loop index times
    while(index-- > 0) {
      card = this.deck.pop();
      this.communityCards.push(card);
    }
  }

  dealPlayercards() {
    this.players.map(p => {
      p.cards.push(this.deck.pop());
      p.cards.push(this.deck.pop());
      return p;
    })
  }

  hasNewPot() {
    return this.pot !== this.lastPot;
  }

  noticedPotSize() {
    this.lastPot = this.pot;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayerById(id) {
    this.players = this.players.filter(p => p.clientId !== id);
  }

  readyPlayer(id) {
    this.players.forEach(p => {
      if (p.clientId === id) {
        p.isReady();
      }
    });
  }

  unreadyPlayer(id) {
    this.players.forEach(p => {
      if (p.clientId === id) {
        p.notReady();
      }
    });
  }

  // TODO needs test
  reorderPlayerPositonsTo(playerId) {
    let seat = this.players.find(p => p.clientId === playerId).positionId;
    let offset = 4 - seat;
    if (offset === 0) return;
    if (offset < 0) {
      offset = 7 + offset;
    }
    this.players.map(p => {
      let oldseat = p.positionId;
      let newSeat = oldseat + offset;
      if (newSeat > 7) newSeat = newSeat % 8 + 1;
      p.positionId = newSeat;
      return p;
    });
  }

  static toGame(obj) {
    let game = new Game();
    Object.assign(game,obj);
    return game;
  }

}
