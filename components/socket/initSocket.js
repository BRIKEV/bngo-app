const socketIO = require('socket.io');

const jwt = require('../../lib/token');

module.exports = () => {
  const start = async ({ server: { http }, logger, controller, config }) => {
    const { verifyToken } = jwt(config.tokenSecret, config.tokenOptions);
    const io = socketIO(http);
    logger.info('create io instance');

    const draw = (socket, room, gameKey, endGame) => async () => {
      const { optionSelected, updateGame, gameFinished } = await controller.playTurn({
        key: gameKey,
      });
      socket.to(room).emit('optionSelected', { optionSelected, board: updateGame.board });
      if (gameFinished) {
        endGame();
      }
    };

    const intervals = {};

    io.on('connection', socket => {
      // socket.emit('userConnected', { userId: socket.id });
      let intervalIdentifier;
      let username;
      let gameName;
      let gameKey;
      const { accessKey } = socket.handshake.query;
      verifyToken(accessKey)
        .then(userInfo => {
          username = userInfo.username;
          gameName = userInfo.gameName;
          gameKey = userInfo.gameKey;
          logger.info(`New socket connection of user: ${username} game ${gameName} with ${gameKey}`);
          intervalIdentifier = `${gameName}-${gameKey}`;
          return controller.getUserInfo({ key: gameKey, gameName, username });
        }).then(userInfo => {
          logger.info(`User: ${username} join to game ${gameName} in the DB`);
          const { board, ready, mainBoard } = userInfo;
          socket.join(gameName, () => {
            logger.info(`User: ${username} join to game ${gameName} to the room`);
            io.to(gameName).emit('board', { board: mainBoard });
            // user events
            io.to(socket.id).emit('newUser', { username, ready });
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
          intervals[intervalIdentifier] = setInterval(
            draw(io, gameName, gameKey, () => {
              logger.info('Game over all images were displayed');
              clearInterval(intervals[intervalIdentifier]);
              io.to(gameName).emit('gameEnd');
            }), config.interval,
          );
        }
      });

      socket.on('bingo', () => {
        controller.hasBingo({ key: gameKey, username, gameName })
          .then(async hasBingo => {
            if (hasBingo) {
              await api.finishGame({ key: gameKey, gameName });
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
