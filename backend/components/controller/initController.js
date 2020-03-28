const DEFAULT_BOARD = require('../../mock/index.json');
const getRandomItem = require('../../lib/getRandomItem');
const shuffleBoard = require('../../lib/shuffleBoard');

module.exports = () => {
  const start = async ({ logger, store }) => {
    const createGame = async ({ gameName, gameKey }) => {
      logger.info('Creating game');
      const game = {
        key: gameKey,
        name: gameName,
        ready: false,
        users: [],
        board: DEFAULT_BOARD,
      };
      await store.addGame(game);
      return Promise.resolve('Game created');
    };

    const joinGame = async ({ key, username }) => {
      const game = await store.getGameByKey(key);
      const board = shuffleBoard(DEFAULT_BOARD, 16);
      const newUser = { username, board, ready: false };
      const updateGame = {
        ...game,
        users: [
          ...game.users,
          newUser,
        ],
      };
      await store.updateGameByKey(updateGame);
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
      const game = await store.getGameByKey(key);
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
      await store.updateGameByKey(updateGame);
      return Promise.resolve({ username, gameReady });
    };

    const playTurn = async ({ key }) => {
      const game = await store.getGameByKey(key);
      if (!game.ready) {
        const error = new Error('Error: game is not ready yet');
        throw error;
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
      await store.updateGameByKey(updateGame);
      return Promise.resolve({ optionSelected, updateGame });
    };

    return { createGame, joinGame, playTurn, readyToStart };
  };

  return { start };
};
