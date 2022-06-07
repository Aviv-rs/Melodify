const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')

async function requireAuth(req, res, next) {
  console.log('cookies',req?.cookies?.loginToken)
  if (!req?.cookies?.loginToken)
  return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  console.log('logged user',loggedinUser)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

async function requireAdmin(req, res, next) {
  if (!req?.cookies?.loginToken)
    return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.cookies.loginToken)
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}

// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin,
}
