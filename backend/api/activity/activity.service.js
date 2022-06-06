
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('activity')
        return await collection.find().toArray()
    } catch (err) {
        logger.error('cannot find activitys', err)
        throw err
    }
}

async function getById(activityId) {
    try {
        const collection = await dbService.getCollection('activity')
        const activity = await collection.findOne({ '_id': ObjectId(activityId) })
        return activity
    } catch (err) {
        logger.error(`while finding activity ${activityId}`, err)
        throw err
    }
}

async function add(activity) {
    try {
        const activityToAdd = {
            entityName: activity.entityName,
            createdBy: activity.createdBy ,
            type: activity.type,
            isStation: activity.isStation,
            createdAt: activity.createdAt || new Date()
        }
        const collection = await dbService.getCollection('activity')
        await collection.insertOne(activityToAdd)
        return activityToAdd
    } catch (err) {
        logger.error('cannot insert activity', err)
        throw err
    }
}

async function update(activity) {
    try {
        const activityToSave = {
            _id: ObjectId(activity._id),
            type: activity.type,
            activityInfo: activity.activityInfo,
            isRead: true,
            createdBy: {
                _id: activity.createdBy._id,
                fullname: activity.createdBy.fullname,
                imgUrl: activity.createdBy.imgUrl
            },
            createdAt: activity.createdAt,
            trackName: activity.trackName
        }
        const collection = await dbService.getCollection('activity')
        await collection.updateOne({ _id: activityToSave._id }, { $set: activityToSave })
        return activityToSave;
    } catch (err) {
        logger.error(`cannot update activity ${activity._id}`, err)
        throw err
    }
}


module.exports = {
    query,
    getById,
    add,
    update
}





