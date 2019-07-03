module.exports = class Button {
  constructor(x,y,height,width,color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
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
