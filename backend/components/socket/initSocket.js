const socketIO = require('socket.io');

module.exports = () => {
  const start = async ({ server: { http }, logger, controller }) => {
    const io = socketIO(http);
    logger.info('create io instance');

    // const draw = (socket, room) => () => {
    //   const randomNumber = Math.ceil(Math.random() * 10);
    //   console.log('event');
    //   socket.to(room).emit('selected', { number: randomNumber });
    // };

    // let interval;

    io.on('connection', socket => {
      // socket.emit('userConnected', { userId: socket.id });
      const { username, gameName, gameKey } = socket.handshake.query;
      logger.info(`New socket connection of user: ${username} game ${gameName} with ${gameKey}`);
      controller.getUserInfo({ key: gameKey, gameName, username })
        .then(userInfo => {
          logger.info(`User: ${username} join to game ${gameName} in the DB`);
          const { board, ready } = userInfo;
          socket.join(gameName, () => {
            logger.info(`User: ${username} join to game ${gameName} to the room`);
            io.to(gameName).emit('newUser', { username, ready });
            io.to(socket.id).emit('yourBoard', { username, board });
          });
        })
        .catch(error => {
          logger.error(`Error in socket ${error}`);
          socket.to(socket.id).emit('errorAccess');
        });

      // readyToStart
      socket.on('readyToStart', () => {
        controller.readyToStart({ key: gameKey, username })
          .then(({ gameReady, board }) => {
            io.to(gameName).emit('newUser', { username, ready: true });
            if (gameReady) {
              io.to(gameName).emit('gameReady', { board });
            }
          });
      });
    });

    return io;
  };

  return { start };
};
