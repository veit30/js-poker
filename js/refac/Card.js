class Card extends MovingGameObject {
  constructor(x,y,rotation,suit, value) {
    super(x,y,rotation)
    this.suit = suit;
    this.value = value;
    this.isFace = false;
    if(!window.poker) {
      throw new NoGuiException("Create a poker gui first")
    }
    this.ctx = window.poker.ctx;
  }

  render() {
    this.isFace && this.drawFace(x,y,r) || !this.isFace && this.drawBack(x,y,r);
  }

  flipCard() {
    this.isFace = !this.isFace;
  }

  renderBack() {
    let ctx = this.ctx,
    h = window.poker.table.height,
    w = h * .77,
    rad = .06 * w,
    x = this.x,
    y = this.y;

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

    ctx.save();
    ctx.fillStyle = "#ff0000";
    ctx.translate(x, y);
    ctx.rotate(-30 * Math.PI / 180);
    ctx.translate(-x, -y);
    for(let i = 0; i++<30;) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(x-w*.8+(w*.07*i),y-h*.8,w*.02,h*1.6);
    }
    ctx.translate(x, y)
    ctx.rotate(30 * 2 * Math.PI / 180);
    ctx.translate(-x, -y)
    for(let i = 0; i++<30;) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(x-w*.8+(w*.07*i),y-h*.8,w*.02,h*1.6);
    }
    ctx.restore();

    ctx.restore();
  }

  renderFace() {
    let ctx = this.ctx,
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
    // no pattern



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

}
