import { useState } from 'react'
import { youtubeService } from '../services/youtube.service'

export const Search = ({displaySongs}) => {
    //TODO: add debounce
    const [search, setSearch] = useState(null)
    async function getSongs(value) {
        try {
            const songs = await youtubeService.getSongs(value)
            return songs
        }
        catch (error) {
            console.log('Can not get songs', error);
        }
    }

    const submitValue = async () => {
        const songs = await getSongs(search)
        displaySongs(songs)
    }
    
    return (
        <div>
            <input type="text" placeholder="search" onChange={e => setSearch(e.target.value)} />
            <button onClick={submitValue}>search</button>
        </div>
    )

}