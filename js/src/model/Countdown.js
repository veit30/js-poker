const Label = require('./Label.js');

module.exports = class Countdown extends Label {
  constructor(x,y,startValue,size,color,align,label,callback) {
    super(x,y,"",size,color,align,label);
    this.startValue = parseInt(startValue) || 0;
    this.callback = callback;
    this.renderStart = 0;
    this.finished = false;

  }

  render(ctx) {
    let delta;
    if (this.finished) return;
    if (this.renderStart === 0) {
      this.renderStart = Date.now();
      return;
    } else {
      delta = Date.now() - this.renderStart;
    }
    this.text = Math.round(this.startValue - delta / 1000) + "";
    if (parseInt(this.text) <= 0) {
      this.finished = true;
      this.callback();
      return;
    }
    ctx.font = this.size + 'px Kreon-Bold';
    ctx.textBaseline = 'middle';
    ctx.textAlign = this.align;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text,this.x,this.y);
  }
}
