import { useDispatch } from 'react-redux'
import { setCurrSong } from '../store/actions/current-song.action'
import { PlayIcon } from '../services/img.import.service'
import { getActionSetStation } from '../store/actions/station.action'

export const SongPreview = ({ song, songIdx, isSearchResult, onAddSong, station }) => {
    const dispatch = useDispatch()
    const onPlaySong = () => {
        dispatch(setCurrSong(song))
        if (!isSearchResult) {
            station.currSongIdx = songIdx
            dispatch(getActionSetStation(station))
        }
    }
    // TODO: play on double click, add pause option from here
    return (<div className="song-preview">
        <div className='play-song-container'>
            <button onClick={onPlaySong} className="btn-play"> <PlayIcon /> </button>
        </div>
        <img src={song.imgUrl} alt="" />
        <div className="title">{song.title}</div>
        {isSearchResult && <button onClick={() => onAddSong(song)}>Add</button>}
    </div>)
}