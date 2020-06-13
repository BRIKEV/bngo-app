const {
  tagError,
} = require('error-handler-module');
const bodyParser = require('body-parser');
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
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
    expressJSDocSwagger(app)(swaggerOptions);
    /**
     * GET /__/manifest
     * @summary This endpoint serves the manifest
     * @tags Admin - Everything about admin routes
     * @return {object} 200 - Sucessful response
    */
    app.get('/__/manifest', (req, res) => res.json(manifest));

    return Promise.resolve();
  };

  return { start };
};
