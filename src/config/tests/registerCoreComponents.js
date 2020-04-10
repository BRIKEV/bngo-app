/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

// This condition actually should detect if it's an Node environment
const context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
  const files = {};

  function readDirectory(directory) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file);

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) readDirectory(fullPath);

        return;
      }

      if (!regularExpression.test(fullPath)) return;

      files[fullPath] = true;
    });
  }

  readDirectory(path.resolve(__dirname, base));

  function Module(file) {
    // eslint-disable-next-line import/no-dynamic-require
    return require(file);
  }

  Module.keys = () => Object.keys(files);

  return Module;
};

export default (Vue) => {
  // https://webpack.js.org/guides/dependency-management/#require-context
  const requireComponent = context(
    // Look for files in the current directory
    '../../components',
    // Whether or not to look in subfolders
    true,
    // The regular expression used to match Bk component filenames
    /Bk[\w-]+\.vue$/,
  );

  // For each matching file name...
  requireComponent.keys().forEach((fileName) => {
    // Get component config
    const componentConfig = requireComponent(fileName);

    // Get name of component
    const componentName = componentConfig.default
      ? componentConfig.default.name : componentConfig.name;

    // Register component globally
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig,
    );
  });
};
