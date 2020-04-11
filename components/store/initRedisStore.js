const Redis = require('ioredis');
const debug = require('debug')('redis:system');

module.exports = () => {
  let redis;
  const start = async ({ config, logger }) => {
    redis = new Redis(config.URL);

    redis.on('error', error => {
      logger.error(`Error: redis instance  with code ${error.code} and message ${error.message}`);
      process.exit(1);
    });

    redis.on('connect', () => {
      logger.info('Redis instance was connected');
    });

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

  const stop = async () => {
    // This should not be necesarry as it disconnects automatically
    // However it is okay to add in the stop event too
    if (redis && redis.disconnect) {
      debug('Redis disconnect instance');
      redis.disconnect();
    }
  };

  return { start, stop };
};
