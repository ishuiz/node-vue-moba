const path = require('path')

module.exports = {
  outputDir: path.join(__dirname, '../server/web')
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/web/'
  //   : '/'
}
