class Chip extends MovingObject {
  constructor(x,y, rotation,value,color,ctx) {
    super(x,y,rotation,ctx.canvas);
    //this.x = x;
    //this.y = y;
    //this.radius = radius;
    //this.rotation = rotation;
    this.value = value;
    this.color = color;
    this.ctx = ctx;
  }

  draw() {
    let ctx = this.ctx,
    x = this.x,
    y = this.y,
    radius = Math.floor(ctx.canvas.width*.4) * .03,
    rot = this.rotation;
    // radius = ctx.canvas.height * .015,

    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();

    ctx.clip();

    ctx.fillStyle = "#fff";
    for(let i = 0; i < 3; i++) {
      ctx.translate(x,y);
      if(i === 0) {
        ctx.rotate(rot * Math.PI / 180);
      } else {
        ctx.rotate(60 * Math.PI / 180);
      }
      ctx.translate(-x,-y);
      ctx.fillRect(x-radius*1.1,y-radius*.1,radius*2.2,radius*.2);
    }

    ctx.restore();
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = radius*.1;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(x,y,radius*.8,0,Math.PI*2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x,y,radius*.6,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
