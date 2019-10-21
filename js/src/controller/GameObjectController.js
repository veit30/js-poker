const {POS_QUOTIENT_CALC, EASING_FUNCTION, rT} = require('../model/Utils.js');

module.exports = class GameObjectController {
  constructor(ctx) {
    this.ctx = ctx;
    this.windowResized = false;
  }

  update(obj) {
    if (Object.keys(obj.posQuotient).length === 0) {
      this.calcRelPosProp(obj);
    }
    this.applyMove(obj);
    this.updateTimer(obj);
    if(obj.isInitialized && obj.delay === 0) {
      obj.startTime = Date.now();
      obj.isInitialized = false;
      obj.isRunning = true;
    }
    obj.isRunning && this.updateMove(obj);
    if(this.windowResized) {
      let tableHeight = this.ctx.canvas.width * .4;
      if (obj.isRunning || obj.delay !== 0) {
        obj.x = this.ctx.canvas.width * .5 + tableHeight * obj.endPosQuotient.x;
        obj.y = this.ctx.canvas.height * .5 + tableHeight * obj.endPosQuotient.y;
        obj.posQuotient.x = obj.endPosQuotient.x;
        obj.posQuotient.y = obj.endPosQuotient.y;
        obj.rotation = obj.startRotation + obj.rotationLen;
        obj.delay = 0;
        obj.isInitialized = false;
        obj.isRunning = false;
        obj.flipAfter && obj.flip();
        obj.doneMoves++;
      } else {
        obj.x = this.ctx.canvas.width * .5 + tableHeight * obj.posQuotient.x;
        obj.y = this.ctx.canvas.height * .5 + tableHeight * obj.posQuotient.y;
      }
    }
  }

  updateMove(obj) {
    let now = Date.now();
    let timeInAnimation = now - obj.startTime;
    let time = timeInAnimation / obj.animTime;
    time = time > 1 ? 1 : time;
    let factor = obj.eF(time);

    obj.x = rT(obj.startPos.x + obj.direction.x * factor * obj.animLen);
    obj.y = rT(obj.startPos.y + obj.direction.y * factor * obj.animLen);

    obj.rotation = obj.startRotation + factor * obj.rotationLen;

    if(obj.endPos.x === obj.x && obj.endPos.y === obj.y) {
      let tableHeight = this.ctx.canvas.width * .4;
      obj.x = this.ctx.canvas.width * .5 + tableHeight * obj.endPosQuotient.x;
      obj.y = this.ctx.canvas.height * .5 + tableHeight * obj.endPosQuotient.y;
      obj.posQuotient.x = obj.endPosQuotient.x;
      obj.posQuotient.y = obj.endPosQuotient.y;
      obj.rotation = obj.startRotation + obj.rotationLen;
      obj.isRunning = false;
      obj.flipAfter && obj.flip();

      obj.doneMoves++;
    }
  }


  updateTimer(obj) {
    if(obj.delay > 0) {
      let delta, now;
      if(obj.lastTime === 0) {
        delta = 10;
      } else {
        now = Date.now();
        delta = now - obj.lastTime;
        obj.lastTime = now;
      }
      obj.delay -= delta;
      if(obj.delay < 0) obj.delay = 0;
    }
  }

  addMove(obj,move) {
    obj.moveQueue.push(move);
  }

  applyMove(obj) {
    if (obj.moveQueue.length != 0 && !obj.isInitialized && !obj.isRunning) {
      this.initMove(obj,obj.moveQueue.shift());
    }
  }

  initMove(obj,{xd,yd,rotation,easing,time,delay,flipAfter}) {
    obj.startTime = 0;
    obj.isInitialized = true;
    obj.animTime = time;
    obj.startPos.x = obj.x;
    obj.startPos.y = obj.y;
    obj.endPos.x = rT(xd);
    obj.endPos.y = rT(yd);
    obj.endPosQuotient.x = POS_QUOTIENT_CALC.x(this.ctx,obj.endPos.x);
    obj.endPosQuotient.y = POS_QUOTIENT_CALC.y(this.ctx,obj.endPos.y);
    let
      dx = xd - obj.x,
      dy = yd - obj.y;
    obj.animLen = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    obj.direction.x = 1 / obj.animLen * dx;
    obj.direction.y = 1 / obj.animLen * dy;

    obj.startRotation = obj.rotation;
    obj.rotationLen = rotation;

    obj.delay = delay;

    obj.flipAfter = flipAfter || false;

    switch(easing) {
      case 'ease-in': obj.eF = EASING_FUNCTION.easeIn;break;
      case 'ease-out': obj.eF = EASING_FUNCTION.easeOut;break;
      case 'ease-in-out': obj.eF = EASING_FUNCTION.easeInOut;break;
      default: obj.eF = EASING_FUNCTION.linear;
    }
  }

  addAction(obj,func,delay) {
    obj.actions.push(func);
  }

  calcRelPosProp(obj) {
    obj.posQuotient.x = POS_QUOTIENT_CALC.x(this.ctx,obj.x);
    obj.posQuotient.y = POS_QUOTIENT_CALC.y(this.ctx,obj.y);
    obj.endPosQuotient.x = POS_QUOTIENT_CALC.x(this.ctx,obj.x);
    obj.endPosQuotient.y = POS_QUOTIENT_CALC.x(this.ctx,obj.y);
  }

}
