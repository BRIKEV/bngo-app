const expect = require('expect.js');
const supertest = require('supertest');
const io = require('socket.io-client');
const system = require('../../system');

const gameName = 'entourage';
const gameKey = 'pizza';

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
    socket.close();
    await storeSystem.removeGames();
  });

  after(async () => {
    await sys.stop();
  });

  it(`create a game and join one user and receive for all the room newUser event
    whit information of the user that joins the room and if he is active
  `, cb => {
    const username = 'kj';
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

        socket.on('newUser', msg => {
          const { username: usernameMsg, ready } = msg;
          expect(usernameMsg).to.eql(username);
          expect(ready).to.eql(false);
          cb();
        });
      });
  });

  it(`create a game and join one user and receive for the user channel yourBoard event
    whit information of the user's board and username
  `, cb => {
    const username = 'kj';
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

        socket.on('yourBoard', msg => {
          const { username: usernameMsg, board } = msg;
          expect(usernameMsg).to.eql(username);
          expect(board).to.have.length(16);
          cb();
        });
      });
  });
});
