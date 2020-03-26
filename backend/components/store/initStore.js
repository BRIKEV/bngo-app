const DEFAULT_BOARD = require('../../mock/index.json');
const getRandomItem = require('../../lib/getRandomItem');
const shuffleBoard = require('../../lib/shuffleBoard');

module.exports = () => {
  const start = ({ logger }) => {
    let games = [];

    const createGame = async ({ gameName, gameKey }) => {
      logger.info('Creating game');
      const game = {
        key: gameKey,
        name: gameName,
        users: [],
        board: DEFAULT_BOARD,
      };
      games.push(game);
      return Promise.resolve('Game created');
    };

    const updateGameByKey = updateGame => gameItem => {
      if (updateGame.key === gameItem.key) return { ...updateGame };
      return { ...gameItem };
    };

    const getGameByKey = async key => {
      const game = games.find(({ key: gameKey }) => gameKey === key);
      return Promise.resolve(game);
    };

    const joinGame = async ({ key, username }) => {
      const game = await getGameByKey(key);
      if (!game) {
        return 'error';
      }
      const board = shuffleBoard(DEFAULT_BOARD, 16);
      const updateGame = {
        ...game,
        users: [
          ...game.users,
          { username, board },
        ],
      };
      games = games.map(updateGameByKey(updateGame));
      return Promise.resolve({ username, board });
    };

    const playTurn = async ({ key }) => {
      const game = await getGameByKey(key);
      const validBoard = game.board.filter(({ selected }) => !selected);
      const optionSelected = getRandomItem(validBoard);
      const updateGame = {
        ...game,
        board: game.board.map(boardItem => {
          if (boardItem.id === optionSelected.id) {
            return { boardItem, selected: true };
          }
          return { ...boardItem };
        }),
      };
      games = games.map(updateGameByKey(updateGame));
      return Promise.resolve({ optionSelected, updateGame });
    };

    return { createGame, joinGame, playTurn };
  };

  return { start };
};
