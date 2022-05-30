import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, setIsPlaying } from '../store/actions/current-song.action'
import { PlayIcon, PauseIcon } from '../services/img.import.service'
import { getActionSetStation } from '../store/actions/station.action'
import { useEffect, useState } from 'react'
import ReactTimeAgo from 'react-time-ago'


export const SongPreview = ({ song, songIdx, isSearchResult, onAddSong, station }) => {
   
    const dispatch = useDispatch()
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [duration, setDuration] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    useEffect(() => {
        if(song.duration) setDuration(song.duration)
        if (stationModule?.station?._id === station?._id
            && currSong?.id === song.id) setIsPlayShow(isPlaying)
        else setIsPlayShow(false)
    }, [station, isPlaying, currSong, stationModule])

    const onTogglePlayer = () => {
        if (currSong?.id !== song.id) dispatch(setCurrSong(song))
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) player.playVideo()
        if (!isSearchResult) {
            station.currSongIdx = songIdx
            dispatch(getActionSetStation(station))
        }
    }

    return (<div className="song-preview" onDoubleClick={onTogglePlayer}>
        <div className='play-song-container' onClick={onTogglePlayer}>
            {!isPlayShow && <button className="btn-play"> <PlayIcon /> </button>}
            {isPlayShow && <button className="btn-play"> <PauseIcon /> </button>}
            <span className='song-number'>{songIdx + 1}</span>
        </div>
        <img src={song.imgUrl} alt="" />
        <div className="title">{song.title}</div>
        {!isSearchResult && <span>
            {song?.createdAt && <ReactTimeAgo date={song.createdAt || Date.now()} locale="en-US"/>}
            {!song?.createdAt && <span></span>}
        
        </span>
        
        }
        {!isSearchResult && <span>{duration}</span>}

        {isSearchResult && <span></span>}
        {isSearchResult && <button className='button-add' onClick={() => onAddSong(song)}>Add</button>}
    </div>)
}