const webpackConfig = require('./webpack')
module.exports = {
  pluginOptions: {
    'serve-api-mocks': {
      base: '/api',
      routes: []
    }
  },
  configureWebpack: webpackConfig
}