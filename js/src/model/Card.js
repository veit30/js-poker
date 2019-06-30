import GameObject from './GameObject.js';

export default class Card extends GameObject {
  constructor(x, y, rotation, suit, value) {
    super(x, y, rotation)
    this.suit = suit;
    this.value = value;
    this.isFace = false;

    this.flipAfter = false;
  }

  flip() {
    this.isFace = !this.isFace;
  }

}
