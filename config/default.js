const { join } = require('path');

const tokenOptions = {
  tokenSecret: process.env.JWT_SECRET || 'secreto',
  tokenOptions: { expiresIn: '2h' },
};

module.exports = {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 4000,
  },
  controller: {
    boardLength: 49,
    userOptionsLength: 16,
    storeMode: process.env.STORE_MODE || 'redis',
  },
  imageController: {
    imgURL: process.env.IMG_URL || '',
  },
  routes: {
    api: {
      frontMainFile: join(__dirname, '..', 'dist', 'index.html'),
      ...tokenOptions,
      validTopics: ['springfield', 'movieCartoons', 'cars', 'standard'],
    },
    admin: {
      cloudImages: process.env.NODE_ENV === 'production',
      ...tokenOptions,
      frontPath: join(__dirname, '..', 'dist'),
      swaggerOptions: {
        info: {
          description: 'Documentation for taxi-tpv-tickets-api',
          title: 'taxi-tpv-tickets-api',
          version: '1.0.0',
        },
        baseDir: process.cwd(), // app absolute path
        filesPattern: './**/**-routes.js', // path to the API handle folder, related to basedir
      },
    },
  },
  io: {
    interval: 10000,
    endGameTimeout: 12000,
    ...tokenOptions,
  },
  store: {
    redis: {
      URL: process.env.REDIS_URL || '127.0.0.1:6379',
      expire: 10800,
    },
  },
  logger: {
    transport: 'console',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'service',
    ],
    exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
  },
};
