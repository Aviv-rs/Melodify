import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { StationDefaultIcon } from "../../services/img.import.service"
import { PlayIcon, PauseIcon } from "../../services/img.import.service"
import { getActionSetStation } from '../../store/actions/station.action'
import { setCurrSong } from '../../store/actions/current-song.action'
import { useEffect, useState } from "react"


export const StationPreview = ({ station }) => {

    const [isPlayShow, setIsPlayShow] = useState(false)
    const stationModule = useSelector((storeState) => storeState.stationModule)
    const { player } = useSelector((storeState) => storeState.playerModule)
    const { isPlaying } = useSelector(storeState => storeState.currSongModule)
    const { currSong } = useSelector((storeState) => storeState.currSongModule)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        if (stationModule?.station?._id === station?._id) setIsPlayShow(isPlaying)
        else setIsPlayShow(false)
    }, [station, isPlaying, stationModule])

    const onGoToStation = () => {
        navigate(`/music/station/${station._id}`)
    }

    const onTogglePlayer = (ev) => {
        ev.stopPropagation()
        if (!currSong) {
            onPlayStation()
        } else if (stationModule.station._id !== station._id) onPlayStation()
        else if (isPlaying) {
            player.pauseVideo()
        }
        else if (!isPlaying) {
            player.playVideo()
        }
    }

    const onPlayStation = () => {
        dispatch(getActionSetStation(station))
        // dispatch(setCurrSong(station.songs[0]))
        dispatch(setCurrSong(station.songs[station.currSongIdx]))
        setIsPlayShow(true)
    }

    // TODO: rename class names
    return <div className="station-preview" onClick={onGoToStation}>
        <div className="inner-container">
            <div className="station-cover">
                <div className="img-container">
                    <button className="btn-toggle-play" onClick={onTogglePlayer} >
                        {isPlayShow ? <PauseIcon /> : <PlayIcon />}
                    </button>

                    <div className="icon-container">
                        {station.coverUrl ?
                            <img src={`${station.coverUrl}`} alt="The playlist cover image" />
                            :
                            <StationDefaultIcon />}
                    </div>
                </div>
            </div>
            <div className="station-details">
                <div className="station-name"> {station.name} </div>
                <div className="station-creator">By {station.createdBy.fullname}</div>
            </div>
        </div>
    </div>
}