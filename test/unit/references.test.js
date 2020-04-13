const expect = require('expect.js');
const getBoard = require('../../references');

describe('getBoard methods tests', () => {
  it('should not return any value with no types', () => {
    const types = [];
    const length = 2;
    const result = getBoard(types, length);
    expect(result).to.eql([]);
    expect(result).to.have.length(0);
  });

  it('should return 2 values from cars type', () => {
    const types = ['cars'];
    const length = 2;
    const result = getBoard(types, length);
    expect(result).to.have.length(2);
  });

  it('should return 49 cars type values and one of not found missing type', () => {
    const types = ['cars', 'not_found'];
    const length = 50;
    const result = getBoard(types, length);
    expect(result).to.have.length(49);
  });
});
