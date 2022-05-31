import { useDispatch, useSelector } from 'react-redux'
import { setCurrSong, setIsPlaying } from '../../store/actions/current-song.action'
import { PlayIcon, PauseIcon } from '../../services/img.import.service'
import { useEffect, useState } from 'react'


export const SearchResultPreview = ({ result, onAddSong, station }) => {

    const dispatch = useDispatch()
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const [isPlayShow, setIsPlayShow] = useState(false)
    const [duration, setDuration] = useState(null)
    useEffect(() => {
        if (result.duration) setDuration(result.duration)
        if (stationModule?.station?._id === station?._id
            && currSong?.id === result.id) setIsPlayShow(isPlaying)
        else setIsPlayShow(false)
    }, [station, isPlaying, currSong, stationModule])

    const onTogglePlayer = () => {
        if (currSong?.id !== result.id) dispatch(setCurrSong(result))
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) player.playVideo()

    }

    return <div className="song-preview" onDoubleClick={onTogglePlayer}>
        <div className='play-song-container' onClick={onTogglePlayer}>
            {!isPlayShow && <button className="btn-play"> <PlayIcon /> </button>}
            {isPlayShow && <button className="btn-play"> <PauseIcon /> </button>}
        </div>
        <img src={result.imgUrl} alt="" />
        <div className="title">{result.title}</div>
        {onAddSong && <button className='button-add' onClick={() => onAddSong(result)}>Add</button>}
    </div>

}


