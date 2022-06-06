import axios from 'axios'
import { socketService, SOCKET_EMIT_UPDATE_STATION, SOCKET_EMIT_ACTIVITY_LOG } from './socket.service'
import { userService } from './user.service'

export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation,
    getStationDuration
}
const BASE_URL =
    process.env.NODE_ENV == 'production'
        ? '/api/station'
        : 'http://localhost:3030/api/station/'




async function query(filterBy={}, pageSize) {
    const { data } = await axios.get(BASE_URL, {
        params: { filterBy, pageSize },
    })
    return data
}
async function getById(stationId) {
    const { data } = await axios.get(BASE_URL + stationId)
    return data
}
async function remove(stationId) {
    const { data } = await axios.delete(BASE_URL + stationId)
    return data
}
async function save(station) {
    if (station._id) {
        const { data } = await axios.put(BASE_URL + station._id, station)
        socketService.emit(SOCKET_EMIT_UPDATE_STATION, station)
        const activity = {
            entity: station,
            user: userService.getLoggedinUser() || 'Guest',
            type: 'update'
        }
        // socketService.emit(SOCKET_EMIT_ACTIVITY_LOG, activity)
        return data
    } else {
        const loggedinUser = userService.getLoggedinUser()
        if (loggedinUser) station.createdBy = loggedinUser

        const { data } = await axios.post(BASE_URL, station)
        console.log('added station', data);
        return data
    }
}


function getEmptyStation() {
    return {
        name: 'New playlist',
        coverUrl: '',
        description: '',
        tags: [

        ],
        createdAt: Date.now(),
        createdBy: {
        },
        likedByUsers: [

        ],
        currSongIdx: 0,
        songs: []
    }
}

function getStationDuration(stationSongs) {
    if (!stationSongs || !stationSongs.length) return

    const totalDuration = stationSongs.reduce((totalDuration, song) => {
        if (!song.duration) return
        const timeUnits = song.duration.split(':')
        if (timeUnits.length >= 3) {
            totalDuration.hr += +timeUnits[0]
            totalDuration.min += +timeUnits[1]
        } else totalDuration.min += +timeUnits[0]
        totalDuration.sec += +timeUnits.at(-1)
        return totalDuration
    }, { hr: 0, min: 0, sec: 0 })

    if (!totalDuration) return


    const { min, sec } = totalDuration
    if (sec > 60) {
        totalDuration.min += sec / 60 | 0
        totalDuration.sec %= 60
    }
    if (min > 60) {
        totalDuration.hr += min / 60 | 0
        totalDuration.min %= 60
    }
    return totalDuration
}
