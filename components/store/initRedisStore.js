const Redis = require('ioredis');

module.exports = () => {
  const start = async ({ config }) => {
    const redis = new Redis(config.URL);

    const setValue = json => JSON.stringify(json);

    const getValue = stringify => JSON.parse(stringify);

    const getGames = async () => {
      const keys = await redis.keys('*');
      const games = await Promise.all(keys.map(key => redis.get(key)));
      return games.map(getValue);
    };

    const removeGames = async () => redis.flushdb();

    const addGame = async game => (
      redis.setex(game.key, config.expire, setValue(game))
    );

    const getGameByKey = async key => {
      const value = await redis.get(key);
      return getValue(value);
    };

    const updateGameByKey = async updateGame => {
      await redis.setex(updateGame.key, config.expire, setValue(updateGame));
      return Promise.resolve(updateGame);
    };

    return { addGame, getGameByKey, updateGameByKey, getGames, removeGames };
  };

  return { start };
};
