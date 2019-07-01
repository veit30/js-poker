import Button from './Button.js';
import {convertToImg} from './Utils.js';

export default class IconButton extends Button {
  constructor(x,y,height,width,color,icon) {
    super(x,y,height,width,color)
    this.icon = convertToImg(icon);
  }



}
