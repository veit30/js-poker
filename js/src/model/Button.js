module.exports = class Button {
  constructor(x,y,width,height,colors,label) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colors = colors;
    this.label = label || Math.random().toString(36).substring(7);;
  }

  intersect({x,y}) {
    if (x >= (this.x - this.width * .5) && x <= (this.x + this.width * .5)) {
      if(y >= (this.y - this.height * .5) && y <= (this.y + this.height * .5)) {
        return true;
      }
    }
    return false;
  }
}
