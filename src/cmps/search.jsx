import { useState } from 'react'
import { youtubeService } from '../services/youtube.service'

export const Search = ({ onSearchSongs }) => {
    //TODO: make search results appear on change with debounce [can be on submit for development stage]
    const [search, setSearch] = useState(null)

    const getSongs = async (value) => {
        try {
            const songs = await youtubeService.getSongs(value)
            return songs
        }
        catch (error) {
            console.log('Can not get songs', error);
        }
    }

    const onSearch = async (ev) => {
        ev.preventDefault()
        const songs = await getSongs(search)
        onSearchSongs(songs)
    }


    return (
        <div>
            <form onSubmit={onSearch}>
                <input type="text" placeholder="search" onChange={({ target }) => setSearch(target.value)} />
                <button>search</button>
            </form>
        </div>
    )

}