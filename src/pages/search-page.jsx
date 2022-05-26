import { useState } from 'react'
import { Search } from '../cmps/search'
import { SongList } from '../cmps/song-list'
export const SearchPage = () => {
    const [songs, setSongs] = useState(null)
    const displaySongs = (songs) => {
        setSongs(songs)
    }
    return <section className="search-page">
        <h1>Search for playlists or songs</h1>
        <Search displaySongs={displaySongs} />
        <div>{songs ? 
        <SongList songs ={songs} isInSearchPage={true} onAddSong={null}/>
        : ''}</div>
    </section>
}