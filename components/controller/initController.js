const {
  errorFactory,
  CustomErrorTypes,
} = require('error-handler-module');
const R = require('ramda');

const getBoard = require('../../references');
const getRandomItem = require('../../lib/getRandomItem');
const shuffleBoard = require('../../lib/shuffleBoard');

const alreadyCreated = errorFactory('game-created');
const alreadyStarted = errorFactory('game-started');
const wrongInput = errorFactory(CustomErrorTypes.WRONG_INPUT);
const notFoundError = errorFactory(CustomErrorTypes.NOT_FOUND);
const badRequestError = errorFactory(CustomErrorTypes.BAD_REQUEST);

module.exports = () => {
  const start = async ({ logger, store: storeSystem, config }) => {
    const store = storeSystem[config.storeMode];

    const trimText = text => {
      const trim = text ? text.trim() : text;
      return trim;
    };

    const filteredUsers = users => users.map(R.omit(['board']));
    const removeUser = username => user => user.username !== username;
    const findUser = username => user => user.username === username;

    const createGame = async ({ gameName, gameKey, types }) => {
      const gameExists = await store.getGameByKey(gameKey);
      if (gameExists) {
        throw alreadyCreated('This game was already created');
      }
      logger.info('Creating game');
      const game = {
        key: trimText(gameKey),
        name: trimText(gameName),
        types,
        ready: false,
        users: [],
        board: getBoard(types, config.boardLength),
      };
      await store.addGame(game);
      return Promise.resolve('Game created');
    };

    const getGameByKey = async key => {
      const notFoundKeyError = () => wrongInput('Key is required');
      const notFoundGame = () => notFoundError('Game key does not exists');
      if (!key) {
        throw notFoundKeyError();
      }
      const game = await store.getGameByKey(key);
      if (!game) {
        throw notFoundGame();
      }
      return game;
    };

    const joinGame = async payload => {
      const key = trimText(payload.key);
      const username = trimText(payload.username);
      const gameName = trimText(payload.gameName);
      const game = await getGameByKey(key);
      if (game.name !== gameName) {
        throw notFoundError('Gamename not found');
      }
      if (game.ready) {
        throw alreadyStarted('Game has already started');
      }
      const isAlreadyAdded = game.users.some(findUser(username));
      if (isAlreadyAdded) {
        throw badRequestError('User already joined');
      }
      const board = shuffleBoard(game.board, config.userOptionsLength);
      let newUser = { username, board, ready: false, host: false };
      if (game.users.length === 0) {
        newUser = { ...newUser, host: true };
      }
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
          return { ...boardItem, selected: true };
        }
        return { ...boardItem };
      })
    );

    const removeUserFromGame = async ({ key, username, userToRemove }) => {
      const game = await getGameByKey(key);
      const hostUser = game.users.find(findUser(username));
      if (!hostUser.host) {
        throw new Error('Error: only host can do this');
      }
      const newUsers = game.users.filter(removeUser(userToRemove));
      const gameReady = (
        newUsers.filter(({ ready }) => ready).length === newUsers.length
      );
      const updateGame = {
        ...game,
        ready: gameReady,
        users: newUsers,
      };
      await store.updateGameByKey(updateGame);
      return Promise.resolve({
        username,
        gameReady,
        users: filteredUsers(newUsers),
      });
    };

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
      const { board: userBoard } = game.users.find(findUser(username));
      await store.updateGameByKey(updateGame);
      return Promise.resolve({
        username,
        gameReady,
        board: userBoard,
        users: filteredUsers(newUsers),
      });
    };

    const isGameOver = board => (
      board.filter(({ selected }) => selected).length === config.boardLength
    );

    const playTurn = async ({ key }) => {
      const game = await getGameByKey(key);
      if (!game.ready) {
        const error = new Error('Error: game is not ready yet');
        throw error;
      }
      const validBoard = game.board.filter(({ selected }) => !selected);
      const optionSelected = getRandomItem(validBoard);
      const newBoard = updateBoard(game.board, optionSelected);
      const updateGame = {
        ...game,
        users: game.users.map(user => ({
          ...user,
          board: updateBoard(user.board, optionSelected),
        })),
        board: newBoard,
      };
      const gameFinished = isGameOver(newBoard);
      const noUsers = updateGame.users.length === 0;
      await store.updateGameByKey(updateGame);
      return Promise.resolve({
        optionSelected,
        updateGame: {
          ...updateGame,
          board: newBoard,
        },
        gameFinished: gameFinished || noUsers,
      });
    };

    const getUserInfo = async ({ key, gameName, username }) => {
      const game = await getGameByKey(key);
      if (game.name !== gameName) {
        throw notFoundError('Gamename not found');
      }
      const gameUser = game.users.find(findUser(username));
      if (!gameUser) {
        throw notFoundError('User not found in this game');
      }
      return Promise.resolve({
        ...gameUser,
        mainBoard: game.board,
        users: filteredUsers(game.users),
        gameReady: game.ready,
      });
    };

    const hasBingo = async ({ key, gameName, username }) => {
      const user = await getUserInfo({ key, gameName, username });
      const userBoard = user.board.filter(({ selected }) => selected);
      return (user.gameReady && userBoard.length === config.userOptionsLength);
    };

    const finishGame = async ({ key, gameName }) => {
      const game = await getGameByKey(key);
      if (game.name !== gameName) {
        throw notFoundError('Gamename not found');
      }
      const updateGame = {
        ...game,
        ready: false,
        board: getBoard(game.types, config.boardLength),
        users: [],
      };
      return store.updateGameByKey(updateGame);
    };

    const leaveGame = async ({ key, gameName, username }) => {
      const game = await getGameByKey(key);
      if (game.name !== gameName) {
        throw notFoundError('Gamename not found');
      }
      const userInGame = game.users.find(findUser(username));
      if (!userInGame) {
        throw notFoundError('Username not found to leave the room');
      }
      const newUsers = game.users.filter(user => !(user.username === username));
      const usersReady = newUsers.filter(({ ready }) => ready).length;
      const gameReady = (
        usersReady === game.users.length - 1
      ) && usersReady !== 0;
      const updateGame = {
        ...game,
        ready: gameReady,
        users: newUsers,
      };
      await store.updateGameByKey(updateGame);
      return Promise.resolve({
        username,
        initGame: !game.ready && gameReady && newUsers.length !== 0,
        users: filteredUsers(newUsers),
      });
    };

    return {
      createGame,
      joinGame,
      playTurn,
      readyToStart,
      removeUserFromGame,
      getUserInfo,
      hasBingo,
      finishGame,
      leaveGame,
    };
  };

  return { start };
};
