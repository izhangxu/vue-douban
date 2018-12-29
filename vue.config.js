const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devServer: {
    proxy: {
      '/v2': {
        target: 'http://api.douban.com',
        changeOrigin: true,
        pathRewrite: {
          '^/v2': '/v2',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new LodashModuleReplacementPlugin(),
    ],
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('replace-api-url')
        .test(/(data|service)\.js$/)
        .use('string-replace-loader')
        .loader('string-replace-loader')
        .tap(() => ({
          search: '/v2/movie',
          replace: 'http://api.douban.com/v2/movie',
          flags: 'g',
        }));
    }
  },
};
