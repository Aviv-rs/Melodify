// prettier-ignore
const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getStations, getStationById, addStation, updateStation, removeStation } = require('./station.controller')
const router = express.Router()

router.get('/', log, getStations)
router.get('/:id', getStationById)
router.post('/', addStation)
router.put('/:id', updateStation)
router.delete('/:id', removeStation)


module.exports = router