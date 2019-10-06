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
    this.seatIndex = [0,1,2,3,4,5,6,7].map(a => [Math.random(),a])
      .sort((a,b) => a[0]-b[0])
      .map(a => a[1]);
    this.readyTimeoutID;

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

      socket.emit('addr', this.server.address());

      socket.on('msg', data => {
        console.log(data);
      });

      socket.on('newGame', data => {
        this.game = new Game(data.canvas);
      });

      socket.on('playerJoin', data => {
        if (this.game.players.length === 8) {
          this.socket.emit('returnPlayers', false);
        } else {
          let seat = this.seatIndex[this.game.players.length];
          this.game.addPlayer(new Player(data.name,seat,socket.id));
          this.io.emit('returnPlayers', {players: this.game.players});
        }
      });

      socket.on('playerLeave', data => {
        this.game.removePlayerById(socket.id);
        this.io.emit('returnPlayers', {players: this.game.players});
      });

      socket.on('playerReady', () => {
        clearTimeout(this.readyTimeoutID);
        console.log(`Player with id: ${socket.id} is ready!`);
        this.game.readyPlayer(socket.id);
        this.io.emit('returnPlayers',{players: this.game.players});
        this.readyTimeoutID = setTimeout(() => {
          let allReady = this.game.players.reduce((acc,cur) => {
            if(!acc) return false;
            if (!cur.ready) return false;
            return true;
          },true);
          if (allReady) {
            this.io.emit('msg',{msg:'all players were ready for 3 seconds'});
            // starting game here
            this.io.emit('startGame');
          }
        }, 4000);
      });

      socket.on('playerNotReady', () => {
        clearTimeout(this.readyTimeoutID);
        console.log(`Player with id: ${socket.id} is not ready!`);
        this.game.unreadyPlayer(socket.id);
        this.io.emit('returnPlayers',{players: this.game.players});
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
