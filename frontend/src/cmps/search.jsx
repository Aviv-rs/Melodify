import { useEffect, useState } from 'react'
import { youtubeService } from '../services/youtube.service'
import { SearchBarIcon } from '../services/img.import.service'

export const Search = ({ onSearchSongs, isInStationDetails = false }) => {
    //TODO: make search results appear on change with debounce [can be on submit for development stage]
    const [search, setSearch] = useState(null)
    const [searchClass, setSearchClass] = useState('input-container')
    useEffect(() => {
        if(isInStationDetails) setSearchClass('search-station-details') 
    }, [])
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
        <div className={searchClass}>
            <form onSubmit={onSearch}>
                <button> <SearchBarIcon /> </button>
                <input type="search"
                    id="search"
                    placeholder="Playlists or songs"
                    autoComplete="off"
                    onChange={({ target }) => setSearch(target.value)} />
            </form>
        </div>
    )

}