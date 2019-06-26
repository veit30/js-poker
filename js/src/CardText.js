class CardText {
  static render(x,y,size,text,color) {
    let ctx = window.poker.game.ctx;
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = 'bold ' + size + 'px Kreon-Bold';
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}