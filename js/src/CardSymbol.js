class CardSymbol {

  static draw(pos,scale,rotation,type,ctx) {
    switch(type) {
      case 1: this.drawHearts(pos,scale,rotation,type,ctx); break;
      case 2: this.drawTiles(pos,scale,rotation,type,ctx); break;
      case 3: this.drawClovers(pos,scale,rotation,type,ctx); break;
      case 4: this.drawPikes(pos,scale,rotation,type,ctx); break;
    }
  }

  static drawHearts(pos,scale,rotation,type,ctx) {
    let x = pos.x,
    y = pos.y;

    // ctx.strokeStyle = '#fff';
    // ctx.strokeRect(x-scale*.5,y-scale*.5,scale,scale);
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

  static drawTiles(pos,scale,rotation,type,ctx) {
    let x = pos.x,
    y = pos.y;

    // ctx.strokeStyle = '#fff';
    // ctx.strokeRect(x-scale*.5,y-scale*.5,scale,scale);

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

  static drawClovers(pos,scale,rotation,type,ctx) {
    let x = pos.x,
    y = pos.y;

    // ctx.strokeStyle = '#fff';
    // ctx.strokeRect(x-scale*.5,y-scale*.5,scale,scale);

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
    let x = pos.x,
    y = pos.y,
    y1 = y+scale*.1;

    // ctx.strokeStyle = '#fff';
    // ctx.strokeRect(x-scale*.5,y-scale*.5,scale,scale);

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
