const activityService = require('./activity.service')
const logger = require('../../services/logger.service')

async function getActivity(req, res) {
    try {
        const activity = await activityService.getById(req.params.id)
        res.send(activity)
    } catch (err) {
        logger.error('Failed to get activity', err)
        res.status(500).send({ err: 'Failed to get activity' })
    }
}

async function getActivities(req, res) {
    try {
        const activities = await activityService.query()
        res.send(activities)
    } catch (err) {
        logger.error('Failed to get activitys', err)
        res.status(500).send({ err: 'Failed to get activitys' })
    }
}

async function addActivity(req, res) {
    try {
        const activity = req.body
        const addedActivity = await activityService.add(activity)
        res.send(addedActivity)
    } catch (err) {
        logger.error('Failed to add activity', err)
        res.status(500).send({ err: 'Failed to add activity' })
    }
}

async function updateActivity(req, res) {
    try {
        const activity = req.body
        const savedActivity = await activityService.update(activity)
        res.send(savedActivity)
    } catch (err) {
        logger.error('Failed to update activity', err)
        res.status(500).send({ err: 'Failed to update activity' })
    }
}

module.exports = {
    getActivity,
    getActivities,
    addActivity,
    updateActivity
}