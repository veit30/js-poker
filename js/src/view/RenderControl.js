class RenderControl {
  constructor(ctx) {
    this.ctx = ctx;
  }

  static renderChip(chip) {
    let
      ctx = this.ctx,
      x = chip.x,
      y = chip.y,
      radius = ctx.canvas.width * .4 * .03,
      rotation = chip.rotation;

    ctx.save();
    ctx.fillStyle = chip.color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.clip();

    ctx.fillStyle = "#fff";
    for (let i = 0; i < 3; i++) {
      ctx.translate(x, y);
      if (i === 0) {
        ctx.rotate(rotation * Math.PI / 180);
      } else {
        ctx.rotate(60 * Math.PI / 180);
      }
      ctx.translate(-x, -y);
      ctx.fillRect(x - radius * 1.1, y - radius * .1, radius * 2.2, radius * .2);
    }

    ctx.restore();
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = radius * .1;
    ctx.fillStyle = chip.color;
    ctx.beginPath();
    ctx.arc(x, y, radius * .8, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, radius * .6, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  renderCard(card) {

  }

  renderTable() {

  }
}
