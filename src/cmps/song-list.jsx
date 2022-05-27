import { SongPreview } from '../cmps/song-preview'
export const SongList = ({ songs, isInSearchPage, onAddSong, station = null }) => {
    return <section>
        {songs.map((song, idx) => <SongPreview
            song={song}
            isInSearchPage={isInSearchPage}
            onAddSong={onAddSong}
            station={station}
            key={idx}
        />)}
    </section>
}

