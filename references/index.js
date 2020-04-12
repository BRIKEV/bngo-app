const { data } = require('require-all')({
  dirname: __dirname,
  filter: fileName => (fileName === 'index.js' ? undefined : fileName.replace('.json', '')),
});

const shuffleBoard = require('../lib/shuffleBoard');

const getBoard = (types = ['default'], boardLength) => {
  const allCards = types.map(type => data[type]).filter(Boolean);
  const flatArray = [].concat(...allCards);
  return shuffleBoard(flatArray, boardLength);
};

module.exports = getBoard;
