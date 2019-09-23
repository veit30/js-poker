const Button = require('../model/Button.js');

module.exports = class InputField extends Button {
  constructor(x,y,width,height,colors,label,text) {
    super(x,y,width,height,colors,label);
    this.text = text || '';
    this.focus = false;
    this.blink = 1000;
    this.last = Date.now();
  }

  render(ctx,hover,focus) {
    let shownText = this.text;
    if (hover || this.focus) {
      ctx.fillStyle = this.colors.hover;
    } else {
      ctx.fillStyle = this.colors.idle;
    }
    let radius = this.height * 0.1;
    let fontSize = this.height * .5;
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
    let textWidth = ctx.measureText(this.text).width;
    while(ctx.measureText(shownText+"|").width > this.width * .9) {
      shownText = shownText.slice(1);
    }
    let textEnd = ctx.measureText(shownText).width + this.x - this.width * .45;
    ctx.fillText(shownText,this.x - this.width * .45,this.y);

    // blinking
    if (this.focus) {
      if(this.blink < 500) {
        ctx.fillText('|',textEnd,this.y);
      }
      this.blink -= Date.now() - this.last;
      this.last = Date.now();
      if(this.blink < 0) this.blink = 1000;
    }




  }


}
