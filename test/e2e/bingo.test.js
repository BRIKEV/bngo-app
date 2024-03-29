const expect = require('expect.js');
const supertest = require('supertest');
const io = require('socket.io-client');
const system = require('../../system');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

const CLIENT_CONNECTION = 'http://localhost:5000';

describe('Bingo e2e tests', () => {
  let request;
  let socket;
  const sys = system();

  let storeSystem;
  let controllerSystem;
  before(async () => {
    const { server: { app }, store, config, controller } = await sys.start();
    request = supertest(app);
    controllerSystem = controller;
    storeSystem = store[config.controller.storeMode];
  });

  beforeEach(async () => {
    await storeSystem.removeGames();
  });

  afterEach(async () => {
    await storeSystem.removeGames();
  });

  after(async () => {
    await sys.stop();
  });

  it(`return error when try to acces a room with malformed token
    and return event errorAccess with type and message values
  `, cb => {
    request
      .post('/api/v1/game')
      .send({
        gameName,
        gameKey,
      })
      .expect(200)
      .then(() => {
        // connect client
        socket = io(CLIENT_CONNECTION, {
          query: { accessKey: 'not_valid' },
        });

        socket.on('errorAccess', msg => {
          const { message, type } = msg;
          expect(message).to.eql('jwt malformed');
          expect(type).to.eql('forbidden');
          cb();
          socket.close();
        });
      });
  });

  describe('test after user connected', () => {
    let accessKey;
    beforeEach(async () => {
      await request
        .post('/api/v1/game')
        .send({
          gameName,
          gameKey,
        });
      await request
        .post('/api/v1/game/join')
        .send({
          username,
          gameKey,
          gameName,
        })
        .then(({ body }) => {
          accessKey = body.accessKey;
        });
    });

    afterEach(async () => {
      socket.close();
    });

    it(`create a game and join one user and receive for all the room newUser event
      whit information of the user that joins the room and if he is active
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.on('newUser', msg => {
        const { username: usernameMsg, ready, host } = msg;
        expect(usernameMsg).to.eql(username);
        expect(ready).to.eql(false);
        expect(msg).to.eql({
          username,
          ready: false,
          host: true,
        });
        // first user must be the host of the game
        expect(host).to.eql(true);
        cb();
      });
    });

    it(`create a game and join one user and receive playAgain event
      then this should join a user to the game and emit event errorPlayAgain
      as user already joined
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('playAgain');

      socket.on('errorPlayAgain', () => {
        cb();
      });
    });

    it(`create a game and join one user and receive playAgain event
      then this should join a user to the game and emit event readyToPlayAgain
      `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      controllerSystem
        .finishGame({ key: gameKey, gameName })
        .then(() => {
          socket.emit('playAgain');
          socket.on('readyToPlayAgain', () => {
            cb();
          });
        });
    });

    it(`create a game and join one user and receive for all the room board event
      whit information of the room's board
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.on('board', msg => {
        const { board } = msg;
        expect(board).to.have.length(49);
        cb();
      });
    });

    it(`create a game and join one user and receive for the user channel yourBoard event
      whit information of the user's board and username
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.on('yourBoard', msg => {
        const { username: usernameMsg, board } = msg;
        expect(usernameMsg).to.eql(username);
        expect(board).to.have.length(16);
        cb();
      });
    });

    it(`create a game and join one user and emit one event readyToStart to receive 
      in the client userReady event
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('readyToStart');

      socket.on('userReady', msg => {
        expect(msg.username).to.eql(username);
        expect(msg.ready).to.eql(true);
        cb();
      });
    });

    it('create a game and join one user and receive userLists with user not ready', cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.on('usersList', msg => {
        expect(msg.users[0].ready).to.eql(false);
        expect(msg.users).to.have.length(1);
        cb();
      });
    });

    it(`create a game and join one user and emit one event readyToStart to receive 
      in the client usersList with all the users in the game and their status
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('readyToStart');
      socket.on('usersList', msg => {
        if (msg.users[0].ready) {
          expect(msg.users[0].ready).to.eql(true);
          expect(msg.users).to.have.length(1);
          cb();
        }
      });
    });

    it(`create a game and join one user and emit one event readyToStart 
      and try to access gives error
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('readyToStart');
      socket.on('userReady', () => {
        request
          .post('/api/v1/game/join')
          .send({
            username: 'different',
            gameKey,
            gameName,
          })
          .expect(409)
          .then(() => cb())
          .catch(() => cb());
      });
    });

    it(`create a game and join one user and emit one event readyToStart to receive 
      in the client gameReady event as all the users are ready to start
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('readyToStart');

      socket.on('gameReady', msg => {
        expect(msg.board).to.have.length(16);
        cb();
      });
    });

    it(`create a game and join one user and emit one event startGame to receive 
      in the client optionSelected event after 1 second with 
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('readyToStart');

      socket.on('gameReady', () => {
        socket.emit('startGame');
      });

      socket.on('optionSelected', msg => {
        const { optionSelected, board } = msg;
        expect(optionSelected).to.only.have.keys([
          'id',
          'name',
          'image',
          'selected',
        ]);
        expect(board).to.have.length(49);
        const selectedBoardItems = board.filter(({ selected }) => selected);
        expect(selectedBoardItems).to.have.length(1);
        cb();
      });
    });

    it(`create a game and join one user and emit one event bingo to receive 
      in the client incorrectBingo with username in the payload
    `, cb => {
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('readyToStart');

      socket.on('gameReady', () => {
        socket.emit('startGame');
      });

      socket.on('optionSelected', () => {
        socket.emit('bingo');
      });

      socket.on('incorrectBingo', msg => {
        expect(msg.username).to.eql(username);
        cb();
      });
    });

    it(`create a game and join one user and emit one event message to receive 
      in the client message with the message
    `, cb => {
      const message = 'This is a message';
      // connect client
      socket = io(CLIENT_CONNECTION, {
        query: {
          accessKey,
        },
      });

      socket.emit('message', {
        message,
      });

      socket.on('message', msg => {
        expect(msg.title).to.eql(username);
        expect(msg.message).to.eql(message);
        cb();
      });
    });

    describe('leaveUser events', () => {
      it(`create a game and join one user and emit one event leaveUser to one message
        userLeaves with username who leaves
      `, cb => {
        // connect client
        socket = io(CLIENT_CONNECTION, {
          query: {
            accessKey,
          },
        });

        socket.emit('leaveUser');

        socket.on('userLeaves', msg => {
          expect(msg.username).to.eql(username);
          cb();
        });
      });

      it(`create a game and join one user and emit one event leaveUser to one message
          usersList with users list updated
        `, cb => {
        // connect client
        socket = io(CLIENT_CONNECTION, {
          query: {
            accessKey,
          },
        });

        socket.emit('leaveUser');

        socket.on('usersList', msg => {
          // This should skip first message
          if (msg.users.length !== 0) return;
          expect(msg.users).to.eql([]);
          cb();
        });
      });

      it(`create a game and join one user and emit one event removeUser to remove one
        user in the game list
        `, cb => {
        // connect client
        socket = io(CLIENT_CONNECTION, {
          query: {
            accessKey,
          },
        });

        socket.emit('removeUser', {
          userToRemove: username,
        });

        socket.on('usersList', msg => {
          // This means all users were removed and removeUser event works
          if (msg.users.length === 0) {
            cb();
          }
        });
      });
    });
  });
});
