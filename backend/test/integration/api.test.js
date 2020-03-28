const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../../system');
const socketMock = require('../mocks/socketMock');

const gameName = 'entourage';
const gameKey = 'pizza';

describe('API endpoint', () => {
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
    }));
});
