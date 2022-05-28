import { useNavigate } from "react-router-dom"
import { StationDefaultIcon } from "../services/img.import.service"

export const StationPreview = ({ station }) => {
    const navigate = useNavigate()

    const onGoToStation = () => {
        navigate(`/station/${station._id}`)
    }

    return <div className="station-preview" onClick={onGoToStation}>
        <div className="station-cover">
            <StationDefaultIcon />
        </div>
        <div className="station-name"> {station.name} </div>
        <div className="station-creator">{station.createdBy.fullName}</div>
    </div>
}