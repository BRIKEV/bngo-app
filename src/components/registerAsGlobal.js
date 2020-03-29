/* eslint-disable no-undef */
import Vue from 'vue';

const requireComponent = require.context(
  // Look for files in the current directory
  '.',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match Bk component filenames
  /Bk[\w-]+\.vue$/,
);

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
