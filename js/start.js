let f = new PokerGameGui();
f.addCard(CardType.PIKES,CardValue.KING);
f.addChip(20);
// f.addCard(CardType.HEARTS,CardValue.KING);
f.renderIngame();
f.updateGO();
f.renderIngame();
f.start();

setInterval(() => {
  f.renderIngame();
  f.updateGO();
},1000);
