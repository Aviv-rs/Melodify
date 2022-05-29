import { SongPreview } from '../cmps/song-preview'
export const SongList = ({ songs, isSearchResults, onAddSong, station = null }) => {
    return <section className='song-list'>
        {songs.map((song, idx) => <SongPreview
            song={song}
            isSearchResult={isSearchResults}
            onAddSong={onAddSong}
            station={station}
            currSongIdx = {idx}
            key={idx}
            songIdx={idx}
        />)}
    </section>
}

