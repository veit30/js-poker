const Button = require('./Button.js');

module.exports = class TextButton extends Button {
  constructor(x,y,height,width,colors,label,text) {
    super(x,y,height,width,colors,label)
    this.text = text;
  }

  render(ctx, hover) {
    let
      height = this.height,
      width = this.width,
      x = this.x,
      y = this.y,
      radius = height * .5,
      strokeWidth = height * .1,
      fontSize = height * .7;

    ctx.save();
    ctx.font = 'bold ' + fontSize + 'px Kreon-Bold';
    ctx.strokeStyle = this.colors.stroke;
    ctx.fillStyle = this.colors.idle;

    if (hover) {
      ctx.fillStyle = this.colors.hover;
    }

    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.arc(
      x - width * .5 + radius,
      y,
      radius, Math.PI * .5, Math.PI * 1.5
    );
    ctx.arc(
      x + width * .5 - radius,
      y,
      radius, Math.PI * 1.5, Math.PI * .5
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.text;
    ctx.fillText(this.text, x, y);

    ctx.restore();
  }
}
