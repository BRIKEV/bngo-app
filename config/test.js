module.exports = {
  logger: { transport: null },
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5000,
  },
  io: {
    interval: 1000,
  },
};
