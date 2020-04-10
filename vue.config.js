module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: 'http://localhost:4000',
  },
};
