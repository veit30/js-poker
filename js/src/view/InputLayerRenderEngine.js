import RenderEngine from './RenderEngine.js';
import TextButton from '../model/TextButton.js';
import IconButton from '../model/IconButton.js';
import {COLOR,SVG_DATA,FONT} from '../model/Utils.js';

export default class InputLayerRenderEngine extends RenderEngine {
  constructor(ctx,inputHandler) {
    super(ctx)

    this.inputHandler = inputHandler;
    this.buttons = []
    this.reset();
    this.state = 'menu';
    this.pointing = false;
    // this.updateButtons();
  }

  createTextButtons() {
    let tb = new TextButton(
      this.ctx.canvas.width * .5,
      this.ctx.canvas.height * .5,
      this.ctx.canvas.width * .05,
      this.ctx.canvas.width * .25,
      COLOR.blue,
      'Start game'
    );

    this.inputHandler.bindOnClickEvent(ev => {
      if (tb.intersect({x:ev.x, y:ev.y})) {
        console.log('Clicked at button');
        this.ctx.canvas.style.cursor = 'auto';
        this.state = 'ingame'
      }
    });

    this.buttons.push(tb);
  }

  createIconButtons() {
    let ib = new IconButton(
      this.ctx.canvas.width - this.ctx.canvas.width * .035,
      this.ctx.canvas.width * .035,
      this.ctx.canvas.width * .05,
      this.ctx.canvas.width * .05,
      COLOR.blue,
      SVG_DATA.gearlock
    );

    this.inputHandler.bindOnClickEvent(ev => {
      if (ib.intersect({x:ev.x,y:ev.y})) {
        console.log('Clicked on gear');
        this.ctx.canvas.style.cursor = 'auto';
      }
    })

    this.buttons.push(ib);
  }

  renderMenu() {
    this.pointing = false;
    this.buttons.forEach(b => {
      if (b.text === 'Start game' && b.clicked) {
        this.state = 'ingame';
      }
    })

    if (this.state === 'menu') {
      this.renderBackground(COLOR.darkGrey);
      this.buttons.forEach(b => {
        if (b.constructor.name === 'TextButton') {
          this.renderTextButton(b);
        } else if (b.constructor.name === 'IconButton') {
          this.renderIconButton(b);
        }
      })
      if (this.pointing) {
        this.ctx.canvas.style.cursor = 'pointer';
      } else {
        this.ctx.canvas.style.cursor = 'auto';
      }
    } else if (this.state === 'ingame') {
      this.clear();
    }
  }

  reset() {
    this.buttons = [];
    this.inputHandler.clickActions = [];
    this.createTextButtons();
    this.createIconButtons();
  }

  renderIconButton(button) {
    let ctx = this.ctx;
    ctx.drawImage(
      button.icon,
      button.x-button.width * .5,
      button.y-button.height * .5,
      button.width,
      button.height
    );
    if (button.intersect(this.inputHandler.cursor)) {
      ctx.drawImage(
        button.icon,
        button.x-button.width * .5,
        button.y-button.height * .5,
        button.width,
        button.height
      );
      this.pointing = true;
    }
  }

  renderTextButton(button) {
    let
      ctx = this.ctx,
      height = button.height,
      width = button.width,
      x = button.x,
      y = button.y,
      radius = height * .5,
      strokeWidth = height * .1,
      fontSize = height * .7;

    ctx.save();
    ctx.font = 'bold ' + fontSize + 'px Kreon-Bold';
    ctx.strokeStyle = COLOR.white;
    ctx.fillStyle = button.color;

    if (button.intersect(this.inputHandler.cursor)) {
      ctx.fillStyle = COLOR.darkerBlue;
      this.pointing = true;
    }

    ctx.lineWidth = strokeWidth;

    ctx.beginPath();
    ctx.arc(
      x - width * .5 + radius,
      y,
      radius, Math.PI * .5, Math.PI * 1.5
    );
    ctx.arc(
      x + width * .5 - radius,
      y,
      radius, Math.PI * 1.5, Math.PI * .5
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    ctx.textAlign = "center";
    ctx.fillStyle = COLOR.white;
    ctx.fillText(button.text, x, y + height * .2);

    ctx.restore();

  }

  renderText(x,y,text) {
    let ctx = this.ctx;
    ctx.save();
    ctx.font = text.format;
    ctx.textAlign = "center";
    ctx.fillStyle = COLOR.black;
    ctx.fillText(text.text, x, y);
  }

}
