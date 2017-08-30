const sharedConfig = require('./universal')
const path = require('path')
const PATH_ROOT = path.resolve(__dirname, '../')
const resolve = file => path.resolve(PATH_ROOT, file)

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const baseURL = process.env.BASE_URL || `http://${host}:${port}`

const config = {
  host,
  port,
  baseURL,
  paths: {
    root: PATH_ROOT,
    config: __dirname,
    dist: resolve('dist'),
    src: resolve('src'),
    public: process.env.PATH_PUBLIC || resolve('public')
  }
}

module.exports = Object.assign({}, sharedConfig, config)
