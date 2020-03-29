const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../../system');
const socketMock = require('../mocks/socketMock');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

describe.skip('API endpoint', () => {
  let request;
  let sys = system();
  sys = sys.set('io', socketMock()).dependsOn();

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

  describe('Create game endpoint', () => {
    it('Should return BAD_REQUEST when required params are not sent', () => request
      .post('/api/v1/game')
      .send({})
      .expect(400));

    it('Should return OK when we send the right params', () => request
      .post('/api/v1/game')
      .send({
        gameName,
        gameKey,
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.eql({ success: true });
        const games = storeSystem.getGames();
        expect(games).to.have.length(1);
      }));
  });

  describe('Join game endpoint', () => {
    it('Should return BAD_REQUEST when required params are not sent', () => request
      .post('/api/v1/game/join')
      .send({})
      .expect(400));

    it('Should return OK when we send the right params', () => request
      .post('/api/v1/game/join')
      .send({
        username,
      })
      .expect(400));

    it('Should return OK when we send the right params', () => request
      .post('/api/v1/game/join')
      .send({
        username,
        gameKey: 'not found Key',
      })
      .expect(404));

    it('should join to a game previosly created', () => (
      request
        .post('/api/v1/game')
        .send({
          gameName,
          gameKey,
        })
        .expect(200)
        .then(() => (
          request
            .post('/api/v1/game/join')
            .send({
              username,
              gameKey,
            })
            .expect(200)
        ))
        .then(({ body }) => {
          expect(body).to.eql({ success: true });
          const games = storeSystem.getGames();
          expect(games).to.have.length(1);
          expect(games[0].users).to.have.length(1);
        })
    ));

    it('should return error when user was already added', () => (
      request
        .post('/api/v1/game')
        .send({
          gameName,
          gameKey,
        })
        .expect(200)
        .then(() => (
          request
            .post('/api/v1/game/join')
            .send({
              username,
              gameKey,
            })
            .expect(200)
        ))
        .then(() => (
          request
            .post('/api/v1/game/join')
            .send({
              username,
              gameKey,
            })
            .expect(400)
        ))
    ));
  });
});
