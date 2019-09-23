const Button = require('./Button.js');
const convertToImg = require('./Utils.js').convertToImg;

module.exports = class IconButton extends Button {
  constructor(x,y,height,width,colors,label,icon) {
    super(x,y,height,width,colors,label)
    let idle = icon.replace(/fill="#\w{6}"/gi,'fill="' + colors.idle + '"');
    let hover = icon.replace(/fill="#\w{6}"/gi,'fill="' + colors.hover + '"');
    this.icon = {
      idle: convertToImg(idle),
      hover: convertToImg(hover)
    }
  }

  render(ctx,hover) {
    if (hover) {
      ctx.drawImage(
        this.icon.hover,
        this.x - this.width * .5,
        this.y - this.height * .5,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        this.icon.idle,
        this.x - this.width * .5,
        this.y - this.height * .5,
        this.width,
        this.height
      );
    }
  }
}
