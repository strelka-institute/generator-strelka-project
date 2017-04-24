const sharedConfig = require('./universal')
const path = require('path')
const PATH_ROOT = path.resolve(__dirname, '../')
const resolve = file => path.resolve(PATH_ROOT, file)

const config = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3000,
  paths: {
    root: PATH_ROOT,
    dist: resolve('dist'),
    src: resolve('src'),
    public: process.env.PATH_PUBLIC || resolve('public')
  }
}

module.exports = Object.assign({}, sharedConfig, config)
