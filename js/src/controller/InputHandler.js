module.exports = class InputHandler {
  constructor() {
    this.pressed = {};
    this.keyBuffer = [];
    this.cursor = {
      x: 0,
      y: 0
    };
    this.click = {
      x:0,
      y:0
    }

    this.mousedown = false;

    this.lastAsk = Date.now();

    this.clickActions = {};

    this.dragActions = {};

    window.addEventListener('keydown', event => {
      event.preventDefault();
      this.keyBuffer.push({
        keyCode: event.keyCode,
        key: event.key,
        time: event.timeStamp
      });
      // clear buffer after 50ms
      if (Date.now()-this.lastAsk > 50) {
        this.keyBuffer = [];
      }
      // if (this.keyBuffer.length > 10) {
      //   this.keyBuffer.pop();
      // }
    }, false);

    window.addEventListener('mousemove', event => {
      this.cursor.x = event.clientX;
      this.cursor.y = event.clientY;
      // some more stuff for sliders
      if (this.mousedown) {
        Object.keys(this.dragActions).forEach(key => {
          try {
            this.dragActions[key]({x: event.clientX, y: event.clientY});
          } catch (error) {
            // action was deleted
          }
        });
      }
    });

    window.addEventListener('click', event => {
      Object.keys(this.clickActions).forEach(key => {
        try {
          this.clickActions[key]({x: event.clientX, y: event.clientY});
        } catch (error) {
          // action was deleted
        }
      });
    });

    window.addEventListener('mousedown', event => {
      this.mousedown = true;
      console.log('mousedown');
    });

    window.addEventListener('mouseup', event => {
      this.mousedown = false;
      console.log('mouseup');
    });
  }

  getPressedKey() {
    this.lastAsk = Date.now();
    if (this.keyBuffer.length === 0) {
      return undefined;
    } else {
      return this.keyBuffer.shift();
    }
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

  askAnyKeyPress() {
    Object.keys(this.pressed).forEach(keyCode => {

    })
  }

  bindOnClickEvent(fn, name) {
    this.clickActions[name] = fn;
  }

  deleteClickEventBinding(name) {
    delete this.clickActions[name];
  }

  bindOnDrag(fn, name) {
    this.dragActions[name] = fn;
  }

  deleteDragEvent(name) {
    delete this.dragActions[name];
  }

}
