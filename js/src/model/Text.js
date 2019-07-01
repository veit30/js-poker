import {COLOR} from './Utils.js';

export default class Text {
  constructor(text, size, font, weight, color, alignment) {
    this.text = text;
    this.font = font;
    this.size = size;
    this.weight = weight || 'normal';
    this.color = color || COLOR.black;
    this.alignment = alignment || 'center';
    console.log(size);
  }

  calcWidth(ctx) {
    ctx.save();
    ctx.font = this.weight + ' ' + this.size + 'px ' + this.font;
    let width = ctx.measureText(this.text).width;
    ctx.restore();
    return width;
  }

  get format() {
    return this.weight + ' ' + this.size + 'px ' + this.font;
  }

}
