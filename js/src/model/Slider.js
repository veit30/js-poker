const {COLOR} = require('./Utils.js');

module.exports = class Slider {
  constructor(x,y,length,height,orientation,label,colors,invert) {
    this.x = x;
    this.y = y;
    this.length = length <= 0 ? 1 : length;
    this.height = height;
    this.orientation = ['vertical','horizontal'].includes(orientation) ? orientation : 'vertical';
    this.label = label || Math.random().toString(36).substring(7);
    this.colors = colors || {
      idle: COLOR.brown2,
      hover: COLOR.brown,
      stroke: COLOR.white,
      line: COLOR.white
    };
    this.invert = invert || false;
    this.sliderX = x;
    this.sliderY = y;
  }

  intersect({x,y}) {
    if (x >= (this.sliderX - this.height * .5) && x <= (this.sliderX + this.height * .5)) {
      if(y >= (this.sliderY - this.height * .5) && y <= (this.sliderY + this.height * .5)) {
        return true;
      }
    }
    return false;
  }

  render(ctx,hover) {
    ctx.fillStyle = this.colors.idle;
    ctx.lineWidth = this.height * .1;
    ctx.strokeStyle = this.colors.line;
    if (hover) {
      ctx.fillStyle = this.colors.hover;
    }
    if (this.orientation === 'vertical') {
      // draw line
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x, this.y - this.length);
      ctx.stroke();
      // draw handler
    } else {

    }

    ctx.beginPath();
    ctx.arc(
      this.sliderX,
      this.sliderY,
      this.height * .5, 0, Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

  }

  get value() {
    let value;
    if(this.orientation === 'vertical') {
      value = (this.y - this.sliderY) / this.length;
    } else {
      value = (this.sliderX - this.x) / this.length;
    }
    return value;
  }

  moveTo({x,y}) {
    if (this.orientation === 'vertical') {
      this.sliderY = y > this.y ? this.y : y < (this.y - this.length) ? (this.y - this.length) : y;
    } else {

    }
  }
}
