const expect = require('expect.js');
const initController = require('../../components/controller/initController');
const initRedisStore = require('../../components/store/initRedisStore');
const config = require('../../config/default');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

describe('initController tests', () => {
  const { start } = initController();
  let api;
  let storeSystem;
  beforeEach(async () => {
    storeSystem = await initRedisStore().start({
      config: config.store.redis,
      logger: {
        info: () => 0,
      },
    });
    await storeSystem.removeGames();
    api = await start({
      logger: {
        info: () => 0,
      },
      store: {
        redis: storeSystem,
      },
      config: config.controller,
    });
  });

  afterEach(async () => {
    await storeSystem.removeGames();
  });

  describe('createGame method', () => {
    it('should createGame', async () => {
      const result = await api.createGame({ gameName, gameKey });
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].board).to.have.length(49);
      expect(games[0].users).to.have.length(0);
      expect(games[0].ready).to.eql(false);
      expect(result).to.eql('Game created');
    });

    it('should trim values', async () => {
      await api.createGame({ gameName: '  name  ', gameKey: '  game key  ' });
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].key).to.eql('game key');
      expect(games[0].name).to.eql('name');
    });
  });

  describe('joinGame method', () => {
    it('should return an error if gameName does not exist', async () => {
      try {
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: gameKey, gameName: 'Not valid' });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Gamename not found');
      }
    });

    it('should return an error if game does not exist', async () => {
      try {
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: 'Not valid key' });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Game key does not exists');
      }
    });

    it('should return an error if key is not sent', async () => {
      try {
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Key is required');
      }
    });

    it('should join one user when a game exists for the first time', async () => {
      await api.createGame({ gameName, gameKey });
      const result = await api.joinGame({ username, key: gameKey, gameName });
      expect(result.username).to.eql(username);
      expect(result.board).to.have.length(16);
      expect(result.ready).to.eql(false);
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].users).to.have.length(1);
    });

    it('should join one user and trim values', async () => {
      await api.createGame({ gameName: ` ${gameName}  `, gameKey });
      const result = await api.joinGame({ username: ` ${username}  `, key: gameKey, gameName });
      expect(result.username).to.eql(username);
      expect(result.board).to.have.length(16);
      expect(result.ready).to.eql(false);
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].key).to.eql(gameKey);
      expect(games[0].name).to.eql(gameName);
      expect(games[0].users).to.have.length(1);
    });

    it('should not join to a room if has the same name', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      try {
        await api.joinGame({ username, key: gameKey, gameName });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('User already joined');
      }
    });

    it('should not join to a room if has the same name', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      try {
        await api.joinGame({ username: 'new user', key: gameKey, gameName });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Game has already started');
      }
    });
  });

  it('readyToStart with two users method', async () => {
    const secondUsername = 'secondUsername';
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey, gameName });
    await api.joinGame({ username: secondUsername, key: gameKey, gameName });
    const firstUserresult = await api.readyToStart({ username, key: gameKey });
    expect(firstUserresult.gameReady).to.eql(false);
    expect(firstUserresult.username).to.eql(username);
    expect(firstUserresult.board).to.have.length(16);
    expect(firstUserresult.users).to.have.length(2);
    expect(firstUserresult.users[0].board).to.be(undefined);
    const secondResult = await api.readyToStart({ username: secondUsername, key: gameKey });
    expect(secondResult.username).to.eql(secondUsername);
    expect(secondResult.gameReady).to.eql(true);
    expect(secondResult.board).to.have.length(16);
    const games = await storeSystem.getGames();
    expect(games).to.have.length(1);
    expect(games[0].ready).to.eql(true);
  });

  describe('leaveGame method', () => {
    it('should return not found when gamename does not match', async () => {
      try {
        const secondUsername = 'secondUsername';
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: gameKey, gameName });
        await api.joinGame({ username: secondUsername, key: gameKey, gameName });
        await api.readyToStart({ username, key: gameKey });
        await api.readyToStart({ username: secondUsername, key: gameKey });
        await api.leaveGame({ username: secondUsername, key: gameKey, gameName: 'fake gamename' });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Gamename not found');
      }
    });

    it('leaveGame with two users method as game already started', async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      await api.readyToStart({ username: secondUsername, key: gameKey });
      const leaveGameResponse = await api.leaveGame({ username: secondUsername, key: gameKey, gameName });
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(true);
      expect(leaveGameResponse.users).to.have.length(1);
      expect(leaveGameResponse.initGame).to.eql(false);
      expect(leaveGameResponse.username).to.eql(secondUsername);
    });

    it('leaveGame with two users and second one was not ready leaves. Game should be ready', async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      const leaveGameResponse = await api.leaveGame({ username: secondUsername, key: gameKey, gameName });
      expect(leaveGameResponse.users).to.have.length(1);
      expect(leaveGameResponse.initGame).to.eql(true);
      expect(leaveGameResponse.username).to.eql(secondUsername);
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(true);
    });

    it('leaveGame with two users and first one who is ready leaves. Game should be not ready', async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      const leaveGameResponse = await api.leaveGame({ username, key: gameKey, gameName });
      expect(leaveGameResponse.users).to.have.length(1);
      expect(leaveGameResponse.initGame).to.eql(false);
      expect(leaveGameResponse.username).to.eql(username);
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(false);
    });

    it('leaveGame two users that were ready and initGame should be false', async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      await api.readyToStart({ username: secondUsername, key: gameKey });
      let leaveGameResponse = await api.leaveGame({ username, key: gameKey, gameName });
      expect(leaveGameResponse.users).to.have.length(1);
      expect(leaveGameResponse.initGame).to.eql(false);
      expect(leaveGameResponse.username).to.eql(username);
      leaveGameResponse = await api.leaveGame({ username: secondUsername, key: gameKey, gameName });
      expect(leaveGameResponse.users).to.have.length(0);
      expect(leaveGameResponse.initGame).to.eql(false);
      expect(leaveGameResponse.username).to.eql(secondUsername);
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(false);
      expect(games[0].users).to.have.length(0);
    });

    it(`leaveGame two users and play turn should finish game and
      it should be able to join a user again`, async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      await api.readyToStart({ username: secondUsername, key: gameKey });
      await api.playTurn({ key: gameKey });
      await api.leaveGame({ username, key: gameKey, gameName });
      await api.leaveGame({ username: secondUsername, key: gameKey, gameName });
      await api.finishGame({ key: gameKey, gameName });
      const result = await api.joinGame({ username, key: gameKey, gameName });
      expect(result.username).to.eql(username);
      expect(result.board).to.have.length(16);
      expect(result.ready).to.eql(false);
    });

    it('leaveGame one users of two user\'s game after finish it', async () => {
      try {
        const secondUsername = 'secondUsername';
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: gameKey, gameName });
        await api.joinGame({ username: secondUsername, key: gameKey, gameName });
        await api.readyToStart({ username, key: gameKey });
        await api.readyToStart({ username: secondUsername, key: gameKey });
        await api.playTurn({ key: gameKey });
        await api.finishGame({ key: gameKey, gameName });
        await api.leaveGame({ username, key: gameKey, gameName });
        // if leaveGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Username not found to leave the room');
      }
    });
  });

  it('should return error as game is not ready', async () => {
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey, gameName });
    try {
      await api.playTurn({ key: gameKey });
    } catch (error) {
      expect(error.message).to.eql('Error: game is not ready yet');
    }
  });

  describe('getUserInfo tests', () => {
    it('should return not found when there is not a game created', async () => {
      try {
        await api.getUserInfo({ key: gameKey, gameName, username });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Game key does not exists');
      }
    });

    it('should return not found when there is not a user in that game', async () => {
      try {
        await api.createGame({ gameName, gameKey });
        await api.getUserInfo({ key: gameKey, gameName, username });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('User not found in this game');
      }
    });

    it('should return not found when gamename does not match', async () => {
      try {
        await api.createGame({ gameName, gameKey });
        await api.getUserInfo({ key: gameKey, gameName: 'Random gamename', username });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Gamename not found');
      }
    });

    it('should return not found when gamename does not match', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      const userInfo = await api.getUserInfo({ key: gameKey, gameName, username });
      expect(userInfo.mainBoard).to.have.length(49);
      expect(userInfo.board).to.have.length(16);
      expect(userInfo.users).to.have.length(1);
      expect(userInfo.ready).to.eql(false);
      expect(userInfo.username).to.eql(username);
    });
  });

  it('complete playTurn method', async () => {
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey, gameName });
    await api.readyToStart({ username, key: gameKey });
    let result = await api.playTurn({ key: gameKey });
    expect(result.updateGame).to.have.property('users');
    expect(result.gameFinished).to.eql(false);
    expect(result.optionSelected).to.only.have.keys([
      'id',
      'name',
      'image',
      'selected',
    ]);
    expect(result.updateGame.users[0].username).to.eql(username);
    expect(result.updateGame.board.filter(({ selected }) => selected)).to.have.length(1);
    for (let i = 0; i < 48; i += 1) {
      result = await api.playTurn({ key: gameKey }); // eslint-disable-line
    }
    expect(result.gameFinished).to.eql(true);
    expect(result.updateGame.board[0]).to.only.have.keys([
      'id',
      'name',
      'image',
      'selected',
    ]);
    expect(result.updateGame.board.filter(({ selected }) => selected)).to.have.length(49);
    expect(result.updateGame.users[0].board.filter(({ selected }) => selected)).to.have.length(16);
  });

  describe('hasBingo method', () => {
    it('hasBingo method should return false', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      const result = await api.hasBingo({ key: gameKey, username, gameName });
      expect(result).to.eql(false);
    });

    it('hasBingo method should return false', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      for (let i = 0; i < 49; i += 1) {
        await api.playTurn({ key: gameKey }); // eslint-disable-line
      }
      const result = await api.hasBingo({ key: gameKey, username, gameName });
      expect(result).to.eql(true);
    });
  });

  describe('removeUserFromGame', () => {
    it('should return an error if the key does not exists', async () => {
      try {
        const secondUsername = 'secondUsername';
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: gameKey, gameName });
        await api.joinGame({ username: secondUsername, key: gameKey, gameName });
        await api.removeUserFromGame({ key: 'not found', username, userToRemove: secondUsername });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Game key does not exists');
      }
    });

    it('should return an error if the user that wants to delete a user is not the host', async () => {
      try {
        const secondUsername = 'secondUsername';
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: gameKey, gameName });
        await api.joinGame({ username: secondUsername, key: gameKey, gameName });
        await api.removeUserFromGame({ key: gameKey, username: secondUsername, userToRemove: username });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('Error: only host can do this');
      }
    });

    it('should remove the user and return the board not ready because host did not start', async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.removeUserFromGame({ key: gameKey, username, userToRemove: secondUsername });
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(false);
      expect(games[0].users).to.have.length(1);
      expect(games[0].board.filter(({ selected }) => selected)).to.have.length(0);
    });

    it('should remove the user and return the board ready because host clicked start', async () => {
      const secondUsername = 'secondUsername';
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.joinGame({ username: secondUsername, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      await api.removeUserFromGame({ key: gameKey, username, userToRemove: secondUsername });
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(true);
      expect(games[0].users).to.have.length(1);
      expect(games[0].board.filter(({ selected }) => selected)).to.have.length(0);
    });
  });

  describe('finishGame method', () => {
    it('should throw error when game is finished and try to play turn', async () => {
      try {
        await api.createGame({ gameName, gameKey });
        await api.joinGame({ username, key: gameKey, gameName });
        await api.readyToStart({ username, key: gameKey });
        await api.finishGame({ key: gameKey, gameName });
        await api.playTurn({ key: gameKey });
      } catch (error) {
        expect(error.message).to.eql('Error: game is not ready yet');
      }
    });

    it('finishGame should set game ready to false and empty users', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey, gameName });
      await api.readyToStart({ username, key: gameKey });
      await api.finishGame({ key: gameKey, gameName });
      const games = await storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].ready).to.eql(false);
      expect(games[0].users).to.have.length(0);
      expect(games[0].board.filter(({ selected }) => selected)).to.have.length(0);
    });
  });
});
