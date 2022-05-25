import { useDispatch } from 'react-redux'
import { setCurrSong } from '../store/actions/current-song.action'
export const SongPreview = ({ song }) => {
    const dispatch = useDispatch()
    const loadSong = () => {
        dispatch(setCurrSong(song))
    }
    return (<div onClick={loadSong} className="song-preview">
        <img src={song.imgUrl} alt="" />
        <div className="title">{song.title}</div>
    </div>)
}