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

  it('should return 2 values from default type', () => {
    const types = ['default'];
    const length = 2;
    const result = getBoard(types, length);
    expect(result).to.have.length(2);
  });

  it('should return 49 default type values and one of not found missing type', () => {
    const types = ['default', 'not_found'];
    const length = 50;
    const result = getBoard(types, length);
    expect(result).to.have.length(49);
  });
});
