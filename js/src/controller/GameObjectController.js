import {POS_QUOTIENT_CALC} from './Utils.js';

export default class GameObjectController {
  constructor(ctx) {
    this.ctx = ctx;
    this.windowResized = false;
  }

  update(obj) {
    this.updateTimer(obj);
    if(obj.init && obj.delay === 0) {
      obj.startTime = Date.now();
      obj.init = !obj.init;
      obj.running = true;
    }
    obj.isRunning && this.updateMove(obj);
    if(this.windowResized) {
      let tableHeight = this.ctx.canvas.width * .4;
      obj.x = this.ctx.canvas.width * .5 + tableHeight * obj.posQuotient.x;
      obj.y = this.ctx.canvas.height * .5 + tableHeight * obj.posQuotient.y;
    }
  }

  updateMove(obj) {
    let now = Date.now();
    let timeInAnimation = now - obj.startTime;
    let time = timeInAnimation / obj.animTime;
    time = time > 1 ? 1 : time;
    let factor = this.eF(time);

    obj.x = obj.startPos.x + obj.direction.x * factor * obj.animLen;
    obj.y = obj.startPos.y + obj.direction.y * factor * obj.animLen;
    this.calcRelPosProp(obj);

    obj.rotation = obj.startRotation + factor * obj.rotationLen;
    if(obj.endPos.x === obj.x && obj.endPos.y === obj.y) {
      obj.isRunning = !obj.isRunning;
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
    if (obj.moveQueue.length != 0) {
      initMove(obj,obj.moveQueue.shift());
    }
  }

  initMove(obj,{xd,yd,rotation,easing,time,delay}) {
    obj.startTime = 0;
    obj.isInitialized = true;
    obj.animTime = time;
    obj.startPos.x = obj.x;
    obj.startPos.y = obj.y;
    obj.endPos.x = xd;
    obj.endPos.y = yd;
    let
      dx = xd - this.x,
      dy = yd - this.y;
    obj.animLen = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    obj.direction.x = 1 / obj.animLen * dx;
    obj.direction.y = 1 / obj.animLen * dy;

    obj.startRotation = obj.rotation;
    obj.rotationLen = rotation;

    obj.delay = delay;

    switch(easing) {
      case 'ease-in': obj.eF = EASING_FUNCTION.easeIn;break;
      case 'ease-out': obj.eF = EASING_FUNCTION.easeOut;break;
      case 'ease-in-out': obj.eF = EASING_FUNCTION.easeInOut;break;
      default: obj.eF = EASING_FUNCTION.linear;
    }
  }

  calcRelPosProp(obj) {
    obj.posQuotient.x = POS_QUOTIENT_CALC.x(this.ctx,obj.x);
    obj.posQuotient.y = POS_QUOTIENT_CALC.y(this.ctx,obj.y);
  }

}
