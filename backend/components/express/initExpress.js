const app = require('express')();
const http = require('http').createServer(app);

module.exports = () => {
  const start = async ({ config, logger }) => {
    http.listen(config.port, () => {
      logger.info(`listening on *:${config.port}`);
    });
    app.locals.logger = logger;

    return { app, http };
  };

  return { start };
};
