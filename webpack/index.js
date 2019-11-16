module.exports = {
  module: {
    rules: [
      {
        test: '/\.s[ac]ss$/', // eslint-disable-line
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}