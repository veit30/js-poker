class MovingObject {
  constructor(x,y,rotation,canvas) {
    // OBJECTS REAL PROPERTIES
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    // CANVAS
    this.canvas = canvas;
    this.tableHeight = {
      old: Math.floor(this.canvas.width*.4),
      new: Math.floor(this.canvas.width*.4)
    }
    this.posQ = {
      x: ObjectPosQ.x(this.canvas,this.x,this.tableHeight.old),
      y: ObjectPosQ.y(this.canvas,this.y,this.tableHeight.old),
    }
    log(this.posQ.x);
    log(this.posQ.y);
    // ANIMATION PROPERTIES
    this.eF = EasingFunction.linear;
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
    this.init = false;
    this.running = false;
  }
  //time in milliseconds
  moveTo(pos,rotation,easing,time,delay) {
    this.startTime = 0;
    this.init = true;
    this.animTime = time;
    this.startPos.x = this.x;
    this.startPos.y = this.y;
    this.endPos.x = pos.x;
    this.endPos.y = pos.y;
    let dx = this.direction.x,
    dy = this.direction.y;
    dx = pos.x-this.x;
    dy = pos.y-this.y;
    this.animLen = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2));
    this.direction.x = 1 / this.animLen * dx;
    this.direction.y = 1 / this.animLen * dy;

    this.startRotation = this.rotation;
    this.rotationLen = rotation;

    this.delay = delay;

    switch(easing) {
      case 'ease-in': this.eF = EasingFunction.easeIn;break;
      case 'ease-out': this.eF = EasingFunction.easeOut;break;
      case 'ease-in-out': this.eF = EasingFunction.easeInOut;break;
      default: this.eF = EasingFunction.linear;
    }
  }

  updateMove() {
    if(this.running) {
      let now = Date.now();
      let tia = now - this.startTime;
      let t = tia / this.animTime;
      t = t > 1 ? 1 : t;
      let fac = this.eF(t);

      this.x = this.startPos.x + this.direction.x * fac * this.animLen;
      this.y = this.startPos.y + this.direction.y * fac * this.animLen;
      this.posQ.x = ObjectPosQ.x(this.canvas,this.x,this.tableHeight.old);
      this.posQ.y = ObjectPosQ.y(this.canvas,this.y,this.tableHeight.old);

      this.rotation = this.startRotation + fac * this.rotationLen;
      if(this.endPos.x === this.x && this.endPos.y === this.y) {
        this.running = !this.running;
      }
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
    this.tableHeight.new = Math.floor(this.canvas.width*.4);
    //log(this.tableHeight.new);
    if (this.tableHeight.new < 360) {
      log(this.posQ.x);
    }
    this.updateTime();
    if(this.init && this.delay === 0) {
      this.startTime = Date.now();
      this.init = !this.init;
      this.running = true;
    }
    this.updateMove();
    if(this.tableHeight.new != this.tableHeight.old) {
      this.x = this.canvas.width * .5 + this.tableHeight.new * this.posQ.x;
      this.y = this.canvas.height * .5 + this.tableHeight.new * this.posQ.y;

      this.tableHeight.old = this.tableHeight.new
    }
  }
}
