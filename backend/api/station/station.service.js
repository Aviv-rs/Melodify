const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(queryParams) {
  // const MAX_PAGE_SIZE = 15
  const { filterBy = {}, pageSize } = queryParams
  const collection = await dbService.getCollection('station')
  const stationAmount = await collection.estimatedDocumentCount()
  try {
    let filterCriteria
    if (filterBy) {
      filterCriteria  = _buildCriteria(
        JSON.parse(filterBy),
        // MAX_PAGE_SIZE
        )
      }else filterCriteria = {}

    console.log('@@@@@@', filterCriteria)
    const stations = await collection
      .find(filterCriteria)
      // .sort(sortCriteria)
      // .skip(startIdx)
      // .limit(pageSize)
      .toArray()



    return stations
  } catch (err) {
    logger.error('cannot find stations', err)
    throw err
  }
}

async function getById(stationId,) {
  try {
    const isLikedSongs = stationId === 'liked'
    const collection = await dbService.getCollection('station')
    const station = collection.findOne({
      _id: isLikedSongs ?
        'liked'
        : ObjectId(stationId)
    })
    return station
  } catch (err) {
    logger.error(`while finding station ${stationId}`, err)
    throw err
  }
}

async function remove(stationId) {
  try {
    const collection = await dbService.getCollection('station')
    await collection.deleteOne({ _id: ObjectId(stationId) })
    return stationId
  } catch (err) {
    logger.error(`cannot remove station ${stationId}`, err)
    throw err
  }
}

async function add(station) {
  try {
    const collection = await dbService.getCollection('station')
    station.createdAt = Date.now()
    await collection.insertOne(station)
    return station
  } catch (err) {
    logger.error('cannot insert station', err)
    throw err
  }
}
async function update(station) {
  try {
    const stationToSave = {
      _id: ObjectId(station._id),
      name: station.name,
      description: station.description,
      coverUrl: station.coverUrl,
      tags:station.tags,
      songs: station.songs,
      likedByUsers: station.likedByUsers
    }

    const collection = await dbService.getCollection('station')
    await collection.updateOne({ _id: stationToSave._id }, { $set: { ...stationToSave } })
    return station
  } catch (err) {
    logger.error(`cannot update station ${station._id}`, err)
    throw err
  }
}

async function saveMsgToHistory(stationId, msg) {
  try {
    var id = ObjectId(stationId)
    const collection = await dbService.getCollection('station')
    await collection.updateOne({ _id: id }, { $push: { chatHistory: msg } })
  } catch (err) {
    logger.error(`cannot update station ${stationId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy, pageSize) {
  const { name, createdAt, tags, sortBy, createdBy, duration } = filterBy
  const filterCriteria = {}
  
  let sortCriteria, pageCriteria
  
  if (name) filterCriteria.name = { $regex: name, $options: 'i' }
  if (createdBy) filterCriteria['createdBy._id'] =  createdBy._id
  if (createdAt) filterCriteria.createdAt = JSON.parse(createdAt)
  console.log('@@@@@@@',tags)
  if (tags?.length) filterCriteria.tags = { $in: [...tags] }
  // switch (sortBy) {
    //   case 'priceAscending':
    //     sortCriteria = { price: 1 }
    //     break
    //   case 'priceDescending':
    //     sortCriteria = { price: -1 }
    //     break
    //   default:
    //     sortCriteria = { name: 1 }
    // }
    
    
    
  return filterCriteria 
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  saveMsgToHistory,
}
