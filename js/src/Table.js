class Table {

  constructor(ctx) {
    this.ctx = ctx;
    this.cH;
    this.cW;
    // width is controlled by height
    this.h;
  }

  draw() {
    this.cH = this.ctx.canvas.height;
    this.cW = this.ctx.canvas.width;
    // for now this is better than .8*this.cH
    this.h = Math.floor(.4*this.cW);
    this.table();
    this.tableBorder();
    this.cardBorders();
  }

  table() {
    let ctx = this.ctx,
    cW = this.cW,
    cH = this.cH,
    h = this.h,
    grd,
    x = ctx.canvas.width*.5,
    y = ctx.canvas.height*.6;

    ctx.save();
    grd = ctx.createRadialGradient(x, y, 1, x, y, h);
    grd.addColorStop(0, Color.lightGreen);
    grd.addColorStop(1, Color.darkerGreen);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(cW*.5-.5*h,cH*.5-.5*h);
    ctx.lineTo(cW*.5+.5*h,cH*.5-.5*h);
    ctx.arc(cW*.5+.5*h,cH*.5,h*.5,Math.PI*1.5,Math.PI*.5);
    ctx.lineTo(cW*.5-.5*h,cH*.5+.5*h);
    ctx.arc(cW*.5-.5*h,cH*.5,h*.5,Math.PI*.5,Math.PI*1.5);
    ctx.closePath();
    ctx.transform(1,0,0,0.7,0,h*.25);
    ctx.fill();
    ctx.restore();
  }

  tableBorder() {
    let ctx = this.ctx,
    cW = this.cW,
    cH = this.cH,
    h = this.h;
    ctx.strokeStyle = Color.brown;
    ctx.lineWidth = h*.1;
    ctx.beginPath();
    ctx.moveTo(cW*.5-.5*h,cH*.5-.5*h);
    ctx.lineTo(cW*.5+.5*h,cH*.5-.5*h);
    ctx.arc(cW*.5+.5*h,cH*.5,h*.5,Math.PI*1.5,Math.PI*.5);
    ctx.lineTo(cW*.5-.5*h,cH*.5+.5*h);
    ctx.arc(cW*.5-.5*h,cH*.5,h*.5,Math.PI*.5,Math.PI*1.5);
    ctx.stroke();
    ctx.strokeStyle = Color.brown2;
    ctx.lineWidth = h*.02;
    ctx.beginPath();
    ctx.moveTo(cW*.5-.5*h,cH*.5-.5*h);
    ctx.lineTo(cW*.5+.5*h,cH*.5-.5*h);
    ctx.arc(cW*.5+.5*h,cH*.5,h*.5,Math.PI*1.5,Math.PI*.5);
    ctx.lineTo(cW*.5-.5*h,cH*.5+.5*h);
    ctx.arc(cW*.5-.5*h,cH*.5,h*.5,Math.PI*.5,Math.PI*1.5);
    ctx.stroke();
  }

  cardBorders() {
    let ctx = this.ctx,
    cW = this.cW,
    ch = this.cH,
    h = this.h;
    let ppos = [
      // lower middle
      {x:ctx.canvas.width*.5,y:ctx.canvas.height*.5 + this.h * .35,r:0},
      // upper middle
      {x:ctx.canvas.width*.5,y:ctx.canvas.height*.5 - this.h * .35,r:0},
      // upper right
      {x:ctx.canvas.width*.5 + this.h * .6,y:ctx.canvas.height*.5 - this.h * .3,r:35},
      // lower right
      {x:ctx.canvas.width*.5 + this.h * .6,y:ctx.canvas.height*.5 + this.h * .3,r:-35},
      // upper left
      {x:ctx.canvas.width*.5 - this.h * .6,y:ctx.canvas.height*.5 - this.h * .3,r:-35},
      // lower left
      {x:ctx.canvas.width*.5 - this.h * .6,y:ctx.canvas.height*.5 + this.h * .3,r:35},
      // middle right
      {x:ctx.canvas.width*.5 + this.h * .8,y:ctx.canvas.height*.5,r:90},
      // middle left
      {x:ctx.canvas.width*.5 - this.h * .8,y:ctx.canvas.height*.5,r:90}
    ];
    // center cards
    for(let i = .35; i < .7; i+=.05) {
        Card.drawBorder(ctx.canvas.width * i,ctx.canvas.height * .5,0,ctx);
    }
    let scale = Math.floor(this.ctx.canvas.width*.4)*.02371;
    // card stack
    CardLetter.drawLetter(ctx.canvas.width * .6,
      ctx.canvas.height * .5 + scale*1.1,
      scale*3.5,
      "S",
      "rgba(0,0,0,0.3)",
      ctx);
    // burnt cards
    CardLetter.drawLetter(ctx.canvas.width * .65,
      ctx.canvas.height * .5 + scale*1.1,
      scale*3.5,
      "B",
      "rgba(0,0,0,0.3)",
      ctx);
    // player card borders
    for(let p of ppos) {
      ctx.save();
      if (p.r != 0) {
        ctx.translate(p.x,p.y);
        ctx.rotate(p.r * Math.PI / 180);
        ctx.translate(-p.x,-p.y);
      }
      Card.drawBorder(p.x - ctx.canvas.width*.025,p.y,0,ctx);
      Card.drawBorder(p.x + ctx.canvas.width*.025,p.y,0,ctx);
      ctx.restore()
    }
  }
}
