const dataReferences = require('./dataReferences.json');
const shuffleBoard = require('../lib/shuffleBoard');

const getBoard = (types = ['default'], boardLength) => {
  const allCards = types.map(type => dataReferences[type]).filter(Boolean);
  const flatArray = [].concat(...allCards);
  return shuffleBoard(flatArray, boardLength);
};

module.exports = getBoard;
