const express = require('express');
const expressSwaggerGenerator = require('express-swagger-generator');

module.exports = () => {
  const start = async ({ manifest = {}, server: { app }, config }) => {
    const { swaggerOptions } = config;
    const expressSwagger = expressSwaggerGenerator(app);
    const options = {
      swaggerDefinition: {
        ...swaggerOptions.swaggerDefinition,
      },
      basedir: __dirname,
      files: ['./**/**-routes.js'],
    };
    expressSwagger(options);

    app.use('/test', express.static(config.testPath));
    app.use(express.static(config.frontPath));
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
