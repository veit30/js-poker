const path = require('path');
const PokerGameController = require(path.resolve('js/src/controller/PokerGameController.js'));

let pokerController = new PokerGameController();

pokerController.startGame();
pokerController.start();
