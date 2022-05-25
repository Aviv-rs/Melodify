import axios from 'axios'
import { keys } from './keys'
const idx = 0
const YT_KEY = keys[idx]
export const youtubeService = {
    serachIput
}
async function serachIput(value) {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`)
        console.log("🚀 ~ file: youtube.service.js ~ line 11 ~ serachIput ~ data", data)
        const videos = data.items.map(item => {
            return {
                title: item.snippet.title,
                videoId: item.id.videoId,
                description: item.snippet.description,
                imgUrl: item.snippet.thumbnails.high.url,
                publishedAt: item.snippet.publishTime
            }
        })
        console.log("🚀 ~ file: youtube.service.js ~ line 19 ~ serachIput ~ videos", videos)



        return data
    } catch (error) {
        console.log('request faild', error)
        idx = (idx >= keys.length) ? 0 : idx += 1
        console.log("🚀 ~ file: youtube.service.js ~ line 28 ~ serachIput ~ idx", idx)
        
    }
}
