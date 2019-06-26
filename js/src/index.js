import PokerGameController from './controller/PokerGameController';
import {EASINGFUNCTION} from './model/Utils.js';


let poker = new PokerGameController();

for(let i = 0; i < 5; i++) {
  poker.addCard(
    communitycardPosition(window.poker,i).x,
    communitycardPosition(window.poker,i).y,
    0,
    Math.floor(Math.random() * 4) + 1,
    Math.floor(Math.random() * 13) + 2
  );
}


poker.start();
