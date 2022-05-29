const logger = require('../services/logger.service')

async function log(req, res, next) {
  logger.info('Req was made')
  next()
}

module.exports = {
  log
}
