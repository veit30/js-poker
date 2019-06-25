class Table {

  static render() {
    let ctx = window.poker.table.ctx;
    ctx.fillStyle = COLOR.white;
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    this.renderTable();
    this.renderTableBorder();
    this.renderCCBorder();
  }

  // CC = communitycards
  static renderCCBorder() {

  }

  static renderTable() {
    let ctx = window.poker.table.ctx,
    canvasWidth = ctx.canvas.width,
    canvasHeight = ctx.canvas.height,
    tableHeight = window.poker.table.height, // canvasWidth * .4
    grd,
    halfCanvasWidth = canvasWidth * .5,
    halfCanvasHeight = canvasHeight * .5,
    halfTableHeight = tableHeight * .5;

    ctx.save();
    grd = ctx.createRadialGradient(
      halfCanvasWidth, halfCanvasHeight,
      1, halfCanvasWidth, halfCanvasWidth, tableHeight
    );
    grd.addColorStop(0, COLOR.lightGreen);
    grd.addColorStop(1, COLOR.darkerGreen);
    ctx.fillStyle = grd;
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
      halfCanvasWidth-halfTableHeight,
      halfCanvasHeight-halfTableHeight
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
