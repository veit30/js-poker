export const COLOR = {
  darkGrey: '#303030',
  lightGreen: '#68b249',
  darkerGreen: '#4d8436',
  brown: '#4c4128',
  brown2: '#7a6840',
  black: '#000000',
  red: '#ff0000',
  white: '#ececec'
};

export const CARDSUIT = {
  DIAMONDS: 1,
  HEARTS: 2,
  PIKES: 3,
  CLOVERS: 4
};

export const CARDVALUE = {
  ACE: 14,
  KING: 13,
  QUEEN: 12,
  BOY: 11,
  TEN: 10,
  NINE: 9,
  EIGHT: 8,
  SEVEN: 7,
  SIX: 6,
  FIVE: 5,
  FOUR: 4,
  THREE: 3,
  TWO: 2
};

export const SUITCOLOR = suit => {
  if (suit == 1 || suit == 2) {
    return COLOR.red;
  } else {
    return COLOR.black;
  }
}

export const VALUETEXT = value => {
  switch (value) {
    case 14:
      return 'A';
    case 13:
      return 'K';
    case 12:
      return 'Q';
    case 11:
      return 'J';
    default:
      return value.toString();
  }
}

export const PLAYERPOSITION = [
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .063,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .35
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .063,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .35
        };
      }
    ],
    positionName: 'Upper Middle (DEALER)',
    cardRotation: 180
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .652,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .265
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .548,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .335
        };
      }
    ],
    positionName: 'Upper Right',
    cardRotation: -145
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .8,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .063
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .8,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .063
        };
      }
    ],
    positionName: 'Center Right',
    cardRotation: -90
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .652,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .265
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .548,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .335
        };
      }
    ],
    positionName: 'Lower Right',
    cardRotation: -35
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .063,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .35
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 +  pokerObject.table.height * .063,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .35
        };
      }
    ],
    positionName: 'Lower Middle',
    cardRotation: 0
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .652,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .265
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .548,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .335
        };
      }
    ],
    positionName: 'Lower Left',
    cardRotation: 35
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .8,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .063
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .8,
          y: pokerObject.table.ctx.canvas.height * .5 +  pokerObject.table.height * .063
        };
      }
    ],
    positionName: 'Center Left',
    cardRotation: 90
  },
  {
    cards: [
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .652,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .265
        };
      },
      pokerObject => {
        return {
          x: pokerObject.table.ctx.canvas.width * .5 -  pokerObject.table.height * .548,
          y: pokerObject.table.ctx.canvas.height * .5 -  pokerObject.table.height * .335
        };
      }
    ],
    positionName: 'Upper Left',
    cardRotation: 145
  },
];

export const communitycardPosition = (pokerObject,index) => {
  let factor = .05;
  return {
    x: pokerObject.table.ctx.canvas.width * (.4 + .05 * index),
    y: pokerObject.table.ctx.canvas.height * .5
  }
};

export const EASINGFUNCTION = {
  easeIn: t => {
    return t * t * t
  },
  easeOut: t => {
    return (--t) * t * t + 1
  },
  easeInOut: t => {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  linear: t => {
    return t
  }
}

export const OBJECTPOSITIONQUOTIENT = {
  x: (ctx, x, tableHeight) => {
    return (x - (ctx.canvas.width * .5)) / tableHeight;
  },
  y: (ctx, y, tableHeight) => {
    return (y - (ctx.canvas.height * .5)) / tableHeight;
  }
}

export let round = x => ~~(x + 0.5);
