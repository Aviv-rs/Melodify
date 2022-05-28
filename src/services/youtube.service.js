import axios from 'axios'
import { keys } from './keys'
const idx = 1
const YT_KEY = keys[idx]
export const youtubeService = {
    getSongs
}
async function getSongs(value) {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`)
        const songs = data.items.map(item => {
            return {
                title: item.snippet.title,
                id: item.id.videoId,
                description: item.snippet.description,
                imgUrl: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishTime
            }
        })
        return songs
    } catch (error) {
        console.log('request faild hiiiiiiiiii', error)
        idx = (idx >= keys.length) ? 0 : idx += 1
        console.log("🚀 ~ file: youtube.service.js ~ line 24 ~ getSongs ~ idx", idx)
    }
}
