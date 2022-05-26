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
        <div className="input-container">
            <form onSubmit={onSearch}>
                <button><svg role="img" height="24" width="24" class="Svg-sc-1bi12j5-0 jgfuCe mOLTJ2mxkzHJj6Y9_na_" aria-hidden="true" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg></button>
                <input type="search" 
                id="search"
                placeholder="Playlists or songs" 
                autoComplete="off"
                onChange={({ target }) => setSearch(target.value)} />         
            </form>
        </div>
    )

}