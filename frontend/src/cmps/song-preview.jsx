import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, setIsPlaying } from '../store/actions/current-song.action'
import { PlayIcon, PauseIcon } from '../services/img.import.service'
import { getActionSetStation } from '../store/actions/station.action'

export const SongPreview = ({ song, songIdx, isSearchResult, onAddSong, station }) => {

    const dispatch = useDispatch()
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)

    const onTogglePlaySong = () => {
        dispatch(setCurrSong(song))
        dispatch(setIsPlaying(!isPlaying))
        if (!isSearchResult) {
            station.currSongIdx = songIdx
            dispatch(getActionSetStation(station))
        }
    }
    // TODO: play on double click, add pause option from here
    return (<div className="song-preview">
        {/* <div className='play-song-container' onClick={onPlaySong}> */}
        <div className='play-song-container'>
            <button  className="btn-play"> <PlayIcon /> </button>
            <span className='song-number'>{songIdx +1 }</span>
        </div>
        <img src={song.imgUrl} alt="" />
        <div className="title">{song.title}</div>
        <span>5 days ago</span>
        <span>3:14</span>
        {isSearchResult && <button className='button-add' onClick={() => onAddSong(song)}>Add</button>}
    </div>)
}