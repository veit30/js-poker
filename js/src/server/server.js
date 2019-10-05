const server = require('http').createServer();
const io = require('socket.io')(server);

let port = 8080;
let host = 'localhost';
let game = {
  players: [],
};

server.listen(port, host, () => {
  console.log(`listening on ${server.address().address}:${server.address().port}`);
}).on('error', err => {
  console.log(err);
});

io.on('connection', socket => {
  console.log('user connected');
  console.log(socket.id);
  socket.emit('msg', {msg:"msg from server"});


  socket.on('msg', data => {
    console.log(data);
  });

  io.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('msg', data => {
  console.log(data);
});


io.on('newGame', data => {
  game = new Game(data.canvas);
  socket.emit('msg',{msg:'new Game created'});
});

io.on('playerJoin', data => {
  let name = data.name;
  console.log("asjhd");
  game.players.push(name);
  io.emit('postPlayers', {players: game.players});
});
