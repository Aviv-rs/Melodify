import { useDispatch } from 'react-redux'
import { setCurrSong } from '../store/actions/current-song.action'

export const SongPreview = ({ song, isInSearchPage, onAddSong, station = null }) => {
    const dispatch = useDispatch()
    const onPlaySong = () => {
        dispatch(setCurrSong(song))
        // if(station) dispatch(setCurrStation(station))
        if(station) console.log('curr station', station);
    }
    
    return (<div className="song-preview">
        <img onClick={onPlaySong} src={song.imgUrl} alt="" />
        <div className="title">{song.title}</div>
        {!isInSearchPage && <button onClick={() => onAddSong(song)}>Add</button>}
    </div>)
}