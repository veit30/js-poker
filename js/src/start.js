let poker = new PokerGame();

for(let i = 0; i < 5; i++) {
  poker.addCard(
    COMMUNITYCARDPOSITION(window.poker,i).x,
    COMMUNITYCARDPOSITION(window.poker,i).y,
    0,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 13) + 2
  );
}


poker.start();
