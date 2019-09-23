module.exports = class Label {
  constructor(x,y,text,size,color,align,label) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.align = align || 'center';
    this.text = text;
    this.label = label;
  }

  render(ctx) {
    ctx.font = this.size + 'px Kreon-Bold';
    ctx.textBaseline = 'middle';
    ctx.textAlign = this.align;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text,this.x,this.y);
  }

  intersect(a) {
    return false
  }
}
