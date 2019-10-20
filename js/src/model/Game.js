const {CARD_VALUE, CARD_SUIT, numDots} = require('./Utils.js');
const Card = require('./Card.js');
const Chip = require('./Chip.js');

module.exports = class Game {
  constructor() {
    this.deck = [];
    this.players = [];
    this.communityCards = [];
    this.pot = 0;
    this.lastPot = 0;
    this.state = 'new'; // flop, turn, river, end
    this.chips = []
  }

  startNewGame() {
    this.generateDeck();
    this.shuffleDeck();
    this.sortPlayers();
    this.dealPlayercards();
    this.addStartChips({
      100: 7,
      50: 5,
      25: 5,
      10: 10,
      5: 15
    });
    this.assignBlinds();
    this.state = 'new';
  };

  startNewRound() {
    this.resetGame();
    this.generateDeck();
    this.shuffleDeck();
    this.dealPlayercards();
    this.rotateBlinds();
    this.state = 'new';
  }

  resetGame() {
    this.communityCards = [];
    this.lastPot = this.pot;
    this.pot = 0;
    this.chips = [];
    this.players = this.players.map(p => {
      p.cards = [];
      return p;
    })
  }

  assignBlinds() {
    let randNum = Math.floor(Math.random() * this.players.length);
    this.players[randNum].blind = 'small';
    if ((randNum + 1) >= this.players.length) {
      this.players[0].blind = 'big';
    } else {
      this.players[++randNum].blind = 'big';
    }
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
    ['small','big'].forEach(b => {
      while (!flag) {
        ++blindIndex;
        if(blindIndex < this.players.length) {
          if (!this.players[blindIndex].broke) {
            this.players[blindIndex].blind = b;
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

  addStartChips(chipAmounts) {
    this.players = this.players.map(p => {
      Object.keys(chipAmounts).forEach(key => {
        let c = chipAmounts[key];
        while(c-- > 0) {
          p.chips.push(new Chip(0,0,0,parseInt(key)));
        }
      });
      return p;
    });
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

  // this.canvas.width * .5,
  // this.canvas.height * .5 - (this.canvas.width * .4) * .35,
  // 0,

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

  get potStr() {
    return numDots(this.pot);
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
