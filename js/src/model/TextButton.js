const Button = require('./Button.js');

module.exports = class TextButton extends Button {
  constructor(x,y,height,width,color,text) {
    super(x,y,height,width,color)
    this.text = text;
  }
}
