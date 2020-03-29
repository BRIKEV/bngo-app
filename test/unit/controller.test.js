const expect = require('expect.js');
const initController = require('../../components/controller/initController');
const initStore = require('../../components/store/initStore');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

describe('initController tests', () => {
  const { start } = initController();
  let api;
  let storeSystem;
  beforeEach(async () => {
    storeSystem = await initStore().start();
    api = await start({
      logger: {
        info: () => 0,
      },
      store: storeSystem,
    });
  });

  it('createGame method', async () => {
    const result = await api.createGame({ gameName, gameKey });
    const games = storeSystem.getGames();
    expect(games).to.have.length(1);
    expect(games[0].board).to.have.length(49);
    expect(result).to.eql('Game created');
  });

  describe('joinGame method', () => {
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
      const result = await api.joinGame({ username, key: gameKey });
      expect(result.username).to.eql(username);
      expect(result.board).to.have.length(16);
      expect(result.ready).to.eql(false);
      const games = storeSystem.getGames();
      expect(games).to.have.length(1);
      expect(games[0].users).to.have.length(1);
    });

    it('should not join to a room if has the same name', async () => {
      await api.createGame({ gameName, gameKey });
      await api.joinGame({ username, key: gameKey });
      try {
        await api.joinGame({ username, key: gameKey });
        // if createGame does not throw an exception test should fail
        expect(false).to.eql(true);
      } catch (err) {
        expect(err.message).to.eql('User already joined');
      }
    });
  });

  it('readyToStart with two users method', async () => {
    // TODO: at least two users to start games
    const secondUsername = 'secondUsername';
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey });
    await api.joinGame({ username: secondUsername, key: gameKey });
    const firstUserresult = await api.readyToStart({ username, key: gameKey });
    expect(firstUserresult.gameReady).to.eql(false);
    expect(firstUserresult.username).to.eql(username);
    expect(firstUserresult.board).to.have.length(16);
    const secondResult = await api.readyToStart({ username: secondUsername, key: gameKey });
    expect(secondResult.username).to.eql(secondUsername);
    expect(secondResult.gameReady).to.eql(true);
    expect(secondResult.board).to.have.length(16);
    const games = storeSystem.getGames();
    expect(games).to.have.length(1);
    expect(games[0].ready).to.eql(true);
  });

  it('should return error as game is not ready', async () => {
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey });
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
      await api.joinGame({ username, key: gameKey });
      const userInfo = await api.getUserInfo({ key: gameKey, gameName, username });
      expect(userInfo.board).to.have.length(16);
      expect(userInfo.ready).to.eql(false);
      expect(userInfo.username).to.eql(username);
    });
  });

  it('complete playTurn method', async () => {
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey });
    await api.readyToStart({ username, key: gameKey });
    let result = await api.playTurn({ key: gameKey });
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
    expect(result.updateGame.users[0].board.filter(({ selected }) => selected)).to.have.length(16);
    expect(result.updateGame.board.filter(({ selected }) => selected)).to.have.length(49);
  });

  it('hasBingo method should return false', async () => {
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey });
    await api.readyToStart({ username, key: gameKey });
    const result = await api.hasBingo({ key: gameKey, username, gameName });
    expect(result).to.eql(false);
  });
});