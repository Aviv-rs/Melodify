import { useState } from 'react'
import { youtubeService } from '../services/youtube.service'

export const Search = () => {
    
    const [search, setSearch] = useState(null)
    const [searchStation, setSearchStation] = useState(null)
    async function getVideos(value) {
        try {
            const videos = youtubeService.serachIput(value)
            return videos
        }
        catch (error) {
            console.log('Can not get videos', error);
        }

    }

    const submitValue = async () => {
        console.log('search', search)
        const videos = await getVideos(search)
        console.log("🚀 ~ file: search.jsx ~ line 22 ~ submitValue ~ videos", videos)
        setSearchStation(videos)
        
    }



    return (
        <div>search
            <input type="text" placeholder="search" onChange={e => setSearch(e.target.value)} />
            <button onClick={submitValue}>search</button>
        </div>
    )

}