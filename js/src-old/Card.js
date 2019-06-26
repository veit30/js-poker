class Card extends MovingObject{
  constructor(x, y, rotation, type, value, ctx) {
    super(x, y, rotation, ctx.canvas);
    // RENDER SPECIFIC
    // this.width = width;
    this.ctx = ctx;
    this.face = false;
    // CARD SPECIFIC
    this.type = type;
    this.value = value;
  }

  draw() {
    if(this.face) {
      this.drawFace();
    } else {
      this.drawBack();
    }
  }

  flip() {
    this.face = !this.face;
  }

  /* Older implementation of Card backside
  drawBack_old() {
    let ctx = this.ctx,
    //scale = ctx.canvas.height * .0013 * 50,
    w = this.width,
    h = 1.3*w,
    r = .06*w,
    x = this.x,
    y = this.y;

    // CARD SHAPE

    // GLOBAL CARD ROTATION
    ctx.translate(x, y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.translate(-x, -y);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc((x-.5*w)+r,y-.5*h,r,Math.PI,Math.PI*1.5);
    ctx.arc((x+.5*w)-r,(y-.5*h),r,Math.PI*1.5,0);
    ctx.arc((x+.5*w)-r,(y+.5*h),r,0,Math.PI*.5);
    ctx.arc((x-.5*w)+r,(y+.5*h),r,Math.PI*.5,Math.PI);
    ctx.closePath();
    ctx.fill();

    // INNER CARD LINE
    w = this.width * .85;
    h = 1.35*w;
    r = .05*w;
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = w*.02;

    ctx.beginPath();
    ctx.arc((x-.5*w)+r,y-.5*h,r,Math.PI,Math.PI*1.5);
    ctx.arc((x+.5*w)-r,(y-.5*h),r,Math.PI*1.5,0);
    ctx.arc((x+.5*w)-r,(y+.5*h),r,0,Math.PI*.5);
    ctx.arc((x-.5*w)+r,(y+.5*h),r,Math.PI*.5,Math.PI);
    ctx.closePath();
    ctx.stroke();

    // CARD PATTERN CLIP
    ctx.save();
    ctx.beginPath();
    ctx.rect(x-w*.45,y-h*.5,w*.9,h);
    // ctx.lineWidth = 1;
    // ctx.stroke();
    ctx.clip();

    // PATTERN
    ctx.fillStyle = "#ff0000";

    let rotation = 30;
    ctx.translate(x, y);
    ctx.rotate(-rotation * Math.PI / 180);
    ctx.translate(-x, -y);
    for(let i = 0; i++<30;) {
      ctx.fillRect(x-w*.8+(w*.07*i),y-h*.6,w*.02,h*1.4);
    }
    ctx.translate(x, y)
    ctx.rotate(rotation * 2 * Math.PI / 180);
    ctx.translate(-x, -y)
    for(let i = 0; i++<30;) {
      ctx.fillRect(x-w*.8+(w*.07*i),y-h*.6,w*.02,h*1.4);
    }
    ctx.restore();

    //GLOBAL CARD ROTATION RESET
    ctx.translate(x, y)
    ctx.rotate(-this.rotation * Math.PI / 180);
    ctx.translate(-x, -y)
  }
  */

  drawBack() {
    let ctx = this.ctx,
    //w = this.width,
    // make it dependent from table height
    h = Math.floor(ctx.canvas.width*.4)*.15,
    w = h * .77,
    // w = ctx.canvas.height * .085,
    // h = 1.3*w,
    r = .06*w,
    x = this.x,
    y = this.y;

    // CARD SHAPE

    // GLOBAL CARD ROTATION
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.translate(-x, -y);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc((x-.5*w)+r,y-.5*h,r,Math.PI,Math.PI*1.5);
    ctx.arc((x+.5*w)-r,(y-.5*h),r,Math.PI*1.5,0);
    ctx.arc((x+.5*w)-r,(y+.5*h),r,0,Math.PI*.5);
    ctx.arc((x-.5*w)+r,(y+.5*h),r,Math.PI*.5,Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.clip();

    // PATTERN
    ctx.save();
    ctx.fillStyle = "#ff0000";
    let rotation = 30;
    ctx.translate(x, y);
    ctx.rotate(-rotation * Math.PI / 180);
    ctx.translate(-x, -y);
    for(let i = 0; i++<30;) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(x-w*.8+(w*.07*i),y-h*.8,w*.02,h*1.6);
    }
    ctx.translate(x, y)
    ctx.rotate(rotation * 2 * Math.PI / 180);
    ctx.translate(-x, -y)
    for(let i = 0; i++<30;) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(x-w*.8+(w*.07*i),y-h*.8,w*.02,h*1.6);
    }
    ctx.restore();
    // RESTORE GLOBAL CARD ROTATION
    ctx.restore();
  }

  drawFace() {
    let ctx = this.ctx,
    // w = this.width,
    // w = ctx.canvas.height * .085,
    // h = 1.3*w,
    h = Math.floor(this.ctx.canvas.width*.4)*.15,
    w = h * .77,
    r = .06*w,
    x = this.x,
    y = this.y,
    scale = w*.2;

    // CARD SHAPE
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.translate(-x, -y);

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc((x-.5*w)+r,y-.5*h,r,Math.PI,Math.PI*1.5);
    ctx.arc((x+.5*w)-r,(y-.5*h),r,Math.PI*1.5,0);
    ctx.arc((x+.5*w)-r,(y+.5*h),r,0,Math.PI*.5);
    ctx.arc((x-.5*w)+r,(y+.5*h),r,Math.PI*.5,Math.PI);
    ctx.closePath();
    ctx.fill();

    //draw pattern here

    switch(this.value) {
      case 14:
        CardSymbol.draw({x: x, y: y},scale*2,0,this.type,ctx);
        break;
      case 13: if (this.value === 13) CardLetter.draw({x: x, y: y+h*.17},scale*3.5,this.type,13,ctx);
      case 12: if (this.value === 12) CardLetter.draw({x: x, y: y+h*.17},scale*3.5,this.type,12,ctx);
      case 11: if (this.value === 11) CardLetter.draw({x: x, y: y+h*.17},scale*3.5,this.type,11,ctx);
        CardSymbol.draw({x: x-w*.35, y: y-h*.4},scale*.6,0,this.type,ctx);
        CardSymbol.draw({x: x+w*.35, y: y+h*.4},scale*.6,0,this.type,ctx);
        break;
      case 3: CardSymbol.draw({x: x, y: y},scale,0,this.type,ctx);
      case 2:
        CardSymbol.draw({x: x, y: y-h*.3},scale,0,this.type,ctx);
        CardSymbol.draw({x: x, y: y+h*.3},scale,180,this.type,ctx);
        break;
      case 8: CardSymbol.draw({x: x, y: y+h*.15},scale,180,this.type,ctx);
      case 7: CardSymbol.draw({x: x, y: y-h*.15},scale,0,this.type,ctx);
      case 6:
        CardSymbol.draw({x: x-w*.25, y: y},scale,0,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y},scale,0,this.type,ctx);
      case 5:
        if(this.value === 5) CardSymbol.draw({x: x, y: y},scale,0,this.type,ctx);
      case 4:
        CardSymbol.draw({x: x-w*.25, y: y-h*.3},scale,0,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y-h*.3},scale,0,this.type,ctx);
        CardSymbol.draw({x: x-w*.25, y: y+h*.3},scale,180,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y+h*.3},scale,180,this.type,ctx);
        break;
      case 10:
        CardSymbol.draw({x: x, y: y-h*.2},scale,0,this.type,ctx);
        CardSymbol.draw({x: x, y: y+h*.2},scale,180,this.type,ctx);
      case 9:
        CardSymbol.draw({x: x-w*.25, y: y-h*.3},scale,0,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y-h*.3},scale,0,this.type,ctx);
        CardSymbol.draw({x: x-w*.25, y: y+h*.3},scale,180,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y+h*.3},scale,180,this.type,ctx);
        CardSymbol.draw({x: x-w*.25, y: y-h*.1},scale,0,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y-h*.1},scale,0,this.type,ctx);
        CardSymbol.draw({x: x-w*.25, y: y+h*.1},scale,180,this.type,ctx);
        CardSymbol.draw({x: x+w*.25, y: y+h*.1},scale,180,this.type,ctx);
        if(this.value === 9) CardSymbol.draw({x: x, y: y},scale,0,this.type,ctx);
        break;
    }

    ctx.translate(x, y);
    ctx.rotate(-this.rotation * Math.PI / 180);
    ctx.translate(-x, -y);

    ctx.restore();
  }

  static drawBorder(x,y,rotation,ctx) {
    let h = Math.floor(ctx.canvas.width*.4)*.15,
    w = h * .77,
    // let w = ctx.canvas.height * .085,
    // h = 1.3*w,
    r = .06*w,
    strokeWidth = w * .05;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-x, -y);

    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.arc((x-.5*w)+r,y-.5*h,r,Math.PI,Math.PI*1.5);
    ctx.arc((x+.5*w)-r,(y-.5*h),r,Math.PI*1.5,0);
    ctx.arc((x+.5*w)-r,(y+.5*h),r,0,Math.PI*.5);
    ctx.arc((x-.5*w)+r,(y+.5*h),r,Math.PI*.5,Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

  }
}
