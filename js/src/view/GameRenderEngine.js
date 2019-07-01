import RenderEngine from './RenderEngine.js';
import CardSymbol from './CardSymbol.js';
import CardText from './CardText.js';
import {colorFromSuit,textFromValue,COLOR,convertToImg,SVG_DATA} from '../model/Utils.js';

export default class GameRenderEngine extends RenderEngine {
  constructor(ctx) {
    super(ctx)
    this.cardBack = convertToImg(SVG_DATA.backside1);
  }

  renderChip({x,y,color,rotation}) {
    let
      ctx = this.ctx,
      radius = ctx.canvas.width * .4 * .03;
    color = color || COLOR.red;
    ctx.save();
    ctx.fillStyle = color;
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
    ctx.fillStyle = color;
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

  renderActionChip() {

  }

  renderCard(card) {
    card.isFace && this.renderCardFace(card) ||
      !card.isFace && this.renderCardBack(card);
  }

  renderBlankCard(card,color) {
    let
      ctx = this.ctx,
      height = (ctx.canvas.width * .4) * .15,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;
    color = color || '#fff';
    ctx.fillStyle = color;
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

    ctx.drawImage(this.cardBack, card.x-halfWidth, card.y-halfHeight, width,height);

    ctx.restore();
  }

  renderDeckShadow({x,y},color) {
    let
      ctx = this.ctx,
      height = (ctx.canvas.width * .4) * .15,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;
    color = color || '#fff';
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(
      x - halfWidth + cornerRadius,
      y - halfHeight,
      cornerRadius,
      Math.PI,
      Math.PI * 1.5
    );
    ctx.arc(
      x + halfWidth - cornerRadius,
      y - halfHeight,
      cornerRadius,
      Math.PI * 1.5,
      Math.PI * 1.75
    );
    ctx.lineTo(
      x + halfWidth + cornerRadius * 2,
      y - halfHeight + cornerRadius * 2
    );
    ctx.arc(
      x + halfWidth + cornerRadius,
      y + halfHeight + cornerRadius  * 2,
      cornerRadius,
      0,
      Math.PI * .5
    );
    ctx.lineTo(
      x - halfWidth + cornerRadius * 2,
      y + halfHeight + cornerRadius * 3
    );
    ctx.arc(
      x - halfWidth + cornerRadius,
      y + halfHeight,
      cornerRadius,
      Math.PI * 0.75,
      Math.PI
    );
    ctx.closePath();
    ctx.fill();

  }
}
