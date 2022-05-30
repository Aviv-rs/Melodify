import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { StationDefaultIcon } from "../services/img.import.service"
import { PlayIcon } from "../services/img.import.service"
import { getActionSetStation } from '../store/actions/station.action'
import { setCurrSong } from '../store/actions/current-song.action'


export const StationPreview = ({ station }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onGoToStation = () => {
        navigate(`/station/${station._id}`)
    }

    const onPlayStation = (ev) => {
        ev.stopPropagation()
        const { songs } = station
        if (!songs || !songs?.length) return
        dispatch(setCurrSong(songs[0]))
        dispatch(getActionSetStation(station))
    }

    // TODO: rename class names
    return <div className="station-preview" onClick={onGoToStation}>
        <div className="inner-container">
            <div className="station-cover">
                <div className="img-container">
                    <button className="btn-toggle-play" onClick={onPlayStation} >
                        <PlayIcon />
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