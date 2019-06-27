import PokerGameController from './controller/PokerGameController.js';
import {communityCardPosition, PLAYER_POSITION,CARD_SUIT,CARD_VALUE} from './model/Utils.js';

let pokerController = new PokerGameController();

for(let i = 0; i < 5; i++) {
  pokerController.addCard(
    communityCardPosition(pokerController.tableCanvas,i).x,
    communityCardPosition(pokerController.tableCanvas,i).y,
    0,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 13) + 2
  );
}

pokerController.addCardWithMoves(
  PLAYER_POSITION[0].cards[0](pokerController.gameCanvas).x,
  PLAYER_POSITION[0].cards[0](pokerController.gameCanvas).y,
  PLAYER_POSITION[0].cardRotation,
  CARD_SUIT.HEARTS,
  CARD_VALUE.KING,
  [
    {
      xd: PLAYER_POSITION[3].cards[0](pokerController.gameCanvas).x,
      yd: PLAYER_POSITION[3].cards[0](pokerController.gameCanvas).y,
      rotation: 180,
      easing: 'ease-in',
      time: 1000,
      delay: 1000,
    },
    {
      xd: PLAYER_POSITION[5].cards[0](pokerController.gameCanvas).x,
      yd: PLAYER_POSITION[5].cards[0](pokerController.gameCanvas).y,
      rotation: 180,
      easing: 'ease-in',
      time: 1000,
      delay: 2000,
    },
  ]
);


pokerController.start();
