import axios from 'axios'


export const stationService = {
    query,
    getById,
    remove,
    save,
    getEmptyStation,
}
const BASE_URL =
    process.env.NODE_ENV == 'production'
        ? '/api/station'
        : 'http://localhost:3030/api/station/'




async function query(filterBy, pageSize) {
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
        console.log('updated station', data);
        return data
    } else {
        const { data } = await axios.post(BASE_URL, station)
        console.log('added station', data);
        return data
    }
}




function getEmptyStation() {
    return {
        name: "New playlist",
        coverUrl: "",
        description: "",
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
