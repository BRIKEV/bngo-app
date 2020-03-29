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

  const stop = async () => (
    new Promise(resolve => {
      http.close(error => {
        if (error) {
          console.error(error); // eslint-disable-line
          return resolve({});
        }
        return resolve({});
      });
    })
  );

  return { start, stop };
};
