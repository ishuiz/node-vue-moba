const path = require('path')

module.exports = {
  outputDir: path.join(__dirname, '../server/admin'),
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}
