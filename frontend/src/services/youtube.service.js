import axios from 'axios'
import { keys } from './keys'
let idx = 0
let YT_KEY = keys[idx]
export const youtubeService = {
    getSongs,
    getSongDuration
}


async function getSongs(value) {
    try {
        console.log('hi idx', idx);
        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`)
        const songs = data.items.map(({snippet, id}) => {
            let {title, publishTime, description,thumbnails} = snippet
            const {videoId} = id
            title = proccessSpecialChars(title)
            return {
                title,
                id: videoId,
                description,
                imgUrl: thumbnails.high.url,
                publishedAt: publishTime
            }
        })
        return songs
    } catch (error) {
        console.log('request faild', error)
        idx = (idx >= keys.length) ? 0 : idx + 1
        YT_KEY = keys[idx]
        return await getSongs(value)
    }
}

function proccessSpecialChars(str){
    const specialChars = [
        {char:'&amp;', render: '&'},
        {char:'&quot;', render: '"'},
        {char:'&#39;', render: `'`},
        {char:'&lt;', render: `<`},
        {char:'&gt;', render: `>`}]
    str = str.split(' ')
    str = str.map((word) => {
        for (let i = 0; i < specialChars.length; i++){
            if(word.includes(specialChars[i].char)) word = word.replaceAll(specialChars[i].char, specialChars[i].render)
        }
        return word
    })
    return str.join(' ')
}

async function getSongDuration(songId) {
    try {
        const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${songId}&key=${YT_KEY}&part=snippet,contentDetails,statistics,status`)
        let str = data.items[0].contentDetails.duration
        const timeStrDigits = str.match(/([0-9]+)/g)
        const duration = timeStrDigits.map((timeStrDigit, idx) => {
            if (idx !== 0 && timeStrDigit.length === 1) return `0${timeStrDigit}`
            else return timeStrDigit
        })
        return duration.join(':')
    } catch (error) {
        console.log('request faild', error)
    }
}
