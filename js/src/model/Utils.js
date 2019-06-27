export const COLOR = {
  darkGrey: '#303030',
  lightGreen: '#68b249',
  darkerGreen: '#4d8436',
  brown: '#4c4128',
  brown2: '#7a6840',
  black: '#000000',
  red: '#ff0000',
  white: '#fff',
  lightGray: '#e0e0e0'
};

export const CARD_SUIT = {
  DIAMONDS: 1,
  HEARTS: 2,
  PIKES: 3,
  CLOVERS: 4
};

export const CARD_VALUE = {
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

export const colorFromSuit = suit => {
  if (suit == 1 || suit == 2) {
    return COLOR.red;
  } else {
    return COLOR.black;
  }
}

export const textFromValue = value => {
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

export const PLAYER_POSITION = [
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .063,
          y: canvas.height * .5 -  (canvas.width * .4) * .35
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .063,
          y: canvas.height * .5 -  (canvas.width * .4) * .35
        };
      }
    ],
    positionName: 'Upper Middle (DEALER)',
    cardRotation: 180
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .652,
          y: canvas.height * .5 -  (canvas.width * .4) * .265
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .548,
          y: canvas.height * .5 -  (canvas.width * .4) * .335
        };
      }
    ],
    positionName: 'Upper Right',
    cardRotation: -145
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .8,
          y: canvas.height * .5 -  (canvas.width * .4) * .063
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .8,
          y: canvas.height * .5 +  (canvas.width * .4) * .063
        };
      }
    ],
    positionName: 'Center Right',
    cardRotation: -90
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .652,
          y: canvas.height * .5 +  (canvas.width * .4) * .265
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .548,
          y: canvas.height * .5 +  (canvas.width * .4) * .335
        };
      }
    ],
    positionName: 'Lower Right',
    cardRotation: -35
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .063,
          y: canvas.height * .5 +  (canvas.width * .4) * .35
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 +  (canvas.width * .4) * .063,
          y: canvas.height * .5 +  (canvas.width * .4) * .35
        };
      }
    ],
    positionName: 'Lower Middle',
    cardRotation: 0
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .652,
          y: canvas.height * .5 +  (canvas.width * .4) * .265
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .548,
          y: canvas.height * .5 +  (canvas.width * .4) * .335
        };
      }
    ],
    positionName: 'Lower Left',
    cardRotation: 35
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .8,
          y: canvas.height * .5 -  (canvas.width * .4) * .063
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .8,
          y: canvas.height * .5 +  (canvas.width * .4) * .063
        };
      }
    ],
    positionName: 'Center Left',
    cardRotation: 90
  },
  {
    cards: [
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .652,
          y: canvas.height * .5 -  (canvas.width * .4) * .265
        };
      },
      canvas => {
        return {
          x: canvas.width * .5 -  (canvas.width * .4) * .548,
          y: canvas.height * .5 -  (canvas.width * .4) * .335
        };
      }
    ],
    positionName: 'Upper Left',
    cardRotation: 145
  },
];

export const communityCardPosition = (canvas,index) => {
  let factor = .05;
  return {
    x: canvas.width * (.4 + .05 * index),
    y: canvas.height * .5
  }
};

export const EASING_FUNCTION = {
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

export const POS_QUOTIENT_CALC = {
  x: (ctx, x) => {
    let tableHeight = ctx.canvas.width * .4;
    return (x - (ctx.canvas.width * .5)) / tableHeight;
  },
  y: (ctx, y) => {
    let tableHeight = ctx.canvas.width * .4;
    return (y - (ctx.canvas.height * .5)) / tableHeight;
  }
}

export let round = x => ~~(x + 0.5);
export let rT = x => ~~(x*1000 + 0.5) / 1000;
