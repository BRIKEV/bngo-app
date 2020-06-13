const {
  handleHttpError,
  tagError,
  errorFactory,
  CustomErrorTypes,
} = require('error-handler-module');

const { createGameLimit, joinGameLimit } = require('../../lib/rate-limits');
const jwt = require('../../lib/token');

const wrongInput = errorFactory(CustomErrorTypes.WRONG_INPUT);

module.exports = () => {
  const start = async ({ server: { app }, controller, logger, config }) => {
    const { signToken } = jwt(config.tokenSecret, config.tokenOptions);
    /**
     * POST /api/v1/game
     * @summary This endpoint allows you to create one game
     * @tags Game - Everything about games
     * @param {RegisterGameRequest} request.body.required
     * @return {SuccessGameRegistered} 200 - Successful operation
     * @return {Error} default - Error message
    */
    app.post('/api/v1/game', createGameLimit, async (req, res, next) => {
      try {
        const { types, gameName, gameKey } = req.body;
        if (!gameName || !gameKey) {
          throw wrongInput('Your sending invalid type');
        }
        if (types) {
          types.forEach(type => {
            const validType = config.validTopics.includes(type);
            if (!validType) throw wrongInput('Your sending invalid type');
          });
        }
        await controller.createGame(req.body);
        const response = { success: true };
        return res.json(response);
      } catch (error) {
        const newErrors = {
          'game-created': 409,
        };
        return next(tagError(error, newErrors));
      }
    });

    /**
     * POST /api/v1/game/join
     * @summary This endpoint allows you to join one game
     * @tags Game - Everything about games
     * @param {JoinGameRequest} request.body.required
     * @return {SuccessJoinGame} 200 - Successful operation
     * @return {Error} default - Error message
    */
    app.post('/api/v1/game/join', joinGameLimit, async (req, res, next) => {
      try {
        await controller.joinGame({
          key: req.body.gameKey,
          username: req.body.username,
          gameName: req.body.gameName,
        });
        const response = {
          accessKey: signToken({
            username: req.body.username,
            gameName: req.body.gameName,
            gameKey: req.body.gameKey,
          }),
        };
        return res.json(response);
      } catch (error) {
        const newErrors = {
          'game-started': 409,
        };
        return next(tagError(error, newErrors));
      }
    });
    /**
     * GET /api/v1/game-types
     * @summary This endpoint allows you to create one game
     * @tags Game - Everything about games
     * @return {array<string>} 200 - Successful operation
     * @return {Error} default - Error message
    */
    app.get('/api/v1/game-types', (req, res) => res.json(config.validTopics));

    app.get('/*', (req, res) => {
      res.sendFile(config.frontMainFile);
    });

    app.use(handleHttpError(logger));
    return Promise.resolve();
  };

  return { start };
};
