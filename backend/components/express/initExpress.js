const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

module.exports = () => {
  const start = async ({ config, logger }) => {
    http.listen(config.port, () => {
      logger.info(`listening on *:${config.port}`);
    });
    app.locals.logger = logger;

    io.on('connection', () => {
      console.log('a user connected');
    });
    return { app, io };
  };

  return { start };
};
