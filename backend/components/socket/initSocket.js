const socketIO = require('socket.io');

module.exports = () => {
  const start = async ({ server: { http }, logger }) => {
    const io = socketIO(http);
    logger.info('create io instance');

    const draw = (socket, room) => () => {
      const randomNumber = Math.ceil(Math.random() * 10);
      console.log('event');
      socket.to(room).emit('selected', { number: randomNumber });
    };

    let interval;
    io.on('connection', socket => {
      socket.emit('userConnected', { userId: socket.id });
      socket.join(socket.handshake.query.game, () => {
        io.to('cool').emit('newUser'); // broadcast to everyone in the room
      });

      socket.on('play', () => {
        console.log('Play clicked');
        io.to('cool').emit('startGame');
      });

      socket.on('draw', () => {
        console.log('Draw');
        if (!interval) {
          interval = setInterval(draw(io, 'cool'), 5000);
        }
      });

      socket.on('stop', () => {
        clearInterval(interval);
      });
    });

    return io;
  };

  return { start };
};
