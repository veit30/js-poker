const {COLOR} = require('./Utils.js');

module.exports = class PlayerBar {
  static render(ctx,x,y,width,height,player) {
    let radius = height * 0.1;
    let fontSize = height * .5;
    ctx.fillStyle = COLOR.lighterGray;
    ctx.beginPath();
    ctx.arc(
      x - width * .5 + radius, y - height * .5,
      radius, Math.PI, Math.PI * 1.5
    );
    ctx.arc(
      x + width * .5 - radius, y - height * .5,
      radius, Math.PI * 1.5, 0
    );
    ctx.arc(
      x + width * .5 - radius, y + height * .5,
      radius, 0, Math.PI * .5
    );
    ctx.arc(
      x - width * .5 + radius, y + height * .5,
      radius, Math.PI * .5, Math.PI
    );
    ctx.closePath();
    ctx.fill();

    ctx.font = fontSize + 'px Kreon-Bold';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    if (player.ready) {
      ctx.fillStyle = COLOR.buttonGreen;
    } else {
      ctx.fillStyle = COLOR.shadedWhite;
    }
    // player name
    ctx.fillText(player.name,x - width * .45,y);
    ctx.fillText(player.positionId,x + width * .38, y);
  }
}
