import { useNavigate } from "react-router-dom"
import { StationDefaultIcon } from "../services/img.import.service"
import { PlayIcon } from "../services/img.import.service"

export const StationPreview = ({ station }) => {
    const navigate = useNavigate()

    const onGoToStation = () => {
        navigate(`/station/${station._id}`)
    }

    return <div className="station-preview" onClick={onGoToStation}>
        <div className="inner-container">
            <div className="station-cover">
                <div className="img-container">
                    <button className="btn-toggle-play" >
                        {<PlayIcon />}
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
                <div className="station-creator">By {station.createdBy.fullName}</div>
            </div>
        </div>
    </div>
}