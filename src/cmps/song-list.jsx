import { SongPreview } from '../cmps/song-preview'
export const SongList = ({ songs, isSearchResults, onAddSong, station = null }) => {
    return <section>
        {songs.map((song, idx) => <SongPreview
            song={song}
            isSearchResult={isSearchResults}
            onAddSong={onAddSong}
            station={station}
            key={idx}
            songIdx={idx}
        />)}
    </section>
}

