const {
  handleHttpError,
  tagError,
  errorFactory,
  CustomErrorTypes,
} = require('error-handler-module');
const validator = require('swagger-endpoint-validator');

const { createGameLimit, joinGameLimit } = require('../../lib/rate-limits');
const jwt = require('../../lib/token');

const wrongInput = errorFactory(CustomErrorTypes.WRONG_INPUT);

module.exports = () => {
  const start = async ({ server: { app }, controller, logger, config }) => {
    const { signToken } = jwt(config.tokenSecret, config.tokenOptions);
    /**
     * This endpoint allows you to create one game
     * @route POST /api/v1/game
     * @group Game - Everything about games
     * @param {RegisterGameRequest.model} body.body.required
     * @returns {SuccessGameRegistered.model} 200 - Successful operation
     * @returns {Error.model} <any> - Error message
    */
    app.post('/api/v1/game', createGameLimit, async (req, res, next) => {
      try {
        validator.validateAPIInput(req.body, req);
        const { types } = req.body;
        if (types) {
          types.forEach(type => {
            const validType = config.validTopics.includes(type);
            if (!validType) throw wrongInput('Your sending invalid type');
          });
        }
        await controller.createGame(req.body);
        const response = { success: true };
        validator.validateAPIOutput(response, req);
        return res.json(response);
      } catch (error) {
        const newErrors = {
          'game-created': 409,
        };
        return next(tagError(error, newErrors));
      }
    });

    /**
     * This endpoint allows you to join one game
     * @route POST /api/v1/game/join
     * @group Game - Everything about games
     * @param {JoinGameRequest.model} body.body.required
     * @returns {SuccessJoinGame.model} 200 - Successful operation
     * @returns {Error.model} <any> - Error message
    */
    app.post('/api/v1/game/join', joinGameLimit, async (req, res, next) => {
      try {
        validator.validateAPIInput(req.body, req);
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
        validator.validateAPIOutput(response, req);
        return res.json(response);
      } catch (error) {
        const newErrors = {
          'game-started': 409,
        };
        return next(tagError(error, newErrors));
      }
    });
    /**
     * This endpoint allows you to create one game
     * @route GET /api/v1/game-types
     * @group Game - Everything about games
     * @returns {Array.<string>} 200 - Successful operation
     * @returns {Error.model} <any> - Error message
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
