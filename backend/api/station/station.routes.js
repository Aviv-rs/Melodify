// prettier-ignore
const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getStations, getStationById, addStation, updateStation, removeStation, addReview } = require('./station.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getStations)
router.get('/:id', getStationById)
router.post('/', addStation)
router.put('/:id', updateStation)
router.delete('/:id', removeStation)
// router.post('/', requireAuth, requireAdmin, addStation)
// router.put('/:id', requireAuth, requireAdmin, updateStation)
// router.delete('/:id', requireAuth, requireAdmin, removeStation)

module.exports = router