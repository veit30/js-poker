module.exports = class CardText {
  static render(x,y,size,text,color,ctx) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = 'bold ' + size + 'px Kreon-Bold';
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}
