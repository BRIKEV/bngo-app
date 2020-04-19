import io from 'socket.io-client';

let socket = null;

const IOeventEmitter = (methods, options) => {
  if (!socket) {
    socket = io('/', {
      query: {
        accessKey: options.accessKey,
      },
    });
  }

  socket.on('errorAccess', ({ message, type }) => {
    methods.errorAccess({ message, type });
  });

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
    methods.gameReady();
  });

  socket.on('optionSelected', ({ optionSelected, board }) => {
    methods.optionSelected({ optionSelected, board });
    setTimeout(() => {
      methods.callbackAfterSelected();
    }, options.delay);
  });

  socket.on('incorrectBingo', ({ username }) => {
    methods.incorrectBingo({ username });
  });

  socket.on('usernameHasBingo', ({ username }) => {
    methods.usernameHasBingo({ username });
  });

  socket.on('usersList', ({ users }) => {
    methods.usersList({ users });
  });

  socket.on('userLeaves', ({ username }) => {
    methods.userLeaves({ username });
  });

  socket.on('message', ({ title, message }) => {
    methods.userMessage({ title, message });
  });
};

export const emit = (...args) => socket.emit(...args);
export const disconnect = () => socket.close();

export default IOeventEmitter;
