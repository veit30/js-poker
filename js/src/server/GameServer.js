const http = require('http');
const sio = require('socket.io');
const Game = require('../model/Game.js');
const Player = require('../model/Player.js');

module.exports = class GameServer {
  constructor(address) {
    this.address = address;
    this.server;
    this.game;
    this.io;


  }

  async init() {
    let port = this.address.split(':')[1];
    let host = this.address.split(':')[0];
    this.server = http.createServer();
    this.io = sio(this.server);
    this.addHandlers();
    let p = await new Promise((resolve,reject) => {
      this.server.listen(port, host, () => {
        console.log(`listening on ${this.server.address().address}:${this.server.address().port}`);
        resolve(true);
      }).on('error', err => {
        console.log(err);
        resolve(false);
      });
    });
    return p;
  }

  kill() {
    this.server.close();
  }

  addHandlers() {
    this.io.on('connection', socket => {
      console.log('user connected');
      console.log(socket.id);

      socket.on('msg', data => {
        console.log(data);
      });

      socket.on('newGame', data => {
        this.game = new Game(data.canvas);
      });

      socket.on('playerJoin', data => {
        this.game.addPlayer(new Player(data.name,2,socket.id));
        socket.emit('postPlayers', {players: this.game.players});
      });

      socket.on('msg', data => {
        console.log(data);
      });

      socket.on('msg', data => {
        console.log(data);
      });

      socket.on('msg', data => {
        console.log(data);
      });



      this.io.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }
}
