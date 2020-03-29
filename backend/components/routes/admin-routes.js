const validator = require('swagger-endpoint-validator');
const bodyParser = require('body-parser');
const express = require('express');

module.exports = () => {
  const start = async ({ manifest = {}, server: { app }, config }) => {
    const { swaggerOptions } = config;
    app.use(express.static(config.frontPath));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

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
