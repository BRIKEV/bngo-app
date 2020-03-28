const expect = require('expect.js');
const supertest = require('supertest');
const system = require('../system');

describe.skip('Service Tests', () => {
  let request;
  const sys = system();

  before(async () => {
    const { server: { app } } = await sys.start();
    request = supertest(app);
  });

  after(() => sys.stop());

  it('returns manifest', () => request
    .get('/__/manifest')
    .expect(200)
    .then(response => {
      expect(response.headers['content-type']).to.equal('application/json; charset=utf-8');
    }));
});
