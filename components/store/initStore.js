
module.exports = () => {
  let games = [];
  const start = async () => {
    const getGames = () => games;

    const removeGames = async () => {
      games = [];
      return Promise.resolve(true);
    };

    const addGame = async game => {
      games.push(game);
      return Promise.resolve(true);
    };

    const getGameByKey = async key => {
      const game = games.find(({ key: gameKey }) => gameKey === key);
      return Promise.resolve(game);
    };

    const updateByKey = updateGame => gameItem => {
      if (updateGame.key === gameItem.key) return { ...updateGame };
      return { ...gameItem };
    };

    const updateGameByKey = async updateGame => {
      games = games.map(updateByKey(updateGame));
      return Promise.resolve(updateGame);
    };

    return { addGame, getGameByKey, updateGameByKey, getGames, removeGames };
  };

  return { start };
};
