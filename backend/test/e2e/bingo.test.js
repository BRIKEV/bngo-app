const expect = require('expect.js');
const supertest = require('supertest');
const io = require('socket.io-client');
const system = require('../../system');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

describe('API endpoint', () => {
  let request;
  let socket;
  const sys = system();

  let storeSystem;
  before(async () => {
    const { server: { app }, store } = await sys.start();
    request = supertest(app);
    storeSystem = store;
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

  it(`return error when try to acces a wrong room
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
        socket = io('http://localhost:4000', {
          query: {
            username,
            gameName,
            gameKey,
          },
        });

        socket.on('errorAccess', msg => {
          const { message, type } = msg;
          expect(message).to.eql('User not found in this game');
          expect(type).to.eql('not_found');
          cb();
        });
      });
  });

  describe('test after user connected', () => {
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
        });
    });

    afterEach(async () => {
      socket.close();
    });

    it(`create a game and join one user and receive for all the room newUser event
      whit information of the user that joins the room and if he is active
    `, cb => {
      // connect client
      socket = io('http://localhost:4000', {
        query: {
          username,
          gameName,
          gameKey,
        },
      });

      socket.on('newUser', msg => {
        const { username: usernameMsg, ready } = msg;
        expect(usernameMsg).to.eql(username);
        expect(ready).to.eql(false);
        cb();
      });
    });

    it(`create a game and join one user and receive for the user channel yourBoard event
      whit information of the user's board and username
    `, cb => {
      // connect client
      socket = io('http://localhost:4000', {
        query: {
          username,
          gameName,
          gameKey,
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
      socket = io('http://localhost:4000', {
        query: {
          username,
          gameName,
          gameKey,
        },
      });

      socket.emit('readyToStart');

      socket.on('userReady', msg => {
        expect(msg.username).to.eql(username);
        expect(msg.ready).to.eql(true);
        cb();
      });
    });

    it(`create a game and join one user and emit one event readyToStart to receive 
      in the client gameReady event as all the users are ready to start
    `, cb => {
      // connect client
      socket = io('http://localhost:4000', {
        query: {
          username,
          gameName,
          gameKey,
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
      socket = io('http://localhost:4000', {
        query: {
          username,
          gameName,
          gameKey,
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
      socket = io('http://localhost:4000', {
        query: {
          username,
          gameName,
          gameKey,
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
  });
});
