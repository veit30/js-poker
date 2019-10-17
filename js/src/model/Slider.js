const {COLOR} = require('./Utils.js');

module.exports = class Slider {
  constructor(x,y,length,orientation,color,) {
    this.x = x;
    this.y = y;
    this.lenght = length;
    this.orientation = orientation || 'vertial'; // vertical, horizontal
    this.step =
    this.colors = colors || {
      idle:
      hover:

    };
  }

  render(ctx,hover) {
    if (this.orientation === 'vertical') {

    } else {

    }
    ctx.fillStyle
  }
}
