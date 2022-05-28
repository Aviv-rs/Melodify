import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'station'

export const stationService = {
    save,
    getEmptyStation,
    query,
    getById
}

async function query() {
    const stations = await storageService.query(STORAGE_KEY)
    return stations
}

async function getById(stationId) {
    const station = await storageService.get(STORAGE_KEY, stationId)
    return station
}

async function save(station) {
    let savedStation
    if (station?._id) {
        savedStation = await storageService.put(STORAGE_KEY, station)
        //TODO:
        // stationChannel.postMessage(getActionUpdateStation(savedStation))

    } else {
        //TODO: mini user inside of station 
        savedStation = await storageService.post(STORAGE_KEY, station)
    }
    return savedStation
}

function getEmptyStation() {
    return {
        name: "My Playlist #2",
        coverUrl: "https://mosaic.scdn.co/640/ab67616d0000b273063fc4921a6d7fbac76e9bbaab67616d0000b273582f703c73240fe327aa05d6ab67616d0000b2736ca5c90113b30c3c43ffb8f4ab67616d0000b273985bf5ede2fe4a048ee85f28",
        tags: [
            "Motivating",
            "Workout"
        ],
        createdAt: new Date(),
        createdBy: {
            _id: "6283d13fb9a7e752c1c0fdcb",
            username: "kyle_s",
            fullName: "Kyle Smith"
        },
        likedByUsers: [
            {
                _id: "628a6e62b1f6f147074b1ff5",
                username: "leila.P",
                fullName: "Leila Parks"
            },

            {
                _id: "628a71b2b1f6f147074b1ff6",
                username: "summerz",
                fullName: "Sam Marks"
            }
        ],
        currSongIdx: 0,
        songs: []
    }
}
