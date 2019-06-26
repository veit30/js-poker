class CardLetter {
  static draw(pos,scale,type,value,ctx) {
    let color = type === 1 || type === 2 ? Color.red : Color.black,
    text = CardText[value],
    x = pos.x,
    y = pos.y;

    ctx.save();
    ctx.fillStyle = color;
    ctx.font = scale + 'px sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.restore();

  }

  static drawLetter(x,y,size,text,color,ctx) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = size + 'px sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
    ctx.restore();
  }
}
