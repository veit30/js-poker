import CardSymbol from './CardSymbol.js';
import CardText from './CardText.js';
import {colorFromSuit,textFromValue,COLOR} from '../model/Utils.js';

export default class RenderEngine {
  constructor(ctx) {
    this.ctx = ctx;
  }

  static renderChip(chip) {
    let
      ctx = this.ctx,
      x = chip.x,
      y = chip.y,
      radius = ctx.canvas.width * .4 * .03,
      rotation = chip.rotation;

    ctx.save();
    ctx.fillStyle = chip.color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.clip();

    ctx.fillStyle = COLOR.white;
    for (let i = 0; i < 3; i++) {
      ctx.translate(x, y);
      if (i === 0) {
        ctx.rotate(rotation * Math.PI / 180);
      } else {
        ctx.rotate(60 * Math.PI / 180);
      }
      ctx.translate(-x, -y);
      ctx.fillRect(x - radius * 1.1, y - radius * .1, radius * 2.2, radius * .2);
    }

    ctx.restore();
    ctx.save();
    ctx.strokeStyle = COLOR.white;
    ctx.lineWidth = radius * .1;
    ctx.fillStyle = chip.color;
    ctx.beginPath();
    ctx.arc(x, y, radius * .8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius * .6, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  renderCard(card) {
    card.isFace && this.renderCardFace(card) ||
      !card.isFace && this.renderCardBack(card);
  }

  renderCardFace(card) {
    let
      ctx = this.ctx,
      height = (ctx.canvas.width * .4) * .15,
      width = height * .77,
      cornerRadius = .06 * width,
      scale = width * .2;

    // CARD SHAPE
    ctx.save();

    ctx.translate(card.x, card.y);
    ctx.rotate(card.rotation * Math.PI / 180);
    ctx.translate(-card.x, -card.y);

    this.renderBlankCard(card);

    //draw pattern here
    // no pattern
    // small Card symbol and big Card symbol
    CardSymbol.render(
      card.x + width * .1,
      card.y + height * .2,
      0,
      scale * 3,
      card.suit,
      this.ctx
    );
    if (card.value === 10) {
      CardText.render(
        card.x - width * .1,
        card.y - height * .1,
        scale * 3,
        textFromValue(card.value),
        colorFromSuit(card.suit),
        this.ctx
      );
    } else {
      CardText.render(
        card.x - width * .2,
        card.y - height * .1,
        scale * 3,
        textFromValue(card.value),
        colorFromSuit(card.suit),
        this.ctx
      );
    }

    ctx.translate(card.x, card.y);
    ctx.rotate(-card.rotation * Math.PI / 180);
    ctx.translate(-card.x, -card.y);

    ctx.restore();
  }

  renderCardBack(card) {
    let
      ctx = this.ctx,
      height = (ctx.canvas.width * .4) * .15,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;

    ctx.save();

    ctx.translate(card.x, card.y);
    ctx.rotate(card.rotation * Math.PI / 180);
    ctx.translate(-card.x, -card.y);

    this.renderBlankCard(card);

    // only prototpye here
    /*
    const image = document.getElementById('source');

    ctx.drawImage(image, card.x-halfWidth, card.y-halfHeight, width,height);
    */
    ctx.restore();
  }

  renderBlankCard(card) {
    let
      ctx = this.ctx,
      height = (ctx.canvas.width * .4) * .15,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(
      card.x - halfWidth + cornerRadius,
      card.y - halfHeight,
      cornerRadius,
      Math.PI,
      Math.PI * 1.5
    );
    ctx.arc(
      card.x + halfWidth - cornerRadius,
      card.y - halfHeight,
      cornerRadius,
      Math.PI * 1.5,
      0
    );
    ctx.arc(
      card.x + halfWidth - cornerRadius,
      card.y + halfHeight,
      cornerRadius,
      0,
      Math.PI * .5
    );
    ctx.arc(
      card.x - halfWidth + cornerRadius,
      card.y + halfHeight,
      cornerRadius,
      Math.PI * .5,
      Math.PI
    );
    ctx.closePath();
    ctx.fill();
  }

  renderTable() {
    this.renderTablePlate();
    this.renderTableBorder();
    this.renderCCBorder();
  }

  renderTablePlate() {
    let
      grd,
      ctx = this.ctx,
      canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height,
      tableHeight = canvasWidth * .4,
      halfCanvasWidth = canvasWidth * .5,
      halfCanvasHeight = canvasHeight * .5,
      halfTableHeight = tableHeight * .5;

    ctx.save();
    grd = ctx.createRadialGradient(
      halfCanvasWidth, canvasHeight * .62,
      1, halfCanvasWidth, canvasHeight * .62, tableHeight
    );
    grd.addColorStop(0, COLOR.lightGreen);
    grd.addColorStop(1, COLOR.darkerGreen);
    ctx.fillStyle = grd;
    // ctx.fillStyle = COLOR.lightGreen;
    ctx.beginPath();
    ctx.moveTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.lineTo(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth + halfTableHeight, halfCanvasHeight,
      halfTableHeight, Math.PI * 1.5, Math.PI * .5
    );
    ctx.lineTo(halfCanvasWidth - halfTableHeight,
      halfCanvasHeight + halfTableHeight
    );
    ctx.arc(halfCanvasWidth - halfTableHeight,
      halfCanvasHeight, halfTableHeight, Math.PI * .5, Math.PI * 1.5
    );
    ctx.closePath();
    ctx.transform(1, 0, 0, 0.7, 0, tableHeight * .25);
    ctx.fill();
    ctx.restore();
  }

  renderTableBorder() {
    let ctx = this.ctx,
      canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height,
      tableHeight = canvasWidth * .4,
      halfTableHeight = tableHeight * .5,
      halfCanvasWidth = canvasWidth * .5,
      halfCanvasHeight = canvasHeight * .5;

    ctx.strokeStyle = COLOR.brown;
    ctx.lineWidth = tableHeight * .1;
    ctx.beginPath();
    ctx.moveTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.lineTo(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth + halfTableHeight, halfCanvasHeight,
      halfTableHeight, Math.PI * 1.5, Math.PI * .5
    );
    ctx.lineTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight + halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth - halfTableHeight, halfCanvasHeight,
      halfTableHeight, Math.PI * .5, Math.PI * 1.5
    );
    ctx.stroke();
    ctx.strokeStyle = COLOR.brown2;
    ctx.lineWidth = tableHeight * .02;
    ctx.beginPath();
    ctx.moveTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.lineTo(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight, halfTableHeight, Math.PI * 1.5, Math.PI * .5
    );
    ctx.lineTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight + halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight, halfTableHeight, Math.PI * .5, Math.PI * 1.5
    );
    ctx.stroke();
  }

  renderCCBorder() {
    let
      ctx = this.ctx,
      halfCanvasWidth = ctx.canvas.width * .5,
      halfCanvasHeight = ctx.canvas.height * .5,
      height = (ctx.canvas.width * .4) * .13,
      width = height * 5.2,
      radius = width * .06,
      halfWidth = width * .5,
      halfHeight = height * .5,
      strokeWidth = width * .01;

    ctx.save();

    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.arc(
      (halfCanvasWidth - halfWidth) + radius, halfCanvasHeight - halfHeight,
      radius, Math.PI, Math.PI * 1.5
    );
    ctx.arc(
      (halfCanvasWidth + halfWidth) - radius, (halfCanvasHeight - halfHeight),
      radius, Math.PI * 1.5, 0
    );
    ctx.arc(
      (halfCanvasWidth + halfWidth) - radius, (halfCanvasHeight + halfHeight),
      radius, 0, Math.PI * .5
    );
    ctx.arc(
      (halfCanvasWidth - halfWidth) + radius, (halfCanvasHeight + halfHeight),
      radius, Math.PI * .5, Math.PI
    );
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  resetCanvas() {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
  }

  renderBackground(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

}
