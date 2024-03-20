const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(queryParams) {
  let { filterBy = {} } = queryParams
  const collection = await dbService.getCollection('station')
  try {
    let filterCriteria
    if (filterBy) {
      filterBy = JSON.parse(filterBy);
      filterCriteria = _buildCriteria(
        filterBy
        )
      } else filterCriteria = {}
      
      let stations = await collection
      .find(filterCriteria)

      const page = +filterBy.page
      const pageSize = +filterBy.pageSize

      if (page > 0 && pageSize > 0) {
        stations = stations.skip(page * pageSize).limit(pageSize)
      }
    


    stations = await stations.toArray()

    return stations
  } catch (err) {
    logger.error('cannot find stations', err)
    throw err
  }
}

async function getSections(queryParams) {
  let { tags = [] } = queryParams
  const collection = await dbService.getCollection('station')
  try {
    if (tags) {
      tags = JSON.parse(tags)
      dbFetchPromises = []
      let sections = []

      const fetchSection = async (tag)=> {
        const stationsToAdd = await collection
        .find({tags: { $in: [tag] }}).toArray()
        
        sections.push({[tag]: stationsToAdd})

      }

      tags.forEach((tag)=>{
        dbFetchPromises.push(fetchSection(tag))
        
      })

      await Promise.all(dbFetchPromises)

      return sections
    } else throw new Error('tags not provided!')
      
  } catch (err) {
    logger.error('cannot find sections', err)
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
      tags: station.tags,
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



function _buildCriteria(filterBy) {
  const { name, createdAt, tags, createdBy } = filterBy
  const filterCriteria = {}


  if (name) filterCriteria.name = { $regex: name, $options: 'i' }
  if (createdBy) filterCriteria['createdBy._id'] = createdBy._id
  if (createdAt) filterCriteria.createdAt = JSON.parse(createdAt)
  if (tags?.length) filterCriteria.tags = { $in: [...tags] }


  return filterCriteria
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  getSections
}
