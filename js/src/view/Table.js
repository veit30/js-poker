class Table {

  static render() {
    this.resetTableCanvas();
    this.renderTable();
    this.renderTableBorder();
    this.renderCCBorder();
  }

  static resetTableCanvas() {
    let ctx = window.poker.table.ctx;
    ctx.fillStyle = COLOR.white;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
  // CC = communitycards
  static renderCCBorder() {
    let
      ctx = window.poker.table.ctx,
      halfCanvasWidth = window.poker.table.ctx.canvas.width * 0.5,
      halfCanvasHeight = window.poker.table.ctx.canvas.height * 0.5,
      height = window.poker.table.height * .13,
      width = height * 5.2,
      radius = width * .06,
      halfWidth = width * .5,
      halfHeight = height * .5,
      strokeWidth = width * .01,
      rotation = window.poker.table.rotation;

    ctx.save();

    ctx.translate(halfCanvasWidth, halfCanvasHeight);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-halfCanvasWidth, -halfCanvasHeight);

    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = strokeWidth;
    ctx.beginPath();
    ctx.arc(
      (halfCanvasWidth - halfWidth) + radius, halfCanvasHeight - halfHeight,
      radius, Math.PI, Math.PI * 1.5
    );
    ctx.arc(
      (halfCanvasWidth + halfWidth) - radius, (halfCanvasHeight - halfHeight),
      radius, Math.PI * 1.5, 0
    );
    ctx.arc(
      (halfCanvasWidth + halfWidth) - radius, (halfCanvasHeight + halfHeight),
      radius, 0, Math.PI * .5
    );
    ctx.arc(
      (halfCanvasWidth - halfWidth) + radius, (halfCanvasHeight + halfHeight),
      radius, Math.PI * .5, Math.PI
    );
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  static renderTable() {
    let
      grd,
      ctx = window.poker.table.ctx,
      canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height,
      tableHeight = window.poker.table.height,
      halfCanvasWidth = canvasWidth * .5,
      halfCanvasHeight = canvasHeight * .5,
      halfTableHeight = tableHeight * .5;

    ctx.save();
    grd = ctx.createRadialGradient(
      halfCanvasWidth, canvasHeight * .62,
      1, halfCanvasWidth, canvasHeight * .62, tableHeight
    );
    grd.addColorStop(0, COLOR.lightGreen);
    grd.addColorStop(1, COLOR.darkerGreen);
    ctx.fillStyle = grd;
    // ctx.fillStyle = COLOR.lightGreen;
    ctx.beginPath();
    ctx.moveTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.lineTo(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth + halfTableHeight, halfCanvasHeight,
      halfTableHeight, Math.PI * 1.5, Math.PI * .5
    );
    ctx.lineTo(halfCanvasWidth - halfTableHeight,
      halfCanvasHeight + halfTableHeight
    );
    ctx.arc(halfCanvasWidth - halfTableHeight,
      halfCanvasHeight, halfTableHeight, Math.PI * .5, Math.PI * 1.5
    );
    ctx.closePath();
    ctx.transform(1, 0, 0, 0.7, 0, tableHeight * .25);
    ctx.fill();
    ctx.restore();
  }

  static renderTableBorder() {
    let ctx = window.poker.table.ctx,
      canvasWidth = ctx.canvas.width,
      canvasHeight = ctx.canvas.height,
      tableHeight = window.poker.table.height,
      halfTableHeight = tableHeight * .5,
      halfCanvasWidth = canvasWidth * .5,
      halfCanvasHeight = canvasHeight * .5;

    ctx.strokeStyle = COLOR.brown;
    ctx.lineWidth = tableHeight * .1;
    ctx.beginPath();
    ctx.moveTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.lineTo(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth + halfTableHeight, halfCanvasHeight,
      halfTableHeight, Math.PI * 1.5, Math.PI * .5
    );
    ctx.lineTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight + halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth - halfTableHeight, halfCanvasHeight,
      halfTableHeight, Math.PI * .5, Math.PI * 1.5
    );
    ctx.stroke();
    ctx.strokeStyle = COLOR.brown2;
    ctx.lineWidth = tableHeight * .02;
    ctx.beginPath();
    ctx.moveTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.lineTo(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight - halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth + halfTableHeight,
      halfCanvasHeight, halfTableHeight, Math.PI * 1.5, Math.PI * .5
    );
    ctx.lineTo(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight + halfTableHeight
    );
    ctx.arc(
      halfCanvasWidth - halfTableHeight,
      halfCanvasHeight, halfTableHeight, Math.PI * .5, Math.PI * 1.5
    );
    ctx.stroke();
  }

}
