class CardSymbol {

  static render(x,y,scale,rotation,suit) {
    switch(suit) {
      case 1: this.renderHearts(x,y,scale,rotation); break;
      case 2: this.renderTiles(x,y,scale,rotation); break;
      case 3: this.renderClovers(x,y,scale,rotation); break;
      case 4: this.renderPikes(x,y,scale,rotation); break;
    }
  }

  static drawHearts(x,y,scale,rotation) {
    let ctx = window.poker.ctx;
    ctx.save();
    ctx.fillStyle = Color.red;
    ctx.translate(x, y)
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-x, -y)
    ctx.beginPath();
    ctx.arc(x-scale*.25,y-scale*.25,scale*.25,Math.PI,Math.PI*2);
    ctx.arc(x+scale*.25,y-scale*.25,scale*.25,Math.PI,Math.PI*2);
    ctx.moveTo(x-scale*.5,y-scale*.25);
    ctx.quadraticCurveTo(x-scale*.5,y+scale*.05,x,y+scale*.5);
    ctx.quadraticCurveTo(x+scale*.5,y+scale*.05,x+scale*.5,y-scale*.25);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  static drawTiles(x,y,scale,rotation) {
    let ctx = window.poker.ctx;
    ctx.save();
    ctx.fillStyle = Color.red;
    ctx.translate(x, y)
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-x, -y)
    ctx.beginPath();
    ctx.moveTo(x,y-scale*.5);
    ctx.lineTo(x+scale*.4,y);
    ctx.lineTo(x,y+scale*.5);
    ctx.lineTo(x-scale*.4,y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

  }

  static drawClovers(pos,scale,rotation) {
    let ctx = window.poker.ctx;
    ctx.save();
    ctx.fillStyle = Color.black;
    ctx.translate(x, y)
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-x, -y)
    ctx.beginPath();
    ctx.arc(x-scale*.25,y+scale*.1,scale*.23,0,Math.PI*2);
    ctx.arc(x,y-scale*.25,scale*.25,Math.PI*.5,Math.PI*2.5);
    ctx.arc(x+scale*.25,y+scale*.1,scale*.23,Math.PI,Math.PI*3);
    ctx.arc(x,y,scale*.1,0,Math.PI*2);
    ctx.moveTo(x,y-scale*.2)
    ctx.lineTo(x+scale*.1,y+scale*.5);
    ctx.lineTo(x-scale*.1,y+scale*.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  static drawPikes(pos,scale,rotation,type,ctx) {
    let ctx = window.poker.ctx;
    y1 = y + scale * .1;
    ctx.save();
    ctx.fillStyle = Color.black;
    ctx.translate(x, y)
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-x, -y)
    ctx.beginPath();
    ctx.arc(x-scale*.25,y1,scale*.25,0,Math.PI);
    ctx.arc(x+scale*.25,y1,scale*.25,0,Math.PI);
    ctx.moveTo(x-scale*.5,y1);
    ctx.quadraticCurveTo(x-scale*.5,y-scale*.1,x,y-scale*.5);
    ctx.quadraticCurveTo(x+scale*.5,y-scale*.1,x+scale*.5,y1);
    ctx.moveTo(x+scale*.1,y+scale*.5);
    ctx.lineTo(x-scale*.1,y+scale*.5);
    ctx.lineTo(x,y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
