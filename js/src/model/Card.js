class Card extends GameObject {
  constructor(x, y, rotation, suit, value) {
    super(x, y, rotation)
    this.suit = suit;
    this.value = value;
    this.isFace = false;
    if (!window.poker) {
      throw new NoGuiException("Create a poker gui first")
    }
  }

  render() {
    this.isFace && this.renderFace(this.x, this.y, this.rotation) ||
      !this.isFace && this.renderBack(this.x, this.y, this.rotation);
  }

  flip() {
    this.isFace = !this.isFace;
  }

  renderBack() {
    let
      ctx = window.poker.game.ctx,
      height = window.poker.table.height * .15,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.translate(-this.x, -this.y);

    this.renderBlankCard();

    // only prototpye here
    const image = document.getElementById('source');

    ctx.drawImage(image, this.x-halfWidth, this.y-halfHeight, width,height);

    /*
    this.renderBlankCard(.8);


    ctx.clip();

    // PATTERN
    ctx.save();
    ctx.fillStyle = "#ff0000";
    ctx.translate(this.x, this.y);
    ctx.rotate(-30 * Math.PI / 180);
    ctx.translate(-this.x, -this.y);
    for(let i = 0; i++<30;) {
      //ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.x-width*.8+(width*.07*i),this.y-height*.8,width*.02,height*1.6);
    }
    ctx.translate(this.x, this.y)
    ctx.rotate(30 * 2 * Math.PI / 180);
    ctx.translate(-this.x, -this.y)
    for(let i = 0; i++<30;) {
      //ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.x-width*.8+(width*.07*i),this.y-height*.8,width*.02,height*1.6);
    }
    ctx.restore();
    */

    ctx.restore();
  }

  renderBlankCard(scale=1) {
    let
      ctx = window.poker.game.ctx,
      height = window.poker.table.height * .15 * scale,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(
      this.x - halfWidth + cornerRadius,
      this.y - halfHeight,
      cornerRadius,
      Math.PI,
      Math.PI * 1.5
    );
    ctx.arc(
      this.x + halfWidth - cornerRadius,
      this.y - halfHeight,
      cornerRadius,
      Math.PI * 1.5,
      0
    );
    ctx.arc(
      this.x + halfWidth - cornerRadius,
      this.y + halfHeight,
      cornerRadius,
      0,
      Math.PI * .5
    );
    ctx.arc(
      this.x - halfWidth + cornerRadius,
      this.y + halfHeight,
      cornerRadius,
      Math.PI * .5,
      Math.PI
    );
    ctx.closePath();
    ctx.fill();
  }

  renderBlankBorder(scale=1, color=COLOR.red) {
    let
      ctx = window.poker.game.ctx,
      height = window.poker.table.height * .15 * scale,
      width = height * .77,
      halfWidth = width * .5,
      halfHeight = height * .5,
      cornerRadius = .06 * width;

    ctx.strokeStyle = color;
    ctx.lineWidth = width * .05;
    ctx.beginPath();
    ctx.arc(
      this.x - halfWidth + cornerRadius,
      this.y - halfHeight,
      cornerRadius,
      Math.PI,
      Math.PI * 1.5
    );
    ctx.arc(
      this.x + halfWidth - cornerRadius,
      this.y - halfHeight,
      cornerRadius,
      Math.PI * 1.5,
      0
    );
    ctx.arc(
      this.x + halfWidth - cornerRadius,
      this.y + halfHeight,
      cornerRadius,
      0,
      Math.PI * .5
    );
    ctx.arc(
      this.x - halfWidth + cornerRadius,
      this.y + halfHeight,
      cornerRadius,
      Math.PI * .5,
      Math.PI
    );
    ctx.closePath();
    ctx.stroke();
  }

  renderFace() {
    let
      ctx = window.poker.game.ctx,
      height = window.poker.table.height * .15,
      width = height * .77,
      cornerRadius = .06 * width,
      scale = width * .2;

    // CARD SHAPE
    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation * Math.PI / 180);
    ctx.translate(-this.x, -this.y);

    this.renderBlankCard();

    //draw pattern here
    // no pattern
    // small Card symbol and big Card symbol
    CardSymbol.render(
      this.x + width * .1,
      this.y + height * .2,
      scale * 3,
      0,
      this.suit
    );
    if (this.value === 10) {
      CardText.render(
        this.x - width * .1,
        this.y - height * .1,
        scale * 3,
        VALUETEXT(this.value),
        SUITCOLOR(this.suit));
    } else {
      CardText.render(
        this.x - width * .2,
        this.y - height * .1,
        scale * 3,
        VALUETEXT(this.value),
        SUITCOLOR(this.suit)
      );
    }

    ctx.translate(this.x, this.y);
    ctx.rotate(-this.rotation * Math.PI / 180);
    ctx.translate(-this.x, -this.y);

    ctx.restore();
  }

}
