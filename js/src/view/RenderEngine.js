import CardSymbol from './CardSymbol.js';
import CardText from './CardText.js';
import {colorFromSuit,textFromValue,COLOR} from '../model/Utils.js';

export default class RenderEngine {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear() {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
  }

  renderBackground(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

}
