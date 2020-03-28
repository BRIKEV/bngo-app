const DEFAULT_BOARD = require('../../mock/index.json');
const getRandomItem = require('../../lib/getRandomItem');
const shuffleBoard = require('../../lib/shuffleBoard');

module.exports = () => {
  const start = ({ logger }) => {
    let games = [];

    const getGames = () => games;

    const createGame = async ({ gameName, gameKey }) => {
      logger.info('Creating game');
      const game = {
        key: gameKey,
        name: gameName,
        ready: false,
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
      const board = shuffleBoard(DEFAULT_BOARD, 16);
      const newUser = { username, board, ready: false };
      const updateGame = {
        ...game,
        users: [
          ...game.users,
          newUser,
        ],
      };
      games = games.map(updateGameByKey(updateGame));
      return Promise.resolve(newUser);
    };

    const updateBoard = (board, optionSelected) => (
      board.map(boardItem => {
        if (boardItem.id === optionSelected.id) {
          return { boardItem, selected: true };
        }
        return { ...boardItem };
      })
    );

    const readyToStart = async ({ key, username }) => {
      const game = await getGameByKey(key);
      const newUsers = game.users.map(user => {
        if (user.username === username) {
          return { ...user, ready: true };
        }
        return { ...user };
      });
      const gameReady = (
        newUsers.filter(({ ready }) => ready).length === game.users.length
      );
      const updateGame = {
        ...game,
        ready: gameReady,
        users: newUsers,
      };
      games = games.map(updateGameByKey(updateGame));
      return Promise.resolve({ username, gameReady });
    };

    const playTurn = async ({ key }) => {
      const game = await getGameByKey(key);
      if (!game.ready) {
        return 'Error playing game';
      }
      const validBoard = game.board.filter(({ selected }) => !selected);
      const optionSelected = getRandomItem(validBoard);
      const updateGame = {
        ...game,
        users: game.users.map(user => ({
          ...user,
          board: updateBoard(user.board, optionSelected),
        })),
        board: updateBoard(game.board, optionSelected),
      };
      games = games.map(updateGameByKey(updateGame));
      return Promise.resolve({ optionSelected, updateGame });
    };

    return { createGame, joinGame, playTurn, getGames, readyToStart };
  };

  return { start };
};
