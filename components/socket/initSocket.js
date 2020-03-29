const socketIO = require('socket.io');

module.exports = () => {
  const start = async ({ server: { http }, logger, controller, config }) => {
    const io = socketIO(http);
    logger.info('create io instance');

    const draw = (socket, room, gameKey) => async () => {
      const { optionSelected, updateGame } = await controller.playTurn({ key: gameKey });
      socket.to(room).emit('optionSelected', { optionSelected, board: updateGame.board });
    };

    const intervals = {};

    io.on('connection', socket => {
      // socket.emit('userConnected', { userId: socket.id });
      const { username, gameName, gameKey } = socket.handshake.query;
      logger.info(`New socket connection of user: ${username} game ${gameName} with ${gameKey}`);
      const intervalIdentifier = `${gameName}-${gameKey}`;
      controller.getUserInfo({ key: gameKey, gameName, username })
        .then(userInfo => {
          logger.info(`User: ${username} join to game ${gameName} in the DB`);
          const { board, ready, mainBoard } = userInfo;
          socket.join(gameName, () => {
            logger.info(`User: ${username} join to game ${gameName} to the room`);
            io.to(gameName).emit('newUser', { username, ready });
            io.to(gameName).emit('board', { board: mainBoard });
            io.to(socket.id).emit('yourBoard', { username, board });
          });
        })
        .catch(error => {
          logger.error(`Error in getUserInfo ${error}`);
          io.to(socket.id).emit('errorAccess', {
            message: error.message,
            type: error.type,
          });
        });

      // readyToStart
      socket.on('readyToStart', () => {
        controller.readyToStart({ key: gameKey, username })
          .then(({ gameReady, board }) => {
            logger.info(`User: ${username} ready to play`);
            io.to(gameName).emit('userReady', { username, ready: true });
            if (gameReady) {
              logger.info('Game is ready to start');
              io.to(socket.id).emit('gameReady', { board });
            }
          })
          .catch(error => {
            logger.error(`Error in readyToStart event ${error}`);
            io.to(socket.id).emit('errorStart', {
              message: error.message,
              type: error.type,
            });
          });
      });

      socket.on('startGame', () => {
        if (!intervals[intervalIdentifier]) {
          intervals[intervalIdentifier] = setInterval(draw(io, gameName, gameKey), config.interval);
        }
      });

      socket.on('bingo', () => {
        controller.hasBingo({ key: gameKey, username, gameName })
          .then(hasBingo => {
            if (hasBingo) {
              io.to(gameName).emit('usernameHasBingo', { username });
              clearInterval(intervals[intervalIdentifier]);
            }
            io.to(socket.id).emit('incorrectBingo', { username });
          })
          .catch(error => {
            logger.error(`Error in bingo event ${error}`);
            io.to(socket.id).emit('errorBingo', {
              message: error.message,
              type: error.type,
            });
          });
      });
    });

    return io;
  };

  return { start };
};
