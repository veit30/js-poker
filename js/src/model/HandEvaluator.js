class HandEvaluator {
  static RESULTS() {
    return [
    'high-card',
    'one-pair',
    'two-pair',
    'three-of-a-kind',
    'straight',
    'flush',
    'full-house',
    'four-of-a-kind',
    'straight-flush'
    ];
  }

  static evalWinner(tableData) {
    let communityCards = tableData.communityCards;
    let allCards,evaluation,result,winner;
    let playersResults = [], i = 0;
    for(let player of tableData.players) {
      allCards = player.cards.concat(communityCards);
      evaluation = this.evaluate(allCards);
      result = this.evalResult(evaluation);
      playersResults[i] = player;
      playersResults[i++].result = result;
    }
    log(playersResults);
    winner = playersResults.sort((a,b) => {
      return this.RESULTS().indexOf(b.result.token) - this.RESULTS().indexOf(a.result.token);
    }).filter((e,i,a) => {
      return e.result.token === a[0].result.token;
    }).reduce((a,c) => {
      let cur,prev;
      if(a.length === 0) {
        return [c];
      }
      cur = c.result.cards.reduce((a,c) => {return a + c.value},0);
      prev = a[0].result.cards.reduce((a,c) => {return a + c.value},0);
      if(cur > prev) {
        return [c];
      } else if(cur === prev) {
        return [...a,c];
      }
    },[]);
    log(winner);
  }

  static evalResult(evaluation) {
    let ev = evaluation;
    let tmp = [];
    let result = {token:'', cards:[]};
    switch(ev.result) {
      case 'high-card':
        result.cards = ev.cards.slice(-5);
        result.token = 'high-card';
        break;
      case 'one-pair':
        result.token = result.token == '' ? 'one-pair' : result.token;
      case 'two-pair':
        result.token = result.token == '' ? 'two-pair' : result.token;
      case 'three-of-a-kind':
        result.token = result.token == '' ? 'three-of-a-kind' : result.token;
      case 'four-of-a-kind':
        result.token = result.token == '' ? 'four-of-a-kind' : result.token;
      case 'full-house':
        result.token = result.token == '' ? 'full-house' : result.token;
        for(let p of Object.keys(ev.counter)) {
          tmp.push(ev.counter[p]);
        }
        result.cards = tmp.sort((a,b) => {
          return b.cards[0].value - a.cards[0].value;
        }).sort((a,b) => {
          return b.amount - a.amount;
        }).reduce((a,val) => {
          if(a.cards.length == 0) {
            a.cards = val.cards;
            a.z = a.z - val.amount;
            return a;
          }
          if(a.z > 1) {
            a.cards = val.cards.length <= a.z ? [...a.cards,...val.cards] : a.cards;
            a.z = 5 - a.cards.length;
          }
          return a;
        },{z:5,cards:[]})['cards'];
        break;
      case 'straight':
        result.token = 'straight';
        result.cards = ev.straight.map(curr => {
          return Array.isArray(curr) ? curr[0] : curr;
        }).slice(-5);
        break;
      case 'flush':
        result.token = 'flush';
        for(let p of Object.keys(ev.counter)) {
          tmp.push(ev.flush[p]);
        }
        result.cards = tmp.filter(c => c.lenght >= 5).flat().sort((a,b) => {
          b.value - a.value;
        }).slice(5);
        break;
      case 'straight-flush':
        result.token = 'straight-flush';
        for(let p of Object.keys(ev.straight_flushs)) {
          tmp.push(ev.straight_flushs[p]);
        }
        result.cards = tmp.filter(c => c.length >= 5).flat().sort((a,b) => {
          return b.value - a.value;
        }).slice(0,5);
        break;
    }
    return result;
  }

  static evaluate(cards) {
    return cards.sort((a,b) => {
      return a.value-b.value;
    }).reduce((a,c,i) => {
      a.cards = [...a.cards,c];
      // CARD COUNT
      a.counter[c.value] = a.counter[c.value] || {};
      a.counter[c.value].amount = a.counter[c.value].amount != undefined ? ++a.counter[c.value].amount : 1;
      a.counter[c.value].cards = a.counter[c.value].cards != undefined ? [...a.counter[c.value].cards,c] : [c];
      if(a.counter[c.value].amount == 2 && a.result == 'high-card') {
        a.result = 'one-pair';
      } else if(a.counter[c.value].amount == 2 && a.result == 'one-pair') {
        a.result = 'two-pair';
      } else if(a.counter[c.value].amount == 3 && a.result == 'high-card') {
        a.result = 'three-of-a-kind';
      } else if(a.counter[c.value].amount == 3 && ['two-pair','one-pair'].indexOf(a.result) >= 0) {
        a.result = 'full-house';
      } else if(a.counter[c.value].amount == 4 && a.result == 'high-card' || ['straight-flush','royal-flush'].indexOf(a.result) >= 0) {
        a.result = 'four-of-a-kind';
      }
      // STRAIGHT
      let strtLen = a.straight.length;
      if(strtLen == 0) {
        a.straight = [c]
      } else if((Array.isArray(a.straight[strtLen-1]) && (c.value == a.straight[strtLen-1][0].value)) || c.value == a.straight[strtLen-1].value) {
        a.straight = [...a.straight.slice(0,-1),[...a.straight.slice(-1),c]];
      } else if((Array.isArray(a.straight[strtLen-1]) && (c.value == a.straight[strtLen-1][0].value + 1)) || c.value == a.straight[strtLen-1].value + 1 ) {
        a.straight = [...a.straight,c]
      } else {
        a.straight = strtLen < 5 ? [c] : a.straight;
      }
      if(i == 6 && a.straight.length < 5) a.straight = [];
      if (a.straight.length > 4 && ['straight-flush','royal-flush','full-house','four-of-a-kind','flush'].indexOf(a.result) >= 0) {
        a.result = 'straight';
      }
      // FLUSH
      a.flush[c.type] = [...a.flush[c.type],c];
      a.flush.length = Math.max(a.flush[1].length,a.flush[2].length,a.flush[3].length,a.flush[4].length);
      if (a.flush.length > 4 && ['straight-flush','royal-flush','full-house','four-of-a-kind'].indexOf(a.result) >= 0) {
        a.result = 'flush';
      }

      // STRAIGHT FLUSH
      if(i == 6 && a.straight.length > 4 && a.flush.length > 4) {
        a.straight_flushs = a.straight.flat().reduce((akk,card) => {
          akk[card.type] = akk[card.type] || [];
          akk[card.type] = akk[card.type].length == 0 ? [card] : [...akk[card.type],card];
          akk[card.type] = akk[card.type].length == 6 ? akk[card.type].slice(1) : akk[card.type];
          if(akk[card.type].length == 5) a.result = 'straight-flush';
          return akk;
        },{})
      }
      return a;
    }, {counter:{},straight:[],flush:{1:[],2:[],3:[],4:[],length:0},straight_flushs:{},result:'high-card',cards:[]})
  }

}

let testObj = {
  players: [
    {
      id: 1,
      name: 'test-player-2',
      cards: [{
        value: 3,
        type: 2
      },{
        value: 5,
        type: 2
      }]
    },
    {
      id: 2,
      name: 'test-player-2',
      cards: [{
        value: 4,
        type: 3
      },{
        value: 12,
        type: 2
      }]
    }
  ],
  communityCards: [{
    value: 4,
    type: 2
  },{
    value: 6,
    type: 2
  },{
    value: 8,
    type: 3
  },{
    value: 7,
    type: 2
  },{
    value: 6,
    type: 4
  }]
}
