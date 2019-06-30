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

export const playersCardRotation = (playerId) => {
  return PLAYER_POSITION[playerId].cardRotation;
}

export const playersCardPosition = (playerId,cardIndex,canvas) => {
  return PLAYER_POSITION[playerId].cards[cardIndex](canvas)
}

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

export const BACKSIDE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 154 200" width="154" height="200"><defs><clipPath id="_clipPath_aUlpfpfe5XYxLq0mqamiwlk8XdORg9N4"><rect width="154" height="200"/></clipPath></defs><g clip-path="url(#_clipPath_aUlpfpfe5XYxLq0mqamiwlk8XdORg9N4)"><g style="isolation:isolate" id="Layer 1"><path d=" M 30.2 8 L 123.8 8 C 129.16 8 134.3 10.13 138.08 13.92 C 141.87 17.7 144 22.84 144 28.2 L 144 171.8 C 144 177.16 141.87 182.3 138.08 186.08 C 134.3 189.87 129.16 192 123.8 192 L 30.2 192 C 24.84 192 19.7 189.87 15.92 186.08 C 12.13 182.3 10 177.16 10 171.8 L 10 28.2 C 10 22.84 12.13 17.7 15.92 13.92 C 19.7 10.13 24.84 8 30.2 8 Z  M 30.2 12 L 123.8 12 C 128.09 12 132.22 13.71 135.26 16.74 C 138.29 19.78 140 23.91 140 28.2 L 140 171.8 C 140 176.09 138.29 180.22 135.26 183.26 C 132.22 186.29 128.09 188 123.8 188 L 30.2 188 C 25.91 188 21.78 186.29 18.74 183.26 C 15.71 180.22 14 176.09 14 171.8 L 14 28.2 C 14 23.91 15.71 19.78 18.74 16.74 C 21.78 13.71 25.91 12 30.2 12 Z  M 29.17 100.25 L 77.25 52.17 L 125.34 100.25 L 77.25 148.34 L 29.17 100.25 Z  M 34.83 100.25 L 77.25 57.83 L 119.68 100.25 L 77.25 142.68 L 34.83 100.25 Z  M 42.17 100.25 L 77.25 65.17 L 112.34 100.25 L 77.25 135.34 L 42.17 100.25 Z  M 47.83 100.25 L 77.25 70.83 L 106.68 100.25 L 77.25 129.68 L 47.83 100.25 Z  M 30.32 47.46 C 29.05 45.26 28.38 42.77 28.38 40.23 C 28.37 35.05 31.14 30.25 35.63 27.65 C 37.83 26.38 40.32 25.71 42.86 25.71 C 48.04 25.71 52.84 28.48 55.43 32.96 C 56.71 35.16 57.38 37.65 57.38 40.19 C 57.38 45.37 54.61 50.18 50.13 52.77 C 47.93 54.04 45.43 54.71 42.89 54.71 C 37.72 54.71 32.91 51.95 30.32 47.46 Z  M 32.92 45.96 C 31.91 44.22 31.38 42.24 31.38 40.23 C 31.37 36.12 33.57 32.31 37.13 30.25 C 38.87 29.24 40.85 28.71 42.86 28.71 C 46.97 28.71 50.78 30.91 52.84 34.46 C 53.84 36.21 54.38 38.18 54.38 40.2 C 54.38 44.3 52.18 48.11 48.63 50.17 C 46.88 51.18 44.91 51.71 42.89 51.71 C 38.78 51.71 34.97 49.52 32.92 45.96 Z  M 99.08 32.96 C 101.67 28.48 106.47 25.71 111.65 25.71 C 114.19 25.71 116.68 26.38 118.88 27.65 C 123.37 30.25 126.14 35.05 126.13 40.23 C 126.13 42.77 125.46 45.26 124.19 47.46 C 121.6 51.95 116.79 54.71 111.62 54.71 C 109.08 54.71 106.58 54.04 104.38 52.77 C 99.9 50.18 97.13 45.37 97.13 40.19 C 97.13 37.65 97.8 35.16 99.08 32.96 Z  M 101.67 34.46 C 103.73 30.91 107.54 28.71 111.65 28.71 C 113.66 28.71 115.64 29.24 117.38 30.25 C 120.94 32.31 123.13 36.12 123.13 40.23 C 123.13 42.24 122.6 44.22 121.59 45.96 C 119.54 49.52 115.73 51.71 111.62 51.71 C 109.6 51.71 107.63 51.18 105.88 50.17 C 102.33 48.11 100.13 44.3 100.13 40.2 C 100.13 38.18 100.66 36.21 101.67 34.46 Z  M 99.08 166.55 C 97.8 164.35 97.13 161.86 97.13 159.32 C 97.13 154.14 99.9 149.33 104.38 146.74 C 106.58 145.47 109.08 144.8 111.62 144.8 C 116.79 144.79 121.6 147.56 124.19 152.05 C 125.46 154.25 126.13 156.74 126.13 159.28 C 126.14 164.46 123.37 169.26 118.88 171.86 C 116.68 173.13 114.19 173.8 111.65 173.8 C 106.47 173.8 101.67 171.03 99.08 166.55 Z  M 101.67 165.05 C 100.66 163.3 100.13 161.33 100.13 159.31 C 100.13 155.21 102.33 151.39 105.88 149.34 C 107.63 148.33 109.6 147.8 111.62 147.8 C 115.73 147.8 119.54 149.99 121.59 153.55 C 122.6 155.29 123.13 157.27 123.13 159.28 C 123.13 163.39 120.94 167.2 117.38 169.26 C 115.64 170.27 113.66 170.8 111.65 170.8 C 107.54 170.8 103.73 168.6 101.67 165.05 Z  M 30.32 152.05 C 32.91 147.56 37.72 144.79 42.89 144.8 C 45.43 144.8 47.93 145.47 50.13 146.74 C 54.61 149.33 57.38 154.14 57.38 159.32 C 57.38 161.86 56.71 164.35 55.43 166.55 C 52.84 171.03 48.04 173.8 42.86 173.8 C 40.32 173.8 37.83 173.13 35.63 171.86 C 31.14 169.26 28.37 164.46 28.38 159.28 C 28.38 156.74 29.05 154.25 30.32 152.05 Z  M 32.92 153.55 C 34.97 149.99 38.78 147.8 42.89 147.8 C 44.91 147.8 46.88 148.33 48.63 149.34 C 52.18 151.39 54.38 155.21 54.38 159.31 C 54.38 161.33 53.84 163.3 52.84 165.05 C 50.78 168.6 46.97 170.8 42.86 170.8 C 40.85 170.8 38.87 170.27 37.13 169.26 C 33.57 167.2 31.37 163.39 31.38 159.28 C 31.38 157.27 31.91 155.29 32.92 153.55 Z " fill-rule="evenodd" fill="rgb(255,0,0)"/></g></g></svg>'

export const KEY = {
  C: 67,
  F: 70
}

export let round = x => ~~(x + 0.5);
export let rT = x => ~~(x*1000 + 0.5) / 1000;
