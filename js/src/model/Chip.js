const GameObject = require('./GameObject.js');
const {COLOR} = require('./Utils.js');

module.exports = class Chip extends GameObject {
  constructor(x,y,rotation,value) {
    super(x,y,rotation);
    this.value = value;
    this.color = {
      100: COLOR.chipPurple,
      50: COLOR.chipBlue,
      25: COLOR.chipGreen,
      10: COLOR.chipGrey,
      5: COLOR.chipRed
    }[value];
  }

  static toChip(obj) {
    let chip = new Chip();
    Object.assign(chip,obj);
    return chip;
  }

}
