export default class InputHandler {
  constructor() {
    this.pressed = {};
    this.cursor = {
      x: 0,
      y: 0
    };
    this.click = {
      x:0,
      y:0
    }

    this.clickActions = [];

    window.addEventListener('keydown', event => {
      event.preventDefault();
    }, false);

    window.addEventListener('keyup', event => {
      this.pressed[event.keyCode] = true;
      event.preventDefault();
    }, false);

    window.addEventListener('mousemove', event => {
      this.cursor.x = event.clientX;
      this.cursor.y = event.clientY;
    })

    window.addEventListener('click', event => {
      // this.click.x = event.clientX;
      // this.click.y = event.clientY;
      this.clickActions.forEach(a => {
        a({x: event.clientX, y: event.clientY});
      });
    })
  }

  resetClick() {
    this.click = {x:-1,y:-1};
  }

  askKeyPress(keyCode) {
    if (this.pressed[keyCode] !== undefined) {
      delete this.pressed[keyCode];
      return true;
    }
  }

  bindOnClickEvent(fn) {
    this.clickActions.push(fn);
  }

}
