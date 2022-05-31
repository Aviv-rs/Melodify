import { useState } from 'react'
import { Search } from '../cmps/search/search'
import { SearchResultList } from '../cmps/search/search-result-list'
import { GenreList } from '../cmps/genre/genre-list'
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
            <SearchResultList searchResults={songs} onAddSong={null} />
        }</div>
        <div>
            <GenreList genres={genres} />
        </div>
    </section>
}