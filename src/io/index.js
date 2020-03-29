import io from 'socket.io-client';

let socket = null;

const IOeventEmitter = (methods, options) => {
  if (!socket) {
    socket = io('http://localhost:4000', {
      query: {
        username: options.username,
        gameName: options.gameName,
        gameKey: options.gameKey,
      },
    });
  }

  socket.on('newUser', ({ username, ready }) => {
    methods.userReady({ username, ready });
  });

  socket.on('yourBoard', ({ username, board }) => {
    methods.yourBoard({ username, board });
  });

  socket.on('board', ({ board }) => {
    methods.board({ board });
  });

  socket.on('userReady', ({ username, ready }) => {
    methods.userReady({ username, ready });
  });

  socket.on('gameReady', () => {
    socket.emit('startGame');
  });

  socket.on('optionSelected', ({ optionSelected, board }) => {
    methods.gameReady({ optionSelected, board });
  });

  socket.on('incorrectBingo', ({ username }) => {
    methods.incorrectBingo({ username });
  });

  socket.on('usernameHasBingo', ({ username }) => {
    methods.usernameHasBingo({ username });
  });

  return {
    emit: socket.emit,
  };
};

export default IOeventEmitter;
