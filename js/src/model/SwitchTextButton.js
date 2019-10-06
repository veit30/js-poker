const TextButton = require('./TextButton.js');

module.exports = class SwitchTextButton extends TextButton {
  constructor(x,y,height,width,colors,label,textProp,triggered) {
    super(x,y,height,width,colors,label,'');
    this.triggered = triggered || false;
    this.textProp = textProp;
    this.text = this.textProp[+this.triggered];
  }

  render(ctx,hover) {
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

    if (this.triggered) {
      if (hover) {
        ctx.fillStyle = this.colors.triggeredHover;
      } else {
        ctx.fillStyle = this.colors.triggeredIdle;
      }
    } else {
      if (hover) {
        ctx.fillStyle = this.colors.hover;
      } else {
        ctx.fillStyle = this.colors.idle;
      }
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

  trigger() {
    this.triggered = !this.triggered;
    this.text = this.textProp[+this.triggered];
  }
}
