const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../../system');
const socketMock = require('../mocks/socketMock');
const jwt = require('../../lib/token');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

describe('API endpoint', () => {
  let request;
  let sys = system();
  sys = sys.set('io', socketMock()).dependsOn();

  let storeSystem;
  let tokenMethods;
  before(async () => {
    const { server: { app }, store, config } = await sys.start();
    tokenMethods = jwt(config.routes.api.tokenSecret);
    request = supertest(app);
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

    it('Should return CONFLICT when a game was created', () => request
      .post('/api/v1/game')
      .send({
        gameName,
        gameKey,
      })
      .then(() => request
        .post('/api/v1/game')
        .send({
          gameName,
          gameKey,
        })
        .expect(409))
      .then(({ body }) => {
        expect(body.message).to.eql('This game was already created');
      }));
  });

  describe('Join game endpoint', () => {
    it('Should return BAD_REQUEST when required params are not sent', () => request
      .post('/api/v1/game/join')
      .send({})
      .expect(400));

    it('Should return 400 when we do not send the right params', () => request
      .post('/api/v1/game/join')
      .send({
        username,
      })
      .expect(400));

    it('Should return 404 when we do not send the right key', () => request
      .post('/api/v1/game/join')
      .send({
        username,
        gameKey: 'not found Key',
        gameName,
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
              gameName,
            })
            .expect(200)
        ))
        .then(async ({ body }) => {
          expect(body).to.have.property('accessKey');
          const info = await tokenMethods.verifyToken(body.accessKey);
          expect(info.username).to.eql(username);
          expect(info.gameName).to.eql(gameName);
          expect(info.gameKey).to.eql(gameKey);
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
              gameName,
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
              gameName,
            })
            .expect(400)
        ))
    ));
  });
});
