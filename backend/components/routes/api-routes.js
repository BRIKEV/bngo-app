const {
  handleHttpError,
  tagError,
} = require('error-handler-module');
const validator = require('swagger-endpoint-validator');

module.exports = () => {
  const start = async ({ server: { app }, controller, logger }) => {
    /**
     * This endpoint allows you to create one game
     * @route POST /api/v1/game
     * @group Game - Everything about games
     * @param {RegisterGameRequest.model} body.body.required
     * @returns {SuccessGameRegistered.model} 200 - Successful operation
     * @returns {Error.model} <any> - Error message
     * @security JWT
    */
    app.post('/api/v1/game', async (req, res, next) => {
      try {
        validator.validateAPIInput(req.body, req);
        await controller.createGame(req.body);
        const response = { success: true };
        validator.validateAPIOutput(response, req);
        return res.json(response);
      } catch (error) {
        return next(tagError(error));
      }
    });

    /**
     * This endpoint allows you to join one game
     * @route POST /api/v1/game/join
     * @group Game - Everything about games
     * @param {JoinGameRequest.model} body.body.required
     * @returns {SuccessGameRegistered.model} 200 - Successful operation
     * @returns {Error.model} <any> - Error message
     * @security JWT
    */
    app.post('/api/v1/game/join', async (req, res, next) => {
      try {
        validator.validateAPIInput(req.body, req);
        await controller.joinGame({
          key: req.body.gameKey,
          username: req.body.username,
        });
        const response = { success: true };
        validator.validateAPIOutput(response, req);
        return res.json(response);
      } catch (error) {
        return next(tagError(error));
      }
    });

    app.use(handleHttpError(logger));
    return Promise.resolve();
  };

  return { start };
};
