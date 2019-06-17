const Color = {
  darkGrey: '#303030',
  lightGreen: '#68b249',
  darkerGreen: '#4d8436',
  brown: '#4c4128',
  brown2: '#7a6840',
  black: '#000000',
  red: '#ff0000',
  white: '#ececec'
};

const CardType = {
  HEARTS: 1,
  TILES: 2,
  CLOVERS: 3,
  PIKES: 4
};

const CardValue = {
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


const CardText = {
  13: "K",
  12: "Q",
  11: "B"
};

const PlayerCardsPos = {
  UL_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.652,y:c.height*.5-h*.265};},
  UL_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.548,y:c.height*.5-h*.335};},
  LL_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.652,y:c.height*.5+h*.265};},
  LL_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.548,y:c.height*.5+h*.335};},
  ML_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.8,y:c.height*.5-h*.063};},
  ML_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.8,y:c.height*.5+h*.063};},
  UM_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.063,y:c.height*.5-h*.35};},
  UM_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.063,y:c.height*.5-h*.35};},
  LM_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5-h*.063,y:c.height*.5+h*.35};},
  LM_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.063,y:c.height*.5+h*.35};},
  UR_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.652,y:c.height*.5-h*.265};},
  UR_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.548,y:c.height*.5-h*.335};},
  LR_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.652,y:c.height*.5+h*.265};},
  LR_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.548,y:c.height*.5+h*.335};},
  MR_ONE: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.8,y:c.height*.5-h*.063};},
  MR_TWO: c => {let h = Math.floor(.4*c.width);
    return {x:c.width*.5+h*.8,y:c.height*.5+h*.063};},

}

const PlayerCardsRot = {
  UL: 145,
  LL: 35,
  ML: 90,
  UM: 180,
  LM: 0,
  UR: -145,
  LR: -35,
  MR: -90
}

const EasingFunction = {
  easeIn: t => {return t*t*t},
  easeOut: t => {return (--t)*t*t+1},
  easeInOut: t => {return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1},
  linear: t => {return t}
}
