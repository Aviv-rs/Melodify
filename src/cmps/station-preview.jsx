import { useNavigate } from "react-router-dom"
import { StationDefaultIcon } from "../services/img.import.service"

export const StationPreview = ({ station }) => {
    const navigate = useNavigate()

    const onGoToStation = () => {
        navigate(`/station/${station._id}`)
    }

    return <div className="station-preview" onClick={onGoToStation}>
        <div className="inner-container">
            <div className="station-cover">
                <div className="img-container">
                    {/* TODO: seperate between with and without imgUrl */}
                    <div className="icon-container">
                        <StationDefaultIcon />
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