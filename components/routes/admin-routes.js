const {
  tagError,
} = require('error-handler-module');
const validator = require('swagger-endpoint-validator');
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

module.exports = () => {
  const start = async ({ manifest = {}, server: { app }, imageController, config, logger }) => {
    const { swaggerOptions } = config;

    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    if (config.cloudImages) {
      logger.info('cloudImages enabled');
      app.get('/images/:type/:name', async (req, res, next) => {
        try {
          const { type, name } = req.params;
          const response = await imageController.handleImage(type, name);
          res.set({
            ...response.headers,
          });
          return response.data.pipe(res);
        } catch (error) {
          return next(tagError(error));
        }
      });
    }
    app.use(express.static(config.frontPath));

    validator.init(app, swaggerOptions);
    /**
     * This endpoint serves the manifest
     * @route GET /__/manifest
     * @group Admin - Everything about admin routes
     * @returns 200 - Sucessful response
    */
    app.get('/__/manifest', (req, res) => res.json(manifest));

    return Promise.resolve();
  };

  return { start };
};
