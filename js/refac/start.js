let poker = new PokerGame();
poker.addCard(
  poker.gameCanvas.width * .6,
  poker.gameCanvas.height * .5,
  0,
  CARDSUIT.HEARTS,
  CARDVALUE.NINE
);
poker.addCard(
  poker.gameCanvas.width * .7,
  poker.gameCanvas.height * .5,
  0,
  CARDSUIT.PIKES,
  CARDVALUE.NINE
);
poker.start();
