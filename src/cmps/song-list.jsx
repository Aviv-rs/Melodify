import { SongPreview } from '../cmps/song-preview'
export const SongList = ({songs, isInSearchPage, onAddSong}) => {
    return <section>
        {songs.map((song, idx )=> <SongPreview song={song} isInSearchPage={isInSearchPage} onAddSong={onAddSong} key={idx} />)}
    </section>  
}

