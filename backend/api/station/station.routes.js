// prettier-ignore
const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { getStations,getSections, getStationById, addStation, updateStation, removeStation } = require('./station.controller')
const router = express.Router()

router.get('/', log, getStations)
router.get('/sections', log, getSections)
router.get('/:id', getStationById)
router.post('/', addStation)
router.put('/:id', updateStation)
router.delete('/:id', removeStation)


module.exports = router