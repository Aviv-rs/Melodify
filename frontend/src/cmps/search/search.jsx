import { useEffect, useState } from 'react'
import { youtubeService } from '../../services/youtube.service'
import { SearchBarIcon } from '../../services/img.import.service'
import { utilService } from '../../services/util.service'

export const Search = ({ onSearchSongs, isInStationDetails = false }) => {
    const [searchClass, setSearchClass] = useState('input-container')
    useEffect(() => {
        if (isInStationDetails) setSearchClass('search-station-details')
    }, [])


    const handleChange = ({ target }) => {
        const search = target.value
        debouncedOnSearch(search)
    }

    const getSongs = async (value) => {
        try {
            const songs = await youtubeService.getSongs(value)
            return songs
        }
        catch (error) {
            console.log('Can not get songs', error)
        }
    }

    const onSearch = async (search) => {
        if (!search) return
        const songs = await getSongs(search)
        onSearchSongs(songs)
    }

    const debouncedOnSearch = utilService.debounce(onSearch, 2000)

    return (
        <div className={searchClass}>
            <form>
                <button> <SearchBarIcon /> </button>
                <input
                    // type="search"
                    id="search"
                    placeholder="Playlists or songs"
                    autoComplete="off"
                    onChange={handleChange} />
            </form>
        </div>
    )

}
