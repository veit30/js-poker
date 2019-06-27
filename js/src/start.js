import PokerGameController from './controller/PokerGameController.js';
import {communityCardPosition} from './model/Utils.js';

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


pokerController.start();
