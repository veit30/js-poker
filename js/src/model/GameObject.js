const {POS_QUOTIENT_CALC, EASING_FUNCTION} = require('./Utils.js');

module.exports = class GameObject {
  constructor(x, y, rotation) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    this.posQuotient = {};

    this.endPosQuotient = {};

    this.moveQueue = [];

    // ANIMATION PROPERTIES
    this.eF = EASING_FUNCTION.linear;
    this.startTime = 0;
    this.lastTime = 0;
    this.animTime = 0;
    this.animLen = 0;
    this.direction = {x:0,y:0};
    this.startPos = {x:0,y:0};
    this.endPos = {x:x,y:y};
    this.startRotation = 0;
    this.rotationLen = 0;
    this.delay = 0;
    this.isInitialized = false;
    this.isRunning = false;

    this.doneMoves = 0;
  }

  setProps({x,y,rotation}) {
    x = x || 0;
    y = y || 0;
    rotation = rotation || 0;
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
}
