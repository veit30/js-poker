const Button = require('./Button.js');
const convertToImg = require('./Utils.js').convertToImg;

class IconButton extends Button {
  constructor(x,y,height,width,color,icon) {
    super(x,y,height,width,color)
    this.icon = convertToImg(icon);
  }
}

module.exports = IconButton;
