export default class Text {
  constructor(text, size, font, weight) {
    this.text = text;
    this.font = font;
    this.size = size;
    this.weight = weight || 'normal';
  }

  calcFontSize(ctx) {
    ctx.save();
    ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    let width = this.ctx.measureText(this.text).width;
    ctx.restore();
    return width;
  }

  get format() {
    return this.weight + ' ' + this.size + 'px' + this.font;
  }

}
