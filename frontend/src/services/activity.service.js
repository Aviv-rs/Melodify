import axios from 'axios'
import { socketService, SOCKET_EMIT_UPDATE_STATION, SOCKET_EMIT_ACTIVITY_LOG } from './socket.service'
import { userService } from './user.service'

export const activityService = {
    query,
    getById,
    remove,
    save,
}
const BASE_URL =
    process.env.NODE_ENV == 'production'
        ? '/api/activity'
        : 'http://localhost:3030/api/activity/'


async function query() {
    const { data } = await axios.get(BASE_URL)
    return data
}
async function getById(activityId) {
    const { data } = await axios.get(BASE_URL + activityId)
    return data
}
async function remove(activityId) {
    const { data } = await axios.delete(BASE_URL + activityId)
    return data
}
async function save(activity) {
    if (activity._id) {
        const { data } = await axios.put(BASE_URL + activity._id, activity)
        return data
    } else {
        
        if (!activity.createdAt) activity.createdAt = new Date()
        const { data } = await axios.post(BASE_URL, activity)
        return data
    }
}
