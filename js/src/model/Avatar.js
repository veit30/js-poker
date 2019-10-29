const {COLOR} = require('./Utils.js');

module.exports = class Avatar {
  constructor(x,y,width,avatar,state) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.avatar = avatar;
    this.state = state || '';
  }

  intersect() {
    return false;
  }

  render(ctx) {
    // TODO implement Image
    ctx.fillStyle = this.avatar;
    ctx.lineWidth = this.width * .07;
    if (this.state === 'active') {
      ctx.strokeStyle = COLOR.alertGreenHover;
    } else if (this.state === 'broke') {
      ctx.strokeStyle = COLOR.chipGrey;
    } else {
      ctx.strokeStyle = COLOR.white;
    }
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.width * .5, 0, Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
