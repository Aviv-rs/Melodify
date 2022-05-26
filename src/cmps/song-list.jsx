import { SongPreview } from '../cmps/song-preview'
export const SongList = ({songs}) => {
    return <section>
        {songs.map((song, idx )=> <SongPreview song={song} key={idx} />)}
    </section>  
}

