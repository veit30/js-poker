const Button = require('./Button.js');

module.exports = class AlertBox extends Button {
  constructor(x,y,width,height,colors,label,text) {
    super(x,y,width,height,colors,label);
    this.text = text || '';
  }

  intersect({x,y}) {
    let radius = this.height * .1
    if (x >= (this.x - this.width * .5) && x <= (this.x + this.width * .5)) {
      if(y >= (this.y - this.height * .5 - radius) && y <= (this.y + this.height * .5 + radius)) {
        return true;
      }
    }
    return false;
  }

  render(ctx,hover) {
    if (hover) {
      ctx.fillStyle = this.colors.hover;
    } else {
      ctx.fillStyle = this.colors.idle;
    }
    let radius = this.height * 0.1;
    let fontSize = this.height * .4;
    ctx.beginPath();
    ctx.arc(
      this.x - this.width * .5 + radius, this.y - this.height * .5,
      radius, Math.PI, Math.PI * 1.5
    );
    ctx.arc(
      this.x + this.width * .5 - radius, this.y - this.height * .5,
      radius, Math.PI * 1.5, 0
    );
    ctx.arc(
      this.x + this.width * .5 - radius, this.y + this.height * .5,
      radius, 0, Math.PI * .5
    );
    ctx.arc(
      this.x - this.width * .5 + radius, this.y + this.height * .5,
      radius, Math.PI * .5, Math.PI
    );
    ctx.closePath();
    ctx.fill();

    ctx.font = fontSize + 'px Kreon-Bold';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    ctx.fillStyle = this.colors.text;

    ctx.fillText(this.text,this.x - this.width * .45,this.y);


  }
}
