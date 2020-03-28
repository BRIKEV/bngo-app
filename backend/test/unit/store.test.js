const expect = require('expect.js');
const initStore = require('../../components/store/initStore');

const gameName = 'entourage';
const gameKey = 'pizza';
const username = 'kj';

describe('initStore tests', () => {
  const { start } = initStore();
  let api;
  beforeEach(async () => {
    api = await start({
      logger: {
        info: () => 0,
      },
    });
  });

  it('createGame method', async () => {
    const result = await api.createGame({ gameName, gameKey });
    const games = api.getGames();
    expect(games).to.have.length(1);
    expect(games[0].board).to.have.length(49);
    expect(result).to.eql('Game created');
  });

  it('joinGame method', async () => {
    await api.createGame({ gameName, gameKey });
    const result = await api.joinGame({ username, key: gameKey });
    expect(result.username).to.eql(username);
    expect(result.board).to.have.length(16);
    expect(result.ready).to.eql(false);
    const games = api.getGames();
    expect(games).to.have.length(1);
    expect(games[0].users).to.have.length(1);
  });

  it('readyToStart method', async () => {
    const secondUsername = 'secondUsername';
    await api.createGame({ gameName, gameKey });
    await api.joinGame({ username, key: gameKey });
    await api.joinGame({ username: secondUsername, key: gameKey });
    let result = await api.readyToStart({ username, key: gameKey });
    expect(result.gameReady).to.eql(false);
    expect(result.username).to.eql(username);
    result = await api.readyToStart({ username: secondUsername, key: gameKey });
    expect(result.username).to.eql(secondUsername);
    expect(result.gameReady).to.eql(true);
    const games = api.getGames();
    expect(games).to.have.length(1);
    expect(games[0].ready).to.eql(true);
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
});
