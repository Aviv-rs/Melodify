import { useState } from 'react'
import { Search } from '../cmps/search'
import { SongList } from '../cmps/song-list'
import { GenreList } from '../cmps/genre-list'
import { genres } from '../data/genres'

export const SearchPage = () => {
    const [songs, setSongs] = useState(null)
    const displaySongResults = (songs) => {
        setSongs(songs)
    }
    return <section className="search-page">
        {/* <h1>Search for playlists or songs</h1> */}
        <Search onSearchSongs={displaySongResults} />
        <div>{songs &&
            <SongList songs={songs} isSearchResults={false} onAddSong={null} />
        }</div>
        <div> 
        <GenreList genres={genres}/>
        </div>
    </section>
}