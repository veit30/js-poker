class Chip extends GameObject {
  constructor(x,y,rotation,value) {
    super(x,y,rotation);
    this.value = value;
    this.color = colorFromChipValue(this.value);
  }

}
