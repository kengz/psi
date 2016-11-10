const winston = require('winston')

/* istanbul ignore next */
const logLevel = process.env.npm_config_debug ? 'debug' : 'info'
const log = global.log || new (winston.Logger)({
  level: logLevel,
  transports: [new (winston.transports.Console)({
    formatter: (options) => {
      /* istanbul ignore next */
      const colorText = winston.config.colorize(options.level, options.level.toUpperCase())
      const message = options.message || ''
      return `[${new Date()}] ${colorText} ${message}`
    },
  })],
})
global.log = log

module.exports = log
