/**
 * Created by walliam on 2017/7/29.
 */
// var utils =
var path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    // path: config.build.assetsRoot,
    filename: '[name].js'// ,
    // publicPath

  },
  resolve: {
    extentions: ['.js', ',vue', '.json'],
    alias: {
      'src': resolve('src'),
      'common': resolve('src/common'),
      'components': resolve('src/components'),
      'api': resolve('src/api'),
      'base': resolve('src/base')
    }
  }

}
