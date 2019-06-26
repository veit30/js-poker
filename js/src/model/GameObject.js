class GameObject {
  constructor(x, y, rotation) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;

    this.posQuotient = {
      x: OBJECTPOSITIONQUOTIENT.x(
        window.poker.game.ctx,this.x,window.poker.table.height
      ),
      y: OBJECTPOSITIONQUOTIENT.y(
        window.poker.game.ctx,this.y,window.poker.table.height
      ),
    }

    // ANIMATION PROPERTIES
    this.eF = EASINGFUNCTION.linear;
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

    this.resizeTimestamp = window.poker.resizeTimestamp;
  }

  moveTo(x,y,rotation,easing,time,delay) {
    this.startTime = 0;
    this.isInitialized = true;
    this.animTime = time;
    this.startPos.x = this.x;
    this.startPos.y = this.y;
    this.endPos.x = x;
    this.endPos.y = y;
    let
    dx = this.direction.x,
    dy = this.direction.y;
    dx = x-this.x;
    dy = y-this.y;
    this.animLen = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    this.direction.x = 1 / this.animLen * dx;
    this.direction.y = 1 / this.animLen * dy;

    this.startRotation = this.rotation;
    this.rotationLen = rotation;

    this.delay = delay;

    switch(easing) {
      case 'ease-in': this.eF = EASINGFUNCTION.easeIn;break;
      case 'ease-out': this.eF = EASINGFUNCTION.easeOut;break;
      case 'ease-in-out': this.eF = EASINGFUNCTION.easeInOut;break;
      default: this.eF = EASINGFUNCTION.linear;
    }
  }

  updateMove() {
    let now = Date.now();
    let timeInAnimation = now - this.startTime;
    let time = timeInAnimation / this.animTime;
    time = time > 1 ? 1 : time;
    let factor = this.eF(time);

    this.x = this.startPos.x + this.direction.x * factor * this.animLen;
    this.y = this.startPos.y + this.direction.y * factor * this.animLen;
    this.posQuotient.x = OBJECTPOSITIONQUOTIENT.x(
      window.poker.game.ctx,this.x,window.poker.table.lastHeight
    );
    this.posQuotient.y = OBJECTPOSITIONQUOTIENT.y(
      window.poker.game.ctx,this.y,window.poker.table.lastHeight
    );

    this.rotation = this.startRotation + factor * this.rotationLen;
    if(this.endPos.x === this.x && this.endPos.y === this.y) {
      this.isRunning = !this.isRunning;
    }
  }

  updateTime() {
    if(this.delay > 0) {
      let delta, now;
      if(this.lastTime === 0) {
        delta = 10;
      } else {
        now = Date.now();
        delta = now - this.lastTime;
        this.lastTime = now;
      }
      this.delay -= delta;
      if(this.delay < 0) this.delay = 0;
    }
  }

  update() {
    this.updateTime();
    if(this.init && this.delay === 0) {
      this.startTime = Date.now();
      this.init = !this.init;
      this.running = true;
    }
    this.isRunning && this.updateMove();
    // console.log('this.tableHeight.new: ' + this.tableHeight.new)
    // console.log('this.tableHeight.old: ' + this.tableHeight.old)
    if(this.resizeTimestamp != window.poker.resizeTimestamp) {
      this.x = window.poker.game.ctx.canvas.width * .5
      + window.poker.table.height * this.posQuotient.x;
      this.y = window.poker.game.ctx.canvas.height * .5
      + window.poker.table.height * this.posQuotient.y;
      this.resizeTimestamp = window.poker.resizeTimestamp;
    }

  }
}
