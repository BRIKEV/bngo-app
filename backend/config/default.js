const { join } = require('path');

module.exports = {
  server: {
    host: '0.0.0.0',
    port: 4000,
  },
  routes: {
    admin: {
      frontPath: join(__dirname, '..', '..', 'frontend', 'dist'),
      testPath: join(__dirname, '..', 'public'),
      swaggerOptions: {
        swaggerDefinition: {
          info: {
            description: 'Documentation for taxi-tpv-tickets-api',
            title: 'taxi-tpv-tickets-api',
            version: '1.0.0',
          },
          host: process.env.DOCS_HOST || 'localhost:4000',
          basePath: '/',
          produces: ['application/json'],
          schemes: ['https', 'http'],
          securityDefinitions: {
            JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: '',
            },
          },
        },
        basedir: process.cwd(), // app absolute path
        files: ['./**/**-routes.js'], // path to the API handle folder, related to basedir
        route: {
          url: '/api-docs',
          docs: '/api-docs.json',
        },
      },
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
