module.exports = class Label {
  constructor(x,y,text,size,color,align,label,stroke) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.size = size;
    this.color = color;
    this.stroke = stroke;
    this.align = ['start','end','left','center','right'].includes(align) ? align : 'center';
    this.label = label || Math.random().toString(36).substring(7);
  }

  render(ctx) {
    ctx.font = this.size + 'px Kreon-Bold';
    ctx.textBaseline = 'middle';
    ctx.textAlign = this.align;
    if (this.stroke) {
      ctx.lineWidth = this.size * .2;
      ctx.strokeStyle = '#000000';
      ctx.strokeText(this.text,this.x,this.y);
    }
    ctx.fillStyle = this.color;
    ctx.fillText(this.text,this.x,this.y);
  }

  intersect(a) {
    return false
  }
}
