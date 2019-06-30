export default class InputHandler {
  constructor() {
    this.pressed = {};

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
    }, false);

    document.addEventListener('keyup', (event) => {
      this.pressed[event.keyCode] = true;
      event.preventDefault();
    }, false);
  }

  askKeyPress(keyCode) {
    if (this.pressed[keyCode] !== undefined) {
      delete this.pressed[keyCode];
      return true;
    }
  }

}
